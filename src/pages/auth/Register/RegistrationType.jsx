import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import AuthContainer from "@/components/auth/AuthContainer";

import leftArrow from "@/assets/images/Icon Button.svg";

import partnerImage from "@/assets/images/partnercardimg1.svg";
import fleetImage from "@/assets/images/partnercardimg2.svg";

const RegistrationType = () => {

    const navigate = useNavigate();

    return (

        <AuthContainer>

            <div
                className="
                    min-h-screen
                    -mx-6
                    -my-8
                    px-6
                    py-8
                    bg-brand-primary
                    flex
                    flex-col
                "
            >

                {/* Back */}

                <button
                    onClick={() => navigate(-1)}
                    className="
                        w-12
                        h-12
                        rounded-full
                        bg-white
                        flex
                        items-center
                        justify-center
                    "
                >

                    <img
                        src={leftArrow}
                        alt="Back"
                    />

                </button>


                {/* Heading */}

                <div className="mt-12">

                    <h1
                        className="
                            text-white
                            text-[42px]
                            leading-[1]
                            font-black
                        "
                    >

                        How would
                        <br />

                        you like to
                        <br />

                        use LeaseHub?

                    </h1>

                    <p
                        className="
                            text-white/90
                            mt-5
                            text-base
                        "
                    >

                        Choose an account type.

                    </p>

                </div>


                {/* Cards */}

                <div className="mt-12 space-y-5">

                    {/* Partner */}

                    <button

                        onClick={() =>
                            navigate("/auth/register/partner")
                        }

                        className="
                            w-full
                            bg-white
                            rounded-[30px]
                            p-5
                            flex
                            items-center
                            justify-between
                        "

                    >

                        <div className="flex items-center gap-4">

                            <img
                                src={partnerImage}
                                alt=""
                                className="w-20 h-20"
                            />

                            <div className="text-left">

                                <h2 className="font-bold text-lg">

                                    I'd love
                                    <br />

                                    to partner

                                </h2>

                                <p className="text-sm text-gray-500 mt-1">

                                    Become an agent or partner.

                                </p>

                            </div>

                        </div>

                        <div
                            className="
                                w-12
                                h-12
                                rounded-full
                                bg-brand-primary
                                flex
                                items-center
                                justify-center
                            "
                        >

                            <ArrowUpRight
                                className="text-white"
                            />

                        </div>

                    </button>


                    {/* Fleet */}

                    <button

                        onClick={() =>
                            navigate(ROUTES.REGISTRATION_LOADING, {
                                state: {
                                    next: ROUTES.FLEET_OWNER_REGISTER,
                                },
                            })
                        }

                        className="
                            w-full
                            bg-[#06251B]
                            rounded-[30px]
                            p-5
                            flex
                            items-center
                            justify-between
                        "

                    >

                        <div className="flex items-center gap-4">

                            <img
                                src={fleetImage}
                                alt=""
                                className="w-20 h-20"
                            />

                            <div className="text-left">

                                <h2
                                    className="
                                        font-bold
                                        text-lg
                                        text-white
                                    "
                                >

                                    I own
                                    <br />

                                    a fleet

                                </h2>

                                <p
                                    className="
                                        text-sm
                                        text-white/70
                                        mt-1
                                    "
                                >

                                    Register your vehicles.

                                </p>

                            </div>

                        </div>

                        <div
                            className="
                                w-12
                                h-12
                                rounded-full
                                bg-white
                                flex
                                items-center
                                justify-center
                            "
                        >

                            <ArrowUpRight />

                        </div>

                    </button>

                </div>


                <div
                    className="
                        mt-auto
                        text-center
                        text-white
                    "
                >

                    Already have an account?

                    <button

                        onClick={() => navigate("/auth/login")}

                        className="
                            ml-2
                            underline
                            font-bold
                        "

                    >

                        Log in

                    </button>

                </div>

            </div>

        </AuthContainer>

    );

};

export default RegistrationType;