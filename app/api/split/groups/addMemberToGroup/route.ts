import { NextResponse, NextRequest } from "next/server";

import { addMemberToGroup } from "@/app/api/services/groups/groups";

async function POST(request: NextRequest) {
    try {
      const req = await request.json();
      if (!req.member) {
        return NextResponse.json(
          { error: "Group details or member details were not supplied or were incomplete." },
          { status: 400 }
        );
      }
      const res = await addMemberToGroup(
        req.groupId,
        req.member,
      );
      const member = req.member;
      console.log(res)
  
      return NextResponse.json(
        { message: "New group member added", member },
        { status: 200 }
      );
    } catch (e) {
        console.log(e)
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
          error: "There was an error adding new member, check server logs.",
        },
        { status: 500 }
      );
    }
  }
  
  export { POST };