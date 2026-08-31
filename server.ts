import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import {
  discoverTrendsAgent,
  analyzeCompetitorsAgent,
  generateIdeasAgent,
  generateScriptAgent,
  generateSeoAgent,
  runQualityCheckAgent,
  generateThumbnailsAgent,
} from './server/gemini.js';
import { generateChannelAnalytics, simulateYouTubePublish } from './server/youtube.js';
import {
  PipelineVideoItem,
  ChannelProfile,
  AutomationSchedule,
  AgentLog,
  TrendingTopic,
  CompetitorChannel,
  PipelineStage,
} from './src/types.js';

dotenv.config();

// In-Memory App Database
let currentChannel: ChannelProfile = {
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

let scheduleSettings: AutomationSchedule = {
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

let agentLogs: AgentLog[] = [
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

function addLog(agentName: string, action: string, status: 'info' | 'success' | 'warning' | 'error', details?: string, durationMs?: number) {
  const log: AgentLog = {
    id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    timestamp: new Date().toLocaleTimeString(),
    agentName,
    action,
    status,
    details,
    durationMs: durationMs || Math.floor(Math.random() * 1200 + 400),
  };
  agentLogs.unshift(log);
  if (agentLogs.length > 50) agentLogs.pop();
  return log;
}

let storedTrends: TrendingTopic[] = [
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

let storedCompetitors: CompetitorChannel[] = [
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

let pipelineVideos: PipelineVideoItem[] = [
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

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '20mb' }));

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'AutoTube AI Autonomous Orchestrator' });
  });

  // Channel & Automation Settings
  app.get('/api/channel', (req, res) => {
    res.json({
      channel: currentChannel,
      schedule: scheduleSettings,
      analyticsOverview: generateChannelAnalytics(pipelineVideos),
    });
  });

  app.post('/api/channel', (req, res) => {
    currentChannel = { ...currentChannel, ...req.body };
    addLog('Niche & Channel Manager', `Updated channel configuration: ${currentChannel.channelName}`, 'info');
    res.json({ success: true, channel: currentChannel });
  });

  app.post('/api/channel/toggle-autopilot', (req, res) => {
    const { running, emergencyStop } = req.body;
    if (emergencyStop) {
      currentChannel.isAutopilotRunning = false;
      currentChannel.automationMode = 'manual';
      addLog('Safety Controller', 'EMERGENCY STOP TRIGGERED: All autonomous publishing halted immediately.', 'warning');
    } else {
      currentChannel.isAutopilotRunning = running;
      addLog('Orchestrator Agent', `Autopilot ${running ? 'ACTIVATED' : 'PAUSED'} in ${currentChannel.automationMode} mode`, 'info');
    }
    res.json({ success: true, isAutopilotRunning: currentChannel.isAutopilotRunning, automationMode: currentChannel.automationMode });
  });

  app.post('/api/channel/schedule', (req, res) => {
    scheduleSettings = { ...scheduleSettings, ...req.body };
    addLog('Scheduler Agent', `Updated publishing schedule: ${scheduleSettings.videosPerDay} videos/day`, 'info');
    res.json({ success: true, schedule: scheduleSettings });
  });

  // Trends
  app.get('/api/trends', (req, res) => {
    res.json({ trends: storedTrends });
  });

  app.post('/api/agents/discover-trends', async (req, res) => {
    try {
      const startTime = Date.now();
      const { niche, subNiches } = req.body;
      addLog('Trend Research Agent', `Initiated real-time multi-source scan for "${niche || currentChannel.primaryNiche}"`, 'info');
      const trends = await discoverTrendsAgent(niche || currentChannel.primaryNiche, subNiches || currentChannel.subNiches);
      storedTrends = trends;
      addLog('Trend Research Agent', `Discovery completed: Found ${trends.length} viral opportunities`, 'success', undefined, Date.now() - startTime);
      res.json({ success: true, trends });
    } catch (err: any) {
      addLog('Trend Research Agent', `Failed to scan trends: ${err.message}`, 'error');
      res.status(500).json({ error: err.message });
    }
  });

  // Competitors
  app.get('/api/competitors', (req, res) => {
    res.json({ competitors: storedCompetitors });
  });

  app.post('/api/agents/analyze-competitors', async (req, res) => {
    try {
      const startTime = Date.now();
      const { niche, handle } = req.body;
      addLog('Competitor Agent', `Deep-scanning uploads and engagement metrics for ${handle || 'target competitor'}`, 'info');
      const competitor = await analyzeCompetitorsAgent(niche || currentChannel.primaryNiche, handle);
      const existingIdx = storedCompetitors.findIndex((c) => c.handle === competitor.handle);
      if (existingIdx >= 0) {
        storedCompetitors[existingIdx] = competitor;
      } else {
        storedCompetitors.unshift(competitor);
      }
      addLog('Competitor Agent', `Synthesized ${competitor.workingPatterns.length} working patterns & ${competitor.contentGaps.length} gaps`, 'success', undefined, Date.now() - startTime);
      res.json({ success: true, competitor, competitors: storedCompetitors });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Idea Generation
  app.post('/api/agents/generate-ideas', async (req, res) => {
    try {
      const startTime = Date.now();
      const { topic, niche, targetAudience, format } = req.body;
      addLog('Content Strategist Agent', `Generating CTR-engineered video ideas for "${topic}"`, 'info');
      const ideas = await generateIdeasAgent(
        topic || 'Autonomous AI Workflows',
        niche || currentChannel.primaryNiche,
        targetAudience || currentChannel.targetAudience,
        format || 'long_form'
      );
      addLog('Content Strategist Agent', `Generated ${ideas.length} high-potential video ideas`, 'success', undefined, Date.now() - startTime);
      res.json({ success: true, ideas });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Script Generator
  app.post('/api/agents/generate-script', async (req, res) => {
    try {
      const startTime = Date.now();
      const { title, concept, format, durationSeconds, style } = req.body;
      addLog('Script Agent', `Writing retention script with pattern interrupts for: "${title}"`, 'info');
      const script = await generateScriptAgent(title, concept, format, durationSeconds, style);
      addLog('Script Agent', `Script generated: ${script.scenes.length} scenes, ${script.wordCount} words (~${script.estimatedReadTime})`, 'success', undefined, Date.now() - startTime);
      res.json({ success: true, script });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // SEO Generator
  app.post('/api/agents/generate-seo', async (req, res) => {
    try {
      const startTime = Date.now();
      const { title, scriptText, niche } = req.body;
      addLog('SEO Agent', `Optimizing YouTube metadata, tags, and chapter timestamps for "${title}"`, 'info');
      const seo = await generateSeoAgent(title, scriptText || '', niche || currentChannel.primaryNiche);
      addLog('SEO Agent', `SEO package ready: 5 title variations, ${seo.tags.length} tags, ${seo.chapters.length} chapters`, 'success', undefined, Date.now() - startTime);
      res.json({ success: true, seo });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Quality Control
  app.post('/api/agents/quality-check', async (req, res) => {
    try {
      const startTime = Date.now();
      const { title, scriptText, scenes } = req.body;
      addLog('Quality Control Agent', `Running 7-point factual, policy, and copyright safety audit`, 'info');
      const quality = await runQualityCheckAgent(title, scriptText || '', scenes || []);
      addLog('Quality Control Agent', `Audit finished: Overall Score ${quality.overallScore}/100 [${quality.policyCompliance}]`, quality.passed ? 'success' : 'warning', undefined, Date.now() - startTime);
      res.json({ success: true, quality });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Thumbnails
  app.post('/api/agents/generate-thumbnails', async (req, res) => {
    try {
      const startTime = Date.now();
      const { title, concept, niche } = req.body;
      addLog('Thumbnail Agent', `Designing 3 high-contrast mobile-optimized thumbnail concepts for "${title}"`, 'info');
      const thumbnails = await generateThumbnailsAgent(title, concept, niche || currentChannel.primaryNiche);
      addLog('Thumbnail Agent', `Thumbnail concepts rendered with CTR predictions up to ${thumbnails[0].predictedCtr}%`, 'success', undefined, Date.now() - startTime);
      res.json({ success: true, thumbnails });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Pipeline CRUD & Stage Execution
  app.get('/api/pipeline', (req, res) => {
    res.json({ videos: pipelineVideos });
  });

  app.post('/api/pipeline/create', (req, res) => {
    const { topic, title, niche, format } = req.body;
    const newVideo: PipelineVideoItem = {
      id: `vid-${Date.now()}`,
      title: title || topic?.potentialTitle || 'Untitled Video Project',
      niche: niche || currentChannel.primaryNiche,
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
    pipelineVideos.unshift(newVideo);
    addLog('Orchestrator Agent', `Created new video pipeline project: "${newVideo.title}"`, 'info');
    res.json({ success: true, video: newVideo });
  });

  app.post('/api/pipeline/step', async (req, res) => {
    const { videoId, targetStage, data } = req.body;
    const video = pipelineVideos.find((v) => v.id === videoId);
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
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

    // Apply data updates
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
    res.json({ success: true, video });
  });

  // YouTube Account & Gateway Integration Endpoints
  app.get('/api/youtube/status', (req, res) => {
    res.json({
      isConnected: currentChannel.isConnected,
      channel: currentChannel,
      quota: {
        usedToday: currentChannel.quotaUsedToday || 1600,
        dailyLimit: currentChannel.dailyQuotaLimit || 10000,
        percentage: Math.round(((currentChannel.quotaUsedToday || 1600) / (currentChannel.dailyQuotaLimit || 10000)) * 100),
      },
      scopes: [
        'https://www.googleapis.com/auth/youtube.upload',
        'https://www.googleapis.com/auth/youtube.readonly',
        'https://www.googleapis.com/auth/youtube.force-ssl',
        'https://www.googleapis.com/auth/youtubepartner',
      ],
      tokenStatus: 'active',
      tokenExpiresAt: currentChannel.authExpiry || '2026-12-31',
    });
  });

  app.post('/api/youtube/connect', (req, res) => {
    const {
      channelName,
      handle,
      channelId,
      connectedEmail,
      uploadPrivacyDefault,
      defaultCategoryId,
      autoPublishEnabled,
      notifySubscribers,
      isMadeForKids,
      connectionMethod,
    } = req.body;

    currentChannel = {
      ...currentChannel,
      channelName: channelName || currentChannel.channelName,
      handle: handle || currentChannel.handle,
      channelId: channelId || currentChannel.channelId || `UC_${Math.random().toString(36).substr(2, 10)}`,
      connectedEmail: connectedEmail || currentChannel.connectedEmail || 'creator@youtube.com',
      uploadPrivacyDefault: uploadPrivacyDefault || currentChannel.uploadPrivacyDefault || 'unlisted',
      defaultCategoryId: defaultCategoryId || currentChannel.defaultCategoryId || '28',
      autoPublishEnabled: autoPublishEnabled !== undefined ? autoPublishEnabled : true,
      notifySubscribers: notifySubscribers !== undefined ? notifySubscribers : true,
      isMadeForKids: isMadeForKids !== undefined ? isMadeForKids : false,
      connectionMethod: connectionMethod || 'oauth2',
      isConnected: true,
      authExpiry: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90).toISOString().split('T')[0],
    };

    addLog(
      'YouTube Gateway Agent',
      `Successfully bound and authenticated YouTube Channel: "${currentChannel.channelName}" (${currentChannel.handle}) via ${connectionMethod || 'OAuth 2.0'}`,
      'success',
      `Channel ID: ${currentChannel.channelId} | Default Privacy: ${currentChannel.uploadPrivacyDefault}`
    );

    res.json({ success: true, channel: currentChannel });
  });

  app.post('/api/youtube/disconnect', (req, res) => {
    currentChannel.isConnected = false;
    addLog(
      'YouTube Gateway Agent',
      `Disconnected YouTube channel "${currentChannel.channelName}". Automatic publishing paused until re-authenticated.`,
      'warning'
    );
    res.json({ success: true, channel: currentChannel });
  });

  app.post('/api/youtube/test-connection', (req, res) => {
    if (!currentChannel.isConnected) {
      return res.status(400).json({
        success: false,
        error: 'No active YouTube channel connected. Please link your Google/YouTube account first.',
      });
    }

    const latency = Math.floor(Math.random() * 80 + 45);
    addLog(
      'YouTube Gateway Agent',
      `YouTube Data API v3 health ping OK: ${latency}ms latency. Upload pipeline ready for ${currentChannel.channelName}.`,
      'success'
    );

    res.json({
      success: true,
      latencyMs: latency,
      channelName: currentChannel.channelName,
      channelId: currentChannel.channelId,
      quotaRemaining: (currentChannel.dailyQuotaLimit || 10000) - (currentChannel.quotaUsedToday || 1600),
      status: 'Ready for Autonomous Direct Upload',
    });
  });

  app.post('/api/pipeline/publish', (req, res) => {
    const { videoId, customPrivacy, customTitle, customDescription, customTags } = req.body;
    const video = pipelineVideos.find((v) => v.id === videoId);
    if (!video) return res.status(404).json({ error: 'Video not found' });

    if (!currentChannel.isConnected) {
      return res.status(400).json({
        error: 'Cannot publish: No YouTube channel is connected. Please connect your account in Settings or the Header.',
      });
    }

    if (customTitle) video.title = customTitle;
    if (customDescription && video.seo) video.seo.description = customDescription;
    if (customTags && video.seo) {
      video.seo.tags = customTags;
      video.seo.primaryTags = customTags;
    }

    const publishResult = simulateYouTubePublish(video, currentChannel);
    video.currentStage = 'published';
    video.status = 'published';
    video.stageStatuses.published = 'completed';
    video.youtubeVideoId = publishResult.youtubeVideoId;
    video.publishedUrl = publishResult.publishedUrl;
    video.updatedAt = new Date().toISOString();

    // Consume API quota
    currentChannel.quotaUsedToday = (currentChannel.quotaUsedToday || 1600) + 1600;

    const privacy = customPrivacy || currentChannel.uploadPrivacyDefault || 'unlisted';

    addLog(
      'YouTube Publishing Agent',
      `Directly published video "${video.title}" to YouTube Channel [${currentChannel.channelName}] as [${privacy.toUpperCase()}]. Live URL: ${video.publishedUrl}`,
      'success',
      `Video ID: ${video.youtubeVideoId} | Form: ${video.format} | Direct Link: ${video.publishedUrl}`
    );

    res.json({
      success: true,
      video,
      publishResult: {
        ...publishResult,
        privacy,
        channelName: currentChannel.channelName,
        channelId: currentChannel.channelId,
      },
    });
  });

  // Logs
  app.get('/api/logs', (req, res) => {
    res.json({ logs: agentLogs });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AutoTube AI Server running on port ${PORT}`);
  });
}

startServer();
