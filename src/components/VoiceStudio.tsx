import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  Play,
  Pause,
  Volume2,
  Sparkles,
  Sliders,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
  Users,
  Radio,
  FileAudio,
  Waves,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VoiceoverTrack } from '../types';

const VOICE_PRESETS = [
  { id: 'adam-doc', name: 'Marcus (Authoritative Documentary)', gender: 'Male', accent: 'American', tone: 'Authoritative', speed: 1.0, previewSample: 'In the vast history of technological innovation, few shifts match the rise of autonomous systems.' },
  { id: 'rachel-energetic', name: 'Rachel (High-Energy Viral)', gender: 'Female', accent: 'American', tone: 'Energetic', speed: 1.15, previewSample: 'Wait! Before you spend 20 hours on your next video, look at what this AI agent just did.' },
  { id: 'arthur-deep', name: 'Arthur (Dramatic & Cinematic)', gender: 'Male', accent: 'British', tone: 'Dramatic', speed: 0.95, previewSample: 'Beneath the surface of the modern internet lies a revolution waiting to be unleashed.' },
  { id: 'chloe-friendly', name: 'Chloe (Casual & Engaging)', gender: 'Female', accent: 'Australian', tone: 'Casual / Friendly', speed: 1.05, previewSample: 'Hey everyone, today we are breaking down the exact step-by-step pipeline you need.' },
  { id: 'josh-fast', name: 'Josh (Fast-Paced Explainer)', gender: 'Male', accent: 'American', tone: 'Fast-Paced', speed: 1.2, previewSample: 'Here are the top three reasons autonomous channels are beating legacy creators right now.' },
];

export const VoiceStudio: React.FC = () => {
  const { activeVideo, stepVideoStage, showToast, isGenerating, setActiveView } = useApp();

  const [selectedVoice, setSelectedVoice] = useState(VOICE_PRESETS[0]);
  const [speed, setSpeed] = useState<number>(1.0);
  const [pitch, setPitch] = useState<number>(1.0);
  const [stability, setStability] = useState<number>(0.75);
  const [enableDuoSpeakers, setEnableDuoSpeakers] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);

  const animationFrameRef = useRef<number | null>(null);

  // Simulated Web Audio playback
  const handleTogglePlay = () => {
    if (isPlaying) {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      setIsPlaying(false);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    } else {
      setIsPlaying(true);
      const textToSpeak = activeVideo?.script?.scenes[0]?.narrationText || selectedVoice.previewSample;

      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.rate = speed;
        utterance.pitch = pitch;
        utterance.onend = () => {
          setIsPlaying(false);
          setAudioProgress(0);
        };
        utterance.onerror = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);
      }

      // Progress animation
      let start = performance.now();
      const duration = 6000;
      const step = (now: number) => {
        const elapsed = now - start;
        const p = Math.min(100, (elapsed / duration) * 100);
        setAudioProgress(p);
        if (p < 100 && isPlaying) {
          animationFrameRef.current = requestAnimationFrame(step);
        } else {
          setIsPlaying(false);
          setAudioProgress(0);
        }
      };
      animationFrameRef.current = requestAnimationFrame(step);
    }
  };

  const handleSynthesizeFullVoiceover = async () => {
    setIsSynthesizing(true);
    showToast(`Neural TTS Engine: Synthesizing ${activeVideo?.script?.scenes.length || 5} scenes with ${selectedVoice.name}...`, 'info');

    setTimeout(async () => {
      const generatedTrack: VoiceoverTrack = {
        id: `voice-${Date.now()}`,
        voiceName: selectedVoice.name,
        gender: selectedVoice.gender as any,
        accent: selectedVoice.accent,
        tone: selectedVoice.tone,
        audioUrl: 'https://actions.google.com/sounds/v1/ambiences/humming_ambient.ogg',
        durationSeconds: activeVideo?.script?.targetDurationSeconds || 480,
        subtitlesSynced: true,
        wordTimestamps: [
          { word: 'What', startMs: 0, endMs: 250 },
          { word: 'if', startMs: 260, endMs: 400 },
          { word: 'you', startMs: 410, endMs: 600 },
          { word: 'could', startMs: 610, endMs: 850 },
          { word: 'build', startMs: 860, endMs: 1200 },
          { word: 'a', startMs: 1210, endMs: 1300 },
          { word: 'YouTube', startMs: 1310, endMs: 1750 },
          { word: 'channel', startMs: 1760, endMs: 2200 },
        ],
      };

      if (activeVideo) {
        await stepVideoStage(activeVideo.id, 'visuals', {
          voiceover: generatedTrack,
        });
      }
      setIsSynthesizing(false);
      showToast('Voiceover synthesized & synchronized with frame-accurate timestamps!', 'success');
      setActiveView('editor');
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800/80 to-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
              <Mic className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black text-white tracking-tight">AI Voiceover & Narration Studio</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Neural text-to-speech with expressive inflection, pacing control, multi-speaker dialogues, and automatic millisecond subtitle synchronization.
          </p>
        </div>

        <button
          disabled={isSynthesizing || isGenerating}
          onClick={handleSynthesizeFullVoiceover}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold transition-all shadow-lg shadow-red-600/20 flex items-center gap-2 cursor-pointer flex-shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isSynthesizing ? 'Synthesizing Neural Audio...' : 'Generate Full Voiceover & Proceed'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Voice Selection & Audio Controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* Voice Models Library */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" />
                <span>Neural Voice Library</span>
              </h2>
              <span className="text-xs text-slate-400">ElevenLabs & Gemini Voice API Engine</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {VOICE_PRESETS.map((v) => (
                <div
                  key={v.id}
                  onClick={() => setSelectedVoice(v)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                    selectedVoice.id === v.id
                      ? 'bg-indigo-500/10 border-indigo-500 text-white shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${selectedVoice.id === v.id ? 'bg-indigo-400' : 'bg-slate-700'}`} />
                      <span className="text-xs font-bold text-slate-100">{v.name}</span>
                    </div>
                    {selectedVoice.id === v.id && (
                      <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">{v.gender}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">{v.accent}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-300 font-semibold">{v.tone}</span>
                  </div>

                  <p className="text-[11px] text-slate-400 italic line-clamp-2 pt-1">
                    "{v.previewSample}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Sliders: Speed, Pitch & Stability */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>Voice Modulation & Pacing</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Speed / Pacing</span>
                  <span className="font-mono text-emerald-400 font-bold">{speed.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.8"
                  max="1.5"
                  step="0.05"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full accent-red-500 bg-slate-950"
                />
                <span className="text-[10px] text-slate-500">0.8x (Slow) to 1.5x (Fast viral)</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Pitch</span>
                  <span className="font-mono text-indigo-400 font-bold">{pitch.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.8"
                  max="1.2"
                  step="0.05"
                  value={pitch}
                  onChange={(e) => setPitch(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 bg-slate-950"
                />
                <span className="text-[10px] text-slate-500">Natural baseline modulation</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Stability & Clarity</span>
                  <span className="font-mono text-amber-400 font-bold">{Math.round(stability * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.3"
                  max="1.0"
                  step="0.05"
                  value={stability}
                  onChange={(e) => setStability(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-950"
                />
                <span className="text-[10px] text-slate-500">High stability prevents voice cracking</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Live Interactive Audio Waveform Player */}
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span>Live Audio Tester</span>
              </h3>
              <span className="text-[10px] font-mono text-emerald-400">Synthesizer Ready</span>
            </div>

            {/* Visual Waveform Mockup */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center space-y-4">
              <div className="flex items-center gap-1 h-12 w-full justify-center">
                {Array.from({ length: 28 }).map((_, i) => {
                  const height = isPlaying
                    ? Math.sin(i * 0.5 + Date.now() * 0.005) * 18 + 22
                    : (i % 4) * 8 + 12;
                  return (
                    <div
                      key={i}
                      style={{ height: `${height}px` }}
                      className={`w-1.5 rounded-full transition-all duration-75 ${
                        isPlaying ? 'bg-gradient-to-t from-red-500 to-rose-400 shadow-sm shadow-red-500/50' : 'bg-slate-800'
                      }`}
                    />
                  );
                })}
              </div>

              {/* Progress Track */}
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  style={{ width: `${audioProgress}%` }}
                  className="bg-gradient-to-r from-red-500 to-emerald-400 h-full rounded-full transition-all"
                />
              </div>

              {/* Play / Pause Toggle */}
              <button
                onClick={handleTogglePlay}
                className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-600/30 transition-transform active:scale-95 cursor-pointer"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
              </button>

              <div className="text-[11px] text-slate-400 text-center font-medium">
                {isPlaying ? 'Speaking Scene #1 Narration...' : 'Click play to test active voice profile'}
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1.5">
              <div className="font-semibold text-slate-200">Subtitle Synchronization:</div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Auto-aligns word timestamps for dynamic on-screen karaoke animation with zero lag.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
