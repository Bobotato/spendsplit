import { NextRequest, NextResponse } from "next/server";

import { TransactionIDCollisionError } from "@/app/api/services/errors";

import { createTransaction } from "@/app/api/services/transactions/transactions";

async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    if (
      !req.transactionItem ||
      !req.transactionAmount ||
      !req.transactionDate ||
      !req.createdBy ||
      !req.splitters ||
      !req.groupId
    ) {
      return NextResponse.json(
        { error: "Transaction details were not supplied or were incomplete." },
        { status: 400 }
      );
    }
    const res = await createTransaction(
        req.transactionItem,
        req.transactionAmount,
        req.transactionDate,
        req.createdBy,
        req.splitters,
        req.groupId)
    const id = res.id;

    return NextResponse.json(
      { message: "Admin: New transaction added", id },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    if (e instanceof TransactionIDCollisionError) {
      return NextResponse.json(
        {
          error: "The transaction ID is already taken.",
        },
        { status: 409 }
      );
    }
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
        error: "There was an error creating new transaction, check server logs.",
      },
      { status: 500 }
    );
  }
}

export { POST };
