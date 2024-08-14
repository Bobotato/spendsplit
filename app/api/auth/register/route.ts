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
    const result = await prisma.user.create({
      data: {
        email: res.email,
        passwordHash: res.password,
      },
    });
    return NextResponse.json({ response: result }, { status: 200 });
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
