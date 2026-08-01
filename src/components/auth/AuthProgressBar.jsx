const AuthProgressBar = ({ current, total = 4 }) => {

    return (

        <div
            className="
                flex
                w-full
                h-1.5
                overflow-hidden
                rounded-full
                bg-gray-100
            "
        >

            {Array.from({ length: total }).map((_, index) => (

                <div
                    key={index}
                    className={`
                        flex-1
                        transition-all
                        duration-500

                        ${
                            index <= current
                                ? "bg-brand-primary"
                                : "bg-gray-200"
                        }

                        ${
                            index !== total - 1
                                ? "border-r border-white"
                                : ""
                        }
                    `}
                />

            ))}

        </div>

    );

};

export default AuthProgressBar;