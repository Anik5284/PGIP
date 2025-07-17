import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import crypto from "crypto";

export const POST = async (request: Request) => {
  const { password, token } = await request.json();
  await connectMongoDB();

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetToken: hashedToken,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return new NextResponse("Token is invalid or expired", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;

  try {
    await user.save();
    return new NextResponse("Password reset successful", { status: 200 });
  } catch (err) {
    console.error("Reset error:", err);
    return new NextResponse("Server error", { status: 500 });
  }
};
