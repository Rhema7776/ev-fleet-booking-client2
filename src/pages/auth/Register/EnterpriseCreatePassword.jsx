import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AuthContainer from "@/components/auth/AuthContainer";
import AuthBackButton from "@/components/auth/AuthBackButton";
import AuthProgressBar from "@/components/auth/AuthProgressBar";
import AuthHeader from "@/components/auth/AuthHeader";
import PasswordInput from "@/components/auth/PasswordInput";
import Button from "@/components/ui/button";

import { ROUTES } from "@/constants/routes";

const EnterpriseCreatePassword = () => {

    const navigate = useNavigate();

    const { state } = useLocation();

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const passwordsMatch =
        password.length >= 8 &&
        password === confirmPassword;

    return (

        <AuthContainer>
            <div className="flex items-center gap-3">
                <AuthBackButton />

                <AuthProgressBar
                    current={state?.currentStep ?? 2}
                    total={state?.totalSteps ?? 4}
                />
            </div>

            <AuthHeader
                darkText="Create"
                lightText="your password"
                description="Create a secure password for your enterprise account."
            />

            <div className="mt-8 space-y-5">

                <PasswordInput
                    label="Password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <PasswordInput
                    label="Confirm Password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) =>
                        setConfirmPassword(e.target.value)
                    }
                />

            </div>

            <div className="mt-10">

                <Button
                    variant="dark"
                    disabled={!passwordsMatch}
                    onClick={() =>
                        navigate(
                            ROUTES.ENTERPRISE_PROFILE,
                            {
                                state: {
                                    ...state,
                                    password,
                                },
                            }
                        )
                    }
                >

                    Continue

                </Button>

            </div>

        </AuthContainer>

    );

};

export default EnterpriseCreatePassword;