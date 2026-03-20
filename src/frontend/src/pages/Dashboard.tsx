import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "@tanstack/react-router";
import { Activity, Calendar, Plus, UserCheck, Users } from "lucide-react";
import { motion } from "motion/react";
import { usePatients, useSessions } from "../hooks/useQueries";

export function Dashboard() {
  const navigate = useNavigate();
  const { data: patients = [] } = usePatients();
  const { data: sessions = [] } = useSessions();

  const today = new Date().toISOString().split("T")[0];
  const activeToday = sessions.filter((s) => s.date === today).length;

  const recentSessions = [...sessions].slice(-5).reverse();
  const recentPatients = [...patients].slice(-5).reverse();

  return (
    <div className="p-6 space-y-6" data-ocid="dashboard.page">
      <div>
        <h1 className="font-heading text-2xl font-bold text-golden">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Overview of your practice
        </p>
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
      </div>

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
