import { prisma } from "@/services/prisma";

import { NextRequest, NextResponse } from "next/server";

async function POST(userID: number) {
  try {
    const result = await prisma.user.findMany();
    return NextResponse.json({ response: result });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "An error occured, please try again later." },
      { status: 500 }
    );
  }
}

export { POST };
