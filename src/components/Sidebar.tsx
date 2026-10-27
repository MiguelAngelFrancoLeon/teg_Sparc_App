import React, { useState } from 'react';
import { GalaxyMetadata, TEGConstants } from '../types/astrophysics';
import { TEG_CONSTANTS, TEGOptions } from '../services/tegEngine';
import {
  Sliders,
  Sparkles,
  Layers,
  Info,
  RotateCcw,
  Upload,
  Cpu,
  Search,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';

interface SidebarProps {
  galaxies: GalaxyMetadata[];
  selectedGalaxyId: string;
  onSelectGalaxy: (id: string) => void;
  options: TEGOptions;
  onChangeOptions: (newOpts: TEGOptions) => void;
  onCustomFileUpload: (fileContent: string, fileName: string) => void;
  onOpenTheory: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  galaxies,
  selectedGalaxyId,
  onSelectGalaxy,
  options,
  onChangeOptions,
  onCustomFileUpload,
  onOpenTheory,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const filteredGalaxies = galaxies.filter((g) => {
    const matchesSearch =
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === 'All' || g.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleResetML = () => {
    onChangeOptions({
      ...options,
      upsDisk: 0.5,
      upsBulge: 0.7,
    });
  };

  const handleApplyPreset = (disk: number, bulge: number) => {
    onChangeOptions({
      ...options,
      upsDisk: disk,
      upsBulge: bulge,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        onCustomFileUpload(text, file.name);
      }
    };
    reader.readAsText(file);
  };

  return (
    <aside className="w-full lg:w-80 bg-[#070b16] border-r border-slate-800/80 flex flex-col h-full overflow-y-auto p-4 space-y-5 text-slate-300">
      {/* Target Selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-cyan-400" /> SPARC Galaxy Target
          </span>
          <span className="text-[10px] font-mono text-slate-500">
            {filteredGalaxies.length} available
          </span>
        </label>

        {/* Quick Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search galaxy (e.g. NGC 2841, UGC 2885)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0d1424] border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1">
          {['All', 'Massive', 'Intermediate', 'Dwarf', 'LSB', 'Bulged'].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`text-[10px] px-2 py-0.5 rounded-full transition ${
                  categoryFilter === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                {cat}
              </button>
            )
          )}
        </div>

        {/* Select Dropdown */}
        <select
          value={selectedGalaxyId}
          onChange={(e) => onSelectGalaxy(e.target.value)}
          className="w-full bg-[#0d1424] border border-cyan-500/30 rounded-lg px-3 py-2 text-xs font-mono text-cyan-200 focus:outline-none focus:border-cyan-400 cursor-pointer shadow-sm"
        >
          {filteredGalaxies.map((g) => (
            <option key={g.id} value={g.id} className="bg-[#0b1020] text-slate-200">
              {g.name} ({g.type} - {g.category})
            </option>
          ))}
        </select>
      </div>

      <hr className="border-slate-800" />

      {/* Baryonic Mass-to-Light Ratios */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-amber-400" /> Baryonic M/L Ratios
          </label>
          <button
            onClick={handleResetML}
            className="text-[10px] flex items-center gap-1 text-slate-400 hover:text-amber-300 transition"
            title="Reset to canonical SPARC defaults (Υ_disk=0.5, Υ_bulge=0.7)"
          >
            <RotateCcw className="w-2.5 h-2.5" /> Reset (0.5/0.7)
          </button>
        </div>

        {/* Preset Buttons */}
        <div className="grid grid-cols-3 gap-1">
          <button
            onClick={() => handleApplyPreset(0.5, 0.7)}
            className={`text-[10px] py-1 px-1.5 rounded border transition font-mono ${
              options.upsDisk === 0.5 && options.upsBulge === 0.7
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-800/40 text-slate-400 border-slate-700/60 hover:text-slate-200'
            }`}
          >
            SPARC (0.5/0.7)
          </button>
          <button
            onClick={() => handleApplyPreset(0.8, 0.8)}
            className={`text-[10px] py-1 px-1.5 rounded border transition font-mono ${
              options.upsDisk === 0.8 && options.upsBulge === 0.8
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-800/40 text-slate-400 border-slate-700/60 hover:text-slate-200'
            }`}
          >
            Max Disk (0.8)
          </button>
          <button
            onClick={() => handleApplyPreset(0.3, 0.4)}
            className={`text-[10px] py-1 px-1.5 rounded border transition font-mono ${
              options.upsDisk === 0.3 && options.upsBulge === 0.4
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-800/40 text-slate-400 border-slate-700/60 hover:text-slate-200'
            }`}
          >
            Low (0.3/0.4)
          </button>
        </div>

        {/* Disk Slider */}
        <div className="bg-[#0b1020]/70 border border-slate-800 rounded-lg p-2.5 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>
              Disk M/L (<span className="font-serif italic">Υ_disk</span>)
            </span>
            <span className="font-mono font-bold text-amber-400 text-sm">
              {options.upsDisk.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min="0.05"
            max="1.50"
            step="0.05"
            value={options.upsDisk}
            onChange={(e) =>
              onChangeOptions({
                ...options,
                upsDisk: parseFloat(e.target.value),
              })
            }
            className="w-full accent-amber-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[9px] text-slate-500 font-mono">
            <span>0.05 (Min)</span>
            <span>0.50 (Standard)</span>
            <span>1.50 (High)</span>
          </div>
        </div>

        {/* Bulge Slider */}
        <div className="bg-[#0b1020]/70 border border-slate-800 rounded-lg p-2.5 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-400 inline-block"></span>
              Bulge M/L (<span className="font-serif italic">Υ_bulge</span>)
            </span>
            <span className="font-mono font-bold text-rose-400 text-sm">
              {options.upsBulge.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min="0.05"
            max="1.50"
            step="0.05"
            value={options.upsBulge}
            onChange={(e) =>
              onChangeOptions({
                ...options,
                upsBulge: parseFloat(e.target.value),
              })
            }
            className="w-full accent-rose-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[9px] text-slate-500 font-mono">
            <span>0.05 (Min)</span>
            <span>0.70 (Standard)</span>
            <span>1.50 (High)</span>
          </div>
        </div>
      </div>

      <hr className="border-slate-800" />

      {/* TEG Vacuum Dynamics Controls */}
      <div className="space-y-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> TEG Theoretical Controls
        </label>

        {/* Master Toggle */}
        <div className="bg-[#0b1020]/80 border border-cyan-500/30 rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-cyan-200">
                Vacuum Entropy Term
              </div>
              <div className="text-[10px] text-slate-400">
                M_vac(r) = ln(2) · M_bar · (r/r_max)³
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={options.enableTEG}
                onChange={(e) =>
                  onChangeOptions({
                    ...options,
                    enableTEG: e.target.checked,
                  })
                }
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500"></div>
            </label>
          </div>

          {!options.enableTEG && (
            <div className="text-[10px] text-amber-300/90 bg-amber-950/30 border border-amber-600/30 rounded p-1.5 flex items-center gap-1.5">
              <Info className="w-3 h-3 shrink-0" />
              Showing purely Newtonian baryonic gravity (V_bar alone).
            </div>
          )}
        </div>

        {/* Holographic Coupling Modulation */}
        <div className="flex items-center justify-between p-2.5 bg-[#0b1020]/60 border border-slate-800 rounded-lg">
          <div>
            <div className="text-xs text-slate-200 flex items-center gap-1">
              Scale Coupling (1 + σ_eff)
              <span className="text-[9px] font-mono text-cyan-400">1.1088</span>
            </div>
            <div className="text-[10px] text-slate-500">
              UV coordination boundary correction
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={options.useSigmaEffModulation}
              onChange={(e) =>
                onChangeOptions({
                  ...options,
                  useSigmaEffModulation: e.target.checked,
                })
              }
              className="sr-only peer"
            />
            <div className="w-8 h-4 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-indigo-500"></div>
          </label>
        </div>
      </div>

      <hr className="border-slate-800" />

      {/* TEG Derived Constants Card */}
      <div className="bg-gradient-to-b from-[#090f20] to-[#0b1328] border border-cyan-500/20 rounded-xl p-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" /> TEG Derived Constants
          </span>
          <button
            onClick={onOpenTheory}
            className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5 underline decoration-dotted"
          >
            Theory <HelpCircle className="w-2.5 h-2.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
          <div className="bg-black/30 p-1.5 rounded border border-white/5">
            <div className="text-[9px] text-slate-500">Coordination z</div>
            <div className="text-cyan-300 font-bold">{TEG_CONSTANTS.z} (Tetrahedral)</div>
          </div>
          <div className="bg-black/30 p-1.5 rounded border border-white/5">
            <div className="text-[9px] text-slate-500">Spatial Bits</div>
            <div className="text-cyan-300 font-bold">N_bits = {TEG_CONSTANTS.nBits}</div>
          </div>
          <div className="bg-black/30 p-1.5 rounded border border-white/5">
            <div className="text-[9px] text-slate-500">UV Mismatch σ_UV</div>
            <div className="text-purple-300 font-bold">{TEG_CONSTANTS.sigmaUV}</div>
          </div>
          <div className="bg-black/30 p-1.5 rounded border border-white/5">
            <div className="text-[9px] text-slate-500">Coupling Scale σ_eff</div>
            <div className="text-purple-300 font-bold">{TEG_CONSTANTS.sigmaEff.toFixed(4)}</div>
          </div>
          <div className="bg-black/30 p-1.5 rounded border border-white/5">
            <div className="text-[9px] text-slate-500">Area Scale D_A</div>
            <div className="text-emerald-300 font-bold">ln(4) ≈ {TEG_CONSTANTS.dA.toFixed(4)}</div>
          </div>
          <div className="bg-black/30 p-1.5 rounded border border-white/5">
            <div className="text-[9px] text-slate-500">Volume Scale D_V</div>
            <div className="text-emerald-300 font-bold">ln(8) ≈ {TEG_CONSTANTS.dV.toFixed(4)}</div>
          </div>
        </div>

        <div className="text-[10px] text-slate-400 bg-cyan-950/20 border border-cyan-800/30 rounded p-1.5 flex items-center gap-1.5">
          <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
          <span>Strict zero-free-parameter framework (no dark matter halo fitting).</span>
        </div>
      </div>

      {/* Upload Custom SPARC .dat File */}
      <div className="mt-auto pt-2">
        <label className="flex items-center justify-center gap-2 p-2 border border-dashed border-slate-700 hover:border-cyan-500/60 rounded-lg text-xs text-slate-400 hover:text-cyan-300 transition cursor-pointer bg-slate-900/40">
          <Upload className="w-3.5 h-3.5 text-cyan-400" />
          <span>Upload Custom SPARC (.dat/.txt)</span>
          <input
            type="file"
            accept=".dat,.txt"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>
    </aside>
  );
};
