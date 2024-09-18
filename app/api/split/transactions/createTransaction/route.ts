import { NextRequest, NextResponse } from "next/server";

import { createTransaction } from "@/app/api/services/transactions/transactions";

async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    if (
      !req.transactionItem ||
      !req.transactionAmount ||
      !req.transactionDate ||
      !req.groupId
    ) {
      return NextResponse.json(
        { error: "Transaction details were not supplied or were incomplete." },
        { status: 400 }
      );
    }
    const res = await createTransaction(
      req.transactionItem,
      req.transactionDesc,
      req.transactionAmount,
      req.transactionDate,
      req.groupId
    );
    const transaction = req.transaction;
    console.log(res);

    return NextResponse.json(
      { message: "New transaction added", transaction },
      { status: 200 }
    );
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
      {
        error: "There was an error creating a new transaction, check server logs.",
      },
      { status: 500 }
    );
  }
}

export { POST };
