import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import crypto from "crypto";
import sgMail from "@sendgrid/mail";

export const POST = async (request: any) => {
  try {
    const { email } = await request.json();

    await connectMongoDB(); // ✅ Use correct connect function name (was just `connect()`)

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return new NextResponse("Email doesn't exist.", { status: 400 });
    }

    // ✅ Generate token & expiry
    const resetToken = crypto.randomBytes(20).toString("hex");
    const passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    const passwordResetExpires = Date.now() + 3600000; // 1 hour

    // ✅ Assign values to user
    existingUser.resetToken = passwordResetToken;
    existingUser.resetTokenExpiry = passwordResetExpires;
    await existingUser.save(); // ✅ Save the updated user in DB

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

    const body = `Reset your password by clicking the following URL: ${resetUrl}`;

    const msg = {
      to: email,
      from: "anikb5016@gmail.com",
      subject: "Reset Password",
      text: body,
    };

    sgMail.setApiKey(process.env.SENDING_API_key || "");

    await sgMail.send(msg);

    return new NextResponse("Reset password email is sent.", { status: 200 });
  } catch (error: any) {
    // Optional: cleanup in case of failure
    console.error("Error in password reset:", error);

    return new NextResponse("Failed to process request. Please try again.", {
      status: 500,
    });
  }
};
