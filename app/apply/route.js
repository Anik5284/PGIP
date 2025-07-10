// app/api/apply/route.js (App Router - Next.js 13+)
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Application from "@/models/application";

const MONGODB_URI = process.env.MONGODB_URI;

export async function POST(req) {
  try {
    const body = await req.json();

    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(MONGODB_URI);
    }

    const application = new Application(body);
    await application.save();

    return NextResponse.json({ success: true, message: "Application saved" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Error saving application" }, { status: 500 });
  }
}
