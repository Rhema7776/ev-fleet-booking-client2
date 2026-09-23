import { useRef, type ChangeEvent, type MouseEvent } from "react";
import { Upload, X } from "lucide-react";

import placeholderimg from "@/assets/images/company-placeholder.svg";

export interface CompanyLogoValue {
  file: File;
  preview: string;
}

interface CompanyLogoUploadProps {
  value: CompanyLogoValue | null;
  onChange: (value: CompanyLogoValue | null) => void;
}

const CompanyLogoUpload = ({ value, onChange }: CompanyLogoUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      return;
    }

    const preview = URL.createObjectURL(file);

    onChange({ file, preview });
  };

  const removeLogo = (event: MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();

    onChange(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="w-full min-h-[64px] rounded-full bg-[#F1F2F3] border border-[#D5D7D9] flex items-center px-3 gap-3 text-left"
      >
        {/* Logo */}

        <div className="w-11 h-11 rounded-full bg-[#E5E7E9] overflow-hidden flex items-center justify-center shrink-0">
          <img
            src={value?.preview || placeholderimg}
            alt="Company logo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text */}

        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-[#3F4247]">
            {value ? value.file.name : "Add your business logo (optional)"}
          </p>

          <p className="text-xs text-[#9A9DA1] mt-0.5">PNG, JPG up to 5MB</p>
        </div>

        {/* Upload / Remove */}

        {value ? (
          <span
            role="button"
            tabIndex={0}
            onClick={removeLogo}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0"
          >
            <X className="w-4 h-4 text-[#6F7278]" />
          </span>
        ) : (
          <span className="w-9 h-9 rounded-full bg-[#081E19] flex items-center justify-center shrink-0">
            <Upload className="w-4 h-4 text-white" />
          </span>
        )}
      </button>
    </>
  );
};

export default CompanyLogoUpload;
