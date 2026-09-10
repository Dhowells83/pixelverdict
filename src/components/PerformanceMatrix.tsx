import React, { useState } from 'react';

interface GPUConfig {
  id: string;
  name: string;
  tier: number; // 1 (budget) to 4 (enthusiast)
  targetRes: string;
  upscaler: string;
}

interface CPUConfig {
  id: string;
  name: string;
  tier: number; // 1 (budget) to 4 (enthusiast)
}

const gpus: GPUConfig[] = [
  { id: 'rtx4090', name: 'NVIDIA RTX 4090 (24GB)', tier: 4, targetRes: '4K Ultra', upscaler: 'DLSS 3 Frame Gen' },
  { id: 'rtx4070', name: 'NVIDIA RTX 4070 Super (12GB)', tier: 3, targetRes: '1440p / Dynamic 4K', upscaler: 'DLSS 3 Quality' },
  { id: 'rtx3060', name: 'NVIDIA RTX 3060 (12GB)', tier: 2, targetRes: '1080p High', upscaler: 'DLSS Quality' },
  { id: 'rx7800xt', name: 'AMD Radeon RX 7800 XT (16GB)', tier: 3, targetRes: '1440p Native', upscaler: 'FSR 3 Quality' },
  { id: 'rx6600', name: 'AMD Radeon RX 6600 (8GB)', tier: 1, targetRes: '1080p Medium', upscaler: 'FSR 2.2 Balanced' },
  { id: 'ps5pro', name: 'PlayStation 5 Pro APU', tier: 3, targetRes: 'Dynamic 4K', upscaler: 'PSSR' },
  { id: 'steamdeck', name: 'Steam Deck APU', tier: 1, targetRes: '800p Low', upscaler: 'FSR 2.2' },
];

const cpus: CPUConfig[] = [
  { id: '7800x3d', name: 'AMD Ryzen 7 7800X3D / 9800X3D', tier: 4 },
  { id: 'i714700k', name: 'Intel Core i7-14700K / 13700K', tier: 4 },
  { id: 'ryzen57600', name: 'AMD Ryzen 5 7600 / 5600X', tier: 2 },
  { id: 'i512400', name: 'Intel Core i5-12400 / 13400', tier: 2 },
  { id: 'ryzen3600', name: 'AMD Ryzen 5 3600 / Legacy', tier: 1 },
  { id: 'console_cpu', name: 'Console / Custom APU CPU', tier: 2 },
];

export default function PerformanceMatrix() {
  const [selectedGpuId, setSelectedGpuId] = useState<string>('rtx4070');
  const [selectedCpuId, setSelectedCpuId] = useState<string>('7800x3d');

  const selectedGpu = gpus.find((g) => g.id === selectedGpuId) || gpus[1];
  const selectedCpu = cpus.find((c) => c.id === selectedCpuId) || cpus[0];

  // Calculate potential CPU/GPU bottleneck
  const tierDiff = selectedGpu.tier - selectedCpu.tier;
  
  let targetFPS = '60 - 90 FPS';
  let bottleneckNote = 'Balanced system configuration. Optimal frametime consistency.';
  let settingsProfile = 'High / Ultra Preset';

  if (tierDiff >= 2) {
    targetFPS = '45 - 60 FPS (CPU Bound)';
    bottleneckNote = 'CPU bottleneck detected! High GPU usage hampered in complex urban/heavy areas.';
    settingsProfile = 'Lower Crowds / Physics, Max GPU Textures';
  } else if (selectedGpu.tier === 4 && selectedCpu.tier === 4) {
    targetFPS = '120+ FPS (Unlocked)';
    bottleneckNote = 'Enthusiast class hardware. Zero performance constraints.';
    settingsProfile = 'Maximum Ultra + Ray Tracing';
  } else if (selectedGpu.tier === 1) {
    targetFPS = '30 - 45 FPS';
    bottleneckNote = 'Entry tier hardware. Lower settings recommended for stable 60 FPS.';
    settingsProfile = 'Low / Medium Mix';
  }

  return (
    <div className="bg-[#131b2e]/80 border border-purple-900/40 rounded-2xl p-6 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <h3 className="text-xl font-heading font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-xs bg-cyan-400 shadow-[0_0_8px_#06b6d4]"></span>
          Hardware Performance Matrix
        </h3>
        <span className="text-xs font-mono-tech text-purple-400 font-bold uppercase">// CUSTOM RIG PROFILER</span>
      </div>

      {/* Dropdown Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 font-mono-tech">
        {/* GPU Selector */}
        <div className="space-y-2">
          <label className="text-xs text-slate-400 uppercase tracking-wider block font-bold">
            // SELECT GRAPHICS CARD (GPU)
          </label>
          <select
            value={selectedGpuId}
            onChange={(e) => setSelectedGpuId(e.target.value)}
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
            // SELECT PROCESSOR (CPU)
          </label>
          <select
            value={selectedCpuId}
            onChange={(e) => setSelectedCpuId(e.target.value)}
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

      {/* Specs Readout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#05070e]/90 p-4 rounded-xl border border-slate-800">
          <span className="text-[10px] font-mono-tech text-slate-500 uppercase tracking-widest">Target Resolution</span>
          <p className="text-lg font-heading font-bold text-cyan-400 mt-1">{selectedGpu.targetRes}</p>
        </div>

        <div className="bg-[#05070e]/90 p-4 rounded-xl border border-slate-800">
          <span className="text-[10px] font-mono-tech text-slate-500 uppercase tracking-widest">Framerate Expectation</span>
          <p className="text-lg font-heading font-bold text-emerald-400 mt-1">{targetFPS}</p>
        </div>

        <div className="bg-[#05070e]/90 p-4 rounded-xl border border-slate-800">
          <span className="text-[10px] font-mono-tech text-slate-500 uppercase tracking-widest">Recommended Upscaler</span>
          <p className="text-lg font-heading font-bold text-purple-300 mt-1">{selectedGpu.upscaler}</p>
        </div>
      </div>

      {/* Preset & Optimization Notes */}
      <div className="space-y-3 bg-[#05070e]/60 p-4 rounded-xl border border-slate-800/80 font-mono-tech text-xs">
        <div className="flex justify-between items-center text-slate-300 border-b border-slate-800/60 pb-2">
          <span className="text-slate-500">// RECOMMENDED SETTINGS:</span>
          <span className="text-amber-300 font-bold">{settingsProfile}</span>
        </div>
        <div className="flex justify-between items-center text-slate-300">
          <span className="text-slate-500">// BOTTLENECK ANALYSIS:</span>
          <span className={`italic ${tierDiff >= 2 ? 'text-rose-400 font-bold' : 'text-slate-300'}`}>
            {bottleneckNote}
          </span>
        </div>
      </div>
    </div>
  );
}