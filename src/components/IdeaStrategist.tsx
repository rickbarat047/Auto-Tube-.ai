import React, { useState } from 'react';
import {
  Lightbulb,
  Sparkles,
  Search,
  CheckCircle2,
  TrendingUp,
  Percent,
  Clock,
  Layers,
  ArrowRight,
  ChevronRight,
  Palette,
  Bot,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VideoIdea, ContentFormat } from '../types';
import { api } from '../services/api';

export const IdeaStrategist: React.FC = () => {
  const { channel, activeVideo, stepVideoStage, showToast, isGenerating, setActiveView } = useApp();

  const [topicInput, setTopicInput] = useState<string>(activeVideo?.title || 'Autonomous Multi-Agent AI Workflows');
  const [selectedFormat, setSelectedFormat] = useState<ContentFormat>(activeVideo?.format || 'long_form');
  const [ideas, setIdeas] = useState<VideoIdea[]>(
    activeVideo?.idea
      ? [activeVideo.idea]
      : [
          {
            id: 'idea-seed-1',
            titleIdeas: [
              { title: 'I Built a 24/7 AI YouTube Channel (Here is What It Made)', predictedCtr: 11.8, scoreBreakdown: { curiosity: 96, clarity: 94, search: 89 } },
              { title: 'How Autonomous AI Agents Will Replace 80% of YouTubers', predictedCtr: 10.4, scoreBreakdown: { curiosity: 91, clarity: 90, search: 84 } },
              { title: 'The Secret YouTube Automation Blueprint for 2026', predictedCtr: 9.2, scoreBreakdown: { curiosity: 85, clarity: 92, search: 95 } },
              { title: 'Why Everyone Is Moving to Autonomous Video Agents', predictedCtr: 8.9, scoreBreakdown: { curiosity: 88, clarity: 86, search: 88 } },
              { title: '5 AI Agents Running YouTube Channels in Real Time', predictedCtr: 8.5, scoreBreakdown: { curiosity: 82, clarity: 88, search: 84 } },
            ],
            selectedTitle: 'I Built a 24/7 AI YouTube Channel (Here is What It Made)',
            concept: 'A transparent 14-day experiment evaluating metrics, retention graphs, server cost breakdowns, and subscriber response to autonomous video generation.',
            targetAudience: 'Entrepreneurs, digital creators, tech enthusiasts',
            hook: 'In the next 8 minutes, you are going to see what happens when you give an AI full control of a YouTube channel with zero human editing.',
            storyAngle: 'The honest experimenter testing the hype against raw analytics.',
            mainPromise: 'See the exact revenue, workflow, and quality metrics behind autonomous content creation.',
            suggestedDuration: '8m 30s',
            format: 'long_form',
            structure: [
              'The 7-Second Provocative Hook & Channel Reveal',
              'How the AI Discovered the Winning Niche',
              'Scripting & Voiceover Synchronization Engine',
              'Visuals, Editing & Thumbnail CTR Optimization',
              'Live Analytics & The $0 vs $1,000 Revenue Truth',
              'Key Takeaways & Safety Rules',
            ],
            thumbnailConcept: {
              visualDescription: 'Split screen: Left side shows dark code terminal with agent logs, right side shows rising YouTube analytics graph in glowing neon emerald.',
              textOverlay: '$0 TO 100K VIEWS?',
              colorPalette: 'Neon Emerald Green (#10B981), Dark Obsidian (#090D16), Vibrant Amber (#F59E0B)',
              emotionalTrigger: 'Intense Curiosity & Revenue Transparency',
            },
            niche: channel?.primaryNiche || 'AI tools & Autonomous Tech',
            viralPotential: 96,
          },
        ]
  );

  const [selectedIdeaIdx, setSelectedIdeaIdx] = useState<number>(0);
  const [selectedTitle, setSelectedTitle] = useState<string>(ideas[0]?.selectedTitle || '');
  const [isBrainstorming, setIsBrainstorming] = useState<boolean>(false);

  const handleGenerateIdeas = async () => {
    if (!topicInput.trim()) return;
    setIsBrainstorming(true);
    showToast(`AI Content Strategist: Ideating high-CTR angles for "${topicInput}"...`, 'info');
    try {
      const res = await api.generateIdeas(topicInput, channel?.primaryNiche, channel?.targetAudience, selectedFormat);
      if (res.success && res.ideas.length > 0) {
        setIdeas(res.ideas);
        setSelectedIdeaIdx(0);
        setSelectedTitle(res.ideas[0].selectedTitle);
        showToast(`Generated ${res.ideas.length} viral video strategies!`, 'success');
      }
    } catch (err: any) {
      showToast(err.message || 'Idea generation failed', 'error');
    } finally {
      setIsBrainstorming(false);
    }
  };

  const currentIdea = ideas[selectedIdeaIdx] || ideas[0];

  const handleProceedToScript = async () => {
    if (!activeVideo || !currentIdea) return;
    showToast('Saving Strategy & Launching Script Generator...', 'info');
    const updatedIdea = { ...currentIdea, selectedTitle };
    await stepVideoStage(activeVideo.id, 'script', {
      title: selectedTitle,
      idea: updatedIdea,
      format: selectedFormat,
    });
    setActiveView('scripts');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800/80 to-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
              <Lightbulb className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black text-white tracking-tight">AI Content Strategist</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Transforms raw trend data and competitor research into high-retention video concepts, predicted-CTR title rankings, magnetic hooks, and visual thumbnail frameworks.
          </p>
        </div>

        <button
          disabled={isBrainstorming || isGenerating}
          onClick={handleGenerateIdeas}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold transition-all shadow-lg shadow-red-600/20 flex items-center gap-2 cursor-pointer flex-shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isBrainstorming ? 'Engineering Angles...' : 'Generate New Ideas'}</span>
        </button>
      </div>

      {/* Input / Control Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center gap-3">
        <div className="flex-1 w-full">
          <input
            type="text"
            value={topicInput}
            onChange={(e) => setTopicInput(e.target.value)}
            placeholder="Enter research topic, keywords, or premise..."
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-red-500"
          />
        </div>

        <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-xs font-semibold text-slate-400">
          <button
            onClick={() => setSelectedFormat('long_form')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              selectedFormat === 'long_form' ? 'bg-slate-800 text-white font-bold' : 'hover:text-slate-200'
            }`}
          >
            Long-Form (8-10m)
          </button>
          <button
            onClick={() => setSelectedFormat('short')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              selectedFormat === 'short' ? 'bg-slate-800 text-white font-bold' : 'hover:text-slate-200'
            }`}
          >
            Shorts (50s)
          </button>
        </div>
      </div>

      {/* Concept Switcher Tabs */}
      {ideas.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
          {ideas.map((idea, idx) => (
            <button
              key={idea.id || idx}
              onClick={() => {
                setSelectedIdeaIdx(idx);
                setSelectedTitle(idea.selectedTitle || idea.titleIdeas[0]?.title);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border flex items-center gap-2 flex-shrink-0 cursor-pointer transition-all ${
                selectedIdeaIdx === idx
                  ? 'bg-slate-800 border-red-500 text-white shadow-sm'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <span>Concept #{idx + 1}: {idea.selectedTitle.slice(0, 30)}...</span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">{idea.viralPotential}%</span>
            </button>
          ))}
        </div>
      )}

      {/* Main Idea Breakdown Card */}
      {currentIdea && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Titles, Hook & Structural Arc */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title Variations Ranked by Predicted CTR (Section 5) */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                    <TrendingUp className="w-4 h-4" />
                  </span>
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                    Predicted-CTR Title Variations (Ranked)
                  </h2>
                </div>
                <span className="text-xs text-slate-400">Click to select active title</span>
              </div>

              <div className="space-y-2">
                {currentIdea.titleIdeas.map((t, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedTitle(t.title)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                      selectedTitle === t.title
                        ? 'bg-red-500/10 border-red-500 text-white font-semibold shadow-sm'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold flex-shrink-0 mt-0.5 ${
                          selectedTitle === t.title ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        #{idx + 1}
                      </span>
                      <span className="leading-snug">{t.title}</span>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0 font-mono text-[11px]">
                      <div className="text-slate-400 text-[10px] hidden md:flex items-center gap-2">
                        <span>Curiosity: {t.scoreBreakdown?.curiosity || 90}</span>
                        <span>Clarity: {t.scoreBreakdown?.clarity || 88}</span>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-emerald-500/15 text-emerald-300 font-bold border border-emerald-500/30">
                        {t.predictedCtr}% CTR
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Hook & Story Angle */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>5-10 Second Magnetic Hook & Story Angle</span>
              </h3>

              <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 font-mono">
                  First 5-10s Opening Retention Hook:
                </div>
                <p className="text-sm font-medium text-slate-100 italic leading-relaxed">
                  "{currentIdea.hook}"
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Story Angle</span>
                  <p className="text-slate-300 leading-snug">{currentIdea.storyAngle}</p>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Main Viewer Promise</span>
                  <p className="text-slate-300 leading-snug">{currentIdea.mainPromise}</p>
                </div>
              </div>
            </div>

            {/* Structural Video Outline */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                <span>Structural Narrative Arc</span>
              </h3>

              <div className="space-y-2">
                {currentIdea.structure.map((step, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center gap-3 text-xs">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 font-mono text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-slate-200 font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 1 Col: Thumbnail Strategy & Launch */}
          <div className="space-y-6">
            {/* Thumbnail Blueprint */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Thumbnail Blueprint</h3>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Visual Composition</div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {currentIdea.thumbnailConcept.visualDescription}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <div className="text-[10px] uppercase font-bold text-amber-400">Bold Text Overlay (Max 4 words)</div>
                  <div className="text-base font-black text-white font-mono tracking-tight">
                    {currentIdea.thumbnailConcept.textOverlay}
                  </div>
                </div>

                <div className="text-xs text-slate-400 space-y-1 pt-1">
                  <div>
                    Colors: <span className="text-slate-200">{currentIdea.thumbnailConcept.colorPalette}</span>
                  </div>
                  <div>
                    Trigger: <span className="text-emerald-400 font-semibold">{currentIdea.thumbnailConcept.emotionalTrigger}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Launch Action */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-red-500/30 space-y-3 shadow-xl">
              <div className="text-xs text-slate-300 font-medium">Selected Video Strategy:</div>
              <div className="text-sm font-bold text-white leading-snug">"{selectedTitle}"</div>

              <button
                disabled={isGenerating}
                onClick={handleProceedToScript}
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-lg shadow-red-600/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Write Script with Script Agent</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
