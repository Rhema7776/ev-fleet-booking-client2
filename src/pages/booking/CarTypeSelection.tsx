import { ChevronLeft, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useBooking, type VehicleCategory } from "@/features/booking/BookingContext";

interface CarTypeOption {
  category: VehicleCategory;
  title: string;
  ratePerHour: number;
  available: number;
  image: string;
  variant: "light" | "green" | "dark";
  /** Only Economy has a real downstream flow built so far — Executive
      and VIP are shown (matching the design) but not yet wired to
      anything, rather than navigating somewhere broken. */
  enabled: boolean;
}

const CAR_TYPES: CarTypeOption[] = [
  {
    category: "ECONOMY",
    title: "Economy cars",
    ratePerHour: 10000,
    available: 12,
    image:
      "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?q=80&w=400&auto=format&fit=crop",
    variant: "light",
    enabled: true,
  },
  {
    category: "EXECUTIVE",
    title: "Executive cars",
    ratePerHour: 15000,
    available: 6,
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=400&auto=format&fit=crop",
    variant: "green",
    enabled: false,
  },
  {
    category: "VIP",
    title: "VIP cars",
    ratePerHour: 20000,
    available: 3,
    image:
      "https://images.unsplash.com/photo-1617704548623-340376564e68?q=80&w=400&auto=format&fit=crop",
    variant: "dark",
    enabled: false,
  },
];

function formatNaira(n: number) {
  return `₦${n.toLocaleString("en-NG")}`;
}

const CarTypeSelection = () => {
  const navigate = useNavigate();
  const { updateBooking } = useBooking();

  const handleSelect = (option: CarTypeOption) => {
    if (!option.enabled) return;

    updateBooking({ vehicleCategory: option.category, ratePerHour: option.ratePerHour });
    navigate(`/booking/${option.category.toLowerCase()}/vehicles`);
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

        <h1 className="text-[15px] font-semibold text-zinc-900">Choose a car type</h1>
      </div>

      <div className="px-5 space-y-4">
        {CAR_TYPES.map((option) => {
          const styles = {
            light: { bg: "bg-white border border-zinc-200", text: "text-zinc-900" },
            green: { bg: "bg-emerald-500", text: "text-white" },
            dark: { bg: "bg-[#0B2B21]", text: "text-white" },
          }[option.variant];

          return (
            <button
              key={option.category}
              onClick={() => handleSelect(option)}
              disabled={!option.enabled}
              className={`relative w-full text-left rounded-3xl p-5 overflow-hidden ${styles.bg} ${
                !option.enabled ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className={`text-lg font-bold ${styles.text}`}>{option.title}</p>
                  <p
                    className={`text-sm mt-1 ${
                      option.variant === "light" ? "text-zinc-400" : "text-white/70"
                    }`}
                  >
                    {formatNaira(option.ratePerHour)}/hr
                  </p>
                </div>

                <span
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                    option.variant === "light" ? "bg-zinc-100" : "bg-white/20"
                  }`}
                >
                  <ArrowUpRight className={`w-4 h-4 ${styles.text}`} />
                </span>
              </div>

              <img
                src={option.image}
                alt={option.title}
                className="mt-4 w-full h-28 object-cover rounded-2xl"
              />

              <span
                className={`mt-3 inline-block text-xs font-medium rounded-full px-2.5 py-1 ${
                  option.variant === "light" ? "bg-zinc-100 text-zinc-600" : "bg-white/15 text-white"
                }`}
              >
                {option.available} Available
              </span>

              {!option.enabled && (
                <span className="absolute top-4 right-4 text-[10px] font-semibold bg-black/70 text-white rounded-full px-2 py-1">
                  Coming soon
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CarTypeSelection;
