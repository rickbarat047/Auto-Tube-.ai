'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { VideoPreview } from './VideoPreview';

export const VideoPreviewModal: React.FC = () => {
  const {
    isVideoPreviewOpen,
    videoForPreview,
    closeVideoPreview,
    openPublishModal,
    setActiveVideoId,
    setActiveView,
  } = useApp();

  if (!isVideoPreviewOpen || !videoForPreview) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-6xl my-auto">
        <VideoPreview
          video={videoForPreview}
          isModal={true}
          onClose={closeVideoPreview}
          onProceedToPublish={() => {
            closeVideoPreview();
            openPublishModal(videoForPreview, 'publish');
          }}
          onEditInStudio={() => {
            closeVideoPreview();
            setActiveVideoId(videoForPreview.id);
            setActiveView('editor');
          }}
        />
      </div>
    </div>
  );
};
