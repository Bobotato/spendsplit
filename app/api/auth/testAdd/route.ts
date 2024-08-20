import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/services/prisma";

async function POST(request: NextRequest) {
  try {
    const result = await prisma.user.create({
      data: {
        email: "email123",
        passwordHash: "password123",
      },
    });
    return NextResponse.json({ response: result }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "An error occured, please try again later." },
      { status: 500 }
    );
  }
}

export { POST };
