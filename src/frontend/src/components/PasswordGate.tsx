import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

const AUTH_KEY = "qw_auth";
const PASSWORD = "QuantumWellness2026";

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem(AUTH_KEY) === "true") {
      setAuthenticated(true);
    }
    setChecking(false);
  }, []);

  if (checking) return null;
  if (authenticated) return <>{children}</>;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, "true");
      setAuthenticated(true);
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-6">
          {/* WHO Logo + App Logos row */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <img
              src="/assets/generated/who-logo-transparent.dim_200x200.png"
              alt="WHO Logo"
              style={{ height: 110, objectFit: "contain" }}
              className="rounded"
            />
            <img
              src="/assets/uploads/screenshot_20260319_044050-019d1d12-e025-73cb-9547-d73ee90a9e4e-1.jpg"
              alt="Quantum Wellness Logo 1"
              style={{ height: 130, objectFit: "contain" }}
              className="rounded"
            />
            <img
              src="/assets/uploads/incollage_20260319_050835977-019d1d13-1216-717c-aed3-5b27fd0e0c0d-7.jpg"
              alt="Quantum Wellness Logo 2"
              style={{ height: 130, objectFit: "contain" }}
              className="rounded"
            />
          </div>

          <h1 className="font-heading text-3xl font-bold text-golden tracking-tight">
            Quantum Wellness
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Quantum Bio-Photonic Workstation
          </p>

          {/* WHO Credentials */}
          <div className="mt-3 border border-blue-500/50 rounded-lg px-4 py-3 bg-blue-950/20 text-xs text-center space-y-1">
            <p className="font-bold text-blue-300 text-sm">
              🌐 WHO Sponsored Scientist
            </p>
            <p className="text-blue-200/90 leading-relaxed">
              MEDICINA ALTERNATIVA INTERNATIONAL — ALMA ATA, USSR
              <br />
              S.I.A. Paris &nbsp;·&nbsp; EMLA &nbsp;·&nbsp; LLLT &nbsp;·&nbsp;
              HLLT
              <br />
              European Union's Bioreasonanz Cosmo Energetic Oscillator Waves
              <br />
              <span className="font-semibold">
                Relationship Bäläncér Prötöcöls Developer
              </span>
            </p>
          </div>

          {/* Description block */}
          <div className="mt-4 text-xs text-muted-foreground/90 leading-relaxed text-center space-y-2 px-2">
            <p>
              Hidden Okareshwar ArdhNarishwar Bio-Photonic, Bio-Reasonanz Cosmo
              Energetic Oscillator Waves
              <br />
              Space Medicine's Scientific Vedantic Yogic Ayurvedic Tibetan
              Herbal Homeopathic Reformatted
              <br />
              Hardly 10% usage of Allopathic Medicine's for Successful
              Diagnosis, Prognosis, Preventive,
              <br />
              Curative, Medikamente Testen — to know in advance before intake
              any Medicine's effects &amp;
              <br />
              side effects, therapeutic protocols for incurable Diseases where
              ever any other therapies
              <br />
              had been failed or Collapsed....
            </p>
            <p className="font-bold text-golden/90 tracking-wide text-sm">
              SEA &amp; OBSERVE THE RESULTS WITHIN 4 DAYS
            </p>
          </div>

          {/* Contact box */}
          <div className="mt-4 border border-yellow-500/60 rounded-lg px-4 py-3 bg-yellow-950/20 text-xs text-center space-y-1">
            <p className="font-semibold text-golden">
              Contact Dr. Ravindra Jayant
            </p>
            <p className="text-muted-foreground">
              <a
                href="mailto:dr_ravindra99@rediffmail.com"
                className="hover:text-golden underline"
              >
                dr_ravindra99@rediffmail.com
              </a>
            </p>
            <p className="text-muted-foreground">
              WhatsApp: 00 91 98251 35559 &amp; 00 91 87359 43559
            </p>
          </div>
        </div>

        <Card className="bg-card border-border shadow-xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-center text-foreground/80">
              Enter Access Password
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="bg-background border-border text-center tracking-widest"
                autoFocus
                data-ocid="password_gate.input"
              />
              {error && (
                <p
                  className="text-xs text-red-400 text-center"
                  data-ocid="password_gate.error_state"
                >
                  {error}
                </p>
              )}
              <Button
                type="submit"
                className="w-full bg-golden text-primary-foreground hover:bg-golden/90 font-semibold"
                data-ocid="password_gate.submit_button"
              >
                Enter
              </Button>
            </form>
          </CardContent>
        </Card>
        <p className="text-center text-xs text-muted-foreground mt-6">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-golden"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}
