import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  Clock,
  Volume2,
  Tv,
  Layers,
  ArrowRight,
  RefreshCw,
  Zap,
  CheckCircle2,
  Edit3,
  Copy,
  Film,
  Camera,
  Music,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VideoScript, ScriptScene, ContentFormat } from '../types';
import { api } from '../services/api';

const DURATION_OPTIONS = [
  { label: '30s (Shorts)', seconds: 30, format: 'short' },
  { label: '60s (Shorts)', seconds: 60, format: 'short' },
  { label: '3 mins', seconds: 180, format: 'long_form' },
  { label: '5 mins', seconds: 300, format: 'long_form' },
  { label: '8 mins (Recommended)', seconds: 480, format: 'long_form' },
  { label: '10+ mins (Deep Dive)', seconds: 600, format: 'long_form' },
];

export const ScriptStudio: React.FC = () => {
  const { activeVideo, stepVideoStage, showToast, isGenerating, setActiveView } = useApp();

  const [targetDuration, setTargetDuration] = useState<number>(
    activeVideo?.format === 'short' ? 60 : 480
  );
  const [activeTab, setActiveTab] = useState<'scenes' | 'teleprompter'>('scenes');
  const [isWriting, setIsWriting] = useState<boolean>(false);

  const [script, setScript] = useState<VideoScript>(
    activeVideo?.script || {
      id: 'script-default',
      title: activeVideo?.title || 'I Built a 24/7 AI YouTube Channel (Here is What It Made)',
      format: activeVideo?.format || 'long_form',
      targetDurationSeconds: 480,
      hook: {
        first5Seconds: 'What if you could build a YouTube channel that researches topics and edits videos completely on its own?',
        curiosityGap: 'Most creators spend 20 hours, but multi-agent pipelines do it in 4 minutes.',
      },
      scenes: [
        {
          id: 'sc-1',
          sceneNumber: 1,
          durationSeconds: 8,
          visualType: 'motion_graphic',
          visualPrompt: 'High tech dashboard countdown with glowing neural network nodes pulsating rapidly, 8K ultra HD cinematic render',
          narrationText: 'What if you could build a YouTube channel that researches topics, writes scripts, and edits videos completely on its own?',
          onScreenText: 'AUTONOMOUS CHANNEL?',
          soundEffect: 'deep_impact_rise',
          cameraMovement: 'zoom_in',
          patternInterrupt: 'Screen flash transition with sudden glitch sound',
        },
        {
          id: 'sc-2',
          sceneNumber: 2,
          durationSeconds: 14,
          visualType: 'ai_image',
          visualPrompt: 'A futuristic holographic desk displaying real-time YouTube view graphs skyrocketing into the millions with cyan and amber volumetric lighting',
          narrationText: 'Most creators spend 20 hours producing a single video. But right now, multi-agent AI pipelines are doing it in under four minutes.',
          onScreenText: '20 HOURS -> 4 MINUTES',
          soundEffect: 'data_whoosh',
          cameraMovement: 'pan_right',
          patternInterrupt: 'Kinetic number ticker counting up from 0 to 4 minutes',
        },
        {
          id: 'sc-3',
          sceneNumber: 3,
          durationSeconds: 18,
          visualType: 'chart',
          visualPrompt: 'Clean 3D infographic showing the 10-step AI automation pipeline: Trend Discovery, Competitor Scraping, Scripting, TTS, Video Assembly, and SEO Optimization',
          narrationText: 'Here is the step-by-step breakdown: First, the Trend Agent identifies breakout topics before they saturate. Then, the Script Agent engineers retention hooks with zero fluff.',
          onScreenText: 'STEP 1: TREND RADAR',
          soundEffect: 'tech_blip_sequence',
          cameraMovement: 'zoom_out',
          patternInterrupt: 'B-roll spotlight focusing on the viral opportunity score metric',
        },
        {
          id: 'sc-4',
          sceneNumber: 4,
          durationSeconds: 16,
          visualType: 'ai_video',
          visualPrompt: 'A high-end sound studio audio visualizer displaying multi-speaker waveforms with golden gradient bars syncing in real time',
          narrationText: 'Next, neural voice models generate studio-grade narration, while the visual director synchronizes b-roll, captions, and music ducking.',
          onScreenText: 'STUDIO AUDIO SYNC',
          soundEffect: 'audio_sweep',
          cameraMovement: 'static',
          patternInterrupt: 'Word-by-word karaoke style text bounce on the screen',
        },
        {
          id: 'sc-5',
          sceneNumber: 5,
          durationSeconds: 12,
          visualType: 'stock_footage',
          visualPrompt: 'A creator looking at an approval dashboard with one-click publish confirmation and automated YouTube Data API sync indicator',
          narrationText: 'And the best part? You stay in full control with manual approval, or let it run on autonomous autopilot.',
          onScreenText: 'FULL AUTONOMY OR HUMAN APPROVAL',
          soundEffect: 'positive_chime',
          cameraMovement: 'zoom_in',
          patternInterrupt: 'Subtle green glow badge indicating safety checks passed',
        },
      ],
      fullNarrationText:
        'What if you could build a YouTube channel that researches topics, writes scripts, and edits videos completely on its own? Most creators spend 20 hours producing a single video. But right now, multi-agent AI pipelines are doing it in under four minutes. Here is the step-by-step breakdown: First, the Trend Agent identifies breakout topics before they saturate. Then, the Script Agent engineers retention hooks with zero fluff. Next, neural voice models generate studio-grade narration, while the visual director synchronizes b-roll, captions, and music ducking. And the best part? You stay in full control with manual approval, or let it run on autonomous autopilot.',
      wordCount: 104,
      estimatedReadTime: '1.2 min',
      ctaText: 'Tap subscribe and check the pinned comment to try the AutoTube AI pipeline today!',
    }
  );

  const handleRewriteScript = async () => {
    if (!activeVideo) return;
    setIsWriting(true);
    showToast('AI Script Agent: Engineering high-retention script with pattern interrupts...', 'info');
    try {
      const format: ContentFormat = targetDuration <= 60 ? 'short' : 'long_form';
      const res = await api.generateScript({
        title: activeVideo.title,
        concept: activeVideo.idea?.concept || activeVideo.title,
        format,
        durationSeconds: targetDuration,
      });

      if (res.success && res.script) {
        setScript(res.script);
        showToast(`Generated complete script (${res.script.scenes.length} scenes, ${res.script.wordCount} words)!`, 'success');
      }
    } catch (err: any) {
      showToast(err.message || 'Script generation failed', 'error');
    } finally {
      setIsWriting(false);
    }
  };

  const handleProceedToVoice = async () => {
    if (!activeVideo) return;
    showToast('Saving Script & Launching Voiceover Studio...', 'info');
    await stepVideoStage(activeVideo.id, 'voiceover', {
      script,
    });
    setActiveView('voice');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800/80 to-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
              <FileText className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black text-white tracking-tight">Script Generator Studio</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Retention-engineered scripting system with pattern interrupts every 15-25s, curiosity open-loops, precise visual director prompts, and zero filler.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            disabled={isWriting || isGenerating}
            onClick={handleRewriteScript}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isWriting ? 'animate-spin' : ''}`} />
            <span>{isWriting ? 'Writing Script...' : 'Regenerate Script'}</span>
          </button>

          <button
            disabled={isGenerating}
            onClick={handleProceedToVoice}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold transition-all shadow-lg shadow-red-600/20 flex items-center gap-2 cursor-pointer"
          >
            <span>Proceed to Voiceover</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Duration Bar & Script Metadata Strip */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Duration Selector (Section 6) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 custom-scrollbar">
          <label className="text-xs text-slate-400 font-medium whitespace-nowrap">Target Duration:</label>
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-xs font-semibold text-slate-400">
            {DURATION_OPTIONS.map((opt) => (
              <button
                key={opt.seconds}
                type="button"
                onClick={() => setTargetDuration(opt.seconds)}
                className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
                  targetDuration === opt.seconds ? 'bg-slate-800 text-white font-bold' : 'hover:text-slate-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Word Count & Read Time Stats */}
        <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-purple-400" />
            <span>Est. Duration: {script.estimatedReadTime}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>{script.scenes.length} Scenes</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-amber-400" />
            <span>{script.wordCount} Words</span>
          </div>
        </div>
      </div>

      {/* Retention Hook Callout Banner */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            5-15 Second Magnetic Retention Hook
          </span>
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            Retention Hold: High
          </span>
        </div>
        <p className="text-sm font-semibold text-slate-100 italic">
          "{script.hook.first5Seconds}"
        </p>
      </div>

      {/* View Switcher: Scene Breakdown vs Teleprompter */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('scenes')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'scenes' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Scene-by-Scene Visual Breakdown ({script.scenes.length})
          </button>
          <button
            onClick={() => setActiveTab('teleprompter')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'teleprompter' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Teleprompter / Full Narration
          </button>
        </div>

        <button
          onClick={() => {
            navigator.clipboard.writeText(script.fullNarrationText);
            showToast('Narration copied to clipboard!', 'info');
          }}
          className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 cursor-pointer"
        >
          <Copy className="w-3.5 h-3.5" />
          <span>Copy Full Script</span>
        </button>
      </div>

      {/* Content View */}
      {activeTab === 'scenes' ? (
        <div className="space-y-4">
          {script.scenes.map((scene, idx) => (
            <div
              key={scene.id || idx}
              className="p-5 rounded-xl bg-slate-900 border border-slate-800/90 hover:border-slate-700 transition-all space-y-3"
            >
              {/* Scene Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-red-600 text-white font-mono text-xs font-bold flex items-center justify-center">
                    {scene.sceneNumber || idx + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-200">
                    Scene #{scene.sceneNumber} ({scene.durationSeconds}s)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono uppercase">
                    {scene.visualType.replace('_', ' ')}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Camera className="w-3.5 h-3.5 text-purple-400" /> {scene.cameraMovement}
                  </span>
                  <span className="flex items-center gap-1">
                    <Music className="w-3.5 h-3.5 text-indigo-400" /> {scene.soundEffect}
                  </span>
                </div>
              </div>

              {/* Grid: Narration vs Visual Prompt */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
                {/* Narration */}
                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-between">
                    <span>Narration Audio</span>
                    <span className="text-slate-500 font-mono">~{scene.durationSeconds}s read</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed font-medium">{scene.narrationText}</p>
                </div>

                {/* Visual Prompt & Direction */}
                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="text-[10px] uppercase font-bold text-indigo-400 flex items-center justify-between">
                    <span>Visual Prompt & B-Roll Cue</span>
                    {scene.onScreenText && (
                      <span className="text-amber-400 font-bold font-mono text-[10px]">
                        Overlay: "{scene.onScreenText}"
                      </span>
                    )}
                  </div>
                  <p className="text-slate-300 leading-relaxed">{scene.visualPrompt}</p>
                </div>
              </div>

              {/* Pattern Interrupt */}
              {scene.patternInterrupt && (
                <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>
                    <strong>Pattern Interrupt:</strong> {scene.patternInterrupt}
                  </span>
                </div>
              )}
            </div>
          ))}

          {/* CTA Scene */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
            <span className="text-[10px] font-bold uppercase text-emerald-400">Closing Call To Action (CTA):</span>
            <p className="text-slate-200">{script.ctaText}</p>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="text-xs text-slate-400">
            Read-through teleprompter view for voiceover recording or manual review:
          </div>
          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-base text-slate-100 font-serif leading-loose tracking-wide select-text">
            {script.fullNarrationText}
          </div>
        </div>
      )}
    </div>
  );
};
