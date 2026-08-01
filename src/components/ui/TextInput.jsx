const TextInput = ({
    label,
    type = "text",
    name,
    placeholder,
    value,
    onChange,
    error,
    disabled = false,
    autoComplete,
    rightIcon,
}) => {
    return (
        <div className="space-y-2">

            {label && (
                <label
                    htmlFor={name}
                    className="text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
            )}

            <div className="relative">

                <input
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    disabled={disabled}
                    className={`
                        w-full
                        rounded-full
                        px-5
                        py-4
                        bg-gray-100
                        border
                        outline-none
                        transition-all
                        duration-200

                        ${
                            error
                                ? "border-red-500"
                                : value
                                ? "border-green-400"
                                : "border-transparent"
                        }

                        focus:border-brand-primary
                        focus:bg-white

                        ${
                            rightIcon
                                ? "pr-12"
                                : ""
                        }
                    `}
                />

                {rightIcon && (
                    <div className="absolute right-5 top-1/2 -translate-y-1/2">
                        {rightIcon}
                    </div>
                )}

            </div>

            {error && (
                <p className="text-sm text-red-500">
                    {error}
                </p>
            )}

        </div>
    );
};

export default TextInput;