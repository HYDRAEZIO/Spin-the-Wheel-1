import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../utils/dbConnect";
import Code from "../../../models/Code";

export async function POST(req: NextRequest) {
  try {
    const { code, prize } = await req.json();

    if (!code || !prize) {
      return NextResponse.json(
        { error: "Code and prize are required" },
        { status: 400 }
      );
    }

    await dbConnect();
    const newSpinResult = await Code.create({ code, prize });
    return NextResponse.json(newSpinResult, { status: 201 });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { error: "Failed to save spin result", details: err.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const recentWinners = await Code.find().sort({ _id: -1 }).limit(3);
    return NextResponse.json(recentWinners, { status: 200 });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { error: "Failed to fetch recent winners", details: err.message },
      { status: 500 }
    );
  }
}
