import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthContainer from "@/components/auth/AuthContainer";
import AuthBackButton from "@/components/auth/AuthBackButton";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthProgressBar from "@/components/auth/AuthProgressBar";
import AuthInput from "@/components/auth/AuthInput";
import Button from "@/components/ui/button";

import { ROUTES } from "@/constants/routes";

const FleetOwnerRegistration = () => {

    const navigate = useNavigate();

    const [companyName, setCompanyName] = useState("");
    const [contactPerson, setContactPerson] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const isValid = [
        companyName,
        contactPerson,
        email,
        phoneNumber,
    ].every(value => value.trim());

    const handleContinue = () => {

        navigate(
            ROUTES.VERIFY_EMAIL,
            {
                state: {

                    role: "FLEET_OWNER",

                    email,

                    companyName,

                    contactPerson,

                    phoneNumber,

                    darkText: "Verify",

                    lightText: "your email",

                    description: `Enter the verification code sent to ${email}`,

                    redirectTo: ROUTES.CREATE_PASSWORD,

                    currentStep: 2,

                    totalSteps: 5,

                },
            }
        );

    };

    return (

        <AuthContainer>

            <AuthBackButton />

            <AuthProgressBar
                current={1}
                total={5}
            />

            <AuthHeader
                stacked
                darkText="Create your"
                lightText="fleet account"
                description="Let's get your fleet business onboard."
            />

            <div className="space-y-5 mt-8">

                <AuthInput
                    label="Fleet Company"
                    placeholder="Enter company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                />

                <AuthInput
                    label="Contact Person"
                    placeholder="Enter full name"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                />

                <AuthInput
                    label="Business Email"
                    type="email"
                    placeholder="company@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <AuthInput
                    label="Phone Number"
                    placeholder="080..."
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />

            </div>

            <div className="mt-10">

                <Button
                    variant="dark"
                    disabled={!isValid}
                    onClick={handleContinue}
                >
                    Continue
                </Button>

            </div>

        </AuthContainer>

    );

};

export default FleetOwnerRegistration;