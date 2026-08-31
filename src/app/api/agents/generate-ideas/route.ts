import { NextResponse } from 'next/server';
import { getServerState, addLog } from '@/src/server/state';
import { generateIdeasAgent } from '@/server/gemini';

export async function POST(req: Request) {
  try {
    const startTime = Date.now();
    const { topic, niche, targetAudience, format } = await req.json();
    const state = getServerState();
    addLog('Content Strategist Agent', `Generating CTR-engineered video ideas for "${topic}"`, 'info');
    const ideas = await generateIdeasAgent(
      topic || 'Autonomous AI Workflows',
      niche || state.currentChannel.primaryNiche,
      targetAudience || state.currentChannel.targetAudience,
      format || 'long_form'
    );
    addLog('Content Strategist Agent', `Generated ${ideas.length} high-potential video ideas`, 'success', undefined, Date.now() - startTime);
    return NextResponse.json({ success: true, ideas });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
