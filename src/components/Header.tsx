import React from 'react';
import {
  Play,
  Pause,
  AlertOctagon,
  Activity,
  Plus,
  DollarSign,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ShieldAlert,
  Youtube,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header: React.FC<{ onNewProjectClick: () => void }> = ({ onNewProjectClick }) => {
  const {
    channel,
    toggleAutopilot,
    isLogDrawerOpen,
    setIsLogDrawerOpen,
    logs,
    analytics,
    activeVideo,
    pipelineVideos,
    setActiveVideoId,
    setActiveView,
    openYouTubeModal,
  } = useApp();

  const recentLog = logs[0];
  const isAutopilot = channel?.isAutopilotRunning;

  return (
    <header className="h-16 bg-slate-900/90 backdrop-blur border-b border-slate-800 px-6 flex items-center justify-between z-20">
      {/* Left: Active Project Selector & Live Log Snippet */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 font-medium whitespace-nowrap">Active Project:</label>
          <div className="relative">
            <select
              value={activeVideo?.id || ''}
              onChange={(e) => {
                setActiveVideoId(e.target.value);
                setActiveView('pipeline');
              }}
              aria-label="Active video project"
              className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-1.5 pr-8 appearance-none focus:outline-none focus:border-red-500 max-w-[240px] truncate"
            >
              {pipelineVideos.map((video) => (
                <option key={video.id} value={video.id}>
                  [{(video.currentStage || 'DRAFT').toUpperCase()}] {video.title}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Live Ticker */}
        {recentLog && (
          <div
            onClick={() => setIsLogDrawerOpen(true)}
            className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300 cursor-pointer hover:border-slate-500 transition-colors max-w-[280px] truncate"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <span className="text-[11px] font-mono text-emerald-400 font-semibold">{recentLog.agentName}:</span>
            <span className="text-[11px] text-slate-300 truncate">{recentLog.action}</span>
          </div>
        )}
      </div>

      {/* Right Controls: YouTube Connection, Cost, Activity Logs, Autopilot & Emergency STOP */}
      <div className="flex items-center gap-3">
        {/* Accessible YouTube Channel Connection Trigger & Status */}
        <button
          id="youtube-channel-trigger"
          onClick={openYouTubeModal}
          aria-label={
            channel?.isConnected
              ? `Connected YouTube Channel: ${channel.channelName}. Click to manage channel and OAuth connection.`
              : 'Connect YouTube Channel via Google OAuth 2.0'
          }
          aria-haspopup="dialog"
          title={
            channel?.isConnected
              ? `YouTube Channel: ${channel.channelName} (${channel.handle || '@AutoTechDailyAI'})\nStatus: Authenticated (OAuth 2.0)\nClick to manage settings or change channel.`
              : 'Link your YouTube channel via Google OAuth 2.0 to enable autonomous uploads.'
          }
          className={`group flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
            channel?.isConnected
              ? 'bg-slate-800/90 hover:bg-slate-750 border-slate-700/90 text-slate-100 hover:border-red-500/50 shadow-sm'
              : 'bg-gradient-to-r from-red-950/60 via-red-900/40 to-slate-900 border-red-500/50 text-red-100 hover:border-red-400 hover:from-red-900/60 shadow-md shadow-red-950/40 animate-pulse'
          }`}
        >
          {/* YouTube Icon Container */}
          <div className="w-5 h-5 rounded-md bg-red-600 flex items-center justify-center text-white flex-shrink-0 shadow-sm shadow-red-600/40 group-hover:scale-105 transition-transform">
            <Youtube className="w-3.5 h-3.5 fill-white stroke-none" />
          </div>

          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xs leading-none text-white max-w-[130px] sm:max-w-[160px] truncate">
                {channel?.isConnected ? channel.channelName : 'Connect YouTube'}
              </span>
              {channel?.isConnected ? (
                <span
                  className="w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-400/30 flex-shrink-0"
                  aria-label="Channel Active"
                />
              ) : (
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-extrabold uppercase bg-red-500 text-white rounded font-mono leading-none">
                  OAuth
                </span>
              )}
            </div>
            {channel?.isConnected ? (
              <span className="text-[10px] text-slate-400 leading-tight font-mono hidden md:inline truncate max-w-[140px]">
                {channel.handle || '@channel'}
              </span>
            ) : (
              <span className="text-[10px] text-amber-300 leading-tight hidden md:inline">
                Link account to publish
              </span>
            )}
          </div>
        </button>

        {/* Cost Tracker Badge */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300">
          <DollarSign className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-slate-400">Cost:</span>
          <span className="font-semibold font-mono text-amber-300">
            ${analytics?.totalEstimatedCost?.toFixed(2) || '3.84'}
          </span>
        </div>

        {/* Real-time Agent Activity Logs Drawer Button */}
        <button
          onClick={() => setIsLogDrawerOpen(!isLogDrawerOpen)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
            isLogDrawerOpen
              ? 'bg-slate-700 text-white border-slate-600'
              : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700/80'
          }`}
        >
          <Activity className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline">Logs</span>
          <span className="px-1.5 py-0.2 bg-indigo-500/20 text-indigo-300 rounded-full text-[10px] font-bold">
            {logs.length}
          </span>
        </button>

        {/* New Video Button */}
        <button
          onClick={onNewProjectClick}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-semibold rounded-lg shadow-sm shadow-red-500/20 transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Video</span>
        </button>

        {/* Autopilot Controller & Emergency Stop */}
        <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5">
          <button
            onClick={() => toggleAutopilot(!isAutopilot)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              isAutopilot
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isAutopilot ? <Play className="w-3 h-3 fill-slate-950 stroke-none" /> : <Pause className="w-3 h-3" />}
            <span>{isAutopilot ? 'Autopilot ON' : 'Paused'}</span>
          </button>

          {/* Emergency Stop Button */}
          <button
            onClick={() => toggleAutopilot(false, true)}
            title="Emergency Kill Switch: Stops all ongoing autonomous actions immediately"
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-red-400 hover:bg-red-500/20 rounded-md transition-colors"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden 2xl:inline">STOP</span>
          </button>
        </div>
      </div>
    </header>
  );
};

