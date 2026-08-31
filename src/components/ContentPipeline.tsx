import React, { useState } from 'react';
import {
  Kanban,
  List,
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  Clock,
  Upload,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  ChevronRight,
  Plus,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PipelineStage, PipelineVideoItem } from '../types';

const STAGES: { id: PipelineStage; label: string; color: string }[] = [
  { id: 'research', label: '1. Topic Found', color: 'border-blue-500/40 text-blue-400' },
  { id: 'ideas', label: '2. Idea Selected', color: 'border-amber-500/40 text-amber-400' },
  { id: 'script', label: '3. Script Generated', color: 'border-indigo-500/40 text-indigo-400' },
  { id: 'voiceover', label: '4. Voiceover (TTS)', color: 'border-cyan-500/40 text-cyan-400' },
  { id: 'visuals', label: '5. Visuals Sourced', color: 'border-purple-500/40 text-purple-400' },
  { id: 'editing', label: '6. Video Assembled', color: 'border-pink-500/40 text-pink-400' },
  { id: 'thumbnail', label: '7. Thumbnail Made', color: 'border-rose-500/40 text-rose-400' },
  { id: 'seo', label: '8. SEO Optimized', color: 'border-orange-500/40 text-orange-400' },
  { id: 'quality_check', label: '9. Quality Check', color: 'border-emerald-500/40 text-emerald-400' },
  { id: 'ready', label: '10. Ready / Published', color: 'border-green-500/40 text-green-400' },
];

export const ContentPipeline: React.FC<{ onNewVideo: () => void }> = ({ onNewVideo }) => {
  const {
    pipelineVideos,
    setActiveVideoId,
    setActiveView,
    runFullPipelineForVideo,
    openPublishModal,
    isGenerating,
  } = useApp();

  const [viewLayout, setViewLayout] = useState<'kanban' | 'list'>('kanban');

  const handleOpenVideoEditor = (video: PipelineVideoItem) => {
    setActiveVideoId(video.id);
    if (video.currentStage === 'script') setActiveView('scripts');
    else if (video.currentStage === 'voiceover') setActiveView('voice');
    else if (video.currentStage === 'visuals' || video.currentStage === 'editing') setActiveView('editor');
    else if (video.currentStage === 'thumbnail') setActiveView('thumbnails');
    else if (video.currentStage === 'seo') setActiveView('seo');
    else if (video.currentStage === 'quality_check') setActiveView('quality');
    else setActiveView('ideas');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800/80 to-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
              <Kanban className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black text-white tracking-tight">Content Pipeline Board</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Live 10-stage autonomous production board with real-time status tracking, manual overrides, and instant publishing.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Layout Toggle */}
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-xs font-semibold text-slate-400">
            <button
              onClick={() => setViewLayout('kanban')}
              className={`p-2 rounded-md transition-all ${
                viewLayout === 'kanban' ? 'bg-slate-800 text-white' : 'hover:text-slate-200'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewLayout('list')}
              className={`p-2 rounded-md transition-all ${
                viewLayout === 'list' ? 'bg-slate-800 text-white' : 'hover:text-slate-200'
              }`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={onNewVideo}
            className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-lg shadow-red-600/20 flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Video Pipeline</span>
          </button>
        </div>
      </div>

      {/* Kanban View */}
      {viewLayout === 'kanban' ? (
        <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
          {STAGES.map((stage) => {
            const videosInStage = pipelineVideos.filter((v) => {
              if (stage.id === 'ready') return v.currentStage === 'ready' || v.currentStage === 'scheduled' || v.currentStage === 'published';
              return v.currentStage === stage.id;
            });

            return (
              <div
                key={stage.id}
                className="w-72 flex-shrink-0 bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex flex-col space-y-3 min-h-[500px]"
              >
                {/* Stage Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className={`text-xs font-bold ${stage.color}`}>{stage.label}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                    {videosInStage.length}
                  </span>
                </div>

                {/* Video Cards in Column */}
                <div className="space-y-3 flex-1 overflow-y-auto pr-0.5">
                  {videosInStage.map((video) => (
                    <div
                      key={video.id}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all space-y-2.5 group relative"
                    >
                      {/* Thumbnail or Format Tag */}
                      {video.selectedThumbnail ? (
                        <div className="relative aspect-video rounded-lg overflow-hidden border border-slate-800">
                          <img src={video.selectedThumbnail.imageUrl} alt="thumb" className="w-full h-full object-cover" />
                          <div className="absolute bottom-1 right-1 px-1 rounded bg-black/80 text-[9px] text-white font-mono">
                            {video.format === 'short' ? 'Short' : '8m'}
                          </div>
                        </div>
                      ) : (
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                          {video.format === 'short' ? '⚡ 50s Short' : '🎬 Long-Form'}
                        </span>
                      )}

                      <h4 className="text-xs font-bold text-slate-200 line-clamp-2 leading-snug group-hover:text-red-400 transition-colors">
                        {video.title}
                      </h4>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1">
                        <span>Est. Cost: ${video.estimatedCost?.total?.toFixed(2) || '0.00'}</span>
                        <span
                          className={`font-bold ${
                            video.status === 'ready' || video.status === 'published'
                              ? 'text-emerald-400'
                              : 'text-amber-400'
                          }`}
                        >
                          {(video.status || 'in_progress').toUpperCase()}
                        </span>
                      </div>

                      {/* Card Actions */}
                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-1.5">
                        <button
                          onClick={() => handleOpenVideoEditor(video)}
                          className="flex-1 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Edit className="w-3 h-3" />
                          <span>Inspect</span>
                        </button>

                        {video.currentStage !== 'ready' && video.currentStage !== 'published' && (
                          <button
                            disabled={isGenerating}
                            onClick={() => runFullPipelineForVideo(video.id)}
                            title="Run Full Autonomous Pipeline"
                            className="p-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold cursor-pointer"
                          >
                            <Sparkles className="w-3 h-3" />
                          </button>
                        )}

                        {(video.currentStage === 'ready' || video.currentStage === 'scheduled') && (
                          <button
                            disabled={isGenerating}
                            onClick={() => openPublishModal(video)}
                            title="Publish to Connected YouTube Channel"
                            className="p-1 rounded bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold cursor-pointer flex items-center gap-1"
                          >
                            <Upload className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {videosInStage.length === 0 && (
                    <div className="p-4 text-center text-slate-600 text-xs border border-dashed border-slate-800 rounded-lg">
                      Empty
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
          {pipelineVideos.map((video) => (
            <div
              key={video.id}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 min-w-0">
                {video.selectedThumbnail ? (
                  <img src={video.selectedThumbnail.imageUrl} alt="thumb" className="w-20 h-12 object-cover rounded-lg flex-shrink-0" />
                ) : (
                  <div className="w-20 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-[10px] text-slate-400 font-bold flex-shrink-0">
                    NO PREVIEW
                  </div>
                )}
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {video.format}
                    </span>
                    <span className="text-xs font-mono text-emerald-400">Stage: [{(video.currentStage || 'ideas').toUpperCase()}]</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-100 truncate">{video.title}</h4>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={() => handleOpenVideoEditor(video)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Edit / Inspect
                </button>
                {(video.currentStage === 'ready' || video.currentStage === 'scheduled') && (
                  <button
                    onClick={() => openPublishModal(video)}
                    className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Publish to YouTube</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
