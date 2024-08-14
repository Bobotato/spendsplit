import { generateAccessToken } from "@/lib/jwt/jwt";
import { cookies } from "next/headers";

import { NextRequest, NextResponse } from "next/server";

async function POST(request: NextRequest) {
  try {
    const res = await request.json();
    if (!res.email && !res.password) {
      return NextResponse.json(
        { error: "No credentials were supplied." },
        { status: 401 }
      );
    }
    if (!res.email) {
      return NextResponse.json(
        { error: "No email was supplied." },
        { status: 401 }
      );
    }
    if (!res.password) {
      return NextResponse.json(
        { error: "No password was supplied." },
        { status: 401 }
      );
    }

    const accessToken = generateAccessToken({ email: res.email });
    if (accessToken) {
      cookies().set("access_token", accessToken);
    }
    return NextResponse.json({ access_token: accessToken });
  } catch (e) {
    if (e instanceof SyntaxError) {
      return NextResponse.json(
        { error: "No credentials were supplied." },
        { status: 401 }
      );
    }
    console.log(e)
    return NextResponse.json(
      { error: "An error occured, please try again later." },
      { status: 500 }
    );
  }
}

export { POST };
