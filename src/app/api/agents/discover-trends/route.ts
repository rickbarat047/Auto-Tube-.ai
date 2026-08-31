import { NextResponse } from 'next/server';
import { getServerState, addLog } from '@/src/server/state';
import { discoverTrendsAgent } from '@/server/gemini';

export async function POST(req: Request) {
  try {
    const startTime = Date.now();
    const { niche, subNiches } = await req.json();
    const state = getServerState();
    addLog('Trend Research Agent', `Initiated real-time multi-source scan for "${niche || state.currentChannel.primaryNiche}"`, 'info');
    const trends = await discoverTrendsAgent(niche || state.currentChannel.primaryNiche, subNiches || state.currentChannel.subNiches);
    state.storedTrends = trends;
    addLog('Trend Research Agent', `Discovery completed: Found ${trends.length} viral opportunities`, 'success', undefined, Date.now() - startTime);
    return NextResponse.json({ success: true, trends });
  } catch (err: any) {
    addLog('Trend Research Agent', `Failed to scan trends: ${err.message}`, 'error');
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
