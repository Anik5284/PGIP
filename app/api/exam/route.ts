import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { MessageModel } from '@/models/exam';

// User fetches messages from MongoDB
export async function GET() {
  try {
    await connectMongoDB();

    const messages = await MessageModel.find().sort({ sentAt: -1 });

    return NextResponse.json({ messages }, { status: 200 });
  } catch (error) {
    console.error('Error fetching messages for user:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}
