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
import { motion } from "motion/react";
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
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border bg-card overflow-hidden"
    >
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
    </motion.div>
  );
}

function QuantumSingularityPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Du Mai White Hole */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="rounded-xl border border-orange-500/40 bg-gradient-to-br from-orange-950/60 to-yellow-950/40 p-5 shadow-[0_0_30px_rgba(249,115,22,0.15)]"
      >
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
      </motion.div>

      {/* Center Wormhole */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border border-purple-500/30 bg-gradient-to-b from-purple-950/60 to-indigo-950/60 p-5 flex flex-col items-center justify-center text-center"
      >
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
            Stabilize Solenoid flow so the 12 meridians don\'t burn out
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
      </motion.div>

      {/* Ren Mai Black Hole */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-950/60 to-slate-950/60 p-5 shadow-[0_0_30px_rgba(59,130,246,0.1)]"
      >
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
      </motion.div>
    </div>
  );
}

type BitState = { upper: string; lower: string };

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
            </TableRow>
          </TableHeader>
          <TableBody>
            {MERIDIANS_DATA.map((m, i) => {
              const stage = getStage(m.code);
              const hex = getHex(m.code);
              const diag = getDiagnosis(m.code);
              const mer = getMeridian(m.code);
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
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
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
          <motion.div
            className={`h-4 rounded-full ${barColor}`}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8 }}
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
                12 Meridian Pulse Bit Entry — Auto-Diagnosis
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
