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
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-golden/10 border border-golden/30 mb-4">
            <span className="text-2xl">⚕</span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-golden tracking-tight">
            Quantum Wellness
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Quantum Bio-Photonic Workstation
          </p>
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
            className="underline hover:text-golden"
            target="_blank"
            rel="noreferrer"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}
