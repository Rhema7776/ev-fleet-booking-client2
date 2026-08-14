const AuthProgressBar = ({ current, total = 4 }) => {

    const percentage = Math.min(
        100,
        Math.max(0, ((current + 1) / total) * 100)
    );

    return (
        <div
            className="
                w-full
                h-1.5
                rounded-full
                bg-gray-100
                overflow-hidden
            "
        >
            <div
                className="
                    h-full
                    rounded-full
                    bg-brand-primary
                    transition-all
                    duration-500
                "
                style={{ width: `${percentage}%` }}
            />
        </div>
    );
};

export default AuthProgressBar;

// const AuthProgressBar = ({ current, total = 4 }) => {

//     return (

//         <div
//             className="
//                 flex
//                 w-full
//                 h-1.5
//                 overflow-hidden
//                 rounded-full
//                 bg-gray-100
//             "
//         >

//             {Array.from({ length: total }).map((_, index) => (

//                 <div
//                     key={index}
//                     className={`
//                         flex-1
//                         transition-all
//                         duration-500

//                         ${
//                             index <= current
//                                 ? "bg-brand-primary"
//                                 : "bg-gray-200"
//                         }

//                         ${
//                             index !== total - 1
//                                 ? "border-r border-white"
//                                 : ""
//                         }
//                     `}
//                 />

//             ))}

//         </div>

//     );

// };

// export default AuthProgressBar;