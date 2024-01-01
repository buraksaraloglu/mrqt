import { NextResponse } from "next/server";
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: (req) =>
    !req.url.startsWith("/app") || !req.url.startsWith("/api"),
  afterAuth(auth, req, evt) {
    const userId = auth.userId;
    if (!userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    if (!userId && auth.isPublicRoute) {
      return NextResponse.next();
    }

    // If the user is logged in and trying to access a protected route, allow them to access route
    if (auth.userId && !auth.isPublicRoute) {
      return NextResponse.next();
    }
    // Allow users visiting public routes to access them
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
