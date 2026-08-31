import React, { useState } from 'react';
import {
  Radar,
  Flame,
  Search,
  RefreshCw,
  Sparkles,
  TrendingUp,
  SlidersHorizontal,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  Zap,
  Globe,
  Radio,
  Clock,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TrendingTopic, ContentFormat } from '../types';
import { api } from '../services/api';

export const TrendRadar: React.FC = () => {
  const { trends, createVideoFromTrend, channel, isGenerating, showToast, refreshAll } = useApp();
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);

  const handleScanTrends = async () => {
    setIsScanning(true);
    showToast('AI Research Agent: Scanning YouTube, Reddit, Google Trends, and Competitor Signals...', 'info');
    try {
      const res = await api.discoverTrends(channel?.primaryNiche, channel?.subNiches);
      if (res.success) {
        showToast(`Discovered ${res.trends.length} fresh viral opportunities!`, 'success');
        refreshAll();
      }
    } catch (err: any) {
      showToast(err.message || 'Trend scan failed', 'error');
    } finally {
      setIsScanning(false);
    }
  };

  const filteredTrends = trends.filter((t) => {
    if (selectedFormat !== 'all' && t.recommendedFormat !== selectedFormat) return false;
    if (selectedSource !== 'all' && t.source !== selectedSource) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        t.topic.toLowerCase().includes(query) ||
        t.potentialTitle.toLowerCase().includes(query) ||
        t.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800/80 to-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
              <Radar className="w-5 h-5 animate-spin-slow" />
            </span>
            <h1 className="text-xl font-black text-white tracking-tight">Viral Trend Radar</h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Monitoring
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Autonomous multi-source scanner analyzing search demand velocity, audience interest surges, competition vacuums, and breakout topics for{' '}
            <strong className="text-slate-200">{channel?.primaryNiche}</strong>.
          </p>
        </div>

        <button
          disabled={isScanning || isGenerating}
          onClick={handleScanTrends}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold transition-all shadow-lg shadow-red-600/20 flex items-center gap-2 cursor-pointer flex-shrink-0"
        >
          <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
          <span>{isScanning ? 'Scanning 14 Sources...' : 'Scan Fresh Viral Trends'}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search topics, titles, keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-red-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Format Filter */}
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-xs font-semibold text-slate-400">
            <button
              onClick={() => setSelectedFormat('all')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                selectedFormat === 'all' ? 'bg-slate-800 text-white' : 'hover:text-slate-200'
              }`}
            >
              All Formats
            </button>
            <button
              onClick={() => setSelectedFormat('long_form')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                selectedFormat === 'long_form' ? 'bg-slate-800 text-white' : 'hover:text-slate-200'
              }`}
            >
              Long-Form
            </button>
            <button
              onClick={() => setSelectedFormat('short')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                selectedFormat === 'short' ? 'bg-slate-800 text-white' : 'hover:text-slate-200'
              }`}
            >
              Shorts
            </button>
          </div>

          {/* Source Filter */}
          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-red-500"
          >
            <option value="all">All Data Sources</option>
            <option value="YouTube Trending">YouTube Trending</option>
            <option value="Google Trends">Google Trends</option>
            <option value="Reddit">Reddit Buzz</option>
            <option value="Competitor Signal">Competitor Signal</option>
            <option value="News/Web">News & Tech Web</option>
          </select>
        </div>
      </div>

      {/* Trend Cards Grid (Strictly meeting Section 2 requirements) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredTrends.map((trend) => (
          <div
            key={trend.id}
            className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 group relative overflow-hidden"
          >
            {/* Top Bar: Viral Score & Velocity */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-black text-sm flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-emerald-400" />
                    <span>{trend.viralScore} / 100</span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" />
                    <span>+{trend.trendVelocity}% Velocity</span>
                  </span>
                </div>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {trend.source}
                </span>
              </div>

              {/* Topic & Potential Title */}
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Topic: {trend.topic}
                </span>
                <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors mt-1 line-clamp-2 leading-snug">
                  "{trend.potentialTitle}"
                </h3>
              </div>

              {/* Demand & Competition Meters */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <div className="text-[10px] text-slate-400">Demand</div>
                  <div className="font-bold text-slate-200">{trend.searchDemand}</div>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <div className="text-[10px] text-slate-400">Competition</div>
                  <div className={`font-bold ${trend.competition === 'Low' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {trend.competition}
                  </div>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <div className="text-[10px] text-slate-400">Format</div>
                  <div className="font-bold text-indigo-300 uppercase text-[10px]">
                    {trend.recommendedFormat === 'short' ? 'Short (50s)' : 'Long-Form'}
                  </div>
                </div>
              </div>

              {/* Why It Performs */}
              <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span>Why This Topic Will Perform</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{trend.whyItPerforms}</p>
                <div className="text-[10px] text-slate-400 pt-1">
                  Estimated Audience: <span className="text-slate-300 font-medium">{trend.estimatedAudience}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {trend.tags.map((tag, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 font-mono">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions: Manual Approve or Autonomous Produce */}
            <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
              <button
                disabled={isGenerating}
                onClick={() => createVideoFromTrend(trend)}
                className="flex-1 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-md shadow-red-600/20 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Approve & Auto-Produce</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
