import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search, Check } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
  country?: string;
}

interface SearchableSelectProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  options?: SelectOption[];
  loading?: boolean;
  onSearch?: (query: string) => void;
}

/**
 * This is the RESTORED implementation — the version that was actually
 * live in this file before conversion had silently dropped `loading` and
 * `onSearch` entirely (never destructured, never called), meaning the
 * caller's debounced remote bank search never fired and this dropdown
 * always showed zero options. That broken version is what's replaced
 * here; this one matches what FleetProfile.jsx has always expected.
 */
const SearchableSelect = ({
  label,
  placeholder = "Select",
  value,
  onChange,
  options = [],
  loading = false,
  onSearch,
}: SearchableSelectProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const timeout = setTimeout(() => {
      onSearch?.(search);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, open, onSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (option: SelectOption) => {
    onChange(option.value);
    setOpen(false);
    setSearch("");
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <label className="block mb-2 text-sm font-semibold text-[#3F4247]">{label}</label>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full h-12 rounded-full bg-gray-100 border border-transparent px-5 flex items-center outline-none transition focus-within:border-gray-400"
      >
        <span className={selectedOption ? "text-sm text-[#081E19]" : "text-sm text-[#9A9DA1]"}>
          {selectedOption?.label || placeholder}
        </span>

        <ChevronDown
          className={`w-5 h-5 shrink-0 text-[#9A9DA1] transition-transform ml-auto ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute z-[100] left-0 right-0 mt-2 bg-white border border-[#E1E3E5] rounded-2xl shadow-xl overflow-hidden">
          <div className="p-3 border-b border-[#ECEDEF]">
            <div className="h-11 rounded-full bg-[#F1F2F3] flex items-center gap-2 px-4">
              <Search className="w-4 h-4 shrink-0 text-[#9A9DA1]" />

              <input
                type="text"
                autoFocus
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search bank..."
                className="w-full bg-transparent outline-none text-sm text-[#081E19] placeholder:text-[#9A9DA1]"
              />
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto">
            {loading ? (
              <div className="px-4 py-8 text-center text-sm text-[#9A9DA1]">
                Searching banks...
              </div>
            ) : options.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-[#9A9DA1]">
                {search ? "No banks found." : "Start typing to search banks."}
              </div>
            ) : (
              options.map((option) => {
                const selected = option.value === value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-[#F5F7F6] transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#081E19]">{option.label}</p>

                      {option.country && (
                        <p className="mt-0.5 text-xs text-[#9A9DA1]">{option.country}</p>
                      )}
                    </div>

                    {selected && <Check className="w-4 h-4 text-[#36E165]" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
