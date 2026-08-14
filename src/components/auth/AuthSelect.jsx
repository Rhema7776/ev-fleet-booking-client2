import { ChevronDown } from "lucide-react";

const AuthSelect = ({
    label,
    value,
    onChange,
    options = [],
    placeholder = "Select",
}) => {

    return (
        <div className="w-full">

            <label
                className="
                    block
                    mb-2
                    text-sm
                    font-semibold
                    text-[#3F4247]
                "
            >
                {label}
            </label>

            <div className="relative">

                <select
                    value={value}
                    onChange={onChange}
                    className="
                        appearance-none
                        w-full
                        h-[52px]
                        rounded-full
                        bg-[#F1F2F3]
                        border
                        border-[#D5D7D9]
                        px-4
                        pr-12
                        text-sm
                        text-[#777B80]
                        outline-none
                        cursor-pointer
                        focus:border-[#36E165]
                    "
                >
                    <option value="" disabled>
                        {placeholder}
                    </option>

                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>

                <ChevronDown
                    className="
                        pointer-events-none
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        w-5
                        h-5
                        text-[#B5B8BC]
                    "
                />

            </div>

        </div>
    );
};

export default AuthSelect;