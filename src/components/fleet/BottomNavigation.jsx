import {

    LayoutGrid,

    Truck,

    Route,

    Wallet,

    Menu,

} from "lucide-react";

import {

    NavLink,

} from "react-router-dom";

import {

    ROUTES,

} from "@/constants/routes";

const items = [

    {

        icon: LayoutGrid,

        label: "Home",

        path: ROUTES.FLEET_DASHBOARD,

    },

    {

        icon: Truck,

        label: "Fleet",

        path: ROUTES.FLEET_VEHICLES,

    },

    {

        icon: Route,

        label: "Trips",

        path: ROUTES.FLEET_TRIPS,

    },

    {

        icon: Wallet,

        label: "Earnings",

        path: ROUTES.FLEET_EARNINGS,

    },

    {

        icon: Menu,

        label: "More",

        path: ROUTES.FLEET_MORE,

    },

];

const BottomNavigation = () => {

    return (

        <div
            className="
                fixed
                bottom-0
                left-0
                right-0
                bg-white
                border-t
                h-20
                flex
                justify-around
                items-center
                z-50
            "
        >

            {

                items.map(item => {

                    const Icon = item.icon;

                    return (

                        <NavLink

                            key={item.label}

                            to={item.path}

                            className={({ isActive }) => `

                                flex

                                flex-col

                                items-center

                                gap-1

                                text-xs

                                ${
                                    isActive

                                        ? "text-brand-primary"

                                        : "text-gray-400"

                                }

                            `}

                        >

                            <Icon size={22} />

                            {item.label}

                        </NavLink>

                    );

                })

            }

        </div>

    );

};

export default BottomNavigation;