import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const publicRoutes = ["/", "/login", "/signup"];

    const pathname = request.nextUrl.pathname;
    const accessToken = request.cookies.get("access-token");

    if (publicRoutes.includes(pathname)) {
        // Redirect to home if user tries to access login/signup page while logged in
        if (pathname === "/") {
            return NextResponse.next();
        }

        // Redirect to home if user is already logged in
        if (accessToken) {
            return NextResponse.redirect(new URL("/", request.nextUrl));
        }
    } else {
        // Redirect to login if user is not logged in
        if (!accessToken) {
            return NextResponse.redirect(new URL("/login", request.nextUrl));
        }
    }

    // Log middleware details in development
    if (process.env.NODE_ENV === "development") {
        console.log("Middleware: ", pathname, accessToken);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"], // All routes except static files and /api
};
