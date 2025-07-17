import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const { password, email } = await request.json();

  await connectMongoDB();

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return new NextResponse("User not found", { status: 404 });
  }

  const hashedPassword = await bcrypt.hash(password, 5);
  existingUser.password = hashedPassword;
  existingUser.resetToken = undefined;
  existingUser.resetTokenExpiry = undefined;

  try {
    await existingUser.save();
    return new NextResponse("User password is updated", { status: 200 });
  } catch (err) {
    console.error("Error updating password:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
