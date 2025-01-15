// middleware.ts
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Array of public routes that don't require authentication
const publicRoutes = ["/", "/sign-up", "/sign-in"];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);

  // If there's no session and trying to access a protected route
  if (!session && !isPublicRoute) {
    // Redirect to sign-in page
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // If there's a session and trying to access auth routes (sign-in, sign-up)
  if (
    session &&
    (req.nextUrl.pathname === "/sign-in" || req.nextUrl.pathname === "/sign-up")
  ) {
    // Redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return res;
}

// Specify which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|ico)$).*)",
  ],
};
