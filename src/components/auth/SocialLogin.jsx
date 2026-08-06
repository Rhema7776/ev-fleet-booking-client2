import google from "@/assets/images/google.svg";
import facebook from "@/assets/images/facebook.svg";
import apple from "@/assets/images/apple.svg";

const SocialLogin = () => {

    return (

        <div className="mt-10">

            <div className="flex items-center gap-3">

                <div className="flex-1 h-px bg-[#E5E7EB]" />

                <span
                    className="
                        text-xs
                        text-[#9CA3AF]
                    "
                >
                    or
                </span>

                <div className="flex-1 h-px bg-[#E5E7EB]" />

            </div>

            <p
                className="
                    text-center
                    text-xs
                    text-[#9CA3AF]
                    mt-5
                "
            >
                use any of your favourite social media
            </p>

            <div
                className="
                    flex
                    justify-center
                    gap-5
                    mt-6
                "
            >

                {/* {[google, facebook, apple].map((icon) => (

                    <button
                        key={icon}
                        className="
                            w-16
                            h-16
                            rounded-full
                            bg-[#F4F4F4]
                            flex
                            items-center
                            justify-center
                            transition
                            hover:scale-105
                        "
                    >

                        <img
                            src={icon}
                            className="w-8 h-8"
                            alt=""
                        />

                    </button>

                ))} */}
                <div className="flex justify-center gap-6 mt-8">

                <button
                    className="
                        w-[72px]
                        h-[72px]
                        rounded-full
                        bg-[#F5F5F5]
                        flex
                        items-center
                        justify-center
                        transition
                        hover:scale-105
                    "
                >

                    <img
                        src={google}
                        className="w-8"
                    />

                </button>

                <button
                    className="
                        w-[72px]
                        h-[72px]
                        rounded-full
                        bg-[#F5F5F5]
                        flex
                        items-center
                        justify-center
                        transition
                        hover:scale-105
                    "
                >

                    <img
                        src={facebook}
                        className="w-8"
                    />

                </button>

                <button
                    className="
                        w-[72px]
                        h-[72px]
                        rounded-full
                        bg-[#F5F5F5]
                        flex
                        items-center
                        justify-center
                        transition
                        hover:scale-105
                    "
                >

                    <img
                        src={apple}
                        className="w-8"
                    />

                </button>

            </div>

            </div>

        </div>

    );

};

export default SocialLogin;