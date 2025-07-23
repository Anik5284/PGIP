import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import AdminAlert from "@/models/AdminAlert";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");


    const query = userId ? { userId } : {};

    console.log("GET /api/alerts Query:", JSON.stringify(query));

    const alerts = await AdminAlert.find(query).sort({ createdAt: -1 });

    console.log("GET /api/alerts Alerts found:", alerts.length, alerts);

    return NextResponse.json({ alerts }, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/alerts error:", error);
    return NextResponse.json(
      { message: "Failed to fetch alerts", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, userId } = body;

    if (!title || !description || !userId) {
      return NextResponse.json(
        { error: "All fields (title, description, userId) are required." },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const newAlert = await AdminAlert.create({
      title,
      description,
      userId,
      createdAt: new Date(),
    });

    console.log("POST /api/alerts New alert created:", newAlert);

    return NextResponse.json(
      { message: "Alert sent successfully.", alert: newAlert },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/alerts error:", error);
    return NextResponse.json(
      { error: "Failed to send alert", details: error.message },
      { status: 500 }
    );
  }
}

// Example helper for server-side use (not for API route file)
export async function getUserAlertsFromDb(userId: string) {
  await connectMongoDB();
  const query = userId ? { userId } : {};
  return AdminAlert.find(query).sort({ createdAt: -1 });
}

export async function fetchUserAlerts(userId: string) {
  try {
    const res = await fetch(`/api/alerts?userId=${userId}`);
    if (!res.ok) {
      throw new Error(`Error fetching alerts: ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Frontend fetched data:", data);
    return data.alerts || [];
  } catch (error) {
    console.error("fetchUserAlerts error:", error);
    return null;
  }
}
