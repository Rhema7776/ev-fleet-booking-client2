const AuthInput = ({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
}) => {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
                {label}
            </label>

            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="
                    w-full
                    h-15
                    rounded-full
                    bg-gray-100
                    border
                    border-transparent
                    px-5
                    outline-none
                    transition
                    focus:border-gray-400
                "
            />
        </div>
    );
};

export default AuthInput;