import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import UserDocument from "@/models/document";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const formData = await req.formData();
    const userId = formData.get("userId") as string;
    const documents: Record<string, any> = {};

    for (const [key, value] of formData.entries()) {
      if (key !== "userId" && value instanceof File) {
        documents[key] = {
          name: value.name,
          mimetype: value.type,
          size: value.size,
          // You can save the file buffer or upload to S3 here
        };
      }
    }

    // Upsert user's documents
    const doc = await UserDocument.findOneAndUpdate(
      { userId },
      { $set: { documents } },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, doc });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}