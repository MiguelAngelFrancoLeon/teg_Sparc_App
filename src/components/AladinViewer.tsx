import React, { useState } from 'react';
import { GalaxyMetadata } from '../types/astrophysics';
import {
  Telescope,
  Maximize2,
  ExternalLink,
  Layers,
  ZoomIn,
  ZoomOut,
  Crosshair,
  RefreshCw,
} from 'lucide-react';

interface AladinViewerProps {
  galaxy: GalaxyMetadata;
}

export const AladinViewer: React.FC<AladinViewerProps> = ({ galaxy }) => {
  const [survey, setSurvey] = useState<'P/DSS2/color' | 'P/2MASS/color' | 'P/allWISE/color' | 'P/PanSTARRS/DR1/color-z-zg-g'>('P/DSS2/color');
  const [fov, setFov] = useState<number>(galaxy.fovDeg || 0.25);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  // Sync FOV when galaxy changes
  React.useEffect(() => {
    setFov(galaxy.fovDeg || 0.25);
    setIframeKey((prev) => prev + 1);
  }, [galaxy.id, galaxy.fovDeg]);

  const aladinUrl = `https://aladin.cds.unistra.fr/AladinLite/?target=${encodeURIComponent(
    galaxy.id
  )}&fov=${fov}&survey=${encodeURIComponent(survey)}`;

  const handleZoom = (factor: number) => {
    setFov((prev) => {
      const next = Math.max(0.04, Math.min(1.5, prev * factor));
      return parseFloat(next.toFixed(3));
    });
  };

  const handleResetView = () => {
    setFov(galaxy.fovDeg || 0.25);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className="bg-[#080d1c] border border-cyan-500/20 rounded-xl overflow-hidden flex flex-col h-[380px] shadow-lg relative">
      {/* Top Header Bar */}
      <div className="bg-[#0d1428] border-b border-cyan-500/15 px-3.5 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Telescope className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold text-slate-200">
            Astronomical Ingestion
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
            Aladin Lite CDS
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Survey Selector */}
          <div className="flex items-center gap-1 bg-[#070b16] border border-slate-700/60 rounded px-1.5 py-0.5">
            <Layers className="w-3 h-3 text-slate-400" />
            <select
              value={survey}
              onChange={(e) => {
                setSurvey(e.target.value as any);
                setIframeKey((k) => k + 1);
              }}
              className="bg-transparent text-[11px] font-mono text-cyan-300 focus:outline-none cursor-pointer"
            >
              <option value="P/DSS2/color" className="bg-[#080d1c] text-slate-200">
                DSS2 Color (Optical)
              </option>
              <option value="P/2MASS/color" className="bg-[#080d1c] text-slate-200">
                2MASS (Near-IR JHK)
              </option>
              <option value="P/allWISE/color" className="bg-[#080d1c] text-slate-200">
                AllWISE (Mid-IR 3.4µm)
              </option>
              <option value="P/PanSTARRS/DR1/color-z-zg-g" className="bg-[#080d1c] text-slate-200">
                Pan-STARRS DR1
              </option>
            </select>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-0.5 bg-[#070b16] border border-slate-700/60 rounded px-1 py-0.5">
            <button
              onClick={() => handleZoom(0.75)}
              className="p-1 hover:text-cyan-300 text-slate-400 transition"
              title="Zoom In"
            >
              <ZoomIn className="w-3 h-3" />
            </button>
            <button
              onClick={() => handleZoom(1.33)}
              className="p-1 hover:text-cyan-300 text-slate-400 transition"
              title="Zoom Out"
            >
              <ZoomOut className="w-3 h-3" />
            </button>
            <button
              onClick={handleResetView}
              className="p-1 hover:text-cyan-300 text-slate-400 transition"
              title="Reset Field of View"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>

          <a
            href={`https://simbad.u-strasbg.fr/simbad/sim-basic?Ident=${encodeURIComponent(galaxy.id)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 text-slate-400 hover:text-cyan-300 transition"
            title="Open SIMBAD Astronomical Database in new tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main Aladin Viewport */}
      <div className="relative flex-1 bg-black overflow-hidden group">
        <iframe
          key={`${galaxy.id}-${survey}-${fov}-${iframeKey}`}
          src={aladinUrl}
          title={`Aladin Lite - ${galaxy.name}`}
          className="w-full h-full border-none"
          allow="fullscreen"
          loading="lazy"
        />

        {/* Reticle Overlay Badge */}
        <div className="absolute top-2.5 left-2.5 bg-[#080d1c]/90 backdrop-blur-md border border-cyan-500/30 rounded-md px-2 py-1 text-[10px] font-mono text-cyan-300 pointer-events-none flex items-center gap-1.5 shadow-md">
          <Crosshair className="w-3 h-3 text-cyan-400" />
          <span>RA: {galaxy.ra}</span>
          <span className="text-slate-500">|</span>
          <span>DEC: {galaxy.dec}</span>
        </div>

        {/* Photometric Band Badge */}
        <div className="absolute top-2.5 right-2.5 bg-[#080d1c]/90 backdrop-blur-md border border-purple-500/30 rounded-md px-2 py-1 text-[10px] font-mono text-purple-300 pointer-events-none shadow-md">
          FOV: {fov}° · {galaxy.band}
        </div>
      </div>

      {/* Bottom Metadata Ribbon */}
      <div className="bg-[#0b1020] border-t border-slate-800/80 px-3 py-1.5 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-2 truncate">
          <span className="text-cyan-400 font-medium">{galaxy.name}:</span>
          <span className="truncate">{galaxy.description}</span>
        </div>
        <div className="flex items-center gap-3 shrink-0 font-mono text-[10px]">
          <span>CDS Strasbourg Portal</span>
          <span className="text-slate-600">•</span>
          <span className="text-emerald-400">FITS Calibrated</span>
        </div>
      </div>
    </div>
  );
};
