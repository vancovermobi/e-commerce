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
      request.nextUrl.pathname.startsWith("/api/:path*") &&
      request.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }

    // if (
    //   request.nextUrl.pathname.startsWith("/categories") &&
    //   request.nextauth.token?.role !== "admin"
    // ) {
    //   return NextResponse.rewrite(new URL("/denied", request.url));
    // }
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
export const config = { 
  matcher: [
    "/products", 
    "/categories", 
    "/api/:path*"
  ] 
};


// import { NextRequest, NextResponse,  } from 'next/server'
// import { getToken } from 'next-auth/jwt';

// export default async function middleware(request: NextRequest, response: NextResponse) {

//   const path = request.nextUrl.pathname;  
//   console.log("path: ", path);
//   // If it's the root path, just render it
//   if (path === '/') {
//     return NextResponse.next();
//   }

//   const session = await getToken({
//     req: request,
//     secret: process.env.NEXTAUTH_SECRET,
//   });
//   console.log("getToken_session: ", session);
//   const isProtected = path.includes('/admin-dashboard') || path.includes('/profile-page');

//   if (!session && isProtected ) {
//     return NextResponse.redirect(new URL('/', request.url));
//   } 
  
// };

// export const config = { 
//   matcher: [
//     "/admin-dashboard", 
//     "/profile-page",
//     "/api/:path*"
//   ] 
// }


