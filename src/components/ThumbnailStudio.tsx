import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Sparkles,
  RefreshCw,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Smartphone,
  Monitor,
  Eye,
  Sliders,
  Flame,
  Award,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ThumbnailOption } from '../types';
import { api } from '../services/api';

export const ThumbnailStudio: React.FC = () => {
  const { activeVideo, stepVideoStage, showToast, isGenerating, setActiveView } = useApp();

  const [thumbnails, setThumbnails] = useState<ThumbnailOption[]>(
    activeVideo?.thumbnails && activeVideo.thumbnails.length > 0
      ? activeVideo.thumbnails
      : [
          {
            id: 'thumb-1',
            imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
            textOverlay: '$0 TO 100K VIEWS?',
            colorScheme: 'Neon Green (#10B981) + Obsidian Black',
            focalPoint: 'Surging Neon Analytics Graph with Agent Terminal',
            predictedCtr: 11.4,
            style: 'High Contrast Chart',
            abTestScore: 95,
          },
          {
            id: 'thumb-2',
            imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80',
            textOverlay: 'AI MADE THIS?',
            colorScheme: 'Warning Yellow (#FBBF24) + Deep Navy',
            focalPoint: 'Shocked Robot Creator Face with YouTube Play Icon',
            predictedCtr: 10.8,
            style: 'Curiosity Shock',
            abTestScore: 92,
          },
          {
            id: 'thumb-3',
            imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
            textOverlay: '24/7 AUTOPILOT',
            colorScheme: 'Vibrant Crimson Red (#EF4444) + Cyan Glow',
            focalPoint: 'Autonomous Code Stream & Live Subscriber Counter',
            predictedCtr: 9.9,
            style: 'Tech Breakdown',
            abTestScore: 88,
          },
        ]
  );

  const [selectedThumbId, setSelectedThumbId] = useState<string>(
    activeVideo?.selectedThumbnail?.id || thumbnails[0]?.id || 'thumb-1'
  );
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isGeneratingThumbs, setIsGeneratingThumbs] = useState<boolean>(false);

  const selectedThumbnail = thumbnails.find((t) => t.id === selectedThumbId) || thumbnails[0];

  const handleRegenerateThumbnails = async () => {
    if (!activeVideo) return;
    setIsGeneratingThumbs(true);
    showToast('AI Thumbnail Agent: Generating high-CTR visual compositions...', 'info');
    try {
      const res = await api.generateThumbnails(activeVideo.title, activeVideo.idea?.concept || '', activeVideo.niche);
      if (res.success && res.thumbnails.length > 0) {
        setThumbnails(res.thumbnails);
        setSelectedThumbId(res.thumbnails[0].id);
        showToast(`Generated ${res.thumbnails.length} high-CTR thumbnail variations!`, 'success');
      }
    } catch (err: any) {
      showToast(err.message || 'Thumbnail generation failed', 'error');
    } finally {
      setIsGeneratingThumbs(false);
    }
  };

  const handleProceedToSeo = async () => {
    if (!activeVideo) return;
    showToast('Saving selected thumbnail & launching SEO Agent...', 'info');
    await stepVideoStage(activeVideo.id, 'seo', {
      thumbnails,
      selectedThumbnail,
    });
    setActiveView('seo');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800/80 to-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
              <ImageIcon className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black text-white tracking-tight">AI Thumbnail Generator & CTR Simulator</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Generates high-contrast, mobile-readable thumbnail options with predicted CTR scores and live YouTube feed preview simulation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            disabled={isGeneratingThumbs || isGenerating}
            onClick={handleRegenerateThumbnails}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isGeneratingThumbs ? 'animate-spin' : ''}`} />
            <span>{isGeneratingThumbs ? 'Rendering...' : 'Regenerate Variations'}</span>
          </button>

          <button
            disabled={isGenerating}
            onClick={handleProceedToSeo}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold transition-all shadow-lg shadow-red-600/20 flex items-center gap-2 cursor-pointer"
          >
            <span>Proceed to SEO Optimizer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Thumbnail Options Grid (Section 11) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {thumbnails.map((thumb, idx) => {
          const isSelected = thumb.id === selectedThumbId;
          return (
            <div
              key={thumb.id || idx}
              onClick={() => setSelectedThumbId(thumb.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 relative group ${
                isSelected
                  ? 'bg-slate-800/90 border-red-500 shadow-xl shadow-red-500/10 ring-2 ring-red-500/20'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Image Preview with bold text overlay */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-700/60 shadow-md">
                <img src={thumb.imageUrl} alt="thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                {/* Bold Text Overlay */}
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <span className="inline-block px-2.5 py-1 rounded bg-black/90 font-black text-sm text-yellow-300 font-mono tracking-tight border border-yellow-400/40 shadow-lg">
                    {thumb.textOverlay}
                  </span>
                </div>

                {/* CTR Prediction Badge */}
                <div className="absolute top-2.5 right-2.5">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/90 text-slate-950 font-black font-mono text-xs flex items-center gap-1 shadow-md">
                    <Flame className="w-3.5 h-3.5 fill-slate-950" />
                    {thumb.predictedCtr}% CTR
                  </span>
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-2.5 left-2.5">
                    <span className="p-1 rounded-full bg-red-600 text-white flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                  </div>
                )}
              </div>

              {/* Metadata */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200">Option #{idx + 1}: {thumb.style}</span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">A/B Score: {thumb.abTestScore}/100</span>
                </div>
                <div className="text-[11px] text-slate-400 leading-snug">
                  Focal Point: <span className="text-slate-300">{thumb.focalPoint}</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono">Palette: {thumb.colorScheme}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live YouTube Feed Simulation Stage (Section 11) */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Live YouTube Feed In-Context Simulator
            </h2>
          </div>

          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-xs font-semibold text-slate-400">
            <button
              onClick={() => setPreviewMode('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                previewMode === 'desktop' ? 'bg-slate-800 text-white font-bold' : 'hover:text-slate-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop Feed</span>
            </button>
            <button
              onClick={() => setPreviewMode('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                previewMode === 'mobile' ? 'bg-slate-800 text-white font-bold' : 'hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Feed</span>
            </button>
          </div>
        </div>

        {/* Mock Feed Container */}
        <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
          {previewMode === 'desktop' ? (
            <div className="max-w-md w-full space-y-3">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 shadow-2xl">
                <img src={selectedThumbnail?.imageUrl} alt="preview" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white">
                  8:34
                </div>
                <div className="absolute bottom-2 left-2">
                  <span className="px-2 py-0.5 rounded bg-black/90 text-yellow-300 font-mono font-black text-xs">
                    {selectedThumbnail?.textOverlay}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-red-600 flex-shrink-0 flex items-center justify-center text-white font-bold text-xs">
                  AT
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-100 line-clamp-2 leading-snug">
                    {activeVideo?.title || 'I Built a 24/7 AI YouTube Channel (Here is What It Made)'}
                  </p>
                  <p className="text-xs text-slate-400">AutoTube AI • 24K views • 2 hours ago</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-xs w-full p-4 rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl space-y-3">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                <img src={selectedThumbnail?.imageUrl} alt="mobile preview" className="w-full h-full object-cover" />
                <div className="absolute bottom-1 right-1 px-1 rounded bg-black/80 text-[9px] font-mono text-white">
                  8:34
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-red-600 flex-shrink-0" />
                <div className="space-y-0.5 min-w-0">
                  <p className="text-xs font-bold text-slate-100 line-clamp-2 leading-tight">
                    {activeVideo?.title || 'I Built a 24/7 AI YouTube Channel'}
                  </p>
                  <p className="text-[10px] text-slate-400">AutoTube AI • 24K views</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
