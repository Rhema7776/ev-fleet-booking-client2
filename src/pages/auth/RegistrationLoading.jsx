import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import loadingCar1 from "@/assets/images/loadingCar1.svg";
import loadingCar2 from "@/assets/images/loadingCar2.svg";

export default function RegistrationLoading() {

    const navigate = useNavigate();
    const location = useLocation();

    const nextRoute =
        location.state?.redirectTo ?? "/auth/register";

    const [frame, setFrame] = useState(1);

    const [visible, setVisible] = useState(true);

    useEffect(() => {

        // show first image briefly
        const first = setTimeout(() => {

            setVisible(false);

        }, 450);

        // switch to second image
        const second = setTimeout(() => {

            setFrame(2);

            setVisible(true);

        }, 650);

        // fade out
        const third = setTimeout(() => {

            setVisible(false);

        }, 1700);

        // navigate
        const fourth = setTimeout(() => {

            navigate(nextRoute);

        }, 2000);

        return () => {

            clearTimeout(first);
            clearTimeout(second);
            clearTimeout(third);
            clearTimeout(fourth);

        };

    }, [navigate, nextRoute]);

    return (
        
        // <div className=" min-h-screen bg-white flex items-center justify-center">

        //     <img
        //         src={frame === 1 ? loadingCar1 : loadingCar2}
        //         alt="Loading"
        //         className={`
        //             w-full
                   
        //             transition-all
        //             duration-300
        //             ease-in-out
        //             ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        //         `}
        //     />

        // </div>



        <div
    className="
        relative
        min-h-dvh
        w-full
        bg-white
        overflow-hidden
        flex
        items-center
        justify-center
    "
>

    {/* Top overlay — hides the baked-in status bar art */}
    <div className="absolute top-0 left-0 right-0 h-11 bg-white z-10" />

    {/* Bottom overlay — hides the baked-in home indicator art */}
    <div className="absolute bottom-0 left-0 right-0 h-9 bg-white z-10" />

    <img
        src={frame === 1 ? loadingCar1 : loadingCar2}
        alt="Loading"
        className={`
            max-w-full
            max-h-full
            w-auto
            h-auto
            object-contain
            transition-all
            duration-300
            ease-in-out
            ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        `}
    />

</div>

    );

}