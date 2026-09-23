import { useState, type ChangeEvent, type FormEvent } from "react";
import { AxiosError } from "axios";

import { createVehicle, type Vehicle } from "@/services/vehicle/vehicleService";

interface AddVehicleModalProps {
  onClose: () => void;
  onCreated: (vehicle: Vehicle) => void;
}

const CATEGORIES = ["ECONOMY", "EXECUTIVE", "VIP"] as const;

const AddVehicleModal = ({ onClose, onCreated }: AddVehicleModalProps) => {
  const [name, setName] = useState("");
  const [plate, setPlate] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("ECONOMY");
  const [pricePerHour, setPricePerHour] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isValid = name.trim() && plate.trim() && pricePerHour && Number(pricePerHour) > 0;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;

    try {
      setSubmitting(true);
      setError("");

      const vehicle = await createVehicle({
        name: name.trim(),
        plate: plate.trim(),
        category,
        pricePerHour: Number(pricePerHour),
      });

      onCreated(vehicle);
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      setError(axiosError.response?.data?.message || "Unable to add vehicle.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end bg-black/40" onClick={onClose}>
      <div
        className="w-full rounded-t-3xl bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-zinc-200" />

        <h2 className="mb-5 text-lg font-bold text-zinc-900">Add a vehicle</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-500">
              Vehicle name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              placeholder="e.g. VW e-Golf"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-500">
              Plate number
            </label>
            <input
              type="text"
              value={plate}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPlate(e.target.value)}
              placeholder="e.g. ABC-123-XY"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-500">Category</label>
            <div className="flex gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`flex-1 rounded-xl py-2.5 text-xs font-semibold transition ${
                    category === c ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-600"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-500">
              Price per hour (₦)
            </label>
            <input
              type="number"
              min="1"
              value={pricePerHour}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPricePerHour(e.target.value)}
              placeholder="e.g. 10000"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
              required
            />
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={!isValid || submitting}
            className="w-full rounded-full bg-zinc-900 py-3.5 text-sm font-semibold text-white disabled:opacity-40"
          >
            {submitting ? "Adding..." : "Add vehicle"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVehicleModal;