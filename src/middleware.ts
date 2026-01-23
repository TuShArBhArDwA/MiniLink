import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const { pathname } = req.nextUrl;

    // Protected routes
    const protectedRoutes = ['/dashboard'];
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    // Auth routes (login, register)
    const authRoutes = ['/login', '/register'];
    const isAuthRoute = authRoutes.includes(pathname);

    // Redirect logged-in users away from auth pages
    if (isLoggedIn && isAuthRoute) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // Redirect non-logged-in users to login
    if (!isLoggedIn && isProtectedRoute) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|icons).*)'],
};
