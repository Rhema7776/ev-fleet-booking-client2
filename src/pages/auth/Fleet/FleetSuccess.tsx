import { useLocation, useNavigate } from "react-router-dom";

import ActionButton from "@/components/ui/ActionButton";
import successImage from "@/assets/images/fleetsuccess.svg";

import { ROUTES } from "@/constants/routes";

interface FleetSuccessState {
  companyName?: string;
}

const FleetSuccess = () => {
  const navigate = useNavigate();

  const { state } = useLocation() as { state: FleetSuccessState | null };

  const companyName = state?.companyName || "Fleet Owner";

  return (
    <main
      className="min-h-screen px-6"
      style={{
        background: "linear-gradient(180deg, rgba(8,30,25,0.3) 0%, #23846E 100%)",
      }}
    >
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-[#FFFFFF]">
        <img src={successImage} alt="Success" />

        <h1 className="text-[32px] font-black">
          Welcome,
          <br />
          {companyName}
        </h1>

        <p className="text-sm">Your fleet account has been created successfully.</p>

        <div className="w-full mt-4">
          <ActionButton variant="fleetSuccess" onClick={() => navigate(ROUTES.FLEET_DASHBOARD)}>
            Add vehicles
          </ActionButton>

          <button
            className="mt-5 h-12 px-8 rounded-full bg-[#F3F4F6] font-semibold"
            onClick={() => navigate(ROUTES.FLEET_DASHBOARD)}
          >
            I'll do this later
          </button>
        </div>
      </div>
    </main>
  );
};

export default FleetSuccess;
