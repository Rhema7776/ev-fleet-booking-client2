import { Bell } from "lucide-react";
import { getCurrentUser } from "@/services/auth/authService";

const FleetHeader = () => {
  const user = getCurrentUser();

  // Was user?.companyName — that field doesn't exist anywhere on the real
  // AuthUser type (confirmed from the backend: login only ever returns
  // id/fullName/email/role, never a company name), so this always
  // silently fell through to the generic "Fleet Owner" fallback. Using
  // fullName instead actually personalizes the greeting with real data.
  const displayName = user?.fullName || "Fleet Owner";

  return (
    <div className="flex justify-between items-start">
      <div>
        <p className="text-[#6E6E73] text-sm">Welcome,</p>

        <h1 className="text-[30px] font-black leading-tight">{displayName}</h1>
      </div>

      <button className="h-12 w-12 rounded-full bg-white shadow-sm flex items-center justify-center">
        <Bell size={20} />
      </button>
    </div>
  );
};

export default FleetHeader;
