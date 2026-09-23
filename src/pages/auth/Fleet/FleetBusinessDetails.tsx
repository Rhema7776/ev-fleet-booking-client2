import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import AuthContainer from "@/components/auth/AuthContainer";
import AuthBackButton from "@/components/auth/AuthBackButton";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthProgressBar from "@/components/auth/AuthProgressBar";
import AuthInput from "@/components/auth/AuthInput";
import AuthPage from "@/components/auth/AuthPage";
import TermsFooter from "@/components/auth/TermsFooter";
import Button from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

const FleetBusinessDetails = () => {
  const navigate = useNavigate();

  const [loading] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");

  const isValid = companyName.trim().length > 0 && contactPerson.trim().length > 0;

  const handleContinue = () => {
    navigate(ROUTES.FLEET_REGISTER, {
      state: {
        companyName,
        contactPerson,
      },
    });
  };

  return (
    <AuthContainer>
      <AuthPage>
        <div className="flex items-center gap-3">
          <AuthBackButton />

          <AuthProgressBar current={1} total={5} />
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

        <div className="space-y-5 mt-8">
          <AuthInput
            label="Business Name"
            placeholder="Enter business name"
            value={companyName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCompanyName(e.target.value)}
          />

          <AuthInput
            label="Contact Person"
            placeholder="Enter contact person"
            value={contactPerson}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setContactPerson(e.target.value)}
          />
        </div>

        <div className="mt-10">
          {/* variant="disabled" isn't a real variant on Button (never was —
              this silently no-op'd before). The already-passed `disabled`
              prop is what actually drives the disabled look via Tailwind's
              disabled: styles, so this just needed a valid variant. */}
          <Button variant="dark" disabled={!isValid} loading={loading} onClick={handleContinue}>
            Continue
          </Button>
        </div>

        <TermsFooter />
      </AuthPage>
    </AuthContainer>
  );
};

export default FleetBusinessDetails;
