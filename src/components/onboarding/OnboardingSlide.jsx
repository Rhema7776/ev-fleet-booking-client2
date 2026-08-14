const OnboardingSlide = ({
    headingPrimary,
    headingSecondary,
    description,
}) => {
    return (
        <div className="text-center pb-7">
            <h1 className=" header-font text-3xl font-bold leading-none">
                <span className="block text-gray-900">
                    {headingPrimary}
                </span>

                <span className="block text-gray-500 whitespace-pre-line">
                    {headingSecondary}
                </span>
            </h1>

            <p className="mt-3 text-gray-500 text-sm">
                {description}
            </p>
        </div>
    );
};

export default OnboardingSlide;