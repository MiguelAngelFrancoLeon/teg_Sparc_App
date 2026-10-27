/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  SPARC_GALAXIES,
  SPARC_DATA_REGISTRY,
  parseSPARCFile,
} from './services/sparcCatalog';
import { calculateTEGKinematics, TEGOptions } from './services/tegEngine';
import { TopHeaderKPI } from './components/TopHeaderKPI';
import { Sidebar } from './components/Sidebar';
import { AladinViewer } from './components/AladinViewer';
import { StatisticalAnalytics } from './components/StatisticalAnalytics';
import { RotationCurvePlot } from './components/RotationCurvePlot';
import { TheoryModal } from './components/TheoryModal';
import { RawDataTableModal } from './components/RawDataTableModal';
import { GalaxyMetadata, SPARCDataPoint } from './types/astrophysics';

export default function App() {
  const [galaxiesList, setGalaxiesList] = useState<GalaxyMetadata[]>(SPARC_GALAXIES);
  const [selectedGalaxyId, setSelectedGalaxyId] = useState<string>('NGC2841');

  // Dynamic user data store (for custom uploaded galaxies)
  const [customDataMap, setCustomDataMap] = useState<Record<string, SPARCDataPoint[]>>({});

  // TEG & Kinematics Control Options
  const [options, setOptions] = useState<TEGOptions>({
    upsDisk: 0.5,
    upsBulge: 0.7,
    enableTEG: true,
    useSigmaEffModulation: true,
  });

  // Modals
  const [isTheoryOpen, setIsTheoryOpen] = useState(false);
  const [isTableOpen, setIsTableOpen] = useState(false);

  // Active Galaxy
  const currentGalaxy = useMemo(() => {
    return (
      galaxiesList.find((g) => g.id === selectedGalaxyId) ||
      galaxiesList[0] ||
      SPARC_GALAXIES[0]
    );
  }, [galaxiesList, selectedGalaxyId]);

  // Active Points
  const rawPoints = useMemo(() => {
    if (customDataMap[selectedGalaxyId]) {
      return customDataMap[selectedGalaxyId];
    }
    return SPARC_DATA_REGISTRY[selectedGalaxyId] || SPARC_DATA_REGISTRY['NGC2841'];
  }, [customDataMap, selectedGalaxyId]);

  // Kinematics Results
  const results = useMemo(() => {
    return calculateTEGKinematics(currentGalaxy, rawPoints, options);
  }, [currentGalaxy, rawPoints, options]);

  // Handle custom SPARC file upload
  const handleCustomFileUpload = (fileContent: string, fileName: string) => {
    try {
      const parsed = parseSPARCFile(fileContent);
      if (parsed.length === 0) {
        alert('Could not parse valid SPARC table columns (Rad, Vobs, errV, Vgas, Vdisk, Vbul).');
        return;
      }
      const customId = fileName.replace(/\.[^/.]+$/, '').toUpperCase();
      const newMeta: GalaxyMetadata = {
        id: customId,
        name: customId,
        type: 'User Upload',
        category: 'Intermediate',
        distanceMpc: 15.0,
        luminositySolar: 2.0e10,
        inclinationDeg: 60.0,
        ra: '12h00m00s',
        dec: '+00d00m00s',
        fovDeg: 0.25,
        band: 'User Data',
        description: `Custom SPARC kinematics loaded from ${fileName}`,
      };

      setGalaxiesList((prev) => [newMeta, ...prev]);
      setCustomDataMap((prev) => ({ ...prev, [customId]: parsed }));
      setSelectedGalaxyId(customId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Header KPI */}
      <TopHeaderKPI
        galaxy={currentGalaxy}
        results={results}
        onOpenTheory={() => setIsTheoryOpen(true)}
        onOpenTable={() => setIsTableOpen(true)}
      />

      {/* Main Workbench Body: Sidebar + Panels */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          galaxies={galaxiesList}
          selectedGalaxyId={selectedGalaxyId}
          onSelectGalaxy={(id) => setSelectedGalaxyId(id)}
          options={options}
          onChangeOptions={setOptions}
          onCustomFileUpload={handleCustomFileUpload}
          onOpenTheory={() => setIsTheoryOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
          {/* Main Panel (Top): Split-Screen Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Left: Interactive Aladin Lite FITS/Optical Galaxy Viewer */}
            <AladinViewer galaxy={currentGalaxy} />

            {/* Right: Real-time Statistical Analytics (χ², RMSE) */}
            <StatisticalAnalytics results={results} />
          </div>

          {/* Main Panel (Bottom): Publication-Quality Plotly/SVG Chart */}
          <RotationCurvePlot
            results={results}
            upsDisk={options.upsDisk}
            upsBulge={options.upsBulge}
          />
        </main>
      </div>

      {/* Modals */}
      <TheoryModal
        isOpen={isTheoryOpen}
        onClose={() => setIsTheoryOpen(false)}
      />

      <RawDataTableModal
        isOpen={isTableOpen}
        onClose={() => setIsTableOpen(false)}
        results={results}
      />
    </div>
  );
}
