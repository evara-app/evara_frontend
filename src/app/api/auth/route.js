import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const cookieOptions = {
  maxAge: 1000 * 60 * 60 * 6,
  httpOnly: false,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "development" ? false : true,
  domain: process.env.NODE_ENV === "development" ? "localhost" : "evara.com.tr",
  path: "/",
};

export async function POST(req) {
  const message = await req.json();

  const refreshToken = message.refresh;
  const accessToken = message.access;

  cookies().set("refresh", refreshToken, cookieOptions);
  cookies().set("access", accessToken, cookieOptions);
  return NextResponse.json({ token: true });
}
