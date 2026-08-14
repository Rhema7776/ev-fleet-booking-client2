import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";

const variants = {
    dark: {
        button: "bg-[#071B14] text-white",
        circle: "bg-[#38E35D] text-[#071B14]",
    },

    green: {
        button: "bg-[#38E35D] text-[#071B14]",
        circle: "bg-[#071B14] text-white",
    },

    light: {
       button: "bg-[#FFFFFF]  text-[#040610]",
        circle: "bg-[#040610] text-[#FFFFFF]", 
    },

    outline: {
        button: "border border-[#D9D9D9] bg-white text-[#071B14]",
        circle: "bg-[#071B14] text-white",
    },

    registrationGreen: {
        button: "bg-[#36E165] text-white",
        circle: "bg-[#F9F9F9] text-[#081E19]",
    },

    registrationDark: {
        button: "bg-[#081E19] text-white",
        circle: "bg-[#F9F9F9] text-[#081E19]",
    },

    fleetTransition: {
        button: "bg-[#36E165] text-[#081E19]",
        circle: "bg-[#081E19] text-white",
    },

    fleetSuccess: {
        button: "bg-[#081E19] text-white",
        circle: "bg-[#36E165] text-white",
    },
};

const ActionButton = ({
    children,
    variant = "dark",
    icon = <ArrowUpRight size={20} />,
    onClick,
    className = "",
    disabled = false,
}) => {

    const style = variants[variant];

    return (

        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className={clsx(
                "w-full",
                "h-[51px]",
                "rounded-full",
                "flex",
                "items-center",
                "justify-between",
                "pl-8",
                "pr-2",
                "font-semibold",
                "text-[18px]",
                "font-bold",
                "transition-all",
                "duration-200",
                "disabled:opacity-50",
                "disabled:cursor-not-allowed",
                style.button,
                className
            )}
        >

            <span className="flex-1 text-center">
                {children}
            </span>

            <span
                className={clsx(
                    "w-[40px]",
                    "h-[40px]",
                    "rounded-full",
                    "flex",
                    "items-center",
                    "justify-center",
                    "shrink-0",
                    style.circle
                )}
            >
                {icon}
            </span>

        </button>

    );

};

export default ActionButton;