import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Alert from "@/models/AdminAlert";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  try {
    await connectMongoDB();

    const query = userId
      ? {
          $or: [
            { userId: userId },
            { userId: { $exists: false } },
            { userId: null },
            { userId: "" },
          ],
        }
      : {
          $or: [
            { userId: { $exists: false } },
            { userId: null },
            { userId: "" },
          ],
        };

    const alerts = await Alert.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ alerts });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to fetch alerts", error: error.message },
      { status: 500 }
    );
  }
}
