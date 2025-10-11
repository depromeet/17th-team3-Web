import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

const AUTH_PAGES = ['/login'];
const PROTECTED_ROUTES = ['/', '/meetings'];

const middleware = (req: NextRequest) => {
  if (req.nextUrl.pathname === '/healthz') {
    return NextResponse.next();
  }

  const accessToken = req.cookies.get('accessToken')?.value;
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));

  if (isProtected && !accessToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (AUTH_PAGES.includes(pathname) && accessToken) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images|uploads|pdf|api).*)'],
};

export default middleware;
