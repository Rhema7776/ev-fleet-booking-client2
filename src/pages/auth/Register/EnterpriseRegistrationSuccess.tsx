import { useLocation } from "react-router-dom";

import CompanySuccess from "../Success/CompanySuccess";

import { ROUTES } from "@/constants/routes";

import defaultLogo from "@/assets/images/company-placeholder.svg";

interface EnterpriseSuccessState {
  enterpriseData?: {
    logoPreview?: string;
    businessName?: string;
  };
}

const EnterpriseRegistrationSuccess = () => {
  const { state } = useLocation() as { state: EnterpriseSuccessState | null };

  const enterpriseData = state?.enterpriseData;

  return (
    <CompanySuccess
      logo={enterpriseData?.logoPreview || defaultLogo}
      companyName={enterpriseData?.businessName || "Your Company"}
      description="Your enterprise account is ready. Start booking vehicles and allocating."
      buttonText="Let's go"
      redirectTo={ROUTES.DASHBOARD}
    />
  );
};

export default EnterpriseRegistrationSuccess;
