import { generateAccessToken } from "@/lib/jwt/jwt";
import { cookies } from "next/headers";

import { NextRequest, NextResponse } from "next/server";

import { main } from "@/services/index";

async function GET(request: NextRequest) {
  try {
    return NextResponse.json({ response: main() });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "An error occured, please try again later." },
      { status: 500 }
    );
  }
}

export { GET };
