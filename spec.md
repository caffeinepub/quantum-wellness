# Quantum Wellness

## Current State
New Session page has a meridian readings table with columns: Qi, Pitta, Kapha, Vata, and a manual Acid-Base input field. There is no auto-diagnosis of Acidic/Base/Neutral status.

## Requested Changes (Diff)

### Add
- Auto-diagnosis column in meridian table that calculates and displays Acidic / Base / Neutral status in real time as user types numerical values
- Diagnosis badge per meridian row (color-coded: red=Acidic, green=Base/Alkaline, gray=Neutral)
- Summary diagnosis panel below the table showing overall count of Acidic vs Base meridians
- Tooltip/legend explaining the Acid-Base scale

### Modify
- Acid-Base input column: keep as numeric input (range -100 to +100), rename label to make clear negative=Acidic, positive=Base
- Auto-populate diagnosis label beside/below each row based on acidBase value entered

### Remove
- Nothing removed

## Implementation Plan
1. Add a computed `getDiagnosis(acidBase: string)` helper: value < 0 → 'Acidic', value > 0 → 'Base', value = 0 → 'Neutral'
2. Add a read-only Diagnosis column to the meridian table that renders a color-coded badge computed live from the acidBase input
3. Add a summary card below the table showing total Acidic / Neutral / Base meridian counts
4. Update column header to clarify scale: Acid-Base (- Acidic / + Base)
