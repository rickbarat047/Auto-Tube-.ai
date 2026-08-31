import { NextResponse } from 'next/server';
import { getServerState, addLog } from '@/src/server/state';
import { PipelineStage } from '@/src/types';

export async function POST(req: Request) {
  try {
    const { videoId, targetStage, data } = await req.json();
    const state = getServerState();
    const video = state.pipelineVideos.find((v) => v.id === videoId);
    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    const stages: PipelineStage[] = [
      'ideas',
      'research',
      'script',
      'voiceover',
      'visuals',
      'editing',
      'quality_check',
      'ready',
      'scheduled',
      'published',
      'analyzing',
    ];

    const currentIdx = stages.indexOf(video.currentStage);
    const nextStage = targetStage || (currentIdx < stages.length - 1 ? stages[currentIdx + 1] : video.currentStage);

    if (data) {
      if (data.title) video.title = data.title;
      if (data.idea) video.idea = data.idea;
      if (data.script) video.script = data.script;
      if (data.voiceover) video.voiceover = data.voiceover;
      if (data.editorSettings) video.editorSettings = data.editorSettings;
      if (data.thumbnails) video.thumbnails = data.thumbnails;
      if (data.selectedThumbnail) video.selectedThumbnail = data.selectedThumbnail;
      if (data.seo) video.seo = data.seo;
      if (data.qualityCheck) video.qualityCheck = data.qualityCheck;
      if (data.scheduledPublishTime) video.scheduledPublishTime = data.scheduledPublishTime;
    }

    video.stageStatuses[video.currentStage] = 'completed';
    video.currentStage = nextStage;
    video.stageStatuses[nextStage] = nextStage === 'published' ? 'completed' : 'in_progress';
    video.updatedAt = new Date().toISOString();

    addLog('Pipeline Orchestrator', `Video "${video.title}" transitioned to stage [${nextStage.toUpperCase()}]`, 'success');
    return NextResponse.json({ success: true, video });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
