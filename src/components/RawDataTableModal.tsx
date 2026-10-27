import React from 'react';
import { X, Download, Table as TableIcon, FileSpreadsheet } from 'lucide-react';
import { KinematicsResult } from '../types/astrophysics';

interface RawDataTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: KinematicsResult;
}

export const RawDataTableModal: React.FC<RawDataTableModalProps> = ({
  isOpen,
  onClose,
  results,
}) => {
  if (!isOpen) return null;

  const { galaxy, points } = results;

  const handleDownloadCSV = () => {
    const headers = [
      'Radius_kpc',
      'V_obs_kms',
      'err_V_kms',
      'V_TEG_kms',
      'V_bar_kms',
      'V_gas_kms',
      'V_disk_kms',
      'V_bulge_kms',
      'Residual_kms',
    ];

    const rows = points.map((p) => [
      p.rad.toFixed(2),
      p.vobs.toFixed(1),
      p.errv.toFixed(1),
      p.vTeg.toFixed(2),
      p.vbar.toFixed(2),
      p.vgasEff.toFixed(2),
      p.vdiskEff.toFixed(2),
      p.vbulEff.toFixed(2),
      p.residual.toFixed(2),
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${galaxy.id}_TEG_SPARC_measurements.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#090e1f] border border-cyan-500/30 rounded-2xl max-w-4xl w-full max-h-[88vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#0e162e] border-b border-cyan-500/20 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <TableIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                SPARC Kinematic Radial Measurements
                <span className="text-xs font-mono font-normal bg-cyan-950 px-2 py-0.5 rounded text-cyan-300 border border-cyan-500/30">
                  {galaxy.name}
                </span>
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                CWRU Catalog Archive · {points.length} Radial Bins · R_max = {results.rMax} kpc
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white transition shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              Download CSV
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="p-4 overflow-y-auto flex-1 font-mono text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-900/60 text-slate-300 text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-3">Radius (kpc)</th>
                <th className="py-2.5 px-3 text-cyan-300">V_obs (km/s)</th>
                <th className="py-2.5 px-3 text-slate-400">err_V</th>
                <th className="py-2.5 px-3 text-cyan-400 font-bold">V_TEG (km/s)</th>
                <th className="py-2.5 px-3 text-slate-300">V_bar</th>
                <th className="py-2.5 px-3 text-emerald-400">V_gas</th>
                <th className="py-2.5 px-3 text-amber-400">V_disk</th>
                <th className="py-2.5 px-3 text-rose-400">V_bulge</th>
                <th className="py-2.5 px-3">Residual (ΔV)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {points.map((pt, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-cyan-950/20 transition-colors"
                >
                  <td className="py-2 px-3 font-semibold text-white">{pt.rad.toFixed(2)}</td>
                  <td className="py-2 px-3 text-cyan-300 font-bold">{pt.vobs.toFixed(1)}</td>
                  <td className="py-2 px-3 text-slate-400">±{pt.errv.toFixed(1)}</td>
                  <td className="py-2 px-3 text-cyan-400 font-bold">{pt.vTeg.toFixed(1)}</td>
                  <td className="py-2 px-3 text-slate-300">{pt.vbar.toFixed(1)}</td>
                  <td className="py-2 px-3 text-emerald-400">{pt.vgasEff.toFixed(1)}</td>
                  <td className="py-2 px-3 text-amber-400">{pt.vdiskEff.toFixed(1)}</td>
                  <td className="py-2 px-3 text-rose-400">{pt.vbulEff.toFixed(1)}</td>
                  <td
                    className={`py-2 px-3 font-semibold ${
                      pt.residual >= 0 ? 'text-cyan-400' : 'text-rose-400'
                    }`}
                  >
                    {pt.residual > 0 ? '+' : ''}
                    {pt.residual.toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="bg-[#0b1020] border-t border-slate-800 px-6 py-3 flex items-center justify-between text-xs text-slate-400">
          <span>Source: Spitzer Photometry & Accurate Rotation Curves (SPARC) Database</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition font-sans text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
