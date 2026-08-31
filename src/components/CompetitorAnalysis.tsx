import React, { useState } from 'react';
import {
  Swords,
  Search,
  Plus,
  TrendingUp,
  Eye,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  ChevronRight,
  Shield,
  Layers,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CompetitorChannel } from '../types';
import { api } from '../services/api';

export const CompetitorAnalysis: React.FC = () => {
  const { competitors, channel, showToast, refreshAll, setActiveView, isGenerating } = useApp();
  const [newHandle, setNewHandle] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [selectedCompetitor, setSelectedCompetitor] = useState<CompetitorChannel>(
    competitors[0] || {
      id: 'default-comp',
      name: 'ByteVelocity Insights',
      handle: '@ByteVelocity',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      subscriberCount: '580K',
      videoCount: 142,
      averageViews: '110K',
      uploadFrequency: '2 long-form + 4 shorts / week',
      topVideos: [],
      workingPatterns: [],
      contentGaps: [],
    }
  );

  const handleAddCompetitor = async () => {
    if (!newHandle.trim()) return;
    setIsAnalyzing(true);
    showToast(`AI Competitor Agent: Analyzing YouTube channel ${newHandle}...`, 'info');
    try {
      const res = await api.analyzeCompetitors(channel?.primaryNiche, newHandle.trim());
      if (res.success && res.competitor) {
        setSelectedCompetitor(res.competitor);
        setNewHandle('');
        showToast(`Analyzed ${res.competitor.name}! Identified ${res.competitor.contentGaps.length} exploitable gaps.`, 'success');
        refreshAll();
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to analyze competitor', 'error');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800/80 to-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Swords className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black text-white tracking-tight">Competitor Intelligence & Content Gaps</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Reverse-engineer high-performing competitor channels. Identify winning formats and hook psychology while discovering untapped content gaps to capture uncontested search traffic.
          </p>
        </div>

        {/* Add Channel Input */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <input
            type="text"
            placeholder="Enter YouTube @handle or channel URL..."
            value={newHandle}
            onChange={(e) => setNewHandle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddCompetitor()}
            className="bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-red-500 w-64"
          />
          <button
            disabled={isAnalyzing}
            onClick={handleAddCompetitor}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg transition-all shadow-md shadow-red-600/20 flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isAnalyzing ? 'Analyzing...' : 'Add Channel'}</span>
          </button>
        </div>
      </div>

      {/* Competitor Selector Bar */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1 custom-scrollbar">
        {competitors.map((comp) => (
          <button
            key={comp.id}
            onClick={() => setSelectedCompetitor(comp)}
            className={`p-3 rounded-xl border flex items-center gap-3 transition-all flex-shrink-0 cursor-pointer ${
              selectedCompetitor.id === comp.id
                ? 'bg-slate-800 border-red-500/50 shadow-md shadow-red-500/10'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
            }`}
          >
            <img src={comp.avatarUrl} alt={comp.name} className="w-9 h-9 rounded-full object-cover border border-slate-700" />
            <div className="text-left">
              <div className="text-xs font-bold text-slate-100">{comp.name}</div>
              <div className="text-[10px] text-slate-400 font-mono">
                {comp.subscriberCount} subs • {comp.averageViews} avg views
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Main Analysis Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: What Is Currently Working in This Niche */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
              </span>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                What Is Currently Working in This Niche?
              </h2>
            </div>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              High Conversion
            </span>
          </div>

          <div className="space-y-2.5">
            {selectedCompetitor.workingPatterns.map((pattern, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-start gap-2.5 text-xs">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-slate-300 leading-relaxed">{pattern}</p>
              </div>
            ))}
          </div>

          {/* Top Breakout Videos */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Top Performing Videos</h3>
            <div className="space-y-2">
              {selectedCompetitor.topVideos.map((video, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start justify-between gap-3 text-xs">
                  <div className="space-y-1 min-w-0">
                    <p className="font-semibold text-slate-200 line-clamp-1">"{video.title}"</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400">
                      <span className="text-emerald-400 font-mono font-semibold">{video.views} views</span>
                      <span>•</span>
                      <span>{video.daysAgo}</span>
                      <span>•</span>
                      <span className="text-amber-300">Est. CTR: {video.ctrEstimate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: What Content Gaps Can We Exploit */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                  <Lightbulb className="w-4 h-4" />
                </span>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                  What Content Gaps Can We Exploit?
                </h2>
              </div>
              <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                Uncontested Search
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Our AI competitor agent evaluated viewer comments, unanswered questions, and missing topics to identify high-demand vacuums.
            </p>

            <div className="space-y-2.5">
              {selectedCompetitor.contentGaps.map((gap, idx) => (
                <div key={idx} className="p-3.5 rounded-lg bg-slate-950/80 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                    <span className="text-slate-200 font-medium leading-relaxed">{gap}</span>
                  </div>
                  <button
                    onClick={() => {
                      showToast(`Transferred content gap to AI Content Strategist!`, 'info');
                      setActiveView('ideas');
                    }}
                    className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 text-[11px] font-semibold border border-slate-700 flex items-center gap-1 cursor-pointer flex-shrink-0 whitespace-nowrap"
                  >
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Generate Idea</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-300 flex items-center gap-2">
            <Shield className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>
              <strong>Zero Copying Guarantee:</strong> AutoTube AI synthesizes structural market insights to create 100% original scripts and visuals.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
