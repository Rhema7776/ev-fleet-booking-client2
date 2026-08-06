import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { registerUser } from "@/services/auth/authService";
import { ROUTES } from "@/constants/routes";

import AuthContainer from "@/components/auth/AuthContainer";
import AuthBackButton from "@/components/auth/AuthBackButton";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthProgressBar from "@/components/auth/AuthProgressBar";
import AuthInput from "@/components/auth/AuthInput";

import PhoneInput from "@/components/auth/PhoneInput";

import SocialLogin from "@/components/auth/SocialLogin";
import TermsFooter from "@/components/auth/TermsFooter";

import Button from "@/components/ui/Button";

const FleetOwnerRegistration = () => {

    const navigate = useNavigate();

    // Values coming from FleetBusinessDetails
    const { state } = useLocation();

    const companyName = state?.companyName || "";

    const contactPerson = state?.contactPerson || "";
    // Screen 2 fields
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const isValid = [

        email,

        phoneNumber,

    ].every((value) => value.trim());

    const handleContinue = async () => {

        setError("");

        if (!email.trim()) {

            return setError("Business email is required.");

        }

        if (!phoneNumber.trim()) {

            return setError("Phone number is required.");

        }

        try {

            setLoading(true);
            console.log({

                fullName: contactPerson,

                email,

                phone: phoneNumber,

                role: "FLEET_OWNER",

            });

            const response = await registerUser({
                fullName: contactPerson,
                email,
                phone: phoneNumber,
                role: "FLEET_OWNER",
            });

            console.log("REGISTER SUCCESS", response);

            console.log("About to navigate...");

            console.log("Navigating to:", ROUTES.VERIFY_EMAIL);

            // navigate(ROUTES.VERIFY_EMAIL, {

            //     state: {

            //         role: "FLEET_OWNER",

            //         companyName,

            //         contactPerson,

            //         fullName: contactPerson,

            //         email,

            //         phoneNumber,

            //         darkText: "Verify",

            //         lightText: "your email",

            //         description: `Enter the verification code sent to ${email}`,

            //         redirectTo: ROUTES.CREATE_PASSWORD,

            //         nextRoute: ROUTES.FLEET_PROFILE,

            //         currentStep: 3,

            //         totalSteps: 5,

            //     },

            // });
            const nextState = {
            role: "FLEET_OWNER",
            companyName,
            contactPerson,
            fullName: contactPerson,
            email,
            phoneNumber,
            darkText: "Verify",
            lightText: "your email",
            description: `Enter the verification code sent to ${email}`,
            redirectTo: ROUTES.CREATE_PASSWORD,
            nextRoute: ROUTES.FLEET_PROFILE,
            currentStep: 3,
            totalSteps: 5,
        };
        console.log("Navigating with state:", nextState);

        setTimeout(() => {
            navigate(ROUTES.VERIFY_EMAIL, {
                state: nextState,
            });
        }, 1000);

        }

        catch (err) {

            console.log("FULL ERROR");
            console.log(err);

            console.log("MESSAGE:", err.message);

            console.log("RESPONSE:", err.response);

            console.log("DATA:", err.response?.data);

        }
        finally {

            setLoading(false);

        }

    };

    return (

        <AuthContainer>

            <AuthBackButton />

            <AuthProgressBar

                current={2}

                total={5}

            />

            <AuthHeader
                title={
                    <>
                        <span className="text-[#7B7F86]">
                            Create your
                        </span>{" "}

                        <span className="text-[#071B14]">
                            fleet
                        </span>

                        <br />

                        <span className="text-[#071B14]">
                            owner account!
                        </span>
                    </>
                }
            />

            <div className="space-y-5 mt-8">


                <AuthInput

                    label="Business Email"

                    type="email"

                    placeholder="company@email.com"

                    value={email}

                    onChange={(e) => setEmail(e.target.value)}

                />
                
            </div>
            <div>

                <PhoneInput
                    label="Phone Number"
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                />
            </div>

            {

                error && (

                    <p className="text-sm text-red-500 mt-5">

                        {error}

                    </p>

                )

            }

            <div className="mt-10">

                <Button

                    variant="dark"

                    loading={loading}

                    disabled={!isValid}

                    onClick={handleContinue}

                >

                    Continue

                </Button>
                

            </div>
            <SocialLogin />
            <TermsFooter />

        </AuthContainer>

    );

};

export default FleetOwnerRegistration;