import { useEffect, useState, type ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { City } from "@tansuasici/country-state-city";
import { AxiosError } from "axios";

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
import { createSelfFleetOwner, getCurrentUser, updateCachedUser } from "@/services/auth/authService";

interface CompanyLogoValue {
  file: File;
  preview: string;
}

// Threaded through from FleetBusinessDetails -> FleetOwnerRegistration ->
// OTPVerification -> CreatePassword -> here, when arriving via the signup
// wizard. Absent when an already-authenticated user lands here directly
// (e.g. redirected by the fleet-profile guard because their account has
// role FLEET_OWNER but no FleetOwner row yet) — this screen has to work
// either way, so nothing below assumes state is present.
interface FleetProfileState {
  companyName?: string;
  contactPerson?: string;
  phoneNumber?: string;
}

const FleetProfile = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: FleetProfileState | null };
  const currentUser = getCurrentUser();

  // companyName/contactPerson/phone come from the wizard when available;
  // otherwise editable here from scratch. email always comes from the
  // authenticated session itself, never from state — it's the one field
  // that's reliably real regardless of entry path.
  const [companyName, setCompanyName] = useState(state?.companyName ?? "");
  const [contactPerson, setContactPerson] = useState(
    state?.contactPerson ?? currentUser?.fullName ?? ""
  );
  const [phone, setPhone] = useState(state?.phoneNumber ?? "");

  const [businessAddress, setBusinessAddress] = useState("");
  const [operatingCities, setOperatingCities] = useState<City[]>([]);
  const [rcNumber, setRcNumber] = useState("");
  const [bankName, setBankName] = useState(""); // display label only
  const [bankCode, setBankCode] = useState(""); // drives SearchableSelect + resolve
  const [bankOptions, setBankOptions] = useState<SelectOption[]>([]);
  const [bankLoading, setBankLoading] = useState(false);

  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState(""); // read-only, auto-filled via resolve
  const [resolvingAccount, setResolvingAccount] = useState(false);

  const [companyLogo, setCompanyLogo] = useState<CompanyLogoValue | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

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
    companyName.trim() &&
    contactPerson.trim() &&
    phone.trim() &&
    businessAddress.trim() &&
    operatingCities.length > 0 &&
    rcNumber.trim() &&
    bankCode.trim() &&
    accountNumber.trim() &&
    accountName.trim();

  const handleContinue = async () => {
    if (!isValid || !currentUser?.email) {
      setError("Missing required information. Please log in again and retry.");
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      // The backend's FleetOwner model has a single city/state pair, not
      // a list — a real gap against this multi-city picker. Using the
      // first selected city as the primary one rather than silently
      // dropping the rest; a proper fix needs either a schema change
      // (an operating-cities table) or narrowing this UI to one city.
      // Flagging this rather than pretending it's fully solved here.
      const primaryCity = operatingCities[0];

      await createSelfFleetOwner({
        companyName: companyName.trim(),
        contactPerson: contactPerson.trim(),
        email: currentUser.email,
        phone: phone.trim(),
        rcNumber: rcNumber.trim(),
        address: businessAddress.trim(),
        city: primaryCity?.name,
        state: primaryCity?.stateName,
      });

      // Without this, the guard reads the stale cached user (still
      // hasFleetOwnerProfile: false from login) on the very next
      // navigation and bounces straight back here — see updateCachedUser
      // in authService.ts for the full explanation.
      updateCachedUser({ hasFleetOwnerProfile: true });

      navigate(ROUTES.FLEET_SUCCESS, {
        state: {
          companyName,
          businessAddress,
          operatingCities,
          bankName,
          bankCode,
          accountNumber,
          accountName,
          logoPreview: companyLogo?.preview || null,
        },
      });
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;

      // Anyone caught in the stale-cache loop before this fix shipped
      // will hit this on resubmission — the profile genuinely already
      // exists from their earlier successful attempt. Treat it as
      // success rather than leaving them stuck on a form they can never
      // get past.
      if (axiosError.response?.status === 409) {
        updateCachedUser({ hasFleetOwnerProfile: true });
        navigate(ROUTES.FLEET_SUCCESS, {
          state: {
            companyName,
            businessAddress,
            operatingCities,
            bankName,
            bankCode,
            accountNumber,
            accountName,
            logoPreview: companyLogo?.preview || null,
          },
        });
        return;
      }

      setError(
        axiosError.response?.data?.message || "Unable to save your fleet profile."
      );
    } finally {
      setSubmitting(false);
    }
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
            {/* Company name / contact / phone — pre-filled when arriving
                via the signup wizard, editable either way so this screen
                also works when reached directly (e.g. an already-logged-in
                fleet owner completing a missing profile). */}
            <SmallAuthInput
              label="Company Name"
              placeholder="e.g. Rhema Motors"
              value={companyName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCompanyName(e.target.value)}
            />

            <SmallAuthInput
              label="Contact Person"
              placeholder="e.g. Rhema Chux"
              value={contactPerson}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setContactPerson(e.target.value)}
            />

            <SmallAuthInput
              label="Phone Number"
              placeholder="e.g. 09037058213"
              value={phone}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
            />

            {/* Business Address */}
            <SmallAuthInput
              label="Business Address"
              placeholder="e.g. 123 Wayne Logistics Way, Ikeja"
              value={businessAddress}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setBusinessAddress(e.target.value)}
            />

            {/* RC Number — required by the backend for CAC verification.
                Was never collected anywhere in this signup flow before,
                which is the actual reason self-service profile creation
                couldn't work: the call this screen now makes needs it. */}
            <SmallAuthInput
              label="RC Number"
              placeholder="e.g. RC1234567"
              value={rcNumber}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setRcNumber(e.target.value)}
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

          {error && <p className="mt-3 text-xs text-red-500">{error}</p>}

          {/* Button */}
          <div className="mt-auto pt-8">
            <Button
              variant="dark"
              disabled={!isValid}
              loading={submitting}
              onClick={handleContinue}
            >
              Save and Continue
            </Button>
          </div>
        </div>
      </div>
    </AuthContainer>
  );
};

export default FleetProfile;
