import api, { unwrap } from "../api";

import { API } from "@/constants/api";

import { STORAGE_KEYS } from "@/constants/storage";

import { saveTokens, clearTokens } from "../tokenService";

// Matches the backend's user shape returned on login/register/social-login.
export interface AuthUser {
  id: number;
  fullName: string;
  email: string;
  role: string;
  // Only meaningful when role === "FLEET_OWNER". Computed server-side on
  // every login (see authService.ts on the API side) so the frontend can
  // catch a role/profile mismatch immediately, rather than letting
  // someone reach /fleet/vehicles and hit a 403 on Add Vehicle.
  hasFleetOwnerProfile?: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterInput {
  fullName: string;
  email: string;
  phone: string;
  role: string;
}

interface AuthTokensResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

/**
 * Was logging the full credentials object (including the plaintext
 * password) to the browser console, plus the full login response
 * (including both tokens) and raw backend error bodies — the same class
 * of issue as the OTP-logging bug found on the backend. Removed here;
 * nothing about auth should ever hit console.log.
 */
export const login = async (credentials: LoginCredentials): Promise<AuthUser> => {
  const response = await api.post<{ success: boolean; message: string; data: AuthTokensResponse }>(
    API.ENDPOINTS.LOGIN,
    credentials
  );

  const { data } = unwrap(response);
  const { accessToken, refreshToken, user } = data;

  saveTokens({ accessToken, refreshToken });
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));

  return user;
};

export const registerUser = async (data: RegisterInput): Promise<{ email: string }> => {
  const response = await api.post<{
    success: boolean;
    message: string;
    data: { email: string };
  }>(API.ENDPOINTS.REGISTER, data);

  return unwrap(response).data;
};

export const verifyOTP = async (data: {
  email: string;
  code: string;
  purpose: string;
}): Promise<{ message: string }> => {
  const response = await api.post<{ success: boolean; message: string }>(
    API.ENDPOINTS.VERIFY_OTP,
    data
  );

  return { message: response.data.message };
};

export const createPassword = async (data: {
  email: string;
  password: string;
  confirmPassword: string;
}): Promise<{ message: string }> => {
  const response = await api.post<{ success: boolean; message: string }>(
    API.ENDPOINTS.CREATE_PASSWORD,
    data
  );

  return { message: response.data.message };
};

export interface CreateSelfFleetOwnerInput {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  rcNumber: string;
  address?: string;
  city?: string;
  state?: string;
}

// Calls POST /fleet-owners/me — this is the step that was entirely
// missing from the fleet-owner signup flow. Registering a User with
// role: FLEET_OWNER never created a matching FleetOwner row on its own;
// this is the call that actually creates it, matching how a real fleet
// owner is meant to complete their own signup (self-service, distinct
// from the ADMIN-only POST /fleet-owners).
export const createSelfFleetOwner = async (
  data: CreateSelfFleetOwnerInput
): Promise<{ message: string }> => {
  const response = await api.post<{ success: boolean; message: string }>(
    "/fleet-owners/me",
    data
  );

  return { message: response.data.message };
};

export const logout = (): void => {
  clearTokens();
  localStorage.removeItem(STORAGE_KEYS.USER);
};

export const getCurrentUser = (): AuthUser | null => {
  const user = localStorage.getItem(STORAGE_KEYS.USER);
  return user ? (JSON.parse(user) as AuthUser) : null;
};

/**
 * Patches the cached user object in place, without a fresh login.
 *
 * Needed because hasFleetOwnerProfile is only ever computed server-side
 * at login time — after a successful createSelfFleetOwner() call, the
 * cached user still says `false` until the next real login. Without this,
 * FleetOwnerProfileGuard reads the stale cache on the very next
 * navigation (e.g. clicking "Add Vehicle" on the success screen) and
 * bounces the user straight back to the profile screen they just
 * completed — a same-session loop that has nothing to do with whether
 * the backend actually has the profile by then.
 */
export const updateCachedUser = (patch: Partial<AuthUser>): void => {
  const user = getCurrentUser();
  if (!user) return;

  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify({ ...user, ...patch }));
};

export const forgotPassword = async (data: {
  email: string;
}): Promise<{ message: string; email?: string }> => {
  const response = await api.post<{
    success: boolean;
    message: string;
    data?: { email: string };
  }>(API.ENDPOINTS.FORGOT_PASSWORD, data);

  return { message: response.data.message, email: response.data.data?.email };
};

export const resetPassword = async (data: {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
}): Promise<{ message: string }> => {
  const response = await api.post<{ success: boolean; message: string }>(
    API.ENDPOINTS.RESET_PASSWORD,
    data
  );

  return { message: response.data.message };
};

interface SocialLoginResponse extends AuthTokensResponse {
  isNewUser: boolean;
}

export const socialLogin = async (data: {
  provider: "GOOGLE" | "FACEBOOK" | "APPLE";
  token: string;
  role?: string;
  fullName?: string;
}): Promise<{ user: AuthUser; isNewUser: boolean }> => {
  const response = await api.post<{
    success: boolean;
    message: string;
    data: SocialLoginResponse;
  }>(API.ENDPOINTS.SOCIAL_LOGIN, data);

  const { data: result } = unwrap(response);
  const { accessToken, refreshToken, user, isNewUser } = result;

  saveTokens({ accessToken, refreshToken });
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));

  return { user, isNewUser };
};
