import { useState, type ChangeEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AxiosError } from "axios";

import { registerUser } from "@/services/auth/authService";
import { ROUTES } from "@/constants/routes";

import AuthContainer from "@/components/auth/AuthContainer";
import AuthBackButton from "@/components/auth/AuthBackButton";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthProgressBar from "@/components/auth/AuthProgressBar";
import AuthInput from "@/components/auth/AuthInput";

import PhoneInput from "@/components/auth/PhoneInput";

import SocialButtons from "@/components/auth/SocialButtons";
import TermsFooter from "@/components/auth/TermsFooter";

import Button from "@/components/ui/button";
import type { OtpFlowState } from "@/types/navigation";

interface FleetBusinessState {
  companyName?: string;
  contactPerson?: string;
}

const FleetOwnerRegistration = () => {
  const navigate = useNavigate();

  // Values coming from FleetBusinessDetails
  const { state } = useLocation() as { state: FleetBusinessState | null };

  const companyName = state?.companyName || "";
  const contactPerson = state?.contactPerson || "";

  // Screen 2 fields
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isValid = [email, phoneNumber].every((value) => value.trim());

  const handleContinue = async () => {
    setError("");

    if (!email.trim()) {
      setError("Business email is required.");
      return;
    }

    if (!phoneNumber.trim()) {
      setError("Phone number is required.");
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        fullName: contactPerson,
        email,
        phone: phoneNumber,
        role: "FLEET_OWNER",
      });

      const nextState: OtpFlowState & FleetBusinessState & { phoneNumber: string } = {
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

      // Previously: this whole navigation was wrapped in
      // setTimeout(..., 1000) for no documented reason. setLoading(false)
      // in `finally` fires immediately (setTimeout is non-blocking), so
      // the button visibly returned to its normal, clickable "Continue"
      // state a full second BEFORE navigation actually happened — a real
      // risk of a confused user clicking Continue again and firing a
      // duplicate registration. Removed; navigates immediately, matching
      // every sibling registration page.
      navigate(ROUTES.VERIFY_EMAIL, { state: nextState });
    } catch (err) {
      // Previously: ~5 console.log calls (including one dumping err.response
      // in full) and NO setError call at all — despite the error state and
      // its display already existing below, a failed registration gave the
      // user zero visible feedback.
      const axiosError = err as AxiosError<{ message?: string }>;
      setError(axiosError.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <div className="flex items-center gap-3 mt-0">
        <AuthBackButton />

        <AuthProgressBar current={2} total={5} />
      </div>

      <AuthHeader
        title={
          <>
            <span className="text-[#7B7F86]">Create your</span>{" "}
            <span className="text-[#071B14]">fleet</span>
            <br />
            <span className="text-[#071B14]">owner account!</span>
          </>
        }
      />

      <div className="space-y-5 mt-6">
        <AuthInput
          label="Business Email"
          type="email"
          placeholder="company@email.com"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <PhoneInput label="Phone Number" value={phoneNumber} onChange={setPhoneNumber} />
      </div>

      {error && <p className="text-sm text-red-500 mt-5">{error}</p>}

      <div className="mt-9">
        <Button variant="dark" loading={loading} disabled={!isValid} onClick={handleContinue}>
          Continue
        </Button>
      </div>

      <SocialButtons role="FLEET_OWNER" redirectTo={ROUTES.FLEET_VEHICLES} navigate={navigate} />
      <TermsFooter />
    </AuthContainer>
  );
};

export default FleetOwnerRegistration;
