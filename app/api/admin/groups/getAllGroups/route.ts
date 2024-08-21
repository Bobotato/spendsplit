import { NextResponse } from "next/server";

import { getAllGroups } from "@/app/api/services/groups/groups";

async function GET() {
  try {
    const result = await getAllGroups();
    return NextResponse.json({ response: result });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "An error occured, please try again later." },
      { status: 500 }
    );
  }
}

export { GET };
