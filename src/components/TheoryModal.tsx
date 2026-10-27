import React from 'react';
import { X, BookOpen, Atom, Orbit, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { TEG_CONSTANTS } from '../services/tegEngine';

interface TheoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TheoryModal: React.FC<TheoryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#090e1f] border border-cyan-500/30 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-[#0e162e] border-b border-cyan-500/20 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Atom className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Tetrahedral Emergent Gravity (TEG)
                <span className="text-xs font-mono font-normal bg-cyan-950 px-2 py-0.5 rounded text-cyan-300 border border-cyan-500/30">
                  Miguel Ángel Franco León
                </span>
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                "A Geometric Information Framework for Galactic Rotation Curves"
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300 leading-relaxed">
          {/* Section 1: Core Physical Axiom */}
          <div className="bg-[#0d1428] border border-cyan-500/20 rounded-xl p-4 space-y-2.5">
            <h3 className="text-cyan-300 font-semibold flex items-center gap-2 text-sm uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              1. Fundamental Axiomatic Foundation
            </h3>
            <p>
              Under the TEG framework, space-time degrees of freedom do not form a smooth classical continuum at the Planck/UV scale. Instead, they crystallize into a discrete <b>tetrahedral network coordination (<span className="font-mono text-cyan-300">z = 4</span>)</b>, which is the mathematically unique spatial tessellation that maximizes holographic entropy density per unit Planck volume.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 font-mono text-xs">
              <div className="bg-black/40 p-2 rounded border border-slate-800">
                <div className="text-slate-500 text-[10px]">Coordination Number</div>
                <div className="text-cyan-300 font-bold">z = 4 (Tetrahedron)</div>
              </div>
              <div className="bg-black/40 p-2 rounded border border-slate-800">
                <div className="text-slate-500 text-[10px]">Spatial Bits</div>
                <div className="text-cyan-300 font-bold">N_bits = log₂(2z) = 3</div>
              </div>
              <div className="bg-black/40 p-2 rounded border border-slate-800">
                <div className="text-slate-500 text-[10px]">UV Mismatch Roughness</div>
                <div className="text-purple-300 font-bold">σ_UV = 0.3263</div>
              </div>
              <div className="bg-black/40 p-2 rounded border border-slate-800">
                <div className="text-slate-500 text-[10px]">Coupling Scale</div>
                <div className="text-purple-300 font-bold">σ_eff = σ_UV / 3 = 0.1088</div>
              </div>
              <div className="bg-black/40 p-2 rounded border border-slate-800">
                <div className="text-slate-500 text-[10px]">Area Scale</div>
                <div className="text-emerald-300 font-bold">D_A = ln(4) ≈ 1.3863</div>
              </div>
              <div className="bg-black/40 p-2 rounded border border-slate-800">
                <div className="text-slate-500 text-[10px]">Volume Scale</div>
                <div className="text-emerald-300 font-bold">D_V = ln(8) ≈ 2.0794</div>
              </div>
            </div>
          </div>

          {/* Section 2: Mathematical Mechanics */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              2. Kinematic Mechanics & Rotation Curves
            </h3>

            <div className="space-y-3 font-mono text-xs">
              {/* Step 1 */}
              <div className="bg-[#0b1122] p-3 rounded-lg border border-slate-800">
                <span className="text-amber-400 font-bold">Step 1: Baryonic Velocity Decomposition</span>
                <p className="mt-1 text-slate-300 font-sans">
                  The sign-preserving Newtonian baryonic velocity squared is constructed from SPARC HI gas, stellar disk, and stellar bulge components:
                </p>
                <div className="mt-1.5 p-2 bg-black/50 rounded text-amber-200">
                  V_bar²(r) = |V_gas|·V_gas + Υ_disk·|V_disk|·V_disk + Υ_bulge·|V_bulge|·V_bulge
                </div>
                <span className="text-[10px] text-slate-500 font-sans">
                  Standard SPARC 3.6µm mass-to-light ratios: Υ_disk = 0.5, Υ_bulge = 0.7.
                </span>
              </div>

              {/* Step 2 */}
              <div className="bg-[#0b1122] p-3 rounded-lg border border-slate-800">
                <span className="text-cyan-400 font-bold">Step 2: Baryonic Acceleration Profile</span>
                <div className="mt-1.5 p-2 bg-black/50 rounded text-cyan-200">
                  g_bar(r) = V_bar²(r) / r
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-[#0b1122] p-3 rounded-lg border border-slate-800">
                <span className="text-purple-400 font-bold">Step 3: Emergent Vacuum Entropic Contribution</span>
                <p className="mt-1 text-slate-300 font-sans">
                  The boundary holographic entropy of the tetrahedral network contributes an effective vacuum term scaling with the cubic radial volume:
                </p>
                <div className="mt-1.5 p-2 bg-black/50 rounded text-purple-200">
                  M_vac(r) = ln(2) · M_bar_tot · (r / r_max)³
                </div>
                <p className="mt-1 text-slate-300 font-sans">
                  Converting to kinematic acceleration via g_vac(r) = G · M_vac(r) / r²:
                </p>
                <div className="mt-1.5 p-2 bg-black/50 rounded text-purple-200">
                  g_vac(r) = ln(2) · [V_bar²(r_max) / r_max] · (r / r_max)
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-[#0b1122] p-3 rounded-lg border border-slate-800">
                <span className="text-emerald-400 font-bold">Step 4: Final Emergent Rotation Velocity</span>
                <div className="mt-1.5 p-2 bg-black/50 rounded text-emerald-200">
                  g_TEG(r) = g_bar(r) + g_vac(r)
                  <br />
                  V_TEG(r) = √[ g_TEG(r) · r ]
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Distinct Advantages */}
          <div className="bg-gradient-to-r from-cyan-950/30 to-purple-950/30 border border-cyan-500/20 rounded-xl p-4 space-y-2">
            <h3 className="text-white font-semibold text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Zero-Free-Parameter Scientific Integrity
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
              <li>
                <b>No Halo Fitting:</b> Unlike standard cold dark matter (NFW halos with free concentration <span className="font-mono">c</span> and halo mass <span className="font-mono">M_200</span>), TEG fits zero arbitrary halo parameters to individual galaxies.
              </li>
              <li>
                <b>Information-Theoretic Origin:</b> Vacuum acceleration emerges directly from the holographic information content of the tetrahedral lattice, governed by universal geometric scales <span className="font-mono">D_A = ln(4)</span> and <span className="font-mono">D_V = ln(8)</span>.
              </li>
              <li>
                <b>Tested on Real SPARC Data:</b> Verified across the Spitzer Photometry & Accurate Rotation Curves database spanning massive spirals, gas-rich dwarf irregulars, and low-surface-brightness systems.
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#0b1020] border-t border-slate-800 px-6 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white transition shadow-md shadow-cyan-950"
          >
            Close & Return to Workbench
          </button>
        </div>
      </div>
    </div>
  );
};
