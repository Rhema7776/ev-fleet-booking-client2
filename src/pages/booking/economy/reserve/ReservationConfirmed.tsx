import { useLocation, useNavigate } from "react-router-dom";

import { useBooking } from "@/features/booking/BookingContext";
import { ROUTES } from "@/constants/routes";
import type { Booking } from "@/services/booking/bookingService";
import BookingSuccessScreen from "@/components/booking/BookingSuccessScreen";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NG", { month: "long", day: "numeric" });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-NG", { hour: "numeric", minute: "2-digit" });
}

const ReservationConfirmed = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: { booking?: Booking } | null };
  const { booking: bookingContext, resetBooking } = useBooking();

  const booking = state?.booking;
  const hours =
    booking && booking.startTime && booking.endTime
      ? Math.round(
          (new Date(booking.endTime).getTime() - new Date(booking.startTime).getTime()) /
            (1000 * 60 * 60)
        )
      : null;

  const handleViewReservation = () => {
    resetBooking();

    if (booking) {
      navigate(`/booking/${booking.id}/live`);
      return;
    }

    navigate(ROUTES.DASHBOARD);
  };

  return (
    <BookingSuccessScreen
      vehicleImage={bookingContext.selectedVehicleImage}
      title="Reservation confirmed!"
      badge={booking?.pickupLocation ? `Economy · ${booking.pickupLocation}` : undefined}
      description={
        booking && hours
          ? `Your vehicle is reserved for ${hours} hour${hours > 1 ? "s" : ""} on ${formatDate(
              booking.startTime
            )}, ${formatTime(booking.startTime)}.`
          : "Your reservation has been confirmed."
      }
      buttonText="View reservation"
      onButtonClick={handleViewReservation}
    />
  );
};

export default ReservationConfirmed;
