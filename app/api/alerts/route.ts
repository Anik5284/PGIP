import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import AdminAlert from "@/models/AdminAlert";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const query = userId ? { userId } : {};

    const alerts = await AdminAlert.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ alerts }, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/alerts error:", error);
    return NextResponse.json(
      { message: "Failed to fetch alerts", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, userId } = body;

    if (!title || !description || !userId) {
      return NextResponse.json(
        { error: "All fields (title, description, userId) are required." },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const newAlert = await AdminAlert.create({
      title,
      description,
      userId,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Alert sent successfully.", alert: newAlert },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/alerts error:", error);
    return NextResponse.json(
      { error: "Failed to send alert", details: error.message },
      { status: 500 }
    );
  }
}
