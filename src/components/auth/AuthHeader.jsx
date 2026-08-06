const AuthHeader = ({
    title,
    darkText,
    lightText,
    description,
    stacked = false,
}) => {

    return (

        <div className="mt-8">

            <h1
                className="
                    text-[48px]
                    leading-[0.9]
                    tracking-[-0.04em]
                    font-black
                "
            >

                {title ? (

                    title

                ) : stacked ? (

                    <>
                        <span className="text-[#6F7278]">
                            {darkText}
                        </span>

                        <br />

                        <span className="text-[#071B14]">
                            {lightText}
                        </span>
                    </>

                ) : (

                    <>
                        <span className="text-[#6F7278]">
                            {darkText}
                        </span>{" "}

                        <span className="text-[#071B14]">
                            {lightText}
                        </span>
                    </>

                )}

            </h1>

            {description && (

                <p
                    className="
                        mt-5
                        text-[#6B7280]
                        text-base
                        leading-6
                    "
                >

                    {description}

                </p>

            )}

        </div>

    );

};

export default AuthHeader;