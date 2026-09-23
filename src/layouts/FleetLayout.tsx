import { Outlet } from "react-router-dom";
import { Home, Truck, Route, Wallet, MoreHorizontal } from "lucide-react";

import BottomNav, { type BottomNavItem } from "@/components/navigation/BottomNav";
import { ROUTES } from "@/constants/routes";

const FLEET_NAV_ITEMS: BottomNavItem[] = [
  { icon: Home, label: "Home", path: ROUTES.FLEET_DASHBOARD, end: true },
  { icon: Route, label: "Bookings", path: ROUTES.FLEET_TRIPS },
  { icon: Truck, label: "Fleet", path: ROUTES.FLEET_VEHICLES },
  { icon: Wallet, label: "Earnings", path: ROUTES.FLEET_EARNINGS },
  { icon: MoreHorizontal, label: "More", path: ROUTES.FLEET_MORE },
];

const FleetLayout = () => {
  return (
    <div className="min-h-screen bg-[#F7F8F8] pb-28">
      <Outlet />

      <BottomNav items={FLEET_NAV_ITEMS} />
    </div>
  );
};

export default FleetLayout;
