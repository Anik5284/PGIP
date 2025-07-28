import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Scheme } from '@/models/schemes';

mongoose.connect(process.env.MONGODB_URI!);

export async function GET() {
  const schemes = await Scheme.find().sort({ createdAt: -1 });
  return NextResponse.json(schemes);
}
