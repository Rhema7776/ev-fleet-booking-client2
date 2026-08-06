import { Link, useNavigate } from "react-router-dom";

import AuthContainer from "@/components/auth/AuthContainer";

import SelectionCard from "@/components/cards/SelectionCard";

import leftArrow from "@/assets/images/Icon Button.svg";

import partnerImage from "@/assets/images/partnercardimg1.svg";

import fleetImage from "@/assets/images/partnercardimg2.svg";

import { ROUTES } from "@/constants/routes";

const RegistrationType = () => {

    const navigate = useNavigate();

    return (

        <AuthContainer>

            <div

                className="

                    min-h-screen

                    overflow-y-auto

                    -mx-6

                    -my-8

                    px-6

                    py-8

                    flex

                    flex-col

                "

                style={{

                    background:

                        "linear-gradient(180deg,#45E76B 0%,#29D55A 100%)"

                }}

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

                        alt=""

                    />

                </button>

                {/* Title */}

                <div className="mt-12">

                    <h1

                        className="

                            text-white

                            font-black

                            leading-[.92]

                        "

                        style={{

                            fontSize:"clamp(42px,7vw,56px)"

                        }}

                    >

                        How would

                        <br/>

                        you like to

                        <br/>

                        use LeaseHub?

                    </h1>

                    <p

                        className="

                            mt-5

                            text-white/90

                            text-lg

                        "

                    >

                        Choose an account type.

                    </p>

                </div>

                {/* Cards */}

                <div

                    className="

                        flex-1

                        flex

                        flex-col

                        justify-center

                        gap-5

                    "

                >

                    <SelectionCard

                        image={partnerImage}

                        title={

                            <>

                                I'd love

                                <br/>

                                to partner

                            </>

                        }

                        description="Become an agent or partner."

                        background="#36E165"

                        textColor="#081E19"

                        arrowBackground="#F9F9F9"

                        arrowColor="#081E19"

                        onClick={()=>

                            navigate("/auth/register/partner")

                        }

                    />

                    <SelectionCard

                        image={fleetImage}

                        title={

                            <>

                                I own

                                <br/>

                                a fleet

                            </>

                        }

                        description="Register your vehicles."

                        background="#081E19"

                        textColor="#FFFFFF"

                        arrowBackground="#F9F9F9"

                        arrowColor="#081E19"

                        onClick={()=>

                            navigate(ROUTES.FLEET_TRANSITION)

                        }

                    />

                </div>

                {/* Footer */}

                <div

                    className="

                        text-center

                        text-white

                        pb-2

                    "

                >

                    Already have an account?

                    <Link

                        to="/auth/login"

                        className="

                            underline

                            ml-2

                            font-bold

                        "

                    >

                        Log in

                    </Link>

                </div>

            </div>

        </AuthContainer>

    );

};

export default RegistrationType;