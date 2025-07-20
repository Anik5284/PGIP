// app/api/feedback/get/route.ts
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Feedback from "@/models/feedback";

export async function GET() {
  try {
    await connectMongoDB();

    const feedbacks = await Feedback.find().sort({ createdAt: -1 });

    return NextResponse.json({ feedbacks }, { status: 200 });
  } catch (error: any) {
    console.error("❌ Error fetching feedback:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
