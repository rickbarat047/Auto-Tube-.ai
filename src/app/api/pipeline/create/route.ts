import { NextResponse } from 'next/server';
import { getServerState, addLog } from '@/src/server/state';
import { PipelineVideoItem } from '@/src/types';

export async function POST(req: Request) {
  try {
    const { topic, title, niche, format } = await req.json();
    const state = getServerState();
    const newVideo: PipelineVideoItem = {
      id: `vid-${Date.now()}`,
      title: title || topic?.potentialTitle || 'Untitled Video Project',
      niche: niche || state.currentChannel.primaryNiche,
      format: format || topic?.recommendedFormat || 'long_form',
      currentStage: 'ideas',
      status: 'in_progress',
      stageStatuses: {
        ideas: 'in_progress',
        research: 'pending',
        script: 'pending',
        voiceover: 'pending',
        visuals: 'pending',
        editing: 'pending',
        quality_check: 'pending',
        ready: 'pending',
        scheduled: 'pending',
        published: 'pending',
        analyzing: 'pending',
      },
      topic: topic,
      estimatedCost: { llm: 0.02, voice: 0.04, image: 0.08, videoGen: 0.0, render: 0.03, total: 0.17 },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      retryCount: 0,
    };
    state.pipelineVideos.unshift(newVideo);
    addLog('Orchestrator Agent', `Created new video pipeline project: "${newVideo.title}"`, 'info');
    return NextResponse.json({ success: true, video: newVideo });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
