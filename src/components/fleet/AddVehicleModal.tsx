import { useState, useEffect, useRef, type ChangeEvent, type FormEvent } from "react";
import { Camera, X } from "lucide-react";
import { AxiosError } from "axios";

import {
  createVehicle,
  uploadVehicleImage,
  type Vehicle,
} from "@/services/vehicle/vehicleService";
import { listFleetOwners, type FleetOwner } from "@/services/vehicle/fleetOwnerService";
import { getCurrentUser } from "@/services/auth/authService";

interface AddVehicleModalProps {
  onClose: () => void;
  onCreated: (vehicle: Vehicle) => void;
}

const CATEGORIES = ["ECONOMY", "EXECUTIVE", "VIP"] as const;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

const AddVehicleModal = ({ onClose, onCreated }: AddVehicleModalProps) => {
  const [name, setName] = useState("");
  const [plate, setPlate] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("ECONOMY");
  const [pricePerHour, setPricePerHour] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Photo is optional — the vehicle is created either way. If it's
  // provided, the upload happens as a follow-up call right after
  // creation (see the two-step comment in vehicleService.ts). If that
  // second step fails, the vehicle already exists; we surface a soft
  // warning rather than treating it as a failed submission.
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const user = getCurrentUser();
  const isAdmin = user?.role === "ADMIN";

  // Only relevant for ADMIN. Undefined = "use my own fleet-owner
  // profile" (the backend's default fallback) rather than a hard
  // requirement to pick one every time.
  const [fleetOwners, setFleetOwners] = useState<FleetOwner[]>([]);
  const [fleetOwnersLoading, setFleetOwnersLoading] = useState(false);
  const [selectedFleetOwnerId, setSelectedFleetOwnerId] = useState<string>("");

  useEffect(() => {
    if (!isAdmin) return;

    let cancelled = false;
    setFleetOwnersLoading(true);

    listFleetOwners()
      .then((owners) => {
        if (!cancelled) setFleetOwners(owners);
      })
      .catch(() => {
        // Non-fatal: ADMIN can still submit without picking one and fall
        // back to their own profile, so a failed fetch here shouldn't
        // block the form.
      })
      .finally(() => {
        if (!cancelled) setFleetOwnersLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isAdmin]);

  const isValid = name.trim() && plate.trim() && pricePerHour && Number(pricePerHour) > 0;

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPhotoError("");

    if (!file.type.startsWith("image/")) {
      setPhotoError("Please choose an image file.");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setPhotoError("Image must be under 5MB.");
      return;
    }

    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const removePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    setPhotoError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;

    try {
      setSubmitting(true);
      setError("");

      let vehicle = await createVehicle({
        name: name.trim(),
        plate: plate.trim(),
        category,
        pricePerHour: Number(pricePerHour),
        ...(isAdmin && selectedFleetOwnerId
          ? { fleetOwnerId: Number(selectedFleetOwnerId) }
          : {}),
      });

      if (photoFile) {
        try {
          vehicle = await uploadVehicleImage(vehicle.id, photoFile);
        } catch {
          // Vehicle was created successfully; only the photo attach step
          // failed. Don't block on this — the fallback category
          // illustration covers the vehicle until a photo is added later
          // (e.g. via edit, once that exists).
          setPhotoError("Vehicle added, but the photo couldn't be uploaded. You can add it later.");
        }
      }

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
              Vehicle photo (optional)
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
            {photoPreview ? (
              <div className="relative h-32 w-full overflow-hidden rounded-xl">
                <img src={photoPreview} alt="Vehicle preview" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={removePhoto}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex h-24 w-full flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-zinc-300 text-zinc-400"
              >
                <Camera className="h-5 w-5" />
                <span className="text-xs">Add a real photo, or skip — we'll show a placeholder</span>
              </button>
            )}
            {photoError && <p className="mt-1 text-[11px] text-red-500">{photoError}</p>}
          </div>

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

          {isAdmin && (
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-500">
                Fleet owner
              </label>
              <select
                value={selectedFleetOwnerId}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setSelectedFleetOwnerId(e.target.value)
                }
                disabled={fleetOwnersLoading}
                className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 bg-white"
              >
                <option value="">My own fleet</option>
                {fleetOwners.map((owner) => (
                  <option key={owner.id} value={owner.id}>
                    {owner.companyName}
                  </option>
                ))}
              </select>
              {fleetOwnersLoading && (
                <p className="mt-1 text-[11px] text-zinc-400">Loading fleet owners…</p>
              )}
            </div>
          )}

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