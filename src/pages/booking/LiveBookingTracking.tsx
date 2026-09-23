import { useEffect, useState } from "react";
import { ChevronLeft, Info, Car, Clock, Users } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { getBookingById, type Booking } from "@/services/booking/bookingService";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NG", { weekday: "long", month: "long", day: "numeric" });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-NG", { hour: "numeric", minute: "2-digit" });
}

function isToday(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  return d.toDateString() === now.toDateString();
}

const LiveBookingTracking = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    getBookingById(Number(id))
      .then((data) => {
        if (!cancelled) setBooking(data);
      })
      .catch(() => {
        if (!cancelled) setError("Unable to load this booking.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-sm text-zinc-400">Loading...</div>;
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="text-sm text-red-500">{error || "Booking not found."}</p>
        <button onClick={() => navigate(-1)} className="text-sm font-medium text-emerald-600">
          Go back
        </button>
      </div>
    );
  }

  // Real backend status drives which state to show — more reliable than
  // inferring purely from dates. IN_PROGRESS means a driver has actually
  // been dispatched; anything before that is still "upcoming."
  const isDispatched = booking.status === "IN_PROGRESS";
  const isReserve = booking.bookingMode === "RESERVE";

  const title = isDispatched
    ? isReserve
      ? `Your reservation is set for Today (${formatTime(booking.startTime)})!`
      : "Your booking is confirmed!"
    : isReserve
    ? `Your reservation is set for ${formatDate(booking.startTime)} (${formatTime(booking.startTime)})!`
    : "Your booking is confirmed!";

  const subtitle = isDispatched
    ? "Your driver is on the way to pick your client."
    : isReserve
    ? "No availability check needed on the day."
    : "Your driver is on the way to pick your client.";

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center justify-between px-5 pt-10 pb-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Back"
          className="w-9 h-9 rounded-full border border-zinc-200 flex items-center justify-center"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <p className="text-sm font-semibold text-zinc-900 truncate max-w-[60%]">
          {booking.pickupLocation} to {booking.dropoffLocation} · {booking.vehicleCount} car
          {booking.vehicleCount > 1 ? "s" : ""} · {booking.hoursBooked}hrs
        </p>

        <Info className="w-4 h-4 text-zinc-400" />
      </div>

      {/* Map placeholder — no real maps integration exists yet in this
          project (no API key, no map library configured). This is a
          clearly-labeled static placeholder standing in for a real
          interactive map, not a functioning one. */}
      <div className="h-56 bg-sky-50 flex items-center justify-center text-xs text-sky-400 border-y border-sky-100">
        Map view — real map integration not yet configured
      </div>

      <div className="px-5 pt-5 pb-10">
        <h1 className="text-lg font-bold text-zinc-900 leading-snug">{title}</h1>
        <p className="text-sm text-zinc-500 mt-1">{subtitle}</p>

        <div className="flex gap-2 mt-4">
          <span className="inline-flex items-center gap-1 text-xs font-medium bg-sky-50 text-sky-600 rounded-full px-3 py-1.5">
            <Clock className="w-3 h-3" />
            {booking.hoursBooked}hrs
          </span>

          <span className="inline-flex items-center gap-1 text-xs font-medium bg-emerald-50 text-emerald-600 rounded-full px-3 py-1.5">
            <Users className="w-3 h-3" />
            {booking.vehicleCount} economy car{booking.vehicleCount > 1 ? "s" : ""}
          </span>
        </div>

        {/* Progress bar */}
        <div className="relative mt-6 mb-8">
          <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all"
              style={{ width: isDispatched ? "55%" : "5%" }}
            />
          </div>
          <div
            className="absolute -top-2 w-6 h-6 rounded-full bg-zinc-900 flex items-center justify-center transition-all"
            style={{ left: isDispatched ? "50%" : "0%" }}
          >
            <Car className="w-3 h-3 text-white" />
          </div>
        </div>

        <p className="text-sm font-bold text-zinc-900 mb-3">Booking details</p>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-400">Client's name</span>
            <span className="font-medium text-zinc-900">{booking.customerName}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-zinc-400">Date</span>
            <span className="font-medium text-zinc-900">{formatDate(booking.startTime)}</span>
          </div>

          <div className="flex justify-between items-start">
            <span className="text-zinc-400 shrink-0">Pick up</span>
            <span className="font-medium text-zinc-900 text-right ml-4">
              {booking.pickupLocation}
            </span>
          </div>

          <div className="flex justify-between items-start">
            <span className="text-zinc-400 shrink-0">Drop off</span>
            <span className="font-medium text-zinc-900 text-right ml-4">
              {booking.dropoffLocation}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-zinc-400">Start time</span>
            <span className="font-medium text-zinc-900">{formatTime(booking.startTime)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-zinc-400">End time</span>
            <span className="font-medium text-zinc-900">
              {formatTime(booking.endTime)} ({booking.hoursBooked}h)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveBookingTracking;
