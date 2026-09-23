import { Car } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useBooking } from "@/features/booking/BookingContext";

function formatNaira(n: number) {
  return `₦${n.toLocaleString("en-NG")}`;
}

const DedicatedCommitment = () => {
  const navigate = useNavigate();
  const { booking } = useBooking();

  const handleClose = () => navigate(-1);

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/40" onClick={handleClose}>
      <div
        className="w-full bg-white rounded-t-3xl p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-zinc-200" />

        <div className="w-14 h-14 rounded-2xl bg-orange-500 mx-auto flex items-center justify-center mb-4">
          <Car className="w-6 h-6 text-white" />
        </div>

        <h2 className="text-lg font-bold text-zinc-900">Your own dedicated economy car</h2>
        <p className="text-sm text-zinc-500 mt-1 mb-5">
          Own a car exclusively for you. Minimum commitment is 1 month.
        </p>

        <div className="bg-zinc-50 rounded-2xl p-4 mb-5 text-left">
          <p className="text-xs text-zinc-400">Flat monthly rate</p>
          <p className="text-lg font-bold text-zinc-900">{formatNaira(booking.monthlyRate ?? 0)}</p>
        </div>

        <ul className="text-left space-y-2 mb-6">
          {[
            "Exclusive use of the vehicle",
            "No sharing with other users",
            "Maintenance and insurance included",
            "24/7 support",
          ].map((point) => (
            <li key={point} className="flex items-center gap-2 text-sm text-zinc-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              {point}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => navigate("/booking/economy/dedicated/confirm-payment")}
          className="w-full h-12 rounded-full bg-zinc-900 text-white text-sm font-semibold"
        >
          Continue
        </button>

        <button
          type="button"
          onClick={handleClose}
          className="w-full h-12 mt-2 text-sm font-medium text-zinc-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DedicatedCommitment;
