import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import { useBooking } from "@/features/booking/BookingContext";
import { claimVehicle } from "@/services/dedicated/dedicatedService";

function formatNaira(n: number) {
  return `₦${n.toLocaleString("en-NG")}`;
}

const DedicatedPaymentConfirm = () => {
  const navigate = useNavigate();
  const { booking } = useBooking();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => navigate(-1);

  const handlePay = async () => {
    if (!booking.dedicatedVehicleId) {
      setError("No vehicle selected. Go back and pick one again.");
      return;
    }

    try {
      setProcessing(true);
      setError("");

      const { authorizationUrl } = await claimVehicle(booking.dedicatedVehicleId);

      // Real redirect to Paystack's hosted checkout — not a fake
      // success. The vehicle isn't actually claimed yet at this point;
      // that only happens once Paystack's webhook confirms payment on
      // the backend. Paystack redirects back to your app's configured
      // callback URL once the user finishes paying (or cancels).
      window.location.href = authorizationUrl;
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      setError(axiosError.response?.data?.message || "Unable to start payment.");
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/40" onClick={handleClose}>
      <div
        className="w-full bg-white rounded-t-3xl p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-zinc-200" />

        <div className="w-14 h-14 rounded-2xl bg-orange-500 mx-auto flex items-center justify-center mb-4">
          <AlertTriangle className="w-6 h-6 text-white" />
        </div>

        <h2 className="text-lg font-bold text-zinc-900">Confirm dedicated booking.</h2>
        <p className="text-sm text-zinc-500 mt-1 mb-5">
          You're about to pay a flat rate for a minimum of 1 month.
        </p>

        <div className="flex items-center justify-between bg-zinc-50 rounded-2xl p-4 mb-4 text-left text-sm">
          <div>
            <p className="font-semibold text-zinc-900">{booking.dedicatedVehicleName}</p>
            <p className="text-xs text-zinc-400">1 month</p>
          </div>

          <p className="font-semibold text-zinc-900">{formatNaira(booking.monthlyRate ?? 0)}</p>
        </div>

        <div className="flex justify-between text-sm mb-2">
          <span className="text-zinc-400">Monthly rate</span>
          <span className="font-medium text-zinc-900">{formatNaira(booking.monthlyRate ?? 0)}</span>
        </div>

        <div className="flex justify-between text-sm mb-5">
          <span className="text-zinc-400">Total due today</span>
          <span className="font-semibold text-zinc-900">
            {formatNaira(booking.monthlyRate ?? 0)}
          </span>
        </div>

        <div className="bg-violet-50 text-violet-700 text-xs rounded-xl p-3 mb-5 text-left">
          Payment secures this vehicle for the entire minimum period.
        </div>

        {error && <p className="text-xs text-red-500 mb-3">{error}</p>}

        <button
          type="button"
          onClick={handlePay}
          disabled={processing}
          className="w-full h-12 rounded-full bg-zinc-900 text-white text-sm font-semibold disabled:opacity-60"
        >
          {processing ? "Redirecting to payment..." : "Proceed to pay"}
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

export default DedicatedPaymentConfirm;
