const AuthHeader = ({
    darkText,
    lightText,
    description,
    stacked = false,
}) => {
    return (
        <div className="mb-8">

            <h1 className="text-4xl font-extrabold tracking-tight">

                {stacked ? (
                    <>
                        <span className="block text-gray-900">
                            {darkText}
                        </span>

                        <span className="block text-gray-500">
                            {lightText}
                        </span>
                    </>
                ) : (
                    <>
                        <span className="text-gray-900">
                            {darkText}
                        </span>

                        <span className="text-gray-500">
                            {lightText}
                        </span>
                    </>
                )}

            </h1>

            {description && (
                <p className="mt-2 text-gray-500">
                    {description}
                </p>
            )}

        </div>
    );
};

export default AuthHeader;