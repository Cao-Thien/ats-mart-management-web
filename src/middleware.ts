// @ts-ignore
import { NextRequest } from 'next/server';
import { AuthCookieKey } from 'utils/cookiesData/cookiesUtil';

export function middleware(request: NextRequest) {
  if (
    !request.nextUrl.pathname.startsWith('/occupancy-monitor') &&
    !request.nextUrl.pathname.startsWith('/payment-result')
  ) {
    const currentToken = request.cookies.get(AuthCookieKey.AccessToken)?.value;

    if (!currentToken && !request.nextUrl.pathname.startsWith('/login')) {
      return Response.redirect(new URL('/login', request.url));
    }

    if (currentToken && !request.nextUrl.pathname.startsWith('/')) {
      return Response.redirect(new URL('/', request.url));
    }

    if (currentToken && request.nextUrl.pathname.startsWith('/login')) {
      return Response.redirect(new URL('/', request.url));
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)', '/'],
};
