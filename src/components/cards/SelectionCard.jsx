import rightArrow from "@/assets/images/rightArrowButton.svg";
import ArrowCircleButton from "../ui/ArrowCircleButton";

const SelectionCard = ({
    image,
    title,
    description,
    background,
    textColor,
    arrowBackground,
    arrowColor,
    onClick,

    // Optional — existing cards remain unchanged
    imagePosition = "left",
}) => {

    const imageOnRight = imagePosition === "right";

    return (
        <button
            onClick={onClick}
            className="
                relative
                w-full
                max-w-[356px]
                h-[132px]
                rounded-[24px]
                flex
                items-center
                transition-all
                duration-150
                ease-linear
                hover:scale-[1.01]
                active:scale-[0.98]
                mx-auto
                overflow-hidden
            "
            style={{
                background,
            }}
        >

            {imageOnRight ? (

                <>
                    {/* Text */}
                    <div
                        className="
                            relative
                            z-20
                            flex
                            flex-col
                            items-start
                            text-left
                            pl-5
                            pr-24
                        "
                    >
                        <h3
                            className="
                                text-md
                                leading-none
                                font-sans
                            "
                            style={{
                                color: textColor,
                            }}
                        >
                            {title}
                        </h3>

                        <p
                            className="
                                mt-2
                                text-sm
                                leading-none
                                font-sans
                                max-w-[170px]
                            "
                            style={{
                                color: textColor,
                                opacity: 0.75,
                            }}
                        >
                            {description}
                        </p>
                    </div>

                    {/* Car image */}
                    <img
                        src={image}
                        alt=""
                        className="
                            absolute
                            right-[1px]
                            bottom-[-1px]
                            z-10
                            w-[170px]
                            h-[125px]
                            object-contain
                            object-right-bottom
                            pointer-events-none
                            select-none
                        "
                    />

                    {/* Arrow */}
                    <div
                        className="
                            absolute z-30
                            right-4
                            bottom-3
                            w-8 h-8
                            rounded-full
                            flex items-center justify-center
                        "
                        style={{
                            background: arrowBackground,
                        }}
                    >
                        <img
                            src={rightArrow}
                            alt=""
                            className=""
                            style={{
                                color: arrowColor,
                            }}
                        />
                    </div>
                </>

            ) : (

                <>
                    {/* Existing layout — untouched */}
                    <div className="flex items-center gap-5 px-5">

                        <img
                            src={image}
                            alt=""
                            className="
                                w-[72px]
                                h-[72px]
                                object-contain
                                shrink-0
                            "
                        />

                        <div className="text-left">

                            <h3
                                className="
                                    text-md
                                    leading-none
                                    font-sans
                                "
                                style={{
                                    color: textColor,
                                }}
                            >
                                {title}
                            </h3>

                            <p
                                className="
                                    mt-2
                                    text-sm
                                    leading-none
                                    font-sans
                                    max-w-[170px]
                                "
                                style={{
                                    color: textColor,
                                    opacity: 0.75,
                                }}
                            >
                                {description}
                            </p>

                        </div>

                    </div>

                    {/* Existing arrow */}
                    <div
                        className="
                            bg-red-100
                            absolute z-30
                            right-4
                            bottom-3
                            w-12 h-12
                            rounded-full
                            flex items-center justify-center
                        "
                        style={{
                            background: arrowBackground,
                        }}
                    >
                        <img
                            src={rightArrow}
                            alt=""
                            className="w-5 h-5"
                            style={{
                                color: arrowColor,
                            }}
                        />
                    </div>
                </>
            )}

        </button>
    );
};

export default SelectionCard;


// import rightArrow from "@/assets/images/rightArrowButton.svg";
// import ArrowCircleButton from "../ui/ArrowCircleButton";

// const SelectionCard = ({
//     image,
//     title,
//     description,
//     background,
//     textColor,
//     arrowBackground,
//     arrowColor,
//     onClick,
// }) => {

//     return (

//         <button
//             onClick={onClick}
//             className="
//                 w-full
//                 max-w-[356px]
//                 h-[132px]
//                 rounded-[24px]
//                 flex
//                 items-center
//                 justify-between
//                 px-5
//                 transition-all
//                 duration-150
//                 ease-linear
//                 hover:scale-[1.01]
//                 active:scale-[0.98]
//                 mx-auto
                
//             "
//             style={{
//                 background,
//             }}
//         >

//             {/* Left Side */}

//             <div className="flex items-center gap-5">

//                 <img
//                     src={image}
//                     alt=""
//                     className="
//                         w-[72px]
//                         h-[72px]
//                         object-contain
//                         shrink-0
//                     "
//                 />

//                 <div className="text-left">

//                     <h3
//                         className="
                            
//                             text-md
//                             leading-none
//                             font-sans
//                         "
//                         style={{
//                             color: textColor,
//                         }}
//                     >
//                         {title}
//                     </h3>

//                     <p
//                         className="
//                             mt-2
//                             text-sm
//                             leading-none
//                             font-sans
//                             max-w-[170px]
//                         "
//                         style={{
//                             color: textColor,
//                             opacity: .75,
//                         }}
//                     >
//                         {description}
//                     </p>

//                 </div>

//             </div>

//             {/* Arrow */}

//             <div
//                 className="
//                     w-12
//                     h-12
//                     rounded-full
//                     flex
//                     items-center
//                     justify-center
//                     shrink-0
                    
//                 "
//                 style={{
//                     background: arrowBackground,
//                 }}
//             >
                
//                 <img
//                     src={rightArrow}
//                     alt=""
//                     className="w-5 h-5 "
//                     style={{
//                         color: arrowColor,
//                     }}
//                 />


//             </div>

//         </button>

//     );

// };

// export default SelectionCard;