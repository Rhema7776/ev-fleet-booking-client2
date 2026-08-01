import { motion } from "framer-motion";
import { Check } from "lucide-react";

import AuthSuccessLayout from "./AuthSuccessLayout";

const CompanySuccess = ({
    logo,
    companyName,
    description,
    buttonText,
    redirectTo,
}) => {

    return (

        <AuthSuccessLayout
            buttonText={buttonText}
            redirectTo={redirectTo}
        >

            {/* Hero */}

            <motion.div

                initial={{
                    opacity: 0,
                    scale: .75,
                    y: 25,
                }}

                animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                }}

                transition={{
                    duration: .55,
                }}

                className="relative mb-14"

            >

                {/* White Ring */}

                <div
                    className="
                        w-44
                        h-44
                        rounded-full
                        bg-white/15
                        backdrop-blur-sm
                        flex
                        items-center
                        justify-center
                    "
                >

                    {/* Logo */}

                    <div
                        className="
                            w-36
                            h-36
                            rounded-full
                            bg-black
                            overflow-hidden
                            flex
                            items-center
                            justify-center
                            shadow-2xl
                        "
                    >

                        <img

                            src={logo}

                            alt={companyName}

                            className="
                                w-full
                                h-full
                                object-cover
                            "

                        />

                    </div>

                </div>

                {/* Verification Badge */}

                <motion.div

                    initial={{
                        scale: 0,
                        rotate: -30,
                    }}

                    animate={{
                        scale: 1,
                        rotate: 0,
                    }}

                    transition={{
                        delay: .45,
                        type: "spring",
                        stiffness: 260,
                    }}

                    className="
                        absolute
                        top-4
                        right-2
                        w-14
                        h-14
                        rounded-full
                        bg-[#D7FF45]
                        shadow-xl
                        flex
                        items-center
                        justify-center
                    "

                >

                    <Check

                        size={28}

                        strokeWidth={3}

                        className="text-[#06311E]"

                    />

                </motion.div>

            </motion.div>

            {/* Heading */}

            <motion.h1

                initial={{
                    opacity: 0,
                    y: 20,
                }}

                animate={{
                    opacity: 1,
                    y: 0,
                }}

                transition={{
                    delay: .35,
                }}

                className="
                    text-white
                    text-[52px]
                    leading-[0.9]
                    font-black
                    whitespace-pre-line
                    max-w-md
                "

            >

                {companyName}
                {"\n"}
                is now on
                {"\n"}
                LeaseHub!

            </motion.h1>

            {/* Description */}

            <motion.p

                initial={{
                    opacity: 0,
                }}

                animate={{
                    opacity: 1,
                }}

                transition={{
                    delay: .65,
                }}

                className="
                    text-white/85
                    text-lg
                    mt-8
                    max-w-sm
                    leading-7
                "

            >

                {description}

            </motion.p>

        </AuthSuccessLayout>

    );

};

export default CompanySuccess;