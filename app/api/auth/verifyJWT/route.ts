import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { JWTInvalid, JWTExpired } from "jose/errors";

import { decryptAccessToken } from "@/app/api/lib/jwt/jwt";

async function POST() {
  try {
    const access_token = cookies().get("access_token");
    if (access_token?.value) {
      const payload = await decryptAccessToken(access_token.value);
      return NextResponse.json({
        data: payload,
      });
    } else {
      return NextResponse.json(
        { error: "No token was supplied. Please supply a token." },
        { status: 401 }
      );
    }
  } catch (e) {
    if (e instanceof JWTExpired) {
      return NextResponse.json(
        {
          error:
            "The token has expired, please login again to refresh your token.",
        },
        { status: 401 }
      );
    }
    if (e instanceof JWTInvalid) {
      return NextResponse.json(
        { error: "The token is invalid. Please login again." },
        { status: 401 }
      );
    }
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export { POST };
