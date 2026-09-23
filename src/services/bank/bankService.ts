import api, { unwrap } from "../api";
import { API } from "@/constants/api";

// Bank endpoints live at /api/banks on the backend — NOT under /api/v1/
// like everything else (confirmed from the backend's app.ts: bankRoutes is
// mounted as its own separate top-level route, outside the /api/v1 prefix).
// Since `api`'s configured baseURL already ends in /api/v1, these calls
// need the API root instead. Passing an absolute URL to axios makes it
// bypass the configured baseURL entirely, which is what this does.
const API_ROOT = API.BASE_URL.replace(/\/v1\/?$/, "");

export interface BankOption {
  value: string;
  label: string;
}

export interface ResolvedAccount {
  accountNumber: string;
  accountName: string;
  bankId: string;
}

/**
 * Was previously called via raw fetch("http://localhost:3000/api/banks/...")
 * directly inside FleetProfile.jsx — two real bugs, not style issues:
 *   1. Hardcoded localhost:3000 — works in local dev, breaks completely
 *      the moment this is deployed anywhere else.
 *   2. Read `data.banks`/`data.accountName` directly, but the backend
 *      wraps every response in { success, message, data }. Same envelope
 *      bug already fixed in authService.ts — this file just wasn't using
 *      the shared api client at all, so that fix never reached it.
 */
export const searchBanks = async (query: string): Promise<BankOption[]> => {
  if (!query.trim()) {
    return [];
  }

  const response = await api.get<{
    success: boolean;
    message: string;
    data: { banks: BankOption[] };
  }>(`${API_ROOT}/banks/search`, {
    params: { country: "NG", search: query },
  });

  return unwrap(response).data.banks;
};

export const resolveAccount = async (
  accountNumber: string,
  bankCode: string
): Promise<ResolvedAccount> => {
  const response = await api.get<{
    success: boolean;
    message: string;
    data: ResolvedAccount;
  }>(`${API_ROOT}/banks/resolve`, {
    params: { accountNumber, bankCode },
  });

  return unwrap(response).data;
};
