import { useEffect, useState } from "react";
import { Plus, Car } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { listBookings, type Booking } from "@/services/booking/bookingService";

const TABS = [
  { label: "All", mode: undefined },
  { label: "Regular", mode: "STRAIGHT" as const },
  { label: "Reserved", mode: "RESERVE" as const },
  { label: "Dedicated", mode: "DEDICATED" as const },
];

const STATUS_LABEL: Record<Booking["bookingMode"], string> = {
  STRAIGHT: "Regular",
  RESERVE: "Reserved",
  DEDICATED: "Dedicated",
};

function formatNaira(n: number) {
  return `₦${n.toLocaleString("en-NG")}`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NG", { day: "numeric", month: "short" });
}

const Rides = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>(TABS[0]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await listBookings({ bookingMode: activeTab.mode });

        if (!cancelled) {
          setBookings(result.bookings);
        }
      } catch {
        if (!cancelled) {
          setError("Unable to load rides.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-white pb-28">
      <div className="flex items-center justify-between px-5 pt-10 pb-4">
        <h1 className="text-xl font-bold text-zinc-900">Rides</h1>

        <button
          type="button"
          onClick={() => navigate("/booking")}
          aria-label="New booking"
          className="w-9 h-9 rounded-full bg-zinc-900 flex items-center justify-center"
        >
          <Plus className="w-4 h-4 text-white" />
        </button>
      </div>

      <div className="flex gap-2 px-5 mb-4 overflow-x-auto [scrollbar-width:none]">
        {TABS.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
              activeTab.label === tab.label
                ? "bg-zinc-900 text-white"
                : "bg-zinc-100 text-zinc-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="px-5">
        {loading ? (
          <p className="text-center text-sm text-zinc-400 py-10">Loading rides...</p>
        ) : error ? (
          <p className="text-center text-sm text-red-500 py-10">{error}</p>
        ) : bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Car className="mb-2 h-8 w-8 text-zinc-300" />
            <p className="text-sm font-medium text-zinc-500">No rides yet</p>
            <p className="text-xs text-zinc-400">Bookings you make will show up here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center gap-3 rounded-2xl border border-zinc-100 p-3"
              >
                <div className="w-9 h-9 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
                  <Car className="w-4 h-4 text-zinc-600" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-zinc-900 truncate">
                    {booking.pickupLocation} - {booking.dropoffLocation}
                  </p>
                  <p className="text-xs text-zinc-400">
                    {booking.hoursBooked} Hours · {formatNaira(booking.totalAmount)}
                  </p>
                  <p className="text-xs text-zinc-400">{formatDate(booking.startTime)}</p>
                </div>

                <span className="text-[11px] font-medium bg-zinc-100 text-zinc-600 rounded-full px-2.5 py-1 shrink-0">
                  {STATUS_LABEL[booking.bookingMode]}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rides;
