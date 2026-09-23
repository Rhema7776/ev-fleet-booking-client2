export const API = {
  // Vite inlines this at build time, so it comes from --build-arg, not from
  // the runtime environment. The fallback only serves `yarn dev`: the
  // Docker build refuses to run without VITE_API_BASE_URL set.
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1",

  ENDPOINTS: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    REFRESH_TOKEN: "/auth/refresh",
    FORGOT_PASSWORD: "/auth/forgot-password",
    VERIFY_OTP: "/auth/verify-otp",
    RESET_PASSWORD: "/auth/reset-password",
    CREATE_PASSWORD: "/auth/create-password",
    SOCIAL_LOGIN: "/auth/social-login",
  },
} as const;
