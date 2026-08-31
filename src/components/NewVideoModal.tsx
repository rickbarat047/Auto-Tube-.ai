import React, { useState } from 'react';
import { X, Sparkles, Video, Film, ArrowRight, Bot } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ContentFormat } from '../types';
import { api } from '../services/api';

export const NewVideoModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { channel, showToast, refreshAll, setActiveVideoId, setActiveView, runFullPipelineForVideo } = useApp();

  const [titlePrompt, setTitlePrompt] = useState<string>('');
  const [format, setFormat] = useState<ContentFormat>('long_form');
  const [autoRunFull, setAutoRunFull] = useState<boolean>(true);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCreate = async () => {
    if (!titlePrompt.trim()) return;
    setIsCreating(true);
    showToast(`Initializing pipeline project for "${titlePrompt}"...`, 'info');
    try {
      const res = await api.createPipelineVideo({
        title: titlePrompt.trim(),
        niche: channel?.primaryNiche || 'AI Tools & Automation',
        format,
      });

      if (res.success && res.video) {
        setActiveVideoId(res.video.id);
        onClose();
        if (autoRunFull) {
          showToast('Triggering full autonomous agent pipeline...', 'info');
          runFullPipelineForVideo(res.video.id);
        } else {
          showToast('Project created! Navigating to Content Strategist.', 'success');
          setActiveView('ideas');
        }
        refreshAll();
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to create project', 'error');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-red-500" />
            <h3 className="text-base font-bold text-white">Start New Autonomous Video Project</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Video Topic / Working Title / Premise</label>
            <input
              type="text"
              placeholder="e.g. 5 AI Agents That Will Replace Junior Developers in 2026..."
              value={titlePrompt}
              onChange={(e) => setTitlePrompt(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1.5">Format Target</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormat('long_form')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                  format === 'long_form'
                    ? 'bg-red-500/10 border-red-500 text-white font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Video className="w-5 h-5 text-red-400" />
                <span>Long-Form (8-10 mins)</span>
              </button>

              <button
                type="button"
                onClick={() => setFormat('short')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                  format === 'short'
                    ? 'bg-red-500/10 border-red-500 text-white font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Film className="w-5 h-5 text-amber-400" />
                <span>YouTube Short (50s)</span>
              </button>
            </div>
          </div>

          <div
            onClick={() => setAutoRunFull(!autoRunFull)}
            className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Bot className="w-4 h-4 text-indigo-400" />
              <div>
                <div className="font-bold text-slate-200">Run Full Multi-Agent Pipeline Immediately</div>
                <div className="text-[11px] text-slate-400">Strategist -&gt; Script -&gt; Voiceover -&gt; Editor -&gt; SEO -&gt; QC</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={autoRunFull}
              onChange={() => {}}
              className="w-4 h-4 accent-red-500 rounded"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isCreating || !titlePrompt.trim()}
            onClick={handleCreate}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold transition-all shadow-lg shadow-red-600/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{isCreating ? 'Launching Agent...' : 'Create & Launch Pipeline'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
