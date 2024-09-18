import { NextRequest, NextResponse } from "next/server";

import { deleteTransactionsByGroupId } from "@/app/api/services/transactions/transactions";

async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const result = await deleteTransactionsByGroupId(req.groupId);
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