/**
 * Lightweight API client for communicating with the Django backend.
 * Uses the Next.js rewrite (/api/* → localhost:8000/api/*) so
 * cookies are sent on the same origin automatically.
 */

export class ApiError extends Error {
  status: number;
  data: Record<string, unknown>;

  constructor(status: number, data: Record<string, unknown>) {
    // DRF returns errors in different shapes:
    //   { "detail": "..." }                      — permission / throttle errors
    //   { "non_field_errors": ["..."] }           — serializer validation errors
    //   { "field_name": ["..."] }                 — field-level errors
    let message = "Une erreur est survenue.";

    if (typeof data.detail === "string") {
      message = data.detail;
    } else if (
      Array.isArray(data.non_field_errors) &&
      typeof data.non_field_errors[0] === "string"
    ) {
      message = data.non_field_errors[0];
    }

    super(message);
    this.status = status;
    this.data = data;
  }
}

async function request<T = unknown>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(path, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  // 204 No Content
  if (res.status === 204) return undefined as T;

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(res.status, data);
  }

  return data as T;
}

// ------------------------------------------------------------------
// Auth endpoints
// ------------------------------------------------------------------

export interface LoginPayload {
  email: string;
  code: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export const api = {
  auth: {
    login: (payload: LoginPayload) =>
      request("/api/auth/login/", {
        method: "POST",
        body: JSON.stringify(payload),
      }),

    logout: () =>
      request("/api/auth/logout/", { method: "POST" }),

    me: () => request<User>("/api/auth/me/"),
  },
};
