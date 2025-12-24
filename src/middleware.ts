import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const authRoutes = ['/login', '/register', '/forgot-password', '/verify-otp', '/reset-password'];
const publicRoutes = ['/', '/login', '/category', '/category/add', '/product', '/order'];

const intlMiddleWare = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameWithoutLocale = '/' + pathname.split('/').slice(2).join('/') || '/';

  // Get token
  let token;
  try {
    token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  } catch (error) {
    console.log('Error getting token:', error);
    token = null;
  }

  // ✅ Check if token exists and is expired
  let isTokenExpired = false;
  let hasValidToken = false;

  if (token?.exp) {
    const exp = Number(token.exp);
    const now = Math.floor(Date.now() / 1000);

    if (!isNaN(exp)) {
      isTokenExpired = now > exp;
      hasValidToken = !isTokenExpired;
    }
  }

  // ✅ If no token or token expired, clear cookies and redirect for protected routes
  if (!token || isTokenExpired) {
    // إذا كان في auth route أو public route، خليه يكمل
    if (
      authRoutes.includes(pathnameWithoutLocale) ||
      publicRoutes.includes(pathnameWithoutLocale) ||
      pathnameWithoutLocale.startsWith('/products/')
    ) {
      const response = intlMiddleWare(request);

      // لو في token منتهي، امسحه
      if (token && isTokenExpired) {
        const cookiesToClear = [
          'next-auth.session-token',
          '__Secure-next-auth.session-token',
          'next-auth.callback-url',
          'next-auth.csrf-token',
          '__Host-next-auth.csrf-token',
        ];

        cookiesToClear.forEach((cookieName) => {
          response.cookies.set(cookieName, '', {
            maxAge: 0,
            path: '/',
          });
        });
      }

      return response;
    }

    // protected route بدون token أو token منتهي
    const locale = pathname.split('/')[1] || 'ar';
    const redirectResponse = NextResponse.redirect(
      new URL(`/${locale}/login?expired=true`, request.nextUrl.origin)
    );

    // Clear all NextAuth cookies
    const cookiesToClear = [
      'next-auth.session-token',
      '__Secure-next-auth.session-token',
      'next-auth.callback-url',
      'next-auth.csrf-token',
      '__Host-next-auth.csrf-token',
    ];

    cookiesToClear.forEach((cookieName) => {
      redirectResponse.cookies.set(cookieName, '', {
        maxAge: 0,
        path: '/',
      });
    });

    return redirectResponse;
  }

  // Run locale middleware
  const response = intlMiddleWare(request);

  // 1- Auth routes: redirect authenticated users to home
  if (authRoutes.includes(pathnameWithoutLocale)) {
    if (hasValidToken) {
      const locale = pathname.split('/')[1] || 'ar';
      return NextResponse.redirect(new URL(`/${locale}`, request.nextUrl.origin));
    }
    return response;
  }

  // 2- Public routes: allow access
  if (
    publicRoutes.includes(pathnameWithoutLocale) ||
    pathnameWithoutLocale.startsWith('/products/')
  ) {
    return response;
  }

  // 3- Protected routes with valid token
  return response;
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
