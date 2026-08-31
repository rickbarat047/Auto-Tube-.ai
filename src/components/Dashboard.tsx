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
} from 'lucide-react';
import { useApp } from '../context/AppContext';

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
  } = useApp();

  const activeVideos = pipelineVideos.filter((v) => v.currentStage !== 'published');
  const publishedVideos = pipelineVideos.filter((v) => v.currentStage === 'published');
  const readyOrScheduled = pipelineVideos.filter((v) => v.currentStage === 'ready' || v.currentStage === 'scheduled');
  const nextVideo = readyOrScheduled[0] || activeVideos[0];

  const stats = [
    {
      label: 'Total Views',
      value: analytics?.totalViews ? analytics.totalViews.toLocaleString() : '547,350',
      change: '+28.4%',
      icon: Eye,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
    },
    {
      label: 'Subscribers Gained',
      value: analytics?.totalSubscribers ? analytics.totalSubscribers.toLocaleString() : '18,450',
      change: '+14.2%',
      icon: UserPlus,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      label: 'Average CTR',
      value: `${analytics?.averageCtr || 8.7}%`,
      change: '2.3x benchmark',
      icon: Percent,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
    },
    {
      label: 'Avg Viewer Retention',
      value: `${analytics?.averageRetention || 64.8}%`,
      change: '+18.6% vs niche',
      icon: Clock,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
    },
  ];

  const secondaryStats = [
    { label: 'Videos Created', value: pipelineVideos.length, icon: Video },
    { label: 'Published', value: publishedVideos.length, icon: CheckCircle2 },
    { label: 'Scheduled', value: readyOrScheduled.length, icon: Calendar },
    { label: 'Est. Total Cost', value: `$${analytics?.totalEstimatedCost?.toFixed(2) || '3.84'}`, icon: DollarSign },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner / Autopilot Status */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800/90 to-slate-900 border border-slate-800 relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
                Autopilot Mode: {channel?.automationMode?.toUpperCase() || 'SEMI-AUTO'}
              </span>
              <span className="text-xs text-slate-400">
                Target Niche: <strong className="text-slate-200">{channel?.primaryNiche}</strong>
              </span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Autonomous AI YouTube Command Center
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              AutoTube AI is actively monitoring YouTube trends, analyzing competitors, drafting original scripts, generating neural voiceovers, and optimizing SEO metadata.
            </p>
          </div>

          {/* Quick Action Button Group */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={openYouTubeModal}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm border ${
                channel?.isConnected
                  ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                  : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border-amber-500/40'
              }`}
            >
              <Youtube className="w-4 h-4 fill-red-500 text-red-500" />
              <span>{channel?.isConnected ? `Channel: ${channel.channelName}` : 'Connect YouTube Account'}</span>
            </button>
            <button
              onClick={() => setActiveView('trends')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Explore Trend Radar</span>
            </button>
            <button
              onClick={() => setActiveView('pipeline')}
              className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-red-600/25"
            >
              <Sparkles className="w-4 h-4" />
              <span>Open Content Pipeline</span>
            </button>
          </div>
        </div>
      </div>

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

      {/* Secondary Quick Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {secondaryStats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/60 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-800 text-slate-300">
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] text-slate-400">{item.label}</div>
                <div className="text-base font-bold text-slate-100">{item.value}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle Section: Best Performing Video & Next Scheduled Video */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Best Performing Video Card */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Best-Performing Autonomous Video</h2>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 font-bold border border-amber-500/30">
              Top CTR (11.2%)
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80"
              alt="best video thumbnail"
              className="w-full sm:w-44 h-28 object-cover rounded-lg border border-slate-700 flex-shrink-0"
            />
            <div className="space-y-2 flex-1 min-w-0">
              <h3 className="text-sm font-bold text-slate-100 line-clamp-2 leading-snug">
                I Built a 24/7 AI YouTube Channel (Here is What It Made)
              </h3>
              <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Views</div>
                  <div className="font-bold text-slate-200">89.4K</div>
                </div>
                <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Retention</div>
                  <div className="font-bold text-purple-400">71.4%</div>
                </div>
                <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Subs</div>
                  <div className="font-bold text-emerald-400">+1,420</div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            💡 <strong className="text-slate-300">AI Intelligence Insight:</strong> High curiosity hook in the first 6s generated a 22% higher retention hold throughout the 8-minute runtime.
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
                      {nextVideo.format === 'short' ? '⚡ 50s YouTube Short' : '🎬 Long-Form Video (8m)'}
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

          <div className="flex items-center gap-3 pt-2">
            {nextVideo && nextVideo.currentStage !== 'ready' && nextVideo.currentStage !== 'published' && (
              <button
                disabled={isGenerating}
                onClick={() => runFullPipelineForVideo(nextVideo.id)}
                className="flex-1 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Run Autonomous Pipeline Now</span>
              </button>
            )}
            <button
              onClick={() => setActiveView('pipeline')}
              className="py-2.5 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all cursor-pointer"
            >
              View Full Pipeline
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section: Real-time Agent Activity Feed & Recent Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time AI Agent Activity Feed (Mandatory per Section 1) */}
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
            {trends.slice(0, 3).map((trend) => (
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
