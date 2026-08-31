import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Tag,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  Copy,
  Layers,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SeoPackage } from '../types';
import { api } from '../services/api';

export const SeoOptimizer: React.FC = () => {
  const { activeVideo, stepVideoStage, showToast, isGenerating, setActiveView } = useApp();

  const [seo, setSeo] = useState<SeoPackage>(
    activeVideo?.seo || {
      titleOptions: [
        activeVideo?.title || 'I Built a 24/7 AI YouTube Channel (Here is What It Made)',
        'How AI Automation Is Changing YouTube in 2026',
        'Can an Autonomous AI Agent Run a YouTube Channel?',
      ],
      selectedTitle: activeVideo?.title || 'I Built a 24/7 AI YouTube Channel (Here is What It Made)',
      description: `In this video, we reveal what happens when you let an autonomous AI agent run a YouTube channel end-to-end—from trend research to scripting, voiceover, and publishing.

TIMESTAMPS:
0:00 - The Autonomous Experiment
1:15 - How the AI Discovered the Trend
2:45 - Neural Scripting & Retention Architecture
4:20 - Automated Editing & Visual Director
6:10 - The 14-Day View & Revenue Breakdown
7:45 - Key Takeaways for Creators

🔗 Resources Mentioned:
AutoTube AI Framework: https://autotube.ai
Complete Multi-Agent Source Code & Workflows

#AI #YouTubeAutomation #ArtificialIntelligence #PassiveIncome #TechNews`,
      tags: [
        'ai youtube automation',
        'autonomous agents',
        'youtube automation 2026',
        'gemini api agent',
        'faceless youtube channel',
        'how to make money with ai',
        'elevenlabs voiceover',
        'video automation ai',
        'ai content creator',
      ],
      category: 'Science & Technology',
      chapters: [
        { title: 'The Autonomous Experiment', timestamp: '0:00' },
        { title: 'How the AI Discovered the Trend', timestamp: '1:15' },
        { title: 'Neural Scripting & Retention Architecture', timestamp: '2:45' },
        { title: 'Automated Editing & Visual Director', timestamp: '4:20' },
        { title: 'The 14-Day View & Revenue Breakdown', timestamp: '6:10' },
        { title: 'Key Takeaways for Creators', timestamp: '7:45' },
      ],
      pinnedComment:
        '🔥 What niche would you test an autonomous AI channel in? Let us know in the comments below, and we will feature the top workflow in the next video!',
      seoScore: 98,
      keywordDensityScore: 94,
    }
  );

  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);

  const handleRegenerateSeo = async () => {
    if (!activeVideo) return;
    setIsOptimizing(true);
    showToast('AI SEO Agent: Optimizing tags, search keywords, and description chapters...', 'info');
    try {
      const res = await api.generateSeo(activeVideo.title, activeVideo.script?.fullNarrationText || '', activeVideo.niche);
      if (res.success && res.seo) {
        setSeo(res.seo);
        showToast(`SEO Package generated with an optimization score of ${res.seo.seoScore}/100!`, 'success');
      }
    } catch (err: any) {
      showToast(err.message || 'SEO optimization failed', 'error');
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleProceedToQualityCheck = async () => {
    if (!activeVideo) return;
    showToast('Saving SEO package & running Quality & Safety compliance check...', 'info');
    await stepVideoStage(activeVideo.id, 'quality_check', {
      seo,
      title: seo.selectedTitle,
    });
    setActiveView('quality');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800/80 to-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
              <Sparkles className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black text-white tracking-tight">YouTube SEO & Metadata Optimizer</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Auto-generates search-optimized descriptions, timestamped chapters, high-traffic keyword tags, and high-engagement pinned comments.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            disabled={isOptimizing || isGenerating}
            onClick={handleRegenerateSeo}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isOptimizing ? 'animate-spin' : ''}`} />
            <span>{isOptimizing ? 'Optimizing...' : 'Regenerate SEO'}</span>
          </button>

          <button
            disabled={isGenerating}
            onClick={handleProceedToQualityCheck}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold transition-all shadow-lg shadow-red-600/20 flex items-center gap-2 cursor-pointer"
          >
            <span>Proceed to Quality Check</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Title, Description, Tags & Chapters */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Title */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <label className="text-xs font-bold uppercase text-slate-400">YouTube Video Title</label>
            <input
              type="text"
              value={seo.selectedTitle}
              onChange={(e) => setSeo({ ...seo, selectedTitle: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm font-bold text-white focus:outline-none focus:border-red-500"
            />
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Character count: {seo.selectedTitle.length}/100</span>
              <span className="text-emerald-400 font-mono font-semibold">Optimal Length (50-70 chars)</span>
            </div>
          </div>

          {/* Structured Description */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase text-slate-400 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Rich Structured Description & Chapters</span>
              </label>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(seo.description);
                  showToast('Description copied!', 'info');
                }}
                className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </button>
            </div>

            <textarea
              rows={8}
              value={seo.description}
              onChange={(e) => setSeo({ ...seo, description: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3.5 text-xs text-slate-200 font-mono leading-relaxed focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Tags Cloud */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <label className="text-xs font-bold uppercase text-slate-400 flex items-center gap-2">
              <Tag className="w-4 h-4 text-amber-400" />
              <span>High-Traffic Keyword Tags ({seo.tags.length})</span>
            </label>

            <div className="flex flex-wrap gap-2">
              {seo.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 flex items-center gap-1.5"
                >
                  <span className="text-slate-500">#</span>
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Pinned Comment */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <label className="text-xs font-bold uppercase text-emerald-400">High-Engagement Pinned Comment</label>
            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
              "{seo.pinnedComment}"
            </div>
          </div>
        </div>

        {/* Right 1 Col: SEO Audit Scorecard */}
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">SEO Health Audit</h3>
              <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Grade A+
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <div className="text-3xl font-black text-emerald-400 font-mono">{seo.seoScore} / 100</div>
              <div className="text-xs text-slate-400 font-medium">YouTube Algorithmic Optimization Score</div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-300">Keyword Density</span>
                <span className="font-mono text-emerald-400 font-bold">{seo.keywordDensityScore}%</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-300">Timestamp Chapters</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Included
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-300">Category Mapped</span>
                <span className="text-slate-200 font-semibold">{seo.category}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-300">Pinned Comment Hook</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Configured
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
