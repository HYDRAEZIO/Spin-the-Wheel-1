import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../utils/dbConnect";
import Code from "../../../models/Code";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url!);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Code is required" }, { status: 400 });
  }

  try {
    await dbConnect();
    const foundCode = await Code.findOne({ code: code.toUpperCase() });

    if (!foundCode) {
      return NextResponse.json({ error: "Code not found" }, { status: 404 });
    }

    return NextResponse.json({ prize: foundCode.prize });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: "Failed to verify code", details: err.message }, { status: 500 });
  }
}