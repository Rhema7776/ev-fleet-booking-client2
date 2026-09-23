import { CheckCircle2, Car } from "lucide-react";
import type { ReactNode } from "react";

interface BookingSuccessScreenProps {
  vehicleImage?: string | null;
  title: string;
  description: string;
  badge?: string;
  buttonText: string;
  onButtonClick: () => void;
  secondaryText?: string;
  onSecondaryClick?: () => void;
  /** Extra content between the description and the button — e.g. the
      commitment-period summary card on the Dedicated claim success
      screen. Nothing else needs this, so it's optional. */
  children?: ReactNode;
}

/**
 * One shared success screen for every "confirmed" state across the
 * booking flow (Straight, Reserve, Dedicated claim, Dedicated trip) —
 * previously these were four separate, duplicated implementations with
 * inconsistent visuals. Matches the actual Figma pattern: a real
 * vehicle photo with a checkmark badge, not a generic icon-in-a-circle
 * (which is what three of the four screens had drifted to using).
 */
const BookingSuccessScreen = ({
  vehicleImage,
  title,
  description,
  badge,
  buttonText,
  onButtonClick,
  secondaryText,
  onSecondaryClick,
  children,
}: BookingSuccessScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-400 via-emerald-600 to-[#031A14] flex flex-col items-center justify-center text-center px-8 py-16">
      <div className="relative mb-6">
        <div className="w-40 h-24 rounded-2xl bg-white/10 flex items-center justify-center overflow-hidden">
          {vehicleImage ? (
            <img src={vehicleImage} alt="" className="w-full h-full object-cover" />
          ) : (
            <Car className="w-10 h-10 text-white" strokeWidth={1.5} />
          )}
        </div>

        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center shadow-lg">
          <CheckCircle2 className="w-5 h-5 text-white" />
        </div>
      </div>

      <h1 className="text-white text-3xl font-black leading-tight">{title}</h1>

      {badge && (
        <span className="mt-4 inline-flex items-center gap-1.5 bg-white/15 text-white text-xs font-medium rounded-full px-3 py-1.5">
          {badge}
        </span>
      )}

      <p className="text-white/85 text-sm mt-4 max-w-xs">{description}</p>

      {children}

      <button
        type="button"
        onClick={onButtonClick}
        className="mt-10 w-full max-w-xs rounded-full bg-white text-zinc-900 text-sm font-semibold py-3.5"
      >
        {buttonText}
      </button>

      {secondaryText && (
        <button type="button" onClick={onSecondaryClick} className="mt-3 text-white/70 text-sm font-medium">
          {secondaryText}
        </button>
      )}
    </div>
  );
};

export default BookingSuccessScreen;
