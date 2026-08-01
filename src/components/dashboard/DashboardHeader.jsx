import { Bell } from "lucide-react";

const DashboardHeader = () => {

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    const name =
        user.companyName ||
        user.fullName ||
        "Partner";

    return (

        <header
            className="
                px-5
                pt-6
                flex
                justify-between
                items-start
            "
        >

            <div className="flex gap-3">

                <div
                    className="
                        h-11
                        w-11
                        rounded-full
                        bg-gray-200
                    "
                />

                <div>

                    <p
                        className="
                            text-[11px]
                            text-gray-500
                        "
                    >
                        Good morning,
                    </p>

                    <h2
                        className="
                            font-bold
                            text-sm
                            leading-tight
                        "
                    >
                        {name}
                    </h2>

                </div>

            </div>

            <button
                className="
                    h-10
                    w-10
                    rounded-full
                    bg-white
                    shadow-sm
                    flex
                    items-center
                    justify-center
                "
            >

                <Bell
                    size={18}
                />

            </button>

        </header>

    );

};

export default DashboardHeader;