import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import AuthContainer from "@/components/auth/AuthContainer";
import AuthBackButton from "@/components/auth/AuthBackButton";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthProgressBar from "@/components/auth/AuthProgressBar";
import PasswordInput from "@/components/auth/PasswordInput";

import Button from "@/components/ui/button";

const CreatePassword = () => {

    const navigate = useNavigate();

    const { state } = useLocation();

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);


    const {
        email,
        role,
        businessName,
        contactPerson,
        phoneNumber,
    } = state || {};

    const [error, setError] = useState("");


    const handleContinue = async () => {

        setError("");

        if (!password || !confirmPassword) {

            return setError("Please complete all fields.");

        }

        if (password !== confirmPassword) {

            return setError("Passwords do not match.");

        }

        setLoading(true);

        if (role === "ENTERPRISE") {

            navigate(
                ROUTES.ENTERPRISE_PROFILE,
                {
                    state: {
                        email,
                        businessName,
                        contactPerson,
                        phoneNumber,
                    },
                }
            );

        }
        else if (role === "FLEET_OWNER") {

            navigate(
                ROUTES.DASHBOARD
                // Temporary.
                //  we'll navigate to Fleet Details later.
            );

        }
        else {

            navigate(ROUTES.REGISTER_SUCCESS);

        }
    }; 
    return (

        <AuthContainer>

            <AuthBackButton />

            <AuthProgressBar
                current={state?.currentStep ?? 2}
                total={state?.totalSteps ?? 4}
            />

            <AuthHeader
                darkText="Create"
                lightText="password"
                description="Choose a secure password for your account."
            />

            <div className="mt-10 space-y-6">

                <PasswordInput
                    label="Password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <PasswordInput
                    label="Confirm Password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                {

                    error && (

                        <p className="text-sm text-red-500">

                            {error}

                        </p>

                    )

                }

                <Button

                    variant="dark"

                    loading={loading}

                    onClick={handleContinue}

                >
                    Continue

                </Button>

            </div>

        </AuthContainer>

    );

};

export default CreatePassword;