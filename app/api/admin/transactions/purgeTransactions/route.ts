import { NextRequest, NextResponse } from "next/server";

import { purgeTransactions } from "@/app/api/services/transactions/transactions";

async function POST() {
  try {
    const result = await purgeTransactions();
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
