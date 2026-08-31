import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Percent,
  Clock,
  Eye,
  BrainCircuit,
  Sparkles,
  Zap,
  CheckCircle2,
  PieChart,
  Globe,
  Users,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AnalyticsIntelligence: React.FC = () => {
  const { analytics, channel } = useApp();

  const retentionPoints = [
    { label: '0:00 (Hook)', percent: 100 },
    { label: '0:15 (Intro)', percent: 84 },
    { label: '1:00 (Step 1)', percent: 76 },
    { label: '3:00 (Mid-Point)', percent: 68 },
    { label: '5:00 (Deep Dive)', percent: 62 },
    { label: '8:00 (Conclusion)', percent: 54 },
  ];

  const trafficSources = [
    { name: 'Browse features (Home/Sub Feed)', percent: 48, color: 'bg-emerald-400' },
    { name: 'YouTube search (SEO Keyword Target)', percent: 28, color: 'bg-indigo-400' },
    { name: 'Suggested videos (Next up)', percent: 16, color: 'bg-amber-400' },
    { name: 'Shorts feed & External', percent: 8, color: 'bg-red-400' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800/80 to-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <BrainCircuit className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black text-white tracking-tight">Analytics & Self-Improving AI Intelligence</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Autonomous feedback loop: AutoTube AI analyzes real-time audience drop-off, CTR anomalies, and search signals to dynamically adjust scripting and visual pace for future videos.
          </p>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total 30-Day Views</span>
            <Eye className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {analytics?.totalViews?.toLocaleString() || '547,350'}
          </div>
          <div className="text-xs text-emerald-400 font-semibold">+32.4% vs last period</div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Average CTR (Click-Through)</span>
            <Percent className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {analytics?.averageCtr || 8.7}%
          </div>
          <div className="text-xs text-emerald-400 font-semibold">2.3x higher than niche baseline</div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Avg Viewer Retention</span>
            <Clock className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {analytics?.averageRetention || 64.8}%
          </div>
          <div className="text-xs text-emerald-400 font-semibold">+18.6% from pattern interrupts</div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Subscriber Conversion</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {analytics?.totalSubscribers?.toLocaleString() || '18,450'}
          </div>
          <div className="text-xs text-emerald-400 font-semibold">3.8 subs / 100 views</div>
        </div>
      </div>

      {/* Retention Graph & Traffic Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Retention Curve Simulator */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              <span>Audience Retention Curve (0:00 to 8:00)</span>
            </h2>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Low Drop-off
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {retentionPoints.map((point, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="font-medium">{point.label}</span>
                  <span className="font-mono text-purple-400 font-bold">{point.percent}% retained</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    style={{ width: `${point.percent}%` }}
                    className="bg-gradient-to-r from-purple-500 to-indigo-400 h-full rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 pt-1">
            💡 Pattern interrupts at the 0:15 and 3:00 markers successfully mitigated the standard 40% initial abandonment drop.
          </p>
        </div>

        {/* Traffic Sources */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <PieChart className="w-4 h-4 text-emerald-400" />
            <span>Algorithm Traffic Distribution</span>
          </h2>

          <div className="space-y-4 pt-2">
            {trafficSources.map((source, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span>{source.name}</span>
                  <span className="font-mono font-bold text-white">{source.percent}%</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    style={{ width: `${source.percent}%` }}
                    className={`${source.color} h-full rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Self-Improving AI Intelligence Synthesis (Section 16) */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-emerald-500/30 space-y-4 shadow-xl">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Self-Improving AI Loop: Continuous Adaptations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-emerald-400 font-bold uppercase text-[10px]">Winning Topic Factor</div>
            <p className="text-slate-200 leading-snug">
              Case study breakdowns with monetary figures in the title increased 48-hour CTR by +3.4%.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-amber-400 font-bold uppercase text-[10px]">Optimal Pacing Adjustment</div>
            <p className="text-slate-200 leading-snug">
              Voiceover speed set to 1.05x with sound effects on every visual change boosted 5-minute retention to 62%.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-cyan-400 font-bold uppercase text-[10px]">Thumbnail Architecture</div>
            <p className="text-slate-200 leading-snug">
              High-contrast neon green text overlay with less than 4 words beat 6-word variations by 28%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
