import React, { useState } from 'react';

interface HardwareSpec {
  preset: string;
  targetRes: string;
  targetFPS: string;
  upscaling: string;
  settingsProfile: string;
  notes: string;
}

interface PerformanceData {
  rtx4090: HardwareSpec;
  rtx4070: HardwareSpec;
  rtx3060: HardwareSpec;
  rx7600: HardwareSpec;
  ps5pro: HardwareSpec;
  ps5: HardwareSpec;
  xboxSeriesX: HardwareSpec;
  steamDeck: HardwareSpec;
}

const defaultSpecs: PerformanceData = {
  rtx4090: {
    preset: 'Enthusiast 4K Max',
    targetRes: '4K Native',
    targetFPS: '120+ FPS',
    upscaling: 'DLSS 3 Frame Gen (Quality)',
    settingsProfile: 'Path Tracing / Ultra Settings',
    notes: 'Maxed out graphical fidelity with zero performance bottlenecks.'
  },
  rtx4070: {
    preset: '1440p High Precision',
    targetRes: '1440p / Dynamic 4K',
    targetFPS: '90 - 120 FPS',
    upscaling: 'DLSS 3 Frame Gen (Quality)',
    settingsProfile: 'High / Ultra Hybrid',
    notes: 'Ideal balance for high-refresh-rate gaming.'
  },
  rtx3060: {
    preset: 'Mainstream 1080p',
    targetRes: '1080p Native',
    targetFPS: '60 - 75 FPS',
    upscaling: 'DLSS Quality',
    settingsProfile: 'Medium Shadows, High Textures',
    notes: 'Solid 1080p performance with ray tracing turned off.'
  },
  rx7600: {
    preset: 'Budget PC Gaming',
    targetRes: '1080p Native',
    targetFPS: '60 FPS Locked',
    upscaling: 'FSR 3 Quality',
    settingsProfile: 'Medium Preset',
    notes: 'Great entry-level performance; disable motion blur for frame pacing.'
  },
  ps5pro: {
    preset: 'Pro Enhanced',
    targetRes: 'Dynamic 4K (PSSR)',
    targetFPS: '60 FPS (Ray Tracing On)',
    upscaling: 'PlayStation Spectral Super Resolution',
    settingsProfile: 'High Quality Preset',
    notes: 'Combines fidelity mode visuals with performance mode framerates.'
  },
  ps5: {
    preset: 'Console Performance Mode',
    targetRes: 'Dynamic 1440p',
    targetFPS: '60 FPS',
    upscaling: 'FSR 2.2',
    settingsProfile: 'Medium / High Mix',
    notes: 'Quality Mode offers 4K @ 30 FPS.'
  },
  xboxSeriesX: {
    preset: 'Console Performance Mode',
    targetRes: 'Dynamic 1800p',
    targetFPS: '60 FPS',
    upscaling: 'FSR 2.2',
    settingsProfile: 'High Textures, Medium Reflections',
    notes: 'VRR support eliminates frame drops during heavy combat.'
  },
  steamDeck: {
    preset: 'Handheld Optimized',
    targetRes: '800p',
    targetFPS: '40 FPS / 40Hz',
    upscaling: 'FSR 2.2 Balanced',
    settingsProfile: 'Low / Medium Hybrid',
    notes: 'Battery life ~2.5 hours. TDP capped at 12W for stability.'
  }
};

export default function PerformanceMatrix() {
  const [selectedPlatform, setSelectedPlatform] = useState<keyof PerformanceData>('rtx4070');
  const activeSpec = defaultSpecs[selectedPlatform];

  const platforms = [
    { id: 'rtx4090', label: 'PC (RTX 4090 / 7900 XTX)', icon: '⚡' },
    { id: 'rtx4070', label: 'PC (RTX 4070 / 7800 XT)', icon: '💻' },
    { id: 'rtx3060', label: 'PC (RTX 3060 / Mainstream)', icon: '🖥️' },
    { id: 'rx7600', label: 'PC (RX 7600 / Budget)', icon: '🛠️' },
    { id: 'ps5pro', label: 'PlayStation 5 Pro', icon: '✨' },
    { id: 'ps5', label: 'PlayStation 5', icon: '🎮' },
    { id: 'xboxSeriesX', label: 'Xbox Series X', icon: '🟩' },
    { id: 'steamDeck', label: 'Steam Deck', icon: '🕹️' },
  ];

  return (
    <div className="bg-[#131b2e]/80 border border-purple-900/40 rounded-2xl p-6 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <h3 className="text-xl font-heading font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-xs bg-cyan-400 shadow-[0_0_8px_#06b6d4]"></span>
          Hardware Performance Matrix
        </h3>
        <span className="text-xs font-mono-tech text-purple-400 font-bold uppercase">// TECHNICAL BENCHMARKS</span>
      </div>

      {/* Hardware Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
        {platforms.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedPlatform(p.id as keyof PerformanceData)}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono-tech font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              selectedPlatform === p.id
                ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)] border border-purple-400/50'
                : 'bg-[#05070e] text-slate-400 border border-slate-800 hover:border-slate-700'
            }`}
          >
            <span>{p.icon}</span>
            <span>{p.label}</span>
          </button>
        ))}
      </div>

      {/* Specs Readout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#05070e]/90 p-4 rounded-xl border border-slate-800">
          <span className="text-[10px] font-mono-tech text-slate-500 uppercase tracking-widest">Target Resolution</span>
          <p className="text-lg font-heading font-bold text-cyan-400 mt-1">{activeSpec.targetRes}</p>
        </div>

        <div className="bg-[#05070e]/90 p-4 rounded-xl border border-slate-800">
          <span className="text-[10px] font-mono-tech text-slate-500 uppercase tracking-widest">Framerate Expectation</span>
          <p className="text-lg font-heading font-bold text-emerald-400 mt-1">{activeSpec.targetFPS}</p>
        </div>

        <div className="bg-[#05070e]/90 p-4 rounded-xl border border-slate-800">
          <span className="text-[10px] font-mono-tech text-slate-500 uppercase tracking-widest">Recommended Upscaler</span>
          <p className="text-lg font-heading font-bold text-purple-300 mt-1">{activeSpec.upscaling}</p>
        </div>
      </div>

      {/* Preset & Optimization Notes */}
      <div className="space-y-3 bg-[#05070e]/60 p-4 rounded-xl border border-slate-800/80 font-mono-tech text-xs">
        <div className="flex justify-between items-center text-slate-300 border-b border-slate-800/60 pb-2">
          <span className="text-slate-500">// RECOMMENDED PROFILE:</span>
          <span className="text-amber-300 font-bold">{activeSpec.settingsProfile}</span>
        </div>
        <div className="flex justify-between items-center text-slate-300">
          <span className="text-slate-500">// OPTIMIZATION NOTES:</span>
          <span className="text-slate-300 italic">{activeSpec.notes}</span>
        </div>
      </div>
    </div>
  );
}