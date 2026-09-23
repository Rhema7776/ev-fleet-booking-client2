import { useEffect, useState, type ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { City } from "@tansuasici/country-state-city";

import AuthContainer from "@/components/auth/AuthContainer";
import AuthBackButton from "@/components/auth/AuthBackButton";
import AuthHeader from "@/components/auth/AuthHeader";
import SmallAuthInput from "@/components/auth/SmallAuthInput";
import Button from "@/components/ui/button";
import CityMultiSelect from "@/components/auth/CityMultiSelect";
import CompanyLogoUpload from "@/components/auth/CompanyLogoUpload";
import SearchableSelect, { type SelectOption } from "@/components/auth/SearchableSelect";
import { ROUTES } from "@/constants/routes";
import { searchBanks, resolveAccount } from "@/services/bank/bankService";

interface CompanyLogoValue {
  file: File;
  preview: string;
}

const FleetProfile = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [businessAddress, setBusinessAddress] = useState("");
  const [operatingCities, setOperatingCities] = useState<City[]>([]);
  const [bankName, setBankName] = useState(""); // display label only
  const [bankCode, setBankCode] = useState(""); // drives SearchableSelect + resolve
  const [bankOptions, setBankOptions] = useState<SelectOption[]>([]);
  const [bankLoading, setBankLoading] = useState(false);

  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState(""); // read-only, auto-filled via resolve
  const [resolvingAccount, setResolvingAccount] = useState(false);

  const [companyLogo, setCompanyLogo] = useState<CompanyLogoValue | null>(null);

  /*
    |--------------------------------------------------------------------------
    | Search banks (debounced call comes from SearchableSelect itself)
    |
    | Was previously a raw fetch("http://localhost:3000/...") call — fixed
    | to go through bankService, which correctly targets the deployed API
    | (not hardcoded localhost) and correctly unwraps the response envelope.
    |--------------------------------------------------------------------------
    */
  const handleBankSearch = async (query: string) => {
    if (!query.trim()) {
      setBankOptions([]);
      return;
    }

    try {
      setBankLoading(true);
      const banks = await searchBanks(query);
      setBankOptions(banks);
    } catch (error) {
      console.error("Bank search failed:", error);
      setBankOptions([]);
    } finally {
      setBankLoading(false);
    }
  };

  /*
    |--------------------------------------------------------------------------
    | Resolve account name once bank + a full account number are set
    |--------------------------------------------------------------------------
    */
  useEffect(() => {
    const resolve = async () => {
      if (!bankCode || accountNumber.trim().length !== 10) {
        setAccountName("");
        return;
      }

      try {
        setResolvingAccount(true);
        const resolved = await resolveAccount(accountNumber, bankCode);
        setAccountName(resolved.accountName || "");
      } catch (error) {
        console.error("Account resolve failed:", error);
        setAccountName("");
      } finally {
        setResolvingAccount(false);
      }
    };

    resolve();
  }, [bankCode, accountNumber]);

  const isValid =
    businessAddress.trim() &&
    operatingCities.length > 0 &&
    bankCode.trim() &&
    accountNumber.trim() &&
    accountName.trim();

  const handleContinue = () => {
    navigate(ROUTES.FLEET_SUCCESS, {
      state: {
        ...state,
        businessAddress,
        operatingCities,
        bankName,
        bankCode,
        accountNumber,
        accountName,
        logoPreview: companyLogo?.preview || null,
      },
    });
  };

  return (
    <AuthContainer>
      <div className="-mx-5 -mt-2 min-h-screen bg-[#081E19] flex flex-col overflow-hidden">
        {/* ================= HEADER ================= */}
        <div className="px-5 pt-3 pb-4 shrink-0">
          {/* Back + Skip */}
          <div className="flex items-center justify-between">
            <AuthBackButton />

            <button
              type="button"
              onClick={() => navigate(ROUTES.DASHBOARD)}
              className="text-white/60 text-sm font-semibold hover:text-white transition-colors"
            >
              Skip for now
            </button>
          </div>

          {/* Header */}
          <div>
            <AuthHeader
              titleClassName="text-center"
              stacked
              lightText="Complete"
              brightGreenText="your profile"
              description="Add extra business details to enhance your experience. You can always change this later."
            />
          </div>
        </div>

        {/* ================= FORM SHEET ================= */}
        <div className="flex-1 bg-white rounded-t-[28px] px-5 pt-5 pb-6 flex flex-col min-h-0">
          <CompanyLogoUpload value={companyLogo} onChange={setCompanyLogo} />

          {/* Form */}
          <div className="space-y-5 mt-5">
            {/* Business Address */}
            <SmallAuthInput
              label="Business Address"
              placeholder="e.g. 123 Wayne Logistics Way, Ikeja"
              value={businessAddress}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setBusinessAddress(e.target.value)}
            />

            {/* Operating Cities */}
            <CityMultiSelect
              label="Operating Cities"
              placeholder="Lagos, Abuja"
              value={operatingCities}
              onChange={setOperatingCities}
            />

            {/* Account Number */}
            <SmallAuthInput
              label="Bank number"
              placeholder="0000000000"
              value={accountNumber}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setAccountNumber(e.target.value)}
            />

            {/* Bank + Account Name */}
            <div className="grid grid-cols-2 gap-3">
              <SearchableSelect
                label="Add bank"
                placeholder="Select bank"
                value={bankCode}
                onChange={(selectedCode) => {
                  setBankCode(selectedCode);

                  const match = bankOptions.find((option) => option.value === selectedCode);

                  setBankName(match?.label || "");
                }}
                options={bankOptions}
                loading={bankLoading}
                onSearch={handleBankSearch}
              />

              <SmallAuthInput
                compact
                label="Account name"
                placeholder={
                  resolvingAccount ? "Resolving..." : "Auto-filled after entering account number"
                }
                value={accountName}
                onChange={() => {}}
                readOnly
                disabled
              />
            </div>
          </div>

          {/* Button */}
          <div className="mt-auto pt-8">
            <Button variant="dark" disabled={!isValid} onClick={handleContinue}>
              Save and Continue
            </Button>
          </div>
        </div>
      </div>
    </AuthContainer>
  );
};

export default FleetProfile;
