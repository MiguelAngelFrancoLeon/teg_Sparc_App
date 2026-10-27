/**
 * Mathematical Engine for Miguel Ángel Franco León's Tetrahedral Emergent Gravity (TEG)
 * Reference: "A Geometric Information Framework for Galactic Rotation Curves"
 */

import {
  SPARCDataPoint,
  ComputedDataPoint,
  KinematicsResult,
  GalaxyMetadata,
  TEGConstants
} from '../types/astrophysics';

export const TEG_CONSTANTS: TEGConstants = {
  z: 4,                        // Tetrahedral network coordination
  nBits: 3.0,                  // log2(2 * z) = log2(8) = 3
  sigmaUV: 0.3263,             // UV mismatch roughness
  sigmaEff: 0.3263 / 3.0,      // 0.108766... ~ 0.1088
  dA: Math.log(4),             // ln(4) = 1.38629...
  dV: Math.log(8),             // ln(8) = 2.07944...
};

// Gravitational constant G in galactic units: kpc * (km/s)^2 / M_sun
// 1 G = 4.30091e-6 kpc * (km/s)^2 / M_sun
export const G_GALACTIC = 4.30091e-6;

export interface TEGOptions {
  upsDisk: number;             // Default 0.5
  upsBulge: number;            // Default 0.7
  enableTEG: boolean;          // Toggle vacuum entropy term
  useSigmaEffModulation: boolean; // Scale by (1 + sigma_eff)
}

/**
 * Computes full rotation curve kinematics under Franco León's TEG framework
 */
export function calculateTEGKinematics(
  galaxy: GalaxyMetadata,
  rawPoints: SPARCDataPoint[],
  options: TEGOptions
): KinematicsResult {
  const { upsDisk, upsBulge, enableTEG, useSigmaEffModulation } = options;

  if (!rawPoints || rawPoints.length === 0) {
    throw new Error('No rotation curve data provided');
  }

  // 1. First pass: compute baryonic components & identify rMax and vBar(rMax)
  const initialPoints = rawPoints.map((pt) => {
    // Total Baryonic Velocity squared: sign-preserving
    // V_bar^2(r) = |V_gas|*V_gas + Υ_disk*|V_disk|*V_disk + Υ_bulge*|V_bulge|*V_bulge
    const gasContribution = Math.abs(pt.vgas) * pt.vgas;
    const diskContribution = upsDisk * Math.abs(pt.vdisk) * pt.vdisk;
    const bulgeContribution = upsBulge * Math.abs(pt.vbul) * pt.vbul;

    const vbarSqRaw = gasContribution + diskContribution + bulgeContribution;
    const vbarSq = Math.max(0, vbarSqRaw);
    const vbar = Math.sqrt(vbarSq);

    const vdiskEff = Math.sqrt(Math.max(0, upsDisk * Math.abs(pt.vdisk) * pt.vdisk));
    const vbulEff = Math.sqrt(Math.max(0, upsBulge * Math.abs(pt.vbul) * pt.vbul));
    const vgasEff = Math.sqrt(Math.max(0, Math.abs(pt.vgas) * pt.vgas));

    return {
      ...pt,
      vbarSq,
      vbar,
      vdiskEff,
      vbulEff,
      vgasEff,
    };
  });

  const rMax = Math.max(...initialPoints.map((p) => p.rad));
  const lastPoint = initialPoints[initialPoints.length - 1];
  const vBarAtRmax = lastPoint ? lastPoint.vbar : 0;
  const vBarSqAtRmax = lastPoint ? lastPoint.vbarSq : 0;

  // Maximum baryonic velocity
  const vBarMax = Math.max(...initialPoints.map((p) => p.vbar));

  // Baryonic mass estimation: M_bar_tot = V_bar^2(r_max) * r_max / G
  const totalBaryonicMassSolar = (vBarSqAtRmax * rMax) / G_GALACTIC;

  // 2. Second pass: compute acceleration and emergent TEG velocity
  const computedPoints: ComputedDataPoint[] = initialPoints.map((pt) => {
    const safeRad = Math.max(pt.rad, 1e-4);

    // 2. Acceleration Profile: g_bar(r) = V_bar^2 / r
    const gBar = pt.vbarSq / safeRad;

    // 3. TEG Modification:
    // M_vac(r) = ln(2) * M_bar_tot * (r / r_max)^3
    // g_vac(r) = G * M_vac(r) / r^2 = ln(2) * (G * M_bar_tot / r_max) * (r / r_max^2)
    // Since G * M_bar_tot / r_max = V_bar^2(r_max):
    // g_vac(r) = ln(2) * (V_bar^2(r_max) / r_max) * (r / r_max)
    let gVac = 0;
    if (enableTEG && rMax > 0) {
      const gBarRmax = vBarSqAtRmax / Math.max(rMax, 1e-4);
      gVac = Math.log(2) * gBarRmax * (pt.rad / Math.max(rMax, 1e-4));

      if (useSigmaEffModulation) {
        gVac *= (1 + TEG_CONSTANTS.sigmaEff);
      }
    }

    const gTeg = gBar + gVac;

    // 4. Final Velocity: V_TEG(r) = sqrt(g_TEG * r)
    const vTegSq = Math.max(0, gTeg * safeRad);
    const vTeg = Math.sqrt(vTegSq);

    const residual = pt.vobs - vTeg;
    const residualNewton = pt.vobs - pt.vbar;

    return {
      ...pt,
      gBar,
      gVac,
      gTeg,
      vTeg,
      residual,
      residualNewton,
    };
  });

  // 3. Statistical Analytics
  const N = computedPoints.length;
  // Degrees of freedom: N - k (k=2 for Υ_disk, Υ_bulge tuning; if fixed, k=0)
  const k = 2;
  const dof = Math.max(1, N - k);

  let sumChiSqTEG = 0;
  let sumSquaredResidualsTEG = 0;
  let sumChiSqNewton = 0;
  let sumSquaredResidualsNewton = 0;

  for (const pt of computedPoints) {
    const err = Math.max(pt.errv, 1.0); // protect against divide-by-zero
    const chiTEG = (pt.vobs - pt.vTeg) / err;
    sumChiSqTEG += chiTEG * chiTEG;
    sumSquaredResidualsTEG += Math.pow(pt.vobs - pt.vTeg, 2);

    const chiNewt = (pt.vobs - pt.vbar) / err;
    sumChiSqNewton += chiNewt * chiNewt;
    sumSquaredResidualsNewton += Math.pow(pt.vobs - pt.vbar, 2);
  }

  const chiSq = sumChiSqTEG;
  const reducedChiSq = chiSq / dof;
  const rmse = Math.sqrt(sumSquaredResidualsTEG / N);

  const chiSqNewton = sumChiSqNewton;
  const reducedChiSqNewton = chiSqNewton / dof;
  const rmseNewton = Math.sqrt(sumSquaredResidualsNewton / N);

  // Variance reduction
  const varianceExplainedPercent =
    chiSqNewton > 0
      ? Math.max(0, ((chiSqNewton - chiSq) / chiSqNewton) * 100)
      : 0;

  return {
    galaxy,
    points: computedPoints,
    rMax,
    vBarMax,
    totalBaryonicMassSolar,
    chiSq,
    reducedChiSq,
    rmse,
    chiSqNewton,
    reducedChiSqNewton,
    rmseNewton,
    varianceExplainedPercent,
    dof,
  };
}
