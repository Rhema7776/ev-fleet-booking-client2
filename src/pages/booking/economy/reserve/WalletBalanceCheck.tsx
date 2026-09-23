import { CreditCard, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/constants/routes";

// Was previously (incorrectly) built as "100 hours worth of the
// selected vehicle rate" — that was a real mistake, not a Figma
// inconsistency. The actual rule, confirmed directly in the real
// backend's bookingService.ts (RESERVE_MIN_WALLET_BALANCE), is a flat
// ₦50,000, matching this screen's own text exactly. Fixed.
const MINIMUM_WALLET_BALANCE = 50_000;

// Placeholder — no real wallet-balance API exists yet (Wallet.tsx is
// still a stub page). The comparison logic and threshold are real; only
// this current-balance value is mocked, structured so swapping in a
// real fetch later is a one-line change.
const MOCK_WALLET_BALANCE = 250_000;

function formatNaira(n: number) {
  return `₦${n.toLocaleString("en-NG")}`;
}

const WalletBalanceCheck = () => {
  const navigate = useNavigate();

  const hasEnough = MOCK_WALLET_BALANCE >= MINIMUM_WALLET_BALANCE;

  const handleClose = () => navigate(-1);

  const handleContinue = () => {
    if (!hasEnough) return;
    navigate("/booking/economy/reserve/details");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/40" onClick={handleClose}>
      <div
        className="w-full bg-white rounded-t-3xl p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-zinc-200" />

        {hasEnough ? (
          <>
            <div className="w-14 h-14 rounded-full bg-emerald-500 mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-7 h-7 text-white" />
            </div>

            <h2 className="text-lg font-bold text-zinc-900">You're all set</h2>
            <p className="text-sm text-zinc-500 mt-1 mb-5">
              You have enough balance to reserve a car.
            </p>
          </>
        ) : (
          <>
            <div className="w-14 h-14 rounded-2xl bg-orange-500 mx-auto flex items-center justify-center mb-4">
              <CreditCard className="w-6 h-6 text-white" />
            </div>

            <h2 className="text-lg font-bold text-zinc-900">Insufficient wallet balance</h2>
            <p className="text-sm text-zinc-500 mt-1 mb-5">
              You need a minimum of {formatNaira(MINIMUM_WALLET_BALANCE)} in your wallet to
              reserve a car.
            </p>
          </>
        )}

        <div className="flex items-center justify-between bg-zinc-50 rounded-2xl p-4 mb-4 text-sm">
          <div className="text-left">
            <p className="text-zinc-400">Current balance</p>
            <p className={`font-semibold ${hasEnough ? "text-emerald-600" : "text-zinc-900"}`}>
              {formatNaira(MOCK_WALLET_BALANCE)}
            </p>
          </div>

          <div className="text-right">
            <p className="text-zinc-400">Minimum required</p>
            <p className="font-semibold text-zinc-900">{formatNaira(MINIMUM_WALLET_BALANCE)}</p>
          </div>
        </div>

        {!hasEnough && (
          <div className="bg-amber-50 text-amber-700 text-xs rounded-xl p-3 mb-4 text-left">
            Top up your wallet to continue with your reservation.
          </div>
        )}

        {hasEnough ? (
          <button
            type="button"
            onClick={handleContinue}
            className="w-full h-12 rounded-full bg-zinc-900 text-white text-sm font-semibold"
          >
            Continue to booking
          </button>
        ) : (
          <button
            type="button"
            onClick={() => navigate(ROUTES.DASHBOARD_WALLET)}
            className="w-full h-12 rounded-full bg-zinc-900 text-white text-sm font-semibold"
          >
            Top up wallet
          </button>
        )}

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

export default WalletBalanceCheck;
