import { NextRequest, NextResponse } from "next/server";

/**
 * Protects authenticated routes.
 * - /welcome, /dashboard → redirect to /login if no access_token
 * - /admin/dashboard     → redirect to /admin if no access_token
 */

const USER_PROTECTED = ["/welcome", "/dashboard"];
const ADMIN_PROTECTED = ["/admin/dashboard"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("access_token")?.value;

  // Admin-protected routes → redirect to /admin (admin login)
  const isAdminProtected = ADMIN_PROTECTED.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

  if (isAdminProtected && !accessToken) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // User-protected routes → redirect to /login
  const isUserProtected = USER_PROTECTED.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

  if (isUserProtected && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/welcome/:path*",
    "/dashboard/:path*",
    "/admin/dashboard/:path*",
  ],
};
