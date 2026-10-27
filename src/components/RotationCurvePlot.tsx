import React, { useState, useRef } from 'react';
import { KinematicsResult, ComputedDataPoint } from '../types/astrophysics';
import {
  Download,
  Eye,
  EyeOff,
  Maximize2,
  TrendingDown,
  Info,
  Layers,
  Sparkles,
} from 'lucide-react';

interface RotationCurvePlotProps {
  results: KinematicsResult;
  upsDisk: number;
  upsBulge: number;
}

export const RotationCurvePlot: React.FC<RotationCurvePlotProps> = ({
  results,
  upsDisk,
  upsBulge,
}) => {
  const { points, galaxy } = results;
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Trace visibility toggles
  const [showObs, setShowObs] = useState(true);
  const [showTEG, setShowTEG] = useState(true);
  const [showVbar, setShowVbar] = useState(true);
  const [showGas, setShowGas] = useState(true);
  const [showDisk, setShowDisk] = useState(true);
  const [showBulge, setShowBulge] = useState(true);
  const [hoveredPoint, setHoveredPoint] = useState<ComputedDataPoint | null>(null);

  // Canvas Dimensions
  const width = 950;
  const totalHeight = 480;
  const mainPlotHeight = 330;
  const residualPlotHeight = 100;
  const gap = 30;

  const margin = { top: 25, right: 30, bottom: 40, left: 65 };
  const plotWidth = width - margin.left - margin.right;

  // Extents
  const maxR = Math.max(...points.map((p) => p.rad)) * 1.05;
  const maxV =
    Math.max(
      ...points.map((p) => Math.max(p.vobs + p.errv, p.vTeg, p.vbar, p.vdiskEff, p.vgasEff, p.vbulEff))
    ) * 1.12;

  // Coordinate transforms for Main Plot
  const scaleX = (r: number) => margin.left + (r / maxR) * plotWidth;
  const scaleY = (v: number) =>
    margin.top + mainPlotHeight - (Math.max(0, v) / maxV) * mainPlotHeight;

  // Residual Extent
  const maxResidual = Math.max(
    25,
    ...points.map((p) => Math.abs(p.residual)),
    ...points.map((p) => p.errv)
  ) * 1.15;

  const resTop = margin.top + mainPlotHeight + gap;
  const scaleResY = (res: number) =>
    resTop + residualPlotHeight / 2 - (res / maxResidual) * (residualPlotHeight / 2);

  // Generate SVG path strings
  const generatePath = (valKey: (p: ComputedDataPoint) => number) => {
    return points
      .map((p, idx) => {
        const x = scaleX(p.rad);
        const y = scaleY(valKey(p));
        return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join(' ');
  };

  const tegPath = generatePath((p) => p.vTeg);
  const vbarPath = generatePath((p) => p.vbar);
  const gasPath = generatePath((p) => p.vgasEff);
  const diskPath = generatePath((p) => p.vdiskEff);
  const bulgePath = generatePath((p) => p.vbulEff);

  const resPath = points
    .map((p, idx) => {
      const x = scaleX(p.rad);
      const y = scaleResY(p.residual);
      return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');

  // Export SVG handler
  const handleExportSVG = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${galaxy.id}_TEG_SPARC_RotationCurve.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const hasBulge = points.some((p) => p.vbulEff > 0);

  return (
    <div className="bg-[#080d1c] border border-cyan-500/20 rounded-xl p-4 shadow-xl flex flex-col space-y-3">
      {/* Chart Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-semibold text-slate-100">
            Galactic Rotation Curve Decomposition
          </h3>
          <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
            {galaxy.name}
          </span>
        </div>

        {/* Legend / Visibility Toggles */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          {/* V_obs */}
          <button
            onClick={() => setShowObs(!showObs)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition ${
              showObs
                ? 'bg-slate-700/60 text-white border-white/40 shadow-sm'
                : 'bg-slate-900/40 text-slate-500 border-slate-800 line-through'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-white border border-cyan-400"></span>
            V_obs (SPARC Data)
          </button>

          {/* V_TEG */}
          <button
            onClick={() => setShowTEG(!showTEG)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition ${
              showTEG
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm shadow-cyan-950'
                : 'bg-slate-900/40 text-slate-500 border-slate-800 line-through'
            }`}
          >
            <span className="w-3.5 h-0.5 bg-cyan-400 shadow-[0_0_8px_#38bdf8]"></span>
            V_TEG (Emergent)
          </button>

          {/* V_bar */}
          <button
            onClick={() => setShowVbar(!showVbar)}
            className={`flex items-center gap-1.5 px-2 py-1 rounded-md border transition ${
              showVbar
                ? 'bg-slate-800/80 text-slate-300 border-slate-600'
                : 'bg-slate-900/40 text-slate-500 border-slate-800 line-through'
            }`}
          >
            <span className="w-3.5 border-b border-dashed border-slate-400"></span>
            V_bar (Newtonian)
          </button>

          {/* V_disk */}
          <button
            onClick={() => setShowDisk(!showDisk)}
            className={`flex items-center gap-1.5 px-2 py-1 rounded-md border transition ${
              showDisk
                ? 'bg-amber-950/40 text-amber-300 border-amber-500/40'
                : 'bg-slate-900/40 text-slate-500 border-slate-800 line-through'
            }`}
          >
            <span className="w-3.5 border-b border-dotted border-amber-400"></span>
            Disk (Υ={upsDisk.toFixed(2)})
          </button>

          {/* V_gas */}
          <button
            onClick={() => setShowGas(!showGas)}
            className={`flex items-center gap-1.5 px-2 py-1 rounded-md border transition ${
              showGas
                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-900/40 text-slate-500 border-slate-800 line-through'
            }`}
          >
            <span className="w-3.5 border-b border-dotted border-emerald-400"></span>
            Gas (HI+He)
          </button>

          {/* V_bulge */}
          {hasBulge && (
            <button
              onClick={() => setShowBulge(!showBulge)}
              className={`flex items-center gap-1.5 px-2 py-1 rounded-md border transition ${
                showBulge
                  ? 'bg-rose-950/40 text-rose-300 border-rose-500/40'
                  : 'bg-slate-900/40 text-slate-500 border-slate-800 line-through'
              }`}
            >
              <span className="w-3.5 border-b border-dotted border-rose-400"></span>
              Bulge (Υ={upsBulge.toFixed(2)})
            </button>
          )}

          {/* Export SVG */}
          <button
            onClick={handleExportSVG}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title="Download publication-quality SVG vector graphic"
          >
            <Download className="w-3 h-3 text-cyan-400" />
            SVG Export
          </button>
        </div>
      </div>

      {/* SVG Container */}
      <div className="relative w-full overflow-x-auto bg-[#050811] rounded-xl border border-slate-800/80 p-2">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${totalHeight}`}
          className="w-full h-auto min-w-[750px] select-none font-sans"
        >
          <defs>
            {/* Cyan Glow Filter for TEG Theoretical Curve */}
            <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#38bdf8" floodOpacity="0.85" />
            </filter>
            {/* Linear Gradient for Plot Background */}
            <linearGradient id="plotBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a1024" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#060914" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          {/* Main Plot Area Background */}
          <rect
            x={margin.left}
            y={margin.top}
            width={plotWidth}
            height={mainPlotHeight}
            fill="url(#plotBg)"
            rx={6}
            stroke="#1e293b"
            strokeWidth="1"
          />

          {/* Residual Plot Area Background */}
          <rect
            x={margin.left}
            y={resTop}
            width={plotWidth}
            height={residualPlotHeight}
            fill="url(#plotBg)"
            rx={6}
            stroke="#1e293b"
            strokeWidth="1"
          />

          {/* Zero Line on Residual Plot */}
          <line
            x1={margin.left}
            y1={scaleResY(0)}
            x2={margin.left + plotWidth}
            y2={scaleResY(0)}
            stroke="#475569"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />

          {/* Horizontal Grid Lines - Main Plot */}
          {[0.25, 0.5, 0.75, 1.0].map((frac) => {
            const val = maxV * frac;
            const y = scaleY(val);
            return (
              <g key={`y-grid-${frac}`}>
                <line
                  x1={margin.left}
                  y1={y}
                  x2={margin.left + plotWidth}
                  y2={y}
                  stroke="#1e293b"
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                />
                <text
                  x={margin.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  fill="#64748b"
                  fontSize="10"
                  fontFamily="JetBrains Mono"
                >
                  {val.toFixed(0)}
                </text>
              </g>
            );
          })}

          {/* Vertical Grid Lines across both plots */}
          {Array.from({ length: 6 }).map((_, i) => {
            const frac = (i + 1) / 6;
            const rVal = maxR * frac;
            const x = scaleX(rVal);
            return (
              <g key={`x-grid-${i}`}>
                <line
                  x1={x}
                  y1={margin.top}
                  x2={x}
                  y2={margin.top + mainPlotHeight}
                  stroke="#1e293b"
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                />
                <line
                  x1={x}
                  y1={resTop}
                  x2={x}
                  y2={resTop + residualPlotHeight}
                  stroke="#1e293b"
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                />
                <text
                  x={x}
                  y={resTop + residualPlotHeight + 20}
                  textAnchor="middle"
                  fill="#64748b"
                  fontSize="10"
                  fontFamily="JetBrains Mono"
                >
                  {rVal.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* Y Axis Labels */}
          <text
            transform={`rotate(-90)`}
            x={-(margin.top + mainPlotHeight / 2)}
            y={20}
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="11"
            fontWeight="600"
            fontFamily="Inter"
          >
            Rotation Velocity V (km/s)
          </text>

          <text
            transform={`rotate(-90)`}
            x={-(resTop + residualPlotHeight / 2)}
            y={20}
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="10"
            fontWeight="500"
            fontFamily="Inter"
          >
            ΔV (km/s)
          </text>

          {/* X Axis Label */}
          <text
            x={margin.left + plotWidth / 2}
            y={totalHeight - 6}
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="11"
            fontWeight="600"
            fontFamily="Inter"
          >
            Galactocentric Radius r (kpc)
          </text>

          {/* Baryonic Components */}
          {/* Gas */}
          {showGas && (
            <path
              d={gasPath}
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="3 3"
              opacity="0.85"
            />
          )}

          {/* Disk */}
          {showDisk && (
            <path
              d={diskPath}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeDasharray="4 4"
              opacity="0.9"
            />
          )}

          {/* Bulge */}
          {showBulge && hasBulge && (
            <path
              d={bulgePath}
              fill="none"
              stroke="#ec4899"
              strokeWidth="2"
              strokeDasharray="2 3"
              opacity="0.85"
            />
          )}

          {/* Newtonian Baryonic Total */}
          {showVbar && (
            <path
              d={vbarPath}
              fill="none"
              stroke="#94a3b8"
              strokeWidth="2.2"
              strokeDasharray="6 4"
              opacity="0.85"
            />
          )}

          {/* TEG Theoretical Prediction (Luminous bold line) */}
          {showTEG && (
            <path
              d={tegPath}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="3.6"
              filter="url(#cyanGlow)"
            />
          )}

          {/* Real SPARC Observations with Error Bars */}
          {showObs &&
            points.map((pt) => {
              const cx = scaleX(pt.rad);
              const cy = scaleY(pt.vobs);
              const yErrTop = scaleY(pt.vobs + pt.errv);
              const yErrBottom = scaleY(Math.max(0, pt.vobs - pt.errv));

              const isHovered = hoveredPoint?.rad === pt.rad;

              return (
                <g
                  key={`pt-${pt.rad}`}
                  className="cursor-pointer group"
                  onMouseEnter={() => setHoveredPoint(pt)}
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  {/* Vertical Error Bar */}
                  <line
                    x1={cx}
                    y1={yErrTop}
                    x2={cx}
                    y2={yErrBottom}
                    stroke={isHovered ? '#38bdf8' : '#ffffff'}
                    strokeWidth={isHovered ? '2.2' : '1.5'}
                    opacity="0.8"
                  />
                  {/* Error Bar Caps */}
                  <line
                    x1={cx - 3.5}
                    y1={yErrTop}
                    x2={cx + 3.5}
                    y2={yErrTop}
                    stroke={isHovered ? '#38bdf8' : '#ffffff'}
                    strokeWidth="1.5"
                    opacity="0.8"
                  />
                  <line
                    x1={cx - 3.5}
                    y1={yErrBottom}
                    x2={cx + 3.5}
                    y2={yErrBottom}
                    stroke={isHovered ? '#38bdf8' : '#ffffff'}
                    strokeWidth="1.5"
                    opacity="0.8"
                  />
                  {/* Marker Dot */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isHovered ? 5.5 : 4}
                    fill="#ffffff"
                    stroke="#0284c7"
                    strokeWidth="2"
                    className="transition-all"
                  />
                </g>
              );
            })}

          {/* Residual Points & Line */}
          <path
            d={resPath}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.2"
            opacity="0.5"
          />
          {points.map((pt) => {
            const rx = scaleX(pt.rad);
            const ry = scaleResY(pt.residual);
            const isHovered = hoveredPoint?.rad === pt.rad;

            return (
              <circle
                key={`res-${pt.rad}`}
                cx={rx}
                cy={ry}
                r={isHovered ? 4.5 : 3}
                fill={pt.residual >= 0 ? '#38bdf8' : '#f43f5e'}
                opacity="0.85"
                onMouseEnter={() => setHoveredPoint(pt)}
                onMouseLeave={() => setHoveredPoint(null)}
                className="cursor-pointer"
              />
            );
          })}

          {/* Crosshair on Hover */}
          {hoveredPoint && (
            <g pointerEvents="none">
              <line
                x1={scaleX(hoveredPoint.rad)}
                y1={margin.top}
                x2={scaleX(hoveredPoint.rad)}
                y2={resTop + residualPlotHeight}
                stroke="#38bdf8"
                strokeWidth="1"
                strokeDasharray="2 2"
                opacity="0.7"
              />
            </g>
          )}
        </svg>

        {/* Hover Tooltip Overlay HUD */}
        {hoveredPoint && (
          <div
            className="absolute top-4 right-4 bg-[#080d1c]/95 border border-cyan-500/40 rounded-xl p-3 shadow-2xl backdrop-blur-md text-xs font-mono z-20 space-y-1.5 min-w-[210px] pointer-events-none"
          >
            <div className="flex items-center justify-between border-b border-slate-700/80 pb-1 text-slate-300">
              <span className="font-semibold text-cyan-300">
                Radius r: {hoveredPoint.rad.toFixed(2)} kpc
              </span>
              <span className="text-[10px] text-slate-400">
                {galaxy.name}
              </span>
            </div>
            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between items-center text-white">
                <span>V_obs:</span>
                <span className="font-bold">
                  {hoveredPoint.vobs.toFixed(1)} ± {hoveredPoint.errv.toFixed(1)} km/s
                </span>
              </div>
              <div className="flex justify-between items-center text-cyan-300">
                <span>V_TEG:</span>
                <span className="font-bold">
                  {hoveredPoint.vTeg.toFixed(1)} km/s
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>V_bar (Newt):</span>
                <span>{hoveredPoint.vbar.toFixed(1)} km/s</span>
              </div>
              <div className="flex justify-between items-center text-amber-300">
                <span>V_disk:</span>
                <span>{hoveredPoint.vdiskEff.toFixed(1)} km/s</span>
              </div>
              <div className="flex justify-between items-center text-emerald-300">
                <span>V_gas:</span>
                <span>{hoveredPoint.vgasEff.toFixed(1)} km/s</span>
              </div>
              {hasBulge && (
                <div className="flex justify-between items-center text-rose-300">
                  <span>V_bulge:</span>
                  <span>{hoveredPoint.vbulEff.toFixed(1)} km/s</span>
                </div>
              )}
              <div className="border-t border-slate-800 pt-1 flex justify-between items-center text-slate-300">
                <span>Residual ΔV:</span>
                <span
                  className={`font-bold ${
                    hoveredPoint.residual >= 0
                      ? 'text-cyan-400'
                      : 'text-rose-400'
                  }`}
                >
                  {hoveredPoint.residual > 0 ? '+' : ''}
                  {hoveredPoint.residual.toFixed(1)} km/s
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chart Footer Notes */}
      <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 px-1 pt-1">
        <span className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-cyan-400" />
          Solid cyan line: V_TEG(r) = √[g_TEG · r], where g_TEG = g_bar + ln(2)·(V_bar²(r_max)/r_max)·(r/r_max).
        </span>
        <span className="text-slate-500 font-mono">
          Hover data markers for kinematic values · Interactive SVG
        </span>
      </div>
    </div>
  );
};
