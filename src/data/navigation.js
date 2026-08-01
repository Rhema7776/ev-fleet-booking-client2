import {
    LayoutDashboard,
    Car,
    Users,
    CalendarDays,
    UserCog,
    Settings,
} from "lucide-react";

const navigation = [

    {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/",
    },

    {
        title: "Fleet Owners",
        icon: Users,
        path: "/fleet-owners",
    },

    {
        title: "Vehicles",
        icon: Car,
        path: "/vehicles",
    },

    {
        title: "Bookings",
        icon: CalendarDays,
        path: "/bookings",
    },

    {
        title: "Agents",
        icon: UserCog,
        path: "/agents",
    },

    {
        title: "Settings",
        icon: Settings,
        path: "/settings",
    },

];

export default navigation;