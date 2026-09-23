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
}

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