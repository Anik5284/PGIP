import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const uri = process.env.MONGODB_URI;
const jwtSecret = process.env.JWT_SECRET;

// Hardcoded admin credentials
const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "admin123"; // You can hash this if preferred

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, isAdmin } = body;

    if (!email || !password) {
      return NextResponse.json({ message: "Missing email or password" }, { status: 400 });
    }

    // 🔒 Handle Admin Login
    if (isAdmin) {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const token = jwt.sign({ email, role: "admin" }, jwtSecret, { expiresIn: "1d" });

        return NextResponse.json({
          token,
          role: "admin",
        }, { status: 200 });
      } else {
        return NextResponse.json({ message: "Invalid admin credentials" }, { status: 401 });
      }
    }

    // 👤 Handle Normal User Login
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db();
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id, role: "user" },
      jwtSecret,
      { expiresIn: "1d" }
    );

    return NextResponse.json({
      token,
      role: "user",
      user: { email: user.email, name: user.name }
    }, { status: 200 });

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
