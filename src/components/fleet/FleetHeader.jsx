import { Bell } from "lucide-react";
import { getCurrentUser } from "@/services/auth/authService";

const FleetHeader = () => {

    const user = getCurrentUser();

    const companyName =
        user?.companyName ||
        "Fleet Owner";

    return (

        <div
            className="
                flex
                justify-between
                items-start
            "
        >

            <div>

                <p
                    className="
                        text-[#6E6E73]
                        text-sm
                    "
                >

                    Welcome,

                </p>

                <h1
                    className="
                        text-[30px]
                        font-black
                        leading-tight
                    "
                >

                    {companyName}

                </h1>

            </div>

            <button
                className="
                    h-12
                    w-12
                    rounded-full
                    bg-white
                    shadow-sm
                    flex
                    items-center
                    justify-center
                "
            >

                <Bell size={20} />

            </button>

        </div>

    );

};

export default FleetHeader;