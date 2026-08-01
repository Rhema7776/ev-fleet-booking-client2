import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AuthContainer from "@/components/auth/AuthContainer";
import AuthBackButton from "@/components/auth/AuthBackButton";
import AuthProgressBar from "@/components/auth/AuthProgressBar";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthInput from "@/components/auth/AuthInput";
import Button from "@/components/ui/Button";

const EnterpriseAddress = () => {

    const navigate = useNavigate();

    const { state } = useLocation();

    const [address, setAddress] = useState("");

    const canContinue = address.trim() !== "";

    return (

        <AuthContainer>

            <AuthBackButton />

            <AuthProgressBar
                current={state?.currentStep ?? 2}
                total={state?.totalSteps ?? 4}
            />

            <AuthHeader
                darkText="Business"
                lightText="address"
                description="Tell us where your business operates."
            />

            <div className="mt-8">

                <AuthInput
                    label="Business Address"
                    placeholder="Enter business address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

            </div>

            <div className="mt-10">

                <Button
                    variant="dark"
                    disabled={!canContinue}
                    onClick={() =>
                        navigate(
                            "/auth/register/enterprise/verify",
                            {
                                state: {
                                    ...state,
                                    address,
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

export default EnterpriseAddress;