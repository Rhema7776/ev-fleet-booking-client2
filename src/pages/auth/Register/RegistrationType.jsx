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

            <div
                className="
                    min-h-screen
                    overflow-hidden
    
                    flex
                    flex-col
                "
            >
                {/* Back */}
                <button
                    onClick={() => navigate(-1)}
                    className="
                        w-12
                        h-12
                        rounded-full
                        bg-white
                        flex
                        items-center
                        justify-center
                    "
                >
                    <img
                        src={leftArrow}
                        alt=""
                    />
                </button>

                {/* Title */}

                <div className="mt-12">
                    <h1
                        className="
                            text-white
                            font-black
                            leading-[.92]
                        "
                        style={{
                            fontSize: "clamp(42px,7vw,56px)"
                        }}
                    >
                        <AuthHeader
                            darkText="Let's get you"
                            lightText="moving"
                            description="Enter your details to continue."
                        />
                    </h1>
                    <p
                        className="
                            mt-2
                            text-white/90
                            text-lg
                        "
                    >
                        Choose how you'll use the platform.
                    </p>
                </div>
                {/* Cards */}
                <div
                    className="
                        flex-1
                        flex
                        flex-col
                        justify-center
                        gap-5
                    "
                >
                    <SelectionCard
                        title={<>I'd love to partner</>}
                        description="Become an agent or partner."
                        background="#2DB654"
                        textColor="#081E19"
                        arrowBackground="#F9F9F9"
                        arrowColor="#081E19"
                        onClick={() =>
                            navigate("/auth/register/partner")
                        }
                        image={partnercar}
                        imagePosition="right"
                    />

                    <SelectionCard
                        title={
                            <>
                                I own
                                a fleet
                            </>
                        }
                        description="Register your vehicles."
                        background="#081E19"
                        textColor="#FFFFFF"
                        arrowBackground="#F9F9F9"
                        arrowColor="#081E19"
                        onClick={() =>
                            navigate(ROUTES.FLEET_TRANSITION)
                        }
                        image={fleetownercar}
                        imagePosition="right"
                    />
                </div>

                {/* Footer */}
                <div
                    className="
                        text-center
                        text-white
                        pb-2
                    "
                >
                    Already have an account?
                    <Link
                        to="/auth/login"
                        className="
                            underline
                            ml-2
                            font-bold
                        "
                    >

                        Log in

                    </Link>

                </div>

            </div>

        </AuthContainer>

    );

};

export default RegistrationType;

