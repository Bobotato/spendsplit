import { NextResponse, NextRequest } from "next/server";

async function middleware(request: NextRequest) {
  console.log("middleware running");
  try {
    const user = await fetch("http://localhost:3000/api/auth/verifyJWT", {
      method: "POST",
    })
  } catch (e) {
    console.log("redirecting");
    console.log(e);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home"],
};

export { middleware };
