import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";

import { decryptAccessToken } from "@/lib/jwt/jwt";

async function POST() {
  try {
    const access_token = cookies().get("access_token");
    if (access_token?.value) {
      const payload = decryptAccessToken(access_token.value);
      return NextResponse.json({ username: payload.username });
    } else {
      return NextResponse.json(
        { error: "No token was supplied. Please supply a token." },
        { status: 401 }
      );
    }
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      return NextResponse.json(
        {
          error:
            "The token has expired, please login again to refresh your token.",
        },
        { status: 401 }
      );
    }
    if (e instanceof JsonWebTokenError) {
      return NextResponse.json(
        { error: "The token is invalid. Please login again." },
        { status: 401 }
      );
    }
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export { POST };
