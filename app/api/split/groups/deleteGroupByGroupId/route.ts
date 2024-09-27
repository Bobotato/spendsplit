import { NextResponse, NextRequest } from "next/server";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { deleteGroupByGroupId } from "@/app/api/services/groups/groups";
import { GroupNotFoundError } from "@/app/api/services/errors";

async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    if (!req.groupId) {
      return NextResponse.json(
        { error: "Group id was not supplied." },
        { status: 400 }
      );
    }
    await deleteGroupByGroupId(req.groupId);

    return NextResponse.json(
      { message: `Successfully deleted group ${req.groupId}.` },
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
    if (e instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          error: "There was no group with this id found.",
        },
        { status: 404 }
      );
    }
    if (e instanceof GroupNotFoundError) {
      return NextResponse.json(
        {
          error: "There was no group with this id found.",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        error: "There was an error deleting the group, please try again later.",
      },
      { status: 500 }
    );
  }
}

export { POST };
