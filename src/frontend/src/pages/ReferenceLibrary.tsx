import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  EXTRAORDINARY_VESSELS,
  HEX_MATRIX,
  MERIDIANS_DATA,
  OPPOSITE_LAW,
  QI_STAGES,
  STAGE_GROUPS,
  getStageColor,
} from "../data/quantumData";

const BRAIN_RECOVERY_TRIGRAMS = [
  {
    moonPhase: "New Moon",
    trigram: "☷ Kūn (Earth)",
    binary: "000",
    brainRegion: "Brainstem (Autonomic Recovery)",
    neuroProcess: "Regulation of heart rate, respiration, digestion",
    microFunction: "System Reset",
    nadiActivation: "Chandra Nadi + Chandra Nadi + Chandra Nadi",
    healingStrategy: "Stimulation of basic life functions",
    acupuncture: "GV20 (Baihui), GV26 (Shuigou)",
    ayurvedic: "Brahmi, Ashwagandha, Tulsi",
    quantumHealing: "Theta Wave Induction, Photonic Therapy",
  },
  {
    moonPhase: "Waxing Crescent",
    trigram: "☵ Kǎn (Water)",
    binary: "010",
    brainRegion: "Cerebellum (Motor Coordination)",
    neuroProcess: "Restoring balance, muscle tone, movement reflexes",
    microFunction: "Memory & I/O Handling",
    nadiActivation: "Chandra Nadi + Surya Nadi + Chandra Nadi",
    healingStrategy: "Activation of motor response & muscle stimulation",
    acupuncture: "ST36 (Zusanli), LI4 (Hegu)",
    ayurvedic: "Guggulu, Dashmool, Mahanarayan Oil",
    quantumHealing: "Low-Frequency Pulsed Electromagnetic Therapy",
  },
  {
    moonPhase: "First Quarter",
    trigram: "☳ Zhèn (Thunder)",
    binary: "001",
    brainRegion: "Limbic System (Emotional & Memory Recovery)",
    neuroProcess: "Emotional reactivation, PTSD healing",
    microFunction: "Interrupt Processing",
    nadiActivation: "Chandra Nadi + Chandra Nadi + Surya Nadi",
    healingStrategy: "Emotional stability & PTSD reduction",
    acupuncture: "HT7 (Shenmen), PC6 (Neiguan)",
    ayurvedic: "Shankhpushpi, Jatamansi, Calamus",
    quantumHealing: "Binaural Beats, Heart-Brain Coherence",
  },
  {
    moonPhase: "Waxing Gibbous",
    trigram: "☶ Gèn (Mountain)",
    binary: "100",
    brainRegion: "Left Hemisphere (Logical & Language Recovery)",
    neuroProcess: "Restoration of speech, logical thinking",
    microFunction: "Stability & Sleep Mode",
    nadiActivation: "Surya Nadi + Chandra Nadi + Chandra Nadi",
    healingStrategy: "Speech therapy & cognitive rehabilitation",
    acupuncture: "LI11 (Quchi), GV15 (Yamen)",
    ayurvedic: "Guduchi, Brahmi, Mandukparni",
    quantumHealing: "Neurofeedback Therapy",
  },
  {
    moonPhase: "Full Moon",
    trigram: "☰ Qián (Heaven)",
    binary: "111",
    brainRegion: "Prefrontal Cortex (Decision Making & Awareness)",
    neuroProcess: "Higher cognitive function recovery",
    microFunction: "Full Power Execution",
    nadiActivation: "Surya Nadi + Surya Nadi + Surya Nadi",
    healingStrategy: "Mental clarity & full consciousness restoration",
    acupuncture: "GV24 (Shenting), Yintang (Third Eye)",
    ayurvedic: "Swarna Bhasma, Shilajit, Rasayana",
    quantumHealing: "Gamma Wave Stimulation, Quantum Field Activation",
  },
  {
    moonPhase: "Waning Gibbous",
    trigram: "☱ Duì (Lake)",
    binary: "011",
    brainRegion: "Hippocampus (Memory Encoding & Retrieval)",
    neuroProcess: "Memory regeneration, recall improvement",
    microFunction: "Data Flow & Transfer",
    nadiActivation: "Chandra Nadi + Surya Nadi + Surya Nadi",
    healingStrategy: "Enhancing past memory recall",
    acupuncture: "SP6 (Sanyinjiao), UB23 (Shenshu)",
    ayurvedic: "Amalaki, Haritaki, Triphala",
    quantumHealing: "Scalar Wave Therapy, Magnetic Resonance Stimulation",
  },
  {
    moonPhase: "Last Quarter",
    trigram: "☴ Xùn (Wind)",
    binary: "110",
    brainRegion: "Thalamus (Sensory Processing & Attention)",
    neuroProcess: "Integration of sensory perception",
    microFunction: "Low-Power Mode",
    nadiActivation: "Surya Nadi + Surya Nadi + Chandra Nadi",
    healingStrategy: "Retraining of sensory awareness",
    acupuncture: "ST8 (Touwei), SJ5 (Waiguan)",
    ayurvedic: "Licorice, Pippali, Vacha",
    quantumHealing: "Light & Sound Therapy",
  },
  {
    moonPhase: "Waning Crescent",
    trigram: "☲ Lí (Fire)",
    binary: "101",
    brainRegion: "Right Hemisphere (Creativity & Visualization)",
    neuroProcess: "Enhancing creativity & visual memory",
    microFunction: "Execution Optimization",
    nadiActivation: "Surya Nadi + Chandra Nadi + Surya Nadi",
    healingStrategy: "Awakening subconscious & dream states",
    acupuncture: "GB13 (Benshen), SI19 (Tinggong)",
    ayurvedic: "Rose Oil, Saffron, Nutmeg",
    quantumHealing: "Dream Reprogramming, Lucid Dream Training",
  },
];

const TRIGRAM_QUANTUM_PROPS = [
  {
    symbol: "☰",
    name: "Heaven",
    organ: "Lungs",
    meridian: "Ren Mai",
    yinYang: "Yang Yang Yang",
    healthScale: "0-50 (Degeneration)",
    solarBandwidth: "High Frequency",
    hexNormal: "#CCCCCC",
    hexDegen: "#FFFFFF",
    hexInflam: "#999999",
    rgbNormal: "204,204,204",
    rgbDegen: "255,255,255",
    rgbInflam: "153,153,153",
    qubitState: "|0⟩",
    diseaseProgression: "Darkness",
    moonPhase: "New Moon",
    rgbColor: "0,0,0",
    rgbColorHex: "#000000",
  },
  {
    symbol: "☷",
    name: "Earth",
    organ: "Kidneys",
    meridian: "Du Mai",
    yinYang: "Yin Yin Yin",
    healthScale: "50 (Normal)",
    solarBandwidth: "Low Frequency",
    hexNormal: "#666666",
    hexDegen: "#CCCCCC",
    hexInflam: "#666666",
    rgbNormal: "102,102,102",
    rgbDegen: "204,204,204",
    rgbInflam: "102,102,102",
    qubitState: "|1⟩",
    diseaseProgression: "Brightness",
    moonPhase: "Waxing Crescent",
    rgbColor: "51,51,51",
    rgbColorHex: "#333333",
  },
  {
    symbol: "☵",
    name: "Water",
    organ: "Bladder",
    meridian: "Chong Mai",
    yinYang: "Yang Yin Yang",
    healthScale: "50-100 (Inflammation)",
    solarBandwidth: "Medium",
    hexNormal: "#999999",
    hexDegen: "#C0C0C0",
    hexInflam: "#333333",
    rgbNormal: "153,153,153",
    rgbDegen: "192,192,192",
    rgbInflam: "51,51,51",
    qubitState: "|+⟩",
    diseaseProgression: "Coldness (Water)",
    moonPhase: "First Quarter",
    rgbColor: "102,102,102",
    rgbColorHex: "#666666",
  },
  {
    symbol: "☲",
    name: "Fire",
    organ: "Heart",
    meridian: "Dai Mai",
    yinYang: "Yin Yang Yin",
    healthScale: "0-50 (Degeneration)",
    solarBandwidth: "Very High",
    hexNormal: "#333333",
    hexDegen: "#999999",
    hexInflam: "#111111",
    rgbNormal: "51,51,51",
    rgbDegen: "153,153,153",
    rgbInflam: "17,17,17",
    qubitState: "|-⟩",
    diseaseProgression: "Heat (Fire)",
    moonPhase: "Waxing Gibbous",
    rgbColor: "153,153,153",
    rgbColorHex: "#999999",
  },
  {
    symbol: "☴",
    name: "Wind",
    organ: "Liver",
    meridian: "Yang Qiao Mai",
    yinYang: "Yang Yang Yin",
    healthScale: "50-100 (Inflammation)",
    solarBandwidth: "Broad",
    hexNormal: "#666666",
    hexDegen: "#666666",
    hexInflam: "#000000",
    rgbNormal: "102,102,102",
    rgbDegen: "102,102,102",
    rgbInflam: "0,0,0",
    qubitState: "|i⟩",
    diseaseProgression: "Wind (Wood)",
    moonPhase: "Full Moon",
    rgbColor: "192,192,192",
    rgbColorHex: "#C0C0C0",
  },
  {
    symbol: "☶",
    name: "Mountain",
    organ: "Spleen",
    meridian: "Yin Qiao Mai",
    yinYang: "Yin Yin Yang",
    healthScale: "50 (Normal)",
    solarBandwidth: "Narrow",
    hexNormal: "#CCCCCC",
    hexDegen: "#333333",
    hexInflam: "#222222",
    rgbNormal: "204,204,204",
    rgbDegen: "51,51,51",
    rgbInflam: "34,34,34",
    qubitState: "|-i⟩",
    diseaseProgression: "Dryness (Metal)",
    moonPhase: "Waning Gibbous",
    rgbColor: "204,204,204",
    rgbColorHex: "#CCCCCC",
  },
  {
    symbol: "☳",
    name: "Thunder",
    organ: "Stomach",
    meridian: "Yang Wei Mai",
    yinYang: "Yang Yin Yin",
    healthScale: "0-50 (Degeneration)",
    solarBandwidth: "Wide",
    hexNormal: "#333333",
    hexDegen: "#111111",
    hexInflam: "#444444",
    rgbNormal: "51,51,51",
    rgbDegen: "17,17,17",
    rgbInflam: "68,68,68",
    qubitState: "Entangled",
    diseaseProgression: "Warmness (Air)",
    moonPhase: "Last Quarter",
    rgbColor: "230,230,230",
    rgbColorHex: "#E6E6E6",
  },
  {
    symbol: "☱",
    name: "Lake",
    organ: "Large Intestine",
    meridian: "Yin Wei Mai",
    yinYang: "Yin Yang Yang",
    healthScale: "50-100 (Inflammation)",
    solarBandwidth: "Variable",
    hexNormal: "#999999",
    hexDegen: "#000000",
    hexInflam: "#666666",
    rgbNormal: "153,153,153",
    rgbDegen: "0,0,0",
    rgbInflam: "102,102,102",
    qubitState: "Superposition",
    diseaseProgression: "Humidity (Earth)",
    moonPhase: "Waning Crescent",
    rgbColor: "255,255,255",
    rgbColorHex: "#FFFFFF",
  },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-heading font-semibold text-golden mb-3 mt-5 first:mt-0">
      {children}
    </h3>
  );
}

function InfoCard({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <Card className="bg-card border-border mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="font-heading text-base text-golden">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-foreground/80 leading-relaxed space-y-2">
        {children}
      </CardContent>
    </Card>
  );
}

function StageBadge({ stage }: { stage: string }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${getStageColor(stage)}`}
    >
      {stage}
    </span>
  );
}

function PulseDiagnosis() {
  return (
    <div>
      <SectionTitle>Wrist Pulse Diagnosis (Nadi Pariksha)</SectionTitle>
      <div className="grid md:grid-cols-2 gap-4">
        <InfoCard title="Right Wrist">
          <p>
            <strong className="text-golden/80">Distal (Index finger):</strong>{" "}
            Lung (LU) / Large Intestine (LI)
          </p>
          <p>
            <strong className="text-golden/80">Middle (Middle finger):</strong>{" "}
            Spleen (SP) / Stomach (ST)
          </p>
          <p>
            <strong className="text-golden/80">Proximal (Ring finger):</strong>{" "}
            Pericardium (PC) / Triple Energizer (TE)
          </p>
        </InfoCard>
        <InfoCard title="Left Wrist">
          <p>
            <strong className="text-golden/80">Distal (Index finger):</strong>{" "}
            Heart (HT) / Small Intestine (SI)
          </p>
          <p>
            <strong className="text-golden/80">Middle (Middle finger):</strong>{" "}
            Liver (LR) / Gallbladder (GB)
          </p>
          <p>
            <strong className="text-golden/80">Proximal (Ring finger):</strong>{" "}
            Kidney (KI) / Bladder (BL)
          </p>
        </InfoCard>
      </div>
      <InfoCard title="Pulse Qualities">
        <p>
          <strong className="text-golden/80">Floating:</strong> Superficial
          conditions, Wind, exterior pathogenic factors
        </p>
        <p>
          <strong className="text-golden/80">Deep:</strong> Interior conditions,
          organ deficiencies
        </p>
        <p>
          <strong className="text-golden/80">Slow:</strong> Cold, deficiency of
          Yang, Yin excess
        </p>
        <p>
          <strong className="text-golden/80">Rapid:</strong> Heat, excess Yang,
          Yin deficiency
        </p>
        <p>
          <strong className="text-golden/80">Wiry:</strong> Liver disharmony,
          pain, stress
        </p>
        <p>
          <strong className="text-golden/80">Slippery:</strong> Dampness,
          Phlegm, pregnancy
        </p>
        <p>
          <strong className="text-golden/80">Thin/Thready:</strong> Blood
          deficiency, Yin deficiency
        </p>
      </InfoCard>
    </div>
  );
}

function FiveElements() {
  const data = [
    {
      element: "Wood 木",
      organ: "Liver / Gallbladder",
      emotion: "Anger / Frustration",
      season: "Spring",
      time: "11pm–3am",
      color: "Green",
      colorHex: "#22c55e",
      taste: "Sour",
    },
    {
      element: "Fire 火",
      organ: "Heart / Small Intestine",
      emotion: "Joy / Anxiety",
      season: "Summer",
      time: "11am–3pm",
      color: "Red",
      colorHex: "#ef4444",
      taste: "Bitter",
    },
    {
      element: "Earth 土",
      organ: "Spleen / Stomach",
      emotion: "Worry / Pensiveness",
      season: "Late Summer",
      time: "7am–11am",
      color: "Yellow",
      colorHex: "#eab308",
      taste: "Sweet",
    },
    {
      element: "Metal 金",
      organ: "Lung / Large Intestine",
      emotion: "Grief / Sadness",
      season: "Autumn",
      time: "3am–7am",
      color: "White",
      colorHex: "#e2e8f0",
      taste: "Pungent",
    },
    {
      element: "Water 水",
      organ: "Kidney / Bladder",
      emotion: "Fear / Willpower",
      season: "Winter",
      time: "3pm–7pm",
      color: "Black/Blue",
      colorHex: "#3b82f6",
      taste: "Salty",
    },
  ];
  return (
    <div>
      <SectionTitle>Wu Xing — Five Elements Theory</SectionTitle>
      <div className="overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              {[
                "Element",
                "Organs",
                "Emotion",
                "Season",
                "Time",
                "Color",
                "Taste",
              ].map((h) => (
                <TableHead key={h} className="text-golden font-semibold">
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.element}
                className="border-border hover:bg-muted/30"
              >
                <TableCell className="font-medium text-golden/80">
                  {row.element}
                </TableCell>
                <TableCell>{row.organ}</TableCell>
                <TableCell>{row.emotion}</TableCell>
                <TableCell>{row.season}</TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-2">
                    <span
                      style={{ background: row.colorHex }}
                      className="inline-block w-4 h-4 rounded-full border border-white/20 flex-shrink-0"
                    />
                    {row.color}
                  </span>
                </TableCell>
                <TableCell>{row.taste}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function EightTrigrams() {
  const trigrams = [
    {
      name: "☰ Qian (Heaven)",
      direction: "Northwest",
      element: "Metal",
      chakra: "Crown",
      quality: "Creative, Strong, Father",
    },
    {
      name: "☷ Kun (Earth)",
      direction: "Southwest",
      element: "Earth",
      chakra: "Root",
      quality: "Receptive, Nurturing, Mother",
    },
    {
      name: "☳ Zhen (Thunder)",
      direction: "East",
      element: "Wood",
      chakra: "Solar Plexus",
      quality: "Arousing, Movement, Eldest Son",
    },
    {
      name: "☴ Xun (Wind)",
      direction: "Southeast",
      element: "Wood",
      chakra: "Heart",
      quality: "Gentle, Penetrating, Eldest Daughter",
    },
    {
      name: "☵ Kan (Water)",
      direction: "North",
      element: "Water",
      chakra: "Sacral",
      quality: "Dangerous, Flowing, Middle Son",
    },
    {
      name: "☲ Li (Fire)",
      direction: "South",
      element: "Fire",
      chakra: "Third Eye",
      quality: "Clarity, Beauty, Middle Daughter",
    },
    {
      name: "☶ Gen (Mountain)",
      direction: "Northeast",
      element: "Earth",
      chakra: "Throat",
      quality: "Stillness, Keeping Still, Youngest Son",
    },
    {
      name: "☱ Dui (Lake)",
      direction: "West",
      element: "Metal",
      chakra: "Sacral",
      quality: "Joy, Pleasure, Youngest Daughter",
    },
  ];
  return (
    <div>
      <SectionTitle>Ba Gua — Eight Trigrams</SectionTitle>
      <div className="overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              {[
                "Trigram",
                "Direction",
                "Element",
                "Vedic Chakra",
                "Quality",
              ].map((h) => (
                <TableHead key={h} className="text-golden font-semibold">
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {trigrams.map((t) => (
              <TableRow
                key={t.name}
                className="border-border hover:bg-muted/30"
              >
                <TableCell className="font-medium text-golden/80">
                  {t.name}
                </TableCell>
                <TableCell>{t.direction}</TableCell>
                <TableCell>{t.element}</TableCell>
                <TableCell>{t.chakra}</TableCell>
                <TableCell className="text-muted-foreground">
                  {t.quality}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Brain Recovery Trigrams */}
      <div className="mt-8">
        <SectionTitle>Brain Recovery Trigrams</SectionTitle>
        <div className="overflow-x-auto rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                {[
                  "Moon Phase",
                  "Trigram (Ba Gua)",
                  "Binary Trigram",
                  "Brain Region Activation",
                  "Neurological Recovery Process",
                  "Microcontroller Function",
                  "Nadi Activation (Ida/Pingala)",
                  "Healing Strategy for Coma Patients",
                  "Acupuncture & Energy Healing",
                  "Ayurvedic & Tibetan Medicine",
                  "Quantum Healing Methods",
                ].map((h) => (
                  <TableHead
                    key={h}
                    className="text-golden font-semibold whitespace-nowrap text-xs"
                  >
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {BRAIN_RECOVERY_TRIGRAMS.map((r) => (
                <TableRow
                  key={r.moonPhase}
                  className="border-border hover:bg-muted/20"
                >
                  <TableCell className="text-xs whitespace-nowrap">
                    {r.moonPhase}
                  </TableCell>
                  <TableCell className="text-xs">{r.trigram}</TableCell>
                  <TableCell className="font-mono text-xs text-purple-300">
                    {r.binary}
                  </TableCell>
                  <TableCell className="text-xs min-w-[160px]">
                    {r.brainRegion}
                  </TableCell>
                  <TableCell className="text-xs min-w-[200px]">
                    {r.neuroProcess}
                  </TableCell>
                  <TableCell className="text-xs">{r.microFunction}</TableCell>
                  <TableCell className="text-xs min-w-[200px]">
                    {r.nadiActivation}
                  </TableCell>
                  <TableCell className="text-xs min-w-[200px]">
                    {r.healingStrategy}
                  </TableCell>
                  <TableCell className="text-xs font-mono text-green-400 min-w-[180px]">
                    {r.acupuncture}
                  </TableCell>
                  <TableCell className="text-xs min-w-[180px]">
                    {r.ayurvedic}
                  </TableCell>
                  <TableCell className="text-xs min-w-[200px]">
                    {r.quantumHealing}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Trigram Quantum Bio-Photonic Properties */}
      <div className="mt-8">
        <SectionTitle>Trigram Quantum Bio-Photonic Properties</SectionTitle>
        <div className="overflow-x-auto rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                {[
                  "Symbol",
                  "Name",
                  "Organ",
                  "Extraordinary Meridian",
                  "Yin-Yang",
                  "Health Scale",
                  "Solar Bandwidth",
                  "HEX Normal",
                  "HEX Degen.",
                  "HEX Inflam.",
                  "RGB Normal",
                  "RGB Degen.",
                  "RGB Inflam.",
                  "Qubit State",
                  "Disease Prog.",
                  "Moon Phase",
                  "RGB Color",
                ].map((h) => (
                  <TableHead
                    key={h}
                    className="text-golden font-semibold whitespace-nowrap text-xs"
                  >
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {TRIGRAM_QUANTUM_PROPS.map((r) => (
                <TableRow
                  key={r.symbol}
                  className="border-border hover:bg-muted/20"
                >
                  <TableCell className="text-lg">{r.symbol}</TableCell>
                  <TableCell className="text-xs font-medium">
                    {r.name}
                  </TableCell>
                  <TableCell className="text-xs">{r.organ}</TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {r.meridian}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {r.yinYang}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {r.healthScale}
                  </TableCell>
                  <TableCell className="text-xs">{r.solarBandwidth}</TableCell>
                  <TableCell className="text-xs">
                    <span className="inline-flex items-center gap-1">
                      <span
                        style={{ background: r.hexNormal }}
                        className="inline-block w-3 h-3 rounded border border-white/30 flex-shrink-0"
                      />
                      {r.hexNormal}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs">
                    <span className="inline-flex items-center gap-1">
                      <span
                        style={{ background: r.hexDegen }}
                        className="inline-block w-3 h-3 rounded border border-white/30 flex-shrink-0"
                      />
                      {r.hexDegen}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs">
                    <span className="inline-flex items-center gap-1">
                      <span
                        style={{ background: r.hexInflam }}
                        className="inline-block w-3 h-3 rounded border border-white/30 flex-shrink-0"
                      />
                      {r.hexInflam}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs font-mono">
                    {r.rgbNormal}
                  </TableCell>
                  <TableCell className="text-xs font-mono">
                    {r.rgbDegen}
                  </TableCell>
                  <TableCell className="text-xs font-mono">
                    {r.rgbInflam}
                  </TableCell>
                  <TableCell className="text-xs font-mono text-purple-300">
                    {r.qubitState}
                  </TableCell>
                  <TableCell className="text-xs">
                    {r.diseaseProgression}
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {r.moonPhase}
                  </TableCell>
                  <TableCell className="text-xs">
                    <span className="inline-flex items-center gap-1">
                      <span
                        style={{ background: r.rgbColorHex }}
                        className="inline-block w-4 h-4 rounded border border-white/30 flex-shrink-0"
                      />
                      {r.rgbColor}
                    </span>
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

function IChing() {
  return (
    <div>
      <SectionTitle>I Ching — 64 Hexagrams</SectionTitle>
      <InfoCard title="Overview">
        <p>
          The I Ching comprises 64 hexagrams, each formed by combining two of
          the eight trigrams (Ba Gua). In bio-energetic practice, hexagram
          resonance identifies energetic patterns in meridian flow.
        </p>
      </InfoCard>
      <InfoCard title="Key Clinical Hexagrams">
        <p>
          <strong className="text-golden/80">Hexagram 1 (☰☰ Qian):</strong> Pure
          Yang, maximum creative force, strong constitutional vitality
        </p>
        <p>
          <strong className="text-golden/80">Hexagram 2 (☷☷ Kun):</strong> Pure
          Yin, deep receptivity, restoration and healing
        </p>
        <p>
          <strong className="text-golden/80">Hexagram 11 (☷☰ Tai):</strong>{" "}
          Peace and harmony, optimal organ balance
        </p>
        <p>
          <strong className="text-golden/80">Hexagram 63 (☵☲ Ji Ji):</strong>{" "}
          After completion, post-treatment integration
        </p>
        <p>
          <strong className="text-golden/80">Hexagram 64 (☲☵ Wei Ji):</strong>{" "}
          Before completion, ongoing transformation
        </p>
      </InfoCard>
    </div>
  );
}

function AcupunctureRef() {
  return (
    <div>
      <SectionTitle>Acupuncture Protocol Reference</SectionTitle>
      <InfoCard title="Master Tung Points">
        <p>
          Master Tung acupuncture uses distal needling to affect distant organ
          systems through holographic imaging zones on the extremities.
        </p>
        <p>
          <strong className="text-golden/80">Zone 1 (Fingers/Toes):</strong>{" "}
          Head, face, sense organs
        </p>
        <p>
          <strong className="text-golden/80">Zone 2 (Hand/Foot):</strong> Chest,
          heart, lungs
        </p>
        <p>
          <strong className="text-golden/80">
            Zone 3 (Forearm/Lower leg):
          </strong>{" "}
          Abdomen, digestive organs
        </p>
        <p>
          <strong className="text-golden/80">Zone 4 (Upper arm/Thigh):</strong>{" "}
          Lumbar, kidneys, reproductive
        </p>
      </InfoCard>
      <InfoCard title="Key Command Points">
        <p>
          <strong className="text-golden/80">Source Points (Yuan):</strong>{" "}
          Tonify and balance organ Qi
        </p>
        <p>
          <strong className="text-golden/80">Luo Points:</strong> Connect
          meridian pairs, treat chronic conditions
        </p>
        <p>
          <strong className="text-golden/80">Xi-Cleft Points:</strong> Acute
          pain and excess conditions
        </p>
        <p>
          <strong className="text-golden/80">Back-Shu Points:</strong> Direct
          organ treatment on Bladder meridian
        </p>
      </InfoCard>
    </div>
  );
}

function PMAGuide() {
  return (
    <div>
      <SectionTitle>PMA Pulse Analysis Guide</SectionTitle>
      <InfoCard title="PMA Scan Protocol">
        <p>
          Photon Meridian Analysis (PMA) measures bio-photonic emission from
          acupuncture points to assess meridian energy flow and organ function
          states.
        </p>
      </InfoCard>
      <InfoCard title="Reading Interpretation">
        <p>
          <strong className="text-golden/80">Qi Score 0-30:</strong> Severe
          deficiency — tonification required
        </p>
        <p>
          <strong className="text-golden/80">Qi Score 31-50:</strong> Mild
          deficiency — supportive treatment
        </p>
        <p>
          <strong className="text-golden/80">Qi Score 51-70:</strong> Balanced —
          maintenance protocols
        </p>
        <p>
          <strong className="text-golden/80">Qi Score 71-85:</strong> Slight
          excess — sedation techniques
        </p>
        <p>
          <strong className="text-golden/80">Qi Score 86-100:</strong>{" "}
          Significant excess — dispersal required
        </p>
      </InfoCard>
    </div>
  );
}

// ---- NEW TABS ----

function TrioriginTab() {
  return (
    <div className="space-y-4">
      <InfoCard title="Triorigin Force System (Prof. Park Jae Woo)">
        <p>
          The Triorigin system expands the 6-stage view (Six Ki) to 8 stages by
          adding Darkness (Homo/Neuto) and Dryness (Homo). These link the
          meridians to the 8 Moon Phases through Hetero/Homo/Neutro/Neuto
          forces.
        </p>
      </InfoCard>
      <div className="overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              {[
                "Stage",
                "Triorigin",
                "Bit",
                "Trigram",
                "Singularity",
                "Vessel",
                "Moon Phase",
                "Time Peak",
                "Symptoms",
                "Toxic Flavor",
                "Laser Protocol",
                "Spectrum",
              ].map((h) => (
                <TableHead
                  key={h}
                  className="text-golden font-semibold whitespace-nowrap"
                >
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {QI_STAGES.map((s) => (
              <TableRow key={s.name} className="border-border">
                <TableCell>
                  <StageBadge stage={s.name} />
                </TableCell>
                <TableCell className="text-xs whitespace-nowrap">
                  {s.triorigin}
                </TableCell>
                <TableCell className="font-mono text-xs text-purple-300">
                  {s.bit}
                </TableCell>
                <TableCell className="text-xs">{s.trigram}</TableCell>
                <TableCell className="text-xs whitespace-nowrap">
                  {s.singularity}
                </TableCell>
                <TableCell className="text-xs whitespace-nowrap">
                  {s.vessel}
                </TableCell>
                <TableCell className="text-xs">{s.moonPhase}</TableCell>
                <TableCell className="text-xs whitespace-nowrap">
                  {s.time}
                </TableCell>
                <TableCell className="text-xs min-w-[180px]">
                  {s.symptoms}
                </TableCell>
                <TableCell className="text-xs min-w-[160px] text-muted-foreground">
                  {s.toxicFlavor}
                </TableCell>
                <TableCell className="text-xs min-w-[200px]">
                  {s.laserProtocol}
                </TableCell>
                <TableCell className="text-xs whitespace-nowrap text-golden/70">
                  {s.laserSpectrum}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function ExtVesselsTab() {
  return (
    <div className="space-y-4">
      <InfoCard title="8 Extraordinary Vessels — Quantum Singularity Map">
        <p>
          The 8 Extraordinary Vessels act as Event Horizons in the Microcosmic
          Orbit. Du Mai (White Hole) radiates; Ren Mai (Black Hole) absorbs. The
          other 6 vessels stabilize the Solenoid flow.
        </p>
      </InfoCard>
      <div className="overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              {[
                "Vessel",
                "Singularity",
                "Master Point",
                "Coupled Point",
                "Trigram",
                "Phase",
                "Bit",
                "Direction",
                "Sujok Location",
                "Macro Effect",
              ].map((h) => (
                <TableHead
                  key={h}
                  className="text-golden font-semibold whitespace-nowrap"
                >
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {EXTRAORDINARY_VESSELS.map((v) => (
              <TableRow
                key={v.vessel}
                className="border-border hover:bg-muted/20"
              >
                <TableCell className="font-semibold text-golden/80 text-xs whitespace-nowrap">
                  {v.vessel}
                </TableCell>
                <TableCell className="text-xs">{v.singularity}</TableCell>
                <TableCell className="text-xs font-mono text-green-400">
                  {v.master}
                </TableCell>
                <TableCell className="text-xs font-mono text-orange-400">
                  {v.coupled}
                </TableCell>
                <TableCell className="text-xs">{v.trigram}</TableCell>
                <TableCell>
                  <StageBadge stage={v.phase} />
                </TableCell>
                <TableCell className="font-mono text-xs text-purple-300">
                  {v.bit}
                </TableCell>
                <TableCell className="text-xs">{v.direction}</TableCell>
                <TableCell className="text-xs text-muted-foreground min-w-[200px]">
                  {v.sujok}
                </TableCell>
                <TableCell className="text-xs min-w-[180px]">
                  {v.macroEffect}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function HexMatrixTab() {
  return (
    <div className="space-y-6">
      <InfoCard title="64 Hexagram Sub-Stage Diagnostics">
        <p>
          A Hexagram (6-bit) = Upper Trigram (surface symptom) + Lower Trigram
          (root cause). Treat the Lower Trigram (Root) first, then the Upper
          Trigram (Branch).
        </p>
      </InfoCard>
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
                <TableCell className="text-xs text-muted-foreground min-w-[200px]">
                  {row.diagnosis}
                </TableCell>
                <TableCell className="text-xs text-golden/80 min-w-[200px]">
                  {row.treatment}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <h4 className="font-heading font-semibold text-golden mb-3">
          8-Stage Hexagram Groups (by Lower Trigram)
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(STAGE_GROUPS).map(([stage, hexs]) => (
            <div
              key={stage}
              className={`rounded-lg p-3 border ${getStageColor(stage)}`}
            >
              <p className="font-bold text-sm mb-1">{stage}</p>
              <p className="text-xs opacity-80">Hexagrams: {hexs.join(", ")}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DrTungTab() {
  const clockOpposites = [
    {
      meridian: "Lung (LU)",
      time: "3-5am",
      opposite: "Bladder (UB)",
      oppTime: "3-5pm",
    },
    {
      meridian: "Large Int. (LI)",
      time: "5-7am",
      opposite: "Kidney (KI)",
      oppTime: "5-7pm",
    },
    {
      meridian: "Stomach (ST)",
      time: "7-9am",
      opposite: "Pericardium (PC)",
      oppTime: "7-9pm",
    },
    {
      meridian: "Spleen (SP)",
      time: "9-11am",
      opposite: "Triple E. (TE)",
      oppTime: "9-11pm",
    },
    {
      meridian: "Heart (HT)",
      time: "11am-1pm",
      opposite: "Gallbladder (GB)",
      oppTime: "11pm-1am",
    },
    {
      meridian: "Small Int. (SI)",
      time: "1-3pm",
      opposite: "Liver (LR)",
      oppTime: "1-3am",
    },
  ];

  const imagingTable = [
    { zone: "Finger/Toe", bodyRegion: "Top of head / Anus & Testicles" },
    { zone: "Hand/Foot", bodyRegion: "Head & Skull / Genitals" },
    { zone: "Wrist/Ankle", bodyRegion: "Neck / Bladder" },
    { zone: "Forearm/Lower Leg", bodyRegion: "Upper Abdomen / Lower Abdomen" },
    { zone: "Elbow/Knee", bodyRegion: "Umbilicus L-2" },
    {
      zone: "Upper Arm/Upper Leg",
      bodyRegion: "Chest & Upper Back / Lower Abdomen",
    },
    { zone: "Shoulder/Hip", bodyRegion: "Neck & Jaw / Genitals" },
  ];

  return (
    <div className="space-y-6">
      <InfoCard title="Dr. Tung's 5 Balancer Systems">
        <p>
          Dr. Tung's acupuncture uses 5 imaging systems for distal point
          selection. The body part affected is treated via its mirror image on
          the extremities.
        </p>
      </InfoCard>

      <div className="grid md:grid-cols-2 gap-4">
        <InfoCard title="System 1: Anatomical Image">
          <p>
            Same meridian name sharing. Hand-foot pairing. Treats via same-named
            meridian on opposite limb.
          </p>
        </InfoCard>
        <InfoCard title="System 2: Bie Jing Branching">
          <p>
            <strong className="text-golden/80">TAI YANG ↔ TAI YIN:</strong> SI /
            UB ↔ LU / SP
          </p>
          <p>
            <strong className="text-golden/80">JUE YIN ↔ YANG MING:</strong> PC
            / LR ↔ LI / ST
          </p>
          <p>
            <strong className="text-golden/80">SHAO YANG ↔ SHAO YIN:</strong> TE
            / GB ↔ HT / KI
          </p>
        </InfoCard>
        <InfoCard title="System 3: Interior/Exterior (BaGua)">
          <p>Treats opposite side — Yin for Yang organ pairs:</p>
          <p>
            <strong className="text-golden/80">UB ↔ GB:</strong> Tai Yang ↔ Shao
            Yang
          </p>
          <p>
            <strong className="text-golden/80">LU ↔ SP:</strong> Metal Yin pair
          </p>
          <p>
            <strong className="text-golden/80">ST ↔ LI:</strong> Earth/Metal
            Yang pair
          </p>
          <p>
            <strong className="text-golden/80">K ↔ LV:</strong> Water/Wood Yin
            pair
          </p>
          <p>
            <strong className="text-golden/80">H ↔ P:</strong> Fire Yin pair
          </p>
          <p>
            <strong className="text-golden/80">SI ↔ SJ:</strong> Fire Yang pair
          </p>
        </InfoCard>
        <InfoCard title="System 5: Neighbor System">
          <p>Adjacent meridians on the organ clock:</p>
          <p>SI ↔ UB · K ↔ PC · TE ↔ GB · LV ↔ LU · LI ↔ ST · SP ↔ HT</p>
        </InfoCard>
      </div>

      <div>
        <h4 className="font-heading font-semibold text-golden mb-3">
          System 4: Chinese Clock Opposites (12-Hour)
        </h4>
        <div className="overflow-x-auto rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                {[
                  "Meridian",
                  "Peak Time",
                  "Opposite Meridian",
                  "Opposite Time",
                ].map((h) => (
                  <TableHead key={h} className="text-golden font-semibold">
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {clockOpposites.map((row) => (
                <TableRow
                  key={row.meridian}
                  className="border-border hover:bg-muted/20"
                >
                  <TableCell className="font-medium text-golden/80 text-xs">
                    {row.meridian}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {row.time}
                  </TableCell>
                  <TableCell className="text-xs">{row.opposite}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {row.oppTime}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div>
        <h4 className="font-heading font-semibold text-golden mb-3">
          Imaging Format / Mirroring Zones
        </h4>
        <div className="overflow-x-auto rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                {["Limb Zone", "Body Region Treated"].map((h) => (
                  <TableHead key={h} className="text-golden font-semibold">
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {imagingTable.map((row) => (
                <TableRow
                  key={row.zone}
                  className="border-border hover:bg-muted/20"
                >
                  <TableCell className="font-medium text-golden/80 text-xs">
                    {row.zone}
                  </TableCell>
                  <TableCell className="text-xs">{row.bodyRegion}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div>
        <h4 className="font-heading font-semibold text-golden mb-3">
          Complete 8-Stage Tonify / Sedate Points
        </h4>
        <div className="overflow-x-auto rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                {[
                  "Meridian",
                  "Code",
                  "Qi Stage",
                  "Trigram",
                  "Nādī",
                  "Tonify",
                  "Sedate",
                  "Tung Mirror",
                ].map((h) => (
                  <TableHead key={h} className="text-golden font-semibold">
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {MERIDIANS_DATA.map((m) => (
                <TableRow
                  key={m.code}
                  className="border-border hover:bg-muted/20"
                >
                  <TableCell className="font-medium text-xs text-golden/80">
                    {m.name}
                  </TableCell>
                  <TableCell className="font-mono text-xs">{m.code}</TableCell>
                  <TableCell>
                    <StageBadge stage={m.qiStage} />
                  </TableCell>
                  <TableCell className="text-xs">{m.trigram}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {m.nadi}
                  </TableCell>
                  <TableCell className="text-xs text-green-400 font-mono">
                    {m.tonify}
                  </TableCell>
                  <TableCell className="text-xs text-red-400 font-mono">
                    {m.sedate}
                  </TableCell>
                  <TableCell className="text-xs">{m.tungsBody}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

function HitTheoryTab() {
  const colorKey = [
    { stage: "HEAT", color: "Red", trigger: "Heat" },
    { stage: "COLDNESS", color: "Blue", trigger: "Coldness" },
    { stage: "WIND", color: "Green", trigger: "Wind" },
    { stage: "DARKNESS", color: "Black", trigger: "Darkness" },
    { stage: "HUMIDITY", color: "Yellow", trigger: "Humidity" },
    { stage: "WARMNESS", color: "Orange", trigger: "Warmness" },
    { stage: "DRYNESS", color: "Grey", trigger: "Dryness" },
    { stage: "STILLNESS", color: "Purple", trigger: "Brightness" },
  ];

  return (
    <div className="space-y-6">
      <InfoCard title="Hit Theory — 120° Normal Degree vs 180° Direct Hit">
        <p>
          <strong className="text-golden/80">
            180° Direct Hit (Toxic/Antagonistic):
          </strong>{" "}
          Direct opposition between meridians creates a "Consumption" state —
          energy is blocked and wasted.
        </p>
        <p>
          <strong className="text-golden/80">
            120° Normal Degree (Synergistic):
          </strong>{" "}
          The optimal angle for positive meridian interaction — creates "Real
          Interaction" and "Flow State."
        </p>
        <p>
          <strong className="text-golden/80">Clinical Application:</strong> When
          a direct 180° confrontation occurs, shift 30° toward the 120° Normal
          Degree to dissolve the Hit.
        </p>
      </InfoCard>

      <div className="overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              {[
                "Meridian",
                "Qi Stage",
                "180° Direct Hit",
                "120° Normal Partner",
                "Tonify",
                "Sedate",
              ].map((h) => (
                <TableHead key={h} className="text-golden font-semibold">
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {MERIDIANS_DATA.map((m) => (
              <TableRow key={m.code} className="border-border">
                <TableCell className="font-medium text-xs text-golden/80">
                  {m.name}
                </TableCell>
                <TableCell>
                  <StageBadge stage={m.qiStage} />
                </TableCell>
                <TableCell className="text-xs text-red-400">
                  {m.hit180}
                </TableCell>
                <TableCell className="text-xs text-green-400">
                  {m.normal120}
                </TableCell>
                <TableCell className="text-xs font-mono text-green-400">
                  {m.tonify}
                </TableCell>
                <TableCell className="text-xs font-mono text-red-400">
                  {m.sedate}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <h4 className="font-heading font-semibold text-golden mb-3">
          12-Hour Opposite Law Matrix
        </h4>
        <div className="overflow-x-auto rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                {[
                  "Onset Stage",
                  "Onset Time",
                  "Best Treatment Time",
                  "Conflict",
                  "Toxic State",
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
      </div>

      <div>
        <h4 className="font-heading font-semibold text-golden mb-3">
          Diagnostic Color & Frequency Key — GaAlAr Laser
        </h4>
        <div className="overflow-x-auto rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                {[
                  "Stage",
                  "Toxic State",
                  "Laser Spectrum",
                  "Frequency",
                  "Quantum Action",
                ].map((h) => (
                  <TableHead key={h} className="text-golden font-semibold">
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {QI_STAGES.map((s) => (
                <TableRow key={s.name} className="border-border">
                  <TableCell>
                    <StageBadge stage={s.name} />
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {s.toxicFlavor.slice(0, 50)}
                  </TableCell>
                  <TableCell className="text-xs">{s.laserSpectrum}</TableCell>
                  <TableCell className="text-xs font-mono">
                    {s.frequency}
                  </TableCell>
                  <TableCell className="text-xs">
                    {s.laserProtocol.split("(")[1]?.replace(")", "") ??
                      s.laserProtocol}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div>
        <h4 className="font-heading font-semibold text-golden mb-3">
          Conditional Formatting Color Key
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {colorKey.map((c) => (
            <div
              key={c.stage}
              className={`rounded-lg p-3 text-center ${getStageColor(c.stage)}`}
            >
              <p className="font-bold text-sm">{c.stage}</p>
              <p className="text-xs opacity-75">Fill: {c.color}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AstroVastuTab() {
  const vastuMap = [
    {
      direction: "North (N)",
      qiStage: "WIND",
      officeArea: "Entrance / Open Space",
      sujok: "Chong Mai (Vertical Flow)",
      flaw: "Heavy Storage / Toilets",
      toxic: "Business Hit: Loss of clients",
      remedy: "Keep light; use Green plants",
    },
    {
      direction: "North-East (NE)",
      qiStage: "HUMIDITY",
      officeArea: "Prayer / Creative Zone",
      sujok: "Brain / Pituitary",
      flaw: "Toilet / Kitchen / Clutter",
      toxic: "Chandra Mental Hit: Disturbances",
      remedy: "Must be clean/open for Mother energy",
    },
    {
      direction: "East (E)",
      qiStage: "HEAT",
      officeArea: "Sales / Interaction",
      sujok: "Heart / Lungs",
      flaw: "South entrance during Mars Dasha",
      toxic: "Legal pains / fund drainage",
      remedy: "Red Jasper or Copper wire",
    },
    {
      direction: "South-East (SE)",
      qiStage: "WARMNESS",
      officeArea: "Pantry / Server Room",
      sujok: "Liver / Gallbladder",
      flaw: "N/A",
      toxic: "Moderate imbalance",
      remedy: "Keep active and productive",
    },
    {
      direction: "South (S)",
      qiStage: "DRYNESS",
      officeArea: "Storage / Filing",
      sujok: "Large Intestine",
      flaw: "Borewell / Blue Color / Cut",
      toxic: "Mars Consumption: Legal pains",
      remedy: "No borewell/water; place Red Jasper",
    },
    {
      direction: "South-West (SW)",
      qiStage: "STILLNESS",
      officeArea: "Owner's Cabin (Your Seat)",
      sujok: "Spine / Kidneys",
      flaw: "Entrance / Underground Tank",
      toxic: "Rahu Consumption: Total chaos",
      remedy: "Install Rahu Yantra or heavy brass",
    },
    {
      direction: "West (W)",
      qiStage: "COLDNESS",
      officeArea: "Operations / Backend",
      sujok: "Bladder",
      flaw: "Main Entrance / Window",
      toxic: "Saturn Hit: Bank balance delays",
      remedy: "Add lead metal or heavy furniture",
    },
    {
      direction: "North-West (NW)",
      qiStage: "DARKNESS",
      officeArea: "Accounts / Reception",
      sujok: "Stomach",
      flaw: "N/A",
      toxic: "Moderate",
      remedy: "Keep organized and clear",
    },
  ];

  return (
    <div className="space-y-6">
      <InfoCard title="Medical Astro Vāstu — Sujok-Vastu Floor Plan">
        <p>
          The office floor is treated as a human hand in Sujok. The Main
          Entrance is the "mouth" of the energy flow. Each direction maps to an
          8-Stage Qi and corresponding organ system.
        </p>
        <p>
          <strong className="text-golden/80">
            Primary Direction for Practitioner:
          </strong>{" "}
          Sit in West or South-West sector, facing East or North-East.
        </p>
        <p>
          <strong className="text-golden/80">120° Angle Rule:</strong> For
          non-confrontational interactions, sit at 120° from the patient/client
          rather than direct 180° opposition.
        </p>
      </InfoCard>

      <div className="overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              {[
                "Direction",
                "8-Stage Qi",
                "Office Area",
                "Sujok Map",
                "Potential Flaw",
                "Toxic Result",
                "Remedy",
              ].map((h) => (
                <TableHead
                  key={h}
                  className="text-golden font-semibold whitespace-nowrap"
                >
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {vastuMap.map((row) => (
              <TableRow
                key={row.direction}
                className="border-border hover:bg-muted/20"
              >
                <TableCell className="font-medium text-xs text-golden/80 whitespace-nowrap">
                  {row.direction}
                </TableCell>
                <TableCell>
                  <StageBadge stage={row.qiStage} />
                </TableCell>
                <TableCell className="text-xs">{row.officeArea}</TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {row.sujok}
                </TableCell>
                <TableCell className="text-xs text-red-400">
                  {row.flaw}
                </TableCell>
                <TableCell className="text-xs">{row.toxic}</TableCell>
                <TableCell className="text-xs text-green-400 min-w-[160px]">
                  {row.remedy}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <InfoCard title="Strategic Sitting Protocol">
          <p>
            <strong className="text-golden/80">My Position:</strong> West or SW
            sector (Stillness/Earth = Authority)
          </p>
          <p>
            <strong className="text-golden/80">Facing Direction:</strong> East
            or North-East (Aligns with Sūryā Nādī / Qian energy)
          </p>
          <p>
            <strong className="text-golden/80">Patient Position:</strong> East
            or South-East facing West
          </p>
          <p>
            <strong className="text-golden/80">Optimal Angle:</strong> 120°
            Normal Degree for productive interaction
          </p>
          <p>
            <strong className="text-golden/80">Avoid:</strong> 180° Direct Hit
            (confrontational); 90° Square Hit (tension)
          </p>
        </InfoCard>
        <InfoCard title="Auspicious Muhurta Guidance">
          <p>
            <strong className="text-golden/80">Best Daily Window:</strong> 10:45
            AM – 12:15 PM (IST) — Abhijit Muhurta
          </p>
          <p>
            <strong className="text-golden/80">Best Weekly Day:</strong> Friday
            (Venus/Shukra) for wealth interactions
          </p>
          <p>
            <strong className="text-golden/80">Current Dasha Note:</strong>{" "}
            Moon-Venus combination supports business property transactions
          </p>
          <p>
            <strong className="text-golden/80">Rahu Kaal:</strong> Avoid on
            Fridays ~11:00 AM; begin talk at 10:48 AM
          </p>
          <p>
            <strong className="text-golden/80">Remedy:</strong> Wear
            white/silver; sip water (Chāndrā element) to cool negotiation Heat
          </p>
        </InfoCard>
      </div>
    </div>
  );
}

export function ReferenceLibrary() {
  return (
    <div className="p-6 space-y-4" data-ocid="reference_library.page">
      <div>
        <h1 className="font-heading text-2xl font-bold text-golden">
          Reference Library
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Clinical reference materials for practitioners
        </p>
      </div>

      <Tabs defaultValue="pulse" data-ocid="reference_library.tab">
        <TabsList className="bg-card border border-border flex-wrap h-auto gap-1 p-1 mb-4">
          {[
            ["pulse", "Pulse Dx"],
            ["elements", "5 Elements"],
            ["trigrams", "Trigrams"],
            ["iching", "I Ching"],
            ["acupuncture", "Acupuncture"],
            ["pma", "PMA Guide"],
            ["triorigin", "Triorigin"],
            ["vessels", "Ext. Vessels"],
            ["hexmatrix", "Hex Matrix"],
            ["drtung", "Dr. Tung"],
            ["hittheory", "Hit Theory"],
            ["astrovastu", "Astro Vastu"],
          ].map(([v, label]) => (
            <TabsTrigger
              key={v}
              value={v}
              data-ocid={`reference_library.${v}.tab`}
              className="data-[state=active]:bg-golden data-[state=active]:text-primary-foreground text-xs"
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="pulse">
          <PulseDiagnosis />
        </TabsContent>
        <TabsContent value="elements">
          <FiveElements />
        </TabsContent>
        <TabsContent value="trigrams">
          <EightTrigrams />
        </TabsContent>
        <TabsContent value="iching">
          <IChing />
        </TabsContent>
        <TabsContent value="acupuncture">
          <AcupunctureRef />
        </TabsContent>
        <TabsContent value="pma">
          <PMAGuide />
        </TabsContent>
        <TabsContent value="triorigin">
          <TrioriginTab />
        </TabsContent>
        <TabsContent value="vessels">
          <ExtVesselsTab />
        </TabsContent>
        <TabsContent value="hexmatrix">
          <HexMatrixTab />
        </TabsContent>
        <TabsContent value="drtung">
          <DrTungTab />
        </TabsContent>
        <TabsContent value="hittheory">
          <HitTheoryTab />
        </TabsContent>
        <TabsContent value="astrovastu">
          <AstroVastuTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
