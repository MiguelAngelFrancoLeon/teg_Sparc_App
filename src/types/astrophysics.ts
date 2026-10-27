/**
 * Types & Interfaces for Tetrahedral Emergent Gravity (TEG) and SPARC Database
 */

export interface SPARCDataPoint {
  rad: number;         // Galactocentric radius r in kpc
  vobs: number;        // Observed rotation velocity in km/s
  errv: number;        // Observational uncertainty on Vobs in km/s
  vgas: number;        // Gas contribution (HI + He) in km/s
  vdisk: number;       // Stellar disk contribution (Υ_disk = 1.0) in km/s
  vbul: number;        // Bulge contribution (Υ_bulge = 1.0) in km/s
}

export interface ComputedDataPoint extends SPARCDataPoint {
  vbarSq: number;      // V_bar^2 in (km/s)^2
  vbar: number;        // Total Newtonian baryonic velocity in km/s
  vdiskEff: number;    // Scaled disk velocity sqrt(Υ_disk * V_disk^2)
  vbulEff: number;     // Scaled bulge velocity sqrt(Υ_bulge * V_bul^2)
  vgasEff: number;     // Scaled gas velocity
  gBar: number;        // Newtonian baryonic acceleration
  gVac: number;        // TEG vacuum entropic acceleration
  gTeg: number;        // Total emergent acceleration
  vTeg: number;        // Final emergent velocity sqrt(g_TEG * r) in km/s
  residual: number;    // V_obs - V_TEG in km/s
  residualNewton: number; // V_obs - V_bar in km/s
}

export interface GalaxyMetadata {
  id: string;
  name: string;
  type: string;           // Morphological classification (e.g. Sb, Sc, Scd, IBm)
  category: 'Massive' | 'Intermediate' | 'Dwarf' | 'LSB' | 'Bulged';
  distanceMpc: number;    // Distance in Megaparsecs
  luminositySolar: number;// Spitzer 3.6µm luminosity in Solar Units
  inclinationDeg: number; // Disk inclination in degrees
  ra: string;             // Right Ascension (J2000)
  dec: string;            // Declination (J2000)
  fovDeg: number;         // Field of View in degrees for Aladin Lite
  band: string;           // Photometry band (e.g. Spitzer 3.6µm)
  description: string;
}

export interface TEGConstants {
  z: number;              // Tetrahedral network coordination (z=4)
  nBits: number;          // log2(2*z) = 3
  sigmaUV: number;        // UV Mismatch Roughness = 0.3263
  sigmaEff: number;       // Effective coupling scale = sigmaUV / nBits = 0.1088
  dA: number;             // Universal Area scale = ln(4)
  dV: number;             // Universal Volume scale = ln(8)
}

export interface KinematicsResult {
  galaxy: GalaxyMetadata;
  points: ComputedDataPoint[];
  rMax: number;
  vBarMax: number;
  totalBaryonicMassSolar: number;
  chiSq: number;
  reducedChiSq: number;
  rmse: number;
  chiSqNewton: number;
  reducedChiSqNewton: number;
  rmseNewton: number;
  varianceExplainedPercent: number;
  dof: number;
}
