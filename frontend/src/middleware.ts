import { NextRequest, NextResponse } from "next/server";

/**
 * Protects authenticated routes (/welcome, /dashboard).
 * If the access_token cookie is missing, redirect to /login.
 */

const PROTECTED_PATHS = ["/welcome", "/dashboard"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("access_token")?.value;

  if (!accessToken) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/welcome/:path*", "/dashboard/:path*"],
};
