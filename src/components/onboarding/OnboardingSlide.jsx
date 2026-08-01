const OnboardingSlide = ({
    headingPrimary,
    headingSecondary,
    description,
}) => {
    return (
        <div className="text-center">
            <h1 className="text-5xl font-black leading-tight">
                <span className="block text-gray-900">
                    {headingPrimary}
                </span>

                <span className="block text-gray-400 whitespace-pre-line">
                    {headingSecondary}
                </span>
            </h1>

            <p className="mt-4 text-gray-500">
                {description}
            </p>
        </div>
    );
};

export default OnboardingSlide;