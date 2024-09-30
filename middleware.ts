import { NextResponse, NextRequest } from "next/server";

import { verifyJWT } from "@/services/auth/auth";
import { UnauthorisedError } from "@/services/errors";

export const config = {
  matcher: ["/home", "/groups/:path*"],
};

async function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  try {
    if (token) {
      verifyJWT(token);
    } else {
      throw new UnauthorisedError("Token was not supplied.");
    }
  } catch (e) {
    if (e instanceof UnauthorisedError) {
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      console.log("Some other error");
    }
  }

  return NextResponse.next();
}

export { middleware };
