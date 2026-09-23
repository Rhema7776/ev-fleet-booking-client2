import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import AuthContainer from "@/components/auth/AuthContainer";
import AuthBackButton from "@/components/auth/AuthBackButton";
import AuthProgressBar from "@/components/auth/AuthProgressBar";
import AuthHeader from "@/components/auth/AuthHeader";
import OTPInput from "@/components/auth/OTPInput";

import { verifyOTP } from "@/services/auth/authService";
import { ROUTES } from "@/constants/routes";
import type { OtpFlowState } from "@/types/navigation";

const EMPTY_OTP = ["", "", "", "", "", ""];

const OTPVerification = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: OtpFlowState | null };

  const email = state?.email ?? "";
  const purpose = state?.purpose ?? "REGISTRATION";
  const redirectTo = state?.redirectTo ?? ROUTES.CREATE_PASSWORD;
  const darkText = state?.darkText ?? "Verify";
  const lightText = state?.lightText ?? "your email";
  const description = state?.description ?? `Enter the verification code sent to ${email}`;
  const currentStep = state?.currentStep ?? 1;
  const totalSteps = state?.totalSteps ?? 4;

  const [otp, setOtp] = useState<string[]>(EMPTY_OTP);
  const [seconds, setSeconds] = useState(56);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");

  // Countdown timer
  useEffect(() => {
    if (seconds === 0) return;

    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds]);

  const verifyCode = async (code: string) => {
    if (verifying) return;

    try {
      setVerifying(true);
      setError("");

      await verifyOTP({ email, code, purpose });

      navigate(redirectTo, { replace: true, state: { ...state, code } });
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      setError(axiosError.response?.data?.message ?? "Invalid verification code.");
      setOtp(EMPTY_OTP);
    } finally {
      setVerifying(false);
    }
  };

  const handleOTPChange = (newOtp: string[]) => {
    if (verifying) return;

    setOtp(newOtp);

    if (error) {
      setError("");
    }

    const completed = newOtp.every((digit) => digit !== "");

    if (!completed) return;

    verifyCode(newOtp.join(""));
  };

  return (
    <AuthContainer>
      <div className="flex items-center gap-3 mt-3">
        <AuthBackButton />

        <AuthProgressBar current={currentStep} total={totalSteps} />
      </div>

      <AuthHeader darkText={darkText} lightText={lightText} description={description} />

      <div className="mt-10">
        <OTPInput value={otp} onChange={handleOTPChange} disabled={verifying} />

        {error && (
          <p className="mt-4 text-center text-sm font-medium text-red-500">{error}</p>
        )}

        {verifying && (
          <div className="mt-4 flex items-center justify-center gap-2 text-brand-primary">
            <Loader2 size={18} className="animate-spin" />
            <span className="text-sm">Verifying code...</span>
          </div>
        )}

        <p className="mt-8 text-center text-sm">
          {seconds > 0 ? (
            <span className="text-gray-400">
              Resend code in 0:{seconds.toString().padStart(2, "0")}
            </span>
          ) : (
            <button
              type="button"
              className="font-semibold text-brand-primary"
              onClick={() => {
                setOtp(EMPTY_OTP);
                setError("");
                setSeconds(56);

                // KNOWN GAP, not fixed here: this doesn't actually call a
                // resend endpoint — it only resets the local countdown/UI.
                // No resend function exists in authService yet. Flagging
                // rather than inventing a backend call that wasn't asked for.
              }}
            >
              Resend Code
            </button>
          )}
        </p>
      </div>
    </AuthContainer>
  );
};

export default OTPVerification;
