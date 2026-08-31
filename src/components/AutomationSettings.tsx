import React, { useState } from 'react';
import {
  Sliders,
  Calendar,
  Clock,
  DollarSign,
  ShieldAlert,
  Play,
  Pause,
  CheckCircle2,
  AlertTriangle,
  Save,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const AutomationSettings: React.FC = () => {
  const { channel, schedule, toggleAutopilot, showToast, refreshAll } = useApp();

  const [automationMode, setAutomationMode] = useState<string>(channel?.automationMode || 'semi_auto');
  const [videosPerWeek, setVideosPerWeek] = useState<number>(schedule?.videosPerWeek || 5);
  const [shortsPerWeek, setShortsPerWeek] = useState<number>(schedule?.shortsPerWeek || 7);
  const [preferredPublishHourUtc, setPreferredPublishHourUtc] = useState<number>(schedule?.preferredPublishHourUtc || 19);
  const [activeDays, setActiveDays] = useState<string[]>(schedule?.activeDays || ['Monday', 'Wednesday', 'Friday']);
  const [maxCostPerVideo, setMaxCostPerVideo] = useState<number>(schedule?.maxCostPerVideo || 1.5);
  const [monthlyBudgetCap, setMonthlyBudgetCap] = useState<number>(schedule?.monthlyBudgetCap || 50.0);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const isAutopilot = channel?.isAutopilotRunning;

  const toggleDay = (day: string) => {
    if (activeDays.includes(day)) {
      setActiveDays(activeDays.filter((d) => d !== day));
    } else {
      setActiveDays([...activeDays, day]);
    }
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      await api.updateChannel({
        automationMode: automationMode as any,
      });
      await api.updateSchedule({
        videosPerWeek,
        shortsPerWeek,
        preferredPublishHourUtc,
        activeDays,
        maxCostPerVideo,
        monthlyBudgetCap,
      });
      showToast('Automation and scheduler settings updated successfully!', 'success');
      refreshAll();
    } catch (err: any) {
      showToast(err.message || 'Failed to update settings', 'error');
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
              <Sliders className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black text-white tracking-tight">Autopilot & Publishing Scheduler</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Configure upload cadence, target publishing windows, cost caps, and approval guardrails for autonomous video creation.
          </p>
        </div>

        <button
          disabled={isSaving}
          onClick={handleSaveSettings}
          className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-lg shadow-red-600/20 flex items-center gap-2 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      {/* Prominent Emergency Kill Switch & Status Bar (Section 18) */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-red-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${isAutopilot ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <h2 className="text-base font-bold text-white">
              Autonomous Autopilot Engine: {isAutopilot ? 'ACTIVE & MONITORING' : 'PAUSED'}
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Emergency Kill Switch immediately terminates all running multi-agent tasks and switches to manual mode.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => toggleAutopilot(!isAutopilot)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md ${
              isAutopilot
                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
            }`}
          >
            {isAutopilot ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-slate-950" />}
            <span>{isAutopilot ? 'Pause Autopilot' : 'Resume Autopilot'}</span>
          </button>

          <button
            onClick={() => toggleAutopilot(false, true)}
            className="px-4 py-2.5 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/40 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span>EMERGENCY STOP</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Operating Modes & Schedule */}
        <div className="lg:col-span-2 space-y-6">
          {/* Operating Mode Selector (Section 17) */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Operating Mode & Human-In-The-Loop Level
            </h2>

            <div className="space-y-3">
              {/* Option 1: Full Auto */}
              <div
                onClick={() => setAutomationMode('full_auto')}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                  automationMode === 'full_auto'
                    ? 'bg-red-500/10 border-red-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-slate-100 flex items-center gap-2">
                    <span>1. Fully Autonomous Mode</span>
                    <span className="px-2 py-0.2 rounded bg-red-500/20 text-red-400 text-[10px]">Hands-Free</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    AI discovers trends, drafts scripts, renders videos, optimizes SEO, and publishes on schedule without manual intervention.
                  </p>
                </div>
                {automationMode === 'full_auto' && <CheckCircle2 className="w-5 h-5 text-red-400 flex-shrink-0" />}
              </div>

              {/* Option 2: Semi-Auto (Default per guidelines) */}
              <div
                onClick={() => setAutomationMode('semi_auto')}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                  automationMode === 'semi_auto'
                    ? 'bg-emerald-500/10 border-emerald-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-slate-100 flex items-center gap-2">
                    <span>2. Semi-Autonomous (Human Approval Required)</span>
                    <span className="px-2 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                      Recommended
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    AI completes research, writing, voiceover, and editing. Video waits in "Ready" status for your one-click signoff before publishing.
                  </p>
                </div>
                {automationMode === 'semi_auto' && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
              </div>

              {/* Option 3: Manual Assist */}
              <div
                onClick={() => setAutomationMode('manual')}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                  automationMode === 'manual'
                    ? 'bg-indigo-500/10 border-indigo-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-slate-100 flex items-center gap-2">
                    <span>3. Manual Assist Mode</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    You trigger each stage individually through the studio interfaces.
                  </p>
                </div>
                {automationMode === 'manual' && <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0" />}
              </div>
            </div>
          </div>

          {/* Upload Schedule & Days (Section 17) */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Publishing Cadence & Active Days</span>
            </h2>

            <div className="flex flex-wrap gap-2">
              {DAYS.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    activeDays.includes(day)
                      ? 'bg-red-500/15 border-red-500 text-white font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
              <div className="space-y-1">
                <label className="text-slate-400 block">Long-form Videos / Week</label>
                <input
                  type="number"
                  min="1"
                  max="14"
                  value={videosPerWeek}
                  onChange={(e) => setVideosPerWeek(parseInt(e.target.value) || 1)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 block">Shorts / Week</label>
                <input
                  type="number"
                  min="0"
                  max="28"
                  value={shortsPerWeek}
                  onChange={(e) => setShortsPerWeek(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 block">Preferred Time (UTC)</label>
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={preferredPublishHourUtc}
                  onChange={(e) => setPreferredPublishHourUtc(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Production Cost & Quota Guardrails (Section 18) */}
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-amber-400" />
              <span>Production Budget Guardrails</span>
            </h2>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Max Cost / Video:</span>
                  <span className="font-mono text-amber-400 font-bold">${maxCostPerVideo.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.30"
                  max="5.00"
                  step="0.10"
                  value={maxCostPerVideo}
                  onChange={(e) => setMaxCostPerVideo(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-900"
                />
                <span className="text-[10px] text-slate-500">Pipeline auto-aborts if token/TTS cost exceeds cap</span>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Monthly Budget Cap:</span>
                  <span className="font-mono text-emerald-400 font-bold">${monthlyBudgetCap.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="250"
                  step="5"
                  value={monthlyBudgetCap}
                  onChange={(e) => setMonthlyBudgetCap(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-900"
                />
                <span className="text-[10px] text-slate-500">Monthly spend hard limit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
