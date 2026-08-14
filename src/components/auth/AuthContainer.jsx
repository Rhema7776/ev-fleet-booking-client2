import clsx from "clsx";

const variants = {
    white: "bg-white",

    success:
        "bg-gradient-to-b from-[#00A76F] via-[#015D46] to-[#001F18]",

    transparent: "bg-transparent",
};

const AuthContainer = ({
    children,
    variant = "white",
   
}) => {

    

    return (

        <div
            className="
                min-h-screen
                flex
                flex-col
                bg-white
                py-2
                px-5
                m-0
                
            "
        >

            <div
                className="
                    w-full
                    flex-1
                    p-0
                    m-0
                
                "
            >

                {children}

            </div>

        </div>



    );

};

export default AuthContainer;