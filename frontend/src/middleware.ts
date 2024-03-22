import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { serialize } from "cookie";
import { authenticate } from "./utils/authenticate";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const payload = authenticate(request);
  if (payload) {
    const { sub, ...usersData } = payload;
    const headers = new Headers(request.headers);
    headers.set("userData", JSON.stringify(usersData));
    headers.set(
      "Set-Cookie",
      serialize("cookieName", "cookieValue", {
        httpOnly: true,
        maxAge: 3600, // in seconds
        path: "/", // cookie path
        sameSite: "lax", // optional
        // other options...
      })
    );
    return NextResponse.next({
      request: {
        headers,
      },
    });
  }

  
  return NextResponse.redirect(new URL("/signin", request.url));
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
    "/((?!api|_next/static|_next/image|favicon.ico|signin|signup).*)",
  ],
};
