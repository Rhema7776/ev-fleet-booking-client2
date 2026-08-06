import clsx from "clsx";
import ArrowCircleButton from "@/components/ui/ArrowCircleButton";

const SelectionCard = ({

    image,

    title,

    description,

    background,

    textColor,

    arrowBackground,

    arrowColor,

    onClick,

}) => {

    return (

        <button

            onClick={onClick}

            className={clsx(

                "w-full",

                "rounded-[34px]",

                "px-6",

                "py-6",

                "flex",

                "items-center",

                "justify-between",

                "transition-all",

                "duration-300",

                "hover:scale-[1.015]",

                "active:scale-[.99]"

            )}

            style={{

                background,

            }}

        >

            <div

                className="

                    flex

                    items-center

                    gap-5

                "

            >

                <img

                    src={image}

                    alt=""

                    className="

                        w-[86px]

                        h-[86px]

                        object-contain

                    "

                />

                <div className="text-left">

                    <h2

                        className="

                            font-black

                            leading-tight

                            text-[24px]

                        "

                        style={{

                            color:textColor

                        }}

                    >

                        {title}

                    </h2>

                    {

                        description &&

                        <p

                            className="

                                mt-2

                                text-[14px]

                            "

                            style={{

                                color:textColor,

                                opacity:.75

                            }}

                        >

                            {description}

                        </p>

                    }

                </div>

            </div>

            <ArrowCircleButton

                background={arrowBackground}

                iconColor={arrowColor}

            />

        </button>

    );

};

export default SelectionCard;