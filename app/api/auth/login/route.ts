import { generateAccessToken } from "@/app/api/lib/jwt/jwt";
import { cookies } from "next/headers";

import { NextRequest, NextResponse } from "next/server";

import { getUser } from "@/app/api/services/auth/users";

import { comparePasswords } from "@/app/api/lib/auth/auth";

import { UserNotFoundError } from "@/app/api/services/errors";

async function POST(request: NextRequest) {
  try {
    const res = await request.json();
    if (!res.username && !res.password) {
      return NextResponse.json(
        { error: "No credentials were supplied." },
        { status: 400 }
      );
    }
    if (!res.username) {
      return NextResponse.json(
        { error: "No username was supplied." },
        { status: 400 }
      );
    }
    if (!res.password) {
      return NextResponse.json(
        { error: "No password was supplied." },
        { status: 400 }
      );
    }

    const user = await getUser(res.username);
    if (!(await comparePasswords(user.passwordHash, res.password))) {
      return NextResponse.json(
        { error: "The username or password supplied was incorrect." },
        { status: 401 }
      );
    }

    const accessToken = generateAccessToken({ username: res.username });
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
        { error: "The username or password supplied was incorrect." },
        { status: 401 }
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
