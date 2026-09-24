import api, { unwrap } from "../api";

export interface Vehicle {
  id: number;
  name: string;
  plate: string;
  category: "ECONOMY" | "EXECUTIVE" | "VIP";
  status: "AVAILABLE" | "ACTIVE" | "RESERVED" | "BOOKED" | "UNAVAILABLE" | "DEDICATED";
  pricePerHour: number;
  isElectric: boolean;
  imageUrl: string | null;
  fleetOwnerId: number;
}

export interface CreateVehicleInput {
  name: string;
  plate: string;
  category: "ECONOMY" | "EXECUTIVE" | "VIP";
  pricePerHour: number;
  isElectric?: boolean;
  imageUrl?: string;
  // ADMIN-only: attach the vehicle to a specific fleet owner instead of
  // the caller's own profile. Backend already supports this — see
  // vehicleService.ts:create() on the API side. Omit for non-admins.
  fleetOwnerId?: number;
}

// Separate call from createVehicle() by design — the create-vehicle
// endpoint's JSON contract is used elsewhere and stays untouched; this
// attaches a photo to an already-created vehicle as a follow-up step.
// From the fleet owner's perspective it's one flow (AddVehicleModal
// calls both in sequence); underneath it's two requests.
export const uploadVehicleImage = async (
  vehicleId: number,
  file: File
): Promise<Vehicle> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await api.post<{
    success: boolean;
    message: string;
    data: Vehicle;
  }>(`/vehicles/${vehicleId}/image`, formData, {
    // The shared `api` instance defaults every request to
    // Content-Type: application/json (see api.ts). Overriding it to
    // undefined here lets the browser set the correct
    // multipart/form-data boundary itself — explicitly hardcoding
    // "multipart/form-data" as a string would omit that boundary and
    // break the upload.
    headers: { "Content-Type": undefined },
  });

  return unwrap(response).data;
};

interface PaginatedVehicles {
  vehicles: Vehicle[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

// Assumed to follow the same {resource: [...], pagination: {...}} shape
// as every other list endpoint in this backend (bookings, etc.) — not
// independently confirmed via Swagger the way the create schema was.
// Worth a quick check if this doesn't match what you actually get back.
export const listVehicles = async (): Promise<Vehicle[]> => {
  const response = await api.get<{ success: boolean; message: string; data: PaginatedVehicles }>(
    "/vehicles"
  );

  return unwrap(response).data.vehicles;
};

export const createVehicle = async (data: CreateVehicleInput): Promise<Vehicle> => {
  const response = await api.post<{ success: boolean; message: string; data: Vehicle }>(
    "/vehicles",
    data
  );

  return unwrap(response).data;
};