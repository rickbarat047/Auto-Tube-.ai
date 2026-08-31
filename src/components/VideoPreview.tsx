'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Film,
  Sparkles,
  Layers,
  Music,
  Tv,
  CheckCircle2,
  AlertCircle,
  Clock,
  Send,
  Download,
  Settings,
  ChevronRight,
  Sliders,
  Type,
  Eye,
  SkipBack,
  SkipForward,
  Radio,
  Share2,
  ArrowRight,
  Zap,
  Tag,
  Check,
  X,
} from 'lucide-react';
import { PipelineVideoItem, ScriptScene } from '../types';
import { useApp } from '../context/AppContext';

export interface VideoPreviewProps {
  video: PipelineVideoItem;
  onClose?: () => void;
  onProceedToPublish?: () => void;
  onEditInStudio?: () => void;
  isModal?: boolean;
  defaultMode?: 'simulated' | 'html5';
}

const SAMPLE_PROXY_VIDEOS = {
  landscape: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  techMotion: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  short: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
};

const SUBTITLE_THEMES = [
  { id: 'hormozi', name: 'Hormozi Viral Pop', color: 'text-amber-300', bg: 'bg-black/90', border: 'border-amber-400/50', font: 'font-black' },
  { id: 'mrbeast', name: 'MrBeast Kinetic', color: 'text-cyan-300', bg: 'bg-slate-950/95', border: 'border-cyan-400/60', font: 'font-extrabold' },
  { id: 'cinematic', name: 'Minimalist Sub', color: 'text-white', bg: 'bg-black/70', border: 'border-white/20', font: 'font-medium' },
];

export const VideoPreview: React.FC<VideoPreviewProps> = ({
  video,
  onClose,
  onProceedToPublish,
  onEditInStudio,
  isModal = false,
  defaultMode = 'simulated',
}) => {
  const { channel, openPublishModal, setActiveView, setActiveVideoId, showToast } = useApp();

  const [playerEngine, setPlayerEngine] = useState<'simulated' | 'html5'>(defaultMode);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [currentSceneIdx, setCurrentSceneIdx] = useState<number>(0);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>(
    video.format === 'short' ? '9:16' : '16:9'
  );
  const [volume, setVolume] = useState<number>(85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [showCaptions, setShowCaptions] = useState<boolean>(true);
  const [selectedSubTheme, setSelectedSubTheme] = useState(SUBTITLE_THEMES[0]);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'scenes' | 'specs' | 'audio'>('scenes');
  const [isHoveringTimeline, setIsHoveringTimeline] = useState<boolean>(false);
  const [hoveredTimeSec, setHoveredTimeSec] = useState<number>(0);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoHtmlRef = useRef<HTMLVideoElement>(null);

  // Scenes fallback
  const scenes: ScriptScene[] =
    video.script?.scenes && video.script.scenes.length > 0
      ? video.script.scenes
      : [
          {
            id: 'sc-1',
            sceneNumber: 1,
            durationSeconds: 6,
            visualType: 'motion_graphic',
            visualPrompt: 'Futuristic AI automation node connecting YouTube pipelines with glowing cyber aesthetics',
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
          {
            id: 'sc-4',
            sceneNumber: 4,
            durationSeconds: 9,
            visualType: 'stock_footage',
            visualPrompt: 'Multi-device cloud synchronization showing automated YouTube Studio uploads in real time',
            narrationText: 'Watch the step-by-step breakdown as we launch an autopilot channel right now.',
            onScreenText: 'LET\'S DIVE IN',
            soundEffect: 'transition_whoosh',
            cameraMovement: 'zoom_in',
            patternInterrupt: 'Fast zoom cut with sound cue',
          },
        ];

  const totalDurationSec = scenes.reduce((acc, s) => acc + (s.durationSeconds || 6), 0);
  const currentScene = scenes[currentSceneIdx] || scenes[0];

  const sceneBrollImages = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80',
  ];

  const activeImage =
    video.selectedThumbnail?.imageUrl ||
    sceneBrollImages[currentSceneIdx % sceneBrollImages.length];

  // Simulated player timing loop
  useEffect(() => {
    let interval: any;
    if (playerEngine === 'simulated' && isPlaying) {
      interval = setInterval(() => {
        setCurrentTimeSec((prev) => {
          const next = prev + 0.1 * playbackRate;
          if (next >= totalDurationSec) {
            setIsPlaying(false);
            return 0;
          }

          // Calculate current scene index based on accumulated duration
          let accumulated = 0;
          for (let i = 0; i < scenes.length; i++) {
            accumulated += scenes[i].durationSeconds || 6;
            if (next <= accumulated) {
              setCurrentSceneIdx(i);
              break;
            }
          }
          return next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playerEngine, playbackRate, scenes, totalDurationSec]);

  // HTML5 Video sync
  useEffect(() => {
    const v = videoHtmlRef.current;
    if (!v) return;

    if (playerEngine === 'html5') {
      v.playbackRate = playbackRate;
      v.volume = isMuted ? 0 : volume / 100;
      if (isPlaying && v.paused) {
        v.play().catch(() => {});
      } else if (!isPlaying && !v.paused) {
        v.pause();
      }
    }
  }, [isPlaying, playerEngine, playbackRate, volume, isMuted]);

  // Keyboard shortcut handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        seekRelative(-5);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        seekRelative(5);
      } else if (e.code === 'KeyM') {
        setIsMuted((m) => !m);
      } else if (e.code === 'KeyC') {
        setShowCaptions((c) => !c);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, totalDurationSec]);

  const togglePlay = () => {
    setIsPlaying((p) => !p);
  };

  const seekTo = (seconds: number) => {
    const clamped = Math.max(0, Math.min(totalDurationSec, seconds));
    setCurrentTimeSec(clamped);

    // Sync scene
    let accumulated = 0;
    for (let i = 0; i < scenes.length; i++) {
      accumulated += scenes[i].durationSeconds || 6;
      if (clamped <= accumulated) {
        setCurrentSceneIdx(i);
        break;
      }
    }

    if (videoHtmlRef.current && playerEngine === 'html5') {
      videoHtmlRef.current.currentTime = clamped;
    }
  };

  const seekRelative = (delta: number) => {
    seekTo(currentTimeSec + delta);
  };

  const jumpToScene = (index: number) => {
    let startSec = 0;
    for (let i = 0; i < index; i++) {
      startSec += scenes[i].durationSeconds || 6;
    }
    setCurrentSceneIdx(index);
    seekTo(startSec);
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    seekTo(percentage * totalDurationSec);
  };

  const handleTimelineMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const hoverX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, hoverX / rect.width));
    setHoveredTimeSec(percentage * totalDurationSec);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleDownloadProxy = () => {
    setDownloadSuccess(true);
    showToast('Exporting high-resolution MP4 Proxy Preview package...', 'info');
    setTimeout(() => {
      setDownloadSuccess(false);
      showToast('Proxy preview ready for offline review!', 'success');
    }, 2000);
  };

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePublishClick = () => {
    if (onProceedToPublish) {
      onProceedToPublish();
    } else {
      openPublishModal(video, 'publish');
    }
  };

  const handleEditClick = () => {
    if (onEditInStudio) {
      onEditInStudio();
    } else {
      setActiveVideoId(video.id);
      setActiveView('editor');
    }
  };

  return (
    <div
      ref={containerRef}
      className={`flex flex-col bg-slate-950 border border-slate-800 text-slate-200 overflow-hidden ${
        isModal
          ? 'rounded-2xl max-w-6xl w-full shadow-2xl my-auto'
          : 'rounded-2xl w-full shadow-xl'
      }`}
    >
      {/* Top Header Bar */}
      <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 via-rose-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-red-600/20 flex-shrink-0">
            <Film className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-sm md:text-base font-black text-white truncate">
                Video Proxy Preview
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-red-500/20 text-red-300 border border-red-500/30">
                {video.format === 'short' ? 'Shorts 9:16' : '16:9 4K'}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hidden sm:inline-block">
                Ready for Dispatch
              </span>
            </div>
            <p className="text-xs text-slate-400 truncate max-w-lg">{video.title}</p>
          </div>
        </div>

        {/* Engine Switcher & Close */}
        <div className="flex items-center gap-2">
          {/* Player Engine Switcher */}
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1 text-xs font-semibold">
            <button
              onClick={() => {
                setPlayerEngine('simulated');
                setIsPlaying(false);
              }}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                playerEngine === 'simulated'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Multi-Layer Engine</span>
            </button>
            <button
              onClick={() => {
                setPlayerEngine('html5');
                setIsPlaying(false);
              }}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                playerEngine === 'html5'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              <span>HTML5 MP4 Stream</span>
            </button>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
              title="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Player Stage (Left 7 Cols) + Inspector Details (Right 5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 flex-1 overflow-hidden">
        {/* Left Player Area */}
        <div className="lg:col-span-8 bg-black flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800">
          {/* Video Stage Frame */}
          <div className="relative flex-1 min-h-[340px] md:min-h-[460px] flex items-center justify-center bg-slate-950 overflow-hidden select-none group">
            {/* Mode A: Simulated Neural Multi-Layer Timeline Player */}
            {playerEngine === 'simulated' ? (
              <div
                className={`relative overflow-hidden transition-all duration-300 shadow-2xl bg-black ${
                  aspectRatio === '9:16'
                    ? 'w-[270px] sm:w-[310px] aspect-[9/16] rounded-2xl border border-slate-700'
                    : 'w-full h-full aspect-video'
                }`}
              >
                {/* Visual Scene Background */}
                <img
                  src={activeImage}
                  alt="scene footage"
                  className={`w-full h-full object-cover transition-transform duration-1000 ${
                    isPlaying && currentScene.cameraMovement === 'zoom_in'
                      ? 'scale-110'
                      : isPlaying && currentScene.cameraMovement === 'zoom_out'
                      ? 'scale-95'
                      : isPlaying && currentScene.cameraMovement === 'pan_right'
                      ? 'translate-x-3 scale-105'
                      : isPlaying && currentScene.cameraMovement === 'pan_left'
                      ? '-translate-x-3 scale-105'
                      : 'scale-100'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none" />

                {/* Live Scene Badge & Watermark */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur border border-white/10 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      Scene {currentSceneIdx + 1}/{scenes.length}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-red-600/30 backdrop-blur text-[10px] font-mono text-red-300 uppercase border border-red-500/30">
                      {currentScene.visualType.replace('_', ' ')}
                    </span>
                  </div>

                  <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur text-[10px] font-mono text-slate-400 border border-slate-700">
                    4K PROXY
                  </span>
                </div>

                {/* SFX Cue Notification */}
                {currentScene.soundEffect && (
                  <div className="absolute top-14 left-4 pointer-events-none animate-fade-in">
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono flex items-center gap-1">
                      <Music className="w-2.5 h-2.5" />
                      SFX: #{currentScene.soundEffect}
                    </span>
                  </div>
                )}

                {/* Kinetic Subtitles & Hook Box */}
                {showCaptions && (
                  <div className="absolute bottom-10 left-0 right-0 px-6 text-center flex flex-col items-center pointer-events-none">
                    {currentScene.onScreenText && (
                      <div
                        className={`px-4 py-1.5 rounded-xl text-sm md:text-base ${selectedSubTheme.font} font-mono uppercase tracking-wider mb-2 shadow-2xl ${selectedSubTheme.color} ${selectedSubTheme.bg} border ${selectedSubTheme.border} animate-bounce`}
                      >
                        {currentScene.onScreenText}
                      </div>
                    )}
                    <p className="text-white text-xs md:text-sm font-semibold max-w-md drop-shadow-md bg-black/75 px-3.5 py-1.5 rounded-lg backdrop-blur border border-white/10">
                      "{currentScene.narrationText}"
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* Mode B: HTML5 Video Tag Stream */
              <div
                className={`relative overflow-hidden transition-all duration-300 shadow-2xl bg-black ${
                  aspectRatio === '9:16'
                    ? 'w-[270px] sm:w-[310px] aspect-[9/16] rounded-2xl border border-slate-700'
                    : 'w-full h-full aspect-video'
                }`}
              >
                <video
                  ref={videoHtmlRef}
                  src={
                    aspectRatio === '9:16'
                      ? SAMPLE_PROXY_VIDEOS.short
                      : SAMPLE_PROXY_VIDEOS.techMotion
                  }
                  poster={activeImage}
                  playsInline
                  onTimeUpdate={() => {
                    if (videoHtmlRef.current) {
                      setCurrentTimeSec(videoHtmlRef.current.currentTime);
                      // sync scene index
                      let accumulated = 0;
                      for (let i = 0; i < scenes.length; i++) {
                        accumulated += scenes[i].durationSeconds || 6;
                        if (videoHtmlRef.current.currentTime <= accumulated) {
                          setCurrentSceneIdx(i);
                          break;
                        }
                      }
                    }
                  }}
                  onEnded={() => setIsPlaying(false)}
                  className="w-full h-full object-cover"
                />

                {/* HTML5 Overlay Subtitles */}
                {showCaptions && (
                  <div className="absolute bottom-8 left-0 right-0 px-6 text-center flex flex-col items-center pointer-events-none">
                    {currentScene.onScreenText && (
                      <div
                        className={`px-4 py-1 rounded-xl text-xs md:text-sm ${selectedSubTheme.font} font-mono uppercase tracking-wider mb-1.5 shadow-2xl ${selectedSubTheme.color} ${selectedSubTheme.bg} border ${selectedSubTheme.border}`}
                      >
                        {currentScene.onScreenText}
                      </div>
                    )}
                    <p className="text-white text-xs font-semibold max-w-sm bg-black/70 px-3 py-1 rounded backdrop-blur">
                      "{currentScene.narrationText}"
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Big Center Play/Pause Overlay */}
            {!isPlaying && (
              <button
                onClick={togglePlay}
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-red-600/90 hover:bg-red-500 text-white flex items-center justify-center shadow-2xl shadow-red-600/50 cursor-pointer transition-transform hover:scale-110 active:scale-95 z-20"
                aria-label="Play video"
              >
                <Play className="w-8 h-8 fill-white ml-1" />
              </button>
            )}
          </div>

          {/* Custom Video Controls Bar */}
          <div className="p-3.5 bg-slate-950 border-t border-slate-800 space-y-2.5 select-none">
            {/* Interactive Timeline Scrubber with Scene Markers */}
            <div className="relative">
              <div
                onClick={handleTimelineClick}
                onMouseEnter={() => setIsHoveringTimeline(true)}
                onMouseLeave={() => setIsHoveringTimeline(false)}
                onMouseMove={handleTimelineMouseMove}
                className="h-2.5 w-full bg-slate-800 rounded-full cursor-pointer relative overflow-hidden group"
              >
                {/* Progress Fill */}
                <div
                  className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 rounded-full transition-all duration-75"
                  style={{ width: `${(currentTimeSec / totalDurationSec) * 100}%` }}
                />

                {/* Scene Split Markers */}
                {scenes.map((_, idx) => {
                  let accumulated = 0;
                  for (let i = 0; i <= idx; i++) {
                    accumulated += scenes[i].durationSeconds || 6;
                  }
                  const leftPercent = (accumulated / totalDurationSec) * 100;
                  if (leftPercent >= 100) return null;
                  return (
                    <div
                      key={idx}
                      className="absolute top-0 bottom-0 w-0.5 bg-slate-950 z-10 opacity-70"
                      style={{ left: `${leftPercent}%` }}
                    />
                  );
                })}
              </div>

              {/* Hover Timestamp Tooltip */}
              {isHoveringTimeline && (
                <div
                  className="absolute -top-7 transform -translate-x-1/2 px-2 py-0.5 rounded bg-slate-800 text-white text-[10px] font-mono pointer-events-none shadow border border-slate-700"
                  style={{
                    left: `${(hoveredTimeSec / totalDurationSec) * 100}%`,
                  }}
                >
                  {formatTime(hoveredTimeSec)}
                </div>
              )}
            </div>

            {/* Bottom Controls Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              {/* Left Control Group */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={togglePlay}
                  className="w-9 h-9 rounded-xl bg-red-600 hover:bg-red-500 text-white flex items-center justify-center transition-all cursor-pointer shadow-md shadow-red-600/20"
                  title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                </button>

                <button
                  onClick={() => seekRelative(-5)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
                  title="Rewind 5s (Left Arrow)"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  onClick={() => seekRelative(5)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
                  title="Fast Forward 5s (Right Arrow)"
                >
                  <SkipForward className="w-4 h-4" />
                </button>

                <div className="text-slate-300 font-mono text-xs pl-1">
                  <span className="font-bold text-white">{formatTime(currentTimeSec)}</span>
                  <span className="text-slate-500"> / </span>
                  <span className="text-slate-400">{formatTime(totalDurationSec)}</span>
                </div>
              </div>

              {/* Center / Right Control Group */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Volume & Mute */}
                <div className="flex items-center gap-1.5 group">
                  <button
                    onClick={() => setIsMuted((m) => !m)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
                    title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-4 h-4 text-rose-400" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-slate-300" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(parseInt(e.target.value));
                      if (isMuted) setIsMuted(false);
                    }}
                    className="w-14 sm:w-18 accent-red-500 h-1 bg-slate-800 rounded cursor-pointer"
                  />
                </div>

                {/* Aspect Ratio Toggle */}
                <button
                  onClick={() => setAspectRatio((r) => (r === '16:9' ? '9:16' : '16:9'))}
                  className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px] font-bold transition-all cursor-pointer border border-slate-700"
                  title="Toggle Aspect Ratio (16:9 / 9:16)"
                >
                  {aspectRatio}
                </button>

                {/* Captions Toggle */}
                <button
                  onClick={() => setShowCaptions((c) => !c)}
                  className={`px-2 py-1 rounded-lg text-[11px] font-bold font-mono transition-all cursor-pointer border ${
                    showCaptions
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-slate-800 text-slate-500 border-slate-700'
                  }`}
                  title="Toggle Captions (C)"
                >
                  CC
                </button>

                {/* Playback Rate */}
                <select
                  value={playbackRate}
                  onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
                  className="px-2 py-1 rounded-lg bg-slate-800 text-slate-300 font-mono text-[11px] font-bold border border-slate-700 cursor-pointer focus:outline-none"
                >
                  <option value={0.5}>0.5x</option>
                  <option value={1}>1.0x</option>
                  <option value={1.25}>1.25x</option>
                  <option value={1.5}>1.5x</option>
                  <option value={2}>2.0x</option>
                </select>

                {/* Fullscreen */}
                <button
                  onClick={toggleFullscreen}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
                  title="Toggle Fullscreen"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Inspector & Scene Selector Area (5 Cols) */}
        <div className="lg:col-span-4 bg-slate-900/90 flex flex-col justify-between max-h-[600px] overflow-hidden">
          {/* Tabs */}
          <div className="p-3 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between gap-1 flex-shrink-0">
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs w-full font-bold">
              <button
                onClick={() => setActiveTab('scenes')}
                className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'scenes'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Scenes ({scenes.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'specs'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Render Specs</span>
              </button>
              <button
                onClick={() => setActiveTab('audio')}
                className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'audio'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Music className="w-3.5 h-3.5" />
                <span>Audio & SFX</span>
              </button>
            </div>
          </div>

          {/* Tab Body */}
          <div className="p-4 overflow-y-auto custom-scrollbar flex-1 space-y-4">
            {/* Tab 1: Scene Playlist */}
            {activeTab === 'scenes' && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                  <span>Jump to Scene:</span>
                  <span className="font-mono text-emerald-400 text-[11px]">
                    Active: Scene #{currentSceneIdx + 1}
                  </span>
                </div>

                {scenes.map((scene, idx) => {
                  const isCurrent = currentSceneIdx === idx;
                  let sceneStartSec = 0;
                  for (let i = 0; i < idx; i++) {
                    sceneStartSec += scenes[i].durationSeconds || 6;
                  }

                  return (
                    <div
                      key={scene.id || idx}
                      onClick={() => jumpToScene(idx)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 text-xs ${
                        isCurrent
                          ? 'bg-red-500/10 border-red-500 text-white ring-1 ring-red-500/50'
                          : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className="w-12 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-slate-900 border border-slate-700 relative">
                        <img
                          src={sceneBrollImages[idx % sceneBrollImages.length]}
                          alt="scene thumb"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-0.5 right-0.5 px-1 py-0.2 rounded bg-black/80 font-mono text-[8px] text-white">
                          {formatTime(sceneStartSec)}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-bold text-white truncate">
                            Scene {idx + 1}: {scene.onScreenText || 'Visual Cut'}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 flex-shrink-0">
                            {scene.durationSeconds}s
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-tight">
                          {scene.narrationText}
                        </p>
                        <div className="flex items-center gap-1.5 pt-0.5">
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-cyan-300 uppercase">
                            {scene.cameraMovement.replace('_', ' ')}
                          </span>
                          {scene.soundEffect && (
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300">
                              #{scene.soundEffect}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Tab 2: Render Specs & Video Metadata */}
            {activeTab === 'specs' && (
              <div className="space-y-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                  <span className="font-bold text-white block">Master Encoding Profile</span>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-slate-500 block text-[10px]">RESOLUTION</span>
                      <span className="font-bold text-white font-mono">3840 x 2160 (4K UHD)</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-slate-500 block text-[10px]">FRAME RATE</span>
                      <span className="font-bold text-emerald-400 font-mono">60.00 FPS CFR</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-slate-500 block text-[10px]">VIDEO CODEC</span>
                      <span className="font-bold text-white font-mono">H.264 / AVC High@L5.1</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-slate-500 block text-[10px]">COLOR SPACE</span>
                      <span className="font-bold text-cyan-400 font-mono">BT.709 10-bit Rec</span>
                    </div>
                  </div>
                </div>

                {/* Subtitle Theme Switcher */}
                <div className="space-y-2">
                  <span className="font-bold text-slate-300 block">Caption Preset</span>
                  <div className="space-y-1.5">
                    {SUBTITLE_THEMES.map((theme) => (
                      <div
                        key={theme.id}
                        onClick={() => setSelectedSubTheme(theme)}
                        className={`p-2.5 rounded-xl border cursor-pointer flex items-center justify-between text-xs transition-all ${
                          selectedSubTheme.id === theme.id
                            ? 'bg-amber-500/10 border-amber-500 text-white font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span>{theme.name}</span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${theme.bg} ${theme.color} ${theme.border} border`}>
                          POP
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-emerald-300 text-[11px]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Quality Score: 98/100 • Zero frame drops detected in proxy timeline.</span>
                </div>
              </div>
            )}

            {/* Tab 3: Audio & SFX */}
            {activeTab === 'audio' && (
              <div className="space-y-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">Voiceover Track</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
                      SYNCED (0ms)
                    </span>
                  </div>
                  <div className="space-y-1 text-slate-400 text-[11px]">
                    <div>Voice Model: <strong className="text-white">ElevenLabs / Neural Adam</strong></div>
                    <div>Sample Rate: <strong className="text-white">48,000 Hz • 320 kbps AAC</strong></div>
                    <div>Dynamic Range: <strong className="text-white">-14 LUFS (YouTube Standard)</strong></div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">Background Music Track</span>
                    <span className="font-mono text-amber-400 text-xs">Auto-Ducked -18dB</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Track: <strong className="text-slate-200">Cyber Pulse Cinematic Uplift</strong>
                  </p>
                  <div className="w-full bg-slate-900 border border-slate-800 rounded h-5 flex items-center px-2 gap-1">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div
                        key={i}
                        style={{ height: `${(i % 4) * 3 + 3}px` }}
                        className="w-1 bg-amber-400/80 rounded-full"
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Footer in Right Sidebar */}
          <div className="p-4 border-t border-slate-800 bg-slate-950 flex flex-col gap-2 flex-shrink-0">
            <button
              onClick={handlePublishClick}
              className="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Approve & Publish to YouTube</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleEditClick}
                className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Edit in Studio</span>
              </button>

              <button
                onClick={handleDownloadProxy}
                className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {downloadSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Ready</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Save MP4</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
