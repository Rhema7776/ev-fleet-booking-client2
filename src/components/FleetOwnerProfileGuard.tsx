import { Navigate, Outlet } from "react-router-dom";

import { getCurrentUser } from "@/services/auth/authService";
import { ROUTES } from "@/constants/routes";

/**
 * Catches the actual root cause of "You need a fleet owner profile before
 * you can manage vehicles": role FLEET_OWNER and a real FleetOwner row are
 * two independent things in the schema, and nothing previously stopped an
 * account from having one without the other — whether from an incomplete
 * signup, a stale session, or a role changed by hand.
 *
 * Deliberately only blocks on hasFleetOwnerProfile === false (an explicit
 * "no" from the backend), not on it being undefined. A session created
 * before this field existed will have `undefined` here rather than a real
 * value; treating that the same as `false` would incorrectly bounce
 * already-complete fleet owners with an old cached session. Undefined
 * self-resolves the next time they log in fresh.
 *
 * Redirects to /auth/fleet/profile, which lives outside this guarded
 * /fleet tree — no loop risk from redirecting into a route this same
 * guard also wraps.
 */
const FleetOwnerProfileGuard = () => {
  const user = getCurrentUser();
  const needsProfile = user?.role === "FLEET_OWNER" && user.hasFleetOwnerProfile === false;

  if (needsProfile) {
    return <Navigate to={ROUTES.FLEET_PROFILE} replace />;
  }

  return <Outlet />;
};

export default FleetOwnerProfileGuard;
