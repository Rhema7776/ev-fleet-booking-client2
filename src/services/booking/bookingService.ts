import api, { unwrap } from "../api";

export interface Driver {
  id: number;
  name: string;
  phone: string;
  licenseNumber: string;
  status: "AVAILABLE" | "ON_TRIP" | "OFFLINE";
  vehicleId: number | null;
}

// Matches the real backend Booking model exactly (schema.prisma).
// Decimal fields (ratePerHour, hoursBooked, totalAmount) are typed as
// number here — Prisma's Decimal serializes as a plain JSON number by
// default, but worth confirming against a real response once this is
// actually tested against the live API.
export interface Booking {
  id: number;
  bookingMode: "STRAIGHT" | "RESERVE" | "DEDICATED";
  vehicleCategory: "ECONOMY" | "EXECUTIVE" | "VIP";
  vehicleCount: number;
  customerName: string;
  customerPhone: string;
  pickupLocation: string;
  dropoffLocation: string;
  startTime: string;
  endTime: string;
  pickupTime?: string;
  dropoffTime?: string;
  hoursBooked: number;
  ratePerHour: number;
  totalAmount: number;
  priority: boolean;
  status: "PENDING" | "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  driverId: number | null;
  driver?: Driver | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingInput {
  bookingMode?: "STRAIGHT" | "RESERVE" | "DEDICATED";
  vehicleCategory: "ECONOMY" | "EXECUTIVE" | "VIP";
  vehicleCount?: number;
  customerName: string;
  customerPhone: string;
  pickupLocation: string;
  dropoffLocation: string;
  startTime: string;
  endTime: string;
  priority?: boolean;
}

export const createBooking = async (data: CreateBookingInput): Promise<Booking> => {
  const response = await api.post<{ success: boolean; message: string; data: Booking }>(
    "/bookings",
    data
  );

  return unwrap(response).data;
};

export interface ListBookingsParams {
  status?: Booking["status"];
  bookingMode?: Booking["bookingMode"];
  page?: number;
  limit?: number;
}

export interface PaginatedBookings {
  bookings: Booking[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

export const listBookings = async (params: ListBookingsParams = {}): Promise<PaginatedBookings> => {
  const response = await api.get<{ success: boolean; message: string; data: PaginatedBookings }>(
    "/bookings",
    { params }
  );

  return unwrap(response).data;
};

export const getBookingById = async (id: number): Promise<Booking> => {
  const response = await api.get<{ success: boolean; message: string; data: Booking }>(
    `/bookings/${id}`
  );

  return unwrap(response).data;
};
