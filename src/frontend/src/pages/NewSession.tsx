import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  BIT_TO_STAGE,
  HEX_MATRIX,
  MERIDIANS_DATA,
  STAGE_WEIGHTS,
  getStageColor,
} from "../data/quantumData";
import { useAddSession, usePatients } from "../hooks/useQueries";
import type { MeridianReading } from "../hooks/useQueries";

const MODALITIES = [
  "PMA Scan",
  "Bio-Reasonanz Laser",
  "Thermal IR Scan",
  "Acupuncture",
  "Massage Therapy",
  "Meditation",
  "Nutritional Counseling",
  "Other",
];

const MERIDIANS = [
  "GB-Gallbladder",
  "LR-Liver",
  "ST-Stomach",
  "SP-Spleen",
  "BL-Bladder",
  "KI-Kidney",
  "SI-Small Intestine",
  "HT-Heart",
  "LI-Large Intestine",
  "LU-Lung",
  "TE-Triple Energizer",
  "PC-Pericardium",
];

// Map full meridian names to their codes
const MERIDIAN_CODE_MAP: Record<string, string> = {
  "GB-Gallbladder": "GB",
  "LR-Liver": "LR",
  "ST-Stomach": "ST",
  "SP-Spleen": "SP",
  "BL-Bladder": "UB",
  "KI-Kidney": "KI",
  "SI-Small Intestine": "SI",
  "HT-Heart": "HT",
  "LI-Large Intestine": "LI",
  "LU-Lung": "LU",
  "TE-Triple Energizer": "TE",
  "PC-Pericardium": "PC",
};

type MeridianRow = {
  qi: string;
  pitta: string;
  kapha: string;
  vata: string;
  acidBase: string;
  upperBit: string;
  lowerBit: string;
};

const emptyMeridian: MeridianRow = {
  qi: "50",
  pitta: "50",
  kapha: "50",
  vata: "50",
  acidBase: "0",
  upperBit: "",
  lowerBit: "",
};

function StageBadge({ stage }: { stage: string }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${getStageColor(stage)}`}
    >
      {stage}
    </span>
  );
}

export function NewSession() {
  const { data: patients = [] } = usePatients();
  const addSession = useAddSession();

  const [patientId, setPatientId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [modalities, setModalities] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [readings, setReadings] = useState<Record<string, MeridianRow>>(
    Object.fromEntries(MERIDIANS.map((m) => [m, { ...emptyMeridian }])),
  );

  function toggleModality(m: string) {
    setModalities((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m],
    );
  }

  function setReadingField(
    meridian: string,
    field: keyof MeridianRow,
    value: string,
  ) {
    if (field === "upperBit" || field === "lowerBit") {
      if (!/^[01]{0,3}$/.test(value)) return;
    }
    setReadings((prev) => ({
      ...prev,
      [meridian]: { ...prev[meridian], [field]: value },
    }));
  }

  function getHex(m: string) {
    const { upperBit, lowerBit } = readings[m];
    if (upperBit.length === 3 && lowerBit.length === 3)
      return upperBit + lowerBit;
    return "";
  }

  function getStage(m: string) {
    const { upperBit } = readings[m];
    if (upperBit.length === 3) return BIT_TO_STAGE[upperBit] ?? "";
    return "";
  }

  function getDiagnosis(m: string) {
    const hex = getHex(m);
    if (!hex) return "";
    return (
      HEX_MATRIX.find((h) => h.hex === hex)?.diagnosis ?? "Analyze via 120° Law"
    );
  }

  function getMeridianRef(m: string) {
    const code = MERIDIAN_CODE_MAP[m];
    return MERIDIANS_DATA.find((d) => d.code === code);
  }

  // Bio-Field Health % from bit entries
  const enteredMeridians = MERIDIANS.filter(
    (m) => readings[m].upperBit.length === 3,
  );
  const healthPct =
    enteredMeridians.length > 0
      ? Math.round(
          (enteredMeridians.reduce(
            (sum, m) => sum + (STAGE_WEIGHTS[getStage(m)] ?? 5),
            0,
          ) /
            (enteredMeridians.length * 10)) *
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

  async function handleSave() {
    if (!patientId) {
      toast.error("Please select a patient");
      return;
    }
    const meridianReadings: MeridianReading[] = MERIDIANS.map((name) => ({
      meridianName: name,
      qi: BigInt(readings[name].qi || "0"),
      pitta: BigInt(readings[name].pitta || "0"),
      kapha: BigInt(readings[name].kapha || "0"),
      vata: BigInt(readings[name].vata || "0"),
      acidBase: BigInt(readings[name].acidBase || "0"),
    }));
    try {
      await addSession.mutateAsync({
        patientId: BigInt(patientId),
        date,
        modalities,
        meridianReadings,
        notes,
      });
      toast.success("Session saved successfully");
      setPatientId("");
      setModalities([]);
      setNotes("");
      setReadings(
        Object.fromEntries(MERIDIANS.map((m) => [m, { ...emptyMeridian }])),
      );
    } catch {
      toast.error("Failed to save session");
    }
  }

  return (
    <div className="p-6 space-y-6" data-ocid="new_session.page">
      <div>
        <h1 className="font-heading text-2xl font-bold text-golden">
          New Session
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Record a new patient treatment session
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Patient *</Label>
          <Select value={patientId} onValueChange={setPatientId}>
            <SelectTrigger
              data-ocid="new_session.patient.select"
              className="bg-input border-border"
            >
              <SelectValue placeholder="Select patient..." />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {patients.map((p) => (
                <SelectItem key={String(p.id)} value={String(p.id)}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="session-date">Session Date</Label>
          <Input
            id="session-date"
            data-ocid="new_session.date.input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-input border-border"
          />
        </div>
      </div>

      {/* Modalities */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="font-heading text-base text-golden">
            Modalities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {MODALITIES.map((m) => (
              <div key={m} className="flex items-center gap-2">
                <Checkbox
                  id={`mod-${m}`}
                  data-ocid={`new_session.${m.toLowerCase().replace(/ /g, "_")}.checkbox`}
                  checked={modalities.includes(m)}
                  onCheckedChange={() => toggleModality(m)}
                  className="border-border data-[state=checked]:bg-golden data-[state=checked]:border-golden"
                />
                <Label htmlFor={`mod-${m}`} className="text-sm cursor-pointer">
                  {m}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Meridian Readings */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="font-heading text-base text-golden">
              Meridian Readings
            </CardTitle>
            {healthPct !== null && (
              <div className="text-right">
                <p className="text-xs text-muted-foreground">
                  Bio-Field Health
                </p>
                <p className={`text-xl font-heading font-bold ${healthColor}`}>
                  {healthPct}%
                </p>
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Upper Bit = +ve / Acidic peaks above baseline · Lower Bit = -ve /
            Alkaline depth below baseline
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table data-ocid="new_session.meridian.table">
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground font-medium w-40">
                    Meridian
                  </TableHead>
                  <TableHead className="text-muted-foreground font-medium text-center">
                    Qi
                  </TableHead>
                  <TableHead className="text-muted-foreground font-medium text-center">
                    Pitta
                  </TableHead>
                  <TableHead className="text-muted-foreground font-medium text-center">
                    Kapha
                  </TableHead>
                  <TableHead className="text-muted-foreground font-medium text-center">
                    Vata
                  </TableHead>
                  <TableHead className="text-muted-foreground font-medium text-center">
                    Acid-Base
                  </TableHead>
                  <TableHead className="text-purple-300 font-medium text-center">
                    Upper Bit
                  </TableHead>
                  <TableHead className="text-blue-300 font-medium text-center">
                    Lower Bit
                  </TableHead>
                  <TableHead className="text-muted-foreground font-medium">
                    Hex
                  </TableHead>
                  <TableHead className="text-muted-foreground font-medium">
                    Qi Stage
                  </TableHead>
                  <TableHead className="text-muted-foreground font-medium min-w-[160px]">
                    Diagnosis
                  </TableHead>
                  <TableHead className="text-green-400 font-medium">
                    Tonify
                  </TableHead>
                  <TableHead className="text-red-400 font-medium">
                    Sedate
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MERIDIANS.map((m, i) => {
                  const stage = getStage(m);
                  const hex = getHex(m);
                  const diag = getDiagnosis(m);
                  const ref = getMeridianRef(m);
                  return (
                    <TableRow
                      key={m}
                      className="border-border"
                      data-ocid={`new_session.meridian.row.${i + 1}`}
                    >
                      <TableCell className="font-medium text-xs text-golden/80">
                        {m}
                      </TableCell>
                      {(
                        ["qi", "pitta", "kapha", "vata", "acidBase"] as const
                      ).map((field) => (
                        <TableCell key={field} className="p-1">
                          <Input
                            type="number"
                            value={readings[m][field]}
                            onChange={(e) =>
                              setReadingField(m, field, e.target.value)
                            }
                            className="bg-input border-border text-center h-8 text-xs w-16 mx-auto"
                            min={field === "acidBase" ? -100 : 0}
                            max={100}
                          />
                        </TableCell>
                      ))}
                      {/* Upper Bit */}
                      <TableCell className="p-1">
                        <Input
                          value={readings[m].upperBit}
                          onChange={(e) =>
                            setReadingField(m, "upperBit", e.target.value)
                          }
                          placeholder="001"
                          maxLength={3}
                          className="bg-input border-purple-800/50 text-center h-8 text-xs w-16 mx-auto font-mono"
                          data-ocid={`new_session.${m.replace(/-.*/, "").toLowerCase()}.upper.input`}
                        />
                      </TableCell>
                      {/* Lower Bit */}
                      <TableCell className="p-1">
                        <Input
                          value={readings[m].lowerBit}
                          onChange={(e) =>
                            setReadingField(m, "lowerBit", e.target.value)
                          }
                          placeholder="010"
                          maxLength={3}
                          className="bg-input border-blue-800/50 text-center h-8 text-xs w-16 mx-auto font-mono"
                          data-ocid={`new_session.${m.replace(/-.*/, "").toLowerCase()}.lower.input`}
                        />
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {hex || "—"}
                      </TableCell>
                      <TableCell>
                        {stage ? (
                          <StageBadge stage={stage} />
                        ) : (
                          <span className="text-muted-foreground text-xs">
                            —
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-xs min-w-[140px]">
                        {diag || (
                          <span className="text-muted-foreground">
                            Enter bits
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-xs text-green-400">
                        {stage ? ref?.tonify : "—"}
                      </TableCell>
                      <TableCell className="text-xs text-red-400">
                        {stage ? ref?.sedate : "—"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <div className="space-y-1.5">
        <Label htmlFor="session-notes">Session Notes</Label>
        <Textarea
          id="session-notes"
          data-ocid="new_session.notes.textarea"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Treatment observations, patient feedback..."
          rows={4}
          className="bg-input border-border resize-none"
        />
      </div>

      <Button
        data-ocid="new_session.save.submit_button"
        onClick={handleSave}
        disabled={addSession.isPending}
        className="bg-golden text-primary-foreground hover:opacity-90 w-full md:w-auto"
      >
        {addSession.isPending ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : null}
        {addSession.isPending ? "Saving Session..." : "Save Session"}
      </Button>
    </div>
  );
}
