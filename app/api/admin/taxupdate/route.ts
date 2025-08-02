// File: app/admin/api/taxupdate/route.ts
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { TaxUpdate } from "@/models/taxupdate"; // Import the new model

export async function POST(request: Request) {
  try {
    const { title, message } = await request.json();

    if (!title || !message) {
      return NextResponse.json(
        { message: "Title and message are required." },
        { status: 400 }
      );
    }
    await connectMongoDB();
    await TaxUpdate.create({ title, message });

    return NextResponse.json(
      { message: "✅ Tax Update Sent Successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "❌ An error occurred." },
      { status: 500 }
    );
  }
}