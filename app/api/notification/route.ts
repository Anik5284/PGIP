// File: app/user/api/notification/route.ts

import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { Notification } from "@/models/notification";

export async function GET() {
  try {
    // 1. Connect to the database
    await connectMongoDB();

    // 2. Find all notifications and sort by creation date (newest first)
    const notifications = await Notification.find({}).sort({ createdAt: -1 });

    // 3. Return the notifications
    return NextResponse.json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { message: "❌ An error occurred while fetching notifications." },
      { status: 500 }
    );
  }
}