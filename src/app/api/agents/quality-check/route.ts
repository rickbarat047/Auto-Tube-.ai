import { NextResponse } from 'next/server';
import { addLog } from '@/src/server/state';
import { runQualityCheckAgent } from '@/server/gemini';

export async function POST(req: Request) {
  try {
    const startTime = Date.now();
    const { title, scriptText, scenes } = await req.json();
    addLog('Quality Control Agent', `Running 7-point factual, policy, and copyright safety audit`, 'info');
    const quality = await runQualityCheckAgent(title, scriptText || '', scenes || []);
    addLog('Quality Control Agent', `Audit finished: Overall Score ${quality.overallScore}/100 [${quality.policyCompliance}]`, quality.passed ? 'success' : 'warning', undefined, Date.now() - startTime);
    return NextResponse.json({ success: true, quality });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
