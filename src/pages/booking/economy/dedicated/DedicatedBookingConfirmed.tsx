import { useLocation, useNavigate } from "react-router-dom";

import { useBooking } from "@/features/booking/BookingContext";
import { ROUTES } from "@/constants/routes";
import type { Booking } from "@/services/booking/bookingService";
import BookingSuccessScreen from "@/components/booking/BookingSuccessScreen";

const DedicatedBookingConfirmed = () => {
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
      vehicleImage={bookingContext.dedicatedVehicleImage}
      title="Booking confirmed!"
      description="Your assigned driver will arrive at your pickup location as scheduled."
      buttonText="View booking"
      onButtonClick={handleViewBooking}
    />
  );
};

export default DedicatedBookingConfirmed;
