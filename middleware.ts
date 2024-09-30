import { NextResponse, NextRequest } from "next/server";

import { verifyJWT } from "@/services/auth/auth";
import { UnauthorisedError } from "@/services/errors";

async function middleware(request: NextRequest) {
  console.log("middleware running");
  try {
    await verifyJWT();
  } catch (e) {
    if (e instanceof UnauthorisedError) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/groups/:path*"],
};

export { middleware };
