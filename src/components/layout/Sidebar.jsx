import {
  LayoutDashboard,
  Truck,
  Car,
  CalendarDays,
  Users,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Fleet Owners",
    icon: Truck,
  },
  {
    title: "Vehicles",
    icon: Car,
  },
  {
    title: "Bookings",
    icon: CalendarDays,
  },
  {
    title: "Agents",
    icon: Users,
  },
  {
    title: "Settings",
    icon: Settings,
  },
];

function Sidebar() {
  return (
    <aside className="w-72 bg-slate-900 text-white flex flex-col">

      <div className="border-b border-slate-800 p-8">

        <h1 className="text-2xl font-bold">

          EV Fleet

        </h1>

        <p className="text-slate-400 text-sm mt-1">

          Booking Platform

        </p>

      </div>

      <nav className="flex-1 p-4">

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (

            <button
              key={item.title}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-slate-800 transition-all duration-200 mb-2 cursor-pointer"
            >

              <Icon size={20} />

              <span>{item.title}</span>

            </button>

          );

        })}

      </nav>

    </aside>
  );
}

export default Sidebar;