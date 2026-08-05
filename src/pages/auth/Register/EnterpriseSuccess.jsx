import { useNavigate } from "react-router-dom";

import AuthContainer from "@/components/auth/AuthContainer";
import Button from "@/components/ui/button";

import padlockIcon from "@/assets/images/padlock_Icon.svg";

import { ROUTES } from "@/constants/routes";

const EnterpriseSuccess = () => {

    const navigate = useNavigate();

    return (

        <AuthContainer>

            <main
                className="
                    min-h-screen
                    flex
                    flex-col
                    justify-between
                    items-center
                    text-center
                    px-6
                    py-16
                    rounded-[32px]
                    bg-gradient-to-b
                    from-green-500
                    via-green-900
                    to-[#001f18]
                "
            >

                <div className="mt-24">

                    <img
                        src={padlockIcon}
                        alt="Success"
                        className="w-24 h-24 object-contain"
                    />

                </div>

                <div className="flex-1 flex flex-col justify-center">

                    <h1
                        className="
                            text-white
                            text-4xl
                            font-extrabold
                            leading-tight
                        "
                    >

                        Enterprise
                        <br />
                        account created.

                    </h1>

                    <p
                        className="
                            mt-6
                            text-white/90
                            text-sm
                            max-w-xs
                            mx-auto
                        "
                    >

                        Your enterprise account has been created successfully.
                        You can now log in and begin managing your fleet.

                    </p>

                </div>

                <div className="w-full">

                    <Button
                        variant="outline"
                        onClick={() => navigate(ROUTES.LOGIN)}
                    >

                        Log in

                    </Button>

                </div>

            </main>

        </AuthContainer>

    );

};

export default EnterpriseSuccess;