import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

import ProgressBar from "@/components/onboarding/ProgressBar";
import OnboardingSlide from "@/components/onboarding/OnboardingSlide";
import onboardingData from "@/components/onboarding/OnboardingData";
import AuthFooter from "@/components/auth/AuthFooter";
import Button from "@/components/ui/button";
import carImage from "@/assets/images/Group 1.png";


const Onboarding = () => {

    const navigate = useNavigate();

    const [currentSlide, setCurrentSlide] = useState(0);

    const slide = onboardingData[currentSlide];
    

    useEffect(() => {

    const interval = setInterval(() => {

        setCurrentSlide((prev) =>
            (prev + 1) % onboardingData.length
        );

    }, 4000);

    return () => clearInterval(interval);

}, []);


    return (

        <main className="
            min-h-screen
            bg-white
            flex
            flex-col
            py-5
        ">
            <ProgressBar
                current={currentSlide}
                total={onboardingData.length}
            />

            <div className=" flex justify-center ">

                <img
                    src={carImage}
                    alt="Vehicle"
                    className="w-full max-w-[670px]"
                />

            </div>
            <div
                className="px-5"
            >
             <div key={currentSlide}
                className="flex-1 flex items-center justify-center transition-all duration-700"
             >

                <OnboardingSlide
                    headingPrimary={slide.headingPrimary}
                    headingSecondary={slide.headingSecondary}
                    description={slide.description}
                />

            </div>
            <div className="pb-4 space-y-6">

                <Button onClick={() => {
                    console.log("Going to:", ROUTES.REGISTRATION_LOADING);
                    navigate(ROUTES.REGISTRATION_LOADING);
                }}
                >
                    Get Started
                        
                </Button>



            </div>

            <AuthFooter
                text="Already registered?"
                linkText="Log in"
                to={ROUTES.LOGIN}
            />



        </div>
           

           

        </main>

    );

};


export default Onboarding;