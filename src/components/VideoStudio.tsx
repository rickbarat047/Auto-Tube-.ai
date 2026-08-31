import React, { useState, useEffect, useRef } from 'react';
import {
  Video,
  Play,
  Pause,
  Film,
  Sparkles,
  Layers,
  Volume2,
  Music,
  Scissors,
  Eye,
  ArrowRight,
  Maximize2,
  Tv,
  Type,
  Zap,
  Sliders,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScriptScene, PipelineVideoItem } from '../types';
import { VideoPreview } from './VideoPreview';

const SUBTITLE_STYLES = [
  { id: 'hormozi', name: 'Hormozi / Viral Pop', color: 'text-amber-300', bg: 'bg-black/80', border: 'border-amber-400/40' },
  { id: 'mrbeast', name: 'MrBeast Dynamic Kinetic', color: 'text-cyan-300', bg: 'bg-slate-950/90', border: 'border-cyan-400/50' },
  { id: 'cinematic', name: 'Minimalist Clean', color: 'text-white', bg: 'bg-black/60', border: 'border-white/20' },
];

export const VideoStudio: React.FC = () => {
  const {
    activeVideo,
    stepVideoStage,
    showToast,
    isGenerating,
    setActiveView,
    openInspectModal,
    openVideoPreview,
    openPublishModal,
  } = useApp();

  const [studioMode, setStudioMode] = useState<'editor' | 'preview'>('editor');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSceneIdx, setCurrentSceneIdx] = useState<number>(0);
  const [selectedSubStyle, setSelectedSubStyle] = useState(SUBTITLE_STYLES[0]);
  const [bgmVolume, setBgmVolume] = useState<number>(18);
  const [isAssembling, setIsAssembling] = useState<boolean>(false);
  const [currentTimeMs, setCurrentTimeMs] = useState<number>(0);

  const scenes: ScriptScene[] = activeVideo?.script?.scenes || [
    {
      id: 'sc-1',
      sceneNumber: 1,
      durationSeconds: 6,
      visualType: 'motion_graphic',
      visualPrompt: 'Futuristic AI automation node connecting YouTube pipelines',
      narrationText: 'What if you could build a YouTube channel that runs completely on autopilot?',
      onScreenText: 'AUTONOMOUS CHANNEL?',
      soundEffect: 'deep_impact',
      cameraMovement: 'zoom_in',
      patternInterrupt: 'Glitch pulse with neon cyan lighting',
    },
    {
      id: 'sc-2',
      sceneNumber: 2,
      durationSeconds: 8,
      visualType: 'chart',
      visualPrompt: 'Live YouTube analytics dashboard surging into the millions of views',
      narrationText: 'Most creators spend 20 hours per video. Autonomous agents do it in 4 minutes.',
      onScreenText: '20 HOURS -> 4 MINUTES',
      soundEffect: 'data_whoosh',
      cameraMovement: 'pan_right',
      patternInterrupt: 'Kinetic number ticker counting up from 0 to 4 minutes',
    },
    {
      id: 'sc-3',
      sceneNumber: 3,
      durationSeconds: 7,
      visualType: 'ai_video',
      visualPrompt: 'High tech sound studio audio visualizer glowing with neural frequencies',
      narrationText: 'From trend discovery to full video assembly and SEO, every step is automated.',
      onScreenText: 'END-TO-END SYSTEM',
      soundEffect: 'positive_chime',
      cameraMovement: 'static',
      patternInterrupt: 'Word-by-word karaoke text pop',
    },
  ];

  const currentScene = scenes[currentSceneIdx] || scenes[0];

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTimeMs((prev) => {
          const next = prev + 100;
          const totalDuration = scenes.reduce((acc, s) => acc + (s.durationSeconds || 6), 0) * 1000;
          if (next >= totalDuration) {
            setIsPlaying(false);
            return 0;
          }
          // Calculate scene index
          let accumulated = 0;
          for (let i = 0; i < scenes.length; i++) {
            accumulated += (scenes[i].durationSeconds || 6) * 1000;
            if (next <= accumulated) {
              setCurrentSceneIdx(i);
              break;
            }
          }
          return next;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isPlaying, scenes]);

  const handleProceedToThumbnails = async () => {
    if (!activeVideo) return;
    setIsAssembling(true);
    showToast('Rendering Video Timeline & Launching Thumbnail Studio...', 'info');
    setTimeout(async () => {
      await stepVideoStage(activeVideo.id, 'thumbnail');
      setIsAssembling(false);
      showToast('Video assembled successfully!', 'success');
      setActiveView('thumbnails');
    }, 1200);
  };

  const sceneImages = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80',
  ];

  const activeImage = sceneImages[currentSceneIdx % sceneImages.length];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800/80 to-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
              <Film className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black text-white tracking-tight">Auto Video Assembly & Timeline Editor</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Multi-layer automated timeline engine: auto-cuts, b-roll synchronization, dynamic animated captions (Hormozi/MrBeast style), and audio ducking.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1 text-xs font-semibold">
            <button
              onClick={() => setStudioMode('editor')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                studioMode === 'editor'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Timeline Editor</span>
            </button>
            <button
              onClick={() => setStudioMode('preview')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                studioMode === 'preview'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Video Proxy Preview</span>
            </button>
          </div>

          {activeVideo && (
            <button
              onClick={() => openVideoPreview(activeVideo)}
              className="px-3.5 py-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-200 border border-red-500/40 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              title="Pop out Fullscreen Video Proxy Preview Modal"
            >
              <Maximize2 className="w-3.5 h-3.5 text-red-400" />
              <span>Popout Player</span>
            </button>
          )}

          {activeVideo && (
            <button
              onClick={() => openInspectModal(activeVideo)}
              className="px-3.5 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-200 border border-indigo-500/40 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              title="See complete AI created package"
            >
              <Eye className="w-3.5 h-3.5 text-indigo-400" />
              <span>Inspect AI</span>
            </button>
          )}

          <button
            disabled={isAssembling || isGenerating}
            onClick={handleProceedToThumbnails}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold transition-all shadow-lg shadow-red-600/20 flex items-center gap-2 cursor-pointer flex-shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isAssembling ? 'Assembling Render...' : 'Proceed to Thumbnail AI'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Render Mode: Embedded Full Proxy Preview OR Timeline Editor */}
      {studioMode === 'preview' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-mono text-slate-400">
              Live Preview Mode • Testing audio ducking, kinetic subtitles, and b-roll camera pans
            </span>
            <button
              onClick={() => setStudioMode('editor')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Switch back to multi-track timeline</span>
            </button>
          </div>
          <VideoPreview
            video={
              activeVideo || {
                id: 'active-preview-temp',
                title: 'Autonomous AI Studio Master Preview',
                niche: 'AI & Tech',
                format: 'long_form',
                currentStage: 'editing',
                stageStatuses: {},
                script: {
                  id: 'sc-temp',
                  title: 'Autonomous AI Studio Master Preview',
                  format: 'long_form',
                  targetDurationSeconds: 180,
                  hook: { first5Seconds: 'What if you could build an autopilot channel?', curiosityGap: 'The 4-minute method' },
                  scenes,
                  fullNarrationText: scenes.map((s) => s.narrationText).join(' '),
                  wordCount: 140,
                  estimatedReadTime: '1 min',
                  ctaText: 'Subscribe for daily automated breakdowns',
                },
                estimatedCost: { llm: 0.02, voice: 0.05, image: 0.12, videoGen: 0.2, render: 0.05, total: 0.44 },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                retryCount: 0,
              }
            }
            onProceedToPublish={() => {
              if (activeVideo) openPublishModal(activeVideo, 'publish');
            }}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Stage Player & Multi-Track Timeline */}
        <div className="lg:col-span-2 space-y-4">
          {/* Visual Player Stage */}
          <div className="relative aspect-video rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl flex items-center justify-center group">
            {/* Background Simulated Scene Image */}
            <img
              src={activeImage}
              alt="scene visual"
              className={`w-full h-full object-cover transition-transform duration-1000 ${
                isPlaying && currentScene.cameraMovement === 'zoom_in'
                  ? 'scale-110'
                  : isPlaying && currentScene.cameraMovement === 'pan_right'
                  ? 'translate-x-2 scale-105'
                  : 'scale-100'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

            {/* Top Stage Badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur border border-white/10 text-white font-mono text-xs font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                Scene {currentSceneIdx + 1} / {scenes.length}
              </span>
              <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur text-[10px] font-mono text-cyan-300 uppercase border border-cyan-400/20">
                {currentScene.visualType.replace('_', ' ')}
              </span>
            </div>

            {/* Kinetic Caption Overlay (Section 9) */}
            <div className="absolute bottom-12 left-0 right-0 px-8 text-center flex flex-col items-center">
              {currentScene.onScreenText && (
                <div
                  className={`px-4 py-1.5 rounded-xl text-sm md:text-base font-black font-mono uppercase tracking-wider mb-2 animate-bounce shadow-xl ${selectedSubStyle.color} ${selectedSubStyle.bg} border ${selectedSubStyle.border}`}
                >
                  {currentScene.onScreenText}
                </div>
              )}
              <p className="text-white text-xs md:text-sm font-semibold max-w-xl drop-shadow-md bg-black/60 px-4 py-1.5 rounded-lg backdrop-blur">
                "{currentScene.narrationText}"
              </p>
            </div>

            {/* Player Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/80 backdrop-blur border-t border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-8 h-8 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center cursor-pointer transition-transform active:scale-95"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                </button>
                <span className="text-xs font-mono text-slate-300">
                  {(currentTimeMs / 1000).toFixed(1)}s / {(scenes.reduce((a, b) => a + (b.durationSeconds || 6), 0)).toFixed(1)}s
                </span>
              </div>

              <div className="text-xs text-slate-400 flex items-center gap-2">
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>BGM Ducking: -{100 - bgmVolume}%</span>
              </div>
            </div>
          </div>

          {/* Multi-Track Interactive Timeline View */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-red-400" />
                <span>Automated Timeline Stacks</span>
              </span>
              <span className="text-slate-500 font-mono text-[11px]">Pattern Interrupts: Every 3.2s</span>
            </div>

            {/* Timeline Track 1: Visual Track */}
            <div className="space-y-1 text-[11px]">
              <div className="text-slate-400 flex items-center justify-between px-1">
                <span>Track 1: Visual Layer (B-Roll & AI Graphics)</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5 h-10">
                {scenes.map((s, idx) => (
                  <div
                    key={idx}
                    onClick={() => setCurrentSceneIdx(idx)}
                    className={`rounded-lg border p-1.5 flex flex-col justify-between cursor-pointer transition-all ${
                      currentSceneIdx === idx
                        ? 'bg-red-500/20 border-red-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-bold truncate text-[10px]">Sc #{idx + 1}</span>
                    <span className="text-[9px] truncate font-mono text-slate-400">{s.durationSeconds}s</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline Track 2: Animated Text Track */}
            <div className="space-y-1 text-[11px]">
              <div className="text-slate-400 flex items-center justify-between px-1">
                <span>Track 2: Kinetic Subtitles & Visual Hooks</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5 h-7">
                {scenes.map((s, idx) => (
                  <div
                    key={idx}
                    className="rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[9px] font-mono px-2 py-0.5 truncate flex items-center"
                  >
                    {s.onScreenText || 'SUB'}
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline Track 3: Voiceover Waveform */}
            <div className="space-y-1 text-[11px]">
              <div className="text-slate-400 flex items-center justify-between px-1">
                <span>Track 3: Neural Voice Track (100% Volume)</span>
              </div>
              <div className="w-full bg-slate-950 border border-slate-800 rounded h-6 flex items-center px-2 gap-1">
                {Array.from({ length: 45 }).map((_, i) => (
                  <div
                    key={i}
                    style={{ height: `${(i % 5) * 3 + 4}px` }}
                    className="w-1 bg-emerald-400/80 rounded-full"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Video Styling Controls */}
        <div className="space-y-6">
          {/* Subtitle Style Picker (Section 9) */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Animated Caption Theme</h3>
            </div>

            <div className="space-y-2.5">
              {SUBTITLE_STYLES.map((style) => (
                <div
                  key={style.id}
                  onClick={() => setSelectedSubStyle(style)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                    selectedSubStyle.id === style.id
                      ? 'bg-cyan-500/10 border-cyan-500 text-white font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs">{style.name}</div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${style.bg} ${style.color} ${style.border} border`}>
                    SAMPLE POP
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sound & Music Controls (Section 10) */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <Music className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Audio Ducking & SFX</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Background Music Volume:</span>
                  <span className="font-mono text-amber-400 font-bold">{bgmVolume}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="40"
                  value={bgmVolume}
                  onChange={(e) => setBgmVolume(parseInt(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-900"
                />
                <span className="text-[10px] text-slate-500">Auto-ducks when narration is active</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5 text-[11px] text-slate-300">
                <div className="font-semibold text-slate-200">Active Sound Effects Cues:</div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">#whoosh</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">#impact_rise</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">#data_blip</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">#camera_shutter</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);
};
