// File: app/admin/api/notification/route.ts

import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { Notification } from "@/models/notification";

export async function POST(request: Request) {
  try {
    // 1. Get title and message from the request body
    const { title, message } = await request.json();

    // 2. Validate input
    if (!title || !message) {
      return NextResponse.json(
        { message: "Title and message are required." },
        { status: 400 }
      );
    }

    // 3. Connect to the database
    await connectMongoDB();

    // 4. Create a new notification document and save it
    await Notification.create({ title, message });

    return NextResponse.json(
      { message: "✅ Notification Sent Successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating notification:", error);
    return NextResponse.json(
      { message: "❌ An error occurred while sending the notification." },
      { status: 500 }
    );
  }
}