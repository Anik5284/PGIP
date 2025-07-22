import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import AdminAlert from "@/models/AdminAlert";

export async function POST(req: Request) {
  const { title, description, userId } = await req.json();

  // Basic validation
  if (!title || !description || !userId || userId.trim() === "") {
    return NextResponse.json(
      { message: "Title, description, and userId are required." },
      { status: 400 }
    );
  }

  try {
    await connectMongoDB();

    const alert = await AdminAlert.create({
      title,
      description,
      userId,
      createdAt: new Date(), // optional if your schema uses timestamps
    });

    return NextResponse.json({ message: "Alert sent", alert }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
