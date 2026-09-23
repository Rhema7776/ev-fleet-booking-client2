export const ROUTES = {
  LOGIN: "/auth/login",
  FORGOT_PASSWORD: "/auth/forgot-password",
  VERIFY_EMAIL: "/auth/verify-email",
  VERIFY_OTP: "/auth/verify-otp",
  RESET_PASSWORD: "/auth/reset-password",
  REGISTRATION_LOADING: "/auth/registration-loading",
  REGISTER: "/auth/register",
  PARTNER_SELECTION: "/auth/register/partner",
  INDIVIDUAL_REGISTER: "/auth/register/individual",
  ENTERPRISE_REGISTER: "/auth/register/enterprise",
  ENTERPRISE_ADDRESS: "/auth/register/enterprise/address",
  ENTERPRISE_PROFILE: "/auth/register/enterprise/profile",
  CREATE_PASSWORD: "/auth/create-password",
  REGISTER_SUCCESS: "/auth/register/success",
  ENTERPRISE_SUCCESS: "/auth/register/enterprise/success",
  FLEET_TRANSITION: "/auth/register/fleet-transition",
  FLEET_BUSINESS: "/auth/fleet/business",
  FLEET_REGISTER: "/auth/fleet/register",
  FLEET_PROFILE: "/auth/fleet/profile",
  FLEET_SUCCESS: "/auth/fleet/success",
  DASHBOARD: "/dashboard",
  DASHBOARD_WALLET: "/dashboard/wallet",
  FLEET_DASHBOARD: "/fleet",
  // Was FLEET_BOOKINGS: "/fleet/bookings" — no route matching that path
  // was ever registered under FleetLayout (only trips/vehicles/earnings/
  // more are). BottomNavigation's "Bookings" tab linked here and would
  // have hit the NotFound catch-all on every click. The actually
  // registered route is "trips" (-> the Trips page), so this constant is
  // renamed to match reality rather than kept broken.
  FLEET_TRIPS: "/fleet/trips",
  FLEET_VEHICLES: "/fleet/vehicles",
  FLEET_EARNINGS: "/fleet/earnings",
  FLEET_MORE: "/fleet/more",
} as const;
