import { useRef } from "react";

const OTPInput = ({ value, onChange }) => {
    const inputRefs = useRef([]);

    const handleChange = (index, e) => {
        const digit = e.target.value.replace(/\D/g, "");

        const newValue = [...value];

        newValue[index] = digit.slice(-1);

        onChange(newValue);

        if (digit && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (
            e.key === "Backspace" &&
            !value[index] &&
            index > 0
        ) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();

        const pasted = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, 6);

        if (!pasted) return;

        const newValue = [...value];

        pasted.split("").forEach((digit, index) => {
            newValue[index] = digit;
        });

        onChange(newValue);

        inputRefs.current[
            Math.min(pasted.length - 1, 5)
        ]?.focus();
    };

    return (
        <div
            className="flex justify-between gap-3"
            onPaste={handlePaste}
        >
            {value.map((digit, index) => (
                <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) =>
                        handleChange(index, e)
                    }
                    onKeyDown={(e) =>
                        handleKeyDown(index, e)
                    }
                    className={`
                        w-12
                        h-12
                        rounded-full
                        text-center
                        text-lg
                        font-bold
                        outline-none
                        transition-all
                        border-2

                        ${
                            digit
                                ? "border-brand-primary"
                                : "border-gray-200"
                        }

                        focus:border-brand-primary
                    `}
                />
            ))}
        </div>
    );
};

export default OTPInput;