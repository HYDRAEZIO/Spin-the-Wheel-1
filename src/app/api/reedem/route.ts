import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../utils/dbConnect";
import Code from "../../../models/Code";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
  
    if (!code) {
      // Return a user-friendly message for missing code
      return NextResponse.json(
        { error: "Invalid or missing code. Please provide a valid code." },
        { status: 400 }
      );
    }
  
    try {
      await dbConnect();
  
      const result = await Code.findOne({ code });
  
      if (!result) {
        return NextResponse.json(
          { error: "No prize found for the provided code" },
          { status: 404 }
        );
      }
  
      return NextResponse.json({ code: result.code, prize: result.prize });
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json(
          { error: "Failed to fetch prize", details: error.message },
          { status: 500 }
        );
      } else {
        return NextResponse.json(
          { error: "Unknown error occurred", details: String(error) },
          { status: 500 }
        );
      }
    }
  }