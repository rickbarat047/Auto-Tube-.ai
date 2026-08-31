import { NextResponse } from 'next/server';
import { getServerState, addLog } from '@/src/server/state';
import { analyzeCompetitorsAgent } from '@/server/gemini';

export async function POST(req: Request) {
  try {
    const startTime = Date.now();
    const { niche, handle } = await req.json();
    const state = getServerState();
    addLog('Competitor Agent', `Deep-scanning uploads and engagement metrics for ${handle || 'target competitor'}`, 'info');
    const competitor = await analyzeCompetitorsAgent(niche || state.currentChannel.primaryNiche, handle);
    const existingIdx = state.storedCompetitors.findIndex((c) => c.handle === competitor.handle);
    if (existingIdx >= 0) {
      state.storedCompetitors[existingIdx] = competitor;
    } else {
      state.storedCompetitors.unshift(competitor);
    }
    addLog('Competitor Agent', `Synthesized ${competitor.workingPatterns.length} working patterns & ${competitor.contentGaps.length} gaps`, 'success', undefined, Date.now() - startTime);
    return NextResponse.json({ success: true, competitor, competitors: state.storedCompetitors });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
