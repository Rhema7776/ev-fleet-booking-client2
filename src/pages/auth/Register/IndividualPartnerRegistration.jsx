import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthContainer from "@/components/auth/AuthContainer";
import AuthBackButton from "@/components/auth/AuthBackButton";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthInput from "@/components/auth/AuthInput";
import AuthDivider from "@/components/auth/AuthDivider";
import SocialButtons from "@/components/auth/SocialButtons";
import TermsText from "@/components/auth/TermsText";
import AuthFooter from "@/components/auth/AuthFooter";
import AuthProgressBar from "@/components/auth/AuthProgressBar";

import Button from "@/components/ui/button";

import { registerUser } from "@/services/auth/authService";
import { ROUTES } from "@/constants/routes";

const IndividualPartnerRegistration = () => {

    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");

    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleRegister = async () => {

        if (!fullName.trim()) {

            setError("Full name is required.");

            return;

        }

        if (!email.trim()) {

            setError("Email is required.");

            return;

        }

        setError("");

        setLoading(true);

        try {

            await registerUser({

                fullName,

                email,

                password: "Password123@",

                phone: "",

                role: "FLEET_OWNER",

            });

            navigate("/auth/verify-email", {

                state: {

                    email,

                    darkText: "Verify",

                    lightText: "your email",

                    description: `Enter the code we sent to ${email}`,

                    redirectTo: ROUTES.CREATE_PASSWORD,

                    currentStep: 1,

                    totalSteps: 4,

                },

            });

        }

        catch (err) {

            setError(

                err.response?.data?.message ||

                "Registration failed."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <AuthContainer>

            <AuthBackButton />

            <AuthProgressBar
                current={1}
                total={4}
            />

            <AuthHeader
                stacked
                darkText="Create your free"
                lightText="partner account"
                description="Enter your details to continue."
            />

            <div className="space-y-5 mt-8">

                <AuthInput
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />

                <AuthInput
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

            </div>

            <AuthDivider />

            <SocialButtons />

            <AuthFooter
                text="Already have an account?"
                linkText="Log in"
                to="/auth/login"
            />

            {error && (

                <p className="mt-6 text-center text-sm text-red-500">

                    {error}

                </p>

            )}

            <div className="mt-8">

                <Button
                    variant="dark"
                    loading={loading}
                    onClick={handleRegister}
                >

                    Continue

                </Button>

            </div>

            <div className="mt-8">

                <TermsText />

            </div>

        </AuthContainer>

    );

};

export default IndividualPartnerRegistration;