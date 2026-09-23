import { createContext, useContext, useState, type ReactNode } from "react";

// Field names deliberately match the real backend's createBookingSchema
// exactly (bookingValidator.ts), so the eventual API call is a direct
// mapping, not a translation layer invented on the frontend.
export type VehicleCategory = "ECONOMY" | "EXECUTIVE" | "VIP";
export type BookingMode = "STRAIGHT" | "RESERVE" | "DEDICATED";

export interface BookingFlowState {
  vehicleCategory: VehicleCategory | null;
  ratePerHour: number | null;

  /** UI-only — which specific vehicle the user browsed/tapped on the
      marketplace screen. NOT sent to the real booking API: the backend's
      Booking model has no vehicleId field at all, only vehicleCategory +
      vehicleCount (it auto-assigns from available inventory). Kept here
      purely so the vehicle-selection screen can show a selected state
      and so the review/success screens can display what was picked. */
  selectedVehicleName: string | null;
  selectedVehicleImage: string | null;

  bookingMode: BookingMode | null;
  vehicleCount: number;
  startTime: string; // ISO datetime-local value
  endTime: string;
  pickupLocation: string;
  dropoffLocation: string;
  customerName: string;
  customerPhone: string;

  /** Dedicated mode only — claiming a specific vehicle involves data
      the STRAIGHT/RESERVE flows never touch: a real plate (not just a
      category), and a flat monthly rate instead of an hourly one. */
  dedicatedVehicleId: number | null;
  dedicatedVehicleName: string | null;
  dedicatedVehiclePlate: string | null;
  dedicatedVehicleImage: string | null;
  monthlyRate: number | null;
}

const initialState: BookingFlowState = {
  vehicleCategory: null,
  ratePerHour: null,
  selectedVehicleName: null,
  selectedVehicleImage: null,
  bookingMode: null,
  vehicleCount: 1,
  startTime: "",
  endTime: "",
  pickupLocation: "",
  dropoffLocation: "",
  customerName: "",
  customerPhone: "",
  dedicatedVehicleId: null,
  dedicatedVehicleName: null,
  dedicatedVehiclePlate: null,
  dedicatedVehicleImage: null,
  monthlyRate: null,
};

interface BookingContextValue {
  booking: BookingFlowState;
  updateBooking: (updates: Partial<BookingFlowState>) => void;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [booking, setBooking] = useState<BookingFlowState>(initialState);

  const updateBooking = (updates: Partial<BookingFlowState>) => {
    setBooking((prev) => ({ ...prev, ...updates }));
  };

  const resetBooking = () => setBooking(initialState);

  return (
    <BookingContext.Provider value={{ booking, updateBooking, resetBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextValue => {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider.");
  }

  return context;
};
