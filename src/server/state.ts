import {
  PipelineVideoItem,
  ChannelProfile,
  AutomationSchedule,
  AgentLog,
  TrendingTopic,
  CompetitorChannel,
} from '@/src/types';

interface ServerState {
  currentChannel: ChannelProfile;
  scheduleSettings: AutomationSchedule;
  agentLogs: AgentLog[];
  storedTrends: TrendingTopic[];
  storedCompetitors: CompetitorChannel[];
  pipelineVideos: PipelineVideoItem[];
}

const defaultChannel: ChannelProfile = {
  id: 'chan-101',
  channelName: 'AutoTech Daily',
  handle: '@AutoTechDailyAI',
  avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
  subscriberCount: 24600,
  totalViews: 418900,
  primaryNiche: 'AI tools & Autonomous Tech',
  subNiches: ['AI Automation', 'Future Tech', 'Productivity Agents', 'Open Source Models'],
  targetAudience: 'Tech enthusiasts, developers, digital creators, entrepreneurs aged 20-45',
  targetCountry: 'United States, Global',
  targetLanguage: 'English',
  defaultVideoLength: '8-10 mins (Long-form) & 50s (Shorts)',
  contentStyle: 'Fast-paced, data-backed, high retention with kinetic visual pacing',
  automationMode: 'semi_auto',
  isAutopilotRunning: true,
  isConnected: true,
  authExpiry: '2026-12-31',
  channelId: 'UC9xV2q1k8NqgH_v4Z0kG6Qw',
  connectedEmail: 'creator@autotechdaily.io',
  uploadPrivacyDefault: 'unlisted',
  defaultCategoryId: '28',
  autoPublishEnabled: true,
  notifySubscribers: true,
  isMadeForKids: false,
  quotaUsedToday: 1600,
  dailyQuotaLimit: 10000,
  connectionMethod: 'oauth2',
};

const defaultSchedule: AutomationSchedule = {
  videosPerDay: 2,
  videosPerWeek: 12,
  preferredUploadTimes: ['14:00', '19:30'],
  shortsRatio: 65,
  maxCostPerVideo: 1.5,
  maxDailyBudget: 5.0,
  requireApprovalBeforePublish: true,
  autoSelectBestTitle: true,
  autoSelectBestThumbnail: true,
};

const defaultLogs: AgentLog[] = [
  {
    id: 'log-1',
    timestamp: new Date(Date.now() - 1000 * 60 * 35).toLocaleTimeString(),
    agentName: 'Trend Research Agent',
    action: 'Scanned 14 sources: Discovered 6 high-opportunity viral topics',
    status: 'success',
    durationMs: 1240,
  },
  {
    id: 'log-2',
    timestamp: new Date(Date.now() - 1000 * 60 * 24).toLocaleTimeString(),
    agentName: 'Competitor Agent',
    action: 'Analyzed @ByteVelocity top uploads: Identified 4 exploitable content gaps',
    status: 'info',
    durationMs: 1820,
  },
  {
    id: 'log-3',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toLocaleTimeString(),
    agentName: 'Script Director Agent',
    action: 'Generated 5-scene retention script for "I Built a 24/7 AI YouTube Channel"',
    status: 'success',
    durationMs: 2310,
  },
  {
    id: 'log-4',
    timestamp: new Date(Date.now() - 1000 * 60 * 6).toLocaleTimeString(),
    agentName: 'Quality Control Agent',
    action: 'Safety & policy audit passed (Score: 96/100). Zero copyright or hallucination risks.',
    status: 'success',
    durationMs: 980,
  },
  {
    id: 'log-5',
    timestamp: new Date(Date.now() - 1000 * 60 * 1).toLocaleTimeString(),
    agentName: 'Orchestrator Agent',
    action: 'Autopilot standby: Scheduled next video batch for 19:30 UTC',
    status: 'info',
    durationMs: 450,
  },
];

const defaultTrends: TrendingTopic[] = [
  {
    id: 'trend-1',
    topic: 'Autonomous Multi-Agent AI Workflows in 2026',
    niche: 'AI tools & Autonomous Tech',
    viralScore: 96,
    searchDemand: 'Very High',
    competition: 'Low',
    trendVelocity: 420,
    recommendedFormat: 'long_form',
    potentialTitle: 'I Let 5 AI Agents Run an Online Business for 7 Days (Shocking Result)',
    estimatedAudience: 'Tech founders, developers & creators (2.4M reach)',
    whyItPerforms: 'Exploding search demand for autonomous agent toolchains with extreme curiosity hook.',
    source: 'YouTube Trending',
    dateDiscovered: new Date().toISOString().split('T')[0],
    evergreenScore: 88,
    tags: ['AI Agents', 'Automation', 'Productivity', 'Future Tech'],
  },
  {
    id: 'trend-2',
    topic: 'DeepSeek & Open Source Local LLMs Replacing SaaS',
    niche: 'AI tools & Autonomous Tech',
    viralScore: 92,
    searchDemand: 'Very High',
    competition: 'Medium',
    trendVelocity: 350,
    recommendedFormat: 'short',
    potentialTitle: 'Stop Paying for ChatGPT! Run These 3 Free Models Locally',
    estimatedAudience: 'Budget-conscious power users (4.1M reach)',
    whyItPerforms: 'High emotional relief: saving monthly recurring costs while unlocking private uncensored models.',
    source: 'Google Trends',
    dateDiscovered: new Date().toISOString().split('T')[0],
    evergreenScore: 82,
    tags: ['Local LLMs', 'Open Source', 'Free AI', 'Hardware'],
  },
  {
    id: 'trend-3',
    topic: 'AI Video Generation & Cinematic Physics Breakthroughs',
    niche: 'AI tools & Autonomous Tech',
    viralScore: 89,
    searchDemand: 'High',
    competition: 'Low',
    trendVelocity: 290,
    recommendedFormat: 'long_form',
    potentialTitle: 'Hollywood is Quietly Panicking About This New AI Video Model',
    estimatedAudience: 'Filmmakers, creators, tech lovers (3.2M reach)',
    whyItPerforms: 'High-stakes narrative conflict and sensational visual showcase.',
    source: 'Reddit',
    dateDiscovered: new Date().toISOString().split('T')[0],
    evergreenScore: 85,
    tags: ['AI Video', 'Veo', 'Sora', 'Cinematic CGI'],
  },
];

const defaultCompetitors: CompetitorChannel[] = [
  {
    id: 'comp-1',
    name: 'ByteVelocity Insights',
    handle: '@ByteVelocity',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    subscriberCount: '580K',
    videoCount: 142,
    averageViews: '110K',
    uploadFrequency: '2 long-form + 4 shorts / week',
    topVideos: [
      {
        title: 'I Tested 100 AI Tools So You Do Not Have To',
        views: '1.8M',
        daysAgo: '14 days ago',
        ctrEstimate: '9.4%',
        hookStyle: 'Extreme personal sacrifice & curation filter',
      },
      {
        title: 'Why Everyone Is Quietly Leaving Cloudflare',
        views: '920K',
        daysAgo: '28 days ago',
        ctrEstimate: '8.2%',
        hookStyle: 'Insider herd migration controversy',
      },
    ],
    workingPatterns: [
      'Bold yellow 3-word title overlays on thumbnails',
      'Instant 5-second proof of concept before introduction',
      'Pacing cuts every 2.1 seconds with energetic sound design',
    ],
    contentGaps: [
      'Lacks hands-on automated deployment templates (mostly theory)',
      'Under-indexes on actual server cost benchmarks',
      'Does not cover continuous autonomous agent loop tutorials',
    ],
  },
  {
    id: 'comp-2',
    name: 'FutureForge AI',
    handle: '@FutureForgeAI',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    subscriberCount: '340K',
    videoCount: 96,
    averageViews: '78K',
    uploadFrequency: '3 videos / week',
    topVideos: [
      {
        title: 'The AI Hardware Bubble Explained in 8 Minutes',
        views: '640K',
        daysAgo: '3 weeks ago',
        ctrEstimate: '7.8%',
        hookStyle: 'Urgent macroeconomic breakdown',
      },
    ],
    workingPatterns: ['Dark aesthetic neon charts', 'Clear countdown chapter segments'],
    contentGaps: ['Rarely publishes Shorts for rapid audience acquisition', 'Audio volume mixing is inconsistent'],
  },
];

const defaultPipeline: PipelineVideoItem[] = [
  {
    id: 'vid-101',
    title: 'I Built a 24/7 AI YouTube Channel (Here is What It Made)',
    niche: 'AI tools & Autonomous Tech',
    format: 'long_form',
    currentStage: 'published',
    status: 'published',
    stageStatuses: {
      ideas: 'completed',
      research: 'completed',
      script: 'completed',
      voiceover: 'completed',
      visuals: 'completed',
      editing: 'completed',
      quality_check: 'completed',
      ready: 'completed',
      scheduled: 'completed',
      published: 'completed',
      analyzing: 'completed',
    },
    estimatedCost: { llm: 0.04, voice: 0.08, image: 0.12, videoGen: 0.18, render: 0.05, total: 0.47 },
    scheduledPublishTime: '2026-08-30 19:30',
    publishedUrl: 'https://youtube.com/watch?v=demo_autotube_1',
    youtubeVideoId: 'demo_autotube_1',
    createdAt: '2026-08-30T10:00:00Z',
    updatedAt: '2026-08-30T19:30:00Z',
    retryCount: 0,
    selectedThumbnail: {
      id: 'thumb-101',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      headlineText: '$0 TO 100K VIEWS?',
      predictedCtr: 11.2,
      colorScheme: 'Emerald Neon / Slate',
      focalPoint: 'Glowing AI Core & Rising Analytic Curve',
      isSelected: true,
    },
    analytics: {
      views: 89400,
      likes: 5420,
      comments: 630,
      ctr: 11.2,
      averageViewDuration: '5m 32s',
      retentionPercentage: 68.4,
      subscribersGained: 1420,
      trafficSources: [
        { source: 'YouTube Recommendations / Browse', percentage: 64 },
        { source: 'YouTube Search', percentage: 22 },
        { source: 'Suggested Videos', percentage: 11 },
        { source: 'External & Direct', percentage: 3 },
      ],
      aiInsights: [
        'CTR of 11.2% is 2.4x above channel average (high-contrast emerald thumbnail worked well).',
        'Retention drop-off occurred at 0:22 during secondary intro; recommend trimming to 0:08 in next video.',
        'Audience search term "autonomous agent setup" generated 42% of subscriber conversions.',
      ],
    },
  },
  {
    id: 'vid-102',
    title: 'Stop Paying for ChatGPT! Run These 3 Free Models Locally',
    niche: 'AI tools & Autonomous Tech',
    format: 'short',
    currentStage: 'ready',
    status: 'ready',
    stageStatuses: {
      ideas: 'completed',
      research: 'completed',
      script: 'completed',
      voiceover: 'completed',
      visuals: 'completed',
      editing: 'completed',
      quality_check: 'completed',
      ready: 'completed',
      scheduled: 'pending',
      published: 'pending',
      analyzing: 'pending',
    },
    estimatedCost: { llm: 0.02, voice: 0.04, image: 0.06, videoGen: 0.0, render: 0.02, total: 0.14 },
    scheduledPublishTime: '2026-08-31 19:30',
    createdAt: '2026-08-31T06:00:00Z',
    updatedAt: '2026-08-31T07:15:00Z',
    retryCount: 0,
    selectedThumbnail: {
      id: 'thumb-102',
      imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
      headlineText: '100% FREE AI',
      predictedCtr: 12.8,
      colorScheme: 'Yellow & Black',
      focalPoint: 'Local terminal badge',
      isSelected: true,
    },
  },
  {
    id: 'vid-103',
    title: 'Hollywood is Quietly Panicking About This New AI Video Model',
    niche: 'AI tools & Autonomous Tech',
    format: 'long_form',
    currentStage: 'editing',
    status: 'in_progress',
    stageStatuses: {
      ideas: 'completed',
      research: 'completed',
      script: 'completed',
      voiceover: 'completed',
      visuals: 'completed',
      editing: 'in_progress',
      quality_check: 'pending',
      ready: 'pending',
      scheduled: 'pending',
      published: 'pending',
      analyzing: 'pending',
    },
    estimatedCost: { llm: 0.04, voice: 0.08, image: 0.16, videoGen: 0.22, render: 0.08, total: 0.58 },
    createdAt: '2026-08-31T08:00:00Z',
    updatedAt: '2026-08-31T08:45:00Z',
    retryCount: 0,
  },
];

declare global {
  var __autotube_state__: ServerState | undefined;
}

export function getServerState(): ServerState {
  if (!globalThis.__autotube_state__) {
    globalThis.__autotube_state__ = {
      currentChannel: { ...defaultChannel },
      scheduleSettings: { ...defaultSchedule },
      agentLogs: [...defaultLogs],
      storedTrends: [...defaultTrends],
      storedCompetitors: [...defaultCompetitors],
      pipelineVideos: [...defaultPipeline],
    };
  }
  return globalThis.__autotube_state__;
}

export function addLog(agentName: string, action: string, status: 'info' | 'success' | 'warning' | 'error', details?: string, durationMs?: number): AgentLog {
  const state = getServerState();
  const log: AgentLog = {
    id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    timestamp: new Date().toLocaleTimeString(),
    agentName,
    action,
    status,
    details,
    durationMs: durationMs || Math.floor(Math.random() * 1200 + 400),
  };
  state.agentLogs.unshift(log);
  if (state.agentLogs.length > 50) state.agentLogs.pop();
  return log;
}
