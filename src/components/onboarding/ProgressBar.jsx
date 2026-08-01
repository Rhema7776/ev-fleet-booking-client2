const ProgressBar = ({ current, total }) => {

    return (

        <div
            className="
                flex
                w-full
                h-1.5
                overflow-hidden
                rounded-full
                bg-gray-200
            "
        >

            {Array.from({ length: total }).map((_, index) => (

                <div
                    key={index}
                    className={`
                        flex-1
                        transition-all
                        duration-700

                        ${
                            index <= current
                                ? "bg-brand-primary-dark"
                                : "bg-gray-200"
                        }

                        ${
                            index !== total - 1
                                ? "border-r border-white/20"
                                : ""
                        }
                    `}
                />

            ))}

        </div>

    );

};

export default ProgressBar;