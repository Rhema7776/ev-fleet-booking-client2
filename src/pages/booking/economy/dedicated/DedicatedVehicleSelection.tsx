import { useState } from "react";
import { ChevronLeft, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useBooking } from "@/features/booking/BookingContext";

// Placeholder marketplace data — same honest flag as the Straight and
// Reserve vehicle-selection screens.
interface MarketVehicle {
  id: number;
  name: string;
  plate: string;
  image: string;
}

const ECONOMY_VEHICLES: MarketVehicle[] = [
  { id: 1, name: "VW e-Golf", plate: "EKY-402-LA", image: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?q=80&w=300&auto=format&fit=crop" },
  { id: 2, name: "Ford Mustang Mach-E", plate: "XYZ-456-AB", image: "https://images.unsplash.com/photo-1617704548623-340376564e68?q=80&w=300&auto=format&fit=crop" },
  { id: 3, name: "Chevrolet Bolt EV", plate: "GHI-012-EF", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=300&auto=format&fit=crop" },
  { id: 4, name: "Nissan Leaf", plate: "JKL-345-GH", image: "https://images.unsplash.com/photo-1554744512-d6c603f27307?q=80&w=300&auto=format&fit=crop" },
  { id: 5, name: "Hyundai Kona Electric", plate: "MNO-678-IJ", image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=300&auto=format&fit=crop" },
  { id: 6, name: "BMW i3", plate: "PQR-901-KL", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=300&auto=format&fit=crop" },
];

const DEDICATED_MONTHLY_RATE = 1_500_000;
const DEDICATED_HOURLY_RATE = 15000;

function formatNaira(n: number) {
  return `₦${n.toLocaleString("en-NG")}`;
}

const DedicatedVehicleSelection = () => {
  const navigate = useNavigate();
  const { updateBooking } = useBooking();

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedVehicle = ECONOMY_VEHICLES.find((v) => v.id === selectedId);

  const handleConfirm = () => {
    if (!selectedVehicle) return;

    updateBooking({
      vehicleCategory: "ECONOMY",
      ratePerHour: DEDICATED_HOURLY_RATE,
      dedicatedVehicleId: selectedVehicle.id,
      dedicatedVehicleName: selectedVehicle.name,
      dedicatedVehiclePlate: selectedVehicle.plate,
      dedicatedVehicleImage: selectedVehicle.image,
      monthlyRate: DEDICATED_MONTHLY_RATE,
    });

    navigate("/booking/economy/dedicated/claim");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex items-center gap-3 px-5 pt-10 pb-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Back"
          className="w-9 h-9 rounded-full border border-zinc-200 flex items-center justify-center"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <h1 className="text-[15px] font-semibold text-zinc-900">Choose your vehicle</h1>
      </div>

      <div className="flex-1 px-5 pt-4 pb-32 grid grid-cols-2 gap-3">
        {ECONOMY_VEHICLES.map((vehicle) => {
          const selected = vehicle.id === selectedId;

          return (
            <button
              key={vehicle.id}
              onClick={() => setSelectedId(vehicle.id)}
              className={`relative rounded-2xl border p-3 text-left transition ${
                selected ? "border-emerald-500 ring-2 ring-emerald-500/30" : "border-zinc-100"
              }`}
            >
              {selected && (
                <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </span>
              )}

              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full h-16 object-cover rounded-lg mb-2"
              />

              <p className="text-[13px] font-semibold text-zinc-900 truncate">{vehicle.name}</p>
              <p className="text-[11px] text-zinc-400">Plate: {vehicle.plate}</p>

              <span className="mt-1 inline-flex items-center gap-1 text-[11px] text-sky-600">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                Available
              </span>
            </button>
          );
        })}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-100 px-5 py-4">
        {selectedVehicle && (
          <p className="text-xs text-sky-600 mb-2 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
            {formatNaira(DEDICATED_HOURLY_RATE)}/hr · reserved exclusively for you
          </p>
        )}

        <button
          type="button"
          onClick={handleConfirm}
          disabled={!selectedVehicle}
          className="w-full h-12 rounded-full bg-zinc-900 text-white text-sm font-semibold disabled:opacity-40 disabled:pointer-events-none"
        >
          Confirm this vehicle
        </button>
      </div>
    </div>
  );
};

export default DedicatedVehicleSelection;
