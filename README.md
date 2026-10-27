# TEG Workbench: Tetrahedral Emergent Gravity vs SPARC Galactic Kinematics

An interactive, data-driven astrophysics workbench designed to test and verify the **Tetrahedral Emergent Gravity (TEG)** model—a core component of the Unified Fractal-Stochastic Model (MFSU)—against real-world observational data from the **SPARC (Spitzer Photometry and Accurate Rotation Curves)** catalog (CWRU Catalog).

The application provides a visual and statistical sandbox to analyze galactic rotation curves, testing if the entropic acceleration of the vacuum can resolve the outer flat rotation curve discrepancy without relying on exotic dark matter parameters.

---

## 🌌 Scientific Core

**Tetrahedral Emergent Gravity (TEG)** treats spacetime not as a continuous classical background, but as an emergent phenomenon arising from a discrete quantum-entangled lattice governed by fundamental tetrahedral geometry at the Planck scale. 

When applied to galactic scales, TEG introduces a **Vacuum Entropy Term**. This term generates an entropic acceleration that modifies the gravitational potential in low-density regimes. This workbench evaluates whether this emergent acceleration matches the observed kinematics of spiral, intermediate, dwarf, and Low Surface Brightness (LSB) galaxies.

---

## 🛠️ Features

- **Interactive Target Selection:** Instantly load and swap between multi-class galaxies from the SPARC dataset (Massive, Intermediate, Dwarf, LSB, Bulged).
- **Galactic Rotation Curve Decomposition:** Live dynamic plotting comparing observed velocities (\(V_{\text{obs}}\)) against TEG Emergent Gravity, Pure Newtonian (\(V_{\text{bar}}\)), Gas (\(HI+He\)), and Disk/Bulge contributions.
- **Dynamic Mass-to-Light (\(M/L\)) Ratio Controls:** Real-time adjustable sliders for Disk \(M/L\) (\(\Upsilon_{\text{disk}}\)) and Bulge \(M/L\) (\(\Upsilon_{\text{bulge}}\)) to fit galactic stellar populations.
- **Automated Statistical Verification:** Real-time analytics displaying Reduced \(\chi^2\), RMSE (Velocity in km/s), Mean Absolute Error (MAE), and percent-improvement comparisons over pure Newtonian mechanics.
- **Astronomical Ingestion & Deep Mapping:** Embedded integration with **Aladin Lite (CDS Strasbourg)** to stream optical and infrared imaging layers (DSS2, Spitzer \(3.6\,\mu\text{m}\), etc.) cross-referenced with SIMBAD, Gaia DR3, and 2MASS catalogs.

---

## 💻 Tech Stack

The workbench is built using a modern, lightweight, and highly performant decoupled architecture:

- **Frontend:** Vite + TypeScript (structured for modular widget rendering and high-frequency reactive state management).
- **Backend Analytics:** Python (handling scientific computations, matrix operations for curve decomposition, and \(\chi^2\) minimizations).
- **Visual Mapping:** CDS Aladin Lite API integration for interactive deep-sky tilesets.

---

## 📁 Repository Structure

```text
├── src/                 # TypeScript frontend source components and UI layout
├── app.py               # Python backend managing theoretical calculations & data streaming
├── index.html           # Main application entry point
├── metadata.json        # Structured SPARC catalog metadata and galactic profiles
├── package.json         # Node.js dependencies and script bindings
├── tsconfig.json        # TypeScript compiler configurations
└── vite.config.ts       # Vite build system definitions
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+ recommended)
- **Python** (3.9+ recommended with `pip`)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   cd teg_Sparc_App
   ```

2. **Set up the backend:**
   Create a virtual environment and install the required scientific computing libraries (e.g., `numpy`, `scipy`, `pandas`, `flask/fastapi` depending on your environment).
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Set up the frontend:**
   Install the node packages and spin up the hot-reloading development server.
   ```bash
   npm install
   npm run dev
   ```

4. **Access the Workbench:**
   Open your browser and navigate to the local server address provided by Vite (typically `http://localhost:5173`).

---

## 📈 Open Audit & Contribution

This workbench is fundamentally designed as an **open-source scientific tool for community auditing**. Astrofisicistas, theoretical physicists, and software engineers are highly encouraged to fork the repository, review the mathematical implementation of the `Vacuum Entropy Term` in `app.py`, and test the model limits against anomalous galaxies.

If you encounter bugs or have feature requests regarding dataset expansion, feel free to open an **Issue** or submit a **Pull Request**.

---

## 📜 Citation & Credits

- **Theoretical Framework:** Miguel Ángel Franco León (Unified Fractal-Stochastic Model / TEG).
- **Observational Data:** SPARC Catalog (Spitzer Photometry & Accurate Rotation Curves) — Case Western Reserve University.
- **Sky Imagery Mapping:** CDS Aladin Lite portal, Strasbourg Astronomical Data Center.
