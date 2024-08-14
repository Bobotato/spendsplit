import { NextRequest, NextResponse } from "next/server";

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
    return NextResponse.json({ test: "Registered" });
  } catch (e) {
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
