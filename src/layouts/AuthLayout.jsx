import { Outlet } from "react-router-dom";

const AuthLayout = () => {

    return (

        <div
            className="
                min-h-screen
                flex
                items-center
                justify-center
                p-8
            "
        >

            <Outlet />

        </div>

    );

};

export default AuthLayout;