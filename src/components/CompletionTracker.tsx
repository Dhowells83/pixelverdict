import React, { useState } from 'react';

interface CompletionProps {
  mainStoryHours?: number;
  mainExtraHours?: number;
  completionistHours?: number;
}

export default function CompletionTracker({
  mainStoryHours = 28,
  mainExtraHours = 55,
  completionistHours = 110,
}: CompletionProps) {
  const [weeklyHours, setWeeklyHours] = useState<number>(10);
  const [selectedStyle, setSelectedStyle] = useState<'main' | 'extra' | 'completionist'>('mainExtra');

  const getTargetHours = () => {
    switch (selectedStyle) {
      case 'main':
        return mainStoryHours;
      case 'completionist':
        return completionistHours;
      default:
        return mainExtraHours;
    }
  };

  const targetHours = getTargetHours();
  const estimatedWeeks = (targetHours / weeklyHours).toFixed(1);
  const estimatedDays = Math.ceil(targetHours / (weeklyHours / 7));

  // Max scale calculation for relative bar widths
  const maxHours = Math.max(completionistHours, 1);

  return (
    <div className="bg-[#131b2e]/80 border border-purple-900/40 rounded-2xl p-6 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)] my-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
        <h3 className="text-lg font-heading font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-xs bg-amber-400 shadow-[0_0_8px_#f59e0b]"></span>
          Time to Beat & Completion
        </h3>
        <span className="text-xs font-mono-tech text-amber-400 font-bold uppercase">// PLAYTIME METRICS</span>
      </div>

      {/* Playtime Metrics Bars */}
      <div className="space-y-4 mb-8">
        {/* Main Story */}
        <div>
          <div className="flex justify-between items-center text-xs font-mono-tech mb-1.5">
            <span className="text-slate-300 font-bold">// MAIN STORY</span>
            <span className="text-cyan-400 font-bold">{mainStoryHours} Hours</span>
          </div>
          <div className="w-full h-3 bg-[#05070e] rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500 shadow-[0_0_10px_#06b6d4]"
              style={{ width: `${(mainStoryHours / maxHours) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Main + Extras */}
        <div>
          <div className="flex justify-between items-center text-xs font-mono-tech mb-1.5">
            <span className="text-slate-300 font-bold">// MAIN + EXTRAS</span>
            <span className="text-purple-400 font-bold">{mainExtraHours} Hours</span>
          </div>
          <div className="w-full h-3 bg-[#05070e] rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500 shadow-[0_0_10px_#a855f7]"
              style={{ width: `${(mainExtraHours / maxHours) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Completionist */}
        <div>
          <div className="flex justify-between items-center text-xs font-mono-tech mb-1.5">
            <span className="text-slate-300 font-bold">// 100% COMPLETIONIST</span>
            <span className="text-amber-400 font-bold">{completionistHours} Hours</span>
          </div>
          <div className="w-full h-3 bg-[#05070e] rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full transition-all duration-500 shadow-[0_0_10px_#f59e0b]"
              style={{ width: `${(completionistHours / maxHours) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Interactive Pacing Calculator */}
      <div className="bg-[#05070e]/80 border border-slate-800 rounded-xl p-4 font-mono-tech">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800/80">
          <div>
            <span className="text-xs text-purple-400 font-bold uppercase tracking-wider">// ESTIMATE YOUR PACING</span>
            <p className="text-[11px] text-slate-400 mt-0.5">Select your play style and weekly available hours:</p>
          </div>

          {/* Style Selector Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSelectedStyle('main')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                selectedStyle === 'main'
                  ? 'bg-cyan-500 text-white shadow-[0_0_8px_#06b6d4]'
                  : 'bg-[#131b2e] text-slate-400 hover:text-slate-200'
              }`}
            >
              Main
            </button>
            <button
              onClick={() => setSelectedStyle('extra')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                selectedStyle === 'extra'
                  ? 'bg-purple-600 text-white shadow-[0_0_8px_#a855f7]'
                  : 'bg-[#131b2e] text-slate-400 hover:text-slate-200'
              }`}
            >
              Main+
            </button>
            <button
              onClick={() => setSelectedStyle('completionist')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                selectedStyle === 'completionist'
                  ? 'bg-amber-500 text-white shadow-[0_0_8px_#f59e0b]'
                  : 'bg-[#131b2e] text-slate-400 hover:text-slate-200'
              }`}
            >
              100%
            </button>
          </div>
        </div>

        {/* Weekly Slider & Output */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-7 space-y-2">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Weekly Playtime:</span>
              <span className="text-purple-300 font-bold">{weeklyHours} hrs / week</span>
            </div>
            <input
              type="range"
              min="2"
              max="40"
              step="1"
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(Number(e.target.value))}
              className="w-full accent-purple-500 bg-slate-900 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          <div className="md:col-span-5 bg-[#131b2e] border border-slate-800 rounded-lg p-3 text-center">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest block">Estimated Completion</span>
            <p className="text-base font-heading font-black text-white mt-0.5">
              ~{estimatedWeeks} Weeks <span className="text-xs text-slate-400 font-normal">({estimatedDays} Days)</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}