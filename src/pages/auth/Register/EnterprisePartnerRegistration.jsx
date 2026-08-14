import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthContainer from "@/components/auth/AuthContainer";
import AuthBackButton from "@/components/auth/AuthBackButton";
import AuthProgressBar from "@/components/auth/AuthProgressBar";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthInput from "@/components/auth/AuthInput";
import Button from "@/components/ui/button";

import { ROUTES } from "@/constants/routes";
import { registerUser } from "@/services/auth/authService";

const EnterprisePartnerRegistration = () => {

    const navigate = useNavigate();

    const [businessName, setBusinessName] = useState("");
    const [contactPerson, setContactPerson] = useState("");
    const [businessEmail, setBusinessEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const isValid = [
    businessName,
    contactPerson,
    businessEmail,
    phoneNumber,
    ].every(value => value.trim());

    const handleContinue = async () => {

    try {

        await registerUser({

            fullName: contactPerson,
            email: businessEmail,
            phone: phoneNumber,
            role: "ENTERPRISE_PARTNER",
        });

        navigate(
            ROUTES.VERIFY_EMAIL,
            {
                state: {

                    email: businessEmail,

                    role: "ENTERPRISE_PARTNER",

                    businessName,

                    contactPerson,

                    phoneNumber,

                    darkText: "Verify",

                    lightText: "your email",

                    description: `Enter the code we sent to ${businessEmail}`,

                    redirectTo: ROUTES.CREATE_PASSWORD,

                    nextRoute: ROUTES.ENTERPRISE_PROFILE,

                    currentStep: 2,

                    totalSteps: 5,

                },

            }
        );

    }

    catch (err) {

        console.log(err);

        console.log(err.response?.data);

    }

};

    return (

        <AuthContainer>
            <div className="flex items-center gap-3">
                <AuthBackButton />

                <AuthProgressBar
                    current={1}
                    total={5}
                />

            </div>

            <AuthHeader
                stacked
                darkText="Create your free"
                lightText="enterprise account"
                description="Enter your company details to continue."
            />

            <div className="space-y-5 mt-8">

                <AuthInput
                    label="Business Legal Name"
                    placeholder="Enter business name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                />

                <AuthInput
                    label="Contact Person"
                    placeholder="Enter contact person"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                />

                <AuthInput
                    label="Business Email"
                    type="email"
                    placeholder="company@email.com"
                    value={businessEmail}
                    onChange={(e) => setBusinessEmail(e.target.value)}
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

export default EnterprisePartnerRegistration;