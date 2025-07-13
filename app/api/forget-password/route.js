import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email } = await req.json();

    // 1. Validate email
    if (!email) {
      return NextResponse.json(
        { message: "Email is required." },
        { status: 400 }
      );
    }

    await connectMongoDB();

    // 2. Find user in database
    const user = await User.findOne({ email });

    // 3. Return success even if user doesn't exist (security best practice)
    if (!user) {
      return NextResponse.json(
        { message: "If this email exists, you'll receive a reset link." },
        { status: 200 }
      );
    }

    // 4. Generate secure token and expiry (1 hour)
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    // 5. Save hashed token to database
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    await User.updateOne(
      { email },
      { 
        resetToken: hashedToken, 
        resetTokenExpiry 
      }
    );

    // 6. Send password reset email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

    await transporter.sendMail({
      from: `"Your App Name" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Password Reset Instructions",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Password Reset Request</h2>
          <p>We received a request to reset your password.</p>
          <p>Click the button below within 1 hour to proceed:</p>
          <a href="${resetUrl}" 
             style="display: inline-block; padding: 12px 24px; 
                    background-color: #2563eb; color: white; 
                    text-decoration: none; border-radius: 4px; 
                    font-weight: bold; margin: 16px 0;">
            Reset Password
          </a>
          <p>If you didn't request this, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
          <p style="font-size: 12px; color: #6b7280;">
            For security reasons, this link will expire in 1 hour.
          </p>
        </div>
      `,
    });

    return NextResponse.json(
      { message: "Password reset link sent to your email." },
      { status: 200 }
    );

  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { message: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}