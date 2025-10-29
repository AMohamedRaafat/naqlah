import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // For PWA to work correctly, we need to allow service worker and manifest
  const pathname = request.nextUrl.pathname;

  // Allow service worker and manifest files to pass through
  if (pathname === '/sw.js' || pathname === '/manifest.json') {
    return NextResponse.next();
  }

  // Continue with normal request handling
  return NextResponse.next();
}

export const config = {
  // Matcher configuration - exclude static files and api routes
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - assets/* (public assets)
     * - sw.js (service worker)
     * - manifest.json (PWA manifest)
     */
    '/((?!_next/static|_next/image|favicon.ico|assets|sw.js|manifest.json).*)',
  ],
};
