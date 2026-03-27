import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useEffect, useState } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  BIT_TO_STAGE,
  EXTRAORDINARY_VESSELS,
  HEX_MATRIX,
  MERIDIANS_DATA,
  OPPOSITE_LAW,
  QI_STAGES,
  STAGE_GROUPS,
  STAGE_WEIGHTS,
  getActiveQiStage,
  getStageColor,
} from "../data/quantumData";

function StageBadge({ stage }: { stage: string }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${getStageColor(stage)}`}
    >
      {stage}
    </span>
  );
}

function OrganClockHeader() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const istTime = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(now);

  const istHour = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
  ).getHours();

  const stageName = getActiveQiStage(istHour);
  const stage = QI_STAGES.find((s) => s.name === stageName);
  const colorClass = getStageColor(stageName);

  return (
    <div>
      <div className={`px-6 py-3 ${colorClass} flex items-center gap-3`}>
        <span className="text-2xl font-mono font-bold">{istTime} IST</span>
        <span className="text-lg font-heading font-semibold">
          Active Stage: {stageName}
        </span>
        <span className="ml-auto text-base opacity-80">
          {stage?.trigram} · {stage?.moonPhase}
        </span>
      </div>
      <div className="px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <p className="text-muted-foreground text-xs mb-1">Active Vessel</p>
          <p className="font-semibold text-golden">{stage?.vessel}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs mb-1">Master Point</p>
          <p className="font-semibold">
            {EXTRAORDINARY_VESSELS.find((v) => v.phase === stageName)?.master ??
              "—"}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs mb-1">Laser Protocol</p>
          <p className="font-medium text-xs">{stage?.laserProtocol}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs mb-1">Singularity</p>
          <p className="font-semibold text-golden/80">{stage?.singularity}</p>
        </div>
      </div>
    </div>
  );
}

function QuantumSingularityPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Du Mai White Hole */}
      <div>
        <div className="text-center mb-3">
          <div className="text-4xl mb-1">☰</div>
          <h3 className="font-heading font-bold text-orange-300 text-lg">
            Du Mai
          </h3>
          <p className="text-orange-400 text-sm font-semibold">WHITE HOLE</p>
        </div>
        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Quantum Bit</span>
            <span className="font-mono font-bold text-orange-300">111</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Trigram</span>
            <span className="text-orange-200">Qian (☰)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Nādī</span>
            <span className="text-orange-200">Sūryā (Solar)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Cosmic Peak</span>
            <span className="text-orange-200">Summer Solstice / Full Moon</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Function</span>
            <span className="text-orange-300 font-semibold">Emission</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Radiation</span>
            <span className="text-orange-200">Bio-Photonic Solar</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Master Point</span>
            <span className="text-orange-200">SI-3 (Houxi)</span>
          </div>
          <div className="mt-2 pt-2 border-t border-orange-800/50 text-orange-200/70 leading-relaxed">
            Sea of Yang Meridians. Radiates Bio-Photonic Solar energy from spine
            base to crown (Baihui).
          </div>
        </div>
      </div>

      {/* Center Wormhole */}
      <div>
        <div className="text-5xl mb-3">🔄</div>
        <h3 className="font-heading font-bold text-purple-300 text-base mb-2">
          Microcosmic Orbit
        </h3>
        <p className="text-purple-200/70 text-xs leading-relaxed mb-3">
          The Wormhole Effect within the body. White Hole (Du) pours energy out;
          Black Hole (Ren) pulls energy in.
        </p>
        <div className="w-full rounded-lg bg-purple-900/30 p-3 text-xs space-y-1">
          <p className="text-purple-200">
            8 Extraordinary Vessels = Event Horizons
          </p>
          <p className="text-purple-300/70">
            Stabilize Solenoid flow so the 12 meridians don&apos;t burn out
          </p>
        </div>
        <div className="mt-3 flex gap-2">
          <span className="text-xs px-2 py-1 rounded bg-orange-900/40 text-orange-300">
            Bit 1 → Solar
          </span>
          <span className="text-xs px-2 py-1 rounded bg-blue-900/40 text-blue-300">
            Bit 0 → Lunar
          </span>
        </div>
      </div>

      {/* Ren Mai Black Hole */}
      <div>
        <div className="text-center mb-3">
          <div className="text-4xl mb-1">☷</div>
          <h3 className="font-heading font-bold text-blue-300 text-lg">
            Ren Mai
          </h3>
          <p className="text-blue-400 text-sm font-semibold">BLACK HOLE</p>
        </div>
        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Quantum Bit</span>
            <span className="font-mono font-bold text-blue-300">000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Trigram</span>
            <span className="text-blue-200">Kun (☷)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Nādī</span>
            <span className="text-blue-200">Chāndrā (Lunar)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Cosmic Peak</span>
            <span className="text-blue-200">Winter Solstice / New Moon</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Function</span>
            <span className="text-blue-300 font-semibold">Absorption</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Radiation</span>
            <span className="text-blue-200">Bio-Resonance Lunar</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Master Point</span>
            <span className="text-blue-200">LU-7 (Lieque)</span>
          </div>
          <div className="mt-2 pt-2 border-t border-blue-800/50 text-blue-200/70 leading-relaxed">
            Sea of Yin Meridians. Gravitational well pulling energy inward to
            nourish Dantian / Womb.
          </div>
        </div>
      </div>
    </div>
  );
}

type BitState = { upper: string; lower: string };

// Lookup map: clean 3-bit binary → BrainRecoveryRow
interface BrainRecoveryRow {
  moonPhase: string;
  trigram: string;
  direction: string;
  element: string;
  qiOrgan: string;
  extraordinaryMeridian: string;
  yinYang: string;
  chakra: string;
  quality: string;
  binary: string;
  brainRegion: string;
  neurological: string;
  microcontroller: string;
  nadi: string;
  healingStrategy: string;
  acupuncture: string;
  ayurveda: string;
  quantumHealing: string;
  healthScale: string;
  solarSpectrum: string;
  hexNormal: string;
  hexDegen: string;
  hexInflam: string;
  rgbNormal: string;
  rgbDegen: string;
  rgbInflam: string;
  qubitState: string;
  diseaseProgression: string;
  moonPhaseEnd: string;
  rgbColor: string;
  rowBg: string;
}

const BRAIN_RECOVERY_ROWS: BrainRecoveryRow[] = [
  {
    moonPhase: "5️⃣ New Moon 🌑 — 8️⃣",
    trigram: "☷ Kūn (Earth) (E)",
    direction: "2️⃣ SouthWest ← 180° Opposite Pairs → 5️⃣ SouthWest",
    element: "Earth",
    qiOrgan: "Ren Pure Yin 2️⃣ — Ren / Séx Circülätiön",
    extraordinaryMeridian: "Ren Mai",
    yinYang: "Yin Yin Yin",
    chakra: "Root",
    quality: "Receptive, Nurturing, Mother",
    binary: "-000-",
    brainRegion: "Brainstem (Autonomic Recovery)",
    neurological: "Regulation of heart rate, respiration, digestion",
    microcontroller: "System Reset",
    nadi: "Chandra Nadi + Chandra Nadi + Chandra Nadi",
    healingStrategy: "Stimulation of basic life functions",
    acupuncture: "GV20 (Baihui), GV26 (Shuigou)",
    ayurveda: "Brahmi, Ashwagandha, Tulsi",
    quantumHealing: "Theta Wave Induction, Photonic Therapy",
    healthScale: "50 (Normal)",
    solarSpectrum: "Low Frequency",
    hexNormal: "#666666",
    hexDegen: "#CCCCCC",
    hexInflam: "#666666",
    rgbNormal: "102,102,102",
    rgbDegen: "204,204,204",
    rgbInflam: "102,102,102",
    qubitState: "|0⟩",
    diseaseProgression: "Darkness",
    moonPhaseEnd: "New Moon",
    rgbColor: "0,0,0",
    rowBg: "border-l-4 border-l-slate-600 bg-slate-950/40",
  },
  {
    moonPhase: "3️⃣ Waxing Crescent 🌒 — 6️⃣",
    trigram: "☵ Kǎn (Water) — Abyss (A)",
    direction: "1️⃣ North (Bottom ↘) ← 180° Opposite Pairs → 8️⃣ South (Top 🔝)",
    element: "Water",
    qiOrgan:
      "Täi Yäng 3️⃣+6️⃣ — Small Intestine ~ Urinary Bladder — 1️⃣ Greater Yang",
    extraordinaryMeridian: "Chong Mai (Urinary Bladder — Kidneys)",
    yinYang: "Yang Yin Yang",
    chakra: "Sacral",
    quality: "Dangerous, Flowing, Middle Son",
    binary: "-010-",
    brainRegion: "Cerebellum (Motor Coordination)",
    neurological: "Restoring balance, muscle tone, movement reflexes",
    microcontroller: "Memory & I/O Handling",
    nadi: "Chandra Nadi + Surya Nadi + Chandra Nadi",
    healingStrategy: "Activation of motor response & muscle stimulation",
    acupuncture: "ST36 (Zusanli), LI4 (Hegu)",
    ayurveda: "Guggulu, Dashmool, Mahanarayan Oil",
    quantumHealing: "Low-Frequency Pulsed Electromagnetic Therapy",
    healthScale: "50-100 (Inflammation)",
    solarSpectrum: "Medium",
    hexNormal: "#999999",
    hexDegen: "#C0C0C0",
    hexInflam: "#333333",
    rgbNormal: "153,153,153",
    rgbDegen: "192,192,192",
    rgbInflam: "51,51,51",
    qubitState: "|1⟩",
    diseaseProgression: "Brightness",
    moonPhaseEnd: "Waxing Crescent",
    rgbColor: "51,51,51",
    rowBg: "border-l-4 border-l-blue-700 bg-blue-950/30",
  },
  {
    moonPhase: "2️⃣ First Quarter 🌓 — 4️⃣",
    trigram: "☳ Zhèn (Thunder) (T)",
    direction: "3️⃣ East ← 180° Opposite Pairs → 6️⃣ West",
    element: "Wood",
    qiOrgan: "Jue Yin 4️⃣+5️⃣ — Pericardium ~ Liver — 6️⃣ Terminal Yin",
    extraordinaryMeridian: "Yang Wei Mai (Pericardium — Triple Burner)",
    yinYang: "Yang Yin Yin",
    chakra: "Solar Plexus",
    quality: "Arousing, Movement, Eldest Son",
    binary: "-001+",
    brainRegion: "Limbic System (Emotional & Memory Recovery)",
    neurological: "Emotional reactivation, PTSD healing",
    microcontroller: "Interrupt Processing",
    nadi: "Chandra Nadi + Chandra Nadi + Surya Nadi",
    healingStrategy: "Emotional stability & PTSD reduction",
    acupuncture: "HT7 (Shenmen), PC6 (Neiguan)",
    ayurveda: "Shankhpushpi, Jatamansi, Calamus",
    quantumHealing: "Binaural Beats, Heart-Brain Coherence",
    healthScale: "0-50 (Degeneration)",
    solarSpectrum: "Wide",
    hexNormal: "#333333",
    hexDegen: "#111111",
    hexInflam: "#444444",
    rgbNormal: "51,51,51",
    rgbDegen: "17,17,17",
    rgbInflam: "68,68,68",
    qubitState: "|+⟩",
    diseaseProgression: "Coldness (Water)",
    moonPhaseEnd: "First Quarter",
    rgbColor: "102,102,102",
    rowBg: "border-l-4 border-l-green-700 bg-green-950/30",
  },
  {
    moonPhase: "4️⃣ Waxing Gibbous 🌔 — 7️⃣",
    trigram: "☶ Gèn (Mountain) (M)",
    direction: "7️⃣ NorthEast ← 180° Opposite Pairs → 2️⃣ SouthWest",
    element: "Earth",
    qiOrgan: "Täi Yīn 2️⃣+7️⃣ — Lungs ~ Spleen — 4️⃣ Greater Yin",
    extraordinaryMeridian: "Yin Qiao Mai (Stomach — Spleen)",
    yinYang: "Yin Yin Yang",
    chakra: "Throat",
    quality: "Stillness, Keeping Still, Youngest Son",
    binary: "100",
    brainRegion: "Left Hemisphere (Logical & Language Recovery)",
    neurological: "Restoration of speech, logical thinking",
    microcontroller: "Stability & Sleep Mode",
    nadi: "Surya Nadi + Chandra Nadi + Chandra Nadi",
    healingStrategy: "Speech therapy & cognitive rehabilitation",
    acupuncture: "LI11 (Quchi), GV15 (Yamen)",
    ayurveda: "Guduchi, Brahmi, Mandukparni",
    quantumHealing: "Neurofeedback Therapy",
    healthScale: "50 (Normal)",
    solarSpectrum: "Narrow",
    hexNormal: "#CCCCCC",
    hexDegen: "#333333",
    hexInflam: "#222222",
    rgbNormal: "204,204,204",
    rgbDegen: "51,51,51",
    rgbInflam: "34,34,34",
    qubitState: "|-⟩",
    diseaseProgression: "Heat (Fire)",
    moonPhaseEnd: "Waxing Gibbous",
    rgbColor: "153,153,153",
    rowBg: "border-l-4 border-l-yellow-600 bg-yellow-950/30",
  },
  {
    moonPhase: "1️⃣ Full Moon 🌕 — 1️⃣",
    trigram: "☰ Qián (Heaven) Sky (S)",
    direction: "5️⃣ NorthWest ← 180° Opposite Pairs → 4️⃣ SouthEast",
    element: "Metal",
    qiOrgan: "Du Pure Yäng 1️⃣ — Du / Brain Governor",
    extraordinaryMeridian: "Du Mai",
    yinYang: "Yang Yang Yang",
    chakra: "Crown",
    quality: "Creative, Strong, Father",
    binary: "111",
    brainRegion: "Prefrontal Cortex (Decision Making & Awareness)",
    neurological: "Higher cognitive function recovery",
    microcontroller: "Full Power Execution",
    nadi: "Surya Nadi + Surya Nadi + Surya Nadi",
    healingStrategy: "Mental clarity & full consciousness restoration",
    acupuncture: "GV24 (Shenting), Yintang (Third Eye)",
    ayurveda: "Swarna Bhasma, Shilajit, Rasayana",
    quantumHealing: "Gamma Wave Stimulation, Quantum Field Activation",
    healthScale: "0-50 (Degeneration)",
    solarSpectrum: "High Frequency",
    hexNormal: "#CCCCCC",
    hexDegen: "#FFFFFF",
    hexInflam: "#999999",
    rgbNormal: "204,204,204",
    rgbDegen: "255,255,255",
    rgbInflam: "153,153,153",
    qubitState: "|i⟩",
    diseaseProgression: "Wind (Wood)",
    moonPhaseEnd: "Full Moon",
    rgbColor: "192,192,192",
    rowBg: "border-l-4 border-l-amber-400 bg-amber-950/30",
  },
  {
    moonPhase: "8️⃣ Waning Gibbous 🌔 — 2️⃣",
    trigram: "☱ Duì (Lake) (L)",
    direction: "6️⃣ West ← 180° Opposite Pairs → 3️⃣ East",
    element: "Metal",
    qiOrgan: "Yäng Míng 2️⃣+7️⃣ — Large Intestine ~ Stomach — 2️⃣ Bright Yang",
    extraordinaryMeridian: "Yin Wei Mai (Lungs — Large Intestine)",
    yinYang: "Yin Yang Yang",
    chakra: "Sacral",
    quality: "Joy, Pleasure, Youngest Daughter",
    binary: "-011++",
    brainRegion: "Hippocampus (Memory Encoding & Retrieval)",
    neurological: "Memory regeneration, recall improvement",
    microcontroller: "Data Flow & Transfer",
    nadi: "Chandra Nadi + Surya Nadi + Surya Nadi",
    healingStrategy: "Enhancing past memory recall",
    acupuncture: "SP6 (Sanyinjiao), UB23 (Shenshu)",
    ayurveda: "Amalaki, Haritaki, Triphala",
    quantumHealing: "Scalar Wave Therapy, Magnetic Resonance Stimulation",
    healthScale: "50-100 (Inflammation)",
    solarSpectrum: "Variable",
    hexNormal: "#999999",
    hexDegen: "#000000",
    hexInflam: "#666666",
    rgbNormal: "153,153,153",
    rgbDegen: "0,0,0",
    rgbInflam: "102,102,102",
    qubitState: "|-i⟩",
    diseaseProgression: "Dryness (Metal)",
    moonPhaseEnd: "Waning Gibbous",
    rgbColor: "204,204,204",
    rowBg: "border-l-4 border-l-cyan-600 bg-cyan-950/30",
  },
  {
    moonPhase: "6️⃣ Last Quarter 🌗 — 5️⃣",
    trigram: "☴ Xùn (Wind 🍃) (W)",
    direction: "4️⃣ SouthEast ← 180° Opposite Pairs → 5️⃣ NorthWest",
    element: "Wood",
    qiOrgan: "Shào Yäng 4️⃣+5️⃣ — Triple Bürnér ~ Gallbladder — 3️⃣ Lesser Yang",
    extraordinaryMeridian: "Yang Qiao Mai (Gallbladder — Liver)",
    yinYang: "Yang Yang Yin",
    chakra: "Heart",
    quality: "Gentle, Penetrating, Eldest Daughter",
    binary: "110",
    brainRegion: "Thalamus (Sensory Processing & Attention)",
    neurological: "Integration of sensory perception",
    microcontroller: "Low-Power Mode",
    nadi: "Surya Nadi + Surya Nadi + Chandra Nadi",
    healingStrategy: "Retraining of sensory awareness",
    acupuncture: "ST8 (Touwei), SJ5 (Waiguan)",
    ayurveda: "Licorice, Pippali, Vacha",
    quantumHealing: "Light & Sound Therapy",
    healthScale: "50-100 (Inflammation)",
    solarSpectrum: "Broad",
    hexNormal: "#666666",
    hexDegen: "#666666",
    hexInflam: "#000000",
    rgbNormal: "102,102,102",
    rgbDegen: "102,102,102",
    rgbInflam: "0,0,0",
    qubitState: "Entangled",
    diseaseProgression: "Warmness (Air)",
    moonPhaseEnd: "Last Quarter",
    rgbColor: "230,230,230",
    rowBg: "border-l-4 border-l-teal-600 bg-teal-950/30",
  },
  {
    moonPhase: "7️⃣ Waning Crescent 🌖 — 3️⃣",
    trigram: "☲ Lí (Fire 🔥) (F)",
    direction: "8️⃣ South (Top 🔝) ← 180° Opposite Pairs → 1️⃣ North (Bottom ↘)",
    element: "Fire",
    qiOrgan: "Shào Yīn 3️⃣+6️⃣ — Heart ~ Kidney — 5️⃣ Lesser Yin",
    extraordinaryMeridian: "Dai Mai (Heart — Small Intestine)",
    yinYang: "Yin Yang Yin",
    chakra: "Third Eye",
    quality: "Clarity, Beauty, Middle Daughter",
    binary: "101",
    brainRegion: "Right Hemisphere (Creativity & Visualization)",
    neurological: "Enhancing creativity & visual memory",
    microcontroller: "Execution Optimization",
    nadi: "Surya Nadi + Chandra Nadi + Surya Nadi",
    healingStrategy: "Awakening subconscious & dream states",
    acupuncture: "GB13 (Benshen), SI19 (Tinggong)",
    ayurveda: "Rose Oil, Saffron, Nutmeg",
    quantumHealing: "Dream Reprogramming, Lucid Dream Training",
    healthScale: "0-50 (Degeneration)",
    solarSpectrum: "Very High",
    hexNormal: "#333333",
    hexDegen: "#999999",
    hexInflam: "#111111",
    rgbNormal: "51,51,51",
    rgbDegen: "153,153,153",
    rgbInflam: "17,17,17",
    qubitState: "Superposition",
    diseaseProgression: "Humidity (Earth)",
    moonPhaseEnd: "Waning Crescent",
    rgbColor: "255,255,255",
    rowBg: "border-l-4 border-l-red-700 bg-red-950/30",
  },
];

const BR_BINARY_LOOKUP: Record<string, BrainRecoveryRow> = {};

function buildBrLookup() {
  const keyMap: Record<string, string> = {
    "5️⃣ New Moon 🌑 — 8️⃣": "000",
    "3️⃣ Waxing Crescent 🌒 — 6️⃣": "010",
    "2️⃣ First Quarter 🌓 — 4️⃣": "001",
    "4️⃣ Waxing Gibbous 🌔 — 7️⃣": "100",
    "1️⃣ Full Moon 🌕 — 1️⃣": "111",
    "8️⃣ Waning Gibbous 🌔 — 2️⃣": "011",
    "6️⃣ Last Quarter 🌗 — 5️⃣": "110",
    "7️⃣ Waning Crescent 🌖 — 3️⃣": "101",
  };
  for (const row of BRAIN_RECOVERY_ROWS) {
    const key = keyMap[row.moonPhase];
    if (key) BR_BINARY_LOOKUP[key] = row;
  }
}

buildBrLookup();

function BatchPulseEntry() {
  const [bits, setBits] = useState<Record<string, BitState>>(
    Object.fromEntries(
      MERIDIANS_DATA.map((m) => [m.code, { upper: "", lower: "" }]),
    ),
  );

  function handleBit(code: string, field: "upper" | "lower", value: string) {
    if (!/^[01]{0,3}$/.test(value)) return;
    setBits((prev) => ({ ...prev, [code]: { ...prev[code], [field]: value } }));
  }

  function getHex(code: string) {
    const { upper, lower } = bits[code];
    if (upper.length === 3 && lower.length === 3) return upper + lower;
    return "";
  }

  function getStage(code: string) {
    const { upper } = bits[code];
    if (upper.length === 3) return BIT_TO_STAGE[upper] ?? "";
    return "";
  }

  function getDiagnosis(code: string) {
    const hex = getHex(code);
    if (!hex) return "";
    return (
      HEX_MATRIX.find((h) => h.hex === hex)?.diagnosis ?? "Analyze via 120° Law"
    );
  }

  function getMeridian(code: string) {
    return MERIDIANS_DATA.find((m) => m.code === code);
  }

  // Bio-Field Health %
  const enteredCodes = MERIDIANS_DATA.filter(
    (m) => bits[m.code].upper.length === 3,
  );
  const healthPct =
    enteredCodes.length > 0
      ? Math.round(
          (enteredCodes.reduce(
            (sum, m) => sum + (STAGE_WEIGHTS[getStage(m.code)] ?? 5),
            0,
          ) /
            (enteredCodes.length * 10)) *
            100,
        )
      : null;

  const healthColor =
    healthPct === null
      ? "text-muted-foreground"
      : healthPct < 40
        ? "text-red-500"
        : healthPct < 70
          ? "text-yellow-400"
          : "text-purple-400";

  const brHeaders = [
    "BR: Moon Phase / Hexagram",
    "BR: Trigram (Ba Gua)",
    "BR: Direction (180° Opp.)",
    "BR: Element",
    "BR: 6/8 Stage Organ",
    "BR: Extraordinary Meridian",
    "BR: Yin-Yang Structure",
    "BR: Vedic Chakra",
    "BR: Quality",
    "BR: Binary Trigram",
    "BR: Brain Region",
    "BR: Neurological Recovery",
    "BR: Microcontroller Fn",
    "BR: Nadi (Ida/Pingala)",
    "BR: Healing Strategy (Coma)",
    "BR: Acupuncture",
    "BR: Ayurvedic & Tibetan Med",
    "BR: Quantum Healing",
    "BR: Health Scale",
    "BR: Solar Spectrum",
    "BR: HEX (50% Normal)",
    "BR: HEX (0-50% Degen)",
    "BR: HEX (50-100% Inflam)",
    "BR: RGB (Normal)",
    "BR: RGB (Degen)",
    "BR: RGB (Inflam)",
    "BR: Qubit State",
    "BR: Disease Progression",
    "BR: Moon Phase",
    "BR: RGB Color",
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Upper Bit = +ve / Acidic peaks above baseline · Lower Bit = -ve /
          Alkaline depth below baseline
        </p>
        {healthPct !== null && (
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Bio-Field Health</p>
            <p className={`text-2xl font-heading font-bold ${healthColor}`}>
              {healthPct}%
            </p>
          </div>
        )}
      </div>
      <div className="overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-golden font-semibold min-w-[90px]">
                Meridian
              </TableHead>
              <TableHead className="text-golden font-semibold">
                Upper +ve
              </TableHead>
              <TableHead className="text-golden font-semibold">
                Lower -ve
              </TableHead>
              <TableHead className="text-golden font-semibold">Hex</TableHead>
              <TableHead className="text-golden font-semibold">
                Qi Stage
              </TableHead>
              <TableHead className="text-golden font-semibold min-w-[180px]">
                Diagnosis
              </TableHead>
              <TableHead className="text-golden font-semibold">
                Tonify
              </TableHead>
              <TableHead className="text-golden font-semibold">
                Sedate
              </TableHead>
              <TableHead className="text-golden font-semibold">
                120° Partner
              </TableHead>
              {brHeaders.map((h) => (
                <TableHead
                  key={h}
                  className="text-golden font-semibold text-xs whitespace-nowrap min-w-[120px]"
                >
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {MERIDIANS_DATA.map((m, i) => {
              const stage = getStage(m.code);
              const hex = getHex(m.code);
              const diag = getDiagnosis(m.code);
              const mer = getMeridian(m.code);
              const brRow =
                bits[m.code].upper.length === 3
                  ? (BR_BINARY_LOOKUP[bits[m.code].upper] ?? null)
                  : null;
              return (
                <TableRow
                  key={m.code}
                  className="border-border"
                  data-ocid={`quantum.meridian.row.${i + 1}`}
                >
                  <TableCell className="font-medium text-golden/80 text-xs">
                    {m.code} — {m.name}
                  </TableCell>
                  <TableCell className="p-1">
                    <Input
                      value={bits[m.code].upper}
                      onChange={(e) =>
                        handleBit(m.code, "upper", e.target.value)
                      }
                      placeholder="001"
                      maxLength={3}
                      className="bg-input border-border text-center h-8 text-xs w-16 font-mono"
                      data-ocid={`quantum.${m.code.toLowerCase()}.upper.input`}
                    />
                  </TableCell>
                  <TableCell className="p-1">
                    <Input
                      value={bits[m.code].lower}
                      onChange={(e) =>
                        handleBit(m.code, "lower", e.target.value)
                      }
                      placeholder="010"
                      maxLength={3}
                      className="bg-input border-border text-center h-8 text-xs w-16 font-mono"
                      data-ocid={`quantum.${m.code.toLowerCase()}.lower.input`}
                    />
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {hex || "—"}
                  </TableCell>
                  <TableCell>
                    {stage ? (
                      <StageBadge stage={stage} />
                    ) : (
                      <span className="text-muted-foreground text-xs">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-xs min-w-[160px]">
                    {diag || (
                      <span className="text-muted-foreground">Enter bits</span>
                    )}
                  </TableCell>
                  <TableCell className="text-xs text-green-400">
                    {stage ? mer?.tonify : "—"}
                  </TableCell>
                  <TableCell className="text-xs text-red-400">
                    {stage ? mer?.sedate : "—"}
                  </TableCell>
                  <TableCell className="text-xs text-blue-300">
                    {stage ? mer?.normal120 : "—"}
                  </TableCell>
                  {/* Brain Recovery columns */}
                  <TableCell className="text-xs whitespace-nowrap">
                    {brRow ? brRow.moonPhase : "—"}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {brRow ? brRow.trigram : "—"}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {brRow ? brRow.direction : "—"}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {brRow ? brRow.element : "—"}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {brRow ? brRow.qiOrgan : "—"}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap text-purple-300">
                    {brRow ? brRow.extraordinaryMeridian : "—"}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {brRow ? brRow.yinYang : "—"}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {brRow ? brRow.chakra : "—"}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {brRow ? brRow.quality : "—"}
                  </TableCell>
                  <TableCell className="font-mono text-xs whitespace-nowrap">
                    {brRow ? brRow.binary : "—"}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {brRow ? brRow.brainRegion : "—"}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {brRow ? brRow.neurological : "—"}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {brRow ? brRow.microcontroller : "—"}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {brRow ? brRow.nadi : "—"}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {brRow ? brRow.healingStrategy : "—"}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap text-green-300">
                    {brRow ? brRow.acupuncture : "—"}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap text-amber-300">
                    {brRow ? brRow.ayurveda : "—"}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap text-cyan-300">
                    {brRow ? brRow.quantumHealing : "—"}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {brRow ? brRow.healthScale : "—"}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {brRow ? brRow.solarSpectrum : "—"}
                  </TableCell>
                  <TableCell className="text-xs">
                    {brRow ? (
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        <ColorSwatch hex={brRow.hexNormal} />
                        <span className="font-mono text-muted-foreground">
                          {brRow.hexNormal}
                        </span>
                      </div>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell className="text-xs">
                    {brRow ? (
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        <ColorSwatch hex={brRow.hexDegen} />
                        <span className="font-mono text-muted-foreground">
                          {brRow.hexDegen}
                        </span>
                      </div>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell className="text-xs">
                    {brRow ? (
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        <ColorSwatch hex={brRow.hexInflam} />
                        <span className="font-mono text-muted-foreground">
                          {brRow.hexInflam}
                        </span>
                      </div>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                    {brRow ? brRow.rgbNormal : "—"}
                  </TableCell>
                  <TableCell className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                    {brRow ? brRow.rgbDegen : "—"}
                  </TableCell>
                  <TableCell className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                    {brRow ? brRow.rgbInflam : "—"}
                  </TableCell>
                  <TableCell className="text-xs font-mono text-purple-300 whitespace-nowrap">
                    {brRow ? brRow.qubitState : "—"}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {brRow ? brRow.diseaseProgression : "—"}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {brRow ? brRow.moonPhaseEnd : "—"}
                  </TableCell>
                  <TableCell className="text-xs">
                    {brRow ? (
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        <span
                          className="inline-block rounded border border-white/30 flex-shrink-0"
                          style={{
                            backgroundColor: `rgb(${brRow.rgbColor})`,
                            width: 16,
                            height: 16,
                          }}
                        />
                        <span className="font-mono text-muted-foreground">
                          {brRow.rgbColor}
                        </span>
                      </div>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Static Brain Recovery Reference Table — Always Visible */}
      <div>
        <h3 className="text-golden font-heading font-bold text-sm mb-2 mt-6">
          🧠 Brain Recovery Trigrams — Full Reference (All 8 Moon Phases)
        </h3>
        <p className="text-xs text-muted-foreground mb-3">
          Match your entered Upper Trigram bits with the Binary column below for
          immediate diagnosis verification
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                {[
                  "Moon Phase / Hexagram",
                  "Trigram (Ba Gua)",
                  "Direction (180° Opp.)",
                  "Element",
                  "6/8 Stage Organ",
                  "Extraordinary Meridian",
                  "Yin-Yang Structure",
                  "Vedic Chakra",
                  "Quality",
                  "Binary Trigram",
                  "Brain Region Activation",
                  "Neurological Recovery Process",
                  "Microcontroller Function",
                  "Nadi Activation (Ida/Pingala)",
                  "Healing Strategy for Coma Patients",
                  "Acupuncture & Energy Healing",
                  "Ayurvedic & Tibetan Medicine",
                  "Quantum Healing Methods",
                  "Health Scale (0-100%)",
                  "Solar Spectrum Bandwidth",
                  "HEX (50% Normal)",
                  "HEX (0-50% Degen)",
                  "HEX (50-100% Inflam)",
                  "RGB (Normal)",
                  "RGB (Degen)",
                  "RGB (Inflam)",
                  "Qubit State",
                  "Disease Progression",
                  "Moon Phase",
                  "RGB Color",
                ].map((h) => (
                  <TableHead
                    key={h}
                    className="text-golden font-semibold text-xs whitespace-nowrap min-w-[120px]"
                  >
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {BRAIN_RECOVERY_ROWS.map((row) => (
                <TableRow
                  key={row.moonPhase}
                  className={`border-border ${row.rowBg}`}
                >
                  <TableCell className="text-xs whitespace-nowrap font-semibold text-golden/90">
                    {row.moonPhase}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {row.trigram}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {row.direction}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {row.element}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {row.qiOrgan}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap text-purple-300">
                    {row.extraordinaryMeridian}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {row.yinYang}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {row.chakra}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {row.quality}
                  </TableCell>
                  <TableCell className="font-mono text-xs whitespace-nowrap font-bold text-amber-300">
                    {row.binary}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {row.brainRegion}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {row.neurological}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {row.microcontroller}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {row.nadi}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {row.healingStrategy}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap text-green-300">
                    {row.acupuncture}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap text-amber-300">
                    {row.ayurveda}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap text-cyan-300">
                    {row.quantumHealing}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {row.healthScale}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {row.solarSpectrum}
                  </TableCell>
                  <TableCell className="text-xs">
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <ColorSwatch hex={row.hexNormal} />
                      <span className="font-mono text-muted-foreground">
                        {row.hexNormal}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs">
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <ColorSwatch hex={row.hexDegen} />
                      <span className="font-mono text-muted-foreground">
                        {row.hexDegen}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs">
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <ColorSwatch hex={row.hexInflam} />
                      <span className="font-mono text-muted-foreground">
                        {row.hexInflam}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                    {row.rgbNormal}
                  </TableCell>
                  <TableCell className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                    {row.rgbDegen}
                  </TableCell>
                  <TableCell className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                    {row.rgbInflam}
                  </TableCell>
                  <TableCell className="text-xs font-mono text-purple-300 whitespace-nowrap">
                    {row.qubitState}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {row.diseaseProgression}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {row.moonPhaseEnd}
                  </TableCell>
                  <TableCell className="text-xs">
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <span
                        className="inline-block rounded border border-white/30 flex-shrink-0"
                        style={{
                          backgroundColor: `rgb(${row.rgbColor})`,
                          width: 16,
                          height: 16,
                        }}
                      />
                      <span className="font-mono text-muted-foreground">
                        {row.rgbColor}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

function BioFieldScore() {
  const [bits, setBits] = useState<Record<string, string>>(
    Object.fromEntries(MERIDIANS_DATA.map((m) => [m.code, ""])),
  );

  const entries = MERIDIANS_DATA.filter((m) => bits[m.code].length === 3);
  const total = entries.reduce(
    (sum, m) => sum + (STAGE_WEIGHTS[BIT_TO_STAGE[bits[m.code]] ?? ""] ?? 5),
    0,
  );
  const pct =
    entries.length > 0 ? Math.round((total / (entries.length * 10)) * 100) : 0;

  const radarData = QI_STAGES.map((s) => ({
    stage: s.name.slice(0, 4),
    count: MERIDIANS_DATA.filter((m) => BIT_TO_STAGE[bits[m.code]] === s.name)
      .length,
  }));

  const healthLabel =
    pct === 0
      ? "Enter pulse bits above"
      : pct < 40
        ? "Critical — Toxicity High"
        : pct < 70
          ? "Moderate — Imbalance Present"
          : "Good — Solenoid Aligned";

  const barColor =
    pct < 40 ? "bg-red-600" : pct < 70 ? "bg-yellow-500" : "bg-purple-600";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="text-center">
          <p
            className={`text-6xl font-heading font-bold ${
              pct < 40
                ? "text-red-500"
                : pct < 70
                  ? "text-yellow-400"
                  : "text-purple-400"
            }`}
          >
            {pct}%
          </p>
          <p className="text-sm text-muted-foreground mt-1">{healthLabel}</p>
        </div>
        <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
          <div
            style={{ width: `${pct}%` }}
            className={`h-4 ${barColor} rounded-full transition-all`}
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {QI_STAGES.map((s) => (
            <div
              key={s.name}
              className={`rounded p-2 text-center text-xs ${getStageColor(s.name)}`}
            >
              <p className="font-bold">{s.name.slice(0, 4)}</p>
              <p className="text-lg font-mono">
                {
                  MERIDIANS_DATA.filter(
                    (m) =>
                      bits[m.code].length === 3 &&
                      BIT_TO_STAGE[bits[m.code]] === s.name,
                  ).length
                }
              </p>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Quick entry — type upper bits below (for full entry use Batch Pulse
          Entry tab)
        </p>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
          {MERIDIANS_DATA.map((m) => (
            <div key={m.code} className="space-y-0.5">
              <p className="text-xs text-muted-foreground">{m.code}</p>
              <Input
                value={bits[m.code]}
                onChange={(e) => {
                  const v = e.target.value;
                  if (/^[01]{0,3}$/.test(v))
                    setBits((prev) => ({ ...prev, [m.code]: v }));
                }}
                placeholder="000"
                maxLength={3}
                className="bg-input border-border text-center h-7 text-xs font-mono"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm text-muted-foreground text-center mb-2">
          Solenoid Radar — Stage Distribution
        </p>
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart data={radarData} cx="50%" cy="50%">
            <PolarGrid stroke="#334155" />
            <PolarAngleAxis
              dataKey="stage"
              tick={{ fontSize: 10, fill: "#94a3b8" }}
            />
            <Radar
              name="Meridians"
              dataKey="count"
              stroke="#a855f7"
              fill="#a855f7"
              fillOpacity={0.35}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "6px",
                fontSize: "12px",
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function OppositeLawPanel() {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            {[
              "Onset Stage",
              "Onset Time",
              "Best Treatment Time",
              "Conflict",
              "Toxic State to Clear",
            ].map((h) => (
              <TableHead key={h} className="text-golden font-semibold">
                {h}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {OPPOSITE_LAW.map((row) => (
            <TableRow key={row.onsetStage} className="border-border">
              <TableCell>
                <StageBadge stage={row.onsetStage} />
              </TableCell>
              <TableCell className="font-mono text-xs">
                {row.onsetTime}
              </TableCell>
              <TableCell className="font-mono text-xs text-golden">
                {row.treatTime}
              </TableCell>
              <TableCell className="text-xs text-muted-foreground">
                {row.conflict}
              </TableCell>
              <TableCell className="text-xs">{row.toxicClear}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function HexQuickRef() {
  return (
    <div className="space-y-6">
      <div className="overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              {[
                "Hex Code",
                "Sub-Stage",
                "Bio-Resonance Diagnosis",
                "Treatment Protocol",
              ].map((h) => (
                <TableHead key={h} className="text-golden font-semibold">
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {HEX_MATRIX.map((row) => (
              <TableRow
                key={row.hex}
                className="border-border hover:bg-muted/20"
              >
                <TableCell className="font-mono text-xs text-purple-300">
                  {row.hex}
                </TableCell>
                <TableCell className="text-xs font-medium">
                  {row.subStage}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {row.diagnosis}
                </TableCell>
                <TableCell className="text-xs text-golden/80">
                  {row.treatment}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <h4 className="font-heading font-semibold text-golden mb-3">
          8-Stage Hexagram Groups (Lower Trigram)
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(STAGE_GROUPS).map(([stage, hexs]) => (
            <div
              key={stage}
              className={`rounded-lg p-3 border ${getStageColor(stage)}`}
            >
              <p className="font-bold text-sm mb-1">{stage}</p>
              <p className="text-xs opacity-80">{hexs.join(", ")}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ColorSwatch({ hex }: { hex: string }) {
  return (
    <span
      className="inline-block rounded border border-white/20 flex-shrink-0"
      style={{ backgroundColor: hex, width: 16, height: 16 }}
      title={hex}
    />
  );
}

export function QuantumDiagnostics() {
  return (
    <div className="p-6 space-y-6" data-ocid="quantum.page">
      <div>
        <h1 className="font-heading text-2xl font-bold text-golden">
          Quantum Diagnostics
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Hiddén Ömkärèshwér Ärdhnärishwär Bäläncer — Bio-Photonic Workstation
        </p>
      </div>

      <OrganClockHeader />
      <QuantumSingularityPanel />

      <Tabs defaultValue="batch" data-ocid="quantum.tab">
        <TabsList className="bg-card border border-border flex-wrap h-auto gap-1 p-1">
          {[
            ["batch", "Batch Pulse Entry"],
            ["biofield", "Bio-Field Health"],
            ["opposite", "Midday-Midnight Law"],
            ["hexref", "64 Hexagram Ref"],
          ].map(([v, label]) => (
            <TabsTrigger
              key={v}
              value={v}
              data-ocid={`quantum.${v}.tab`}
              className="data-[state=active]:bg-golden data-[state=active]:text-primary-foreground text-sm"
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="batch">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-heading text-base text-golden">
                12 Meridian Pulse Bit Entry — Auto-Diagnosis + Brain Recovery
                Trigrams
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BatchPulseEntry />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="biofield">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-heading text-base text-golden">
                Total Bio-Field Health % + Solenoid Radar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BioFieldScore />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="opposite">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-heading text-base text-golden">
                12-Hour Opposite Law — Midday/Midnight Phase Shift
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Treating at the 12-hour opposite of symptom onset achieves ~80%
                rapid relief by leveraging the Vacuum Principle — draining Toxic
                energy into the Black Hole at its maximum absorption phase.
              </p>
              <OppositeLawPanel />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hexref">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-heading text-base text-golden">
                64 Hexagram Sub-Stage Quick Reference
              </CardTitle>
            </CardHeader>
            <CardContent>
              <HexQuickRef />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
