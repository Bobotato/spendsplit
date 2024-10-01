import { NextResponse, NextRequest } from "next/server";

import { updateGroupMember } from "@/app/api/services/members/members";
import { NoMembersFoundError } from "@/app/api/services/errors";

async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    if (!req.id || !req.member) {
      return NextResponse.json(
        { error: "Member details were not supplied or were incomplete." },
        { status: 400 }
      );
    }
    const res = await updateGroupMember(req.id, req.member);
    const member = req.member;

    return NextResponse.json(
      { message: "Group member details updated", member },
      { status: 200 }
    );
  } catch (e) {
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
          error: "There was no member with this id found.",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        error: "There was an error updating member details, check server logs.",
      },
      { status: 500 }
    );
  }
}

export { POST };
