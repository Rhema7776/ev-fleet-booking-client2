import googleIcon from "@/assets/images/google.svg";
import facebookIcon from "@/assets/images/facebook.svg";
import appleIcon from "@/assets/images/apple.svg";

const SocialButtons = () => {
    const icons = [
        googleIcon,
        facebookIcon,
        appleIcon,
    ];

    return (
        <>
            <p className="text-center text-sm text-gray-500 mb-5">
                use any of your favourite social media
            </p>

            <div className="flex justify-center gap-4">

                {icons.map((icon, index) => (

                    <button
                        key={index}
                        type="button"
                        className="
                            w-14
                            h-14
                            rounded-[20px]
                            bg-gray-100
                            flex
                            items-center
                            justify-center
                        "
                    >
                        <img src={icon} alt="" />

                    </button>

                ))}

            </div>
        </>
    );
};

export default SocialButtons;