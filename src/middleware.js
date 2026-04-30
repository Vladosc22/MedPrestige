import { NextResponse } from "next/server";

function getRole(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload?.role ?? null;
  } catch {
    return null;
  }
}

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/doctor") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/login" && token) {
    const role = getRole(token);
    const dest = role === "admin" ? "/admin" : role === "doctor" ? "/doctor/dashboard" : "/dashboard";
    return NextResponse.redirect(new URL(dest, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/doctor/:path*", "/login"],
};
