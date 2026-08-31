import { NextResponse } from 'next/server';
import { getServerState, addLog } from '@/src/server/state';
import { generateThumbnailsAgent } from '@/server/gemini';

export async function POST(req: Request) {
  try {
    const startTime = Date.now();
    const { title, concept, niche } = await req.json();
    const state = getServerState();
    addLog('Thumbnail Agent', `Designing 3 high-contrast mobile-optimized thumbnail concepts for "${title}"`, 'info');
    const thumbnails = await generateThumbnailsAgent(title, concept, niche || state.currentChannel.primaryNiche);
    addLog('Thumbnail Agent', `Thumbnail concepts rendered with CTR predictions up to ${thumbnails[0].predictedCtr}%`, 'success', undefined, Date.now() - startTime);
    return NextResponse.json({ success: true, thumbnails });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
