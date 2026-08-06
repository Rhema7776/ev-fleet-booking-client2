import { Outlet } from "react-router-dom";

import BottomNavigation from "@/components/fleet/BottomNavigation";

const FleetLayout = () => {

    return (

        <div
            className="
                min-h-screen
                bg-[#F7F8F8]
                pb-28
            "
        >

            <Outlet />

            <BottomNavigation />

        </div>

    );

};

export default FleetLayout;