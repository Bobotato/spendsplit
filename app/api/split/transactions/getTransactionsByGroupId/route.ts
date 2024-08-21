import { NextRequest, NextResponse } from "next/server";

import { getTransactionsByGroupId } from "@/app/api/services/transactions/transactions";

async function POST(groupId: number) {
  try {
    const result = await getTransactionsByGroupId(groupId);
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
