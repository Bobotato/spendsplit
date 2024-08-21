import { NextRequest, NextResponse } from "next/server";

import { purgeGroups } from "@/app/api/services/groups/groups";

async function POST() {
  try {
    const result = await purgeGroups();
    return NextResponse.json({ response: result });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "An error occured, please try again later." },
      { status: 500 }
    );
  }
}

export { POST };
