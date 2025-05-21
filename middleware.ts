import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import type { Database } from "@/lib/supabase/database.types"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Check if the user is authenticated
  const isAuth = !!session
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth")

  // Important: Only protect provider dashboard routes, not public provider profiles
  const isProviderDashboardPage = req.nextUrl.pathname.startsWith("/provider/")

  // Public provider profiles should be accessible without login
  const isPublicProviderPage = req.nextUrl.pathname.startsWith("/providers/")

  // If the user is on an auth page and is already authenticated, redirect to dashboard
  if (isAuthPage && isAuth) {
    return NextResponse.redirect(new URL("/provider/dashboard", req.url))
  }

  // If the user is on a provider dashboard page and is not authenticated, redirect to login
  if (isProviderDashboardPage && !isAuth) {
    return NextResponse.redirect(new URL("/auth/login", req.url))
  }

  // Allow access to public provider profiles without authentication
  if (isPublicProviderPage) {
    return res
  }

  return res
}

export const config = {
  matcher: ["/auth/:path*", "/provider/:path*", "/providers/:path*"],
}