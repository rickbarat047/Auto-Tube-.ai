import { NextResponse } from 'next/server';
import { connectChannelState } from '@/src/server/state';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const updatedChannel = connectChannelState(body);
    return NextResponse.json({ success: true, channel: updatedChannel });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
