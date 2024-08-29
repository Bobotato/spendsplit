import { NextResponse, NextRequest } from "next/server";

import { getGroupByGroupId } from "@/app/api/services/groups/groups";

import { GroupNotFoundError } from "@/app/api/services/errors";

async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const result = await getGroupByGroupId(req.groupId);
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
    if (e instanceof GroupNotFoundError) {
        return NextResponse.json(
          {
            error: "There was no group associated with this id found.",
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


