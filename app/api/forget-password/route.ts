import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import crypto from "crypto";
import sgMail from "@sendgrid/mail";

export const POST = async (request: Request) => {
  try {
    const { email } = await request.json();
    await connectMongoDB();

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json({ message: "Email doesn't exist." }, { status: 400 });
    }

    // Generate token & expiry
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    const tokenExpiry = Date.now() + 1000 * 60 * 60; // 1 hour

    // Save to DB
    existingUser.resetToken = hashedToken;
    existingUser.resetTokenExpiry = tokenExpiry;
    await existingUser.save();

    // Create reset URL
    const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";
    const resetUrl = `${baseUrl}/reset-password/${resetToken}`;
    const emailBody = `Reset your password here: ${resetUrl}`;

    // Send Email
    sgMail.setApiKey(process.env.SENDING_API_key || "");
    const msg = {
      to: email,
      from: "anikb5016@gmail.com",
      subject: "Reset Your Password",
      text: emailBody,
    };

    await sgMail.send(msg);

    return NextResponse.json({ message: "Reset email sent." }, { status: 200 });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
