import { useState, type ChangeEvent, type FormEvent } from "react";
import { ChevronLeft, Minus, Plus, MapPin, Navigation, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useBooking } from "@/features/booking/BookingContext";

const ECONOMY_BASE_RATE = 10000;

// Reserve mode applies a real 1.5x multiplier over the base rate,
// confirmed directly in the backend (bookingService.ts:
// MODE_RATE_MULTIPLIER.RESERVE = 1.5). The Figma's ₦15,000/hr for
// Reserve economy (10,000 x 1.5) was correct — I'd previously and
// wrongly treated it as a copy-paste error from Executive's rate and
// "fixed" it down to ₦10,000. This corrects that mistake.
const RESERVE_RATE = ECONOMY_BASE_RATE * 1.5;

const ReserveBookingDetails = () => {
  const navigate = useNavigate();
  const { booking, updateBooking } = useBooking();

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [vehicleCount, setVehicleCount] = useState(booking.vehicleCount || 1);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [error, setError] = useState("");

  // Tomorrow, as the minimum selectable date — reservations require a
  // future date and time, matching the real backend rule exactly
  // (bookingValidator.ts: RESERVE bookings need startTime > now).
  const minDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const isValid =
    date && startTime && endTime && pickupLocation.trim() && dropoffLocation.trim() &&
    customerName.trim() && customerPhone.trim();

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      () => setPickupLocation("Current location"),
      () => {}
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!isValid) return;

    const startDateTime = new Date(`${date}T${startTime}`);
    const endDateTime = new Date(`${date}T${endTime}`);

    if (startDateTime <= new Date()) {
      setError("Reservations require a future date and time.");
      return;
    }

    updateBooking({
      vehicleCount,
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
      pickupLocation,
      dropoffLocation,
      customerName,
      customerPhone,
      ratePerHour: booking.ratePerHour ?? RESERVE_RATE,
    });

    navigate("/booking/economy/reserve/review");
  };

  return (
    <div className="min-h-screen bg-white pb-10">
      <div className="flex items-center gap-3 px-5 pt-10 pb-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Back"
          className="w-9 h-9 rounded-full border border-zinc-200 flex items-center justify-center"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <h1 className="text-[15px] font-semibold text-zinc-900">Reserve an economy car</h1>
      </div>

      <div className="px-5">
        <div className="flex items-start gap-2 bg-sky-50 text-sky-700 rounded-2xl p-3 mb-4">
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <p className="text-xs">Reservations require a future date and time.</p>
        </div>

        <span className="inline-flex items-center gap-1 text-xs text-sky-600">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
          12 Available
        </span>
      </div>

      <form onSubmit={handleSubmit} className="px-5 mt-4 space-y-5">
        <div>
          <label className="block text-xs font-medium text-zinc-500 mb-1.5">
            When do you want this reservation scheduled?
          </label>
          <input
            type="date"
            min={minDate}
            value={date}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
            className="w-full h-12 rounded-xl border border-zinc-200 px-4 text-sm outline-none focus:border-emerald-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">Start time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setStartTime(e.target.value)}
              className="w-full h-12 rounded-xl border border-zinc-200 px-4 text-sm outline-none focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">End time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEndTime(e.target.value)}
              className="w-full h-12 rounded-xl border border-zinc-200 px-4 text-sm outline-none focus:border-emerald-500"
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-900">Number of cars</p>
            <p className="text-xs text-zinc-400">How many cars do you need?</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setVehicleCount((n) => Math.max(1, n - 1))}
              className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>

            <span className="w-4 text-center text-sm font-semibold">{vehicleCount}</span>

            <button
              type="button"
              onClick={() => setVehicleCount((n) => n + 1)}
              className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-500 mb-1.5">
            Where will the client be picked up?
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={pickupLocation}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPickupLocation(e.target.value)}
              placeholder="Enter pickup location"
              className="w-full h-12 rounded-xl border border-zinc-200 pl-11 pr-4 text-sm outline-none focus:border-emerald-500"
              required
            />
          </div>
          <button
            type="button"
            onClick={handleUseCurrentLocation}
            className="mt-1.5 flex items-center gap-1 text-xs font-medium text-emerald-600"
          >
            <Navigation className="w-3 h-3" />
            Use my current location
          </button>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-500 mb-1.5">
            Drop-off location
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={dropoffLocation}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDropoffLocation(e.target.value)}
              placeholder="Enter drop-off location"
              className="w-full h-12 rounded-xl border border-zinc-200 pl-11 pr-4 text-sm outline-none focus:border-emerald-500"
              required
            />
          </div>
        </div>

        {/* Figma labels this "Your full name" here (vs "Client full
            name" on the Straight flow) — same underlying field either
            way, kept the exact label text shown. */}
        <div>
          <label className="block text-xs font-medium text-zinc-500 mb-1.5">Your full name</label>
          <input
            type="text"
            value={customerName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCustomerName(e.target.value)}
            placeholder="Enter full name"
            className="w-full h-12 rounded-xl border border-zinc-200 px-4 text-sm outline-none focus:border-emerald-500"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-500 mb-1.5">
            Client's phone number
          </label>
          <input
            type="tel"
            value={customerPhone}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCustomerPhone(e.target.value)}
            placeholder="Enter client's phone number"
            className="w-full h-12 rounded-xl border border-zinc-200 px-4 text-sm outline-none focus:border-emerald-500"
            required
          />
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={!isValid}
          className="w-full h-12 rounded-full bg-zinc-900 text-white text-sm font-semibold disabled:opacity-40 disabled:pointer-events-none"
        >
          Confirm reservation
        </button>
      </form>
    </div>
  );
};

export default ReserveBookingDetails;
