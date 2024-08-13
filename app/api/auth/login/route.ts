import { NextResponse } from "next/server";

import { generateAccessToken } from "@/lib/jwt/jwt";

import type { Credentials } from "@/types/AuthTypes";

async function POST(credentials: Credentials) {
  try {
    const accessToken = generateAccessToken({ email: credentials.email });
    NextResponse.next().cookies.set("accessToken", "accessToken");
    return NextResponse.json({ token: accessToken });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 401 });
  }
}

export { POST };
