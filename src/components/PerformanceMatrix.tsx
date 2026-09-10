import React, { useState } from 'react';

interface GPUConfig {
  id: string;
  name: string;
  brand: 'NVIDIA' | 'AMD' | 'Intel';
  tier: number; // 1 (entry) to 5 (enthusiast)
  targetRes: string;
  upscaler: string;
}

interface CPUConfig {
  id: string;
  name: string;
  brand: 'AMD' | 'Intel';
  tier: number; // 1 (entry) to 5 (enthusiast)
}

interface ConsoleConfig {
  id: string;
  name: string;
  targetRes: string;
  targetFPS: string;
  upscaler: string;
  settingsProfile: string;
  notes: string;
}

// Complete Desktop/Mobile GPU Database
const gpus: GPUConfig[] = [
  // NVIDIA RTX 40 Series
  { id: 'rtx4090', name: 'NVIDIA GeForce RTX 4090 (24GB)', brand: 'NVIDIA', tier: 5, targetRes: '4K Native / Ultra', upscaler: 'DLSS 3 Frame Gen' },
  { id: 'rtx4080super', name: 'NVIDIA GeForce RTX 4080 Super (16GB)', brand: 'NVIDIA', tier: 5, targetRes: '4K Native / Ultra', upscaler: 'DLSS 3 Frame Gen' },
  { id: 'rtx4070tisuper', name: 'NVIDIA GeForce RTX 4070 Ti Super (16GB)', brand: 'NVIDIA', tier: 4, targetRes: '1440p / Dynamic 4K', upscaler: 'DLSS 3 Quality' },
  { id: 'rtx4070super', name: 'NVIDIA GeForce RTX 4070 Super (12GB)', brand: 'NVIDIA', tier: 4, targetRes: '1440p High Precision', upscaler: 'DLSS 3 Quality' },
  { id: 'rtx4070', name: 'NVIDIA GeForce RTX 4070 (12GB)', brand: 'NVIDIA', tier: 4, targetRes: '1440p High Precision', upscaler: 'DLSS 3 Quality' },
  { id: 'rtx4060ti', name: 'NVIDIA GeForce RTX 4060 Ti (8GB/16GB)', brand: 'NVIDIA', tier: 3, targetRes: '1080p Ultra / 1440p High', upscaler: 'DLSS 3 Quality' },
  { id: 'rtx4060', name: 'NVIDIA GeForce RTX 4060 (8GB)', brand: 'NVIDIA', tier: 2, targetRes: '1080p High', upscaler: 'DLSS 3 Quality' },

  // NVIDIA RTX 30 Series
  { id: 'rtx3090ti', name: 'NVIDIA GeForce RTX 3090 Ti / 3090 (24GB)', brand: 'NVIDIA', tier: 4, targetRes: '4K High', upscaler: 'DLSS 2 Quality' },
  { id: 'rtx3080', name: 'NVIDIA GeForce RTX 3080 (10GB/12GB)', brand: 'NVIDIA', tier: 4, targetRes: '1440p / 4K Dynamic', upscaler: 'DLSS 2 Quality' },
  { id: 'rtx3070', name: 'NVIDIA GeForce RTX 3070 / 3070 Ti (8GB)', brand: 'NVIDIA', tier: 3, targetRes: '1440p High', upscaler: 'DLSS 2 Quality' },
  { id: 'rtx3060ti', name: 'NVIDIA GeForce RTX 3060 Ti (8GB)', brand: 'NVIDIA', tier: 3, targetRes: '1080p Ultra / 1440p Mid', upscaler: 'DLSS 2 Quality' },
  { id: 'rtx3060', name: 'NVIDIA GeForce RTX 3060 (12GB)', brand: 'NVIDIA', tier: 2, targetRes: '1080p High', upscaler: 'DLSS 2 Quality' },

  // AMD RX 7000 Series
  { id: 'rx7900xtx', name: 'AMD Radeon RX 7900 XTX (24GB)', brand: 'AMD', tier: 5, targetRes: '4K Native / Ultra', upscaler: 'FSR 3 Quality' },
  { id: 'rx7900xt', name: 'AMD Radeon RX 7900 XT (20GB)', brand: 'AMD', tier: 4, targetRes: '4K Dynamic', upscaler: 'FSR 3 Quality' },
  { id: 'rx7900gre', name: 'AMD Radeon RX 7900 GRE (16GB)', brand: 'AMD', tier: 4, targetRes: '1440p Ultra', upscaler: 'FSR 3 Quality' },
  { id: 'rx7800xt', name: 'AMD Radeon RX 7800 XT (16GB)', brand: 'AMD', tier: 4, targetRes: '1440p High Precision', upscaler: 'FSR 3 Quality' },
  { id: 'rx7700xt', name: 'AMD Radeon RX 7700 XT (12GB)', brand: 'AMD', tier: 3, targetRes: '1440p Mid/High', upscaler: 'FSR 3 Quality' },
  { id: 'rx7600xt', name: 'AMD Radeon RX 7600 XT (16GB)', brand: 'AMD', tier: 2, targetRes: '1080p High', upscaler: 'FSR 3 Quality' },

  // Intel Arc Series
  { id: 'arca770', name: 'Intel Arc A770 (16GB)', brand: 'Intel', tier: 3, targetRes: '1080p Ultra / 1440p Mid', upscaler: 'XeSS Quality' },
  { id: 'arca750', name: 'Intel Arc A750 (8GB)', brand: 'Intel', tier: 2, targetRes: '1080p High', upscaler: 'XeSS Quality' },
];

// Complete Desktop CPU Database
const cpus: CPUConfig[] = [
  // AMD Ryzen
  { id: 'ryzen9950x', name: 'AMD Ryzen 9 9950X / 9900X', brand: 'AMD', tier: 5 },
  { id: 'ryzen79800x3d', name: 'AMD Ryzen 7 9800X3D', brand: 'AMD', tier: 5 },
  { id: 'ryzen77800x3d', name: 'AMD Ryzen 7 7800X3D', brand: 'AMD', tier: 5 },
  { id: 'ryzen97950x3d', name: 'AMD Ryzen 9 7950X3D / 7900X3D', brand: 'AMD', tier: 5 },
  { id: 'ryzen77700x', name: 'AMD Ryzen 7 7700X / 7700', brand: 'AMD', tier: 4 },
  { id: 'ryzen57600x', name: 'AMD Ryzen 5 7600X / 7600', brand: 'AMD', tier: 3 },
  { id: 'ryzen75800x3d', name: 'AMD Ryzen 7 5800X3D (AM4)', brand: 'AMD', tier: 4 },
  { id: 'ryzen55600x', name: 'AMD Ryzen 5 5600X / 5600 (AM4)', brand: 'AMD', tier: 2 },
  { id: 'ryzen53600', name: 'AMD Ryzen 5 3600 / Legacy (AM4)', brand: 'AMD', tier: 1 },

  // Intel Core
  { id: 'corei914900k', name: 'Intel Core i9-14900K / 13900K', brand: 'Intel', tier: 5 },
  { id: 'corei714700k', name: 'Intel Core i7-14700K / 13700K', brand: 'Intel', tier: 4 },
  { id: 'corei514600k', name: 'Intel Core i5-14600K / 13600K', brand: 'Intel', tier: 4 },
  { id: 'corei513400', name: 'Intel Core i5-13400 / 12400', brand: 'Intel', tier: 2 },
  { id: 'corei312100', name: 'Intel Core i3-12100 / Budget', brand: 'Intel', tier: 1 },
];

// Console Systems Database
const consoles: ConsoleConfig[] = [
  {
    id: 'ps5pro',
    name: 'PlayStation 5 Pro',
    targetRes: 'Dynamic 4K (PSSR Enhanced)',
    targetFPS: '60 FPS (Ray Tracing Active)',
    upscaler: 'PlayStation Spectral Super Resolution',
    settingsProfile: 'Pro Enhanced High Preset',
    notes: 'Combines fidelity mode visual effects with steady 60 FPS performance.'
  },
  {
    id: 'ps5',
    name: 'PlayStation 5',
    targetRes: 'Dynamic 1440p - 1800p',
    targetFPS: '60 FPS (Performance Mode)',
    upscaler: 'FSR 2.2 / Spatial Upscaling',
    settingsProfile: 'Medium / High Mix',
    notes: 'Quality Mode locks to 4K @ 30 FPS with Ray Tracing.'
  },
  {
    id: 'xboxseriesx',
    name: 'Xbox Series X',
    targetRes: 'Dynamic 1800p - 4K',
    targetFPS: '60 FPS',
    upscaler: 'FSR 2.2',
    settingsProfile: 'High Textures, Medium Shadows',
    notes: 'VRR support eliminates frame tears during intense boss fights.'
  },
  {
    id: 'xboxseriess',
    name: 'Xbox Series S',
    targetRes: 'Dynamic 1080p - 1440p',
    targetFPS: '30 - 60 FPS',
    upscaler: 'FSR 2.2',
    settingsProfile: 'Low / Medium Preset',
    notes: 'Lower resolution buffer with reduced memory bandwidth.'
  },
  {
    id: 'steamdeck',
    name: 'Steam Deck / OLED',
    targetRes: '800p Native',
    targetFPS: '40 FPS / 40Hz Locked',
    upscaler: 'FSR 2.2 Balanced',
    settingsProfile: 'Low / Medium Handheld Hybrid',
    notes: 'TDP recommended at 12W for optimal battery longevity (~2.5 hours).'
  },
  {
    id: 'rogally',
    name: 'ASUS ROG Ally / Lenovo Legion Go (Z1 Extreme)',
    targetRes: '1080p / 900p',
    targetFPS: '50 - 60 FPS',
    upscaler: 'RSR / FSR Quality',
    settingsProfile: 'Medium Preset (25W Turbo Mode)',
    notes: 'Requires plugged power or high TDP profile for 60 FPS stability.'
  },
  {
    id: 'nintendoswitch',
    name: 'Nintendo Switch',
    targetRes: '720p Handheld / 1080p Docked',
    targetFPS: '30 FPS Locked',
    upscaler: 'None',
    settingsProfile: 'Tailored Mobile Profile',
    notes: 'Optimized specific builds with customized dynamic scaling.'
  }
];

export default function PerformanceMatrix() {
  const [useConsoleOverride, setUseConsoleOverride] = useState<boolean>(false);
  const [selectedConsoleId, setSelectedConsoleId] = useState<string>('ps5pro');

  const [selectedGpuId, setSelectedGpuId] = useState<string>('rtx4070super');
  const [selectedCpuId, setSelectedCpuId] = useState<string>('ryzen77800x3d');

  // Active configurations
  const selectedConsole = consoles.find((c) => c.id === selectedConsoleId) || consoles[0];
  const selectedGpu = gpus.find((g) => g.id === selectedGpuId) || gpus[3];
  const selectedCpu = cpus.find((c) => c.id === selectedCpuId) || cpus[2];

  // Calculate dynamic PC performance specs
  const tierDiff = selectedGpu.tier - selectedCpu.tier;
  let targetFPS = '60 - 90 FPS';
  let bottleneckNote = 'Balanced system configuration. Optimal frametime consistency.';
  let settingsProfile = 'High / Ultra Preset';

  if (tierDiff >= 2) {
    targetFPS = '45 - 60 FPS (CPU Bound)';
    bottleneckNote = 'CPU bottleneck detected! High GPU potential hampered in dense areas.';
    settingsProfile = 'Reduce Crowd Density / Physics, Max GPU Textures';
  } else if (selectedGpu.tier === 5 && selectedCpu.tier === 5) {
    targetFPS = '120+ FPS (Unlocked)';
    bottleneckNote = 'Enthusiast class hardware. Zero performance constraints.';
    settingsProfile = 'Maximum Ultra + Path Tracing';
  } else if (selectedGpu.tier <= 2) {
    targetFPS = '30 - 50 FPS';
    bottleneckNote = 'Mainstream/Entry GPU. Lower settings recommended for 60 FPS.';
    settingsProfile = 'Medium / Low Mix';
  }

  return (
    <div className="bg-[#131b2e]/80 border border-purple-900/40 rounded-2xl p-6 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <h3 className="text-xl font-heading font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-xs bg-cyan-400 shadow-[0_0_8px_#06b6d4]"></span>
          Hardware Performance Matrix
        </h3>
        <span className="text-xs font-mono-tech text-purple-400 font-bold uppercase">// SYSTEM BENCHMARK PROFILER</span>
      </div>

      {/* Selectors Grid: PC Selectors & Console Override Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6 font-mono-tech">
        
        {/* Left Columns: PC GPU & CPU Dropdowns */}
        <div className={`lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4 transition-opacity duration-300 ${useConsoleOverride ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
          {/* GPU Selector */}
          <div className="space-y-2">
            <label className="text-xs text-slate-400 uppercase tracking-wider block font-bold">
              // GRAPHICS CARD (GPU)
            </label>
            <select
              value={selectedGpuId}
              onChange={(e) => setSelectedGpuId(e.target.value)}
              disabled={useConsoleOverride}
              className="w-full bg-[#05070e] border border-slate-800 focus:border-purple-500 text-slate-100 text-xs rounded-xl p-3 outline-none transition-colors"
            >
              {gpus.map((gpu) => (
                <option key={gpu.id} value={gpu.id}>
                  {gpu.name}
                </option>
              ))}
            </select>
          </div>

          {/* CPU Selector */}
          <div className="space-y-2">
            <label className="text-xs text-slate-400 uppercase tracking-wider block font-bold">
              // PROCESSOR (CPU)
            </label>
            <select
              value={selectedCpuId}
              onChange={(e) => setSelectedCpuId(e.target.value)}
              disabled={useConsoleOverride}
              className="w-full bg-[#05070e] border border-slate-800 focus:border-purple-500 text-slate-100 text-xs rounded-xl p-3 outline-none transition-colors"
            >
              {cpus.map((cpu) => (
                <option key={cpu.id} value={cpu.id}>
                  {cpu.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Column: Dedicated Console Override */}
        <div className="lg:col-span-4 bg-[#05070e]/80 border border-purple-900/40 rounded-xl p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="console-toggle" className="text-xs font-bold text-purple-300 uppercase tracking-wider cursor-pointer flex items-center gap-2">
              <span className="text-amber-400">🎮</span> CONSOLE / HANDHELD OVERRIDE
            </label>
            <input
              type="checkbox"
              id="console-toggle"
              checked={useConsoleOverride}
              onChange={(e) => setUseConsoleOverride(e.target.checked)}
              className="w-4 h-4 accent-purple-500 rounded cursor-pointer"
            />
          </div>

          <select
            value={selectedConsoleId}
            onChange={(e) => {
              setSelectedConsoleId(e.target.value);
              setUseConsoleOverride(true);
            }}
            className={`w-full bg-[#131b2e] border border-purple-500/40 text-slate-100 text-xs rounded-xl p-2.5 outline-none transition-colors ${
              !useConsoleOverride ? 'opacity-60' : 'border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.3)]'
            }`}
          >
            {consoles.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Specs Readout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#05070e]/90 p-4 rounded-xl border border-slate-800">
          <span className="text-[10px] font-mono-tech text-slate-500 uppercase tracking-widest">Target Resolution</span>
          <p className="text-lg font-heading font-bold text-cyan-400 mt-1">
            {useConsoleOverride ? selectedConsole.targetRes : selectedGpu.targetRes}
          </p>
        </div>

        <div className="bg-[#05070e]/90 p-4 rounded-xl border border-slate-800">
          <span className="text-[10px] font-mono-tech text-slate-500 uppercase tracking-widest">Framerate Expectation</span>
          <p className="text-lg font-heading font-bold text-emerald-400 mt-1">
            {useConsoleOverride ? selectedConsole.targetFPS : targetFPS}
          </p>
        </div>

        <div className="bg-[#05070e]/90 p-4 rounded-xl border border-slate-800">
          <span className="text-[10px] font-mono-tech text-slate-500 uppercase tracking-widest">Recommended Upscaler</span>
          <p className="text-lg font-heading font-bold text-purple-300 mt-1">
            {useConsoleOverride ? selectedConsole.upscaler : selectedGpu.upscaler}
          </p>
        </div>
      </div>

      {/* Preset & Optimization Notes */}
      <div className="space-y-3 bg-[#05070e]/60 p-4 rounded-xl border border-slate-800/80 font-mono-tech text-xs">
        <div className="flex justify-between items-center text-slate-300 border-b border-slate-800/60 pb-2">
          <span className="text-slate-500">// RECOMMENDED SETTINGS:</span>
          <span className="text-amber-300 font-bold">
            {useConsoleOverride ? selectedConsole.settingsProfile : settingsProfile}
          </span>
        </div>
        <div className="flex justify-between items-center text-slate-300">
          <span className="text-slate-500">// OPTIMIZATION ANALYSIS:</span>
          <span className={`italic ${!useConsoleOverride && tierDiff >= 2 ? 'text-rose-400 font-bold' : 'text-slate-300'}`}>
            {useConsoleOverride ? selectedConsole.notes : bottleneckNote}
          </span>
        </div>
      </div>
    </div>
  );
}