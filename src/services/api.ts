import axios, { type AxiosResponse } from "axios";

import { API } from "@/constants/api";

import { getAccessToken } from "./tokenService";

/**
 * Matches the backend's real response envelope exactly (see
 * ApiResponse.ts / errorHandler.ts on the API side):
 *   success responses: { success: true, message, data? }
 *   error responses:    { success: false, message, errors? }
 *
 * Real bug this fixes: the original authService.js destructured
 * `accessToken`, `refreshToken`, `user` directly off `response.data` —
 * but the backend nests the real payload one level deeper, under
 * `response.data.data`. Against the real backend, this silently pulled
 * `undefined` for every field. Not a TypeScript issue on its own, but
 * converting to TS is what surfaced it, since `response.data` was never
 * typed before.
 */
export interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: { path: string; message: string }[];
}

/**
 * Unwraps the envelope explicitly, rather than doing it silently inside
 * an axios interceptor. An interceptor that quietly rewrites
 * `response.data` would make every call site "just work" without any
 * visible sign of what happened — convenient until something breaks and
 * whoever's debugging can't find where the shape changed. Being explicit
 * here means every service function shows exactly where the unwrapping
 * happens.
 */
export function unwrap<T>(response: AxiosResponse<ApiEnvelope<T>>): {
  message: string;
  data: T;
} {
  return {
    message: response.data.message,
    data: response.data.data as T,
  };
}

const api = axios.create({
  baseURL: API.BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Read on every request rather than at module load, so a token saved after
// login is picked up without a reload. Login and register run before one
// exists; a missing token simply leaves the header off.
api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
