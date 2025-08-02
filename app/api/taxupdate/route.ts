import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb'; // Changed import
import TaxUpdate from '@/models/taxupdate'; // Assuming your model is in models/TaxUpdate.ts

// A fixed, unique ID to ensure we only ever have one tax update document.
// You can generate this once from a MongoDB shell.
const TAX_UPDATE_DOCUMENT_ID = '654321abcdef1234567890'; 

export async function POST(request: Request) {
  // 🔐 IMPORTANT: Implement authentication logic here to verify the user is an admin.
  // This is crucial for security.
  /*
  const session = await getSession(); // Example session check
  if (session?.user?.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }
  */

  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ message: 'Message content is required' }, { status: 400 });
    }

    // Connect to the database
    await connectMongoDB(); // Using your connection function

    // Use findOneAndUpdate with upsert:true.
    // This will update the document if it exists, or create it if it's the first time.
    await TaxUpdate.findOneAndUpdate(
      { _id: TAX_UPDATE_DOCUMENT_ID }, // Find by the fixed ID
      { message: message },             // Set the new message
      { new: true, upsert: true }       // Options: return the new doc, and create if it doesn't exist
    );

    return NextResponse.json({ success: true, message: 'Tax update has been posted.' }, { status: 200 });

  } catch (error) {
    console.error("❌ API Error in admin/taxupdate:", error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}