import { useNavigate } from "react-router-dom";

import AuthContainer from "@/components/auth/AuthContainer";
import Button from "@/components/ui/Button";

import fleetWelcome from "@/assets/images/fleet/fleet-welcome.svg";

import { ROUTES } from "@/constants/routes";

const FleetWelcome = () => {

    const navigate = useNavigate();

    return (

        <AuthContainer>

            <div
                className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    min-h-screen
                    text-center
                "
            >

                <img
                    src={fleetWelcome}
                    alt="Fleet Welcome"
                    className="w-72 mb-10"
                />

                <h1
                    className="
                        text-[32px]
                        font-black
                        leading-tight
                        text-brand-primary-dark
                    "
                >
                    We can't wait
                    <br />
                    to welcome
                    <br />
                    your fleet
                </h1>

                <p
                    className="
                        mt-5
                        text-[#6B7280]
                        text-base
                        max-w-[320px]
                        leading-7
                    "
                >
                    Let's set up your fleet profile so
                    businesses can start booking your
                    vehicles.
                </p>

                <div className="mt-12 w-full">

                    <Button
                        variant="dark"
                        onClick={() =>
                            navigate(
                                ROUTES.FLEET_REGISTER
                            )
                        }
                    >
                        Set up my fleet
                    </Button>

                </div>

            </div>

        </AuthContainer>

    );

};

export default FleetWelcome;