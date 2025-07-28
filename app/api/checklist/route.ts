import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import CheckDocument from '@/models/checkdocument';

const MONGODB_URI = process.env.MONGODB_URI as string;

export async function GET() {
  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(MONGODB_URI);
    }

    const messages = await CheckDocument.find().sort({ sentAt: -1 });

    return NextResponse.json({ messages });
  } catch (err) {
    console.error('[USER_ROUTE_GET_ERROR]', err);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}
