import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authenticate } from "./utils/authenticate";

let locales = ["en", "uk"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    const locale = "uk";
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  const payload = authenticate(request);
  if (payload) {
    const { sub, ...usersData } = payload;
    const headers = new Headers(request.headers);
    headers.set("userData", JSON.stringify(usersData));

    return NextResponse.next({
      request: {
        headers,
      },
    });
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
