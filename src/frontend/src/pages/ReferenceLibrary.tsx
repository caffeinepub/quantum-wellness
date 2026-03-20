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
      taste: "Sour",
    },
    {
      element: "Fire 火",
      organ: "Heart / Small Intestine",
      emotion: "Joy / Anxiety",
      season: "Summer",
      time: "11am–3pm",
      color: "Red",
      taste: "Bitter",
    },
    {
      element: "Earth 土",
      organ: "Spleen / Stomach",
      emotion: "Worry / Pensiveness",
      season: "Late Summer",
      time: "7am–11am",
      color: "Yellow",
      taste: "Sweet",
    },
    {
      element: "Metal 金",
      organ: "Lung / Large Intestine",
      emotion: "Grief / Sadness",
      season: "Autumn",
      time: "3am–7am",
      color: "White",
      taste: "Pungent",
    },
    {
      element: "Water 水",
      organ: "Kidney / Bladder",
      emotion: "Fear / Willpower",
      season: "Winter",
      time: "3pm–7pm",
      color: "Black/Blue",
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
                <TableCell>{row.color}</TableCell>
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
      <InfoCard title="Vedic Chakra Mapping">
        <p>
          <strong className="text-golden/80">Muladhara (Root):</strong> Kun —
          Earth, Stability, Survival, Foundation
        </p>
        <p>
          <strong className="text-golden/80">Svadhisthana (Sacral):</strong>{" "}
          Kan/Dui — Water, Creativity, Emotion
        </p>
        <p>
          <strong className="text-golden/80">Manipura (Solar Plexus):</strong>{" "}
          Zhen — Thunder, Will, Power
        </p>
        <p>
          <strong className="text-golden/80">Anahata (Heart):</strong> Xun —
          Wind, Love, Compassion
        </p>
        <p>
          <strong className="text-golden/80">Vishuddha (Throat):</strong> Gen —
          Mountain, Expression, Truth
        </p>
        <p>
          <strong className="text-golden/80">Ajna (Third Eye):</strong> Li —
          Fire, Intuition, Clarity
        </p>
        <p>
          <strong className="text-golden/80">Sahasrara (Crown):</strong> Qian —
          Heaven, Cosmic Consciousness
        </p>
      </InfoCard>
    </div>
  );
}

function IChing() {
  return (
    <div>
      <SectionTitle>I Ching — 64 Hexagrams</SectionTitle>
      <InfoCard title="Overview">
        <p>
          The I Ching (易經, Book of Changes) is one of the oldest Chinese
          classical texts and a fundamental reference in Taoist and Confucian
          philosophy. It comprises 64 hexagrams, each formed by combining two of
          the eight trigrams (Ba Gua).
        </p>
        <p>
          Each hexagram represents a state of change or transition in nature,
          human affairs, and cosmic principles. In bio-energetic practice,
          hexagram resonance is used to identify energetic patterns in meridian
          flow.
        </p>
      </InfoCard>
      <InfoCard title="Hexagram Structure">
        <p>
          <strong className="text-golden/80">Upper Trigram:</strong>{" "}
          Heaven/External forces, current environment
        </p>
        <p>
          <strong className="text-golden/80">Lower Trigram:</strong>{" "}
          Earth/Internal forces, inner state
        </p>
        <p>
          <strong className="text-golden/80">Moving Lines:</strong> Indicate
          transformation and transition points
        </p>
        <p>
          <strong className="text-golden/80">Nuclear Hexagram:</strong> Hidden
          core energies (lines 2-5)
        </p>
      </InfoCard>
      <InfoCard title="Key Hexagrams in Clinical Context">
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
          <strong className="text-golden/80">Hexagram 29 (☵☵ Kan):</strong>{" "}
          Abyss/Water, kidney stress, fear patterns
        </p>
        <p>
          <strong className="text-golden/80">Hexagram 30 (☲☲ Li):</strong>{" "}
          Fire/Clarity, heart excess, inflammation
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
        <p>
          <strong className="text-golden/80">Front-Mu Points:</strong> Alarm
          points, diagnostic and treatment
        </p>
        <p>
          <strong className="text-golden/80">
            Eight Extraordinary Vessels:
          </strong>{" "}
          Deep constitutional treatment
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
      <InfoCard title="Dosha Balance Targets">
        <p>
          <strong className="text-golden/80">Vata (Air/Ether):</strong> 45-55
          optimal; below 40 — depleted nervous system; above 65 —
          anxiety/erratic energy
        </p>
        <p>
          <strong className="text-golden/80">Pitta (Fire/Water):</strong> 45-55
          optimal; below 40 — low metabolism; above 65 — inflammation/excess
          heat
        </p>
        <p>
          <strong className="text-golden/80">Kapha (Earth/Water):</strong> 45-55
          optimal; below 40 — depleted fluids; above 65 —
          congestion/sluggishness
        </p>
      </InfoCard>
      <InfoCard title="Acid-Base Scale">
        <p>
          <strong className="text-golden/80">-100 to -30 (Acidic):</strong>{" "}
          Toxic load, inflammation, excess Yang
        </p>
        <p>
          <strong className="text-golden/80">-29 to +29 (Neutral):</strong>{" "}
          Balanced metabolic environment
        </p>
        <p>
          <strong className="text-golden/80">+30 to +100 (Alkaline):</strong>{" "}
          Yin excess, cold pattern, reduced metabolic function
        </p>
      </InfoCard>
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
          <TabsTrigger
            value="pulse"
            data-ocid="reference_library.pulse.tab"
            className="data-[state=active]:bg-golden data-[state=active]:text-primary-foreground"
          >
            Pulse Diagnosis
          </TabsTrigger>
          <TabsTrigger
            value="elements"
            data-ocid="reference_library.elements.tab"
            className="data-[state=active]:bg-golden data-[state=active]:text-primary-foreground"
          >
            Five Elements
          </TabsTrigger>
          <TabsTrigger
            value="trigrams"
            data-ocid="reference_library.trigrams.tab"
            className="data-[state=active]:bg-golden data-[state=active]:text-primary-foreground"
          >
            Eight Trigrams
          </TabsTrigger>
          <TabsTrigger
            value="iching"
            data-ocid="reference_library.iching.tab"
            className="data-[state=active]:bg-golden data-[state=active]:text-primary-foreground"
          >
            I Ching
          </TabsTrigger>
          <TabsTrigger
            value="acupuncture"
            data-ocid="reference_library.acupuncture.tab"
            className="data-[state=active]:bg-golden data-[state=active]:text-primary-foreground"
          >
            Acupuncture
          </TabsTrigger>
          <TabsTrigger
            value="pma"
            data-ocid="reference_library.pma.tab"
            className="data-[state=active]:bg-golden data-[state=active]:text-primary-foreground"
          >
            PMA Guide
          </TabsTrigger>
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
      </Tabs>
    </div>
  );
}
