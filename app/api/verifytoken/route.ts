import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import crypto from "crypto";

export const POST = async (request: any) => {
  try {
    const { token } = await request.json();
    await connectMongoDB();

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetToken: hashedToken,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
    }

    return NextResponse.json({ message: "Valid token" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Internal server error" }, { status: 500 });
  }
};
