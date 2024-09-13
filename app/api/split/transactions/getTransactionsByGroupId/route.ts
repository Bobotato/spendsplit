import { NextRequest, NextResponse } from "next/server";

import { getTransactionsByGroupId } from "@/app/api/services/transactions/transactions";

async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const result = await getTransactionsByGroupId(req.groupId);
    return NextResponse.json({ response: result });
  } catch (e) {
    console.log(e);
    if (e instanceof SyntaxError) {
      return NextResponse.json(
        {
          error: "There was no JSON body supplied.",
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "An error occured, please try again later." },
      { status: 500 }
    );
  }
}

export { POST };
