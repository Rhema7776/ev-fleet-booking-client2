import { Navigate, Outlet } from "react-router-dom";

import { getAccessToken } from "@/services/tokenService";
import { ROUTES } from "@/constants/routes";

/**
 * This file existed but was completely empty (0 bytes) and was never
 * referenced anywhere in the router. In practice, that meant /dashboard
 * and /fleet had NO authentication guard at all — anyone could navigate
 * directly to those URLs without ever logging in, and the page shell
 * would render regardless (individual API calls would still fail
 * without a valid token, but the UI itself was fully reachable). Built
 * for real here, and actually wired into router.jsx.
 */
const ProtectedRoute = () => {
  const token = getAccessToken();

  if (!token) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
