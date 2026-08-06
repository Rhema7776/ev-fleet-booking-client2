import { Search } from "lucide-react";

const FleetSearch = () => {

    return (

        <div className="mt-8">

            <div
                className="
                    bg-white
                    h-14
                    rounded-2xl
                    px-5
                    flex
                    items-center
                    gap-3
                "
            >

                <Search
                    size={20}
                    className="text-gray-400"
                />

                <input

                    type="text"

                    placeholder="Search your fleet"

                    className="
                        flex-1
                        outline-none
                        bg-transparent
                        text-sm
                    "

                />

            </div>

        </div>

    );

};

export default FleetSearch;