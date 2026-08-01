// React Router
import { Navigate, createBrowserRouter } from "react-router-dom";

// Layouts
import AppLayout from "./components/layout/AppLayout";
import AuthLayout from "./layouts/AuthLayout";

// Onboarding
import Splash from "./pages/onboarding/Splash";
import Onboarding from "./pages/onboarding/Onboarding";

// Authentication
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import OTPVerification from "./pages/auth/OTPVerification";
import ResetPassword from "./pages/auth/ResetPassword";
import RegistrationLoading from "@/pages/auth/RegistrationLoading";
import PartnerTypeSelection from "./pages/auth/Register/PartnerTypeSelection";
import IndividualPartnerRegistration from "./pages/auth/Register/IndividualPartnerRegistration";
import EnterprisePartnerRegistration from "./pages/auth/Register/EnterprisePartnerRegistration";
import EnterpriseAddress from "./pages/auth/Register/EnterpriseAddress";
import CompleteEnterpriseProfile from "./pages/auth/Register/CompleteEnterpriseProfile";

import CreatePassword from "./pages/auth/CreatePassword";
import RegistrationType from "./pages/auth/Register/RegistrationType.jsx"
//Success
import IndividualRegistrationSuccess from "./pages/auth/Register/IndividualRegistrationSuccess";
import EnterpriseRegistrationSuccess from "./pages/auth/Register/EnterpriseRegistrationSuccess";
import SuccessScreen from "./pages/auth/SuccessScreen";
import FleetOwnerRegistration from "./pages/auth/Register/FleetOwnerRegistration";
// Dashboard
import Dashboard from "./pages/dashboard/Dashboard";
import FleetOwners from "./pages/dashboard/FleetOwners";
import Vehicles from "./pages/dashboard/Vehicles";
import Bookings from "./pages/dashboard/Bookings";
import Agents from "./pages/dashboard/Agents";
import Settings from "./pages/dashboard/Settings";

// Shared
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([

    {
    path: "/",
    element: <Splash />,
    },

    
    {
        path: "/onboarding",
        element: <Onboarding />,
    },
    {
    path: "/auth",
    element: <AuthLayout />,
    
    children: [
        {
            index: true,
            element: <Navigate to="login" replace />,
        },
        
        {
            path: "login",
            element: <Login />,
        },
        {
            path: "forgot-password",
            element: <ForgotPassword />,
        },
        {
            path: "verify-email",
            element: <OTPVerification />,
        },
        {
            path: "reset-password",
            element: <ResetPassword />,
        },
        {
            path: "success",
            element: <SuccessScreen />,
        },
        {
            path: "registration-loading",
            element: <RegistrationLoading />,
        },
        {
            path: "register",
            element: <RegistrationType />,
        },
        {
            path: "register/partner",
            element: <PartnerTypeSelection />,
        },

        {
            path: "register/individual",
            element: <IndividualPartnerRegistration />,
        },

        {   path: "register/enterprise",
            element: <EnterprisePartnerRegistration />,
        },
        {
            path: "register/fleet-owner",
            element: <FleetOwnerRegistration />,
        },
        {
            path: "register/enterprise/address",
            element: <EnterpriseAddress />,
        },
        {
            path: "create-password",
            element: <CreatePassword />,
        },
        {
            path: "register/enterprise/profile",
            element: <CompleteEnterpriseProfile />,
        },
        
        {
            path: "register/success",
            element: <IndividualRegistrationSuccess />,
        },
        {
            path: "register/enterprise/success",
            element: <EnterpriseRegistrationSuccess />,
        },

    ],
    },
    
    {
    path: "/dashboard",
    element: <AppLayout />,
    children: [
        {
            index: true,
            element: <Dashboard />,
        },

        {
            path: "fleet-owners",
            element: <FleetOwners />,
        },

        {
            path: "vehicles",
            element: <Vehicles />,
        },

        {
            path: "bookings",
            element: <Bookings />,
        },

        {
            path: "agents",
            element: <Agents />,
        },

        {
            path: "settings",
            element: <Settings />,
        },

    ],
},
{
    path: "*",
    element: <NotFound />,
},
]);

export default router;