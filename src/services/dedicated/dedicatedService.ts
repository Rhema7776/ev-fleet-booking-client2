import api, { unwrap } from "../api";

export interface ClaimVehicleResult {
  subscriptionId: number;
  authorizationUrl: string;
  reference: string;
}

export const claimVehicle = async (vehicleId: number): Promise<ClaimVehicleResult> => {
  const response = await api.post<{
    success: boolean;
    message: string;
    data: ClaimVehicleResult;
  }>("/dedicated/claim", { vehicleId });

  return unwrap(response).data;
};

export interface DedicatedSubscription {
  id: number;
  userId: number;
  vehicleId: number;
  monthlyRate: number;
  status: "PENDING_PAYMENT" | "ACTIVE" | "PAST_DUE" | "CANCELLED";
  startDate: string | null;
  nextPaymentDate: string | null;
  paystackReference: string;
  vehicle: {
    id: number;
    name: string;
    plate: string;
    category: string;
  };
}

export const getMySubscriptions = async (): Promise<DedicatedSubscription[]> => {
  const response = await api.get<{
    success: boolean;
    message: string;
    data: DedicatedSubscription[];
  }>("/dedicated/my-subscriptions");

  return unwrap(response).data;
};
