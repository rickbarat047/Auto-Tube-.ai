import { ChannelProfile, PipelineVideoItem, ChannelAnalyticsOverview } from '@/src/types';

export interface YouTubeUploadPayload {
  title: string;
  description: string;
  tags: string[];
  category: string;
  visibility: 'public' | 'unlisted' | 'private';
  publishAt?: string;
  thumbnailUrl?: string;
  videoBlobUrl?: string;
}

export function simulateYouTubePublish(video: PipelineVideoItem, channel: ChannelProfile): { success: boolean; youtubeVideoId: string; publishedUrl: string } {
  const mockId = `yt_${Math.random().toString(36).substring(2, 11)}`;
  return {
    success: true,
    youtubeVideoId: mockId,
    publishedUrl: `https://youtube.com/watch?v=${mockId}`,
  };
}

export function generateChannelAnalytics(videos: PipelineVideoItem[]): ChannelAnalyticsOverview {
  const publishedVideos = videos.filter((v) => v.currentStage === 'published' || v.currentStage === 'analyzing');
  
  const totalViews = publishedVideos.reduce((acc, v) => acc + (v.analytics?.views || 45200), 128450);
  const totalLikes = publishedVideos.reduce((acc, v) => acc + (v.analytics?.likes || 2400), 8930);
  const totalSubscribers = 18450;
  
  return {
    totalViews,
    viewsGrowth: 28.4,
    totalLikes,
    totalSubscribers,
    subscribersGrowth: 14.2,
    averageCtr: 8.7,
    averageRetention: 64.8,
    totalVideosCreated: videos.length,
    totalVideosPublished: publishedVideos.length,
    totalVideosScheduled: videos.filter((v) => v.currentStage === 'scheduled').length,
    totalEstimatedCost: videos.reduce((acc, v) => acc + (v.estimatedCost?.total || 0.42), 3.84),
    bestPerformingVideo: {
      title: 'I Built a 24/7 AI YouTube Channel (Here is What It Made)',
      views: 89400,
      ctr: 11.2,
      retention: 71.4,
      thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    },
  };
}
