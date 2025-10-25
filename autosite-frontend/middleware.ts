import { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware({
  locales: ['en', 'ro', 'de', 'fr', 'it', 'es', 'pl', 'hu'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});

export default function middleware(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(ro|de|fr|it|es|pl|hu)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
