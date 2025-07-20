import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Feedback from "@/models/feedback";

// POST handler
export async function POST(req: NextRequest) {
  try {
    const { userId, message } = await req.json();

    if (!message || message.trim() === "") {
      return NextResponse.json(
        { message: "Message is required" },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const feedback = await Feedback.create({
      userId,
      message: message.trim(),
    });

    return NextResponse.json(
      {
        message: "Feedback submitted successfully",
        feedback,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Error saving feedback:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
