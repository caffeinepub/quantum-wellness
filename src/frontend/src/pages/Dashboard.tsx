import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "@tanstack/react-router";
import { Activity, Atom, Calendar, Plus, UserCheck, Users } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  EXTRAORDINARY_VESSELS,
  QI_STAGES,
  getActiveQiStage,
  getStageColor,
} from "../data/quantumData";
import { usePatients, useSessions } from "../hooks/useQueries";

export function Dashboard() {
  const navigate = useNavigate();
  const { data: patients = [] } = usePatients();
  const { data: sessions = [] } = useSessions();

  const today = new Date().toISOString().split("T")[0];
  const activeToday = sessions.filter((s) => s.date === today).length;

  const recentSessions = [...sessions].slice(-5).reverse();
  const recentPatients = [...patients].slice(-5).reverse();

  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const istHour = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
  ).getHours();
  const stageName = getActiveQiStage(istHour);
  const activeStage = QI_STAGES.find((s) => s.name === stageName);
  const activeVessel = EXTRAORDINARY_VESSELS.find((v) => v.phase === stageName);
  const stageColor = getStageColor(stageName);

  return (
    <div className="p-6 space-y-6" data-ocid="dashboard.page">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-golden">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Overview of your practice
          </p>
        </div>
        <div className="flex items-center gap-3">
          <img
            src="/assets/uploads/screenshot_20260319_044050-019d1d12-e025-73cb-9547-d73ee90a9e4e-1.jpg"
            alt="Quantum Wellness Logo 1"
            style={{ height: 60, objectFit: "contain" }}
            className="rounded"
          />
          <img
            src="/assets/uploads/incollage_20260319_050835977-019d1d13-1216-717c-aed3-5b27fd0e0c0d-7.jpg"
            alt="Quantum Wellness Logo 2"
            style={{ height: 60, objectFit: "contain" }}
            className="rounded"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            label: "Total Patients",
            value: patients.length,
            icon: Users,
            color: "text-blue-400",
          },
          {
            label: "Total Sessions",
            value: sessions.length,
            icon: Calendar,
            color: "text-purple-400",
          },
          {
            label: "Active Today",
            value: activeToday,
            icon: Activity,
            color: "text-golden",
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                    <p
                      className={`text-3xl font-heading font-bold mt-1 ${stat.color}`}
                    >
                      {stat.value}
                    </p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color} opacity-70`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3">
        <Button
          data-ocid="dashboard.patients.primary_button"
          onClick={() => navigate({ to: "/patients" })}
          variant="outline"
          className="border-border text-foreground hover:bg-muted"
        >
          <Users className="w-4 h-4 mr-2" /> Patients
        </Button>
        <Button
          data-ocid="dashboard.new_session.primary_button"
          onClick={() => navigate({ to: "/new-session" })}
          className="bg-golden text-primary-foreground hover:opacity-90"
        >
          <Plus className="w-4 h-4 mr-2" /> New Session
        </Button>
        <Button
          data-ocid="dashboard.quantum.secondary_button"
          onClick={() => navigate({ to: "/quantum" })}
          variant="outline"
          className="border-purple-500/50 text-purple-300 hover:bg-purple-900/20"
        >
          <Atom className="w-4 h-4 mr-2" /> Quantum Dx
        </Button>
      </div>

      {/* Quantum Singularity Active Protocol */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-card border-border border-golden/20">
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-base text-golden flex items-center gap-2">
              <Atom className="w-4 h-4" />
              Quantum Singularity — Active Protocol
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3 items-start">
              <div
                className={`rounded-lg px-4 py-3 ${stageColor} flex flex-col items-center min-w-[100px]`}
              >
                <p className="text-xs opacity-70 mb-0.5">Active Stage</p>
                <p className="font-heading font-bold text-lg">{stageName}</p>
                <p className="text-xs opacity-70">{activeStage?.trigram}</p>
              </div>
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">
                    Active Vessel
                  </p>
                  <p className="font-semibold text-golden text-xs">
                    {activeStage?.vessel}
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">
                    Master Point
                  </p>
                  <p className="font-semibold text-xs">
                    {activeVessel?.master ?? "—"}
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">
                    Time Window
                  </p>
                  <p className="font-semibold text-xs">{activeStage?.time}</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">
                    Singularity
                  </p>
                  <p className="font-semibold text-xs text-golden/80">
                    {activeStage?.singularity}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-3 rounded-lg bg-muted/20 border border-border p-3">
              <p className="text-xs text-muted-foreground mb-1">
                GaAlAr Laser Protocol
              </p>
              <p className="text-sm text-golden">
                {activeStage?.laserProtocol}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Spectrum: {activeStage?.laserSpectrum} ·{" "}
                {activeStage?.frequency}
              </p>
            </div>
            <div className="mt-3 flex gap-3">
              <div className="flex-1 rounded-lg bg-orange-950/40 border border-orange-800/30 p-2.5 text-center">
                <p className="text-xs text-orange-400 font-semibold">
                  Du Mai — White Hole ☰
                </p>
                <p className="text-xs text-orange-200/70">
                  Emission · Bit 111 · Sūryā
                </p>
              </div>
              <div className="flex-1 rounded-lg bg-blue-950/40 border border-blue-800/30 p-2.5 text-center">
                <p className="text-xs text-blue-400 font-semibold">
                  Ren Mai — Black Hole ☷
                </p>
                <p className="text-xs text-blue-200/70">
                  Absorption · Bit 000 · Chāndrā
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-heading text-base text-golden">
              Recent Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentSessions.length === 0 ? (
              <p
                className="text-sm text-muted-foreground"
                data-ocid="sessions.empty_state"
              >
                No sessions yet.
              </p>
            ) : (
              <div className="space-y-2">
                {recentSessions.map((s, i) => {
                  const patient = patients.find((p) => p.id === s.patientId);
                  return (
                    <div
                      key={String(s.id)}
                      className="flex items-center justify-between py-1.5 border-b border-border last:border-0"
                      data-ocid={`sessions.item.${i + 1}`}
                    >
                      <div>
                        <p className="text-sm font-medium">
                          {patient?.name ?? "Unknown"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {s.date}
                        </p>
                      </div>
                      <span className="text-xs text-golden">
                        {s.modalities.slice(0, 2).join(", ")}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-heading text-base text-golden">
              Recent Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentPatients.length === 0 ? (
              <p
                className="text-sm text-muted-foreground"
                data-ocid="patients.empty_state"
              >
                No patients yet.
              </p>
            ) : (
              <div className="space-y-2">
                {recentPatients.map((p, i) => (
                  <div
                    key={String(p.id)}
                    className="flex items-center gap-3 py-1.5 border-b border-border last:border-0"
                    data-ocid={`recent_patients.item.${i + 1}`}
                  >
                    <UserCheck className="w-4 h-4 text-golden flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {p.gender}, {String(p.age)} yrs
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Protocol description */}
      <Card className="bg-card border-border border-golden/20">
        <CardHeader>
          <CardTitle className="font-heading text-base text-golden">
            About Quantum Wellness Protocol
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The Quantum Wellness Bio-Photonic Platform integrates cutting-edge
            PMA scanning, Bio-Resonanz Laser therapy, Thermal IR analysis, and
            traditional healing modalities including Acupuncture, TCM meridian
            analysis, Ayurvedic doshas, and I Ching / Ba Gua energetic mapping.
            Each session captures comprehensive bio-photonic data to support
            holistic practitioner assessments.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
