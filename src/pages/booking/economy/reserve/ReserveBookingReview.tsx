import { useState } from "react";
import { ChevronLeft, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import { useBooking } from "@/features/booking/BookingContext";
import { createBooking } from "@/services/booking/bookingService";

function formatNaira(n: number) {
  return `₦${n.toLocaleString("en-NG")}`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NG", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-NG", { hour: "numeric", minute: "2-digit" });
}

const ReserveBookingReview = () => {
  const navigate = useNavigate();
  const { booking } = useBooking();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const hours =
    booking.startTime && booking.endTime
      ? (new Date(booking.endTime).getTime() - new Date(booking.startTime).getTime()) /
        (1000 * 60 * 60)
      : 0;

  const rate = booking.ratePerHour ?? 0;
  const totalAmount = hours * rate * booking.vehicleCount;

  const handleSubmit = async () => {
    if (!booking.vehicleCategory || !booking.startTime || !booking.endTime) return;

    try {
      setSubmitting(true);
      setError("");

      const created = await createBooking({
        bookingMode: "RESERVE",
        vehicleCategory: booking.vehicleCategory,
        vehicleCount: booking.vehicleCount,
        customerName: booking.customerName,
        customerPhone: booking.customerPhone,
        pickupLocation: booking.pickupLocation,
        dropoffLocation: booking.dropoffLocation,
        startTime: booking.startTime,
        endTime: booking.endTime,
      });

      navigate("/booking/economy/reserve/confirmed", { state: { booking: created } });
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      setError(axiosError.response?.data?.message || "Unable to confirm reservation.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-32">
      <div className="flex items-center gap-3 px-5 pt-10 pb-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Back"
          className="w-9 h-9 rounded-full border border-zinc-200 flex items-center justify-center"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <h1 className="text-[15px] font-semibold text-zinc-900">Review your booking</h1>
      </div>

      <div className="px-5">
        <div className="flex items-center justify-between bg-zinc-50 rounded-2xl p-4 mb-6">
          <div>
            <p className="text-sm font-bold text-zinc-900">
              {booking.vehicleCount} economy car{booking.vehicleCount > 1 ? "s" : ""}
            </p>
            <span className="mt-1 inline-flex items-center gap-1 text-xs text-sky-600">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              {formatNaira(rate)}/hr
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-zinc-900">Booking details</p>
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Edit booking"
            className="w-7 h-7 rounded-full border border-zinc-200 flex items-center justify-center"
          >
            <Pencil className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-400">Client's name</span>
            <span className="font-medium text-zinc-900">{booking.customerName || "—"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-zinc-400">Date</span>
            <span className="font-medium text-zinc-900">
              {booking.startTime ? formatDate(booking.startTime) : "—"}
            </span>
          </div>

          <div className="flex justify-between items-start">
            <span className="text-zinc-400 shrink-0">Pick up</span>
            <span className="font-medium text-zinc-900 text-right ml-4">
              {booking.pickupLocation || "—"}
            </span>
          </div>

          <div className="flex justify-between items-start">
            <span className="text-zinc-400 shrink-0">Drop off</span>
            <span className="font-medium text-zinc-900 text-right ml-4">
              {booking.dropoffLocation || "—"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-zinc-400">Start time</span>
            <span className="font-medium text-zinc-900">
              {booking.startTime ? formatTime(booking.startTime) : "—"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-zinc-400">End time</span>
            <span className="font-medium text-zinc-900">
              {booking.endTime ? formatTime(booking.endTime) : "—"}
              {hours > 0 && <span className="text-zinc-400"> ({hours}h)</span>}
            </span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-100 px-5 py-4">
        {hours > 0 && (
          <p className="text-xs text-sky-600 mb-2">
            {hours}hrs x {formatNaira(rate)} x {booking.vehicleCount} car
            {booking.vehicleCount > 1 ? "s" : ""} = {formatNaira(totalAmount)}
          </p>
        )}

        {error && <p className="text-xs text-red-500 mb-2">{error}</p>}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full h-12 rounded-full bg-zinc-900 text-white text-sm font-semibold disabled:opacity-60"
        >
          {submitting ? "Confirming..." : "Confirm reservation"}
        </button>
      </div>
    </div>
  );
};

export default ReserveBookingReview;
