import { NextResponse } from 'next/server';
import { getServerState, addLog } from '@/src/server/state';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const state = getServerState();
    state.scheduleSettings = { ...state.scheduleSettings, ...body };
    addLog('Scheduler Agent', `Updated publishing schedule: ${state.scheduleSettings.videosPerDay} videos/day`, 'info');
    return NextResponse.json({ success: true, schedule: state.scheduleSettings });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
