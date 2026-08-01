const Button = ({
    children,
    onClick,
    type = "button",
    variant = "primary",
    loading = false,
    disabled = false,
}) => {

    const variants = {

        primary: `
            bg-brand-primary
            text-brand-dark
            hover:opacity-90
        `,

        dark: `
            bg-black
            text-white
            hover:bg-neutral-900
        `,

        outline: `
            bg-white
            text-black
            border
            border-transparent
        `,

    };

    return (

        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`
                shadow-lg
                hover:shadow-xl
                w-full
                h-14
                rounded-2xl
                font-semibold
                transition-all
                duration-300
                disabled:opacity-50
                disabled:pointer-events-none
                flex
                items-center
                justify-center
                ${variants[variant]}
            `}
        >

            {loading ? "Loading..." : children}

        </button>

    );

};

export default Button;