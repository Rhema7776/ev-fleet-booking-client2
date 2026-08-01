import AuthSuccessLayout from "./AuthSuccessLayout";

const IllustrationSuccess = ({
    image,
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
                className="w-64 mb-10"
            />

            <h1 className="text-white text-5xl font-black leading-none whitespace-pre-line">

                {title}

            </h1>

            <p className="text-white/90 mt-6 max-w-sm">

                {description}

            </p>

        </AuthSuccessLayout>

    );

};

export default IllustrationSuccess;