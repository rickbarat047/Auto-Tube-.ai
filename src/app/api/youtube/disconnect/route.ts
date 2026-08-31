import { NextResponse } from 'next/server';
import { disconnectChannelState } from '@/src/server/state';

export async function POST() {
  try {
    const channel = disconnectChannelState();
    return NextResponse.json({ success: true, channel });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
