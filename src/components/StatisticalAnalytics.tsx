import React from 'react';
import { KinematicsResult } from '../types/astrophysics';
import {
  Activity,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  BarChart2,
  Sparkles,
  Info,
} from 'lucide-react';

interface StatisticalAnalyticsProps {
  results: KinematicsResult;
}

export const StatisticalAnalytics: React.FC<StatisticalAnalyticsProps> = ({
  results,
}) => {
  const {
    reducedChiSq,
    chiSq,
    rmse,
    reducedChiSqNewton,
    rmseNewton,
    varianceExplainedPercent,
    dof,
    points,
  } = results;

  // Concordance categorization
  let statusBadge = {
    label: 'EXCELLENT CONCORDANCE',
    bg: 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30',
    icon: CheckCircle,
    desc: 'Strong kinematic alignment with zero free fitting parameters.',
  };

  if (reducedChiSq > 2.5 && reducedChiSq <= 6.0) {
    statusBadge = {
      label: 'ACCEPTABLE CONCORDANCE',
      bg: 'bg-amber-950/40 text-amber-300 border-amber-500/30',
      icon: TrendingUp,
      desc: 'Kinematics broadly match flat rotation with minor disk warping.',
    };
  } else if (reducedChiSq > 6.0) {
    statusBadge = {
      label: 'DEVIATION DETECTED',
      bg: 'bg-rose-950/40 text-rose-300 border-rose-500/30',
      icon: AlertTriangle,
      desc: 'Substantial discrepancy; non-circular gas motions or beam smearing likely.',
    };
  }

  const StatusIcon = statusBadge.icon;

  // Mean Absolute Error
  const mae =
    points.reduce((acc, p) => acc + Math.abs(p.residual), 0) / points.length;

  return (
    <div className="bg-[#080d1c] border border-cyan-500/20 rounded-xl p-4 flex flex-col justify-between h-[380px] shadow-lg">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-100 tracking-tight">
              Statistical Analytics & Model Verification
            </h3>
          </div>
          <span
            className={`text-[10px] font-mono px-2.5 py-1 rounded-full border flex items-center gap-1.5 font-bold ${statusBadge.bg}`}
          >
            <StatusIcon className="w-3 h-3" />
            {statusBadge.label}
          </span>
        </div>

        {/* Primary KPIs */}
        <div className="grid grid-cols-2 gap-3 mt-3.5">
          {/* Reduced Chi-Square */}
          <div className="bg-gradient-to-br from-[#0c142b] to-[#090e1e] border border-cyan-500/30 rounded-xl p-3 shadow-inner">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Reduced χ² (TEG)</span>
              <span className="text-[9px] text-cyan-400/80">ν = {dof} dof</span>
            </div>
            <div className="text-2xl font-black font-mono text-cyan-300 mt-1">
              {reducedChiSq.toFixed(2)}
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1 font-mono">
              <span>Total χ²: {chiSq.toFixed(1)}</span>
              <span className="text-slate-500 line-through">
                Newt: {reducedChiSqNewton.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Root Mean Square Error */}
          <div className="bg-gradient-to-br from-[#0c142b] to-[#090e1e] border border-purple-500/30 rounded-xl p-3 shadow-inner">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>RMSE (Velocity)</span>
              <span className="text-[9px] text-purple-400/80">km/s</span>
            </div>
            <div className="text-2xl font-black font-mono text-purple-300 mt-1">
              {rmse.toFixed(2)}{' '}
              <span className="text-xs font-normal text-slate-400">km/s</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1 font-mono">
              <span>MAE: {mae.toFixed(1)} km/s</span>
              <span className="text-slate-500 line-through">
                Newt: {rmseNewton.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Variance Explained Card */}
        <div className="bg-[#0c1326]/70 border border-slate-800 rounded-lg p-2.5 mt-3 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Kinematic Improvement vs Pure Newtonian:
            </span>
            <span className="font-mono font-bold text-emerald-400">
              +{varianceExplainedPercent.toFixed(1)}% χ² Reduction
            </span>
          </div>

          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex">
            <div
              className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(5, varianceExplainedPercent))}%` }}
            />
          </div>

          <p className="text-[10px] text-slate-400 leading-relaxed">
            Without adding dark matter halo parameters, TEG's vacuum entropic acceleration resolves the outer flat rotation curve discrepancy.
          </p>
        </div>
      </div>

      {/* Footer Statistical Provenance */}
      <div className="border-t border-slate-800/80 pt-2 text-[10px] text-slate-400 flex items-center justify-between font-mono">
        <span className="flex items-center gap-1">
          <BarChart2 className="w-3 h-3 text-cyan-400" />
          χ²_red = Σ [(V_obs - V_TEG)/errV]² / (N - 2)
        </span>
        <span className="text-slate-500">{points.length} observed bins</span>
      </div>
    </div>
  );
};
