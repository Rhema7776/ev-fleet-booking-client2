import {
    Plus,
} from "lucide-react";

import walletCar from "@/assets/images/wallet-car.svg";

const WalletCard = () => {

    return (

        <section
            className="
                relative
                overflow-hidden
                rounded-[22px]
                bg-[#0B231A]
                px-5
                py-5
                text-white
            "
        >

            <button
                className="
                    absolute
                    top-4
                    right-4
                    h-9
                    w-9
                    rounded-full
                    bg-white
                    text-black
                    flex
                    items-center
                    justify-center
                "
            >

                <Plus
                    size={18}
                />

            </button>

            <p
                className="
                    text-[11px]
                    opacity-80
                "
            >
                Your lease hour balance
            </p>

            <h1
                className="
                    text-4xl
                    font-black
                    mt-1
                "
            >
                ₦0.00
            </h1>

            <button
                className="
                    mt-6
                    h-12
                    w-full
                    rounded-full
                    bg-white
                    text-black
                    font-semibold
                "
            >
                New booking request
            </button>

            <img
                src={walletCar}
                alt=""
                className="
                    absolute
                    right-0
                    bottom-0
                    w-36
                    pointer-events-none
                "
            />

        </section>

    );

};

export default WalletCard;