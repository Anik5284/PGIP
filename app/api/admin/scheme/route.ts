import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Scheme } from '@/models/schemes';

const MONGODB_URI = process.env.MONGODB_URI!;

async function connectToDatabase() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI);
  }
}

// GET: Fetch all messages
export async function GET() {
  try {
    await connectToDatabase();
    const messages = await Scheme.find().sort({ sentAt: -1 });
    return NextResponse.json(messages);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

// POST: Add new message
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
    }

    const newMsg = new Scheme({ message });
    const saved = await newMsg.save();

    return NextResponse.json({ success: true, id: saved._id });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Failed to insert message' }, { status: 500 });
  }
}

// PUT: Update message
export async function PUT(req: NextRequest) {
  try {
    await connectToDatabase();
    const { id, message } = await req.json();

    if (!id || !message) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const updated = await Scheme.findByIdAndUpdate(id, { message }, { new: true });

    if (!updated) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
  }
}

// DELETE: Remove message
export async function DELETE(req: NextRequest) {
  try {
    await connectToDatabase();
    const id = req.nextUrl.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    const deleted = await Scheme.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
}
