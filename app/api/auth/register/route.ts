import { NextRequest, NextResponse } from "next/server";

async function POST(credentials) {
  return NextResponse.json({ test: "nigg" });
}

export { POST }