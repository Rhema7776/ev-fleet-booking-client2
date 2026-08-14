import { MapPin } from "lucide-react";

const VehicleCard = ({ vehicle }) => {

    return (

        <div
            className="
                bg-white
                rounded-3xl
                overflow-hidden
                shadow-sm
            "
        >

            <img

                src={vehicle.image}

                alt={vehicle.name}

                className="
                    w-full
                    h-40
                    object-cover
                "

            />

            <div className="p-5">

                <h3
                    className="
                        font-bold
                        text-lg
                    "
                >

                    {vehicle.name}

                </h3>

                <div
                    className="
                        flex
                        items-center
                        gap-2
                        mt-2
                        text-gray-500
                        text-sm
                    "
                >

                    <MapPin size={15} />

                    {vehicle.location}

                </div>

                <div
                    className="
                        flex
                        justify-between
                        items-center
                        mt-5
                    "
                >

                    <span
                        className="
                            font-black
                            text-brand-primary
                            text-lg
                        "
                    >

                        ₦{vehicle.price}

                    </span>

                    <button
                        className="
                            bg-brand-primary
                            text-white
                            rounded-full
                            px-5
                            h-10
                        "
                    >

                        Details

                    </button>

                </div>

            </div>

        </div>

    );

};

export default VehicleCard;