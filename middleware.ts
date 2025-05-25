import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value || ""
  const isLoggedIn = !!token

  // Public paths that don't require authentication
  const isPublicPath =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/" ||
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/api")

  // Redirect to landing page if accessing protected route without authentication
  if (!isLoggedIn && !isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Redirect to dashboard if accessing login page while already authenticated
  if (isLoggedIn && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
