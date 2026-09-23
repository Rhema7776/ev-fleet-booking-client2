// React Router
import { Navigate, createBrowserRouter } from "react-router-dom";

// Layouts
import AppLayout from "./components/layout/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import BookingLayout from "./features/booking/BookingLayout";
import CarTypeSelection from "./pages/booking/CarTypeSelection";
import EconomyVehicleSelection from "./pages/booking/economy/EconomyVehicleSelection";
import BookingMethodSelection from "./pages/booking/economy/BookingMethodSelection";
import StraightBookingDetails from "./pages/booking/economy/straight/StraightBookingDetails";
import StraightBookingReview from "./pages/booking/economy/straight/StraightBookingReview";
import BookingConfirmed from "./pages/booking/economy/straight/BookingConfirmed";
import WalletBalanceCheck from "./pages/booking/economy/reserve/WalletBalanceCheck";
import ReserveBookingDetails from "./pages/booking/economy/reserve/ReserveBookingDetails";
import ReserveBookingReview from "./pages/booking/economy/reserve/ReserveBookingReview";
import ReservationConfirmed from "./pages/booking/economy/reserve/ReservationConfirmed";
import LiveBookingTracking from "./pages/booking/LiveBookingTracking";
import DedicatedVehicleSelection from "./pages/booking/economy/dedicated/DedicatedVehicleSelection";
import DedicatedVehicleClaim from "./pages/booking/economy/dedicated/DedicatedVehicleClaim";
import DedicatedPaymentCallback from "./pages/booking/economy/dedicated/DedicatedPaymentCallback";
import DedicatedCommitment from "./pages/booking/economy/dedicated/DedicatedCommitment";
import DedicatedPaymentConfirm from "./pages/booking/economy/dedicated/DedicatedPaymentConfirm";
import VehicleClaimed from "./pages/booking/economy/dedicated/VehicleClaimed";
import DedicatedBookingDetails from "./pages/booking/economy/dedicated/DedicatedBookingDetails";
import DedicatedBookingReview from "./pages/booking/economy/dedicated/DedicatedBookingReview";
import DedicatedBookingConfirmed from "./pages/booking/economy/dedicated/DedicatedBookingConfirmed";

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

//Authentication_Fleet Transition
import FleetBusinessDetails from "./pages/auth/Fleet/FleetBusinessDetails";
import FleetOwnerRegistration from "./pages/auth/Register/FleetOwnerRegistration";
import FleetProfile from "./pages/auth/Fleet/FleetProfile";
import FleetSuccess from "./pages/auth/Fleet/FleetSuccess";
import FleetTransition from "./pages/auth/Fleet/FleetTransition";
import Trips from "./pages/fleet/Trips";
import Fleet from "./pages/fleet/Fleet";
import Earnings from "./pages/fleet/Earnings";
import More from "./pages/fleet/More";
import FleetDashboard from "./pages/fleet/Dashboard";
//Success
import IndividualRegistrationSuccess from "./pages/auth/Register/IndividualRegistrationSuccess";
import EnterpriseRegistrationSuccess from "./pages/auth/Register/EnterpriseRegistrationSuccess";
// Dashboard
import Home from "./pages/dashboard/Home";
import FleetOwners from "./pages/dashboard/FleetOwners";
import Rides from "./pages/dashboard/Rides";
import Bookings from "./pages/dashboard/Bookings";
import Agents from "./pages/dashboard/Agents";
import Settings from "./pages/dashboard/Settings";
import Wallet from "./pages/dashboard/Wallet";


// Shared
import NotFound from "./pages/NotFound";
import FleetLayout from "./layouts/FleetLayout";

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
            path: "registration-loading",
            element: <RegistrationLoading />,
        },
       
        {
            path: "register/fleet-transition",
            element: <FleetTransition />,
        },
        {
            path: "fleet/business",
            element: <FleetBusinessDetails />,
        },

        {
            path: "fleet/profile",
            element: <FleetProfile />,
        },
        {
            path: "fleet/success",
            element: <FleetSuccess />,
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
            path: "fleet/register",
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
    // Wraps both /fleet and /dashboard — previously neither had any
    // authentication guard at all (see ProtectedRoute.tsx for the full
    // story). No path of its own; just gates its children.
    element: <ProtectedRoute />,
    children: [
    {
    path: "/booking",
    element: <BookingLayout />,
    children: [
        {
            index: true,
            element: <CarTypeSelection />,
        },
        {
            path: "economy/vehicles",
            element: <EconomyVehicleSelection />,
        },
        {
            path: "economy/method",
            element: <BookingMethodSelection />,
        },
        {
            path: "economy/straight/details",
            element: <StraightBookingDetails />,
        },
        {
            path: "economy/straight/review",
            element: <StraightBookingReview />,
        },
        {
            path: "economy/straight/confirmed",
            element: <BookingConfirmed />,
        },
        {
            path: "economy/reserve/balance-check",
            element: <WalletBalanceCheck />,
        },
        {
            path: "economy/reserve/details",
            element: <ReserveBookingDetails />,
        },
        {
            path: "economy/reserve/review",
            element: <ReserveBookingReview />,
        },
        {
            path: "economy/reserve/confirmed",
            element: <ReservationConfirmed />,
        },
        {
            path: ":id/live",
            element: <LiveBookingTracking />,
        },
        {
            path: "economy/dedicated/vehicles",
            element: <DedicatedVehicleSelection />,
        },
        {
            path: "economy/dedicated/claim",
            element: <DedicatedVehicleClaim />,
        },
        {
            path: "economy/dedicated/commitment",
            element: <DedicatedCommitment />,
        },
        {
            path: "economy/dedicated/confirm-payment",
            element: <DedicatedPaymentConfirm />,
        },
        {
            path: "economy/dedicated/claimed",
            element: <VehicleClaimed />,
        },
        {
            path: "economy/dedicated/payment-callback",
            element: <DedicatedPaymentCallback />,
        },
        {
            path: "economy/dedicated/details",
            element: <DedicatedBookingDetails />,
        },
        {
            path: "economy/dedicated/review",
            element: <DedicatedBookingReview />,
        },
        {
            path: "economy/dedicated/confirmed",
            element: <DedicatedBookingConfirmed />,
        },
    ],
},
    {
    path: "/fleet",

    element: <FleetLayout />,

    children: [

        {
            index: true,
            element: <FleetDashboard />,
        },

        {
            path: "trips",
            element: <Trips />,
        },

        {
            path: "vehicles",
            element: <Fleet />,
        },

        {
            path: "earnings",
            element: <Earnings />,
        },

        {
            path: "more",
            element: <More />,
        },

    ],

},
    {
    path: "/dashboard",
    element: <AppLayout />,
    children: [
        {
            index: true,
            element: <Home />,
        },

        {
            path: "fleet-owners",
            element: <FleetOwners />,
        },

        {
            path: "vehicles",
            element: <Rides />,
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

        {
            path: "wallet",
            element: <Wallet />,
        },

    ],
},
    ],
},
{
    path: "*",
    element: <NotFound />,
},
]);

export default router;