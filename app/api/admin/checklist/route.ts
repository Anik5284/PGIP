import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import CheckDocument from '@/models/checkdocument';

const MONGODB_URI = process.env.MONGODB_URI as string;

export async function GET() {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI);
    }

    const messages = await CheckDocument.find().sort({ sentAt: -1 });

    return NextResponse.json({ messages });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI);
    }

    const { message } = await req.json();

    if (!message || message.trim() === '') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const newMessage = await CheckDocument.create({
      message,
      sentAt: new Date(),
    });

    return NextResponse.json({ success: true, message: newMessage });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
