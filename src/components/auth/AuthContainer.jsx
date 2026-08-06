import clsx from "clsx";

const variants = {
    white: "bg-white",

    success:
        "bg-gradient-to-b from-[#00A76F] via-[#015D46] to-[#001F18]",

    transparent: "bg-transparent",
};

// const AuthContainer = ({
//     children,
//     variant = "white",
//     className = "",
// }) => {

//     return (

//         <div
//             className="
                
//                 min-h-screen
//                 flex
//                 items-center
//                 justify-center
//                 px-5
//                 py-8
//             "
//         >

//             <div

//                 className={clsx(

//                     `
//                     w-full
//                     max-w-[430px]
//                     min-h-[900px]
//                     rounded-[42px]
//                     overflow-hidden
//                     shadow-2xl
//                     `,

//                     variants[variant],

//                     className

//                 )}

//             >

//                 {children}

//             </div>

//         </div>

//     );

// };

const AuthContainer = ({
    children,
    variant = "white",
    padded = true,
}) => {

    

    return (

        <div
            className="
                min-h-screen
                bg-white
                px-6
                py-8
                flex
                justify-center
            "
        >

            <div
                className="
                    w-full
                    max-w-[430px]
                    flex
                    flex-col
                "
            >

                {children}

            </div>

        </div>

        // <div className=" min-h-screen flex items-center justify-center p-6">

        //     <div
        //         className={""}
        //     >

        //         {
        //             padded ? (

        //                 <div className="px-6 py-8 h-full">
        //                     {children}
        //                 </div>

        //             ) : children
        //         }

        //     </div>

        // </div>

    );

};

export default AuthContainer;