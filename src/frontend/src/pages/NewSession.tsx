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

type MeridianRow = {
  qi: string;
  pitta: string;
  kapha: string;
  vata: string;
  acidBase: string;
};

const emptyMeridian: MeridianRow = {
  qi: "50",
  pitta: "50",
  kapha: "50",
  vata: "50",
  acidBase: "0",
};

function getDiagnosis(val: string): "Acidic" | "Base" | "Neutral" {
  const n = Number.parseFloat(val);
  if (Number.isNaN(n) || n === 0) return "Neutral";
  return n < 0 ? "Acidic" : "Base";
}

function DiagnosisBadge({ value }: { value: string }) {
  const diagnosis = getDiagnosis(value);
  if (diagnosis === "Acidic") {
    return (
      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/40">
        Acidic
      </span>
    );
  }
  if (diagnosis === "Base") {
    return (
      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
        Base
      </span>
    );
  }
  return (
    <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-semibold bg-muted text-muted-foreground">
      Neutral
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
    setReadings((prev) => ({
      ...prev,
      [meridian]: { ...prev[meridian], [field]: value },
    }));
  }

  // Compute summary counts live
  const diagnosisCounts = MERIDIANS.reduce(
    (acc, m) => {
      const d = getDiagnosis(readings[m].acidBase);
      acc[d] = (acc[d] ?? 0) + 1;
      return acc;
    },
    { Acidic: 0, Base: 0, Neutral: 0 } as Record<string, number>,
  );

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
        <CardHeader>
          <CardTitle className="font-heading text-base text-golden">
            Meridian Readings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table data-ocid="new_session.meridian.table">
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground font-medium w-44">
                    Meridian
                  </TableHead>
                  <TableHead className="text-muted-foreground font-medium text-center">
                    Qi (0-100)
                  </TableHead>
                  <TableHead className="text-muted-foreground font-medium text-center">
                    Pitta (0-100)
                  </TableHead>
                  <TableHead className="text-muted-foreground font-medium text-center">
                    Kapha (0-100)
                  </TableHead>
                  <TableHead className="text-muted-foreground font-medium text-center">
                    Vata (0-100)
                  </TableHead>
                  <TableHead className="text-muted-foreground font-medium text-center">
                    Acid-Base (– Acidic / + Base)
                  </TableHead>
                  <TableHead className="text-muted-foreground font-medium text-center">
                    Diagnosis
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MERIDIANS.map((m, i) => (
                  <TableRow
                    key={m}
                    className="border-border"
                    data-ocid={`new_session.meridian.row.${i + 1}`}
                  >
                    <TableCell className="font-medium text-sm text-golden/80">
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
                          className="bg-input border-border text-center h-8 text-sm w-20 mx-auto"
                          min={field === "acidBase" ? -100 : 0}
                          max={100}
                        />
                      </TableCell>
                    ))}
                    <TableCell className="text-center">
                      <DiagnosisBadge value={readings[m].acidBase} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Diagnosis Summary */}
      <Card
        className="bg-card border-border"
        data-ocid="new_session.diagnosis.card"
      >
        <CardHeader className="pb-3">
          <CardTitle className="font-heading text-base text-golden">
            Meridian Diagnosis Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="text-sm font-semibold text-red-400">
                Acidic: {diagnosisCounts.Acidic}
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-sm font-semibold text-emerald-400">
                Base: {diagnosisCounts.Base}
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted border border-border">
              <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/50" />
              <span className="text-sm font-semibold text-muted-foreground">
                Neutral: {diagnosisCounts.Neutral}
              </span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Values below 0 = Acidic (excess energy), above 0 = Base (deficient
            energy)
          </p>
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
