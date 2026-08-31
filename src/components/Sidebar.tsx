'use client';

import React from 'react';
import {
  LayoutDashboard,
  Radar,
  Users,
  Swords,
  Lightbulb,
  FileText,
  Mic,
  Video,
  Image,
  Sparkles,
  Kanban,
  ShieldCheck,
  BarChart3,
  Bot,
  Sliders,
  PlugZap,
  Youtube,
  Radio,
  Clock,
  DollarSign,
  Plus,
  Eye,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Sidebar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    channel,
    pipelineVideos,
    activeVideo,
    openInspectModal,
  } = useApp();

  const inProductionCount = pipelineVideos.filter(
    (v) => v.currentStage !== 'published' && v.currentStage !== 'ready'
  ).length;
  const readyCount = pipelineVideos.filter(
    (v) => v.currentStage === 'ready' || v.currentStage === 'scheduled'
  ).length;

  return (
    <aside className="w-64 flex-shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col h-screen select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 via-red-500 to-amber-500 flex items-center justify-center shadow-lg shadow-red-500/20 text-white font-black tracking-tight flex-shrink-0">
            <Youtube className="w-5 h-5 fill-white stroke-none" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white tracking-wide text-base">AutoTube</span>
              <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                AI
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium truncate max-w-[130px]">Autonomous Studio</p>
          </div>
        </div>
      </div>

      {/* Connected Channel Quick Card */}
      <div className="mx-3 mt-3 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <img
            src={channel?.avatarUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80'}
            alt="avatar"
            className="w-7 h-7 rounded-full object-cover border border-slate-600 flex-shrink-0"
          />
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-200 truncate">{channel?.channelName || 'Connected Channel'}</p>
            <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              {channel?.subscriberCount?.toLocaleString() || '24.6K'} subs
            </p>
          </div>
        </div>
        <span
          className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
            channel?.isAutopilotRunning
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
          }`}
        >
          {channel?.isAutopilotRunning ? 'Auto' : 'Manual'}
        </span>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 custom-scrollbar">
        {/* Section 1: Overview */}
        <div className="space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1 flex items-center justify-between">
            <span>Overview & Board</span>
          </div>

          <button
            onClick={() => setActiveView('dashboard')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeView === 'dashboard'
                ? 'bg-red-500/15 text-white font-semibold border border-red-500/30 shadow-sm shadow-red-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <LayoutDashboard className={`w-4 h-4 ${activeView === 'dashboard' ? 'text-red-400' : 'text-slate-400'}`} />
              <span>Dashboard</span>
            </div>
          </button>

          <button
            onClick={() => setActiveView('pipeline')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeView === 'pipeline'
                ? 'bg-red-500/15 text-white font-semibold border border-red-500/30 shadow-sm shadow-red-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Kanban className={`w-4 h-4 ${activeView === 'pipeline' ? 'text-red-400' : 'text-slate-400'}`} />
              <span>Content Pipeline</span>
            </div>
            {inProductionCount > 0 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {inProductionCount} Active
              </span>
            )}
          </button>
        </div>

        {/* Section 2: AI Creation Studios */}
        <div className="space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
            Creation Studios (Steps 1–7)
          </div>

          {[
            { id: 'trends', label: '1. Trend Radar', icon: Radar, badge: 'Live AI' },
            { id: 'niche', label: 'Niche System', icon: Users, badge: undefined },
            { id: 'competitors', label: 'Competitor Intel', icon: Swords, badge: undefined },
            { id: 'ideas', label: '2. AI Strategist (Ideas)', icon: Lightbulb, badge: undefined },
            { id: 'scripts', label: '3. Script Generator', icon: FileText, badge: undefined },
            { id: 'voice', label: '4. Voiceover (TTS)', icon: Mic, badge: undefined },
            { id: 'editor', label: '5. Auto Video Editor', icon: Video, badge: undefined },
            { id: 'thumbnails', label: '6. Thumbnail AI', icon: Image, badge: undefined },
            { id: 'seo', label: '7. YouTube SEO Agent', icon: Sparkles, badge: undefined },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-red-500/15 text-white font-semibold border border-red-500/30 shadow-sm shadow-red-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-red-400' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 animate-pulse">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Section 3: Operations & Channels */}
        <div className="space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
            Autopilot & Security
          </div>

          {[
            { id: 'quality', label: 'Quality & Policy Audit', icon: ShieldCheck, badge: undefined },
            { id: 'analytics', label: 'Analytics Intelligence', icon: BarChart3, badge: undefined },
            {
              id: 'automation',
              label: 'Autopilot Scheduler',
              icon: Sliders,
              badge: channel?.isAutopilotRunning ? 'ACTIVE' : 'PAUSED',
            },
            { id: 'api_connections', label: 'API & OAuth Channels', icon: PlugZap, badge: undefined },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-red-500/15 text-white font-semibold border border-red-500/30 shadow-sm shadow-red-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-red-400' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-slate-800 text-slate-300 border border-slate-700">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Sticky Quick Preview Button */}
      {activeVideo && (
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/60">
          <button
            onClick={() => openInspectModal(activeVideo)}
            className="w-full py-2 px-3 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-200 border border-indigo-500/40 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <Eye className="w-3.5 h-3.5 text-indigo-400" />
            <span>See What AI Created</span>
          </button>
        </div>
      )}
    </aside>
  );
};
