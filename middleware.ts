// middleware.ts
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session if expired - required for Server Components
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Make sure you've defined all public routes
  const isPublicRoute = ["/", "/sign-in", "/sign-up"].includes(
    req.nextUrl.pathname
  );
  const isAuthCallback = req.nextUrl.pathname.startsWith("/auth/callback");

  // If no session and trying to access protected route
  if (!session && !isPublicRoute && !isAuthCallback) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // If session exists and trying to access auth routes
  if (
    session &&
    (req.nextUrl.pathname === "/sign-in" || req.nextUrl.pathname === "/sign-up")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
