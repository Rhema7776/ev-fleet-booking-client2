import { useState, type ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import { ROUTES } from "@/constants/routes";
import AuthContainer from "@/components/auth/AuthContainer";
import AuthBackButton from "@/components/auth/AuthBackButton";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthProgressBar from "@/components/auth/AuthProgressBar";
import PasswordInput from "@/components/auth/PasswordInput";
import { createPassword } from "@/services/auth/authService";
import Button from "@/components/ui/button";
import type { OtpFlowState } from "@/types/navigation";

const CreatePassword = () => {
  const navigate = useNavigate();

  const { state } = useLocation() as { state: OtpFlowState | null };

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const email = state?.email ?? "";
  const nextRoute = state?.nextRoute ?? ROUTES.DASHBOARD;

  const handleContinue = async () => {
    setError("");

    if (!password || !confirmPassword) {
      setError("Please complete all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // Was missing confirmPassword entirely — the backend's schema
      // requires it (to compare against password server-side too, not
      // just trust the frontend's own check), so this call failed with a
      // 400 on every real attempt despite the local validation above
      // already confirming the passwords matched.
      await createPassword({ email, password, confirmPassword });

      navigate(nextRoute, { state });
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      setError(axiosError.response?.data?.message || "Unable to create password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <div className="flex items-center gap-3">
        <AuthBackButton />

        <AuthProgressBar current={state?.currentStep ?? 2} total={state?.totalSteps ?? 4} />
      </div>

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
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />

        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button variant="dark" loading={loading} onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </AuthContainer>
  );
};

export default CreatePassword;
