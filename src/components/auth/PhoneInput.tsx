import { useMemo, useState } from "react";
import PhoneInputLib, { getCountryCallingCode, type Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./phone-input.css";

interface PhoneInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
}

const PhoneInput = ({ label, value, onChange }: PhoneInputProps) => {
  const [country, setCountry] = useState<Country>("NG");

  const placeholder = useMemo(() => {
    return `+${getCountryCallingCode(country)} (000) 000-0000`;
  }, [country]);

  return (
    <div>
      <label className="block mb-2 text-sm font-semibold text-[#202124]">{label}</label>

      <PhoneInputLib
        international
        defaultCountry="NG"
        country={country}
        onCountryChange={(newCountry) => newCountry && setCountry(newCountry)}
        countryCallingCodeEditable={false}
        value={value}
        // Library's real onChange signature is (value?: string) => void —
        // normalized to always pass a string here, so callers don't need
        // to handle the undefined case themselves.
        onChange={(newValue) => onChange(newValue ?? "")}
        placeholder={placeholder}
        autoComplete="tel"
        className="leasehub-phone"
      />
    </div>
  );
};

export default PhoneInput;
