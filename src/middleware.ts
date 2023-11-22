import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const targetDate = new Date("12.02.2023 19:00").getTime();
  const currentDate = new Date().getTime();

  if (targetDate > currentDate) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/api/auth/over", request.url));
  }
}

// Supports both a single string value or an array of matchers
export const config = {
  matcher: [
    // "/api/guest/:path*",
    // "/api/guest/[id]/rsvp/:path*",
    "/((?!api|static|.*\\..*|_next).*)",
  ],
};
