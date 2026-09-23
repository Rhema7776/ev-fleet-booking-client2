import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useBooking } from "@/features/booking/BookingContext";

function formatNaira(n: number) {
  return `₦${n.toLocaleString("en-NG")}`;
}

const DedicatedVehicleClaim = () => {
  const navigate = useNavigate();
  const { booking, updateBooking } = useBooking();

  const handleClose = () => navigate(-1);

  const handleConfirm = () => {
    // "Confirm this vehicle" here just claims exclusive access — the
    // separate monthly exclusivity fee (DedicatedCommitment / payment
    // confirm) is the next step, per the "both" pricing model: monthly
    // fee for exclusivity, plus this per-trip rate billed on top for
    // actual usage.
    navigate("/booking/economy/dedicated/commitment");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/40" onClick={handleClose}>
      <div
        className="w-full bg-white rounded-t-3xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-zinc-900">Make this vehicle yours?</h2>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="w-7 h-7 rounded-full bg-zinc-100 flex items-center justify-center"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex justify-center py-4">
          <div className="w-40 h-24 bg-zinc-50 rounded-xl flex items-center justify-center text-xs text-zinc-300">
            {booking.dedicatedVehicleName}
          </div>
        </div>

        <div className="flex justify-center mb-5">
          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full px-3 py-1.5">
            {booking.dedicatedVehicleName} · Plate: {booking.dedicatedVehiclePlate}
          </span>
        </div>

        <div className="bg-zinc-50 rounded-2xl p-4 space-y-3 text-sm mb-4">
          <div className="flex justify-between">
            <span className="text-zinc-400">Category</span>
            <span className="font-medium text-zinc-900">Economy</span>
          </div>

          <div className="flex justify-between">
            <span className="text-zinc-400">Rate</span>
            <span className="font-medium text-zinc-900">
              {formatNaira(booking.ratePerHour ?? 15000)}/hr
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-zinc-400">Billing</span>
            <span className="font-medium text-zinc-900">Per booking, ongoing</span>
          </div>
        </div>

        <div className="bg-sky-50 text-sky-700 text-xs rounded-xl p-3 mb-5">
          This vehicle won't be offered to other clients once you confirm.
        </div>

        <button
          type="button"
          onClick={handleConfirm}
          className="w-full h-12 rounded-full bg-zinc-900 text-white text-sm font-semibold"
        >
          Confirm this vehicle
        </button>
      </div>
    </div>
  );
};

export default DedicatedVehicleClaim;
