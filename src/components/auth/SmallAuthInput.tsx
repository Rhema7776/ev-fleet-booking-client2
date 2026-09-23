import type { ChangeEvent, InputHTMLAttributes } from "react";

interface SmallAuthInputProps {
  label?: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  disabled?: boolean;
  /** Accepted for compatibility — the original component never actually
      used this either, it had no visual effect there. Not inventing a
      compact style here that didn't exist before. */
  compact?: boolean;
}

const SmallAuthInput = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  readOnly = false,
  disabled = false,
}: SmallAuthInputProps) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-900">{label}</label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        className="w-full h-12 rounded-full bg-gray-100 border border-transparent px-5 outline-none transition focus:border-gray-400 disabled:opacity-70"
      />
    </div>
  );
};

export default SmallAuthInput;
