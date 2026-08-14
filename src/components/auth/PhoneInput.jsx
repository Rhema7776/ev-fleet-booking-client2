import { useMemo, useState } from "react";
import PhoneInputLib, { getCountryCallingCode } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./phone-input.css";

const PhoneInput = ({
    label,
    value,
    onChange,
}) => {

    const [country, setCountry] = useState("NG");

    const placeholder = useMemo(() => {

        return `+${getCountryCallingCode(country)} (000) 000-0000`;

    }, [country]);

    return (

        <div>

            <label
                className="
                    block
                    mb-2
                    text-sm
                    font-semibold
                    text-[#202124]
                "
            >
                {label}
            </label>

            <PhoneInputLib

                international

                defaultCountry="NG"

                country={country}

                onCountryChange={setCountry}

                countryCallingCodeEditable={false}

                value={value}

                onChange={onChange}
                

                placeholder={placeholder}
                autoComplete="tel"

                className="leasehub-phone"

            />

        </div>

    );

};

export default PhoneInput;

