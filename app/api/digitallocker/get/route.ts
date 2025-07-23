import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import UserDocument from "@/models/document";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();
    const docs = await UserDocument.find({});
    return NextResponse.json({ lockers: docs }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to fetch digital lockers", error: error.message },
      { status: 500 }
    );
  }
}