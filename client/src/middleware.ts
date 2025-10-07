import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Public routes that don't require authentication
const PUBLIC_ROUTES = ['/'];

// Auth-related API routes (these should always be accessible)
const AUTH_API_ROUTES = ['/api/v1/auth'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow all API auth routes
  if (AUTH_API_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Allow public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    // If user is already authenticated, redirect away from login page
    // We'll handle this on the client side in page.tsx since we can't access localStorage from middleware
    return NextResponse.next();
  }

  // For protected routes, we'll rely on client-side auth checking
  // since Zustand uses localStorage which isn't accessible in middleware
  // The actual protection will happen via the client-side redirect in each protected page
  return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ]
};
