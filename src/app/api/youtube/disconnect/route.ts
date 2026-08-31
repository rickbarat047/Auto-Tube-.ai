import { NextResponse } from 'next/server';
import { getServerState, addLog } from '@/src/server/state';

export async function POST() {
  try {
    const state = getServerState();
    state.currentChannel.isConnected = false;
    addLog(
      'YouTube Gateway Agent',
      `Disconnected YouTube channel "${state.currentChannel.channelName}". Automatic publishing paused until re-authenticated.`,
      'warning'
    );
    return NextResponse.json({ success: true, channel: state.currentChannel });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
