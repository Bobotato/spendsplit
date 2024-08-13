import { NextRequest, NextResponse } from "next/server";

import { decryptAccessToken } from "@/lib/jwt/jwt";

async function POST(request: Request) {
  try {
    const res = await request.json();
    if (res.access_token) {
      decryptAccessToken(res.access_token);
    } else {
      return NextResponse.json(
        { error: "No token was supplied." },
        { status: 401 }
      );
    }
  } catch (e) {
    return NextResponse.json({ error: "Broken" }, { status: 401 });
  }
}

export { POST };
