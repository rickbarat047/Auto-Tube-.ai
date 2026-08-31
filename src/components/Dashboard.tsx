import React from 'react';
import {
  Video,
  Eye,
  ThumbsUp,
  UserPlus,
  Percent,
  Clock,
  Flame,
  Sparkles,
  TrendingUp,
  Bot,
  Play,
  Calendar,
  DollarSign,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Youtube,
  Settings2,
  Film,
  Gamepad2,
  Dumbbell,
  Compass,
  ArrowRight,
  Plus,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';

const QUICK_PRESETS = [
  {
    id: 'gaming',
    channelName: 'PixelForge Gaming',
    handle: '@PixelForgeGaming',
    niche: 'Gaming & Esports Analytics',
    icon: Gamepad2,
    color: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
    category: '20',
  },
  {
    id: 'finance',
    channelName: 'WealthBlueprint',
    handle: '@WealthBlueprintHQ',
    niche: 'Finance & Wealth Building',
    icon: DollarSign,
    color: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
    category: '27',
  },
  {
    id: 'fitness',
    channelName: 'Apex Physique',
    handle: '@ApexPhysiqueScience',
    niche: 'Fitness & Health Science',
    icon: Dumbbell,
    color: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
    category: '26',
  },
  {
    id: 'mystery',
    channelName: 'Shadow Files',
    handle: '@ShadowFilesMystery',
    niche: 'History & Unsolved Mysteries',
    icon: Compass,
    color: 'border-rose-500/30 text-rose-400 bg-rose-500/10',
    category: '24',
  },
  {
    id: 'tech_ai',
    channelName: 'AutoTech Daily',
    handle: '@AutoTechDailyAI',
    niche: 'AI tools & Autonomous Tech',
    icon: Bot,
    color: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
    category: '28',
  },
];

export const Dashboard: React.FC = () => {
  const {
    analytics,
    channel,
    schedule,
    pipelineVideos,
    logs,
    setActiveView,
    createVideoFromTrend,
    trends,
    isGenerating,
    runFullPipelineForVideo,
    openYouTubeModal,
    openInspectModal,
    openPublishModal,
    openVideoPreview,
    refreshAll,
    showToast,
  } = useApp();

  const isConnected = channel?.isConnected;
  const activeVideos = pipelineVideos.filter((v) => v.currentStage !== 'published');
  const publishedVideos = pipelineVideos.filter((v) => v.currentStage === 'published');
  const readyOrScheduled = pipelineVideos.filter((v) => v.currentStage === 'ready' || v.currentStage === 'scheduled');
  const nextVideo = readyOrScheduled[0] || activeVideos[0];
  const bestVideo = pipelineVideos.find((v) => v.status === 'ready' || v.status === 'published') || pipelineVideos[0];

  const handleQuickConnect = async (preset: typeof QUICK_PRESETS[0]) => {
    try {
      showToast(`Connecting channel preset for ${preset.niche}...`, 'info');
      await api.connectYouTube({
        channelName: preset.channelName,
        handle: preset.handle,
        primaryNiche: preset.niche,
        defaultCategoryId: preset.category,
      });
      showToast(`Linked "${preset.channelName}" (${preset.niche})!`, 'success');
      await refreshAll();
    } catch (err: any) {
      showToast(err.message || 'Failed to connect channel', 'error');
    }
  };

  const stats = [
    {
      label: 'Total Views',
      value: isConnected && channel?.totalViews ? channel.totalViews.toLocaleString() : isConnected ? '0' : '—',
      change: isConnected ? '+24.6% this month' : 'Connect channel',
      icon: Eye,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
    },
    {
      label: 'Subscribers',
      value: isConnected && channel?.subscriberCount ? channel.subscriberCount.toLocaleString() : isConnected ? '0' : '—',
      change: isConnected ? '+12.4% gain' : 'Connect channel',
      icon: UserPlus,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      label: 'Channel Niche',
      value: isConnected ? channel.primaryNiche.split('&')[0].trim() : 'Not Set',
      change: isConnected ? `${channel.subNiches?.length || 0} sub-niches active` : 'Standby mode',
      icon: Flame,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
    },
    {
      label: 'Active Videos in Pipeline',
      value: pipelineVideos.length.toString(),
      change: isConnected ? `${readyOrScheduled.length} ready to upload` : '0 in production',
      icon: Clock,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* If Disconnected: Show Dedicated Channel Link & Niche Selector */}
      {!isConnected && (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-red-950/30 border border-red-500/30 relative overflow-hidden shadow-2xl space-y-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                  STANDBY MODE • NO CHANNEL LINKED
                </span>
              </div>
              <h2 className="text-xl font-black text-white tracking-tight">
                Connect Your YouTube Channel to Begin Autonomous Creation
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                AutoTube AI only generates research, trends, scripts, and video proxy previews tailored to the specific YouTube channel you link. Select your channel niche below or connect via Google OAuth.
              </p>
            </div>

            <button
              onClick={openYouTubeModal}
              className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap self-start lg:self-center"
            >
              <Youtube className="w-4 h-4 fill-white stroke-none" />
              <span>Connect Custom YouTube Channel</span>
            </button>
          </div>

          {/* 1-Click Niche Quick Selection Row */}
          <div className="pt-2 border-t border-slate-800/80">
            <span className="text-[11px] font-bold text-slate-400 block mb-2.5 uppercase tracking-wider">
              Or Quick-Connect a Channel by Niche (1-Click):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {QUICK_PRESETS.map((preset) => {
                const Icon = preset.icon;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleQuickConnect(preset)}
                    className="p-3 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all text-left flex items-start gap-2.5 cursor-pointer group"
                  >
                    <div className={`p-2 rounded-lg border flex-shrink-0 ${preset.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-200 group-hover:text-white truncate">
                        {preset.channelName}
                      </h4>
                      <p className="text-[10px] text-slate-400 truncate">{preset.niche}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* If Connected: Show Connected Channel Header Banner */}
      {isConnected && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800/90 to-slate-900 border border-slate-800 relative overflow-hidden shadow-xl">
          <div className="absolute right-0 top-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  CONNECTED: {channel.channelName} ({channel.handle})
                </span>
                <span className="text-xs text-slate-400">
                  Target Niche: <strong className="text-slate-200">{channel.primaryNiche}</strong>
                </span>
              </div>
              <h1 className="text-2xl font-black text-white tracking-tight">
                {channel.channelName} AI Command Center
              </h1>
              <p className="text-xs text-slate-400 leading-relaxed">
                Autonomous agent loops are calibrated for <strong>{channel.primaryNiche}</strong>. Continuously discovering viral opportunities, generating scripts, and rendering proxy video previews.
              </p>
            </div>

            {/* Quick Action Button Group */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={openYouTubeModal}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Settings2 className="w-4 h-4 text-slate-400" />
                <span>Manage Channel Link</span>
              </button>
              <button
                onClick={() => setActiveView('trends')}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Explore {channel.primaryNiche.split(' ')[0]} Trends</span>
              </button>
              <button
                onClick={() => setActiveView('pipeline')}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-red-600/25"
              >
                <Sparkles className="w-4 h-4" />
                <span>Open Pipeline</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">{stat.label}</span>
                <div className={`p-2 rounded-lg border ${stat.bg}`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </div>
              <div>
                <div className="text-2xl font-black text-white tracking-tight">{stat.value}</div>
                <div className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>{stat.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle Section: Best Performing / Queued Videos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active / Best Video Card */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                {isConnected ? 'Featured Video Project' : 'Content Simulator'}
              </h2>
            </div>
            {bestVideo && (
              <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 font-bold border border-amber-500/30">
                {bestVideo.selectedThumbnail?.predictedCtr ? `Predicted CTR: ${bestVideo.selectedThumbnail.predictedCtr}%` : 'High Viral Potential'}
              </span>
            )}
          </div>

          {bestVideo ? (
            <div className="flex flex-col sm:flex-row gap-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <img
                src={bestVideo.selectedThumbnail?.imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80'}
                alt="video thumbnail"
                className="w-full sm:w-44 h-28 object-cover rounded-lg border border-slate-700 flex-shrink-0"
              />
              <div className="space-y-2 flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {bestVideo.niche || 'General'}
                </span>
                <h3 className="text-sm font-bold text-slate-100 line-clamp-2 leading-snug">
                  {bestVideo.title}
                </h3>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => openVideoPreview(bestVideo)}
                    className="px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-200 border border-red-500/40 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Film className="w-3 h-3 text-red-400" />
                    <span>Watch Preview</span>
                  </button>
                  <button
                    onClick={() => openInspectModal(bestVideo)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all cursor-pointer"
                  >
                    Inspect Script & SEO
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-xl bg-slate-950/40 border border-dashed border-slate-800 text-center text-slate-400 text-xs space-y-2">
              <p>No video projects in pipeline.</p>
              <button
                onClick={() => setActiveView('trends')}
                className="text-red-400 hover:underline font-semibold"
              >
                Discover trending topics to create one →
              </button>
            </div>
          )}

          <p className="text-xs text-slate-400">
            💡 <strong className="text-slate-300">Niche Calibration:</strong> Video scripts and visual hooks dynamically match the tone and retention patterns of {channel?.primaryNiche || 'your target audience'}.
          </p>
        </div>

        {/* Next Scheduled Video Card & Quick Stage Action */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">Next Video in Pipeline</h2>
              </div>
              <span className="text-[11px] font-mono text-emerald-400">
                Stage: [{nextVideo?.currentStage?.toUpperCase() || 'STANDBY'}]
              </span>
            </div>

            {nextVideo ? (
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {nextVideo.format === 'short' ? '⚡ 50s YouTube Short' : '🎬 Long-Form Video'}
                    </span>
                    <h3 className="text-sm font-bold text-slate-100 mt-2">{nextVideo.title}</h3>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400">
                    Est. Cost: ${nextVideo.estimatedCost.total.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/60">
                  <span>Scheduled Time: Today, 19:30 UTC</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Safety Checked
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-slate-950/40 border border-dashed border-slate-800 text-center text-slate-400 text-xs">
                No videos currently queued. Select a trend from Trend Radar to begin.
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            {nextVideo && (
              <button
                onClick={() => openVideoPreview(nextVideo)}
                className="py-2 px-3 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-200 border border-red-500/40 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                title="Watch proxy preview of generated video"
              >
                <Film className="w-3.5 h-3.5 text-red-400" />
                <span>Video Preview</span>
              </button>
            )}

            {nextVideo && (
              <button
                onClick={() => openInspectModal(nextVideo)}
                className="flex-1 py-2 px-3 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-200 border border-indigo-500/40 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                title="See what the AI generated (Video simulator, Script, SEO, Thumbnails)"
              >
                <Eye className="w-3.5 h-3.5 text-indigo-400" />
                <span>Inspect AI</span>
              </button>
            )}

            {nextVideo && (nextVideo.currentStage === 'ready' || nextVideo.currentStage === 'scheduled') && (
              <button
                onClick={() => openPublishModal(nextVideo, 'inspect')}
                className="py-2 px-4 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-red-600/25"
              >
                <Youtube className="w-3.5 h-3.5" />
                <span>Publish Video</span>
              </button>
            )}

            {nextVideo && nextVideo.currentStage !== 'ready' && nextVideo.currentStage !== 'published' && (
              <button
                disabled={isGenerating}
                onClick={() => runFullPipelineForVideo(nextVideo.id)}
                className="py-2 px-3 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Auto-Run AI</span>
              </button>
            )}

            <button
              onClick={() => setActiveView('pipeline')}
              className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all cursor-pointer"
            >
              Pipeline
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section: Real-time Agent Activity Feed & Recent Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time AI Agent Activity Feed */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Live AI Agent Activity Feed</h2>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">Continuous Orchestration</span>
          </div>

          <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1 custom-scrollbar">
            {logs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-lg bg-slate-950/50 border border-slate-800/80 flex items-start justify-between gap-3 text-xs"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <div
                    className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                      log.status === 'success'
                        ? 'bg-emerald-400'
                        : log.status === 'warning'
                        ? 'bg-amber-400'
                        : log.status === 'error'
                        ? 'bg-red-400'
                        : 'bg-indigo-400'
                    }`}
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-200 font-mono text-[11px]">{log.agentName}</span>
                      {log.durationMs && (
                        <span className="text-[10px] text-slate-400 font-mono">{log.durationMs}ms</span>
                      )}
                    </div>
                    <p className="text-slate-300 mt-0.5 leading-relaxed">{log.action}</p>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">{log.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hot Trend Radar Snippet */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Top Viral Opportunities</h2>
            </div>
            <button
              onClick={() => setActiveView('trends')}
              className="text-xs text-red-400 hover:text-red-300 font-semibold cursor-pointer"
            >
              See all
            </button>
          </div>

          <div className="space-y-3">
            {trends.length > 0 ? (
              trends.slice(0, 3).map((trend) => (
                <div
                  key={trend.id}
                  className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-2 hover:border-slate-700 transition-all"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-400 font-mono">Score: {trend.viralScore}/100</span>
                    <span className="text-[10px] text-slate-400">{trend.source}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-200 line-clamp-2">{trend.potentialTitle}</p>
                  <button
                    disabled={isGenerating}
                    onClick={() => createVideoFromTrend(trend)}
                    className="w-full py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3 h-3 text-red-400" />
                    <span>Create Video Project</span>
                  </button>
                </div>
              ))
            ) : (
              <div className="p-6 rounded-lg bg-slate-950/40 border border-dashed border-slate-800 text-center text-xs text-slate-400 space-y-2">
                <p>No trends discovered yet.</p>
                <button
                  onClick={() => setActiveView('trends')}
                  className="text-red-400 hover:underline font-semibold"
                >
                  Scan Trends for Your Niche →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
