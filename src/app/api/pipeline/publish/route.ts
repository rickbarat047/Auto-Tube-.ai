import { NextResponse } from 'next/server';
import { getServerState, addLog } from '@/src/server/state';
import { simulateYouTubePublish } from '@/server/youtube';

export async function POST(req: Request) {
  try {
    const { videoId, customPrivacy, customTitle, customDescription, customTags } = await req.json();
    const state = getServerState();
    const video = state.pipelineVideos.find((v) => v.id === videoId);
    if (!video) return NextResponse.json({ error: 'Video not found' }, { status: 404 });

    if (!state.currentChannel.isConnected) {
      return NextResponse.json(
        {
          error: 'Cannot publish: No YouTube channel is connected. Please connect your account in Settings or the Header.',
        },
        { status: 400 }
      );
    }

    if (customTitle) video.title = customTitle;
    if (customDescription && video.seo) video.seo.description = customDescription;
    if (customTags && video.seo) {
      video.seo.tags = customTags;
      video.seo.primaryTags = customTags;
    }

    const publishResult = simulateYouTubePublish(video, state.currentChannel);
    video.currentStage = 'published';
    video.status = 'published';
    video.stageStatuses.published = 'completed';
    video.youtubeVideoId = publishResult.youtubeVideoId;
    video.publishedUrl = publishResult.publishedUrl;
    video.updatedAt = new Date().toISOString();

    // Consume API quota
    state.currentChannel.quotaUsedToday = (state.currentChannel.quotaUsedToday || 1600) + 1600;

    const privacy = customPrivacy || state.currentChannel.uploadPrivacyDefault || 'unlisted';

    addLog(
      'YouTube Publishing Agent',
      `Directly published video "${video.title}" to YouTube Channel [${state.currentChannel.channelName}] as [${privacy.toUpperCase()}]. Live URL: ${video.publishedUrl}`,
      'success',
      `Video ID: ${video.youtubeVideoId} | Form: ${video.format} | Direct Link: ${video.publishedUrl}`
    );

    return NextResponse.json({
      success: true,
      video,
      publishResult: {
        ...publishResult,
        privacy,
        channelName: state.currentChannel.channelName,
        channelId: state.currentChannel.channelId,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
