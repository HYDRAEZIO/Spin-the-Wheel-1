import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../utils/dbConnect";
import Code from "../../../models/Code";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    await dbConnect();
    const existingCode = await Code.findOne({ code });

    if (!existingCode) {
      return NextResponse.json({ error: "Code not found" }, { status: 404 });
    }

    return NextResponse.json(existingCode, { status: 200 });
  } catch (error: unknown) {
    console.error("Error in GET verify-code:", error);
    return NextResponse.json(
      { error: "Internal server error", details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { code, redeem } = await req.json();

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    await dbConnect();
    const existingCode = await Code.findOne({ code });

    if (!existingCode) {
      return NextResponse.json({ error: "Code not found" }, { status: 404 });
    }

    if (redeem) {
      if (existingCode.redeemed) {
        return NextResponse.json(
          { error: "Code already redeemed" },
          { status: 400 }
        );
      }

      existingCode.redeemed = true;
      await existingCode.save();

      return NextResponse.json({ message: "Code redeemed successfully", code });
    }

    return NextResponse.json({ code: existingCode });
  } catch (error: unknown) {
    console.error("Error in POST verify-code:", error);
    return NextResponse.json(
      { error: "Internal server error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
