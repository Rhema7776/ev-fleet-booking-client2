import { Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";

function Navbar() {

    return (

        <header className="bg-white h-20 border-b flex items-center justify-between px-8">

            <div>

                <h2 className="text-2xl font-bold">

                    Dashboard

                </h2>

            </div>

            <div className="flex items-center gap-6">

                <Bell className="cursor-pointer" />

                <Avatar>

                    <AvatarFallback>

                        RC

                    </AvatarFallback>

                </Avatar>

            </div>

        </header>

    );

}

export default Navbar;