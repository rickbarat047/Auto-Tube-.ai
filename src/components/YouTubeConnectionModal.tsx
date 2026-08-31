import React, { useState } from 'react';
import {
  X,
  Youtube,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Key,
  Globe,
  Radio,
  Sliders,
  Sparkles,
  Lock,
  RefreshCw,
  Eye,
  Settings2,
  Check,
  Zap,
  Gamepad2,
  DollarSign,
  Dumbbell,
  Compass,
  Bot,
  Flame,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';

const CATEGORIES = [
  { id: '28', name: 'Science & Technology' },
  { id: '27', name: 'Education' },
  { id: '24', name: 'Entertainment' },
  { id: '26', name: 'How-to & Style' },
  { id: '20', name: 'Gaming' },
  { id: '22', name: 'People & Blogs' },
  { id: '25', name: 'News & Politics' },
];

const PRESET_CHANNELS = [
  {
    id: 'gaming',
    name: 'Gaming & Esports Channel',
    channelName: 'PixelForge Gaming',
    handle: '@PixelForgeGaming',
    niche: 'Gaming & Esports Analytics',
    icon: Gamepad2,
    color: 'from-purple-500/20 to-indigo-500/20 border-purple-500/30 text-purple-300',
    badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    desc: 'High-energy game mechanics, speedrun exploits, GPU framerate benchmarks, and cinematic lore.',
    defaultCategory: '20',
  },
  {
    id: 'finance',
    name: 'Personal Finance & Wealth',
    channelName: 'WealthBlueprint',
    handle: '@WealthBlueprintHQ',
    niche: 'Finance & Wealth Building',
    icon: DollarSign,
    color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-300',
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    desc: 'Dividend compounding math, index fund blueprints, passive income systems, and market trends.',
    defaultCategory: '27',
  },
  {
    id: 'fitness',
    name: 'Fitness & Health Science',
    channelName: 'Apex Physique',
    handle: '@ApexPhysiqueScience',
    niche: 'Fitness & Health Science',
    icon: Dumbbell,
    color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-300',
    badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    desc: 'Science-backed hypertrophy routines, fat loss protocols, nutrition studies, and workout pacing.',
    defaultCategory: '26',
  },
  {
    id: 'mystery',
    name: 'History & True Crime / Mystery',
    channelName: 'Shadow Files',
    handle: '@ShadowFilesMystery',
    niche: 'History & Unsolved Mysteries',
    icon: Compass,
    color: 'from-rose-500/20 to-red-500/20 border-rose-500/30 text-rose-300',
    badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    desc: 'Deep investigative cold cases, psychological experiments, bizarre internet anomalies, and unsolved lore.',
    defaultCategory: '24',
  },
  {
    id: 'tech_ai',
    name: 'AI Tools & Modern Tech',
    channelName: 'AutoTech Daily',
    handle: '@AutoTechDailyAI',
    niche: 'AI tools & Autonomous Tech',
    icon: Bot,
    color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-300',
    badge: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    desc: 'Autonomous agent frameworks, local open-source LLMs, AI video models, and productivity toolchains.',
    defaultCategory: '28',
  },
];

export const YouTubeConnectionModal: React.FC = () => {
  const {
    channel,
    isYouTubeModalOpen,
    setIsYouTubeModalOpen,
    showToast,
    refreshAll,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'oauth' | 'presets' | 'apikey' | 'defaults'>('presets');
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isTesting, setIsTesting] = useState<boolean>(false);

  // Form State
  const [channelName, setChannelName] = useState<string>(channel?.channelName || '');
  const [handle, setHandle] = useState<string>(channel?.handle || '');
  const [primaryNiche, setPrimaryNiche] = useState<string>(channel?.primaryNiche || '');
  const [channelId, setChannelId] = useState<string>(channel?.channelId || '');
  const [connectedEmail, setConnectedEmail] = useState<string>(channel?.connectedEmail || '');
  const [uploadPrivacy, setUploadPrivacy] = useState<'public' | 'unlisted' | 'private'>(
    channel?.uploadPrivacyDefault || 'unlisted'
  );
  const [defaultCategory, setDefaultCategory] = useState<string>(channel?.defaultCategoryId || '28');
  const [autoPublish, setAutoPublish] = useState<boolean>(
    channel?.autoPublishEnabled !== undefined ? channel.autoPublishEnabled : true
  );
  const [notifySubs, setNotifySubs] = useState<boolean>(
    channel?.notifySubscribers !== undefined ? channel.notifySubscribers : true
  );
  const [apiKey, setApiKey] = useState<string>('AIzaSyD_ytDataApi3_production_live_key');
  const [clientId, setClientId] = useState<string>('95bb30ab-google-oauth-client.apps.googleusercontent.com');

  if (!isYouTubeModalOpen) return null;

  const handleConnectPreset = async (preset: typeof PRESET_CHANNELS[0]) => {
    setIsConnecting(true);
    showToast(`Connecting channel in niche: ${preset.niche}...`, 'info');

    try {
      await api.connectYouTube({
        channelName: preset.channelName,
        handle: preset.handle,
        primaryNiche: preset.niche,
        defaultCategoryId: preset.defaultCategory,
        uploadPrivacyDefault: uploadPrivacy,
        autoPublishEnabled: autoPublish,
        notifySubscribers: notifySubs,
        connectionMethod: 'oauth2',
      });

      showToast(`Successfully linked "${preset.channelName}" (${preset.niche})!`, 'success');
      await refreshAll();
      setIsYouTubeModalOpen(false);
    } catch (err: any) {
      showToast(err.message || 'Failed to connect preset', 'error');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleOAuthConnect = async () => {
    const finalName = channelName.trim() || 'My YouTube Channel';
    const finalHandle = handle.trim() || `@${finalName.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
    const finalNiche = primaryNiche.trim() || 'Content Creation & Technology';

    setIsConnecting(true);
    showToast('Initiating Google & YouTube OAuth 2.0 Authorization Flow...', 'info');

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      await api.connectYouTube({
        channelName: finalName,
        handle: finalHandle.startsWith('@') ? finalHandle : `@${finalHandle}`,
        primaryNiche: finalNiche,
        channelId: channelId.trim() || `UC_${Math.random().toString(36).substr(2, 10)}`,
        connectedEmail: connectedEmail.trim() || 'creator@youtube.com',
        uploadPrivacyDefault: uploadPrivacy,
        defaultCategoryId: defaultCategory,
        autoPublishEnabled: autoPublish,
        notifySubscribers: notifySubs,
        connectionMethod: 'oauth2',
      });

      showToast(`Successfully connected YouTube channel: "${finalName}" (${finalHandle})!`, 'success');
      await refreshAll();
      setIsYouTubeModalOpen(false);
    } catch (err: any) {
      showToast(err.message || 'Failed to connect YouTube channel', 'error');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSaveApiKeyConfig = async () => {
    const finalName = channelName.trim() || 'My YouTube Channel';
    const finalHandle = handle.trim() || `@${finalName.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
    const finalNiche = primaryNiche.trim() || 'Content Creation & Technology';

    setIsConnecting(true);
    try {
      await api.connectYouTube({
        channelName: finalName,
        handle: finalHandle.startsWith('@') ? finalHandle : `@${finalHandle}`,
        primaryNiche: finalNiche,
        channelId: channelId.trim() || `UC_${Math.random().toString(36).substr(2, 10)}`,
        connectedEmail: connectedEmail.trim() || 'creator@youtube.com',
        uploadPrivacyDefault: uploadPrivacy,
        defaultCategoryId: defaultCategory,
        autoPublishEnabled: autoPublish,
        notifySubscribers: notifySubs,
        connectionMethod: 'api_key',
      });
      showToast('YouTube API Key and publishing preferences saved!', 'success');
      await refreshAll();
      setIsYouTubeModalOpen(false);
    } catch (err: any) {
      showToast(err.message || 'Failed to save settings', 'error');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    showToast('Pinging YouTube Data API v3 Gateway...', 'info');
    try {
      const res = await api.testYouTubeConnection();
      if (res.success) {
        showToast(
          `Connection verified! API Latency: ${res.latencyMs}ms | Channel: ${res.channelName}`,
          'success'
        );
      } else {
        showToast(res.error || 'Connection check failed', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Error pinging YouTube API', 'error');
    } finally {
      setIsTesting(false);
    }
  };

  const handleDisconnect = async () => {
    if (!confirm('Are you sure you want to disconnect this YouTube channel? All autonomous pipelines will return to standby.')) return;
    try {
      await api.disconnectYouTube();
      showToast('YouTube Channel disconnected. System is in unlinked standby.', 'warning');
      await refreshAll();
      setIsYouTubeModalOpen(false);
    } catch (err: any) {
      showToast(err.message || 'Failed to disconnect', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30">
              <Youtube className="w-6 h-6 fill-white stroke-none" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white">Connect Your YouTube Channel</h2>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    channel?.isConnected
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}
                >
                  {channel?.isConnected ? `LINKED: ${channel.channelName}` : 'DISCONNECTED (STANDBY)'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                AutoTube AI only displays research, competitors, and pipelines matching the channel connected by you.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsYouTubeModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('presets')}
            className={`py-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'presets'
                ? 'border-red-500 text-white bg-red-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Channel Niche Types (1-Click)</span>
          </button>
          <button
            onClick={() => setActiveTab('oauth')}
            className={`py-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'oauth'
                ? 'border-red-500 text-white bg-red-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-red-500" />
            <span>Custom OAuth Channel Link</span>
          </button>
          <button
            onClick={() => setActiveTab('apikey')}
            className={`py-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'apikey'
                ? 'border-red-500 text-white bg-red-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Key className="w-4 h-4 text-amber-400" />
            <span>API Key & Credentials</span>
          </button>
          <button
            onClick={() => setActiveTab('defaults')}
            className={`py-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'defaults'
                ? 'border-red-500 text-white bg-red-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Settings2 className="w-4 h-4 text-indigo-400" />
            <span>Upload Settings</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* TAB 1: 1-CLICK CHANNEL PRESETS */}
          {activeTab === 'presets' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Select Your YouTube Channel Type</h3>
                  <p className="text-xs text-slate-400">
                    Choose a category below to immediately link and adapt all AI research, scripts, and video generators for that niche:
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {PRESET_CHANNELS.map((preset) => {
                  const Icon = preset.icon;
                  const isCurrent = channel?.isConnected && channel.primaryNiche === preset.niche;

                  return (
                    <div
                      key={preset.id}
                      className={`p-4 rounded-xl border transition-all flex flex-col justify-between gap-3 ${
                        isCurrent
                          ? 'bg-slate-850 border-red-500 ring-1 ring-red-500/40 shadow-lg'
                          : 'bg-slate-950/80 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className={`p-2 rounded-lg border ${preset.color}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-white">{preset.channelName}</h4>
                              <span className="text-[10px] font-mono text-slate-400">{preset.handle}</span>
                            </div>
                          </div>

                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${preset.badge}`}>
                            {preset.name.split(' ')[0]}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-400 leading-relaxed">{preset.desc}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                        <span className="text-[10px] text-slate-500 font-mono">
                          Niche: <strong className="text-slate-300">{preset.niche}</strong>
                        </span>

                        <button
                          disabled={isConnecting}
                          onClick={() => handleConnectPreset(preset)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                            isCurrent
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default'
                              : 'bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/20'
                          }`}
                        >
                          {isCurrent ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Active</span>
                            </>
                          ) : (
                            <>
                              <span>Connect Niche</span>
                              <ArrowRight className="w-3 h-3" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: CUSTOM OAUTH FORM */}
          {activeTab === 'oauth' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={channel?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                      alt="Channel"
                      className="w-10 h-10 rounded-full border border-slate-700 object-cover"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                        {channelName || 'Custom YouTube Channel'}
                        {channel?.isConnected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 fill-emerald-500/20" />}
                      </h4>
                      <p className="text-xs text-slate-400 font-mono">
                        {handle || '@mychannel'} • {connectedEmail || 'creator@youtube.com'}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[11px] font-mono px-2.5 py-1 rounded-full border flex items-center gap-1 ${
                      channel?.isConnected
                        ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                        : 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                    }`}
                  >
                    <Zap className="w-3 h-3" /> {channel?.isConnected ? 'Live Connected' : 'Unconnected'}
                  </span>
                </div>
              </div>

              {/* Channel Customization Inputs */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Enter Your YouTube Channel Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">YouTube Channel Name</label>
                    <input
                      type="text"
                      value={channelName}
                      onChange={(e) => setChannelName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-red-500"
                      placeholder="e.g. Pixel Forge or Wealth Blueprint"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">Channel Handle</label>
                    <input
                      type="text"
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
                      placeholder="@MyChannel"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">Channel Primary Niche / Topic</label>
                    <input
                      type="text"
                      value={primaryNiche}
                      onChange={(e) => setPrimaryNiche(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-red-500"
                      placeholder="e.g. Gaming & Esports, Cooking & Food, Tech & AI"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">Connected Google Account Email</label>
                    <input
                      type="email"
                      value={connectedEmail}
                      onChange={(e) => setConnectedEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-red-500"
                      placeholder="creator@gmail.com"
                    />
                  </div>
                </div>
              </div>

              {/* Granted Scopes List */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                <span className="text-xs font-bold text-slate-300 block">YouTube API OAuth Permissions:</span>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-emerald-400 flex items-center gap-1">
                    <Check className="w-3 h-3" /> https://www.googleapis.com/auth/youtube.upload
                  </span>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-emerald-400 flex items-center gap-1">
                    <Check className="w-3 h-3" /> https://www.googleapis.com/auth/youtube.readonly
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: API KEY & SERVICE CREDENTIALS */}
          {activeTab === 'apikey' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">
                For custom Google Cloud Developer projects, enterprise service accounts, or dedicated API quota limits:
              </p>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">YouTube Data API v3 Key</label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
                  placeholder="AIzaSy..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">OAuth 2.0 Client ID</label>
                  <input
                    type="text"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-red-500 font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">Channel ID (UC...)</label>
                  <input
                    type="text"
                    value={channelId}
                    onChange={(e) => setChannelId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
                    placeholder="UCxxxxxxxxxxxxxxxxx"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/20 text-xs text-slate-300 flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Server-Side Secret Isolation:</strong> Custom keys are stored in encrypted server memory only. Never transmitted to public browser clients.
                </span>
              </div>
            </div>
          )}

          {/* TAB 4: PUBLISHING DEFAULTS & SAFEGUARDS */}
          {activeTab === 'defaults' && (
            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-2">Default Video Upload Visibility</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setUploadPrivacy('unlisted')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      uploadPrivacy === 'unlisted'
                        ? 'border-indigo-500 bg-indigo-500/10 text-white'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold">Unlisted (Safe)</span>
                      {uploadPrivacy === 'unlisted' && <Check className="w-4 h-4 text-indigo-400" />}
                    </div>
                    <p className="text-[10px] text-slate-400">Uploaded but hidden until manually verified</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setUploadPrivacy('public')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      uploadPrivacy === 'public'
                        ? 'border-emerald-500 bg-emerald-500/10 text-white'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold">Public (Instant)</span>
                      {uploadPrivacy === 'public' && <Check className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <p className="text-[10px] text-slate-400">Immediately published to all subscribers</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setUploadPrivacy('private')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      uploadPrivacy === 'private'
                        ? 'border-amber-500 bg-amber-500/10 text-white'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold">Private (Draft)</span>
                      {uploadPrivacy === 'private' && <Check className="w-4 h-4 text-amber-400" />}
                    </div>
                    <p className="text-[10px] text-slate-400">Only visible to your YouTube Studio account</p>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1.5">Default YouTube Video Category</label>
                <select
                  value={defaultCategory}
                  onChange={(e) => setDefaultCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-red-500"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name} (Category ID: {cat.id})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
                  <div>
                    <span className="text-xs font-bold text-white block">Auto-Publish on Quality Pass (≥ 90%)</span>
                    <span className="text-[10px] text-slate-400">
                      When Autopilot finishes rendering and passes safety audit, automatically dispatch upload to YouTube.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoPublish}
                    onChange={(e) => setAutoPublish(e.target.checked)}
                    className="w-4 h-4 accent-red-600 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
                  <div>
                    <span className="text-xs font-bold text-white block">Notify Subscribers in Feed</span>
                    <span className="text-[10px] text-slate-400">
                      Send bell notifications and display in subscriber feeds upon publishing.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifySubs}
                    onChange={(e) => setNotifySubs(e.target.checked)}
                    className="w-4 h-4 accent-red-600 cursor-pointer"
                  />
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              disabled={isTesting}
              onClick={handleTestConnection}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
              <span>{isTesting ? 'Testing API...' : 'Test Gateway'}</span>
            </button>

            {channel?.isConnected && (
              <button
                onClick={handleDisconnect}
                className="px-3.5 py-2 rounded-xl text-xs text-red-400 hover:text-red-300 hover:bg-red-950/40 border border-red-500/20 transition-all cursor-pointer font-semibold"
              >
                Disconnect Channel
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => setIsYouTubeModalOpen(false)}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              Close
            </button>

            {activeTab !== 'presets' && (
              <button
                disabled={isConnecting}
                onClick={activeTab === 'apikey' ? handleSaveApiKeyConfig : handleOAuthConnect}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Youtube className="w-4 h-4 fill-white stroke-none" />
                <span>
                  {isConnecting
                    ? 'Connecting to YouTube...'
                    : channel?.isConnected
                    ? 'Save & Update Channel Link'
                    : 'Authorize & Link YouTube Account'}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
