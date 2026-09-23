import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isValid = [businessName, contactPerson, businessEmail, phoneNumber].every((value) =>
    value.trim()
  );

  const handleContinue = async () => {
    try {
      setLoading(true);
      setError("");

      await registerUser({
        fullName: contactPerson,
        email: businessEmail,
        phone: phoneNumber,
        role: "ENTERPRISE_PARTNER",
      });

      navigate(ROUTES.VERIFY_EMAIL, {
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
      });
    } catch (err) {
      // Previously: two console.log calls and nothing else — a failed
      // registration gave the user zero visible feedback. Every sibling
      // registration page (Individual, FleetOwner) shows a real error
      // message; this one just silently did nothing.
      const axiosError = err as AxiosError<{ message?: string }>;
      setError(axiosError.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <div className="flex items-center gap-3">
        <AuthBackButton />

        <AuthProgressBar current={1} total={5} />
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
          onChange={(e: ChangeEvent<HTMLInputElement>) => setBusinessName(e.target.value)}
        />

        <AuthInput
          label="Contact Person"
          placeholder="Enter contact person"
          value={contactPerson}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setContactPerson(e.target.value)}
        />

        <AuthInput
          label="Business Email"
          type="email"
          placeholder="company@email.com"
          value={businessEmail}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setBusinessEmail(e.target.value)}
        />

        <AuthInput
          label="Phone Number"
          placeholder="080..."
          value={phoneNumber}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
        />
      </div>

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

      <div className="mt-10">
        <Button variant="dark" disabled={!isValid} loading={loading} onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </AuthContainer>
  );
};

export default EnterprisePartnerRegistration;
