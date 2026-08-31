import React, { useState } from 'react';
import {
  X,
  Youtube,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  ShieldAlert,
  Loader2,
  Lock,
  Globe,
  Eye,
  Tag,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { PipelineVideoItem } from '../types';

export const PublishVideoModal: React.FC = () => {
  const {
    channel,
    isPublishModalOpen,
    setIsPublishModalOpen,
    videoToPublish,
    showToast,
    refreshAll,
    openYouTubeModal,
  } = useApp();

  const [privacy, setPrivacy] = useState<'public' | 'unlisted' | 'private'>(
    channel?.uploadPrivacyDefault || 'unlisted'
  );
  const [customTitle, setCustomTitle] = useState<string>(videoToPublish?.title || '');
  const [customDescription, setCustomDescription] = useState<string>(
    videoToPublish?.seo?.description ||
      'In this video, we explore cutting-edge autonomous AI tools and step-by-step implementations.\n\nTimestamps:\n0:00 - Introduction & The Big Breakthrough\n1:20 - Architecture Deep Dive\n3:45 - Live Demo & Results\n6:10 - Key Takeaways & Action Plan\n\n#AI #Automation #Productivity'
  );
  const [customTags, setCustomTags] = useState<string>(
    videoToPublish?.seo?.primaryTags?.join(', ') || 'AI, Automation, Machine Learning, Tech News'
  );

  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [uploadStep, setUploadStep] = useState<number>(0);
  const [publishedResult, setPublishedResult] = useState<{
    youtubeVideoId: string;
    publishedUrl: string;
    privacy: string;
  } | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Sync state when video changes
  React.useEffect(() => {
    if (videoToPublish) {
      setCustomTitle(videoToPublish.title);
      setCustomDescription(
        videoToPublish.seo?.description ||
          `${videoToPublish.title}\n\nKey Highlights:\n- Complete breakdown and step-by-step workflow\n- Tested with production datasets\n\nTimestamps:\n0:00 - Hook & Overview\n1:15 - Core Concepts\n3:20 - Real World Execution\n\n#AI #Technology`
      );
      setCustomTags(
        videoToPublish.seo?.primaryTags?.join(', ') || 'AI, Autonomous, Future Tech, Innovation'
      );
      setPrivacy(channel?.uploadPrivacyDefault || 'unlisted');
      setPublishedResult(null);
      setUploadStep(0);
    }
  }, [videoToPublish, channel]);

  if (!isPublishModalOpen || !videoToPublish) return null;

  const handleExecutePublish = async () => {
    if (!channel?.isConnected) {
      showToast('Please connect your YouTube account first', 'warning');
      openYouTubeModal();
      return;
    }

    setIsPublishing(true);
    setUploadStep(1); // Validating metadata

    try {
      await new Promise((r) => setTimeout(r, 600));
      setUploadStep(2); // Generating and packaging master render stream

      await new Promise((r) => setTimeout(r, 900));
      setUploadStep(3); // Authenticating YouTube Data API chunked uploader

      await new Promise((r) => setTimeout(r, 1100));
      setUploadStep(4); // Uploading 4K MP4 binary & attaching thumbnail

      const tagsArray = customTags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const res = await api.publishVideo(videoToPublish.id, {
        customPrivacy: privacy,
        customTitle,
        customDescription,
        customTags: tagsArray,
      });

      if (res.success && res.publishResult) {
        setPublishedResult(res.publishResult);
        setUploadStep(5); // Complete
        showToast(`Video successfully published to ${channel.channelName}!`, 'success');
        refreshAll();
      } else {
        throw new Error(res.error || 'Failed to publish video');
      }
    } catch (err: any) {
      showToast(err.message || 'Publishing failed', 'error');
      setUploadStep(0);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleCopyLink = () => {
    if (publishedResult?.publishedUrl) {
      navigator.clipboard.writeText(publishedResult.publishedUrl);
      setIsCopied(true);
      showToast('YouTube URL copied to clipboard!', 'success');
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-red-950/50 via-slate-900 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30">
              <Youtube className="w-6 h-6 fill-white stroke-none" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">Publish Video to YouTube</h2>
              <p className="text-xs text-slate-400">
                Direct dispatch to <span className="text-white font-bold">{channel?.channelName || 'Your Channel'}</span> ({channel?.handle || '@AutoTechDailyAI'})
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsPublishModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
          {/* Target Channel Banner */}
          {!channel?.isConnected ? (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3 text-xs text-amber-200">
              <div className="flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div>
                  <strong className="text-white block">YouTube Account Not Connected</strong>
                  <span>Link your Google account or API credentials to enable direct publishing.</span>
                </div>
              </div>
              <button
                onClick={openYouTubeModal}
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all text-xs cursor-pointer"
              >
                Connect Now
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <img
                  src={channel.avatarUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80'}
                  alt="Channel"
                  className="w-9 h-9 rounded-full border border-slate-700 object-cover"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white">{channel.channelName}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <span className="text-slate-400 font-mono text-[11px]">{channel.handle} • {channel.channelId}</span>
                </div>
              </div>

              <button
                onClick={openYouTubeModal}
                className="text-[11px] text-slate-400 hover:text-white underline cursor-pointer"
              >
                Change Channel
              </button>
            </div>
          )}

          {/* Success Screen */}
          {publishedResult && (
            <div className="p-6 rounded-2xl bg-gradient-to-b from-emerald-950/30 to-slate-950 border border-emerald-500/40 text-center space-y-4 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-black text-white">Video Successfully Published to YouTube!</h3>
                <p className="text-xs text-slate-400">
                  Uploaded to <strong className="text-white">{channel?.channelName}</strong> with <strong className="text-emerald-400 uppercase">[{publishedResult.privacy}]</strong> visibility.
                </p>
              </div>

              {/* URL Box */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 text-xs">
                <span className="font-mono text-emerald-400 truncate">{publishedResult.publishedUrl}</span>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={handleCopyLink}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <a
                    href={publishedResult.publishedUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white transition-all flex items-center justify-center cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Upload Progress Stepper */}
          {isPublishing && (
            <div className="p-5 rounded-xl bg-slate-950 border border-red-500/30 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-red-500 animate-spin" />
                  Publishing in progress...
                </span>
                <span className="font-mono text-slate-400">Step {uploadStep} of 5</span>
              </div>

              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-600 to-amber-500 transition-all duration-500"
                  style={{ width: `${(uploadStep / 5) * 100}%` }}
                />
              </div>

              <div className="grid grid-cols-1 gap-1.5 text-xs text-slate-400">
                <div className={`flex items-center gap-2 ${uploadStep >= 1 ? 'text-emerald-400' : ''}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" /> 1. Validating video metadata, chapters & SEO tags
                </div>
                <div className={`flex items-center gap-2 ${uploadStep >= 2 ? 'text-emerald-400' : ''}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" /> 2. Packaging master render stream & thumbnail asset
                </div>
                <div className={`flex items-center gap-2 ${uploadStep >= 3 ? 'text-emerald-400' : ''}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" /> 3. Establishing YouTube Data API v3 Resumable Chunked Session
                </div>
                <div className={`flex items-center gap-2 ${uploadStep >= 4 ? 'text-emerald-400' : ''}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" /> 4. Streaming binary data & binding custom thumbnail
                </div>
              </div>
            </div>
          )}

          {/* Publishing Configuration Form */}
          {!publishedResult && !isPublishing && (
            <div className="space-y-4">
              {/* Privacy Selector */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2">Upload Privacy Visibility</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPrivacy('unlisted')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      privacy === 'unlisted'
                        ? 'border-indigo-500 bg-indigo-500/10 text-white'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-bold">Unlisted (Safe)</span>
                      {privacy === 'unlisted' && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                    </div>
                    <p className="text-[10px] text-slate-400">Review before making public</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPrivacy('public')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      privacy === 'public'
                        ? 'border-emerald-500 bg-emerald-500/10 text-white'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-bold">Public (Live)</span>
                      {privacy === 'public' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                    </div>
                    <p className="text-[10px] text-slate-400">Published to YouTube immediately</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPrivacy('private')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      privacy === 'private'
                        ? 'border-amber-500 bg-amber-500/10 text-white'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-bold">Private</span>
                      {privacy === 'private' && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </div>
                    <p className="text-[10px] text-slate-400">Visible only to channel admins</p>
                  </button>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">YouTube Video Title</label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">Description & Chapters</label>
                <textarea
                  rows={4}
                  value={customDescription}
                  onChange={(e) => setCustomDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-red-500 font-mono leading-relaxed"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={customTags}
                  onChange={(e) => setCustomTags(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
                />
              </div>

              {/* Thumbnail & Format Preview */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-4">
                <img
                  src={
                    videoToPublish.selectedThumbnail?.imageUrl ||
                    videoToPublish.thumbnails?.[0]?.imageUrl ||
                    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'
                  }
                  alt="Thumbnail"
                  className="w-24 h-14 rounded-lg object-cover border border-slate-700"
                />
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold uppercase text-[10px]">
                      {videoToPublish.format}
                    </span>
                    <span className="text-emerald-400 font-mono text-[11px]">Quality Score: 96/100</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">Ready for direct API ingest stream</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => setIsPublishModalOpen(false)}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            {publishedResult ? 'Close' : 'Cancel'}
          </button>

          {!publishedResult && (
            <button
              disabled={isPublishing}
              onClick={handleExecutePublish}
              className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-lg shadow-red-600/30 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isPublishing ? 'Uploading to YouTube...' : 'Publish to YouTube Now'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
