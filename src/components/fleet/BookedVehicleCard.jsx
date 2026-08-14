const BookedVehicleCard = ({ vehicle }) => {

    return (

        <div
            className="
                bg-[#06251B]
                rounded-3xl
                p-5
                text-white
            "
        >

            <h3
                className="
                    text-lg
                    font-bold
                "
            >

                {vehicle.name}

            </h3>

            <p
                className="
                    text-white/70
                    mt-2
                "
            >

                Booked until

            </p>

            <h2
                className="
                    mt-2
                    text-2xl
                    font-black
                "
            >

                {vehicle.date}

            </h2>

        </div>

    );

};

export default BookedVehicleCard;