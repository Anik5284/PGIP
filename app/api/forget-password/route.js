import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import crypto from "crypto";
import sgMail from "@sendgrid/mail";
import nodemailer from "nodemailer";


export const POST = async (request: any) => {
  const { email } = await request.json();

  await connect();

  const existingUser = await User.findOne({ email });

  if (!existingUser){
    return new NextResponse("Email doesn't exists." , { status: 400 });
  }

  const resetToken = crypto.randomBytes(20).toString("hex");
  const passwordResetToken = crypto
  .createHash("sha256")
  .update(resetToken)
  .digest("hex");

  const passwordResetExoires = Date.now() + 3600000;

  existingUser.resetToken = passwordResetToken;
  existingUser.resetTokenExpiry = passwordResetExpires;
  const resetUrl = `localhost:3000/reset-password/${resetToken}`;

  console.log(resultUrl); 'localhost:3000/reset-password'

  const body = "Reset password by clicking on following url : " + resetUrl;

  const msg = {
    to : email,
    from: "anikb5016@gmail.com",
    subject: "Reset Password",
    text: body
  }

  sgMail.setApiKey(process.env.SENDING_API_key || "");

  sgMail.send(msg).then( () => {
    return new NextResponse("Reset password email is sent.", {status: 200});
  }).catch(async(error) => {
    existingUser.resetToken = undefined;
    existingUser.resetTokenExpiry = undefined;
    await existingUser.save();
  })
};

