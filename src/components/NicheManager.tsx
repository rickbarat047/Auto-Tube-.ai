import React, { useState } from 'react';
import {
  Users,
  Target,
  Globe,
  Clock,
  Sparkles,
  Save,
  CheckCircle2,
  Plus,
  X,
  Layers,
  Sliders,
  TrendingUp,
  BrainCircuit,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';

const NICHE_PRESETS = [
  'AI tools & Autonomous Tech',
  'Technology & Hardware',
  'Finance & Wealth Building',
  'History & Unsolved Mysteries',
  'Interesting Facts & Curiosities',
  'Science & Future Space',
  'Productivity & Life Systems',
  'Business & Startup Breakdowns',
  'Gaming & Esports Analytics',
  'News Analysis & Geopolitics',
  'Deep Dive Documentaries',
  'Software & Coding Tutorials',
];

const CONTENT_STYLES = [
  { id: 'fast_viral', name: 'Fast-Paced Viral', desc: 'Kinetic typography, rapid pattern interrupts every 2-3s, high sensory engagement.' },
  { id: 'documentary', name: 'Deep Documentary', desc: 'Cinematic storytelling, orchestral cadence, investigative tension, immersive b-roll.' },
  { id: 'educational', name: 'Data-Backed Educational', desc: 'Clear diagrams, step-by-step logic, high authority voice, zero fluff.' },
  { id: 'news_explainer', name: 'News & Breaking Explainer', desc: 'Urgent journalistic tone, timeline tickers, live sentiment quotes.' },
  { id: 'minimalist', name: 'Minimalist & Direct', desc: 'Clean aesthetics, soft ambient music, punchy takeaways, subtle animations.' },
];

export const NicheManager: React.FC = () => {
  const { channel, showToast, refreshAll } = useApp();

  const [primaryNiche, setPrimaryNiche] = useState<string>(channel?.primaryNiche || NICHE_PRESETS[0]);
  const [subNiches, setSubNiches] = useState<string[]>(channel?.subNiches || ['AI Automation', 'Productivity Agents', 'Local Models']);
  const [newSubNiche, setNewSubNiche] = useState<string>('');
  const [targetAudience, setTargetAudience] = useState<string>(
    channel?.targetAudience || 'Tech builders, creators, developers, entrepreneurs aged 20-45 seeking actionable workflows'
  );
  const [targetCountry, setTargetCountry] = useState<string>(channel?.targetCountry || 'United States, Global Tier-1');
  const [targetLanguage, setTargetLanguage] = useState<string>(channel?.targetLanguage || 'English (US)');
  const [defaultVideoLength, setDefaultVideoLength] = useState<string>(channel?.defaultVideoLength || '8-10 mins (Long-form) & 50s (Shorts)');
  const [contentStyle, setContentStyle] = useState<string>(channel?.contentStyle || 'Fast-Paced Viral');
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleAddSubNiche = () => {
    if (newSubNiche.trim() && !subNiches.includes(newSubNiche.trim())) {
      setSubNiches([...subNiches, newSubNiche.trim()]);
      setNewSubNiche('');
    }
  };

  const handleRemoveSubNiche = (index: number) => {
    setSubNiches(subNiches.filter((_, i) => i !== index));
  };

  const handleSaveNiche = async () => {
    setIsSaving(true);
    try {
      const res = await api.updateChannel({
        primaryNiche,
        subNiches,
        targetAudience,
        targetCountry,
        targetLanguage,
        defaultVideoLength,
        contentStyle,
      });
      if (res.success) {
        showToast('Niche & audience profile updated! AI agent algorithms recalibrated.', 'success');
        refreshAll();
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to update niche', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800/80 to-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Users className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black text-white tracking-tight">Niche & Audience Intelligence</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Configure your YouTube channel's core positioning. The autonomous agents use these parameters to discover aligned topics, tailor hooks, and learn what performs best.
          </p>
        </div>

        <button
          disabled={isSaving}
          onClick={handleSaveNiche}
          className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-lg shadow-red-600/20 flex items-center gap-2 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Recalibrating Agent...' : 'Save & Calibrate AI'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Form Config */}
        <div className="lg:col-span-2 space-y-6">
          {/* Primary Niche Selection */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-red-400" />
                <span>Primary Channel Niche</span>
              </label>
              <span className="text-xs text-slate-400">Select or enter custom niche</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {NICHE_PRESETS.map((niche) => (
                <button
                  key={niche}
                  type="button"
                  onClick={() => setPrimaryNiche(niche)}
                  className={`p-2.5 rounded-lg text-xs text-left font-medium border transition-all cursor-pointer truncate ${
                    primaryNiche === niche
                      ? 'bg-red-500/15 border-red-500 text-white font-bold shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {niche}
                </button>
              ))}
            </div>

            <div className="pt-2">
              <input
                type="text"
                value={primaryNiche}
                onChange={(e) => setPrimaryNiche(e.target.value)}
                placeholder="Or type custom niche..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Sub-Niches & Keywords */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <label className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Target Sub-Niches & Micro-Topics</span>
            </label>
            <p className="text-xs text-slate-400">
              The AI uses these to identify specific content gaps and high-converting sub-categories.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {subNiches.map((sub, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-2"
                >
                  <span>{sub}</span>
                  <button
                    onClick={() => handleRemoveSubNiche(idx)}
                    className="text-slate-400 hover:text-red-400 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                placeholder="Add sub-niche (e.g. Local LLMs, Agent Frameworks)..."
                value={newSubNiche}
                onChange={(e) => setNewSubNiche(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddSubNiche()}
                className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-red-500"
              />
              <button
                type="button"
                onClick={handleAddSubNiche}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Target Audience & Demographics */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <label className="text-sm font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>Target Audience Profile & Market</span>
            </label>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Audience Description & Core Desires</label>
                <textarea
                  rows={2}
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Target Country / Region</label>
                  <input
                    type="text"
                    value={targetCountry}
                    onChange={(e) => setTargetCountry(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Target Primary Language</label>
                  <input
                    type="text"
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content Style Selector */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <label className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Production & Editing Style</span>
            </label>

            <div className="space-y-2">
              {CONTENT_STYLES.map((style) => (
                <div
                  key={style.id}
                  onClick={() => setContentStyle(style.name)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                    contentStyle === style.name
                      ? 'bg-purple-500/10 border-purple-500/50 text-white'
                      : 'bg-slate-950 border-slate-800/80 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-slate-200">{style.name}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{style.desc}</div>
                  </div>
                  {contentStyle === style.name && (
                    <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Self-Learning Niche Insights */}
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-emerald-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Self-Learning Memory</h2>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              AutoTube AI continuously refines its topic ranking weights based on your channel's historic CTR and retention data.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
              <div className="text-xs font-bold text-slate-200 flex items-center justify-between">
                <span>Top Performing Sub-Niche:</span>
                <span className="text-emerald-400 font-mono">11.4% Avg CTR</span>
              </div>
              <div className="text-xs text-indigo-300 font-medium bg-indigo-500/10 px-2.5 py-1 rounded border border-indigo-500/20">
                #AI-Agents & Autonomous Workflows
              </div>
              <p className="text-[11px] text-slate-400 leading-snug pt-1">
                Videos in this sub-niche outperformed general tech news by +68% in 48-hour view velocity.
              </p>
            </div>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-slate-950/60 text-slate-300">
                <span>Optimal Video Duration:</span>
                <strong className="text-slate-100">8m 15s - 9m 30s</strong>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950/60 text-slate-300">
                <span>Winning Hook Style:</span>
                <strong className="text-slate-100">Curiosity Experiment</strong>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950/60 text-slate-300">
                <span>Peak Publishing Window:</span>
                <strong className="text-emerald-400 font-mono">19:30 UTC</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
