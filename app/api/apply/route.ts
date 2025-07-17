// app/api/apply/route.ts
import { connectMongoDB } from "@/lib/mongodb";
import Application from "@/models/application";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const data = await request.json();

    await connectMongoDB();

    const newApp = new Application(data);
    await newApp.save();

    return NextResponse.json({ message: "Application submitted" }, { status: 201 });
  } catch (error) {
    console.error("Error saving application:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
