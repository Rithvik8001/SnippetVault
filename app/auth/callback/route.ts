// app/auth/callback/route.ts
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    // Create the URL object from the request
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");

    if (code) {
      const supabase = createRouteHandlerClient({ cookies });
      await supabase.auth.exchangeCodeForSession(code);
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // If no code, redirect to sign-in
    return NextResponse.redirect(new URL("/sign-in", request.url));
  } catch (error) {
    console.error("Auth callback error:", error);
    // Use request.url instead of requestUrl.origin
    return NextResponse.redirect(
      new URL("/sign-in?error=Authentication failed", request.url)
    );
  }
}
