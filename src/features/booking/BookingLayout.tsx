import { Outlet } from "react-router-dom";
import { BookingProvider } from "./BookingContext";

/**
 * Wraps the entire /booking/* route tree in BookingProvider, so every
 * step in the flow (type -> vehicle -> method -> details -> review ->
 * confirmation) shares one piece of state instead of threading it
 * through location.state across 6+ navigate() calls.
 */
const BookingLayout = () => {
  return (
    <BookingProvider>
      <Outlet />
    </BookingProvider>
  );
};

export default BookingLayout;
