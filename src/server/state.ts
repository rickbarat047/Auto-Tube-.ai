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

export const disconnectedChannel: ChannelProfile = {
  id: 'chan-unconnected',
  channelName: '',
  handle: '',
  avatarUrl: '',
  subscriberCount: 0,
  totalViews: 0,
  primaryNiche: '',
  subNiches: [],
  targetAudience: '',
  targetCountry: 'United States, Global',
  targetLanguage: 'English',
  defaultVideoLength: '8-10 mins (Long-form) & 50s (Shorts)',
  contentStyle: 'Fast-paced, data-backed, high retention',
  automationMode: 'semi_auto',
  isAutopilotRunning: false,
  isConnected: false,
  authExpiry: '',
  channelId: '',
  connectedEmail: '',
  uploadPrivacyDefault: 'unlisted',
  defaultCategoryId: '28',
  autoPublishEnabled: false,
  notifySubscribers: true,
  isMadeForKids: false,
  quotaUsedToday: 0,
  dailyQuotaLimit: 10000,
  connectionMethod: 'oauth2',
};

export const defaultSchedule: AutomationSchedule = {
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

// Preset catalog for popular channel types
export interface NicheTemplate {
  nicheId: string;
  channelName: string;
  handle: string;
  primaryNiche: string;
  subNiches: string[];
  targetAudience: string;
  contentStyle: string;
  avatarUrl: string;
  subscriberCount: number;
  totalViews: number;
  defaultCategoryId: string;
  trends: TrendingTopic[];
  competitors: CompetitorChannel[];
  pipelineVideos: PipelineVideoItem[];
}

export const NICHE_TEMPLATES: Record<string, NicheTemplate> = {
  gaming: {
    nicheId: 'gaming',
    channelName: 'PixelForge Gaming',
    handle: '@PixelForgeGaming',
    primaryNiche: 'Gaming & Esports Analytics',
    subNiches: ['Next-Gen Gaming News', 'GPU & Hardware Benchmarks', 'Game Lore Deep Dives', 'Speedrun Glitches'],
    targetAudience: 'Gamers, PC builders, streamers & esports fans aged 16-35',
    contentStyle: 'High-energy gameplay b-roll, instant hooks, framerate benchmarks, kinetic captions',
    avatarUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=150&auto=format&fit=crop&q=80',
    subscriberCount: 38400,
    totalViews: 842000,
    defaultCategoryId: '20',
    trends: [
      {
        id: 'trend-game-1',
        topic: 'GTA 6 Next-Gen Physics & AI Simulation Leaks',
        niche: 'Gaming & Esports Analytics',
        viralScore: 98,
        searchDemand: 'Very High',
        competition: 'High',
        trendVelocity: 580,
        recommendedFormat: 'long_form',
        potentialTitle: 'I Analyzed Every Frame of GTA 6 Leak (Rockstar Changed Everything)',
        estimatedAudience: 'Global Gaming Audience (5.8M reach)',
        whyItPerforms: 'Immense global anticipation with forensic frame-by-frame analysis hook.',
        source: 'YouTube Trending',
        dateDiscovered: new Date().toISOString().split('T')[0],
        evergreenScore: 78,
        tags: ['GTA 6', 'Rockstar Games', 'Open World', 'Physics Engine', 'Gaming'],
      },
      {
        id: 'trend-game-2',
        topic: 'Best Budget $250 GPUs for 1440p High-FPS in 2026',
        niche: 'Gaming & Esports Analytics',
        viralScore: 91,
        searchDemand: 'Very High',
        competition: 'Medium',
        trendVelocity: 340,
        recommendedFormat: 'short',
        potentialTitle: 'Do NOT Buy a GPU in 2026 Until You See These 3 Cards',
        estimatedAudience: 'PC Gamers & Builders (2.9M reach)',
        whyItPerforms: 'High-urgency purchasing advice that saves viewers money.',
        source: 'Google Trends',
        dateDiscovered: new Date().toISOString().split('T')[0],
        evergreenScore: 84,
        tags: ['PC Gaming', 'Budget GPU', 'Nvidia', 'AMD', 'FPS Benchmark'],
      },
      {
        id: 'trend-game-3',
        topic: 'Elden Ring DLC Speedrun World Record Exploits',
        niche: 'Gaming & Esports Analytics',
        viralScore: 89,
        searchDemand: 'High',
        competition: 'Low',
        trendVelocity: 310,
        recommendedFormat: 'long_form',
        potentialTitle: 'How Speedrunners Beat Elden Ring in 12 Minutes with 1 Glitch',
        estimatedAudience: 'Soulsborne fans & hardcore gamers (2.1M reach)',
        whyItPerforms: 'Extreme mastery showcase and visual impossibility factor.',
        source: 'Reddit',
        dateDiscovered: new Date().toISOString().split('T')[0],
        evergreenScore: 86,
        tags: ['Elden Ring', 'Speedrun', 'FromSoftware', 'Gaming Glitches'],
      },
    ],
    competitors: [
      {
        id: 'comp-game-1',
        name: 'GamerPulse Central',
        handle: '@GamerPulse',
        avatarUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80',
        subscriberCount: '890K',
        videoCount: 310,
        averageViews: '180K',
        uploadFrequency: '4 videos / week',
        topVideos: [
          {
            title: '10 Unreal Engine 5 Games Coming in 2026',
            views: '2.4M',
            daysAgo: '12 days ago',
            ctrEstimate: '11.8%',
            hookStyle: 'Rapid 4K visual montage with cinematic bass drop',
          },
        ],
        workingPatterns: ['Bright neon thumbnail outlines', '0:03 instant gameplay showcase'],
        contentGaps: ['Lacks deep hardware frametime benchmarks', 'Rarely publishes vertical Shorts'],
      },
    ],
    pipelineVideos: [
      {
        id: 'vid-game-1',
        title: 'I Tested 20 Cheap Gaming Gadgets from Amazon (Only 3 Worked)',
        niche: 'Gaming & Esports Analytics',
        format: 'long_form',
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
        estimatedCost: { llm: 0.03, voice: 0.06, image: 0.12, videoGen: 0.18, render: 0.05, total: 0.44 },
        scheduledPublishTime: '2026-08-31 18:00',
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        updatedAt: new Date().toISOString(),
        retryCount: 0,
        selectedThumbnail: {
          id: 'thumb-g1',
          imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
          headlineText: '$5 VS $500 SETUP',
          predictedCtr: 12.4,
          colorScheme: 'Electric Cyan & Magenta',
          focalPoint: 'Glowing controller and contrasting red X',
          isSelected: true,
        },
      },
    ],
  },

  finance: {
    nicheId: 'finance',
    channelName: 'WealthBlueprint',
    handle: '@WealthBlueprintHQ',
    primaryNiche: 'Finance & Wealth Building',
    subNiches: ['Dividend Growth', 'Passive Income Assets', 'Index Fund Strategy', 'Tax Optimization'],
    targetAudience: 'Working professionals, retail investors, entrepreneurs aged 22-48',
    contentStyle: 'High authority, visual net worth calculators, clean minimalist infographics',
    avatarUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=150&auto=format&fit=crop&q=80',
    subscriberCount: 41200,
    totalViews: 920500,
    defaultCategoryId: '27',
    trends: [
      {
        id: 'trend-fin-1',
        topic: 'How to Build a $1,000/Month Dividend Portfolio in 2026',
        niche: 'Finance & Wealth Building',
        viralScore: 97,
        searchDemand: 'Very High',
        competition: 'Medium',
        trendVelocity: 490,
        recommendedFormat: 'long_form',
        potentialTitle: 'How to Make $1,000 Every Month in Dividends (Exact Math & Stocks)',
        estimatedAudience: 'Retail Investors & Savers (4.2M reach)',
        whyItPerforms: 'Clear mathematical blueprint with tangible monthly cash flow promise.',
        source: 'YouTube Trending',
        dateDiscovered: new Date().toISOString().split('T')[0],
        evergreenScore: 95,
        tags: ['Dividends', 'Passive Income', 'Stock Market', 'Investing', 'Wealth'],
      },
      {
        id: 'trend-fin-2',
        topic: 'Roth IRA Rules 90% of People Get Wrong',
        niche: 'Finance & Wealth Building',
        viralScore: 93,
        searchDemand: 'Very High',
        competition: 'Low',
        trendVelocity: 380,
        recommendedFormat: 'short',
        potentialTitle: 'The Government Does Not Want You Knowing This Roth IRA Loophole',
        estimatedAudience: 'Young Earners & Taxpayers (3.1M reach)',
        whyItPerforms: 'Taboo framing ("they do not want you knowing") and direct tax savings.',
        source: 'Google Trends',
        dateDiscovered: new Date().toISOString().split('T')[0],
        evergreenScore: 92,
        tags: ['Roth IRA', 'Taxes', 'Retirement', 'Personal Finance'],
      },
    ],
    competitors: [
      {
        id: 'comp-fin-1',
        name: 'Capital Compass',
        handle: '@CapitalCompass',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        subscriberCount: '720K',
        videoCount: 195,
        averageViews: '140K',
        uploadFrequency: '2 videos / week',
        topVideos: [
          {
            title: 'Where to Invest $10,000 in 2026',
            views: '1.2M',
            daysAgo: '3 weeks ago',
            ctrEstimate: '10.4%',
            hookStyle: 'Exact dollar allocation pie chart at 0:02',
          },
        ],
        workingPatterns: ['Dark background with bright emerald text', 'Clean Excel model overlays'],
        contentGaps: ['Under-indexes on automated micro-investing bots', 'No beginner Shorts breakdown'],
      },
    ],
    pipelineVideos: [
      {
        id: 'vid-fin-1',
        title: 'I Replaced My 9-to-5 Salary with Index Funds (My 5-Year Portfolio)',
        niche: 'Finance & Wealth Building',
        format: 'long_form',
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
        estimatedCost: { llm: 0.02, voice: 0.05, image: 0.08, videoGen: 0.1, render: 0.04, total: 0.29 },
        scheduledPublishTime: '2026-08-31 17:00',
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        updatedAt: new Date().toISOString(),
        retryCount: 0,
        selectedThumbnail: {
          id: 'thumb-f1',
          imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=80',
          headlineText: '$0 TO $100K/YR',
          predictedCtr: 11.9,
          colorScheme: 'Emerald Green / Obsidian',
          focalPoint: 'Compounding growth chart curve',
          isSelected: true,
        },
      },
    ],
  },

  fitness: {
    nicheId: 'fitness',
    channelName: 'Apex Physique',
    handle: '@ApexPhysiqueScience',
    primaryNiche: 'Fitness & Health Science',
    subNiches: ['Hypertrophy Science', 'Fat Loss Protocols', 'High-Protein Meal Prep', 'Longevity Habits'],
    targetAudience: 'Fitness enthusiasts, gym goers, athletes & health-minded adults aged 18-50',
    contentStyle: 'Fast-paced, anatomy 3D overlays, science paper citations, high retention workout demos',
    avatarUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=150&auto=format&fit=crop&q=80',
    subscriberCount: 29500,
    totalViews: 640000,
    defaultCategoryId: '26',
    trends: [
      {
        id: 'trend-fit-1',
        topic: 'The Science of Optimal Muscle Hypertrophy in 2026',
        niche: 'Fitness & Health Science',
        viralScore: 95,
        searchDemand: 'Very High',
        competition: 'Medium',
        trendVelocity: 420,
        recommendedFormat: 'long_form',
        potentialTitle: 'The "Perfect" Workout Routine According to 50 New Studies',
        estimatedAudience: 'Lifters & Gym Goers (3.8M reach)',
        whyItPerforms: 'High-authority scientific synthesis that settles long-standing gym debates.',
        source: 'YouTube Trending',
        dateDiscovered: new Date().toISOString().split('T')[0],
        evergreenScore: 92,
        tags: ['Hypertrophy', 'Muscle Growth', 'Workout Routine', 'Science', 'Fitness'],
      },
      {
        id: 'trend-fit-2',
        topic: '3 Morning Habits Destroying Your Metabolism',
        niche: 'Fitness & Health Science',
        viralScore: 92,
        searchDemand: 'Very High',
        competition: 'Low',
        trendVelocity: 360,
        recommendedFormat: 'short',
        potentialTitle: 'Stop Drinking Coffee Like This If You Want to Burn Fat',
        estimatedAudience: 'Health & Weight Loss Seekers (4.5M reach)',
        whyItPerforms: 'Immediate pattern interrupt on a universal morning habit.',
        source: 'Google Trends',
        dateDiscovered: new Date().toISOString().split('T')[0],
        evergreenScore: 88,
        tags: ['Fat Loss', 'Metabolism', 'Morning Routine', 'Nutrition'],
      },
    ],
    competitors: [
      {
        id: 'comp-fit-1',
        name: 'BioFit Science',
        handle: '@BioFitScience',
        avatarUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=150&auto=format&fit=crop&q=80',
        subscriberCount: '520K',
        videoCount: 160,
        averageViews: '115K',
        uploadFrequency: '3 videos / week',
        topVideos: [
          {
            title: 'I Ate 200g Protein Every Day for 30 Days',
            views: '1.9M',
            daysAgo: '2 weeks ago',
            ctrEstimate: '12.1%',
            hookStyle: 'Before & after physique comparison in 0:02',
          },
        ],
        workingPatterns: ['Bright yellow title text', 'Electromyography muscle heatmaps'],
        contentGaps: ['Lacks home workout substitutions', 'No quick grocery store shopping guides'],
      },
    ],
    pipelineVideos: [
      {
        id: 'vid-fit-1',
        title: 'I Tried the Perfect Science-Based Workout for 30 Days (Real Scan Results)',
        niche: 'Fitness & Health Science',
        format: 'long_form',
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
        estimatedCost: { llm: 0.02, voice: 0.05, image: 0.08, videoGen: 0.12, render: 0.04, total: 0.31 },
        scheduledPublishTime: '2026-08-31 16:30',
        createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
        updatedAt: new Date().toISOString(),
        retryCount: 0,
        selectedThumbnail: {
          id: 'thumb-fit1',
          imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
          headlineText: '30 DAY SCAN RESULTS',
          predictedCtr: 13.2,
          colorScheme: 'High Contrast Red / Charcoal',
          focalPoint: 'DEXA scan comparison badge',
          isSelected: true,
        },
      },
    ],
  },

  mystery: {
    nicheId: 'mystery',
    channelName: 'Shadow Files',
    handle: '@ShadowFilesMystery',
    primaryNiche: 'History & Unsolved Mysteries',
    subNiches: ['Unsolved Vanishings', 'Historical Conspiracies', 'Ocean & Space Anomalies', 'Forensic Cold Cases'],
    targetAudience: 'True crime fans, documentary lovers, history buffs aged 18-60',
    contentStyle: 'Cinematic documentary pacing, suspenseful orchestral swells, eerie b-roll zooms',
    avatarUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=150&auto=format&fit=crop&q=80',
    subscriberCount: 52000,
    totalViews: 1240000,
    defaultCategoryId: '24',
    trends: [
      {
        id: 'trend-mys-1',
        topic: 'The Unsolved Vanishing of Flight MH370 New 2026 Clues',
        niche: 'History & Unsolved Mysteries',
        viralScore: 99,
        searchDemand: 'Very High',
        competition: 'Medium',
        trendVelocity: 620,
        recommendedFormat: 'long_form',
        potentialTitle: 'The New Sonar Discovery That May Finally Solve Flight MH370',
        estimatedAudience: 'Global Documentary Audience (6.5M reach)',
        whyItPerforms: 'Massive emotional mystery with newly emerging forensic radar data.',
        source: 'YouTube Trending',
        dateDiscovered: new Date().toISOString().split('T')[0],
        evergreenScore: 98,
        tags: ['MH370', 'Aviation Mystery', 'Unsolved', 'Documentary', 'Investigation'],
      },
      {
        id: 'trend-mys-2',
        topic: 'The Most Bizarre Psychological Experiment Ever Kept Secret',
        niche: 'History & Unsolved Mysteries',
        viralScore: 94,
        searchDemand: 'High',
        competition: 'Low',
        trendVelocity: 410,
        recommendedFormat: 'short',
        potentialTitle: 'In 1971, This Scientist Did Something So Terrifying It Was Classified',
        estimatedAudience: 'Psychology & History Enthusiasts (3.6M reach)',
        whyItPerforms: 'Intense morbid curiosity and historical forbidden knowledge angle.',
        source: 'Reddit',
        dateDiscovered: new Date().toISOString().split('T')[0],
        evergreenScore: 94,
        tags: ['Psychology', 'Secret Experiments', 'History', 'Cold War'],
      },
    ],
    competitors: [
      {
        id: 'comp-mys-1',
        name: 'Midnight Archives',
        handle: '@MidnightArchives',
        avatarUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=150&auto=format&fit=crop&q=80',
        subscriberCount: '1.2M',
        videoCount: 140,
        averageViews: '350K',
        uploadFrequency: '1 documentary / week',
        topVideos: [
          {
            title: 'What Happened to the 5 Men Who Disappeared in the Yuba County Hills',
            views: '3.8M',
            daysAgo: '1 month ago',
            ctrEstimate: '14.2%',
            hookStyle: 'Eerie map radar ping with 911 dispatch audio clip',
          },
        ],
        workingPatterns: ['Sepia archival photo zooms', 'Suspenseful string quartet soundtracks'],
        contentGaps: ['Rarely covers recent 21st century mysteries', 'Does not produce vertical Shorts'],
      },
    ],
    pipelineVideos: [
      {
        id: 'vid-mys-1',
        title: 'The Impossible Escape from Alcatraz: What the FBI Kept Hidden',
        niche: 'History & Unsolved Mysteries',
        format: 'long_form',
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
        estimatedCost: { llm: 0.03, voice: 0.07, image: 0.14, videoGen: 0.22, render: 0.06, total: 0.52 },
        scheduledPublishTime: '2026-08-31 20:00',
        createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
        updatedAt: new Date().toISOString(),
        retryCount: 0,
        selectedThumbnail: {
          id: 'thumb-m1',
          imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
          headlineText: 'DID THEY SURVIVE?',
          predictedCtr: 14.8,
          colorScheme: 'Dark Noir & Blood Red',
          focalPoint: 'Silhouette in moonlight water',
          isSelected: true,
        },
      },
    ],
  },

  tech_ai: {
    nicheId: 'tech_ai',
    channelName: 'AutoTech Daily',
    handle: '@AutoTechDailyAI',
    primaryNiche: 'AI tools & Autonomous Tech',
    subNiches: ['AI Automation', 'Future Tech', 'Productivity Agents', 'Open Source Models'],
    targetAudience: 'Tech builders, creators, developers, entrepreneurs aged 20-45 seeking actionable workflows',
    contentStyle: 'Fast-paced, data-backed, high retention with kinetic visual pacing',
    avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    subscriberCount: 24600,
    totalViews: 418900,
    defaultCategoryId: '28',
    trends: [
      {
        id: 'trend-tech-1',
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
        id: 'trend-tech-2',
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
    ],
    competitors: [
      {
        id: 'comp-tech-1',
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
        ],
        workingPatterns: ['Bold yellow 3-word title overlays on thumbnails', 'Instant 5-second proof before intro'],
        contentGaps: ['Lacks hands-on automated deployment templates', 'Does not cover continuous agent loops'],
      },
    ],
    pipelineVideos: [
      {
        id: 'vid-tech-1',
        title: 'I Built a 24/7 AI YouTube Channel (Here is What It Made)',
        niche: 'AI tools & Autonomous Tech',
        format: 'long_form',
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
        estimatedCost: { llm: 0.04, voice: 0.08, image: 0.12, videoGen: 0.18, render: 0.05, total: 0.47 },
        scheduledPublishTime: '2026-08-31 19:30',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        updatedAt: new Date().toISOString(),
        retryCount: 0,
        selectedThumbnail: {
          id: 'thumb-t1',
          imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
          headlineText: '$0 TO 100K VIEWS?',
          predictedCtr: 11.2,
          colorScheme: 'Emerald Neon / Slate',
          focalPoint: 'Glowing AI Core & Rising Analytic Curve',
          isSelected: true,
        },
      },
    ],
  },
};

// Global singleton state
declare global {
  var __autotube_state__: ServerState | undefined;
}

export function getServerState(): ServerState {
  if (!globalThis.__autotube_state__) {
    globalThis.__autotube_state__ = {
      currentChannel: { ...disconnectedChannel },
      scheduleSettings: { ...defaultSchedule },
      agentLogs: [
        {
          id: 'log-boot',
          timestamp: new Date().toLocaleTimeString(),
          agentName: 'AutoTube System',
          action: 'Autonomous creation engine ready. Please connect or configure your YouTube channel.',
          status: 'info',
          durationMs: 220,
        },
      ],
      storedTrends: [],
      storedCompetitors: [],
      pipelineVideos: [],
    };
  }
  return globalThis.__autotube_state__;
}

export function addLog(
  agentName: string,
  action: string,
  status: 'info' | 'success' | 'warning' | 'error',
  details?: string,
  durationMs?: number
): AgentLog {
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

export function connectChannelState(config: Partial<ChannelProfile>): ChannelProfile {
  const state = getServerState();
  
  // Find if matching a known preset niche
  const targetNiche = (config.primaryNiche || '').toLowerCase();
  let matchedPreset: NicheTemplate | null = null;

  if (targetNiche.includes('game') || targetNiche.includes('esport')) {
    matchedPreset = NICHE_TEMPLATES.gaming;
  } else if (targetNiche.includes('finance') || targetNiche.includes('wealth') || targetNiche.includes('money')) {
    matchedPreset = NICHE_TEMPLATES.finance;
  } else if (targetNiche.includes('fit') || targetNiche.includes('health') || targetNiche.includes('workout')) {
    matchedPreset = NICHE_TEMPLATES.fitness;
  } else if (targetNiche.includes('mystery') || targetNiche.includes('crime') || targetNiche.includes('history')) {
    matchedPreset = NICHE_TEMPLATES.mystery;
  } else if (targetNiche.includes('ai') || targetNiche.includes('tech') || targetNiche.includes('software')) {
    matchedPreset = NICHE_TEMPLATES.tech_ai;
  }

  const channelName = config.channelName || matchedPreset?.channelName || 'My YouTube Channel';
  const handle = config.handle || matchedPreset?.handle || `@${channelName.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
  const primaryNiche = config.primaryNiche || matchedPreset?.primaryNiche || 'Content Creation & Tutorials';
  const subNiches = config.subNiches && config.subNiches.length > 0 
    ? config.subNiches 
    : matchedPreset?.subNiches || ['Tutorials', 'Breakdowns', 'Trending Topics'];
  const targetAudience = config.targetAudience || matchedPreset?.targetAudience || 'Enthusiasts, creators and active viewers';
  const contentStyle = config.contentStyle || matchedPreset?.contentStyle || 'High-retention viral pacing';
  const avatarUrl = config.avatarUrl || matchedPreset?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';
  const subscriberCount = config.subscriberCount !== undefined ? config.subscriberCount : (matchedPreset?.subscriberCount || 12500);
  const totalViews = config.totalViews !== undefined ? config.totalViews : (matchedPreset?.totalViews || 215000);

  state.currentChannel = {
    ...state.currentChannel,
    id: `chan-${Date.now()}`,
    channelName,
    handle: handle.startsWith('@') ? handle : `@${handle}`,
    avatarUrl,
    subscriberCount,
    totalViews,
    primaryNiche,
    subNiches,
    targetAudience,
    targetCountry: config.targetCountry || 'United States, Global',
    targetLanguage: config.targetLanguage || 'English',
    defaultVideoLength: config.defaultVideoLength || '8-10 mins (Long-form) & 50s (Shorts)',
    contentStyle,
    automationMode: config.automationMode || 'semi_auto',
    isAutopilotRunning: config.isAutopilotRunning !== undefined ? config.isAutopilotRunning : true,
    isConnected: true,
    authExpiry: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90).toISOString().split('T')[0],
    channelId: config.channelId || `UC_${Math.random().toString(36).substr(2, 10)}`,
    connectedEmail: config.connectedEmail || 'creator@youtube.com',
    uploadPrivacyDefault: config.uploadPrivacyDefault || 'unlisted',
    defaultCategoryId: config.defaultCategoryId || matchedPreset?.defaultCategoryId || '28',
    autoPublishEnabled: config.autoPublishEnabled !== undefined ? config.autoPublishEnabled : true,
    notifySubscribers: config.notifySubscribers !== undefined ? config.notifySubscribers : true,
    isMadeForKids: config.isMadeForKids !== undefined ? config.isMadeForKids : false,
    quotaUsedToday: 400,
    dailyQuotaLimit: 10000,
    connectionMethod: config.connectionMethod || 'oauth2',
  };

  // Seed niche-specific data
  if (matchedPreset) {
    state.storedTrends = [...matchedPreset.trends];
    state.storedCompetitors = [...matchedPreset.competitors];
    state.pipelineVideos = [...matchedPreset.pipelineVideos];
  } else {
    // Custom dynamic niche trends
    state.storedTrends = [
      {
        id: `trend-cust-1`,
        topic: `Top Viral Breakthroughs in ${primaryNiche}`,
        niche: primaryNiche,
        viralScore: 95,
        searchDemand: 'Very High',
        competition: 'Low',
        trendVelocity: 410,
        recommendedFormat: 'long_form',
        potentialTitle: `I Tested the #1 Method for ${primaryNiche} in 2026 (Shocking Result)`,
        estimatedAudience: `${primaryNiche} enthusiasts (2.1M reach)`,
        whyItPerforms: 'Direct authority proof and curiosity hook.',
        source: 'YouTube Trending',
        dateDiscovered: new Date().toISOString().split('T')[0],
        evergreenScore: 88,
        tags: [primaryNiche, 'Viral', '2026 Strategy'],
      },
    ];
    state.storedCompetitors = [
      {
        id: `comp-cust-1`,
        name: `${primaryNiche.split(' ')[0]} Masterclass`,
        handle: `@${primaryNiche.split(' ')[0].toLowerCase()}Leader`,
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        subscriberCount: '450K',
        videoCount: 120,
        averageViews: '95K',
        uploadFrequency: '2 videos / week',
        topVideos: [
          {
            title: `The Ultimate 2026 Guide to ${primaryNiche}`,
            views: '840K',
            daysAgo: '3 weeks ago',
            ctrEstimate: '10.2%',
            hookStyle: 'Fast question hook with visual proof',
          },
        ],
        workingPatterns: ['High-contrast thumbnails', 'Punchy 3-second intros'],
        contentGaps: ['Lacks automated step-by-step breakdowns'],
      },
    ];
    state.pipelineVideos = [
      {
        id: `vid-cust-1`,
        title: `The Complete Beginner's Guide to ${primaryNiche} (Step-by-Step)`,
        niche: primaryNiche,
        format: 'long_form',
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
        estimatedCost: { llm: 0.03, voice: 0.06, image: 0.1, videoGen: 0.15, render: 0.05, total: 0.39 },
        scheduledPublishTime: '2026-08-31 18:00',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        retryCount: 0,
        selectedThumbnail: {
          id: 'thumb-c1',
          imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
          headlineText: `MASTER ${primaryNiche.toUpperCase().slice(0, 12)}`,
          predictedCtr: 11.5,
          colorScheme: 'Electric Blue / Slate',
          focalPoint: 'Target icon and growth curve',
          isSelected: true,
        },
      },
    ];
  }

  addLog(
    'YouTube Gateway Agent',
    `Successfully linked YouTube channel "${state.currentChannel.channelName}" (${state.currentChannel.handle}). Recalibrated all AI research, scripts, and video pipelines for ${state.currentChannel.primaryNiche}.`,
    'success',
    `Niche: ${state.currentChannel.primaryNiche} | Mode: ${state.currentChannel.automationMode}`
  );

  return state.currentChannel;
}

export function disconnectChannelState(): ChannelProfile {
  const state = getServerState();
  const previousName = state.currentChannel.channelName || 'YouTube Channel';
  state.currentChannel = { ...disconnectedChannel };
  state.storedTrends = [];
  state.storedCompetitors = [];
  state.pipelineVideos = [];
  addLog(
    'YouTube Gateway Agent',
    `Disconnected "${previousName}". Auto-publishing paused. Channel reset to disconnected state.`,
    'warning'
  );
  return state.currentChannel;
}
