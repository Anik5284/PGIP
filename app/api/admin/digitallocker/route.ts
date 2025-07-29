import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import UserDocument from "@/models/document";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();
    const docs = await UserDocument.find({});

    // Convert Mongoose Map to plain object for each document
    const lockers = docs.map((doc) => ({
      _id: doc._id,
      userId: doc.userId,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      documents: doc.documents ? Object.fromEntries(doc.documents as Map<string, any>) : {},
    }));

    return NextResponse.json({ lockers }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to fetch digital lockers", error: error.message },
      { status: 500 }
    );
  }
}
