import { useNavigate } from "react-router-dom";

import { useBooking } from "@/features/booking/BookingContext";
import BookingSuccessScreen from "@/components/booking/BookingSuccessScreen";

function nextPaymentDate() {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  return date.toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
}

const VehicleClaimed = () => {
  const navigate = useNavigate();
  const { booking } = useBooking();

  return (
    <BookingSuccessScreen
      vehicleImage={booking.dedicatedVehicleImage}
      title="This vehicle is now yours!"
      badge={
        booking.dedicatedVehicleName
          ? `${booking.dedicatedVehicleName} · Plate: ${booking.dedicatedVehiclePlate}`
          : undefined
      }
      description="Your dedicated vehicle has been booked successfully."
      buttonText="View my booking"
      onButtonClick={() => navigate("/booking/economy/dedicated/details")}
      secondaryText="Done"
      onSecondaryClick={() => navigate("/dashboard")}
    >
      <div className="w-full max-w-xs bg-white/10 rounded-2xl p-4 mt-6 text-left text-sm text-white">
        <div className="flex justify-between mb-2">
          <span className="text-white/70">Commitment period</span>
          <span className="font-medium">1 month</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/70">Next payment date</span>
          <span className="font-medium">{nextPaymentDate()}</span>
        </div>
      </div>
    </BookingSuccessScreen>
  );
};

export default VehicleClaimed;
