import { useEffect, useRef, useState } from "react";
import {
    Check,
    ChevronDown,
    Search,
    X,
} from "lucide-react";

const CityMultiselect = ({
    label,
    placeholder = "Select cities",
    value = [],
    onChange,
    options = [],
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");

    const containerRef = useRef(null);

    const filteredOptions = options.filter((option) =>
        option.label
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                setIsOpen(false);
                setSearch("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    const isSelected = (option) =>
        value.includes(option.value);

    const handleToggle = (option) => {
        if (isSelected(option)) {
            onChange(
                value.filter(
                    (item) => item !== option.value
                )
            );
        } else {
            onChange([
                ...value,
                option.value,
            ]);
        }
    };

    const removeCity = (city) => {
        onChange(
            value.filter(
                (item) => item !== city
            )
        );
    };

    const selectedOptions = options.filter((option) =>
        value.includes(option.value)
    );

    return (
        <div
            ref={containerRef}
            className="relative space-y-2"
        >
            <label className="block text-sm font-semibold text-gray-900">
                {label}
            </label>

            {/* Field */}
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className={`
                    w-full
                    min-h-12
                    rounded-full
                    bg-gray-100
                    px-5
                    py-2
                    flex
                    items-center
                    gap-2
                    text-left
                    outline-none
                    transition
                    ${
                        isOpen
                            ? "border border-gray-400"
                            : "border border-transparent"
                    }
                `}
            >
                <div className="flex-1 flex flex-wrap items-center gap-1.5">
                    {selectedOptions.length > 0 ? (
                        selectedOptions.map((city) => (
                            <span
                                key={city.value}
                                className="
                                    inline-flex
                                    items-center
                                    gap-1
                                    rounded-full
                                    bg-white
                                    px-3
                                    py-1
                                    text-xs
                                    text-gray-700
                                "
                            >
                                {city.label}

                                <span
                                    role="button"
                                    tabIndex={0}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeCity(city.value);
                                    }}
                                    onKeyDown={(e) => {
                                        if (
                                            e.key === "Enter" ||
                                            e.key === " "
                                        ) {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            removeCity(city.value);
                                        }
                                    }}
                                    className="
                                        cursor-pointer
                                        text-gray-400
                                        hover:text-gray-700
                                    "
                                >
                                    <X size={13} />
                                </span>
                            </span>
                        ))
                    ) : (
                        <span className="text-gray-400">
                            {placeholder}
                        </span>
                    )}
                </div>

                <ChevronDown
                    size={18}
                    className={`
                        text-gray-400
                        shrink-0
                        transition-transform
                        duration-200
                        ${isOpen ? "rotate-180" : ""}
                    `}
                />
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div
                    className="
                        absolute
                        left-0
                        right-0
                        top-full
                        mt-2
                        z-50
                        rounded-2xl
                        bg-white
                        border
                        border-gray-200
                        shadow-lg
                        overflow-hidden
                    "
                >
                    {/* Search */}
                    <div className="p-3 border-b border-gray-100">
                        <div
                            className="
                                h-10
                                rounded-full
                                bg-gray-100
                                flex
                                items-center
                                px-4
                                gap-2
                            "
                        >
                            <Search
                                size={16}
                                className="text-gray-400 shrink-0"
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Search cities..."
                                autoFocus
                                onClick={(e) =>
                                    e.stopPropagation()
                                }
                                className="
                                    w-full
                                    bg-transparent
                                    outline-none
                                    text-sm
                                    text-gray-700
                                    placeholder:text-gray-400
                                "
                            />
                        </div>
                    </div>

                    {/* Options */}
                    <div className="max-h-60 overflow-y-auto">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => {
                                const selected =
                                    isSelected(option);

                                return (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() =>
                                            handleToggle(option)
                                        }
                                        className="
                                            w-full
                                            px-5
                                            py-3
                                            flex
                                            items-center
                                            justify-between
                                            text-left
                                            text-sm
                                            text-gray-700
                                            hover:bg-gray-50
                                            transition
                                        "
                                    >
                                        <span>
                                            {option.label}
                                        </span>

                                        <div
                                            className={`
                                                w-5
                                                h-5
                                                rounded-md
                                                border
                                                flex
                                                items-center
                                                justify-center
                                                ${
                                                    selected
                                                        ? "bg-[#36E165] border-[#36E165]"
                                                        : "border-gray-300"
                                                }
                                            `}
                                        >
                                            {selected && (
                                                <Check
                                                    size={14}
                                                    className="text-[#081E19]"
                                                />
                                            )}
                                        </div>
                                    </button>
                                );
                            })
                        ) : (
                            <div
                                className="
                                    px-5
                                    py-6
                                    text-center
                                    text-sm
                                    text-gray-400
                                "
                            >
                                No cities found
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CityMultiselect;

// import { useMemo, useState } from "react";
// import { Search, X, ChevronDown } from "lucide-react";
// import { CountryStateCity } from "@tansuasici/country-state-city";

// const CityMultiSelect = ({
//     label = "Operating Cities",
//     placeholder = "Lagos, Abuja",
//     value = [],
//     onChange,
// }) => {

//     const [open, setOpen] = useState(false);
//     const [search, setSearch] = useState("");

//     const cities = useMemo(() => {

//         const query = search.trim().toLowerCase();

//         if (!query) {
//             return [];
//         }

//         return CountryStateCity
//             .searchCities(query)
//             .slice(0, 20);

//     }, [search]);

//     const toggleCity = (city) => {

//         const exists = value.some(
//             item => item.id === city.id
//         );

//         if (exists) {

//             onChange(
//                 value.filter(
//                     item => item.id !== city.id
//                 )
//             );

//         } else {

//             onChange([
//                 ...value,
//                 city,
//             ]);

//         }

//     };

//     const removeCity = (cityId) => {

//         onChange(
//             value.filter(
//                 city => city.id !== cityId
//             )
//         );

//     };

//     return (

//         <div className="w-full relative">

//             <label
//                 className="
//                     block
//                     mb-2
//                     text-sm
//                     font-semibold
//                     text-[#3F4247]
//                 "
//             >
//                 {label}
//             </label>

//             {/* Main field */}

//             <button
//                 type="button"
//                 onClick={() => setOpen(prev => !prev)}
//                 onChange={onChange}
//                 className="
//                     w-full
//                     h-12
//                     min-h-[52px]
//                     rounded-full
//                     bg-gray-100
//                     border
//                     border-transparent
//                     px-4
//                     py-2
//                     flex
//                     items-center
//                     gap-2
//                     text-left
//                 "
//             >

//                 <div className="flex-1 flex flex-wrap gap-1.5">

//                     {value.length === 0 ? (

//                         <span className="text-sm text-[#9A9DA1]">
//                             {placeholder}
//                         </span>

//                     ) : (

//                         value.map(city => (

//                             <span
//                                 key={city.id}
//                                 className="
//                                     inline-flex
//                                     items-center
//                                     gap-1
//                                     bg-[#D8F9E0]
//                                     text-[#081E19]
//                                     rounded-full
//                                     px-3
//                                     py-1
//                                     text-xs
//                                     font-medium
//                                 "
//                             >

//                                 {city.name}

//                                 <span
//                                     role="button"
//                                     tabIndex={0}
//                                     onClick={(event) => {
//                                         event.stopPropagation();
//                                         removeCity(city.id);
//                                     }}
//                                     className="cursor-pointer"
//                                 >
//                                     <X className="w-3 h-3" />
//                                 </span>

//                             </span>

//                         ))

//                     )}

//                 </div>

//                 <ChevronDown
//                     className={`
//                         w-5
//                         h-5
//                         shrink-0
//                         text-[#9A9DA1]
//                         transition-transform
//                         ${open ? "rotate-180" : ""}
//                     `}
//                 />

//             </button>

//             {/* Dropdown */}

//             {open && (

//                 <div
//                     className="
//                         absolute
//                         z-50
//                         left-0
//                         right-0
//                         mt-2
//                         bg-white
//                         border
//                         border-[#E0E2E4]
//                         rounded-2xl
//                         shadow-xl
//                         overflow-hidden
//                     "
//                 >

//                     {/* Search */}

//                     <div className="p-3 border-b border-[#ECEDEF]">

//                         <div
//                             className="
//                                 h-11
//                                 rounded-full
//                                 bg-[#F5F6F7]
//                                 flex
//                                 items-center
//                                 px-4
//                                 gap-2
//                             "
//                         >

//                             <Search
//                                 className="
//                                     w-4
//                                     h-4
//                                     text-[#9A9DA1]
//                                     shrink-0
//                                 "
//                             />

//                             <input
//                                 type="text"
//                                 value={search}
//                                 onChange={(e) =>
//                                     setSearch(e.target.value)
//                                 }
//                                 autoFocus
//                                 placeholder="Search city..."
//                                 className="
//                                     w-full
//                                     bg-transparent
//                                     outline-none
//                                     text-sm
//                                     text-[#081E19]
//                                     placeholder:text-[#9A9DA1]
//                                 "
//                             />

//                         </div>

//                     </div>

//                     {/* Results */}

//                     <div className="max-h-56 overflow-y-auto">

//                         {!search.trim() ? (

//                             <p
//                                 className="
//                                     px-4
//                                     py-6
//                                     text-center
//                                     text-sm
//                                     text-[#9A9DA1]
//                                 "
//                             >
//                                 Search for a city
//                             </p>

//                         ) : cities.length === 0 ? (

//                             <p
//                                 className="
//                                     px-4
//                                     py-6
//                                     text-center
//                                     text-sm
//                                     text-[#9A9DA1]
//                                 "
//                             >
//                                 No cities found
//                             </p>

//                         ) : (

//                             cities.map(city => {

//                                 const selected =
//                                     value.some(
//                                         item =>
//                                             item.id === city.id
//                                     );

//                                 return (

//                                     <button
//                                         key={city.id}
//                                         type="button"
//                                         onClick={() =>
//                                             toggleCity(city)
//                                         }
//                                         className="
//                                             w-full
//                                             px-4
//                                             py-3
//                                             text-left
//                                             flex
//                                             items-center
//                                             justify-between
//                                             hover:bg-[#F5F7F6]
//                                             transition-colors
//                                         "
//                                     >

//                                         <div>

//                                             <p
//                                                 className="
//                                                     text-sm
//                                                     font-medium
//                                                     text-[#081E19]
//                                                 "
//                                             >
//                                                 {city.name}
//                                             </p>

//                                             <p
//                                                 className="
//                                                     text-xs
//                                                     text-[#9A9DA1]
//                                                     mt-0.5
//                                                 "
//                                             >
//                                                 {city.stateName
//                                                     ? `${city.stateName}, `
//                                                     : ""}
//                                                 {city.countryName || ""}
//                                             </p>

//                                         </div>

//                                         <div
//                                             className={`
//                                                 w-5
//                                                 h-5
//                                                 rounded-full
//                                                 border
                                                
//                                                 flex
//                                                 items-center
//                                                 justify-center
//                                                 ${
//                                                     selected
//                                                         ? "bg-[#36E165] border-[#36E165]"
//                                                         : "border-[#C9CCCF]"
//                                                 }
//                                             `}
//                                         >

//                                             {selected && (
//                                                 <span className="text-xs font-bold">
//                                                     ✓
//                                                 </span>
//                                             )}

//                                         </div>

//                                     </button>

//                                 );

//                             })

//                         )}

//                     </div>

//                 </div>

//             )}

//         </div>

//     );

// };

// export default CityMultiSelect;