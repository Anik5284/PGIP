import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Scheme } from '@/models/schemes';

mongoose.connect(process.env.MONGODB_URI!);

// GET all schemes
export async function GET() {
  const schemes = await Scheme.find().sort({ createdAt: -1 });
  return NextResponse.json(schemes);
}

// POST new scheme
export async function POST(req: NextRequest) {
  const { message } = await req.json();
  const newScheme = await Scheme.create({ message });
  return NextResponse.json({ success: true, scheme: newScheme });
}

// PUT update a scheme
export async function PUT(req: NextRequest) {
  const { id, message } = await req.json();
  await Scheme.findByIdAndUpdate(id, { message });
  return NextResponse.json({ success: true });
}

// DELETE a scheme
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  await Scheme.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
