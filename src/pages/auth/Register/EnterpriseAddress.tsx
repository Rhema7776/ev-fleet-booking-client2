import { useState, type ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AuthContainer from "@/components/auth/AuthContainer";
import AuthBackButton from "@/components/auth/AuthBackButton";
import AuthProgressBar from "@/components/auth/AuthProgressBar";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthInput from "@/components/auth/AuthInput";
import Button from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import type { OtpFlowState } from "@/types/navigation";

const EnterpriseAddress = () => {
  const navigate = useNavigate();

  const { state } = useLocation() as { state: OtpFlowState | null };

  const [address, setAddress] = useState("");

  const canContinue = address.trim() !== "";

  return (
    <AuthContainer>
      <div className="flex items-center gap-3">
        <AuthBackButton />

        <AuthProgressBar current={state?.currentStep ?? 2} total={state?.totalSteps ?? 4} />
      </div>

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
          onChange={(e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
        />
      </div>

      <div className="mt-10">
        <Button
          variant="dark"
          disabled={!canContinue}
          onClick={() =>
            // Was a hardcoded literal path, "/auth/register/enterprise/verify"
            // — which matches NO registered route in router.jsx at all.
            // Clicking Continue sent the user to React Router's NotFound
            // catch-all, breaking the entire enterprise registration flow
            // at this exact step. ROUTES.ENTERPRISE_PROFILE is the real,
            // registered next step (email verification already happened
            // earlier via the shared OTP screen, before this page).
            navigate(ROUTES.ENTERPRISE_PROFILE, {
              state: {
                ...state,
                address,
              },
            })
          }
        >
          Continue
        </Button>
      </div>
    </AuthContainer>
  );
};

export default EnterpriseAddress;
