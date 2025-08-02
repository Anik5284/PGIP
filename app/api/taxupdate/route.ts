// File: app/user/api/taxupdate/route.ts
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { TaxUpdate } from "@/models/taxupdate"; // Import the new model

export async function GET() {
  try {
    await connectMongoDB();
    const updates = await TaxUpdate.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ updates }); // Send back as 'updates'
  } catch (error) {
    return NextResponse.json(
      { message: "❌ An error occurred while fetching updates." },
      { status: 500 }
    );
  }
}