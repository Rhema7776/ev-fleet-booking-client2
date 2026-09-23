import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

export interface BottomNavItem {
  icon: LucideIcon;
  label: string;
  path: string;
  /** Match the route exactly (e.g. for an index/home route at "/dashboard"
      that would otherwise also match every nested child path). */
  end?: boolean;
}

interface BottomNavProps {
  items: BottomNavItem[];
  /** "bar" — full-width edge-to-edge bar with labels (fleet section).
      "floating" — small centered pill, icon-only, filled circle behind
      the active icon. Matches the real Figma design for the dashboard
      section's nav (Home/Vehicles/Wallet), which the earlier hardcoded
      version inside Dashboard.tsx had the right shape for but was never
      actually wired up to navigate anywhere. */
  variant?: "bar" | "floating";
}

const BottomNav = ({ items, variant = "bar" }: BottomNavProps) => {
  if (variant === "floating") {
    return (
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[280px] px-2 z-50">
        <div className="flex items-center justify-between bg-white rounded-full shadow-lg px-3 py-2">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.end}
                aria-label={item.label}
                className={({ isActive }) =>
                  `w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
                    isActive ? "bg-[#0B2B21]" : ""
                  }`
                }
              >
                {({ isActive }) => (
                  <Icon className={`w-5 h-5 ${isActive ? "text-[#B9F6CA]" : "text-gray-400"}`} />
                )}
              </NavLink>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t h-20 flex justify-around items-center z-50">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.label}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-xs ${
                isActive ? "text-brand-primary" : "text-gray-400"
              }`
            }
          >
            <Icon size={22} />
            {item.label}
          </NavLink>
        );
      })}
    </div>
  );
};

export default BottomNav;
