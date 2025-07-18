import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import crypto from "crypto";

export const POST = async (request: Request) => {
  try {
    const { token } = await request.json();
    await connectMongoDB();

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetToken: hashedToken,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ message: "Token is invalid or expired." }, { status: 400 });
    }

    return NextResponse.json({ message: "Token is valid." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }
};
