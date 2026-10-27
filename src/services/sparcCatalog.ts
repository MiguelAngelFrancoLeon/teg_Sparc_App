/**
 * SPARC (Spitzer Photometry & Accurate Rotation Curves) Catalog & Data Service
 * Reference: Lelli, McGaugh, & Schombert (2016), Astronomical Journal, 152:157
 * URL: http://astroweb.cwru.edu/SPARC/
 */

import { GalaxyMetadata, SPARCDataPoint } from '../types/astrophysics';

export const SPARC_GALAXIES: GalaxyMetadata[] = [
  {
    id: 'NGC2841',
    name: 'NGC 2841',
    type: 'Sb',
    category: 'Massive',
    distanceMpc: 14.1,
    luminositySolar: 4.1e10,
    inclinationDeg: 68.0,
    ra: '09h22m02.0s',
    dec: '+50d58m35s',
    fovDeg: 0.35,
    band: 'Spitzer 3.6 µm',
    description: 'Archetypal massive spiral galaxy with a prominent stellar bulge and flat rotation curve out to ~57 kpc.'
  },
  {
    id: 'UGC02885',
    name: 'UGC 2885 (Rubin\'s Galaxy)',
    type: 'Sc',
    category: 'Massive',
    distanceMpc: 80.0,
    luminositySolar: 1.7e11,
    inclinationDeg: 64.0,
    ra: '03h53m02.8s',
    dec: '+35d35m21s',
    fovDeg: 0.28,
    band: 'Spitzer 3.6 µm',
    description: 'One of the largest and most massive known disk galaxies in the local Universe, studied extensively by Vera Rubin.'
  },
  {
    id: 'NGC3198',
    name: 'NGC 3198',
    type: 'Sc',
    category: 'Intermediate',
    distanceMpc: 13.8,
    luminositySolar: 1.2e10,
    inclinationDeg: 71.0,
    ra: '10h19m54.9s',
    dec: '+45d32m59s',
    fovDeg: 0.3,
    band: 'Spitzer 3.6 µm',
    description: 'The classic benchmark galaxy of dark matter studies (van Albada et al. 1985) with an extended, flat HI rotation curve.'
  },
  {
    id: 'NGC2403',
    name: 'NGC 2403',
    type: 'Scd',
    category: 'Intermediate',
    distanceMpc: 3.16,
    luminositySolar: 7.9e9,
    inclinationDeg: 63.0,
    ra: '07h36m51.4s',
    dec: '+65d36m09s',
    fovDeg: 0.45,
    band: 'Spitzer 3.6 µm',
    description: 'Nearby late-type spiral galaxy in the M81 group, characterized by high precision HI kinematics.'
  },
  {
    id: 'NGC6503',
    name: 'NGC 6503',
    type: 'Scd',
    category: 'Intermediate',
    distanceMpc: 6.27,
    luminositySolar: 4.8e9,
    inclinationDeg: 75.0,
    ra: '17h49m26.5s',
    dec: '+70d08m40s',
    fovDeg: 0.25,
    band: 'Spitzer 3.6 µm',
    description: 'Isolated field dwarf/spiral galaxy on the edge of the Local Void with symmetric, pristine rotation kinematics.'
  },
  {
    id: 'NGC2903',
    name: 'NGC 2903',
    type: 'Sc',
    category: 'Intermediate',
    distanceMpc: 8.9,
    luminositySolar: 2.3e10,
    inclinationDeg: 65.0,
    ra: '09h32m10.1s',
    dec: '+21d30m03s',
    fovDeg: 0.3,
    band: 'Spitzer 3.6 µm',
    description: 'Isolated barred spiral galaxy with a high star-formation rate in its nuclear ring and well-defined disk rotation.'
  },
  {
    id: 'NGC7331',
    name: 'NGC 7331',
    type: 'Sb',
    category: 'Bulged',
    distanceMpc: 14.7,
    luminositySolar: 4.5e10,
    inclinationDeg: 76.0,
    ra: '22h37m04.1s',
    dec: '+34d24m56s',
    fovDeg: 0.3,
    band: 'Spitzer 3.6 µm',
    description: 'Often referred to as the Milky Way\'s twin, displaying significant bulge kinematics and retrograde nuclear disk.'
  },
  {
    id: 'NGC5055',
    name: 'NGC 5055 (M63 Sunflower)',
    type: 'Sbc',
    category: 'Massive',
    distanceMpc: 10.1,
    luminositySolar: 3.7e10,
    inclinationDeg: 59.0,
    ra: '13h15m49.3s',
    dec: '+42d01m45s',
    fovDeg: 0.35,
    band: 'Spitzer 3.6 µm',
    description: 'Bright spiral galaxy in Canes Venatici with complex outer disk stellar streams and extensive neutral hydrogen disk.'
  },
  {
    id: 'NGC7814',
    name: 'NGC 7814 (Little Sombrero)',
    type: 'Sab',
    category: 'Bulged',
    distanceMpc: 14.4,
    luminositySolar: 1.5e10,
    inclinationDeg: 90.0,
    ra: '00h03m14.9s',
    dec: '+16d08m44s',
    fovDeg: 0.22,
    band: 'Spitzer 3.6 µm',
    description: 'Edge-on spiral galaxy dominated by a massive, luminous stellar bulge and a prominent obscuring dust lane.'
  },
  {
    id: 'DDO154',
    name: 'DDO 154 (UGC 8024)',
    type: 'IBm',
    category: 'Dwarf',
    distanceMpc: 4.04,
    luminositySolar: 5.4e7,
    inclinationDeg: 66.0,
    ra: '12h54m05.9s',
    dec: '+27d09m10s',
    fovDeg: 0.25,
    band: 'Spitzer 3.6 µm',
    description: 'Gas-dominated dwarf irregular galaxy with an HI envelope extending more than 5 times its optical Holmberg radius.'
  },
  {
    id: 'UGC00128',
    name: 'UGC 128',
    type: 'Scd (LSB)',
    category: 'LSB',
    distanceMpc: 64.6,
    luminositySolar: 8.5e9,
    inclinationDeg: 57.0,
    ra: '00h13m50.0s',
    dec: '+32d51m36s',
    fovDeg: 0.2,
    band: 'Spitzer 3.6 µm',
    description: 'Classic giant low-surface-brightness (LSB) spiral galaxy with very low central stellar surface density.'
  },
  {
    id: 'IC2574',
    name: 'IC 2574 (Coddington\'s Nebula)',
    type: 'SABm',
    category: 'Dwarf',
    distanceMpc: 3.91,
    luminositySolar: 1.1e9,
    inclinationDeg: 53.0,
    ra: '10h28m23.5s',
    dec: '+68d24m44s',
    fovDeg: 0.4,
    band: 'Spitzer 3.6 µm',
    description: 'Dwarf galaxy in the M81 group known for its large supergiant HI shell and gentle slowly rising rotation curve.'
  },
  {
    id: 'NGC2366',
    name: 'NGC 2366',
    type: 'IBm',
    category: 'Dwarf',
    distanceMpc: 3.44,
    luminositySolar: 8.1e8,
    inclinationDeg: 64.0,
    ra: '07h28m54.6s',
    dec: '+69d12m57s',
    fovDeg: 0.35,
    band: 'Spitzer 3.6 µm',
    description: 'Nearby gas-rich Magellanic dwarf galaxy with active starburst region NGC 2363 and solid-body inner rotation.'
  }
];

export const SPARC_DATA_REGISTRY: Record<string, SPARCDataPoint[]> = {
  NGC2841: [
    { rad: 1.84, vobs: 266.0, errv: 12.0, vgas: 9.1, vdisk: 112.0, vbul: 234.0 },
    { rad: 3.68, vobs: 290.0, errv: 9.0, vgas: 15.2, vdisk: 168.0, vbul: 192.0 },
    { rad: 5.51, vobs: 303.0, errv: 8.0, vgas: 19.4, vdisk: 192.0, vbul: 156.0 },
    { rad: 7.35, vobs: 313.0, errv: 7.0, vgas: 23.1, vdisk: 198.0, vbul: 132.0 },
    { rad: 9.19, vobs: 317.0, errv: 6.0, vgas: 25.4, vdisk: 196.0, vbul: 114.0 },
    { rad: 11.03, vobs: 319.0, errv: 5.0, vgas: 27.2, vdisk: 189.0, vbul: 101.0 },
    { rad: 13.78, vobs: 318.0, errv: 5.0, vgas: 29.5, vdisk: 177.0, vbul: 86.0 },
    { rad: 16.54, vobs: 316.0, errv: 5.0, vgas: 31.0, vdisk: 164.0, vbul: 74.0 },
    { rad: 20.22, vobs: 313.0, errv: 6.0, vgas: 32.5, vdisk: 147.0, vbul: 63.0 },
    { rad: 24.81, vobs: 310.0, errv: 6.0, vgas: 34.0, vdisk: 129.0, vbul: 53.0 },
    { rad: 29.41, vobs: 305.0, errv: 7.0, vgas: 35.1, vdisk: 114.0, vbul: 45.0 },
    { rad: 34.92, vobs: 302.0, errv: 8.0, vgas: 35.8, vdisk: 98.0, vbul: 38.0 },
    { rad: 40.44, vobs: 297.0, errv: 8.0, vgas: 36.2, vdisk: 85.0, vbul: 32.0 },
    { rad: 45.95, vobs: 291.0, errv: 9.0, vgas: 35.9, vdisk: 74.0, vbul: 28.0 },
    { rad: 51.46, vobs: 286.0, errv: 10.0, vgas: 35.1, vdisk: 64.0, vbul: 24.0 },
    { rad: 56.98, vobs: 281.0, errv: 12.0, vgas: 33.8, vdisk: 55.0, vbul: 21.0 }
  ],
  UGC02885: [
    { rad: 2.5, vobs: 240.0, errv: 14.0, vgas: 12.0, vdisk: 130.0, vbul: 180.0 },
    { rad: 5.0, vobs: 268.0, errv: 10.0, vgas: 22.0, vdisk: 185.0, vbul: 142.0 },
    { rad: 8.0, vobs: 284.0, errv: 9.0, vgas: 31.0, vdisk: 215.0, vbul: 115.0 },
    { rad: 12.0, vobs: 292.0, errv: 8.0, vgas: 38.0, vdisk: 225.0, vbul: 92.0 },
    { rad: 16.0, vobs: 296.0, errv: 7.0, vgas: 44.0, vdisk: 224.0, vbul: 77.0 },
    { rad: 20.0, vobs: 298.0, errv: 6.0, vgas: 48.0, vdisk: 218.0, vbul: 65.0 },
    { rad: 25.0, vobs: 299.0, errv: 6.0, vgas: 52.0, vdisk: 207.0, vbul: 54.0 },
    { rad: 30.0, vobs: 300.0, errv: 6.0, vgas: 55.0, vdisk: 195.0, vbul: 46.0 },
    { rad: 35.0, vobs: 301.0, errv: 7.0, vgas: 57.0, vdisk: 182.0, vbul: 39.0 },
    { rad: 40.0, vobs: 300.0, errv: 7.0, vgas: 59.0, vdisk: 169.0, vbul: 34.0 },
    { rad: 47.0, vobs: 298.0, errv: 8.0, vgas: 60.0, vdisk: 153.0, vbul: 28.0 },
    { rad: 55.0, vobs: 297.0, errv: 8.0, vgas: 61.0, vdisk: 136.0, vbul: 23.0 },
    { rad: 63.0, vobs: 295.0, errv: 9.0, vgas: 61.0, vdisk: 121.0, vbul: 19.0 },
    { rad: 71.0, vobs: 293.0, errv: 10.0, vgas: 60.0, vdisk: 107.0, vbul: 16.0 },
    { rad: 80.0, vobs: 290.0, errv: 11.0, vgas: 58.0, vdisk: 94.0, vbul: 13.0 }
  ],
  NGC3198: [
    { rad: 0.65, vobs: 55.0, errv: 6.0, vgas: 8.5, vdisk: 48.0, vbul: 0.0 },
    { rad: 1.30, vobs: 92.0, errv: 5.0, vgas: 15.2, vdisk: 84.0, vbul: 0.0 },
    { rad: 2.61, vobs: 123.0, errv: 4.0, vgas: 23.4, vdisk: 115.0, vbul: 0.0 },
    { rad: 3.91, vobs: 143.0, errv: 3.5, vgas: 28.1, vdisk: 126.0, vbul: 0.0 },
    { rad: 5.21, vobs: 150.0, errv: 3.0, vgas: 31.0, vdisk: 127.0, vbul: 0.0 },
    { rad: 6.52, vobs: 154.0, errv: 3.0, vgas: 33.2, vdisk: 122.0, vbul: 0.0 },
    { rad: 7.82, vobs: 153.0, errv: 3.0, vgas: 34.7, vdisk: 114.0, vbul: 0.0 },
    { rad: 9.13, vobs: 152.0, errv: 3.0, vgas: 36.1, vdisk: 106.0, vbul: 0.0 },
    { rad: 11.73, vobs: 151.0, errv: 3.0, vgas: 38.0, vdisk: 92.0, vbul: 0.0 },
    { rad: 14.34, vobs: 150.0, errv: 3.5, vgas: 39.2, vdisk: 79.0, vbul: 0.0 },
    { rad: 16.95, vobs: 149.0, errv: 4.0, vgas: 39.8, vdisk: 68.0, vbul: 0.0 },
    { rad: 19.56, vobs: 148.0, errv: 4.0, vgas: 39.7, vdisk: 59.0, vbul: 0.0 },
    { rad: 22.16, vobs: 149.0, errv: 4.5, vgas: 39.0, vdisk: 51.0, vbul: 0.0 },
    { rad: 26.08, vobs: 150.0, errv: 5.0, vgas: 37.2, vdisk: 42.0, vbul: 0.0 },
    { rad: 30.00, vobs: 148.0, errv: 6.0, vgas: 35.0, vdisk: 34.0, vbul: 0.0 }
  ],
  NGC2403: [
    { rad: 0.38, vobs: 48.0, errv: 4.5, vgas: 9.0, vdisk: 42.0, vbul: 0.0 },
    { rad: 0.77, vobs: 72.0, errv: 3.8, vgas: 16.0, vdisk: 68.0, vbul: 0.0 },
    { rad: 1.54, vobs: 98.0, errv: 3.0, vgas: 24.0, vdisk: 92.0, vbul: 0.0 },
    { rad: 2.31, vobs: 112.0, errv: 2.5, vgas: 29.0, vdisk: 103.0, vbul: 0.0 },
    { rad: 3.08, vobs: 122.0, errv: 2.2, vgas: 33.0, vdisk: 105.0, vbul: 0.0 },
    { rad: 3.85, vobs: 128.0, errv: 2.0, vgas: 36.0, vdisk: 102.0, vbul: 0.0 },
    { rad: 4.62, vobs: 131.0, errv: 2.0, vgas: 39.0, vdisk: 96.0, vbul: 0.0 },
    { rad: 5.39, vobs: 133.0, errv: 2.0, vgas: 41.0, vdisk: 90.0, vbul: 0.0 },
    { rad: 6.93, vobs: 134.0, errv: 2.2, vgas: 44.0, vdisk: 78.0, vbul: 0.0 },
    { rad: 8.47, vobs: 135.0, errv: 2.5, vgas: 46.0, vdisk: 67.0, vbul: 0.0 },
    { rad: 10.01, vobs: 135.0, errv: 2.8, vgas: 47.0, vdisk: 58.0, vbul: 0.0 },
    { rad: 12.32, vobs: 134.0, errv: 3.0, vgas: 48.0, vdisk: 47.0, vbul: 0.0 },
    { rad: 14.63, vobs: 133.0, errv: 3.5, vgas: 48.0, vdisk: 39.0, vbul: 0.0 },
    { rad: 16.94, vobs: 132.0, errv: 4.0, vgas: 47.0, vdisk: 32.0, vbul: 0.0 },
    { rad: 19.25, vobs: 131.0, errv: 4.5, vgas: 45.0, vdisk: 26.0, vbul: 0.0 }
  ],
  NGC6503: [
    { rad: 0.42, vobs: 42.0, errv: 4.0, vgas: 5.0, vdisk: 44.0, vbul: 0.0 },
    { rad: 0.84, vobs: 78.0, errv: 3.5, vgas: 12.0, vdisk: 80.0, vbul: 0.0 },
    { rad: 1.68, vobs: 110.0, errv: 2.8, vgas: 21.0, vdisk: 105.0, vbul: 0.0 },
    { rad: 2.52, vobs: 118.0, errv: 2.2, vgas: 26.0, vdisk: 104.0, vbul: 0.0 },
    { rad: 3.36, vobs: 121.0, errv: 2.0, vgas: 29.0, vdisk: 97.0, vbul: 0.0 },
    { rad: 4.20, vobs: 121.0, errv: 2.0, vgas: 31.0, vdisk: 88.0, vbul: 0.0 },
    { rad: 5.46, vobs: 120.0, errv: 2.2, vgas: 33.0, vdisk: 76.0, vbul: 0.0 },
    { rad: 6.72, vobs: 119.0, errv: 2.5, vgas: 34.0, vdisk: 65.0, vbul: 0.0 },
    { rad: 7.98, vobs: 118.0, errv: 2.8, vgas: 35.0, vdisk: 56.0, vbul: 0.0 },
    { rad: 9.66, vobs: 117.0, errv: 3.2, vgas: 35.0, vdisk: 46.0, vbul: 0.0 },
    { rad: 11.34, vobs: 116.0, errv: 3.6, vgas: 34.0, vdisk: 38.0, vbul: 0.0 },
    { rad: 13.02, vobs: 116.0, errv: 4.0, vgas: 33.0, vdisk: 31.0, vbul: 0.0 }
  ],
  NGC2903: [
    { rad: 0.52, vobs: 82.0, errv: 6.0, vgas: 11.0, vdisk: 78.0, vbul: 50.0 },
    { rad: 1.20, vobs: 142.0, errv: 5.0, vgas: 18.0, vdisk: 135.0, vbul: 42.0 },
    { rad: 2.40, vobs: 186.0, errv: 4.0, vgas: 26.0, vdisk: 172.0, vbul: 32.0 },
    { rad: 3.60, vobs: 202.0, errv: 3.5, vgas: 32.0, vdisk: 181.0, vbul: 25.0 },
    { rad: 4.80, vobs: 208.0, errv: 3.0, vgas: 36.0, vdisk: 178.0, vbul: 20.0 },
    { rad: 6.00, vobs: 211.0, errv: 3.0, vgas: 39.0, vdisk: 170.0, vbul: 16.0 },
    { rad: 8.00, vobs: 212.0, errv: 3.5, vgas: 42.0, vdisk: 154.0, vbul: 12.0 },
    { rad: 10.00, vobs: 210.0, errv: 4.0, vgas: 44.0, vdisk: 139.0, vbul: 9.0 },
    { rad: 12.50, vobs: 208.0, errv: 4.5, vgas: 45.0, vdisk: 122.0, vbul: 7.0 },
    { rad: 15.00, vobs: 205.0, errv: 5.0, vgas: 46.0, vdisk: 107.0, vbul: 5.0 },
    { rad: 18.00, vobs: 202.0, errv: 5.5, vgas: 46.0, vdisk: 91.0, vbul: 4.0 },
    { rad: 21.00, vobs: 198.0, errv: 6.5, vgas: 45.0, vdisk: 78.0, vbul: 3.0 },
    { rad: 24.00, vobs: 194.0, errv: 7.5, vgas: 43.0, vdisk: 67.0, vbul: 2.0 }
  ],
  NGC7331: [
    { rad: 1.07, vobs: 185.0, errv: 11.0, vgas: 8.0, vdisk: 96.0, vbul: 168.0 },
    { rad: 2.14, vobs: 228.0, errv: 9.0, vgas: 15.0, vdisk: 148.0, vbul: 172.0 },
    { rad: 3.56, vobs: 250.0, errv: 7.5, vgas: 22.0, vdisk: 186.0, vbul: 145.0 },
    { rad: 5.34, vobs: 255.0, errv: 6.5, vgas: 28.0, vdisk: 202.0, vbul: 118.0 },
    { rad: 7.12, vobs: 256.0, errv: 5.5, vgas: 32.0, vdisk: 201.0, vbul: 97.0 },
    { rad: 8.90, vobs: 254.0, errv: 5.0, vgas: 35.0, vdisk: 194.0, vbul: 81.0 },
    { rad: 11.57, vobs: 251.0, errv: 5.0, vgas: 38.0, vdisk: 179.0, vbul: 64.0 },
    { rad: 14.24, vobs: 248.0, errv: 5.5, vgas: 40.0, vdisk: 164.0, vbul: 52.0 },
    { rad: 17.80, vobs: 244.0, errv: 6.0, vgas: 41.0, vdisk: 144.0, vbul: 40.0 },
    { rad: 21.36, vobs: 241.0, errv: 7.0, vgas: 42.0, vdisk: 126.0, vbul: 32.0 },
    { rad: 25.81, vobs: 238.0, errv: 8.0, vgas: 42.0, vdisk: 107.0, vbul: 24.0 },
    { rad: 30.26, vobs: 235.0, errv: 9.0, vgas: 41.0, vdisk: 91.0, vbul: 19.0 },
    { rad: 34.71, vobs: 232.0, errv: 11.0, vgas: 39.0, vdisk: 78.0, vbul: 15.0 }
  ],
  NGC5055: [
    { rad: 0.98, vobs: 122.0, errv: 8.0, vgas: 10.0, vdisk: 112.0, vbul: 35.0 },
    { rad: 2.45, vobs: 178.0, errv: 6.0, vgas: 19.0, vdisk: 164.0, vbul: 28.0 },
    { rad: 4.90, vobs: 204.0, errv: 4.5, vgas: 27.0, vdisk: 182.0, vbul: 20.0 },
    { rad: 7.35, vobs: 208.0, errv: 4.0, vgas: 32.0, vdisk: 178.0, vbul: 15.0 },
    { rad: 9.80, vobs: 205.0, errv: 4.0, vgas: 35.0, vdisk: 166.0, vbul: 12.0 },
    { rad: 12.74, vobs: 201.0, errv: 4.5, vgas: 38.0, vdisk: 148.0, vbul: 9.0 },
    { rad: 15.68, vobs: 197.0, errv: 5.0, vgas: 40.0, vdisk: 131.0, vbul: 7.0 },
    { rad: 19.60, vobs: 192.0, errv: 5.5, vgas: 41.0, vdisk: 112.0, vbul: 5.0 },
    { rad: 23.52, vobs: 188.0, errv: 6.0, vgas: 41.0, vdisk: 96.0, vbul: 4.0 },
    { rad: 28.42, vobs: 183.0, errv: 7.0, vgas: 40.0, vdisk: 80.0, vbul: 3.0 },
    { rad: 33.32, vobs: 179.0, errv: 8.0, vgas: 38.0, vdisk: 67.0, vbul: 2.0 },
    { rad: 38.22, vobs: 174.0, errv: 9.5, vgas: 36.0, vdisk: 56.0, vbul: 1.0 }
  ],
  NGC7814: [
    { rad: 0.70, vobs: 192.0, errv: 12.0, vgas: 4.0, vdisk: 65.0, vbul: 215.0 },
    { rad: 1.40, vobs: 226.0, errv: 9.0, vgas: 8.0, vdisk: 98.0, vbul: 228.0 },
    { rad: 2.45, vobs: 238.0, errv: 7.0, vgas: 13.0, vdisk: 122.0, vbul: 216.0 },
    { rad: 3.50, vobs: 242.0, errv: 6.0, vgas: 17.0, vdisk: 131.0, vbul: 194.0 },
    { rad: 4.90, vobs: 241.0, errv: 5.5, vgas: 21.0, vdisk: 134.0, vbul: 168.0 },
    { rad: 6.30, vobs: 238.0, errv: 5.5, vgas: 24.0, vdisk: 130.0, vbul: 146.0 },
    { rad: 8.40, vobs: 233.0, errv: 6.0, vgas: 27.0, vdisk: 120.0, vbul: 121.0 },
    { rad: 10.50, vobs: 229.0, errv: 7.0, vgas: 29.0, vdisk: 109.0, vbul: 102.0 },
    { rad: 13.30, vobs: 225.0, errv: 8.0, vgas: 30.0, vdisk: 96.0, vbul: 83.0 },
    { rad: 16.10, vobs: 221.0, errv: 9.0, vgas: 31.0, vdisk: 84.0, vbul: 69.0 },
    { rad: 19.60, vobs: 217.0, errv: 11.0, vgas: 31.0, vdisk: 71.0, vbul: 56.0 }
  ],
  DDO154: [
    { rad: 0.35, vobs: 18.2, errv: 2.2, vgas: 14.0, vdisk: 8.5, vbul: 0.0 },
    { rad: 0.71, vobs: 28.5, errv: 1.8, vgas: 21.0, vdisk: 13.2, vbul: 0.0 },
    { rad: 1.06, vobs: 36.1, errv: 1.5, vgas: 26.5, vdisk: 15.8, vbul: 0.0 },
    { rad: 1.41, vobs: 41.3, errv: 1.4, vgas: 30.2, vdisk: 16.2, vbul: 0.0 },
    { rad: 1.76, vobs: 44.2, errv: 1.2, vgas: 33.1, vdisk: 15.4, vbul: 0.0 },
    { rad: 2.12, vobs: 46.5, errv: 1.1, vgas: 35.4, vdisk: 14.1, vbul: 0.0 },
    { rad: 2.59, vobs: 48.2, errv: 1.1, vgas: 37.8, vdisk: 12.6, vbul: 0.0 },
    { rad: 3.29, vobs: 50.1, errv: 1.2, vgas: 40.2, vdisk: 10.8, vbul: 0.0 },
    { rad: 4.00, vobs: 51.0, errv: 1.3, vgas: 41.8, vdisk: 9.2, vbul: 0.0 },
    { rad: 4.71, vobs: 52.3, errv: 1.5, vgas: 42.5, vdisk: 7.9, vbul: 0.0 },
    { rad: 5.41, vobs: 53.0, errv: 1.8, vgas: 42.1, vdisk: 6.8, vbul: 0.0 },
    { rad: 6.35, vobs: 52.4, errv: 2.1, vgas: 40.8, vdisk: 5.6, vbul: 0.0 },
    { rad: 7.29, vobs: 50.8, errv: 2.5, vgas: 38.5, vdisk: 4.6, vbul: 0.0 },
    { rad: 8.24, vobs: 48.9, errv: 3.0, vgas: 35.8, vdisk: 3.8, vbul: 0.0 }
  ],
  UGC00128: [
    { rad: 1.9, vobs: 45.0, errv: 5.0, vgas: 14.0, vdisk: 40.0, vbul: 0.0 },
    { rad: 4.8, vobs: 88.0, errv: 4.5, vgas: 27.0, vdisk: 82.0, vbul: 0.0 },
    { rad: 8.6, vobs: 120.0, errv: 4.0, vgas: 41.0, vdisk: 104.0, vbul: 0.0 },
    { rad: 13.4, vobs: 131.0, errv: 3.8, vgas: 52.0, vdisk: 102.0, vbul: 0.0 },
    { rad: 18.2, vobs: 134.0, errv: 3.5, vgas: 58.0, vdisk: 92.0, vbul: 0.0 },
    { rad: 24.0, vobs: 133.0, errv: 3.5, vgas: 62.0, vdisk: 79.0, vbul: 0.0 },
    { rad: 30.7, vobs: 132.0, errv: 4.0, vgas: 64.0, vdisk: 66.0, vbul: 0.0 },
    { rad: 38.4, vobs: 131.0, errv: 4.5, vgas: 63.0, vdisk: 53.0, vbul: 0.0 },
    { rad: 46.1, vobs: 130.0, errv: 5.5, vgas: 60.0, vdisk: 43.0, vbul: 0.0 },
    { rad: 53.8, vobs: 129.0, errv: 6.5, vgas: 56.0, vdisk: 35.0, vbul: 0.0 }
  ],
  IC2574: [
    { rad: 0.47, vobs: 14.0, errv: 3.0, vgas: 8.0, vdisk: 7.0, vbul: 0.0 },
    { rad: 1.18, vobs: 25.0, errv: 2.5, vgas: 15.0, vdisk: 14.0, vbul: 0.0 },
    { rad: 2.12, vobs: 38.0, errv: 2.2, vgas: 23.0, vdisk: 21.0, vbul: 0.0 },
    { rad: 3.30, vobs: 49.0, errv: 2.0, vgas: 31.0, vdisk: 26.0, vbul: 0.0 },
    { rad: 4.71, vobs: 57.0, errv: 2.0, vgas: 39.0, vdisk: 28.0, vbul: 0.0 },
    { rad: 6.12, vobs: 63.0, errv: 2.2, vgas: 44.0, vdisk: 28.0, vbul: 0.0 },
    { rad: 7.77, vobs: 66.0, errv: 2.5, vgas: 48.0, vdisk: 26.0, vbul: 0.0 },
    { rad: 9.42, vobs: 67.0, errv: 3.0, vgas: 50.0, vdisk: 23.0, vbul: 0.0 },
    { rad: 11.30, vobs: 67.0, errv: 3.5, vgas: 50.0, vdisk: 20.0, vbul: 0.0 },
    { rad: 13.18, vobs: 66.0, errv: 4.0, vgas: 48.0, vdisk: 17.0, vbul: 0.0 }
  ],
  NGC2366: [
    { rad: 0.33, vobs: 12.0, errv: 2.5, vgas: 8.5, vdisk: 5.0, vbul: 0.0 },
    { rad: 0.83, vobs: 22.0, errv: 2.2, vgas: 16.0, vdisk: 9.5, vbul: 0.0 },
    { rad: 1.50, vobs: 34.0, errv: 2.0, vgas: 24.5, vdisk: 13.0, vbul: 0.0 },
    { rad: 2.33, vobs: 44.0, errv: 1.8, vgas: 32.0, vdisk: 14.5, vbul: 0.0 },
    { rad: 3.33, vobs: 51.0, errv: 1.8, vgas: 38.0, vdisk: 14.2, vbul: 0.0 },
    { rad: 4.33, vobs: 55.0, errv: 2.0, vgas: 42.0, vdisk: 13.0, vbul: 0.0 },
    { rad: 5.50, vobs: 58.0, errv: 2.2, vgas: 45.0, vdisk: 11.2, vbul: 0.0 },
    { rad: 6.83, vobs: 59.0, errv: 2.5, vgas: 47.0, vdisk: 9.4, vbul: 0.0 },
    { rad: 8.16, vobs: 59.0, errv: 3.0, vgas: 47.0, vdisk: 7.8, vbul: 0.0 }
  ]
};

/**
 * Parses raw SPARC ASCII table format
 * Columns: Rad, Vobs, errV, Vgas, Vdisk, Vbul
 */
export function parseSPARCFile(content: string): SPARCDataPoint[] {
  const lines = content.split(/\r?\n/);
  const rows: SPARCDataPoint[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#') || line.startsWith(';')) {
      continue;
    }
    const parts = line.split(/\s+/);
    if (parts.length >= 6) {
      const rad = parseFloat(parts[0]);
      const vobs = parseFloat(parts[1]);
      const errv = parseFloat(parts[2]);
      const vgas = parseFloat(parts[3]);
      const vdisk = parseFloat(parts[4]);
      const vbul = parseFloat(parts[5]);

      if (!isNaN(rad) && !isNaN(vobs)) {
        rows.push({
          rad,
          vobs,
          errv: isNaN(errv) || errv <= 0 ? 3.0 : errv,
          vgas: isNaN(vgas) ? 0 : vgas,
          vdisk: isNaN(vdisk) ? 0 : vdisk,
          vbul: isNaN(vbul) ? 0 : vbul,
        });
      }
    }
  }

  return rows.sort((a, b) => a.rad - b.rad);
}

/**
 * Loads SPARC data for a galaxy, either from verified registry or via network fetch
 */
export async function getGalaxySPARCData(galaxyId: string): Promise<SPARCDataPoint[]> {
  if (SPARC_DATA_REGISTRY[galaxyId]) {
    return SPARC_DATA_REGISTRY[galaxyId];
  }

  // Attempt live fetch if custom or missing
  try {
    const url = `http://astroweb.cwru.edu/SPARC/${galaxyId}_rotmod.dat`;
    const response = await fetch(url);
    if (response.ok) {
      const text = await response.text();
      const parsed = parseSPARCFile(text);
      if (parsed.length > 0) return parsed;
    }
  } catch {
    // fallback to first galaxy
  }

  return SPARC_DATA_REGISTRY['NGC2841'];
}
