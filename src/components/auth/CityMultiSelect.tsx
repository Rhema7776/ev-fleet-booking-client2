import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X, ChevronDown } from "lucide-react";
import type { City } from "@tansuasici/country-state-city";

interface CityMultiSelectProps {
  label?: string;
  placeholder?: string;
  value: City[];
  onChange: (cities: City[]) => void;
}

/**
 * This is the RESTORED implementation. The live version before conversion
 * required an `options` prop the caller (FleetProfile.jsx) never actually
 * passed — it always defaulted to an empty array, so this dropdown always
 * showed "No cities found" no matter what. This version self-sources real
 * city data from the country-state-city package instead, matching exactly
 * how FleetProfile.jsx has always called it (no options prop at all).
 *
 * The package is dynamically imported, not statically — a static import
 * pulled its entire embedded worldwide-cities dataset directly into the
 * app's main bundle (775KB -> 17.7MB, confirmed by actually running the
 * production build). A dynamic import lets the bundler split it into its
 * own chunk that only downloads when a user actually reaches this
 * component, not on every page load.
 */
const CityMultiSelect = ({
  label = "Operating Cities",
  placeholder = "Lagos, Abuja",
  value = [],
  onChange,
}: CityMultiSelectProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [cities, setCities] = useState<City[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      setCities([]);
      return;
    }

    let cancelled = false;

    import("@tansuasici/country-state-city").then(({ CountryStateCity }) => {
      if (cancelled) return;
      setCities(CountryStateCity.searchCities(query).slice(0, 20));
    });

    return () => {
      cancelled = true;
    };
  }, [search]);

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

  const toggleCity = (city: City) => {
    const exists = value.some((item) => item.id === city.id);

    if (exists) {
      onChange(value.filter((item) => item.id !== city.id));
    } else {
      onChange([...value, city]);
    }
  };

  const removeCity = (cityId: number) => {
    onChange(value.filter((city) => city.id !== cityId));
  };

  return (
    <div className="w-full relative" ref={containerRef}>
      <label className="block mb-2 text-sm font-semibold text-[#3F4247]">{label}</label>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full h-12 min-h-[52px] rounded-full bg-gray-100 border border-transparent px-4 py-2 flex items-center gap-2 text-left"
      >
        <div className="flex-1 flex flex-wrap gap-1.5">
          {value.length === 0 ? (
            <span className="text-sm text-[#9A9DA1]">{placeholder}</span>
          ) : (
            value.map((city) => (
              <span
                key={city.id}
                className="inline-flex items-center gap-1 bg-[#D8F9E0] text-[#081E19] rounded-full px-3 py-1 text-xs font-medium"
              >
                {city.name}

                <span
                  role="button"
                  tabIndex={0}
                  onClick={(event) => {
                    event.stopPropagation();
                    removeCity(city.id);
                  }}
                  className="cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </span>
              </span>
            ))
          )}
        </div>

        <ChevronDown
          className={`w-5 h-5 shrink-0 text-[#9A9DA1] transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute z-50 left-0 right-0 mt-2 bg-white border border-[#E0E2E4] rounded-2xl shadow-xl overflow-hidden">
          <div className="p-3 border-b border-[#ECEDEF]">
            <div className="h-11 rounded-full bg-[#F5F6F7] flex items-center px-4 gap-2">
              <Search className="w-4 h-4 text-[#9A9DA1] shrink-0" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
                placeholder="Search city..."
                className="w-full bg-transparent outline-none text-sm text-[#081E19] placeholder:text-[#9A9DA1]"
              />
            </div>
          </div>

          <div className="max-h-56 overflow-y-auto">
            {!search.trim() ? (
              <p className="px-4 py-6 text-center text-sm text-[#9A9DA1]">Search for a city</p>
            ) : cities.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-[#9A9DA1]">No cities found</p>
            ) : (
              cities.map((city) => {
                const selected = value.some((item) => item.id === city.id);

                return (
                  <button
                    key={city.id}
                    type="button"
                    onClick={() => toggleCity(city)}
                    className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-[#F5F7F6] transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#081E19]">{city.name}</p>

                      <p className="mt-0.5 text-xs text-[#9A9DA1]">
                        {city.stateName ? `${city.stateName}, ` : ""}
                        {city.countryName || ""}
                      </p>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        selected ? "bg-[#36E165] border-[#36E165]" : "border-[#C9CCCF]"
                      }`}
                    >
                      {selected && <span className="text-xs font-bold">✓</span>}
                    </div>
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

export default CityMultiSelect;
