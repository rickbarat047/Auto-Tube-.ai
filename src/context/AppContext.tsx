'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  ChannelProfile,
  AutomationSchedule,
  ChannelAnalyticsOverview,
  TrendingTopic,
  CompetitorChannel,
  PipelineVideoItem,
  AgentLog,
  PipelineStage,
} from '../types';
import { api } from '../services/api';

interface AppContextType {
  channel: ChannelProfile | null;
  schedule: AutomationSchedule | null;
  analytics: ChannelAnalyticsOverview | null;
  trends: TrendingTopic[];
  competitors: CompetitorChannel[];
  pipelineVideos: PipelineVideoItem[];
  logs: AgentLog[];
  activeView: string;
  setActiveView: (view: string) => void;
  activeVideoId: string | null;
  setActiveVideoId: (id: string | null) => void;
  activeVideo: PipelineVideoItem | null;
  isLoading: boolean;
  isGenerating: boolean;
  refreshAll: () => Promise<void>;
  toggleAutopilot: (running: boolean, emergencyStop?: boolean) => Promise<void>;
  createVideoFromTrend: (trend: TrendingTopic) => Promise<PipelineVideoItem>;
  runFullPipelineForVideo: (videoId: string) => Promise<void>;
  stepVideoStage: (videoId: string, targetStage?: PipelineStage, data?: any) => Promise<void>;
  publishVideoNow: (videoId: string) => Promise<void>;
  showToast: (message: string, type?: 'success' | 'info' | 'error' | 'warning') => void;
  toast: { message: string; type: 'success' | 'info' | 'error' | 'warning' } | null;
  isLogDrawerOpen: boolean;
  setIsLogDrawerOpen: (open: boolean) => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  // YouTube Integration & Modals
  isYouTubeModalOpen: boolean;
  setIsYouTubeModalOpen: (open: boolean) => void;
  openYouTubeModal: () => void;
  closeYouTubeModal: () => void;
  isPublishModalOpen: boolean;
  setIsPublishModalOpen: (open: boolean) => void;
  videoToPublish: PipelineVideoItem | null;
  publishModalTab: 'inspect' | 'publish';
  setPublishModalTab: (tab: 'inspect' | 'publish') => void;
  openPublishModal: (video: PipelineVideoItem, initialTab?: 'inspect' | 'publish') => void;
  openInspectModal: (video: PipelineVideoItem) => void;
  closePublishModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [channel, setChannel] = useState<ChannelProfile | null>(null);
  const [schedule, setSchedule] = useState<AutomationSchedule | null>(null);
  const [analytics, setAnalytics] = useState<ChannelAnalyticsOverview | null>(null);
  const [trends, setTrends] = useState<TrendingTopic[]>([]);
  const [competitors, setCompetitors] = useState<CompetitorChannel[]>([]);
  const [pipelineVideos, setPipelineVideos] = useState<PipelineVideoItem[]>([]);
  const [logs, setLogs] = useState<AgentLog[]>([]);
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' | 'warning' } | null>(null);
  const [isLogDrawerOpen, setIsLogDrawerOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // YouTube modal states
  const [isYouTubeModalOpen, setIsYouTubeModalOpen] = useState<boolean>(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState<boolean>(false);
  const [videoToPublish, setVideoToPublish] = useState<PipelineVideoItem | null>(null);
  const [publishModalTab, setPublishModalTab] = useState<'inspect' | 'publish'>('inspect');

  const openYouTubeModal = () => setIsYouTubeModalOpen(true);
  const closeYouTubeModal = () => setIsYouTubeModalOpen(false);

  const openPublishModal = (video: PipelineVideoItem, initialTab: 'inspect' | 'publish' = 'inspect') => {
    setVideoToPublish(video);
    setPublishModalTab(initialTab);
    setIsPublishModalOpen(true);
  };

  const openInspectModal = (video: PipelineVideoItem) => {
    openPublishModal(video, 'inspect');
  };

  const closePublishModal = () => {
    setIsPublishModalOpen(false);
    setVideoToPublish(null);
  };

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'error' | 'warning' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  const refreshAll = useCallback(async () => {
    try {
      const [channelData, trendsData, competitorsData, pipelineData, logsData] = await Promise.all([
        api.getChannel(),
        api.getTrends(),
        api.getCompetitors(),
        api.getPipeline(),
        api.getLogs(),
      ]);

      if (channelData) {
        setChannel(channelData.channel);
        setSchedule(channelData.schedule);
        setAnalytics(channelData.analyticsOverview);
      }
      if (trendsData) setTrends(trendsData.trends);
      if (competitorsData) setCompetitors(competitorsData.competitors);
      if (pipelineData) {
        setPipelineVideos(pipelineData.videos);
        if (!activeVideoId && pipelineData.videos.length > 0) {
          setActiveVideoId(pipelineData.videos[0].id);
        }
      }
      if (logsData) setLogs(logsData.logs);
    } catch (err) {
      console.error('Failed to load AutoTube AI data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [activeVideoId]);

  useEffect(() => {
    refreshAll();
    const interval = setInterval(async () => {
      try {
        const [logsData, pipelineData] = await Promise.all([api.getLogs(), api.getPipeline()]);
        if (logsData) setLogs(logsData.logs);
        if (pipelineData) setPipelineVideos(pipelineData.videos);
      } catch (err) {
        // silent sync
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [refreshAll]);

  const toggleAutopilot = async (running: boolean, emergencyStop?: boolean) => {
    try {
      const res = await api.toggleAutopilot(running, emergencyStop);
      if (res.success) {
        setChannel((prev) => (prev ? { ...prev, isAutopilotRunning: res.isAutopilotRunning, automationMode: res.automationMode as any } : null));
        if (emergencyStop) {
          showToast('EMERGENCY STOP ACTIVATED: Autopilot paused & switched to manual approval mode.', 'warning');
        } else {
          showToast(`Autopilot ${running ? 'Resumed' : 'Paused'} successfully`, 'success');
        }
        refreshAll();
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to update autopilot status', 'error');
    }
  };

  const createVideoFromTrend = async (trend: TrendingTopic): Promise<PipelineVideoItem> => {
    setIsGenerating(true);
    showToast(`Initializing pipeline project for: "${trend.potentialTitle}"`, 'info');
    try {
      const res = await api.createPipelineVideo({
        topic: trend,
        title: trend.potentialTitle,
        niche: trend.niche,
        format: trend.recommendedFormat,
      });

      if (res.success && res.video) {
        setPipelineVideos((prev) => [res.video, ...prev]);
        setActiveVideoId(res.video.id);
        showToast('Created pipeline project! Switching to Content Strategist...', 'success');
        setActiveView('ideas');
        refreshAll();
        return res.video;
      }
      throw new Error('Failed to initialize pipeline item');
    } catch (err: any) {
      showToast(err.message || 'Error creating video project', 'error');
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };

  const stepVideoStage = async (videoId: string, targetStage?: PipelineStage, data?: any) => {
    try {
      const res = await api.stepPipeline(videoId, targetStage, data);
      if (res.success && res.video) {
        setPipelineVideos((prev) => prev.map((v) => (v.id === videoId ? res.video : v)));
        showToast(`Video progressed to [${(res.video.currentStage || '').toUpperCase()}]`, 'success');
        refreshAll();
      }
    } catch (err: any) {
      showToast(err.message || 'Stage step failed', 'error');
    }
  };

  const publishVideoNow = async (videoId: string) => {
    setIsGenerating(true);
    showToast('Executing YouTube OAuth upload & publishing pipeline...', 'info');
    try {
      const res = await api.publishVideo(videoId);
      if (res.success && res.video) {
        setPipelineVideos((prev) => prev.map((v) => (v.id === videoId ? res.video : v)));
        showToast(`Video successfully published to YouTube! ID: ${res.video.youtubeVideoId}`, 'success');
        refreshAll();
      }
    } catch (err: any) {
      showToast(err.message || 'Publishing failed', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const runFullPipelineForVideo = async (videoId: string) => {
    const video = pipelineVideos.find((v) => v.id === videoId);
    if (!video) return;

    setIsGenerating(true);
    showToast('Orchestrator Agent: Starting autonomous end-to-end execution...', 'info');

    try {
      // 1. Content Strategy (Ideas)
      showToast('1/7 Content Strategist generating hooks & title variations...', 'info');
      const ideaRes = await api.generateIdeas(video.title, video.niche, channel?.targetAudience, video.format);
      const selectedIdea = ideaRes.ideas[0];

      // 2. Script Writing
      showToast('2/7 Script Agent engineering high-retention scenes...', 'info');
      const scriptRes = await api.generateScript({
        title: selectedIdea?.selectedTitle || video.title,
        concept: selectedIdea?.concept || video.title,
        format: video.format,
        durationSeconds: video.format === 'short' ? 50 : 180,
      });

      // 3. Thumbnails
      showToast('3/7 Thumbnail Agent generating high-CTR visual mockups...', 'info');
      const thumbRes = await api.generateThumbnails(selectedIdea?.selectedTitle || video.title, selectedIdea?.concept || '', video.niche);

      // 4. SEO
      showToast('4/7 SEO Agent optimizing description, tags & chapters...', 'info');
      const seoRes = await api.generateSeo(selectedIdea?.selectedTitle || video.title, scriptRes.script.fullNarrationText, video.niche);

      // 5. Quality Control
      showToast('5/7 Quality Control running compliance & hallucination audit...', 'info');
      const qcRes = await api.runQualityCheck(selectedIdea?.selectedTitle || video.title, scriptRes.script.fullNarrationText, scriptRes.script.scenes);

      // Step to Ready
      await api.stepPipeline(videoId, 'ready', {
        title: selectedIdea?.selectedTitle || video.title,
        idea: selectedIdea,
        script: scriptRes.script,
        thumbnails: thumbRes.thumbnails,
        selectedThumbnail: thumbRes.thumbnails[0],
        seo: seoRes.seo,
        qualityCheck: qcRes.quality,
      });

      showToast('Autonomous pipeline completed! Video is fully assembled and Ready.', 'success');
      refreshAll();
    } catch (err: any) {
      showToast(`Autonomous pipeline encountered an error: ${err.message}`, 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const activeVideo = pipelineVideos.find((v) => v.id === activeVideoId) || pipelineVideos[0] || null;

  return (
    <AppContext.Provider
      value={{
        channel,
        schedule,
        analytics,
        trends,
        competitors,
        pipelineVideos,
        logs,
        activeView,
        setActiveView,
        activeVideoId,
        setActiveVideoId,
        activeVideo,
        isLoading,
        isGenerating,
        refreshAll,
        toggleAutopilot,
        createVideoFromTrend,
        runFullPipelineForVideo,
        stepVideoStage,
        publishVideoNow,
        showToast,
        toast,
        isLogDrawerOpen,
        setIsLogDrawerOpen,
        theme,
        setTheme,
        isYouTubeModalOpen,
        setIsYouTubeModalOpen,
        openYouTubeModal,
        closeYouTubeModal,
        isPublishModalOpen,
        setIsPublishModalOpen,
        videoToPublish,
        publishModalTab,
        setPublishModalTab,
        openPublishModal,
        openInspectModal,
        closePublishModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
