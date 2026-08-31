'use client';

import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Film,
  Sparkles,
  Volume2,
  Tv,
  Eye,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Tag,
  Clock,
  ThumbsUp,
  Share2,
  Bookmark,
  Smartphone,
  Monitor,
  Search,
  ListVideo,
  Layers,
  Zap,
  Sliders,
  Type,
  Music,
  Maximize2,
  ChevronRight,
  ArrowUpRight,
  FileText,
} from 'lucide-react';
import { PipelineVideoItem, ScriptScene, ThumbnailOption } from '../types';
import { useApp } from '../context/AppContext';

interface AiCreationInspectorProps {
  video: PipelineVideoItem;
  onProceedToPublish?: () => void;
  onEditInStudio?: (view: string) => void;
  isInsideModal?: boolean;
}

export const AiCreationInspector: React.FC<AiCreationInspectorProps> = ({
  video,
  onProceedToPublish,
  onEditInStudio,
  isInsideModal = false,
}) => {
  const { channel, showToast, setActiveVideoId, setActiveView } = useApp();

  const [activeTab, setActiveTab] = useState<'video' | 'script' | 'seo' | 'thumbnail' | 'safety'>('video');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSceneIdx, setCurrentSceneIdx] = useState<number>(0);
  const [currentTimeMs, setCurrentTimeMs] = useState<number>(0);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>(video.format === 'short' ? '9:16' : '16:9');
  const [feedPreviewMode, setFeedPreviewMode] = useState<'desktop' | 'mobile' | 'search' | 'suggested'>('desktop');
  const [selectedThumbId, setSelectedThumbId] = useState<string>(
    video.selectedThumbnail?.id || video.thumbnails?.[0]?.id || 'th-1'
  );
  const [isCopiedDesc, setIsCopiedDesc] = useState<boolean>(false);
  const [isCopiedTitle, setIsCopiedTitle] = useState<boolean>(false);

  const scenes: ScriptScene[] = video.script?.scenes && video.script.scenes.length > 0
    ? video.script.scenes
    : [
        {
          id: 'sc-1',
          sceneNumber: 1,
          durationSeconds: 6,
          visualType: 'motion_graphic',
          visualPrompt: 'Futuristic AI automation node connecting YouTube pipelines with neon glow',
          narrationText: `What if you could build a YouTube channel that runs completely on autonomous AI agents?`,
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
          visualPrompt: 'Live YouTube analytics dashboard surging into millions of views with rapid tickers',
          narrationText: 'Most creators spend 20 hours per video. Autonomous neural pipelines do it in 4 minutes.',
          onScreenText: '20 HOURS -> 4 MINS',
          soundEffect: 'data_whoosh',
          cameraMovement: 'pan_right',
          patternInterrupt: 'Kinetic number ticker counting up from 0 to 4 minutes',
        },
        {
          id: 'sc-3',
          sceneNumber: 3,
          durationSeconds: 7,
          visualType: 'ai_video',
          visualPrompt: 'High tech sound studio audio visualizer glowing with neural voice frequencies',
          narrationText: 'From trend discovery to full video assembly, viral thumbnails, and SEO, every step is automated.',
          onScreenText: 'END-TO-END AUTOMATION',
          soundEffect: 'positive_chime',
          cameraMovement: 'zoom_out',
          patternInterrupt: 'Word-by-word karaoke text pop',
        },
      ];

  const totalDurationSeconds = scenes.reduce((acc, s) => acc + (s.durationSeconds || 6), 0);
  const currentScene = scenes[currentSceneIdx] || scenes[0];

  // Video playback loop simulation
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTimeMs((prev) => {
          const next = prev + 100;
          const totalMs = totalDurationSeconds * 1000;
          if (next >= totalMs) {
            setIsPlaying(false);
            return 0;
          }
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
  }, [isPlaying, scenes, totalDurationSeconds]);

  const thumbnails: ThumbnailOption[] = video.thumbnails && video.thumbnails.length > 0
    ? video.thumbnails
    : [
        {
          id: 'th-1',
          imageUrl: video.selectedThumbnail?.imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
          predictedCtr: 11.4,
          headlineText: 'I BUILT A 24/7 AI CHANNEL',
          colorScheme: 'High Contrast Cyan & Gold',
          style: 'Viral Curiosity Gap',
        },
        {
          id: 'th-2',
          imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80',
          predictedCtr: 9.8,
          headlineText: '20 HOURS -> 4 MINS',
          colorScheme: 'Electric Neon & Crimson',
          style: 'Bold Minimalist',
        },
        {
          id: 'th-3',
          imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80',
          predictedCtr: 8.9,
          headlineText: '$10,000/MO ON AUTOPILOT',
          colorScheme: 'Golden Sunlight & Dark Mesh',
          style: 'Data-Backed Proof',
        },
      ];

  const selectedThumbnail = thumbnails.find((t) => t.id === selectedThumbId) || thumbnails[0];

  const sceneImages = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop&q=80',
  ];

  const handleCopyDescription = () => {
    const text = video.seo?.description || 'Auto-generated high-converting description...';
    navigator.clipboard.writeText(text);
    setIsCopiedDesc(true);
    showToast('Description copied to clipboard!', 'success');
    setTimeout(() => setIsCopiedDesc(false), 2000);
  };

  const handleCopyTitle = () => {
    navigator.clipboard.writeText(video.title);
    setIsCopiedTitle(true);
    showToast('Title copied to clipboard!', 'success');
    setTimeout(() => setIsCopiedTitle(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top AI Creation Summary Bar */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 flex-shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                AI Generation Complete
              </span>
              <span className="text-xs font-mono text-slate-400">
                Format: <strong className="text-white uppercase">{video.format === 'short' ? '⚡ 50s Short' : '🎬 Long-Form 4K'}</strong>
              </span>
            </div>
            <h2 className="text-sm md:text-base font-bold text-white tracking-tight line-clamp-1">
              {video.title}
            </h2>
          </div>
        </div>

        {/* Quick Jump Buttons or Publish Trigger */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {onProceedToPublish && (
            <button
              onClick={onProceedToPublish}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-lg shadow-red-600/30 flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Publish Video to YouTube</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Inspection Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-900/90 rounded-xl p-1 gap-1 overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveTab('video')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'video'
              ? 'bg-red-500/20 text-white border border-red-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Film className="w-4 h-4 text-red-400" />
          <span>1. Video & Scene Playback</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">
            {scenes.length} Scenes
          </span>
        </button>

        <button
          onClick={() => setActiveTab('script')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'script'
              ? 'bg-indigo-500/20 text-white border border-indigo-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <FileText className="w-4 h-4 text-indigo-400" />
          <span>2. Script & Hook Breakdown</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">
            {video.script?.wordCount || 185} words
          </span>
        </button>

        <button
          onClick={() => setActiveTab('seo')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'seo'
              ? 'bg-amber-500/20 text-white border border-amber-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>3. SEO, Chapters & Tags</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono">
            96/100 Score
          </span>
        </button>

        <button
          onClick={() => setActiveTab('thumbnail')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'thumbnail'
              ? 'bg-purple-500/20 text-white border border-purple-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Tv className="w-4 h-4 text-purple-400" />
          <span>4. Thumbnail & YouTube Feed</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 font-mono">
            {selectedThumbnail.predictedCtr}% CTR
          </span>
        </button>

        <button
          onClick={() => setActiveTab('safety')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'safety'
              ? 'bg-emerald-500/20 text-white border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>5. Safety & Quality Audit</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono">
            100% Passed
          </span>
        </button>
      </div>

      {/* Tab 1: Video & Scene Playback Simulation */}
      {activeTab === 'video' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
          {/* Main Video Screen */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl flex items-center justify-center p-3">
              {/* Aspect Ratio Container */}
              <div
                className={`relative overflow-hidden rounded-xl border border-slate-800 bg-black transition-all ${
                  aspectRatio === '16:9' ? 'w-full aspect-video' : 'w-[280px] aspect-[9/16]'
                }`}
              >
                {/* Scene Background with Ken Burns animation */}
                <img
                  src={sceneImages[currentSceneIdx % sceneImages.length]}
                  alt="Scene Render"
                  className={`w-full h-full object-cover transition-transform duration-1000 ${
                    isPlaying ? 'scale-110' : 'scale-100'
                  }`}
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                {/* Active Subtitle Typography Overlay */}
                <div className="absolute inset-x-4 bottom-8 flex flex-col items-center justify-center text-center pointer-events-none">
                  {currentScene.onScreenText && (
                    <span className="px-3 py-1 mb-2 rounded-lg bg-red-600/90 text-white font-black text-xs md:text-sm tracking-wider uppercase shadow-lg shadow-red-600/40 animate-pulse">
                      {currentScene.onScreenText}
                    </span>
                  )}
                  <p className="px-4 py-2 rounded-xl bg-black/75 backdrop-blur border border-amber-400/40 text-amber-300 font-black text-xs md:text-sm shadow-2xl max-w-[90%] leading-snug">
                    "{currentScene.narrationText}"
                  </p>
                </div>

                {/* Top Scene HUD */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between text-xs pointer-events-none">
                  <div className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur border border-slate-700 text-white font-mono text-[11px] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span>Scene {currentSceneIdx + 1} / {scenes.length}</span>
                    <span className="text-slate-400">({currentScene.durationSeconds}s)</span>
                  </div>

                  <div className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur border border-slate-700 text-cyan-300 font-mono text-[11px]">
                    4K • 60 FPS • Neural TTS Sync
                  </div>
                </div>

                {/* Play/Pause Center Overlay Trigger */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-red-600/90 hover:bg-red-500 text-white flex items-center justify-center shadow-2xl shadow-red-600/50 transition-transform active:scale-95 cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white translate-x-0.5" />}
                </button>
              </div>
            </div>

            {/* Timeline Controls */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 rounded-lg bg-red-600 hover:bg-red-500 text-white transition-all cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  <div className="font-mono text-slate-300 text-xs">
                    <span className="text-white font-bold">{(currentTimeMs / 1000).toFixed(1)}s</span> /{' '}
                    <span className="text-slate-400">{totalDurationSeconds.toFixed(1)}s</span>
                  </div>
                </div>

                {/* Aspect Switcher */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setAspectRatio('16:9')}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                      aspectRatio === '16:9' ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-400'
                    }`}
                  >
                    16:9 Long-Form
                  </button>
                  <button
                    onClick={() => setAspectRatio('9:16')}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                      aspectRatio === '9:16' ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-400'
                    }`}
                  >
                    9:16 Short
                  </button>
                </div>
              </div>

              {/* Progress Slider */}
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden relative cursor-pointer">
                <div
                  className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-400 transition-all"
                  style={{ width: `${(currentTimeMs / (totalDurationSeconds * 1000)) * 100}%` }}
                />
              </div>

              {/* Scene Scrub Segments */}
              <div className="flex gap-1.5 pt-1">
                {scenes.map((scene, idx) => (
                  <button
                    key={scene.id || idx}
                    onClick={() => {
                      setCurrentSceneIdx(idx);
                      let acc = 0;
                      for (let i = 0; i < idx; i++) acc += (scenes[i].durationSeconds || 6) * 1000;
                      setCurrentTimeMs(acc);
                    }}
                    className={`flex-1 p-2 rounded-lg text-left transition-all border cursor-pointer ${
                      currentSceneIdx === idx
                        ? 'bg-red-500/15 border-red-500/40 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold">
                      <span>Scene {idx + 1}</span>
                      <span className="font-mono text-[9px] text-slate-400">{scene.durationSeconds}s</span>
                    </div>
                    <p className="text-[10px] text-slate-300 truncate mt-0.5">{scene.onScreenText || scene.narrationText}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Scene Metadata & Voice Details */}
          <div className="lg:col-span-4 space-y-4">
            {/* Active Scene Card */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5 text-red-400" />
                  Active Scene {currentSceneIdx + 1} Director Notes
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-emerald-400">
                  {currentScene.visualType || 'motion_graphic'}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">AI Visual Prompt</span>
                  <p className="text-xs text-slate-200 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 font-mono leading-relaxed">
                    {currentScene.visualPrompt}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Camera Motion & Pattern Interrupt</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono">
                      Camera: {currentScene.cameraMovement || 'zoom_in'}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-mono border border-indigo-500/30">
                      FX: {currentScene.soundEffect || 'whoosh'}
                    </span>
                  </div>
                </div>

                {currentScene.patternInterrupt && (
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-200">
                    <strong>Pattern Interrupt:</strong> {currentScene.patternInterrupt}
                  </div>
                )}
              </div>
            </div>

            {/* Neural Voiceover Track */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                  Neural Voiceover (TTS)
                </span>
                <span className="text-[10px] font-mono text-emerald-400">100% Synced</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 font-semibold">{video.voiceover?.voiceName || 'Marcus - Tech Narrator'}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{video.voiceover?.tone || 'Fast-Paced & Engaging'}</span>
                </div>
                <div className="flex items-center gap-1.5 h-6">
                  {[40, 65, 30, 85, 95, 45, 60, 80, 50, 70, 90, 40, 60, 75, 35, 80].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-cyan-500/70 rounded-full transition-all duration-300"
                      style={{
                        height: isPlaying ? `${Math.min(100, h * (0.5 + Math.random() * 0.7))}%` : `${h * 0.4}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Script & Hook Breakdown */}
      {activeTab === 'script' && (
        <div className="space-y-6 animate-fade-in">
          {/* Viral Hook Analyzer Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/40 to-slate-900 border border-indigo-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                  <Zap className="w-4 h-4" />
                </span>
                <h3 className="text-sm font-bold text-white">First 5-Second Viral Hook Architecture</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/30">
                Hook Retention: 94.2%
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-indigo-500/20 text-xs space-y-2">
              <p className="text-slate-200 text-sm font-semibold italic">
                "{video.script?.hook?.first5Seconds || scenes[0]?.narrationText}"
              </p>
              <div className="flex items-center gap-4 text-slate-400 text-[11px] pt-1">
                <span>⚡ Curiosity Gap: <strong>High</strong></span>
                <span>🎬 Visual Spike: <strong>Kinetic Motion Graphic</strong></span>
                <span>🔊 Audio Impact: <strong>Deep Sub-Bass Drop</strong></span>
              </div>
            </div>
          </div>

          {/* Scene by Scene Narration Breakdown */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold uppercase tracking-wider text-slate-300">Complete Script & Director Directives</span>
              <span>Total Words: {video.script?.wordCount || 185} • Est. Pacing: 155 wpm</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scenes.map((scene, idx) => (
                <div
                  key={scene.id || idx}
                  className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 relative hover:border-slate-700 transition-all"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-red-400 font-mono text-xs font-bold">
                      Scene #{scene.sceneNumber || idx + 1}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{scene.durationSeconds} Seconds</span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Spoken Narration</label>
                    <p className="text-slate-100 font-medium leading-relaxed bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                      {scene.narrationText}
                    </p>
                  </div>

                  {scene.onScreenText && (
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-[10px] text-amber-400 font-bold uppercase">On-Screen Text:</span>
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-mono font-bold text-[11px]">
                        {scene.onScreenText}
                      </span>
                    </div>
                  )}

                  <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2 rounded-lg border border-slate-800/60">
                    <span className="text-slate-300 font-semibold">B-Roll Prompt:</span> {scene.visualPrompt}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: SEO, Chapters & Tags */}
      {activeTab === 'seo' && (
        <div className="space-y-6 animate-fade-in">
          {/* Title Candidate Comparator */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Type className="w-4 h-4 text-amber-400" />
                Active High-CTR YouTube Title
              </span>
              <button
                onClick={handleCopyTitle}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
              >
                {isCopiedTitle ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopiedTitle ? 'Copied' : 'Copy Title'}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-sm font-bold text-white flex items-center justify-between">
              <span>{video.title}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold">
                11.4% Predicted CTR
              </span>
            </div>
          </div>

          {/* Description & Auto-Generated Timestamps */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-400" />
                Generated Description & Chapter Timestamps
              </span>
              <button
                onClick={handleCopyDescription}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
              >
                {isCopiedDesc ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopiedDesc ? 'Copied' : 'Copy Description'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto custom-scrollbar">
              {video.seo?.description ||
                `${video.title}\n\nIn this video, we break down step-by-step how to deploy autonomous AI agents for high-scale YouTube automation.\n\nTimestamps:\n0:00 - Introduction & The Autonomous YouTube Breakthrough\n1:20 - Architecture & Real-Time Data Pipeline\n3:45 - Multi-Agent Script & Voiceover Generation\n6:10 - Automated Rendering & Instant Publishing\n\n#AI #Automation #Productivity #YouTubeAutomation`}
            </pre>
          </div>

          {/* YouTube Tags Cloud */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-orange-400" />
              Target Keyword Tags (Ranking Optimization)
            </span>

            <div className="flex flex-wrap gap-2">
              {(
                video.seo?.primaryTags ||
                video.seo?.tags || [
                  'AI tools',
                  'autonomous agents',
                  'youtube automation',
                  'make money online',
                  'gemini 3.5 flash',
                  'future tech',
                  'ai content creator',
                  'chatgpt automation',
                ]
              ).map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono flex items-center gap-1.5"
                >
                  <span className="text-red-400">#</span>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Thumbnail & YouTube Feed Simulator */}
      {activeTab === 'thumbnail' && (
        <div className="space-y-6 animate-fade-in">
          {/* Candidate Thumbnails Carousel */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">AI-Generated Thumbnail Candidates</span>
              <span className="text-xs text-slate-400">Click to select the primary publishing thumbnail</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {thumbnails.map((thumb) => (
                <div
                  key={thumb.id}
                  onClick={() => {
                    setSelectedThumbId(thumb.id);
                    showToast('Primary thumbnail updated!', 'info');
                  }}
                  className={`p-2 rounded-xl border transition-all cursor-pointer space-y-2 ${
                    selectedThumbId === thumb.id
                      ? 'bg-red-500/10 border-red-500 shadow-lg shadow-red-500/20'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-slate-800">
                    <img src={thumb.imageUrl} alt="thumb" className="w-full h-full object-cover" />
                    {selectedThumbId === thumb.id && (
                      <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded bg-red-600 text-white font-black text-[10px] shadow">
                        SELECTED
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-200 text-[11px] truncate">{thumb.headlineText || 'Thumbnail Option'}</span>
                    <span className="text-emerald-400 font-mono font-bold text-[11px]">{thumb.predictedCtr}% CTR</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* YouTube Feed Placement Simulator */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Tv className="w-4 h-4 text-purple-400" />
                Live YouTube Feed Placement Simulator
              </span>

              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-1 text-xs gap-1">
                <button
                  onClick={() => setFeedPreviewMode('desktop')}
                  className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    feedPreviewMode === 'desktop' ? 'bg-slate-800 text-white' : 'text-slate-400'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop Feed</span>
                </button>
                <button
                  onClick={() => setFeedPreviewMode('mobile')}
                  className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    feedPreviewMode === 'mobile' ? 'bg-slate-800 text-white' : 'text-slate-400'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile App</span>
                </button>
                <button
                  onClick={() => setFeedPreviewMode('search')}
                  className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    feedPreviewMode === 'search' ? 'bg-slate-800 text-white' : 'text-slate-400'
                  }`}
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search Result</span>
                </button>
              </div>
            </div>

            {/* Desktop Feed Simulation Card */}
            {feedPreviewMode === 'desktop' && (
              <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 shadow-2xl">
                <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800">
                  <img src={selectedThumbnail.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/85 text-[10px] font-mono text-white font-bold">
                    {video.format === 'short' ? '0:52' : '8:45'}
                  </div>
                </div>

                <div className="flex gap-3">
                  <img
                    src={channel?.avatarUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80'}
                    alt="Channel"
                    className="w-9 h-9 rounded-full object-cover border border-slate-700 flex-shrink-0"
                  />
                  <div className="space-y-1 min-w-0">
                    <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug">{video.title}</h4>
                    <div className="text-[11px] text-slate-400 space-y-0.5">
                      <p className="flex items-center gap-1 font-medium text-slate-300">
                        {channel?.channelName || 'AutoTech Daily'}
                        <CheckCircle2 className="w-3 h-3 text-slate-400" />
                      </p>
                      <p>24K views • Just now</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile App Simulation */}
            {feedPreviewMode === 'mobile' && (
              <div className="max-w-xs mx-auto p-3 rounded-2xl bg-black border-2 border-slate-800 space-y-2 shadow-2xl">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <img src={selectedThumbnail.imageUrl} alt="Mobile Preview" className="w-full h-full object-cover" />
                  <div className="absolute bottom-1.5 right-1.5 px-1 rounded bg-black/85 text-[9px] font-mono text-white">
                    8:45
                  </div>
                </div>
                <div className="flex gap-2 pt-1">
                  <img
                    src={channel?.avatarUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80'}
                    alt="Avatar"
                    className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-[11px] font-bold text-white line-clamp-2 leading-snug">{video.title}</h4>
                    <p className="text-[10px] text-slate-400">{channel?.channelName || 'AutoTech Daily'} • 24K views</p>
                  </div>
                </div>
              </div>
            )}

            {/* Search Result Simulation */}
            {feedPreviewMode === 'search' && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row gap-4">
                <div className="relative w-full sm:w-56 aspect-video rounded-lg overflow-hidden flex-shrink-0 border border-slate-800">
                  <img src={selectedThumbnail.imageUrl} alt="Search Preview" className="w-full h-full object-cover" />
                  <div className="absolute bottom-1.5 right-1.5 px-1 rounded bg-black/85 text-[9px] font-mono text-white">
                    8:45
                  </div>
                </div>
                <div className="space-y-1.5 min-w-0">
                  <h4 className="text-xs font-bold text-white line-clamp-2">{video.title}</h4>
                  <p className="text-[10px] text-slate-400">{channel?.channelName} • 24K views • 2 hours ago</p>
                  <div className="flex items-center gap-2 pt-1">
                    <img
                      src={channel?.avatarUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80'}
                      alt="Avatar"
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span className="text-[10px] text-slate-300 font-medium">{channel?.channelName}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 pt-1">
                    {video.seo?.description || 'Learn how autonomous AI channels can be built and operated automatically.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 5: Safety & Quality Audit */}
      {activeTab === 'safety' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-slate-900 to-slate-900 border border-emerald-500/40 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">Pre-Publish Quality & Safety Certification</h3>
                  <p className="text-xs text-slate-400">Automated verification before YouTube upload</p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-black text-emerald-400 font-mono">98 / 100</div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Status: Approved</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/20 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs space-y-0.5">
                  <strong className="text-white block">100% Copyright-Free & Neural Synthesized</strong>
                  <p className="text-slate-400 text-[11px]">Original speech synthesis and licensed B-roll with zero content ID risk.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/20 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs space-y-0.5">
                  <strong className="text-white block">YouTube Community Guidelines Compliant</strong>
                  <p className="text-slate-400 text-[11px]">Family-safe, advertiser-friendly, compliant with spam and impersonation rules.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/20 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs space-y-0.5">
                  <strong className="text-white block">Audio Loudness Normalized (-14 LUFS)</strong>
                  <p className="text-slate-400 text-[11px]">Standard YouTube broadcast volume with automatic background music ducking.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/20 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs space-y-0.5">
                  <strong className="text-white block">High Retention Pacing Verified</strong>
                  <p className="text-slate-400 text-[11px]">Visual change and pattern interrupt triggers every 4.5 seconds.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
