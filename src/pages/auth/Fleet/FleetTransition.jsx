// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import frame1 from "@/assets/images/fleet-transition/frame1.svg";
// import frame2 from "@/assets/images/fleet-transition/frame2.svg";
// import frame3 from "@/assets/images/fleet-transition/frame3.svg";
// import frame4 from "@/assets/images/fleet-transition/frame4.svg";

// import { ROUTES } from "@/constants/routes";

// const frames = [
//     frame1,
//     frame2,
//     frame3,
//     frame4,
// ];

// const FleetTransition = () => {

//     const navigate = useNavigate();

//     const [currentFrame, setCurrentFrame] = useState(0);

//     const [visible, setVisible] = useState(true);

//     useEffect(() => {

//         let index = 0;

//         const interval = setInterval(() => {

//             setVisible(false);

//             setTimeout(() => {

//                 index++;

//                 if (index >= frames.length) {

//                     clearInterval(interval);

//                     navigate(ROUTES.FLEET_BUSINESS);

//                     return;

//                 }

//                 setCurrentFrame(index);

//                 setVisible(true);

//             }, 150);

//         }, 450);

//         return () => clearInterval(interval);

//     }, [navigate]);

//     return (

//         <div className="min-h-screen bg-white flex items-center justify-center">

//             <img
//                 src={frames[currentFrame]}
//                 alt="Fleet Transition"
//                 className={`
//                     w-[300px]
//                     transition-all
//                     duration-300
//                     ease-in-out
//                     ${visible
//                         ? "opacity-100 scale-100"
//                         : "opacity-0 scale-95"}
//                 `}
//             />

//         </div>

//     );

// };

// export default FleetTransition;


import { useNavigate } from "react-router-dom";

import AuthContainer from "@/components/auth/AuthContainer";

import ActionButton from "@/components/ui/ActionButton";

import hero from "@/assets/images/fleet-transition/fleet-hero.svg";

import { ROUTES } from "@/constants/routes";

const FleetTransition = () => {

    const navigate = useNavigate();

    return (

        <AuthContainer>

            <div
                className="
                    min-h-screen
                    overflow-hidden
                    -mx-6
                    -my-8
                    px-6
                    py-8
                    flex
                    flex-col
                "
                style={{
                    background:
                        "linear-gradient(180deg,#45E76B 0%,#29D55A 100%)",
                }}
            >

                {/* Hero */}

                <div
                    className="
                        flex-1
                        flex
                        items-center
                        justify-center
                    "
                >

                    <img
                        src={hero}
                        alt="Fleet"
                        className="
                            w-full
                            max-w-[420px]
                            object-contain
                        "
                    />

                </div>

                {/* Content */}

                <div className="pb-6">

                    <h1
                        className="
                            text-white
                            font-black
                            leading-[0.95]
                        "
                        style={{
                            fontSize: "clamp(40px,7vw,56px)",
                        }}
                    >

                        Ready to

                        <br/>

                        Set Up

                        <br/>

                        Your Fleet?

                    </h1>

                    <p
                        className="
                            mt-5
                            text-white/90
                            text-[17px]
                            leading-7
                        "
                    >

                        Easily manage your vehicles,

                        bookings and earnings from one place.

                    </p>

                    <div className="mt-10 space-y-4">

                        <ActionButton
                            variant="green"
                            onClick={() =>
                                navigate(ROUTES.FLEET_BUSINESS)
                            }
                        >

                            Set Up My Fleet

                        </ActionButton>

                        <ActionButton
                            variant="light"
                            onClick={() =>
                                navigate(ROUTES.DASHBOARD)
                            }
                        >

                            I'll do this later

                        </ActionButton>

                    </div>

                </div>

            </div>

        </AuthContainer>

    );

};

export default FleetTransition;