import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const feedbackFilePath = path.join(process.cwd(), 'data', 'feedbacks.json');

export async function POST(req: Request) {
  const { message } = await req.json();

  const newEntry = {
    id: Date.now(),
    message,
    date: new Date().toISOString(),
  };

  // Read existing feedback
  let data = [];
  if (fs.existsSync(feedbackFilePath)) {
    const content = fs.readFileSync(feedbackFilePath, 'utf8');
    data = JSON.parse(content);
  }

  data.push(newEntry);

  fs.writeFileSync(feedbackFilePath, JSON.stringify(data, null, 2));

  return NextResponse.json({ success: true });
}

export async function GET() {
  if (!fs.existsSync(feedbackFilePath)) {
    return NextResponse.json([]);
  }

  const content = fs.readFileSync(feedbackFilePath, 'utf8');
  const data = JSON.parse(content);
  return NextResponse.json(data);
}
