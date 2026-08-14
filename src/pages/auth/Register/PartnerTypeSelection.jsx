import { Link, useNavigate } from "react-router-dom";

import AuthContainer from "@/components/auth/AuthContainer";
import SelectionCard from "@/components/cards/SelectionCard";

import leftArrow from "@/assets/images/Icon Button.svg";
import partnerImage from "@/assets/images/partnercardimg1.svg";
import fleetImage from "@/assets/images/partnercardimg2.svg";
import partnerCar from "@/assets/images/partnercar.svg";

import { ROUTES } from "@/constants/routes";

const PartnerTypeSelection = () => {

    const navigate = useNavigate();

    return (

        <AuthContainer padded={false}>

            <div
                className="
                    relative
                    min-h-screen
                    overflow-hidden
                    -mx-6
                    -my-8
                    px-6
                    py-8
                    flex
                    flex-col
                    bg-[#2DB654]
                "
            >
                {/* Decorative Car */}
                <img
                    src={partnerCar}
                    alt=""
                    className="
                        absolute
                        top-0
                        right-0
                        w-36
                        md:w-44
                        pointer-events-none
                        select-none
                    "
                />

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="
                        relative
                        z-10
                        w-10
                        h-10
                        rounded-full
                        bg-white/20
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

                {/* Header */}
                <div
                    className="
                        relative
                        z-10
                        mt-8
                    "
                >
                    <h1
                        className="
                            header-font
                            text-white
                            font-black
                            leading-none
                            max-w-[440px]
                        "
                        style={{
                            fontSize: "clamp(40px,7vw,56px)"
                        }}
                    >
                        Partner
                        <br />
                        with us?
                    </h1>

                    <p
                        className="
                            mt-4
                            text-white
                            text-sm
                            opacity-90
                        "
                    >
                        Choose a partner type.
                    </p>

                </div>

                {/* Cards */}
                <div
                    className="
                        relative
                        z-10
                        flex-1
                        flex
                        flex-col
                        justify-center
                        gap-4
                        mt-20
                    "
                >
                    <SelectionCard
                        image={partnerImage}
                        title="Individual partner"
                        description="Create bookings, manage clients and earn."
                        background="#F5F5F5"
                        textColor="#081E19"
                        arrowBackground="#FFFFFF"
                        arrowColor="#081E19"
                        onClick={() =>
                            navigate(ROUTES.INDIVIDUAL_REGISTER)
                        }
                    />

                    <SelectionCard
                        image={fleetImage}
                        title="Enterprise partner"
                        description="Manage bookings for your organization with ease."
                        background="#081E19"
                        textColor="#FFFFFF"
                        arrowBackground="#FFFFFF"
                        arrowColor="#081E19"
                        onClick={() =>
                            navigate(ROUTES.ENTERPRISE_REGISTER)
                        }
                    />
                </div>

                {/* Footer */}
                <div
                    className="
                        relative
                        z-10
                        text-center
                        text-white
                        text-sm
                        pb-2
                    "
                >
                    Already registered?

                    <Link
                        to={ROUTES.LOGIN}
                        className="
                            ml-2
                            font-semibold
                            underline
                        "
                    >
                        Log In
                    </Link>

                </div>

            </div>

        </AuthContainer>

    );

};

export default PartnerTypeSelection;