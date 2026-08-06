import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import AuthContainer from "@/components/auth/AuthContainer";
import leftArrow from "@/assets/images/Icon Button.svg";

import individualImage from "@/assets/images/partnercardimg1.svg";
import enterpriseImage from "@/assets/images/partnercardimg2.svg";

const PartnerTypeSelection = () => {

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
                    bg-brand-primary-pale
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

                        partner
                        <br />

                        with us?

                    </h1>

                    <p
                        className="
                            text-white/90
                            mt-5
                            text-base
                        "
                    >

                        Choose a partner type.

                    </p>

                </div>


                {/* Cards */}

                <div className="mt-12 space-y-5">

                    {/* Individual */}
                    
                    <button

                        onClick={() =>
                            navigate(ROUTES.REGISTRATION_LOADING, {
                                state: {
                                    next: ROUTES.INDIVIDUAL_REGISTER,
                                },
                            })
                        }

                        className="
                            w-full
                            bg-white
                            rounded-[30px]
                            p-5
                            flex
                            items-center
                            justify-between
                            transition-all
                            duration-300
                            hover:scale-[1.02]
                        "

                    >

                        <div className="flex items-center gap-4">

                            <img

                                src={individualImage}

                                alt="Individual"

                                className="
                                    w-20
                                    h-20
                                "

                            />

                            <div className="text-left">

                                <h2
                                    className="
                                        font-bold
                                        text-lg
                                    "
                                >

                                    Individual
                                    <br />

                                    partner

                                </h2>

                            </div>

                        </div>


                        <div
                            className="
                                w-12
                                h-12
                                rounded-full
                                bg-brand-primary-pale
                                flex
                                items-center
                                justify-center
                            "
                        >

                            <ArrowUpRight
                                className="text-white"
                                size={22}
                            />

                        </div>

                    </button>


                    {/* Enterprise */}

                    <button

                        onClick={() =>
                            navigate(ROUTES.REGISTRATION_LOADING, {
                                state: {
                                    next: ROUTES.ENTERPRISE_REGISTER,
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
                            transition-all
                            duration-300
                            hover:scale-[1.02]
                        "

                    >

                        <div className="flex items-center gap-4">

                            <img

                                src={enterpriseImage}

                                alt="Enterprise"

                                className="
                                    w-20
                                    h-20
                                "

                            />

                            <div className="text-left">

                                <h2
                                    className="
                                        font-bold
                                        text-lg
                                        text-white
                                    "
                                >

                                    Enterprise
                                    <br />

                                    partner

                                </h2>

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

                            <ArrowUpRight
                                size={22}
                            />

                        </div>

                    </button>

                </div>


                {/* Footer */}

                <div
                    className="
                        mt-auto
                        text-center
                        text-white
                    "
                >

                    Already registered?

                    <Link

                        to="/auth/login"

                        className="
                            ml-2
                            font-bold
                            underline
                        "

                    >

                        Log in

                    </Link>

                </div>

            </div>

        </AuthContainer>

    );

};

export default PartnerTypeSelection;