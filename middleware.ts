import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Check if the user is authenticated by calling your backend
  let isAuthenticated = false;
  
  try {
    // Check for session cookies first (faster check)
    const hasSessionCookie = request.cookies.has('session') || 
                            request.cookies.has('auth-token') || 
                            request.cookies.has('connect.sid');
    
    if (hasSessionCookie) {
      // Verify with backend if cookie exists
      const userProfileUrl = process.env.NEXT_PUBLIC_USER_PROFILE_URL;
      if (userProfileUrl) {
        const response = await fetch(userProfileUrl, {
          headers: {
            'Cookie': request.headers.get('cookie') || '',
          },
        });
        isAuthenticated = response.ok;
      }
    }
  } catch (error) {
    console.error('Auth check failed:', error);
    isAuthenticated = false;
  }
  
  // Protected routes
  const protectedPaths = ['/dashboard'];
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  // If trying to access a protected route without authentication
  if (isProtectedPath && !isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If authenticated and trying to access the sign-in page, redirect to dashboard
  if (request.nextUrl.pathname === '/' && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};