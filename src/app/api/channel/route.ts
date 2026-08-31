import { NextResponse } from 'next/server';
import { getServerState, addLog } from '@/src/server/state';
import { generateChannelAnalytics } from '@/server/youtube';

export async function GET() {
  const state = getServerState();
  return NextResponse.json({
    channel: state.currentChannel,
    schedule: state.scheduleSettings,
    analyticsOverview: generateChannelAnalytics(state.pipelineVideos),
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const state = getServerState();
    state.currentChannel = { ...state.currentChannel, ...body };
    addLog('Niche & Channel Manager', `Updated channel configuration: ${state.currentChannel.channelName}`, 'info');
    return NextResponse.json({ success: true, channel: state.currentChannel });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
