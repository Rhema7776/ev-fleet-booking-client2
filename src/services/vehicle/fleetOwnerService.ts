import api, { unwrap } from "../api";

export interface FleetOwner {
  id: number;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  isVerified: boolean;
  isActive: boolean;
}

interface PaginatedFleetOwners {
  fleetOwners: FleetOwner[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

// Confirmed against src/services/fleetOwnerService.ts on the backend —
// GET /fleet-owners returns { fleetOwners: [...], pagination: {...} },
// open to any authenticated user (no role restriction on the read).
export const listFleetOwners = async (): Promise<FleetOwner[]> => {
  const response = await api.get<{
    success: boolean;
    message: string;
    data: PaginatedFleetOwners;
  }>("/fleet-owners");

  return unwrap(response).data.fleetOwners;
};
