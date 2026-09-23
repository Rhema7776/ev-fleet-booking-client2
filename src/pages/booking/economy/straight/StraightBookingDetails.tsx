import { useState, type ChangeEvent, type FormEvent } from "react";
import { ChevronLeft, Minus, Plus, MapPin, Navigation } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useBooking } from "@/features/booking/BookingContext";

const ECONOMY_RATE = 10000;

const StraightBookingDetails = () => {
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

  const isValid =
    date && startTime && endTime && pickupLocation.trim() && dropoffLocation.trim() &&
    customerName.trim() && customerPhone.trim();

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      () => setPickupLocation("Current location"),
      () => {
        // Silently ignore — pickupLocation just stays whatever the user
        // already typed. Not worth blocking the form over a denied
        // permission prompt.
      }
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValid) return;

    // Figma shows Date + Start time + End time as three separate
    // fields, but the real backend's startTime/endTime are single
    // combined DateTime values — combined here into ISO datetimes to
    // match createBookingSchema exactly.
    const startDateTime = new Date(`${date}T${startTime}`).toISOString();
    const endDateTime = new Date(`${date}T${endTime}`).toISOString();

    updateBooking({
      vehicleCount,
      startTime: startDateTime,
      endTime: endDateTime,
      pickupLocation,
      dropoffLocation,
      customerName,
      customerPhone,
      ratePerHour: booking.ratePerHour ?? ECONOMY_RATE,
    });

    navigate("/booking/economy/straight/review");
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

        <h1 className="text-[15px] font-semibold text-zinc-900">Book an economy car</h1>
      </div>

      <div className="px-5">
        <p className="text-lg font-bold text-zinc-900">
          Economy cars start at ₦{ECONOMY_RATE.toLocaleString("en-NG")}/hr
        </p>
        <span className="mt-1 inline-flex items-center gap-1 text-xs text-sky-600">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
          12 Available
        </span>
      </div>

      <form onSubmit={handleSubmit} className="px-5 mt-6 space-y-5">
        {/* Date */}
        <div>
          <label className="block text-xs font-medium text-zinc-500 mb-1.5">
            When do you want this booking scheduled?
          </label>
          <input
            type="date"
            value={date}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
            className="w-full h-12 rounded-xl border border-zinc-200 px-4 text-sm outline-none focus:border-emerald-500"
            required
          />
        </div>

        {/* Start / End time */}
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

        {/* Number of cars */}
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

        {/* Pickup location */}
        <div>
          <label className="block text-xs font-medium text-zinc-500 mb-1.5">
            Where will your clients be picked up?
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

        {/* Drop-off location */}
        <div>
          <label className="block text-xs font-medium text-zinc-500 mb-1.5">
            Where will the client be dropped off?
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

        {/* Client full name */}
        <div>
          <label className="block text-xs font-medium text-zinc-500 mb-1.5">
            Client full name
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCustomerName(e.target.value)}
            placeholder="Enter client's full name"
            className="w-full h-12 rounded-xl border border-zinc-200 px-4 text-sm outline-none focus:border-emerald-500"
            required
          />
        </div>

        {/* Client phone */}
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

        <button
          type="submit"
          disabled={!isValid}
          className="w-full h-12 rounded-full bg-zinc-900 text-white text-sm font-semibold disabled:opacity-40 disabled:pointer-events-none"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default StraightBookingDetails;
