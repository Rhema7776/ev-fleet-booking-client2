import { useNavigate } from "react-router-dom";

import AuthContainer from "@/components/auth/AuthContainer";
import Button from "@/components/ui/Button";

import padlockIcon from "@/assets/images/padlock_Icon.svg";

const RegistrationSuccess = () => {

    const navigate = useNavigate();

    return (

        <AuthContainer >

            <main
                className="
                    min-h-screen
                    flex
                    flex-col
                    items-center
                    justify-between
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
                        className="w-24 h-24"
                    />

                </div>

                <div className="flex-1 flex flex-col justify-center">

                    <h1
                        className="
                            text-white
                            text-5xl
                            font-extrabold
                            tracking-tight
                        "
                    >

                        You're in

                    </h1>

                    <p
                        className="
                            mt-6
                            text-white/90
                            text-base
                            max-w-xs
                            mx-auto
                        "
                    >

                        Welcome to LeaseHub.

                        <br />

                        Your account has been created successfully.

                    </p>

                </div>

                <div className="w-full mb-4">

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

export default RegistrationSuccess;