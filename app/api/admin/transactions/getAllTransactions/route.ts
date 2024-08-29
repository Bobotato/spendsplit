import { NextRequest, NextResponse } from "next/server";

import { getAllTransactions } from "@/app/api/services/transactions/transactions";

async function GET() {
  try {
    const result = await getAllTransactions();
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
