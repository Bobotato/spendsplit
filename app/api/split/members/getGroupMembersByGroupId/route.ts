import { NextResponse, NextRequest } from "next/server";

import { NoMembersFoundError } from "@/app/api/services/errors";
import { getMembersByGroupId } from "@/app/api/services/members/members";

async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const result = await getMembersByGroupId(req.groupId);
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
    if (e instanceof NoMembersFoundError) {
        return NextResponse.json(
          {
            error: "There were no members associated with this id found.",
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
