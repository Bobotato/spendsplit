import { generateAccessToken } from "@/lib/jwt/jwt";
import { cookies } from "next/headers";

import { NextRequest, NextResponse } from "next/server";

import { getUser } from "@/services/auth/auth";

import { comparePasswords } from "@/lib/auth/auth";

import { UserNotFoundError } from "@/services/errors";

async function POST(request: NextRequest) {
  try {
    const res = await request.json();
    if (!res.email && !res.password) {
      return NextResponse.json(
        { error: "No credentials were supplied." },
        { status: 400 }
      );
    }
    if (!res.email) {
      return NextResponse.json(
        { error: "No email was supplied." },
        { status: 400 }
      );
    }
    if (!res.password) {
      return NextResponse.json(
        { error: "No password was supplied." },
        { status: 400 }
      );
    }

    const user = await getUser(res.email);
    if (!(await comparePasswords(user.passwordHash, res.password))) {
      return NextResponse.json(
        { error: "The email or password supplied was incorrect." },
        { status: 400 }
      );
    }

    const accessToken = generateAccessToken({ email: res.email });
    if (accessToken) {
      cookies().set("access_token", accessToken);
    }
    return NextResponse.json({ access_token: accessToken }, { status: 200 });
  } catch (e) {
    if (e instanceof SyntaxError) {
      return NextResponse.json(
        { error: "No credentials were supplied." },
        { status: 400 }
      );
    }
    if (e instanceof UserNotFoundError) {
      return NextResponse.json(
        { error: "The email or password supplied was incorrect." },
        { status: 400 }
      );
    }
    console.log(e);
    return NextResponse.json(
      { error: "An error occured, please try again later." },
      { status: 500 }
    );
  }
}

export { POST };
