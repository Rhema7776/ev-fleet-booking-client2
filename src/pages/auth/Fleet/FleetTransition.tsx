import { useNavigate } from "react-router-dom";

import ActionButton from "@/components/ui/ActionButton";
import AuthHeader from "@/components/auth/AuthHeader";
// import hero from "@/assets/images/fleet-transition/fleet-hero.svg";
import hero from "@/assets/images/fleet-transition/fleet-hero2.svg";

import { ROUTES } from "@/constants/routes";

const FleetTransition = () => {
  const navigate = useNavigate();

  return (
    <main>
      <div
        className="relative min-h-screen overflow-hidden flex flex-col"
        style={{
          backgroundColor: "#081E19",
        }}
      >
        {/* Teal glow — only covers the lower ~55% of the screen,
                    fading up from the dark base into a muted teal.
                    Matches the extracted gradient stops exactly. */}
        {/* <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 top-[37%]"
                    style={{
                    background:
                        "linear-gradient(0deg,  #23846E  8.29%, rgba(8, 30, 25, 0.3) 91.71%)"
                    }}
                /> */}

        {/* Hero */}

        <div className="flex items-center">
          <img src={hero} alt="Fleet" className="w-full object-contain" />
        </div>

        {/* Content */}
        <div className="px-5 mt-6">
          <div className="relative pb-6">
            <AuthHeader
              title={
                <>
                  We can't wait
                  <br />
                  to welcome
                  <br />
                  your Fleet
                </>
              }
              titleClassName="text-center text-[#D8F9E0] text-[clamp(40px,7vw,56px)] leading-[0.95]"
            />

            <div className="space-y-4 mt-20">
              <ActionButton variant="light" onClick={() => navigate(ROUTES.FLEET_BUSINESS)}>
                Set Up My Fleet
              </ActionButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FleetTransition;
