import { NextResponse } from 'next/server';
import { addLog } from '@/src/server/state';
import { generateScriptAgent } from '@/server/gemini';

export async function POST(req: Request) {
  try {
    const startTime = Date.now();
    const { title, concept, format, durationSeconds, style } = await req.json();
    addLog('Script Agent', `Writing retention script with pattern interrupts for: "${title}"`, 'info');
    const script = await generateScriptAgent(title, concept, format, durationSeconds, style);
    addLog('Script Agent', `Script generated: ${script.scenes.length} scenes, ${script.wordCount} words (~${script.estimatedReadTime})`, 'success', undefined, Date.now() - startTime);
    return NextResponse.json({ success: true, script });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
