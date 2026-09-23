import { useLocation, useNavigate } from "react-router-dom";

import { useBooking } from "@/features/booking/BookingContext";
import { ROUTES } from "@/constants/routes";
import type { Booking } from "@/services/booking/bookingService";
import BookingSuccessScreen from "@/components/booking/BookingSuccessScreen";

const BookingConfirmed = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: { booking?: Booking } | null };
  const { booking: bookingContext, resetBooking } = useBooking();

  const booking = state?.booking;

  const handleViewBooking = () => {
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
      title="Booking confirmed!"
      description={
        booking
          ? `Your booking for ${booking.vehicleCount} economy car${
              booking.vehicleCount > 1 ? "s" : ""
            } has been requested. We'll assign a driver shortly.`
          : "Your booking request has been submitted."
      }
      buttonText="View booking"
      onButtonClick={handleViewBooking}
    />
  );
};

export default BookingConfirmed;
