import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { usePractitioner, useSetPractitioner } from "../hooks/useQueries";

const MODALITIES_LIST = [
  "PMA (Photon Meridian Analysis)",
  "Bio-Reasonanz Laser Therapy",
  "Thermal Infrared Scanning",
  "Traditional Acupuncture",
  "TCM Meridian Analysis",
  "Ayurvedic Dosha Assessment",
  "I Ching Energetic Mapping",
  "Ba Gua Trigram Analysis",
  "Meditation & Mindfulness",
  "Nutritional Counseling",
  "Massage Therapy",
];

export function Profile() {
  const { data: practitioner, isLoading } = usePractitioner();
  const setPractitioner = useSetPractitioner();

  const [name, setName] = useState("");
  const [role, setRole] = useState("Practitioner");

  useEffect(() => {
    if (practitioner) {
      setName(practitioner.name);
      setRole(practitioner.role || "Practitioner");
    }
  }, [practitioner]);

  async function handleSave() {
    try {
      await setPractitioner.mutateAsync({ name, role });
      toast.success("Profile saved successfully");
    } catch {
      toast.error("Failed to save profile");
    }
  }

  return (
    <div className="p-6 space-y-6 max-w-2xl" data-ocid="profile.page">
      <div>
        <h1 className="font-heading text-2xl font-bold text-golden">Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your practitioner profile
        </p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="font-heading text-base text-golden flex items-center gap-2">
            <Shield className="w-4 h-4" /> Profile Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <div
              className="flex justify-center py-8"
              data-ocid="profile.loading_state"
            >
              <Loader2 className="w-5 h-5 animate-spin text-golden" />
            </div>
          ) : (
            <>
              <div className="space-y-1.5">
                <Label htmlFor="profile-name">Full Name</Label>
                <Input
                  id="profile-name"
                  data-ocid="profile.name.input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dr. Jane Smith"
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Practitioner Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger
                    data-ocid="profile.role.select"
                    className="bg-input border-border"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="Practitioner">Practitioner</SelectItem>
                    <SelectItem value="Senior Practitioner">
                      Senior Practitioner
                    </SelectItem>
                    <SelectItem value="Supervisor">Supervisor</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                data-ocid="profile.save.submit_button"
                onClick={handleSave}
                disabled={setPractitioner.isPending}
                className="bg-golden text-primary-foreground hover:opacity-90"
              >
                {setPractitioner.isPending ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : null}
                {setPractitioner.isPending ? "Saving..." : "Save Profile"}
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="font-heading text-base text-golden">
            Platform Modalities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {MODALITIES_LIST.map((m) => (
              <li key={m} className="flex items-center gap-2 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-golden flex-shrink-0" />
                {m}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
