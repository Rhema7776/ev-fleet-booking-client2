import { useEffect, useRef, useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useBooking } from "@/features/booking/BookingContext";
import { getMySubscriptions } from "@/services/dedicated/dedicatedService";

const POLL_INTERVAL_MS = 2000;
const MAX_ATTEMPTS = 15; // ~30 seconds total

/**
 * Where Paystack's hosted checkout redirects the browser back to after
 * the user pays (or cancels). This is a REAL full browser navigation
 * back from Paystack's own domain — not a client-side route change —
 * so BookingContext's in-memory state may already be gone by the time
 * this mounts. Identifies the transaction from the `reference` query
 * param Paystack appends, not from anything in memory.
 *
 * Polls rather than assumes success immediately: the webhook that
 * actually activates the subscription runs asynchronously on the
 * backend and can genuinely arrive a moment after this redirect does.
 */
const DedicatedPaymentCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { updateBooking } = useBooking();

  const reference = searchParams.get("reference") || searchParams.get("trxref");

  const [status, setStatus] = useState<"polling" | "timeout" | "no-reference">(
    reference ? "polling" : "no-reference"
  );

  const attemptsRef = useRef(0);

  useEffect(() => {
    if (!reference) return;

    let cancelled = false;

    const poll = async () => {
      attemptsRef.current += 1;

      try {
        const subscriptions = await getMySubscriptions();
        const match = subscriptions.find(
          (s) => s.paystackReference === reference && s.status === "ACTIVE"
        );

        if (match) {
          if (cancelled) return;

          // Rehydrate what VehicleClaimed needs to display, since the
          // original BookingContext state may be gone after the
          // redirect round-trip to Paystack and back.
          updateBooking({
            dedicatedVehicleId: match.vehicle.id,
            dedicatedVehicleName: match.vehicle.name,
            dedicatedVehiclePlate: match.vehicle.plate,
            monthlyRate: match.monthlyRate,
          });

          navigate("/booking/economy/dedicated/claimed", { replace: true });
          return;
        }
      } catch {
        // Swallow and keep polling — a transient network hiccup here
        // shouldn't immediately declare failure while there's still
        // time left in the attempt budget.
      }

      if (attemptsRef.current >= MAX_ATTEMPTS) {
        if (!cancelled) setStatus("timeout");
        return;
      }

      if (!cancelled) {
        setTimeout(poll, POLL_INTERVAL_MS);
      }
    };

    poll();

    return () => {
      cancelled = true;
    };
  }, [reference, navigate, updateBooking]);

  if (status === "no-reference") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 px-8 text-center">
        <AlertCircle className="w-8 h-8 text-zinc-300" />
        <p className="text-sm text-zinc-500">
          We couldn't identify which payment this was for. If you completed a payment, check
          "My Subscriptions" in a moment.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm font-medium text-emerald-600"
        >
          Go to Home
        </button>
      </div>
    );
  }

  if (status === "timeout") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 px-8 text-center">
        <AlertCircle className="w-8 h-8 text-amber-400" />
        <p className="text-sm text-zinc-700 font-medium">Still confirming your payment</p>
        <p className="text-xs text-zinc-400 max-w-xs">
          This is taking longer than usual. If you completed payment, it should still go through
          shortly — check back in a minute.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-2 text-sm font-medium text-emerald-600"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3">
      <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      <p className="text-sm text-zinc-500">Confirming your payment...</p>
    </div>
  );
};

export default DedicatedPaymentCallback;
