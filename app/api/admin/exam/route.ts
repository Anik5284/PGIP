import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { MessageModel } from '@/models/exam';

// Admin sends a message to the user
export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const { message } = await req.json();

    if (!message || message.trim() === '') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const newMessage = await MessageModel.create({
      message,
      sentAt: new Date()
    });

    return NextResponse.json({ message: 'Message sent successfully', data: newMessage }, { status: 201 });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
