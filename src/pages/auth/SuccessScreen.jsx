import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/constants/routes";

import AuthContainer from "@/components/auth/AuthContainer";
import Button from "@/components/ui/Button";

import padlockIcon from "@/assets/images/padlock_Icon.svg";
import individualSuccess from "@/assets/images/individual-success.svg";
// import enterpriseSuccess from "@/assets/images/enterprise-success.svg";

const illustrations = {
    password: padlockIcon,
    individual: individualSuccess,
    // enterprise: enterpriseSuccess,
};

const SuccessScreen = ({
    title,
    description,
    buttonText = "Let's go",
    redirectTo = ROUTES.DASHBOARD,
    illustration = "password",
}) => {

    const navigate = useNavigate();

    return (

        <AuthContainer>

            <div
                className="
                    flex
                    flex-col
                    justify-between
                    items-center
                    text-center
                    flex-1
                    min-h-[85vh]
                    bg-gradient-to-b
                    from-[#34D45D]
                    via-[#0E6B40]
                    to-[#031A14]
                    px-8
                    py-16
                "
            >

                <img
                    src={illustrations[illustration]}
                    alt=""
                    className="w-56 object-contain mt-8"
                />

                <div>

                    <h1 className="text-white text-5xl font-black leading-none whitespace-pre-line">

                        {title}

                    </h1>

                    <p className="text-white/90 mt-6">

                        {description}

                    </p>

                </div>

                <Button
                    variant="outline"
                    onClick={() => navigate(redirectTo)}
                >

                    {buttonText}

                </Button>

            </div>

        </AuthContainer>

    );

};

export default SuccessScreen;