import { NextResponse } from 'next/server';
import { getServerState, addLog } from '@/src/server/state';
import { generateSeoAgent } from '@/server/gemini';

export async function POST(req: Request) {
  try {
    const startTime = Date.now();
    const { title, scriptText, niche } = await req.json();
    const state = getServerState();
    addLog('SEO Agent', `Optimizing YouTube metadata, tags, and chapter timestamps for "${title}"`, 'info');
    const seo = await generateSeoAgent(title, scriptText || '', niche || state.currentChannel.primaryNiche);
    addLog('SEO Agent', `SEO package ready: 5 title variations, ${seo.tags.length} tags, ${seo.chapters.length} chapters`, 'success', undefined, Date.now() - startTime);
    return NextResponse.json({ success: true, seo });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
