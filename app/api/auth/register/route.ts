import { NextRequest, NextResponse } from "next/server";

import { checkUserExists, createNewUser } from "@/services/auth/auth";

import { UsernameAlreadyExistsError } from "@/services/errors";
import { create } from "domain";

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
    await checkUserExists(res.email);
    await createNewUser(res.email, res.password);
    return NextResponse.json(
      { message: "User successfully created." },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    if (e instanceof UsernameAlreadyExistsError) {
      return NextResponse.json(
        {
          error:
            "The email is already taken, please use another email or log in.",
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
