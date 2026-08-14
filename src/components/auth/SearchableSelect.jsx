import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search, Check } from "lucide-react";

const SearchableSelect = ({
    label,
    placeholder = "Select an option",
    value,
    onChange,
    options = [],
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");

    const containerRef = useRef(null);

    const selectedOption = options.find(
        (option) => option.value === value
    );

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

    const handleSelect = (option) => {
        onChange({
            target: {
                value: option.value,
            },
        });

        setIsOpen(false);
        setSearch("");
    };

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
                    h-12
                    rounded-full
                    bg-gray-100
                    px-5
                    flex
                    items-center
                    justify-between
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
                <span
                    className={
                        selectedOption
                            ? "text-gray-700"
                            : "text-gray-400"
                    }
                >
                    {selectedOption
                        ? selectedOption.label
                        : placeholder}
                </span>

                <ChevronDown
                    size={18}
                    className={`
                        text-gray-400
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
                                placeholder="Search..."
                                autoFocus
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
                                const isSelected =
                                    option.value === value;

                                return (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() =>
                                            handleSelect(option)
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

                                        {isSelected && (
                                            <Check
                                                size={17}
                                                className="text-green-500"
                                            />
                                        )}
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
                                No results found
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchableSelect;

// import { useEffect, useRef, useState } from "react";
// import {
//     Search,
//     ChevronDown,
//     Check,
// } from "lucide-react";

// const SearchableSelect = ({
//     label,
//     placeholder = "Select",
//     value,
//     onChange,
//     options = [],
//     loading = false,
//     onSearch,
// }) => {

//     const [open, setOpen] = useState(false);
//     const [search, setSearch] = useState("");

//     const containerRef = useRef(null);

//     /*
//     |--------------------------------------------------------------------------
//     | Search
//     |--------------------------------------------------------------------------
//     */

//     useEffect(() => {

//         if (!open) return;

//         const timeout = setTimeout(() => {

//             onSearch?.(search);

//         }, 300);

//         return () => clearTimeout(timeout);

//     }, [search, open, onSearch]);


//     /*
//     |--------------------------------------------------------------------------
//     | Close when clicking outside
//     |--------------------------------------------------------------------------
//     */

//     useEffect(() => {

//         const handleClickOutside = (event) => {

//             if (
//                 containerRef.current &&
//                 !containerRef.current.contains(event.target)
//             ) {
//                 setOpen(false);
//             }

//         };

//         document.addEventListener(
//             "mousedown",
//             handleClickOutside
//         );

//         return () => {

//             document.removeEventListener(
//                 "mousedown",
//                 handleClickOutside
//             );

//         };

//     }, []);


//     /*
//     |--------------------------------------------------------------------------
//     | Selected option
//     |--------------------------------------------------------------------------
//     */

//     const selectedOption = options.find(
//         option => option.value === value
//     );


//     /*
//     |--------------------------------------------------------------------------
//     | Select
//     |--------------------------------------------------------------------------
//     */

//     const handleSelect = (option) => {

//         onChange(option.value);

//         setOpen(false);

//         setSearch("");

//     };


//     return (

//         <div
//             ref={containerRef}
//             className="relative w-full"
//         >

//             {/* Label */}

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


//             {/* Trigger */}

//             <button
//                 type="button"
//                 onClick={() => setOpen(prev => !prev)}
//                 className="
//                     w-full
//                     h-12
//                     rounded-full
//                     bg-gray-100
//                     border
//                     border-transparent
//                     px-5
//                     flex
//                     items-center
//                     outline-none
//                     transition
//                     focus-within:border-gray-400

//                 "
//             >

//                 <span
//                     className={
//                         selectedOption
//                             ? "text-sm text-[#081E19]"
//                             : "text-sm text-[#9A9DA1]"
//                     }
//                 >
//                     {selectedOption?.label || placeholder}
//                 </span>


//                 <ChevronDown
//                     className={`
//                         w-5
//                         h-5
//                         shrink-0
//                         text-[#9A9DA1]
//                         transition-transform
//                         ${
//                             open
//                                 ? "rotate-180"
//                                 : ""
//                         }
//                     `}
//                 />

//             </button>


//             {/* Dropdown */}

//             {open && (

//                 <div
//                     className="
//                         absolute
//                         z-[100]
//                         left-0
//                         right-0
//                         mt-2
//                         bg-white
//                         border
//                         border-[#E1E3E5]
//                         rounded-2xl
//                         shadow-xl
//                         overflow-hidden
//                     "
//                 >

//                     {/* Search */}

//                     <div
//                         className="
//                             p-3
//                             border-b
//                             border-[#ECEDEF]
//                         "
//                     >

//                         <div
//                             className="
//                                 h-11
//                                 rounded-full
//                                 bg-[#F1F2F3]
//                                 flex
//                                 items-center
//                                 gap-2
//                                 px-4
//                             "
//                         >

//                             <Search
//                                 className="
//                                     w-4
//                                     h-4
//                                     shrink-0
//                                     text-[#9A9DA1]
//                                 "
//                             />

//                             <input
//                                 type="text"
//                                 autoFocus
//                                 value={search}
//                                 onChange={(event) =>
//                                     setSearch(
//                                         event.target.value
//                                     )
//                                 }
//                                 placeholder="Search bank..."
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

//                     <div
//                         className="
//                             max-h-60
//                             overflow-y-auto
//                         "
//                     >

//                         {loading ? (

//                             <div
//                                 className="
//                                     px-4
//                                     py-8
//                                     text-center
//                                     text-sm
//                                     text-[#9A9DA1]
//                                 "
//                             >
//                                 Searching banks...
//                             </div>

//                         ) : options.length === 0 ? (

//                             <div
//                                 className="
//                                     px-4
//                                     py-8
//                                     text-center
//                                     text-sm
//                                     text-[#9A9DA1]
//                                 "
//                             >
//                                 {search
//                                     ? "No banks found."
//                                     : "Start typing to search banks."
//                                 }
//                             </div>

//                         ) : (

//                             options.map(option => {

//                                 const selected =
//                                     option.value === value;

//                                 return (

//                                     <button
//                                         key={option.value}
//                                         type="button"
//                                         onClick={() =>
//                                             handleSelect(option)
//                                         }
//                                         className="
//                                             w-full
//                                             px-4
//                                             py-3
//                                             flex
//                                             items-center
//                                             justify-between
//                                             text-left
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
//                                                 {option.label}
//                                             </p>

//                                             {option.country && (

//                                                 <p
//                                                     className="
//                                                         mt-0.5
//                                                         text-xs
//                                                         text-[#9A9DA1]
//                                                     "
//                                                 >
//                                                     {option.country}
//                                                 </p>

//                                             )}

//                                         </div>


//                                         {selected && (

//                                             <Check
//                                                 className="
//                                                     w-4
//                                                     h-4
//                                                     text-[#36E165]
//                                                 "
//                                             />

//                                         )}

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

// export default SearchableSelect;