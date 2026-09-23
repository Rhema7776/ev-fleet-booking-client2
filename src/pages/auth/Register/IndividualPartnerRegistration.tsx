import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import AuthContainer from "@/components/auth/AuthContainer";
import AuthBackButton from "@/components/auth/AuthBackButton";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthInput from "@/components/auth/AuthInput";
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

    try {
      setLoading(true);
      setError("");

      await registerUser({
        fullName,
        email,
        phone: "",
        role: "INDIVIDUAL_PARTNER",
      });

      navigate(ROUTES.VERIFY_EMAIL, {
        state: {
          email,
          role: "INDIVIDUAL_PARTNER",
          fullName,
          darkText: "Verify",
          lightText: "your email",
          description: `Enter the code we sent to ${email}`,
          redirectTo: ROUTES.CREATE_PASSWORD,
          nextRoute: ROUTES.REGISTER_SUCCESS,
          currentStep: 1,
          totalSteps: 4,
        },
      });
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      setError(axiosError.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      {/* Was <data ...> — a real HTML element for machine-readable values,
          not a layout container. Clear typo for <div>. */}
      <div className="flex items-center gap-3">
        <AuthBackButton />

        <AuthProgressBar current={1} total={4} />
      </div>

      <AuthHeader
        stacked
        darkText="Create your free"
        lightText="partner account"
        description="Enter your details to continue."
      />

      <div className="space-y-5 mt-6">
        <AuthInput
          label="Full Name"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
        />

        <AuthInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
      </div>

      <SocialButtons role="INDIVIDUAL_PARTNER" redirectTo={ROUTES.DASHBOARD} navigate={navigate} />

      <AuthFooter text="Already have an account?" linkText="Log in" to={ROUTES.LOGIN} />

      {error && <p className="mt-6 text-center text-sm text-red-500">{error}</p>}

      <div className="mt-8">
        <Button variant="dark" loading={loading} onClick={handleRegister}>
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
