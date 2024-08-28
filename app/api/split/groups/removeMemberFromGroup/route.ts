import { NextResponse, NextRequest } from "next/server";

import { removeMemberFromGroup } from "@/app/api/services/groups/groups";

import { GroupNotFoundError } from "@/app/api/services/errors";

async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    if (!req.groupId || !req.member) {
      return NextResponse.json(
        {
          error:
            "Group details or member details were not supplied or were incomplete.",
        },
        { status: 400 }
      );
    }
    const result = await removeMemberFromGroup(req.groupId, req.member);
    return NextResponse.json({ response: result });
  } catch (e) {
    console.log(e);
    if (e instanceof GroupNotFoundError) {
      return NextResponse.json(
        {
          error: "There is no group with this id.",
        },
        { status: 400 }
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
        error: "There was an error retrieving groups, please try again later.",
      },
      { status: 500 }
    );
  }
}

export { POST };
