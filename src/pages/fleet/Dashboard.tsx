import FleetHeader from "@/components/fleet/FleetHeader";
import FleetSearch from "@/components/fleet/FleetSearch";
import FleetStats from "@/components/fleet/FleetStats";
import CategoryTabs from "@/components/fleet/CategoryTabs";
import VehicleGrid from "@/components/fleet/VehicleGrid";
import LogoutButton from "@/components/auth/LogoutButton";

const Dashboard = () => {
  return (
    <div className="px-6 pt-10 pb-28 bg-[#F7F8F8] min-h-screen">
      <FleetHeader />

      <FleetSearch />

      <FleetStats />

      <CategoryTabs />

      <VehicleGrid />

      <LogoutButton />
    </div>
  );
};

export default Dashboard;
