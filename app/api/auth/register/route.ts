import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { checkUserExists, createNewUser } from "@/services/auth/auth";

import { UsernameAlreadyExistsError } from "@/services/errors";

import { generateAccessToken } from "@/lib/jwt/jwt";

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
    await checkUserExists(res.username);
    await createNewUser(res.username, res.password);

    const accessToken = generateAccessToken({ username: res.username });
    if (accessToken) {
      cookies().set("access_token", accessToken);
    }
    return NextResponse.json({ access_token: accessToken }, { status: 200 });
  } catch (e) {
    console.log(e);
    if (e instanceof UsernameAlreadyExistsError) {
      return NextResponse.json(
        {
          error:
            "The username is already taken, please use another username or log in.",
        },
        { status: 409 }
      );
    }
    if (e instanceof SyntaxError) {
      return NextResponse.json(
        {
          error: "There was no JSON body supplied.",
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        error:
          "There was an error creating your account, please try again later.",
      },
      { status: 500 }
    );
  }
}

export { POST };
