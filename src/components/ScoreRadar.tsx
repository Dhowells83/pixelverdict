import React, { useState } from 'react';

export interface ScoreAxis {
  label: string;
  score: number; // Score from 0 to 10
}

interface ScoreRadarProps {
  axes?: ScoreAxis[];
  title?: string;
}

const defaultAxes: ScoreAxis[] = [
  { label: 'Graphics & Art', score: 9.0 },
  { label: 'Gameplay', score: 8.5 },
  { label: 'Performance', score: 7.0 },
  { label: 'Story & Pacing', score: 8.0 },
  { label: 'Value & Replay', score: 9.5 },
];

export default function ScoreRadar({ axes = defaultAxes, title = "Verdict Breakdown" }: ScoreRadarProps) {
  const [hoveredAxis, setHoveredAxis] = useState<ScoreAxis | null>(null);

  const size = 320;
  const center = size / 2;
  const radius = 100;
  const totalAxes = axes.length;
  const angleSlice = (Math.PI * 2) / totalAxes;

  // Helper function to calculate SVG (x, y) coordinates for a given score/radius
  const getCoordinates = (index: number, valueRatio: number) => {
    const angle = angleSlice * index - Math.PI / 2; // Start from top
    const x = center + radius * valueRatio * Math.cos(angle);
    const y = center + radius * valueRatio * Math.sin(angle);
    return { x, y };
  };

  // Generate polygon points for score web
  const polygonPoints = axes
    .map((axis, i) => {
      const { x, y } = getCoordinates(i, axis.score / 10);
      return `${x},${y}`;
    })
    .join(' ');

  // Background grid web levels (20%, 40%, 60%, 80%, 100%)
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

  return (
    <div className="bg-[#131b2e]/80 border border-purple-900/40 rounded-2xl p-6 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)] my-8 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <h3 className="text-lg font-heading font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-xs bg-purple-500 shadow-[0_0_8px_#a855f7]"></span>
          {title}
        </h3>
        <span className="text-xs font-mono-tech text-cyan-400 font-bold uppercase">// 5-AXIS EVALUATION</span>
      </div>

      {/* SVG Radar Graphic */}
      <div className="relative flex justify-center items-center">
        <svg width={size} height={size} className="overflow-visible">
          {/* Background Concentric Polygon Grid */}
          {gridLevels.map((level, levelIdx) => {
            const gridPoints = axes
              .map((_, i) => {
                const { x, y } = getCoordinates(i, level);
                return `${x},${y}`;
              })
              .join(' ');
            return (
              <polygon
                key={levelIdx}
                points={gridPoints}
                fill="none"
                stroke="#334155"
                strokeWidth="1"
                strokeDasharray={levelIdx === gridLevels.length - 1 ? '0' : '2 2'}
                className="opacity-60"
              />
            );
          })}

          {/* Axis Spokes (Center to outer edge) */}
          {axes.map((_, i) => {
            const { x, y } = getCoordinates(i, 1);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="#334155"
                strokeWidth="1"
                className="opacity-50"
              />
            );
          })}

          {/* Filled Data Polygon (Score Area) */}
          <polygon
            points={polygonPoints}
            fill="rgba(168, 85, 247, 0.25)"
            stroke="#a855f7"
            strokeWidth="2.5"
            className="transition-all duration-300 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"
          />

          {/* Data Points and Outer Labels */}
          {axes.map((axis, i) => {
            const point = getCoordinates(i, axis.score / 10);
            const labelPos = getCoordinates(i, 1.28); // Position labels outside grid
            const isHovered = hoveredAxis?.label === axis.label;

            return (
              <g key={i}>
                {/* Score Node Circle */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={isHovered ? "6" : "4"}
                  fill={isHovered ? "#06b6d4" : "#a855f7"}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all duration-200 shadow-[0_0_8px_#a855f7]"
                  onMouseEnter={() => setHoveredAxis(axis)}
                  onMouseLeave={() => setHoveredAxis(null)}
                />

                {/* Outer Axis Text Label */}
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={`text-[11px] font-mono-tech font-bold transition-colors ${
                    isHovered ? 'fill-cyan-400' : 'fill-slate-300'
                  }`}
                >
                  {axis.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Active Axis Hover Readout */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 text-center min-h-[36px]">
        {hoveredAxis ? (
          <p className="text-xs font-mono-tech font-bold text-cyan-300 animate-pulse">
            {hoveredAxis.label.toUpperCase()}: <span className="text-white text-sm font-black">{hoveredAxis.score.toFixed(1)} / 10</span>
          </p>
        ) : (
          <p className="text-[11px] font-mono-tech text-slate-500 italic">
            // HOVER NODES FOR DETAILED BREAKDOWN
          </p>
        )}
      </div>
    </div>
  );
}