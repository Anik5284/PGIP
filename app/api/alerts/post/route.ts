import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import AdminAlert from "@/models/AdminAlert";

export async function POST(req: Request) {
  const { title, description, userId } = await req.json();

  if (!title || !description) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  try {
    await connectMongoDB();
    const alert = await AdminAlert.create({ title, description, userId: userId || "" });

    return NextResponse.json({ message: "Alert sent", alert }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
