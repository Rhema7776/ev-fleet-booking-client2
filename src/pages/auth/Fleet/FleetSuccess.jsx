import { useLocation, useNavigate } from "react-router-dom";

import AuthContainer from "@/components/auth/AuthContainer";

import Button from "@/components/ui/Button";

import successImage from "@/assets/images/fleetsuccess.svg";

import { ROUTES } from "@/constants/routes";

const FleetSuccess = () => {

    const navigate = useNavigate();

    const { state } = useLocation();

    const companyName =

        state?.companyName ||

        "Fleet Owner";

    return (

        <AuthContainer>

            <div className="flex flex-col items-center justify-center min-h-screen text-center">

                <img

                    src={successImage}

                    alt="Success"

                    className="w-64"

                />

                <h1 className="mt-10 text-[34px] font-black">

                    Welcome,

                    <br />

                    {companyName}

                </h1>

                <p className="mt-4 text-gray-500">

                    Your fleet account has been created successfully.

                </p>

                <div className="mt-12 w-full">
                    <ActionButton
                        variant="fleetSuccess"
                        onClick={() => navigate(ROUTES.FLEET_DASHBOARD)}
                    >
                        Add vehicles
                    </ActionButton>
                    <button
                        className="
                            mt-5
                            h-12
                            px-8
                            rounded-full
                            bg-[#F3F4F6]
                            font-semibold
                        "
                        onClick={() => navigate(ROUTES.FLEET_DASHBOARD)}
                    >
                        I'll do this later
                    </button>

                </div>

            </div>

        </AuthContainer>

    );

};

export default FleetSuccess;