# Quantum Wellness — Hiddén Ömkärèshwér Ärdhnärishwär Bäläncér

## Current State
- App has Dashboard, Patients, New Session, Reference Library (6 tabs: Pulse, Five Elements, Eight Trigrams, I Ching, Acupuncture, PMA Guide), and Profile pages.
- New Session records meridian readings (Qi, Pitta, Kapha, Vata, Acid-Base) for 12 meridians.
- Reference Library has basic trigram/I Ching content without the full Triorigin system.

## Requested Changes (Diff)

### Add
- **New page: Quantum Diagnostics** — Real-time organ clock showing current active Qi stage (IST 2-hour shifts), Solenoid Radar chart of 8 Qi stages, Batch pulse bit entry (Upper +ve 3-bit / Lower -ve 3-bit for 12 meridians), auto-diagnosis of Trigram + Qi Stage + 64-Hexagram sub-stage, Bio-Field Health % score, Laser Protocol recommendations, Midday-Midnight Opposite Law indicator.
- **New Reference Library tabs:** Triorigin Matrix (8-stage with Triorigin force, bit code, trigram, moon phase, extraordinary vessel), Extraordinary Vessels (Master & Coupled Points, Sujok locations), 64 Hexagrams (sub-stage matrix with hex code, diagnosis, treatment), Dr. Tung's Balancer (5 systems from uploaded images: Anatomical, Bie Jing, Interior/Exterior, Chinese Clock Opposites, Neighbor; body-part mirror table, tonify/sedate points), Hit Theory (120°/180° degrees for 12 meridians, Opposite Law/Midday-Midnight matrix, color coding), Medical Astro Vastu (direction map, toxicity check, sitting protocol).
- **New Dashboard section:** Quantum Singularity panel showing current White Hole (Du Mai) vs Black Hole (Ren Mai) status, current moon phase / Qi stage, today's recommended laser protocol.
- **8-Stage color coding** throughout: Heat=Red, Coldness=Blue, Wind=Green, Darkness=Black, Humidity=Yellow, Warmness=Orange, Dryness=Grey, Brightness=Purple.

### Modify
- **New Session page:** Add Upper 3-bit (+ve) and Lower 3-bit (-ve) columns to meridian table. On input, auto-compute Hexagram code, Qi Stage, diagnosis, tonify/sedate points, 120° partner. Show Bio-Field Health % at top.
- **Reference Library:** Expand Eight Trigrams tab to include full Triorigin mapping (bit codes, moon phases, extraordinary vessels, nadi relationship). Expand I Ching tab with complete 64-hexagram sub-stage data.
- **Dashboard:** Add real-time active Qi stage indicator and current laser recommendation.
- **Navigation sidebar:** Add "Quantum Diagnostics" entry.

### Remove
- Nothing removed.

## Implementation Plan
1. Add QuantumDiagnostics page with real-time clock, batch bit entry, radar chart (recharts), auto-diagnosis, health %, laser protocol, opposite law.
2. Add route `/quantum` and sidebar entry for Quantum Diagnostics.
3. Expand ReferenceLibrary with new tabs: Triorigin, ExtraordinaryVessels, HexagramMatrix, TungBalancer, HitTheory, AstroVastu.
4. Update NewSession to add Upper/Lower bit columns and auto-diagnosis display per meridian row.
5. Update Dashboard to show current active Qi stage + singularity panel.
6. Apply 8-stage color coding system globally.
