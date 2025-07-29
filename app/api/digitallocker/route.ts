import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import UserDocument from "@/models/document";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    const formData = await req.formData();
    const userId = formData.get("userId") as string;

    if (!userId) {
      return NextResponse.json({ success: false, error: "Missing userId" }, { status: 400 });
    }

    const documents: Record<string, any> = {};
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    // Ensure upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    for (const [key, value] of formData.entries()) {
      if (key !== "userId" && value instanceof File) {
        const buffer = Buffer.from(await value.arrayBuffer());
        const timestamp = Date.now();
        const filename = `${timestamp}_${value.name}`;
        const filepath = path.join(uploadDir, filename);

        // Save file to disk
        fs.writeFileSync(filepath, buffer);

        documents[key] = {
          name: value.name,
          mimetype: value.type,
          size: value.size,
          url: `/uploads/${filename}`, // ✅ critical for frontend to access it
        };
      }
    }

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
