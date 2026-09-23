import { Link, useNavigate } from "react-router-dom";

import AuthContainer from "@/components/auth/AuthContainer";
import AuthHeader from "@/components/auth/AuthHeader";

import SelectionCard from "@/components/cards/SelectionCard";

import leftArrow from "@/assets/images/Icon Button.svg";

import fleetownercar from "@/assets/images/fleetownercar.svg";
import partnercar from "@/assets/images/partnercar2.svg";

import { ROUTES } from "@/constants/routes";

const RegistrationType = () => {
  const navigate = useNavigate();

  return (
    <AuthContainer>
      <div className="min-h-screen overflow-hidden flex flex-col">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="w-12 h-12 rounded-full bg-white flex items-center justify-center"
        >
          <img src={leftArrow} alt="" />
        </button>

        {/* Title */}

        <div className="mt-12">
          {/* AuthHeader already renders its own <h1> — this used to be
              wrapped in an extra <h1>, which is invalid nested-heading
              HTML and made the wrapper's own font sizing dead code (the
              actual rendered size came from AuthHeader's internal
              text-[35px], not this wrapper's clamp(42px,7vw,56px)).
              Also dropped the description prop here — "Enter your
              details to continue" doesn't fit a tier-selection screen
              with no form, and duplicated the real subtitle just below. */}
          <AuthHeader darkText="Let's get you" lightText="moving" />

          <p className="mt-2 text-white/90 text-lg">Choose how you'll use the platform.</p>
        </div>
        {/* Cards */}
        <div className="flex-1 flex flex-col justify-center gap-5">
          <SelectionCard
            title={<>I'd love to partner</>}
            description="Become an agent or partner."
            background="#2DB654"
            textColor="#081E19"
            arrowBackground="#F9F9F9"
            arrowColor="#081E19"
            onClick={() => navigate("/auth/register/partner")}
            image={partnercar}
            imagePosition="right"
          />

          <SelectionCard
            title={<>I own a fleet</>}
            description="Register your vehicles."
            background="#081E19"
            textColor="#FFFFFF"
            arrowBackground="#F9F9F9"
            arrowColor="#081E19"
            onClick={() => navigate(ROUTES.FLEET_TRANSITION)}
            image={fleetownercar}
            imagePosition="right"
          />
        </div>

        {/* Footer */}
        <div className="text-center text-white pb-2">
          Already have an account?
          <Link to="/auth/login" className="underline ml-2 font-bold">
            Log in
          </Link>
        </div>
      </div>
    </AuthContainer>
  );
};

export default RegistrationType;
