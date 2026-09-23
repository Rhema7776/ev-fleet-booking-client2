import { Outlet } from "react-router-dom";
import { Home, Truck, Wallet } from "lucide-react";

import BottomNav, { type BottomNavItem } from "@/components/navigation/BottomNav";
import { ROUTES } from "@/constants/routes";

// Matches the real Figma design: just Home, Vehicles, Wallet — not the
// full list of every registered /dashboard route. The earlier version of
// this file (before this fix) had the right instinct (surface real
// routes) but the wrong item set — this design intentionally keeps the
// primary nav to 3 items, with FleetOwners/Bookings/Agents/Settings
// reached other ways rather than living in the tab bar.
const DASHBOARD_NAV_ITEMS: BottomNavItem[] = [
  { icon: Home, label: "Home", path: ROUTES.DASHBOARD, end: true },
  { icon: Truck, label: "Rides", path: `${ROUTES.DASHBOARD}/vehicles` },
  { icon: Wallet, label: "Wallet", path: ROUTES.DASHBOARD_WALLET },
];

function AppLayout() {
  return (
    <div className="min-h-screen bg-white pb-24">
      <Outlet />

      <BottomNav items={DASHBOARD_NAV_ITEMS} variant="floating" />
    </div>
  );
}

export default AppLayout;
