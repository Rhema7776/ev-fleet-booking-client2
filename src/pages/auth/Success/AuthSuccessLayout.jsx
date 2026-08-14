import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Button from "@/components/ui/Button";

const AuthSuccessLayout = ({
    children,
    buttonText,
    redirectTo,
}) => {

    const navigate = useNavigate();

    return (

        <motion.main

            initial={{
                opacity: 0,
            }}

            animate={{
                opacity: 1,
            }}

            transition={{
                duration: .4,
            }}

            className="
                relative
                isolate
                overflow-hidden
                min-h-screen
                flex
                flex-col
                items-center
                justify-between
                text-center
                px-8
                py-16
            "

        >
            {/* Animated Background */}

            <motion.div
                className="absolute inset-0 -z-20"
                initial={{
                    backgroundImage:
                        "linear-gradient(180deg,#33D05A 0%,#0E7A46 48%,#021813 100%)",
                }}
                animate={{
                    backgroundImage: [
                        "linear-gradient(180deg,#33D05A 0%,#0E7A46 48%,#021813 100%)",
                        "linear-gradient(180deg,#30C254 0%,#0A5D38 30%,#01120E 100%)",
                        // "linear-gradient(180deg,#33D05A 0%,#0E7A46 48%,#021813 100%)",
                    ],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Floating Gradient Orb */}

            <motion.div

                className="
                    absolute
                    -top-40
                    -left-20
                    w-[420px]
                    h-[420px]
                    rounded-full
                    bg-white/10
                    blur-[120px]
                    -z-10
                "

                animate={{

                    x: [0, 50, -20, 0],

                    y: [0, 30, 10, 0],

                }}

                transition={{

                    duration: 12,

                    repeat: Infinity,

                    ease: "easeInOut",

                }}

            />

            {/* Another Orb */}

            <motion.div

                className="
                    absolute
                    bottom-0
                    right-0
                    w-[320px]
                    h-[320px]
                    rounded-full
                    bg-lime-300/10
                    blur-[100px]
                    -z-10
                "

                animate={{

                    x: [0, -30, 15, 0],

                    y: [0, -20, 10, 0],

                }}

                transition={{

                    duration: 10,

                    repeat: Infinity,

                    ease: "easeInOut",

                }}

            />

            {/* Content */}

            <motion.div

                initial={{
                    opacity: 0,
                    y: 35,
                }}

                animate={{
                    opacity: 1,
                    y: 0,
                }}

                transition={{
                    duration: .6,
                }}

                className="
                    flex
                    flex-col
                    items-center
                    mt-auto
                "

            >

                {children}

            </motion.div>

            {/* Button */}

            <motion.div

                initial={{
                    opacity: 0,
                    y: 30,
                }}

                animate={{
                    opacity: 1,
                    y: 0,
                }}

                transition={{
                    delay: .8,
                }}

                className="
                    w-full
                    mt-auto
                "

            >

                <Button

                    variant="outline"

                    className="
                        bg-white
                        text-black
                        hover:scale-[1.02]
                        transition-all
                    "

                    onClick={() => navigate(redirectTo)}

                >

                    {buttonText}

                </Button>

            </motion.div>

        </motion.main>

    );

};

export default AuthSuccessLayout;