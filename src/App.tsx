'use client';

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { TrendRadar } from './components/TrendRadar';
import { NicheManager } from './components/NicheManager';
import { CompetitorAnalysis } from './components/CompetitorAnalysis';
import { IdeaStrategist } from './components/IdeaStrategist';
import { ScriptStudio } from './components/ScriptStudio';
import { VoiceStudio } from './components/VoiceStudio';
import { VideoStudio } from './components/VideoStudio';
import { ThumbnailStudio } from './components/ThumbnailStudio';
import { SeoOptimizer } from './components/SeoOptimizer';
import { QualityControlModal } from './components/QualityControlModal';
import { ContentPipeline } from './components/ContentPipeline';
import { AnalyticsIntelligence } from './components/AnalyticsIntelligence';
import { AutomationSettings } from './components/AutomationSettings';
import { ApiConnections } from './components/ApiConnections';
import { ActivityLogDrawer } from './components/ActivityLogDrawer';
import { NewVideoModal } from './components/NewVideoModal';
import { YouTubeConnectionModal } from './components/YouTubeConnectionModal';
import { PublishVideoModal } from './components/PublishVideoModal';
import { WorkflowGuideBar } from './components/WorkflowGuideBar';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, Loader2 } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activeView, isLoading, toast } = useApp();
  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false);

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'trends':
        return <TrendRadar />;
      case 'niche':
        return <NicheManager />;
      case 'competitors':
        return <CompetitorAnalysis />;
      case 'ideas':
        return <IdeaStrategist />;
      case 'scripts':
        return <ScriptStudio />;
      case 'voice':
        return <VoiceStudio />;
      case 'editor':
        return <VideoStudio />;
      case 'thumbnails':
        return <ThumbnailStudio />;
      case 'seo':
        return <SeoOptimizer />;
      case 'quality':
        return <QualityControlModal />;
      case 'pipeline':
        return <ContentPipeline onNewVideo={() => setIsNewModalOpen(true)} />;
      case 'analytics':
        return <AnalyticsIntelligence />;
      case 'automation':
        return <AutomationSettings />;
      case 'api_connections':
        return <ApiConnections />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 antialiased overflow-hidden select-none font-sans">
      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Header onNewProjectClick={() => setIsNewModalOpen(true)} />

        <main className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              <div className="h-96 flex flex-col items-center justify-center space-y-3">
                <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
                <p className="text-xs text-slate-400 font-mono">Initializing AutoTube AI Multi-Agent Core...</p>
              </div>
            ) : (
              <>
                <WorkflowGuideBar />
                {renderActiveView()}
              </>
            )}
          </div>
        </main>
      </div>

      {/* Real-time Execution Logs Drawer */}
      <ActivityLogDrawer />

      {/* Create New Video Modal */}
      <NewVideoModal isOpen={isNewModalOpen} onClose={() => setIsNewModalOpen(false)} />

      {/* YouTube Channel Connection & OAuth Manager Modal */}
      <YouTubeConnectionModal />

      {/* Direct YouTube Video Publishing Modal */}
      <PublishVideoModal />

      {/* Dynamic Global Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div
            className={`px-4 py-3 rounded-xl shadow-2xl border flex items-center gap-2.5 text-xs font-semibold backdrop-blur-md ${
              toast.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200 shadow-emerald-900/30'
                : toast.type === 'error'
                ? 'bg-red-950/90 border-red-500/50 text-red-200 shadow-red-900/30'
                : toast.type === 'warning'
                ? 'bg-amber-950/90 border-amber-500/50 text-amber-200 shadow-amber-900/30'
                : 'bg-slate-900/95 border-slate-700 text-slate-200 shadow-slate-950/50'
            }`}
          >
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />}
            {toast.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-cyan-400 flex-shrink-0" />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
