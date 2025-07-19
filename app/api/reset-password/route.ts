import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import crypto from "crypto";

export const POST = async (request: Request) => {
  try {
    const { password, token } = await request.json();
    await connectMongoDB();

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetToken: hashedToken,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ message: "Token is invalid or expired" }, { status: 400 });
    }

    // ✅ Don't manually hash here — Mongoose will do it
    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({ message: "Password reset successful" }, { status: 200 });
  } catch (err) {
    console.error("Reset error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
