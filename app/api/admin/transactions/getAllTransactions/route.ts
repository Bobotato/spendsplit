import { NextRequest, NextResponse } from "next/server";

async function GET() {
  try {
    const result = await prisma.transactions.findMany();
    return NextResponse.json({ response: result });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "An error occured, please try again later." },
      { status: 500 }
    );
  }
}

export { GET };
