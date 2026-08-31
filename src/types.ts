export type ContentFormat = 'short' | 'long_form';
export type AutomationMode = 'manual' | 'semi_auto' | 'full_autonomous';

export type PipelineStage =
  | 'research'
  | 'ideas'
  | 'script'
  | 'voiceover'
  | 'visuals'
  | 'editing'
  | 'thumbnail'
  | 'seo'
  | 'quality_check'
  | 'ready'
  | 'scheduled'
  | 'published'
  | 'analyzing';

export type StageStatus = 'pending' | 'in_progress' | 'completed' | 'failed' | 'skipped';

export interface TrendingTopic {
  id: string;
  topic: string;
  niche: string;
  viralScore: number; // 0 - 100
  searchDemand: 'Very High' | 'High' | 'Medium' | 'Low';
  competition: 'Low' | 'Medium' | 'High';
  trendVelocity: number; // e.g. +340%
  recommendedFormat: ContentFormat;
  potentialTitle: string;
  estimatedAudience: string;
  whyItPerforms: string;
  source: 'YouTube Trending' | 'Google Trends' | 'Reddit' | 'Competitor Signal' | 'News/Web';
  dateDiscovered: string;
  evergreenScore: number;
  tags: string[];
}

export interface CompetitorChannel {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  subscriberCount: string;
  videoCount: number;
  averageViews: string;
  uploadFrequency: string;
  topVideos: {
    title: string;
    views: string;
    daysAgo: string;
    ctrEstimate: string;
    hookStyle: string;
  }[];
  workingPatterns: string[];
  contentGaps: string[];
}

export interface VideoIdea {
  id: string;
  titleIdeas: { title: string; predictedCtr: number; scoreBreakdown: { curiosity: number; clarity: number; search: number } }[];
  selectedTitle: string;
  concept: string;
  targetAudience: string;
  hook: string;
  storyAngle: string;
  mainPromise: string;
  suggestedDuration: string;
  format: ContentFormat;
  structure: string[];
  thumbnailConcept: {
    visualDescription: string;
    textOverlay: string;
    colorPalette: string;
    emotionalTrigger: string;
  };
  niche: string;
  viralPotential: number;
}

export interface ScriptScene {
  id: string;
  sceneNumber: number;
  durationSeconds: number;
  visualType: 'ai_image' | 'ai_video' | 'stock_footage' | 'motion_graphic' | 'chart' | 'text_overlay';
  visualPrompt: string;
  visualPreviewUrl?: string;
  narrationText: string;
  onScreenText?: string;
  soundEffect?: string;
  cameraMovement: 'zoom_in' | 'zoom_out' | 'pan_left' | 'pan_right' | 'static';
  patternInterrupt?: string;
}

export interface VideoScript {
  id: string;
  ideaId?: string;
  title: string;
  format: ContentFormat;
  targetDurationSeconds: number;
  hook: {
    first5Seconds: string;
    curiosityGap: string;
  };
  scenes: ScriptScene[];
  fullNarrationText: string;
  wordCount: number;
  estimatedReadTime: string;
  ctaText: string;
}

export interface VoiceoverTrack {
  id: string;
  voiceName: string;
  gender: 'Male' | 'Female' | 'male' | 'female';
  accent: string;
  tone: string;
  audioUrl: string;
  durationSeconds: number;
  subtitlesSynced: boolean;
  wordTimestamps?: { word: string; startMs: number; endMs: number }[];
}

export type VoiceoverConfig = VoiceoverTrack;

export interface VideoEditorSettings {
  style: 'fast_paced_viral' | 'documentary' | 'educational' | 'minimalist' | 'news_explainer' | 'cinematic';
  captionStyle: 'viral_yellow' | 'karaoke_neon' | 'minimal_white' | 'cinematic_sub' | 'bold_box';
  backgroundMusic: {
    trackName: string;
    genre: string;
    volume: number;
    duckingEnabled: boolean;
  };
  transitions: 'fast_cut' | 'zoom_blur' | 'glitch' | 'smooth_fade' | 'slide';
  enableProgressBar: boolean;
  enableSoundEffects: boolean;
  aspectRatio: '16:9' | '9:16';
}

export interface ThumbnailOption {
  id: string;
  imageUrl: string;
  textOverlay?: string;
  headlineText?: string;
  predictedCtr: number;
  colorScheme?: string;
  focalPoint?: string;
  style?: string;
  abTestScore?: number;
  isSelected?: boolean;
}

export interface SeoPackage {
  titles?: { title: string; score: number; curiosity: number; relevance: number }[];
  titleOptions?: string[];
  selectedTitle: string;
  description: string;
  chapters: { time?: string; timestamp?: string; title: string }[];
  tags: string[];
  primaryTags?: string[];
  hashtags?: string[];
  keywords?: string[];
  pinnedComment: string;
  category?: string;
  seoScore?: number;
  keywordDensityScore?: number;
}

export interface QualityCheckResult {
  passed: boolean;
  overallScore: number;
  guidelinesCompliance?: boolean;
  copyrightRisk?: 'low' | 'medium' | 'high' | 'Low' | 'Medium' | 'High';
  factCheckPassed?: boolean;
  pacingScore?: number;
  audioClarityScore?: number;
  misleadingMetadataCheck?: string;
  improvementNotes?: string[];
  checks?: {
    name: string;
    passed: boolean;
    score: number;
    notes: string;
  }[];
  hallucinationRisk?: 'Low' | 'Medium' | 'High';
  policyCompliance?: 'Compliant' | 'Review Required' | 'Violation';
  revisionSuggestions?: string[];
}

export interface PipelineVideoItem {
  id: string;
  title: string;
  niche: string;
  format: ContentFormat;
  currentStage: PipelineStage;
  stageStatuses: Partial<Record<PipelineStage, StageStatus>>;
  topic?: TrendingTopic;
  idea?: VideoIdea;
  script?: VideoScript;
  voiceover?: VoiceoverConfig;
  editorSettings?: VideoEditorSettings;
  thumbnails?: ThumbnailOption[];
  selectedThumbnail?: ThumbnailOption;
  seo?: SeoPackage;
  qualityCheck?: QualityCheckResult;
  estimatedCost: {
    llm: number;
    voice: number;
    image: number;
    videoGen: number;
    render: number;
    total: number;
  };
  scheduledPublishTime?: string;
  publishedUrl?: string;
  youtubeVideoId?: string;
  createdAt: string;
  updatedAt: string;
  errorMessage?: string;
  retryCount: number;
  status?: 'draft' | 'in_progress' | 'ready' | 'scheduled' | 'published' | 'failed';
  analytics?: {
    views: number;
    likes: number;
    comments: number;
    ctr: number;
    averageViewDuration: string;
    retentionPercentage: number;
    subscribersGained: number;
    trafficSources: { source: string; percentage: number }[];
    aiInsights: string[];
  };
}

export interface AgentLog {
  id: string;
  timestamp: string;
  agentName: string;
  action: string;
  status: 'info' | 'success' | 'warning' | 'error';
  videoId?: string;
  details?: string;
  durationMs?: number;
}

export interface ChannelProfile {
  id: string;
  channelName: string;
  handle: string;
  avatarUrl: string;
  subscriberCount: number;
  totalViews: number;
  primaryNiche: string;
  subNiches: string[];
  targetAudience: string;
  targetCountry: string;
  targetLanguage: string;
  defaultVideoLength: string;
  contentStyle: string;
  automationMode: AutomationMode;
  isAutopilotRunning: boolean;
  isConnected: boolean;
  authExpiry?: string;
  channelId?: string;
  connectedEmail?: string;
  uploadPrivacyDefault?: 'public' | 'unlisted' | 'private';
  defaultCategoryId?: string;
  autoPublishEnabled?: boolean;
  notifySubscribers?: boolean;
  isMadeForKids?: boolean;
  quotaUsedToday?: number;
  dailyQuotaLimit?: number;
  connectionMethod?: 'oauth2' | 'api_key' | 'service_account';
}

export interface YouTubeConnectionConfig {
  channelName: string;
  handle: string;
  channelId: string;
  connectedEmail?: string;
  uploadPrivacyDefault: 'public' | 'unlisted' | 'private';
  defaultCategoryId: string;
  autoPublishEnabled: boolean;
  notifySubscribers: boolean;
  isMadeForKids: boolean;
  connectionMethod: 'oauth2' | 'api_key' | 'service_account';
  apiKey?: string;
  clientId?: string;
  clientSecret?: string;
}

export interface AutomationSchedule {
  videosPerDay: number;
  videosPerWeek: number;
  shortsPerWeek?: number;
  preferredUploadTimes?: string[];
  preferredPublishHourUtc?: number;
  activeDays?: string[];
  shortsRatio?: number;
  maxCostPerVideo: number;
  maxDailyBudget?: number;
  monthlyBudgetCap?: number;
  requireApprovalBeforePublish?: boolean;
  autoSelectBestTitle?: boolean;
  autoSelectBestThumbnail?: boolean;
}

export interface ChannelAnalyticsOverview {
  totalViews: number;
  viewsGrowth: number;
  totalLikes: number;
  totalSubscribers: number;
  subscribersGrowth: number;
  averageCtr: number;
  averageRetention: number;
  totalVideosCreated: number;
  totalVideosPublished: number;
  totalVideosScheduled: number;
  totalEstimatedCost: number;
  bestPerformingVideo: {
    title: string;
    views: number;
    ctr: number;
    retention: number;
    thumbnailUrl: string;
  };
}
