import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../utils/dbConnect";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    return NextResponse.json({ message: "Connected to MongoDB successfully!" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to connect to MongoDB" }, { status: 500 });
  }
}