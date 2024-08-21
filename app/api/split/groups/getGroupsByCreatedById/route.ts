import { NextResponse, NextRequest } from "next/server";

import { getGroupsByCreatedById } from "@/app/api/services/groups/groups";

async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const result = await getGroupsByCreatedById(req.createdById);
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
      {
        error: "There was an error retrieving groups, please try again later.",
      },
      { status: 500 }
    );
  }
}

export { POST };
