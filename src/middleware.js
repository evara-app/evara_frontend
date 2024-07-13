import { NextResponse } from "next/server";
import middlewareAuth from "./utils/middlewareAut";

export async function middleware(req) {
  const url = req.url;
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/profile")) {
    const user = await middlewareAuth(req.cookies.get("access")?.value);
    if (!user) return NextResponse.redirect(new URL("/auth", url));
  }
}

export const config = {
  matcher: ["/profile/:path*"],
};
