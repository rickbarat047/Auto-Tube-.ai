'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ChevronRight,
  Eye,
  CheckCircle2,
  Play,
  ArrowRight,
  Flame,
  Lightbulb,
  FileText,
  Mic,
  Film,
  Image as ImageIcon,
  Tag,
  Upload,
  ChevronDown,
  ChevronUp,
  Bot,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PipelineStage } from '../types';

const WORKFLOW_STEPS = [
  { id: 'trends', stage: 'research', label: '1. Trends', icon: Flame, color: 'text-amber-400' },
  { id: 'ideas', stage: 'ideas', label: '2. Ideas', icon: Lightbulb, color: 'text-yellow-400' },
  { id: 'scripts', stage: 'script', label: '3. Script', icon: FileText, color: 'text-indigo-400' },
  { id: 'voice', stage: 'voiceover', label: '4. Voice (TTS)', icon: Mic, color: 'text-cyan-400' },
  { id: 'editor', stage: 'editing', label: '5. Video & FX', icon: Film, color: 'text-pink-400' },
  { id: 'thumbnails', stage: 'thumbnail', label: '6. Thumbnails', icon: ImageIcon, color: 'text-rose-400' },
  { id: 'seo', stage: 'seo', label: '7. SEO & Tags', icon: Tag, color: 'text-orange-400' },
  { id: 'publish', stage: 'ready', label: '8. Publish', icon: Upload, color: 'text-emerald-400' },
];

export const WorkflowGuideBar: React.FC = () => {
  const {
    activeVideo,
    activeView,
    setActiveView,
    openInspectModal,
    openPublishModal,
    runFullPipelineForVideo,
    isGenerating,
  } = useApp();

  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  // Determine active step index
  const currentStepIdx = WORKFLOW_STEPS.findIndex((s) => s.id === activeView);

  const getNextAction = () => {
    if (!activeVideo) return { label: 'Start from Trends', view: 'trends' };
    const stage = activeVideo.currentStage;
    if (stage === 'research') return { label: 'Select Idea', view: 'ideas' };
    if (stage === 'ideas') return { label: 'Generate Script', view: 'scripts' };
    if (stage === 'script') return { label: 'Synthesize Voiceover', view: 'voice' };
    if (stage === 'voiceover') return { label: 'Assemble Video', view: 'editor' };
    if (stage === 'visuals' || stage === 'editing') return { label: 'Design Thumbnails', view: 'thumbnails' };
    if (stage === 'thumbnail') return { label: 'Optimize SEO & Tags', view: 'seo' };
    if (stage === 'seo') return { label: 'Run Quality Check', view: 'quality' };
    if (stage === 'quality_check' || stage === 'ready') return { label: 'Review & Publish to YouTube', view: 'publish' };
    return { label: 'View Pipeline', view: 'pipeline' };
  };

  const nextAction = getNextAction();

  return (
    <div className="mb-6 rounded-2xl bg-gradient-to-r from-slate-900/95 via-slate-850 to-slate-900/95 border border-slate-800/90 shadow-xl overflow-hidden backdrop-blur-md">
      {/* Header bar of Workflow Guide */}
      <div className="px-4 py-2.5 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="p-1.5 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30 flex-shrink-0">
            <Zap className="w-3.5 h-3.5" />
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white tracking-tight">
                Autonomous Workflow Guide
              </span>
              {activeVideo && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 truncate max-w-[200px] hidden sm:inline-block">
                  {activeVideo.title}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Quick Action Group */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {activeVideo && (
            <button
              onClick={() => openInspectModal(activeVideo)}
              className="px-3 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-200 border border-indigo-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              title="Inspect all AI generated artifacts (video, script, SEO, thumbnail)"
            >
              <Eye className="w-3.5 h-3.5 text-indigo-400" />
              <span>See What AI Created</span>
            </button>
          )}

          {activeVideo && activeVideo.currentStage !== 'ready' && activeVideo.currentStage !== 'published' && (
            <button
              disabled={isGenerating}
              onClick={() => runFullPipelineForVideo(activeVideo.id)}
              className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm shadow-red-600/20 disabled:opacity-50"
              title="Run all remaining autonomous AI creation stages automatically"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Auto-Run Remaining Steps</span>
            </button>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
            aria-label="Toggle workflow bar"
          >
            {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Stepper Navigation Body */}
      {!isCollapsed && (
        <div className="p-3 bg-slate-900/60 overflow-x-auto custom-scrollbar">
          <div className="flex items-center gap-1.5 min-w-[760px]">
            {WORKFLOW_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeView === step.id;
              const isPast = currentStepIdx > idx;

              return (
                <React.Fragment key={step.id}>
                  <button
                    onClick={() => {
                      if (step.id === 'publish') {
                        if (activeVideo) openPublishModal(activeVideo, 'inspect');
                        else setActiveView('pipeline');
                      } else {
                        setActiveView(step.id);
                      }
                    }}
                    className={`flex-1 px-2.5 py-2 rounded-xl text-left transition-all border cursor-pointer flex items-center gap-2 group relative ${
                      isActive
                        ? 'bg-slate-800 border-red-500/50 shadow-md shadow-red-500/10'
                        : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 ${
                        isActive
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : isPast
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-slate-900 text-slate-500'
                      }`}
                    >
                      {isPast ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
                    </div>

                    <div className="min-w-0 flex-1">
                      <span
                        className={`text-[11px] font-bold block truncate leading-tight ${
                          isActive ? 'text-white' : 'text-slate-300'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>

                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse flex-shrink-0" />
                    )}
                  </button>

                  {idx < WORKFLOW_STEPS.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-700 flex-shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
