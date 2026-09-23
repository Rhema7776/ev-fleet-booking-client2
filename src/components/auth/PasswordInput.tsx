import { useState, type ChangeEvent } from "react";
import { Eye, EyeClosed } from "lucide-react";

import TextInput from "@/components/ui/TextInput";

interface PasswordInputProps {
  label?: string;
  name?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  autoComplete?: string;
}

const PasswordInput = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
  autoComplete = "current-password",
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextInput
      label={label}
      name={name}
      type={showPassword ? "text" : "password"}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      error={error}
      autoComplete={autoComplete}
      rightIcon={
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="text-gray-400 hover:text-gray-700 transition-colors"
        >
          {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
        </button>
      }
    />
  );
};

export default PasswordInput;
