# Quantum Wellness

## Current State
- Full app with Dashboard, Patients, New Session, Quantum Diagnostics, Reference Library (6+ tabs), Profile
- Reference Library has FiveElements tab (shows color text) and a Trigrams/EightTrigrams tab
- No password protection

## Requested Changes (Diff)

### Add
1. **Password protection** — Simple login gate before the app loads. Hardcoded password (e.g. `QuantumWellness2026`). Store auth state in localStorage/sessionStorage. Show a styled login screen with password field.
2. **5 Elements color swatches** — In the FiveElements table, the "Color" column should show a colored swatch/badge alongside the color name (Wood=Green, Fire=Red, Earth=Yellow, Metal=White/Silver, Water=Black/Blue)
3. **Brain_Recovery_Trigrams table** — In the Trigrams section (EightTrigrams function area), add a new titled table "Brain Recovery Trigrams" with 11 columns: Moon Phase, Trigram (Ba Gua), Binary Trigram, Brain Region Activation, Neurological Recovery Process, Microcontroller Function, Nadi Activation (Ida/Pingala), Healing Strategy for Coma Patients, Acupuncture & Energy Healing, Ayurvedic & Tibetan Medicine, Quantum Healing Methods — with 8 rows of data provided.
4. **Extended Trigram Details table** — In the Trigrams section, add another table titled "Trigram Quantum Bio-Photonic Properties" with columns: Trigram Symbol, Trigram Name, Organ, Extraordinary Meridian, Yin-Yang Structure, Health Scale (0-100%), Solar Spectrum Bandwidth, HEX Code (50% Normal), HEX Code (0-50% Degeneration), HEX Code (50-100% Inflammation), RGB Code (50% Normal), RGB Code (0-50% Degeneration), RGB Code (50-100% Inflammation), Trigram Qubit State, Disease Progression, Moon Phase, RGB Color — with 8 rows. Each HEX code should show a color swatch.

### Modify
- FiveElements table: color text column → colored swatch + text
- EightTrigrams section: append the two new tables below the existing Ba Gua table
- App.tsx: wrap entire app in a PasswordGate component

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/frontend/src/components/PasswordGate.tsx` — simple password lock screen with field, submit button, error message. Password: `QuantumWellness2026`. Use sessionStorage to persist.
2. Wrap `<RouterProvider>` in App.tsx with `<PasswordGate>`.
3. Update FiveElements in ReferenceLibrary.tsx to show color swatches in the Color column.
4. Add BrainRecoveryTrigramsTable component inside ReferenceLibrary.tsx with all 8 rows.
5. Add TrigramQuantumTable component inside ReferenceLibrary.tsx with all 8 rows, showing HEX color swatches.
6. Add both new tables inside the EightTrigrams function render output (after the existing Ba Gua table).
