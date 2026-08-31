import {
  TrendingTopic,
  CompetitorChannel,
  VideoIdea,
  VideoScript,
  ThumbnailOption,
  SeoPackage,
  QualityCheckResult,
  PipelineVideoItem,
  ChannelProfile,
  AutomationSchedule,
  AgentLog,
  ChannelAnalyticsOverview,
  ContentFormat,
} from '../types';

export const api = {
  async getChannel(): Promise<{ channel: ChannelProfile; schedule: AutomationSchedule; analyticsOverview: ChannelAnalyticsOverview }> {
    const res = await fetch('/api/channel');
    return res.json();
  },

  async updateChannel(channel: Partial<ChannelProfile>): Promise<{ success: boolean; channel: ChannelProfile }> {
    const res = await fetch('/api/channel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(channel),
    });
    return res.json();
  },

  async toggleAutopilot(running: boolean, emergencyStop?: boolean): Promise<{ success: boolean; isAutopilotRunning: boolean; automationMode: string }> {
    const res = await fetch('/api/channel/toggle-autopilot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ running, emergencyStop }),
    });
    return res.json();
  },

  async updateSchedule(schedule: Partial<AutomationSchedule>): Promise<{ success: boolean; schedule: AutomationSchedule }> {
    const res = await fetch('/api/channel/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(schedule),
    });
    return res.json();
  },

  async getTrends(): Promise<{ trends: TrendingTopic[] }> {
    const res = await fetch('/api/trends');
    return res.json();
  },

  async discoverTrends(niche?: string, subNiches?: string[]): Promise<{ success: boolean; trends: TrendingTopic[] }> {
    const res = await fetch('/api/agents/discover-trends', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ niche, subNiches }),
    });
    return res.json();
  },

  async getCompetitors(): Promise<{ competitors: CompetitorChannel[] }> {
    const res = await fetch('/api/competitors');
    return res.json();
  },

  async analyzeCompetitors(niche?: string, handle?: string): Promise<{ success: boolean; competitor: CompetitorChannel; competitors: CompetitorChannel[] }> {
    const res = await fetch('/api/agents/analyze-competitors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ niche, handle }),
    });
    return res.json();
  },

  async generateIdeas(topic: string, niche?: string, targetAudience?: string, format?: ContentFormat): Promise<{ success: boolean; ideas: VideoIdea[] }> {
    const res = await fetch('/api/agents/generate-ideas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, niche, targetAudience, format }),
    });
    return res.json();
  },

  async generateScript(params: { title: string; concept: string; format: ContentFormat; durationSeconds?: number; style?: string }): Promise<{ success: boolean; script: VideoScript }> {
    const res = await fetch('/api/agents/generate-script', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    return res.json();
  },

  async generateSeo(title: string, scriptText: string, niche?: string): Promise<{ success: boolean; seo: SeoPackage }> {
    const res = await fetch('/api/agents/generate-seo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, scriptText, niche }),
    });
    return res.json();
  },

  async runQualityCheck(title: string, scriptText: string, scenes: any[]): Promise<{ success: boolean; quality: QualityCheckResult }> {
    const res = await fetch('/api/agents/quality-check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, scriptText, scenes }),
    });
    return res.json();
  },

  async generateThumbnails(title: string, concept: string, niche?: string): Promise<{ success: boolean; thumbnails: ThumbnailOption[] }> {
    const res = await fetch('/api/agents/generate-thumbnails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, concept, niche }),
    });
    return res.json();
  },

  async getPipeline(): Promise<{ videos: PipelineVideoItem[] }> {
    const res = await fetch('/api/pipeline');
    return res.json();
  },

  async createPipelineVideo(payload: { topic?: TrendingTopic; title?: string; niche?: string; format?: ContentFormat }): Promise<{ success: boolean; video: PipelineVideoItem }> {
    const res = await fetch('/api/pipeline/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.json();
  },

  async stepPipeline(videoId: string, targetStage?: string, data?: any): Promise<{ success: boolean; video: PipelineVideoItem }> {
    const res = await fetch('/api/pipeline/step', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoId, targetStage, data }),
    });
    return res.json();
  },

  async getYouTubeStatus(): Promise<{ isConnected: boolean; channel: ChannelProfile; quota: { usedToday: number; dailyLimit: number; percentage: number }; scopes: string[]; tokenStatus: string; tokenExpiresAt: string }> {
    const res = await fetch('/api/youtube/status');
    return res.json();
  },

  async connectYouTube(config: Partial<ChannelProfile>): Promise<{ success: boolean; channel: ChannelProfile }> {
    const res = await fetch('/api/youtube/connect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    });
    return res.json();
  },

  async disconnectYouTube(): Promise<{ success: boolean; channel: ChannelProfile }> {
    const res = await fetch('/api/youtube/disconnect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    return res.json();
  },

  async testYouTubeConnection(): Promise<{ success: boolean; latencyMs?: number; channelName?: string; channelId?: string; quotaRemaining?: number; status?: string; error?: string }> {
    const res = await fetch('/api/youtube/test-connection', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    return res.json();
  },

  async publishVideo(videoId: string, options?: { customPrivacy?: string; customTitle?: string; customDescription?: string; customTags?: string[] }): Promise<{ success: boolean; video: PipelineVideoItem; publishResult: any; error?: string }> {
    const res = await fetch('/api/pipeline/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoId, ...options }),
    });
    return res.json();
  },

  async getLogs(): Promise<{ logs: AgentLog[] }> {
    const res = await fetch('/api/logs');
    return res.json();
  },
};
