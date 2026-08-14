import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";

const ArrowCircleButton = ({
    iconColor = "#081E19",
    background = "#F9F9F9",
    size = 52,
}) => {

    return (

        <div
            className="
                flex
                items-center
                justify-center
                rounded-full
                shrink-0
            "
            style={{
                width: size,
                height: size,
                background,
            }}
        >

            <ArrowUpRight
                size={22}
                color={iconColor}
                strokeWidth={2.5}
            />

        </div>

    );

};

export default ArrowCircleButton;