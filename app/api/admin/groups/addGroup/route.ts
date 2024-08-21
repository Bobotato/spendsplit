import { NextRequest, NextResponse } from "next/server";

import { GroupIDCollisionError } from "@/app/api/services/errors";

import { createGroup } from "@/app/api/services/groups/groups";

async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    if (!req.groupTitle || !req.groupDesc || !req.createdById) {
      return NextResponse.json(
        { error: "Group details were not supplied or were incomplete." },
        { status: 400 }
      );
    }
    const res = await createGroup(
      req.groupTitle,
      req.groupDesc,
      req.createdById
    );
    const id = res.id;

    return NextResponse.json(
      { message: "Admin: New group Added", id },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    if (e instanceof GroupIDCollisionError) {
      return NextResponse.json(
        {
          error: "The group ID is already taken.",
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
        error: "There was an error creating new group, check server logs.",
      },
      { status: 500 }
    );
  }
}

export { POST };
