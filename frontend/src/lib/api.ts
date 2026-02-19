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
    } else {
      // Try to extract the first field-level error
      const firstField = Object.values(data).find(
        (v) => Array.isArray(v) && typeof v[0] === "string",
      ) as string[] | undefined;
      if (firstField) {
        message = firstField[0];
      }
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

export interface AdminLoginPayload {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface CreateUserPayload {
  email: string;
  starts_at: string;
  expires_at: string;
}

export interface CreateUserResponse {
  detail: string;
  user: {
    id: number;
    email: string;
    username: string;
  };
  session: {
    code: string;
    starts_at: string;
    expires_at: string;
  };
  email_sent: boolean;
}

export const api = {
  auth: {
    login: (payload: LoginPayload) =>
      request("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
      }),

    logout: () =>
      request("/api/auth/logout", { method: "POST" }),

    me: () => request<User>("/api/auth/me"),
  },

  admin: {
    login: (payload: AdminLoginPayload) =>
      request("/api/auth/admin/login", {
        method: "POST",
        body: JSON.stringify(payload),
      }),

    createUser: (payload: CreateUserPayload) =>
      request<CreateUserResponse>("/api/admin/users", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
  },
};
