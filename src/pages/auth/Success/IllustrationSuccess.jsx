import AuthSuccessLayout from "./AuthSuccessLayout";

const IllustrationSuccess = ({
    image,
    image2,
    title,
    description,
    buttonText,
    redirectTo,
}) => {

    return (

        <AuthSuccessLayout
            buttonText={buttonText}
            redirectTo={redirectTo}
        >

            <img
                src={image}
                alt=""
                className="w-[199 px] h-[91px] object-contain"
            />
            <img
                src={image2}
                alt=""
                className="w-[214px] h-[58px] object-contain"
            />

            <h1 className="text-white text-3xl header-font leading-none whitespace-pre-line">

                {title}

            </h1>

            <p className="text-white/90 mt-6 max-w-sm">

                {description}

            </p>

        </AuthSuccessLayout>

    );

};

export default IllustrationSuccess;