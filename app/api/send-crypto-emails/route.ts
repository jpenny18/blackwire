import { NextResponse } from 'next/server';
import { sendCryptoOrderEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const result = await sendCryptoOrderEmail(body);
    
    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Failed to send emails' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in send-crypto-emails route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
