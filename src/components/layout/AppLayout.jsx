import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function AppLayout() {
    return (
        <div className=" bg-gray-700 px-5 pt-6 pb-8">

            {/* <Navbar /> */}

            <main className="mx-auto w-full max-w-md min-h-[calc(100vh-64px)] bg-[#F8F9FA] overflow-x-hidden">

                <Outlet />

            </main>

        </div>
    );
}

export default AppLayout;