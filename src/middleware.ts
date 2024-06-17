import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode, JwtPayload } from "jwt-decode";

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
            const payload = jwtDecode<JwtPayload & { _id: string; role: string }>(accessToken.value);
            if (payload.role === "doctor") {
                return NextResponse.redirect(new URL("/doctor", request.nextUrl));
            }
            if (payload.role === "patient") {
                return NextResponse.redirect(new URL("/patient", request.nextUrl));
            }
            if (payload.role === "admin") {
                return NextResponse.redirect(new URL("/admin", request.nextUrl));
            }
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
        console.log("Middleware: ", pathname, accessToken?.value);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"], // All routes except static files and /api
};
