// Without a defined matcher, this one line applies next-auth
// to the entire project
// export { default } from "next-auth/middleware"

// ===withAuth===== //
// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request) {
    //console.log("nextUrl:", request.nextUrl.pathname);
    //console.log("nextauth-token:", request.nextauth.token);

    if (
      request.nextUrl.pathname.startsWith("/extra") &&
      request.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }

    if (
      request.nextUrl.pathname.startsWith("/client") &&
      request.nextauth.token?.role !== "admin" &&
      request.nextauth.token?.role !== "manager"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }
  },
  {
    callbacks: {
    //   authorized: ({ token }) => token?.role === "admin",
      authorized: ({ token }) => !!token
    },
  }
);

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
// Just only Admin access matcher: extra, dashboard
// Chỉ có Quản trị Website có quyền truy cập trang quản trị
export const config = { matcher: ["/server", "/client", "/dashboard"] };

// ConsoleLog:

// nextUrl: /extra

// nextauth-token: {
//   name: 'Dave',
//   sub: '42',
//   role: 'admin',
//   iat: 1689480424,
//   exp: 1692072424,
//   jti: 'f70a48f6-05b0-4497-b4ad-09a019985560'
// }
