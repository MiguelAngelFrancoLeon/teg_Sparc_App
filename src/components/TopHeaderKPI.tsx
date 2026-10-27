import React from 'react';
import { GalaxyMetadata, KinematicsResult } from '../types/astrophysics';
import { Telescope, Compass, Orbit, Weight, Sparkles, BookOpen } from 'lucide-react';

interface TopHeaderKPIProps {
  galaxy: GalaxyMetadata;
  results: KinematicsResult;
  onOpenTheory: () => void;
  onOpenTable: () => void;
}

export const TopHeaderKPI: React.FC<TopHeaderKPIProps> = ({
  galaxy,
  results,
  onOpenTheory,
  onOpenTable,
}) => {
  return (
    <header className="border-b border-cyan-950/60 bg-gradient-to-r from-[#060a17] via-[#090e1f] to-[#060a17] p-4 lg:px-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-900/30 border border-cyan-400/30">
            <Orbit className="w-5 h-5 text-white animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                TEG Workbench
                <span className="text-xs font-mono font-normal uppercase px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                  Franco León 2026
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400">
              Tetrahedral Emergent Gravity vs SPARC Galactic Kinematics (CWRU Catalog)
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenTable}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 transition"
            title="Inspect raw SPARC radial measurements and export CSV"
          >
            <Telescope className="w-3.5 h-3.5 text-cyan-400" />
            SPARC Data Table
          </button>
          <button
            onClick={onOpenTheory}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 shadow-sm transition"
            title="View paper physics, holographic bounds, and mathematical derivations"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-300" />
            TEG Physics Derivation
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {/* Galaxy ID */}
        <div className="bg-[#0b1224]/80 border border-cyan-500/20 rounded-xl p-2.5 px-3 shadow-inner">
          <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-1">
            <Telescope className="w-3 h-3 text-cyan-400" /> Target
          </div>
          <div className="text-sm font-bold text-cyan-300 font-mono mt-0.5 truncate">
            {galaxy.name}
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
            {galaxy.category} Spiral
          </div>
        </div>

        {/* Morphological Type */}
        <div className="bg-[#0b1224]/80 border border-purple-500/20 rounded-xl p-2.5 px-3 shadow-inner">
          <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-1">
            <Compass className="w-3 h-3 text-purple-400" /> Morphology
          </div>
          <div className="text-sm font-bold text-purple-300 font-mono mt-0.5">
            Type {galaxy.type}
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
            Hubble Sequence
          </div>
        </div>

        {/* Distance */}
        <div className="bg-[#0b1224]/80 border border-blue-500/20 rounded-xl p-2.5 px-3 shadow-inner">
          <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-1">
            <Orbit className="w-3 h-3 text-blue-400" /> Distance
          </div>
          <div className="text-sm font-bold text-blue-300 font-mono mt-0.5">
            {galaxy.distanceMpc.toFixed(1)} <span className="text-xs text-slate-400 font-normal">Mpc</span>
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
            ~{(galaxy.distanceMpc * 3.262).toFixed(1)} Mly
          </div>
        </div>

        {/* Baryonic Mass */}
        <div className="bg-[#0b1224]/80 border border-amber-500/20 rounded-xl p-2.5 px-3 shadow-inner">
          <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-1">
            <Weight className="w-3 h-3 text-amber-400" /> Baryonic Mass
          </div>
          <div className="text-sm font-bold text-amber-300 font-mono mt-0.5">
            {results.totalBaryonicMassSolar.toExponential(2)}{' '}
            <span className="text-xs text-slate-400 font-normal">M☉</span>
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
            Gas + Disk + Bulge
          </div>
        </div>

        {/* Inclination Angle */}
        <div className="bg-[#0b1224]/80 border border-emerald-500/20 rounded-xl p-2.5 px-3 shadow-inner">
          <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-400" /> Inclination
          </div>
          <div className="text-sm font-bold text-emerald-300 font-mono mt-0.5">
            {galaxy.inclinationDeg.toFixed(0)}°
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
            Disk Tilt i
          </div>
        </div>

        {/* Max Radius Tested */}
        <div className="bg-[#0b1224]/80 border border-rose-500/20 rounded-xl p-2.5 px-3 shadow-inner">
          <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-1">
            <Compass className="w-3 h-3 text-rose-400" /> Extent (R_max)
          </div>
          <div className="text-sm font-bold text-rose-300 font-mono mt-0.5">
            {results.rMax.toFixed(1)} <span className="text-xs text-slate-400 font-normal">kpc</span>
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
            {results.points.length} Radial Bins
          </div>
        </div>
      </div>
    </header>
  );
};
