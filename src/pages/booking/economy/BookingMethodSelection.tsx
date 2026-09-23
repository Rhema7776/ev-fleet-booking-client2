import { ChevronLeft, ChevronRight, LayoutGrid, Building2, Car } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useBooking, type BookingMode } from "@/features/booking/BookingContext";

interface MethodOption {
  mode: BookingMode;
  icon: typeof LayoutGrid;
  iconBg: string;
  title: string;
  description: string;
  priceLabel: string;
  /** Only STRAIGHT is built so far — Reserve and Dedicated flows are
      coming once their Figma screens are shared, same pattern as
      Executive/VIP on the car-type screen. */
  enabled: boolean;
}

const METHODS: MethodOption[] = [
  {
    mode: "STRAIGHT",
    icon: LayoutGrid,
    iconBg: "bg-orange-500",
    title: "Book now",
    description: "Standard booking, subject to availability.",
    priceLabel: "From ₦10,000/hour",
    enabled: true,
  },
  {
    mode: "RESERVE",
    icon: Building2,
    iconBg: "bg-emerald-500",
    title: "Reserve the car for me",
    description:
      "To reserve a car, your wallet must have an amount equivalent to 100hrs of the selected vehicle rate.",
    priceLabel: "Minimum of 100hrs in your wallet",
    enabled: true,
  },
  {
    mode: "DEDICATED",
    icon: Car,
    iconBg: "bg-amber-500",
    title: "Get your own dedicated car",
    description: "One vehicle assigned to you.",
    priceLabel: "From 1.5 million per month",
    enabled: true,
  },
];

const BookingMethodSelection = () => {
  const navigate = useNavigate();
  const { booking, updateBooking } = useBooking();

  const handleSelect = (option: MethodOption) => {
    if (!option.enabled) return;

    updateBooking({ bookingMode: option.mode });

    if (option.mode === "RESERVE") {
      navigate("/booking/economy/reserve/balance-check");
      return;
    }

    if (option.mode === "DEDICATED") {
      navigate("/booking/economy/dedicated/vehicles");
      return;
    }

    navigate("/booking/economy/straight/details");
  };

  return (
    <div className="min-h-screen bg-white pb-10">
      <div className="flex items-center gap-3 px-5 pt-10 pb-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Back"
          className="w-9 h-9 rounded-full border border-zinc-200 flex items-center justify-center"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      <div className="px-5">
        <h1 className="text-[22px] font-bold text-zinc-900 leading-snug">
          How would you like to book your economy car?
        </h1>

        {booking.selectedVehicleName && (
          <p className="mt-1 text-sm text-zinc-400">Selected: {booking.selectedVehicleName}</p>
        )}
      </div>

      <div className="px-5 mt-8 space-y-3">
        {METHODS.map((option) => {
          const Icon = option.icon;

          return (
            <button
              key={option.mode}
              onClick={() => handleSelect(option)}
              disabled={!option.enabled}
              className={`w-full flex items-start gap-3 rounded-2xl border border-zinc-100 p-4 text-left transition ${
                !option.enabled ? "opacity-50" : "hover:border-zinc-200"
              }`}
            >
              <span
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${option.iconBg}`}
              >
                <Icon className="w-5 h-5 text-white" />
              </span>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-zinc-900">{option.title}</p>
                <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                  {option.description}
                </p>
                <span className="mt-2 inline-block text-[11px] font-medium bg-zinc-100 text-zinc-600 rounded-full px-2.5 py-1">
                  {option.priceLabel}
                </span>
              </div>

              <ChevronRight className="w-4 h-4 text-zinc-300 shrink-0 mt-2" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BookingMethodSelection;
