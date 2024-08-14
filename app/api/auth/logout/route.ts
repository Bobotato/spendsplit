import { cookies } from "next/headers";

import { NextResponse } from "next/server";

async function POST() {
  try {
    cookies().delete("access_token");
    return NextResponse.json(
      { message: "Successfully logged out." },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { error: "There was an error logging you out, please try again later." },
      { status: 500 }
    );
  }
}

export { POST };
