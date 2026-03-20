import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Loader2, Plus, Search, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useAddPatient,
  useDeletePatient,
  usePatients,
} from "../hooks/useQueries";

interface PatientForm {
  name: string;
  age: string;
  gender: string;
  dob: string;
  phone: string;
  email: string;
  notes: string;
}

const emptyForm: PatientForm = {
  name: "",
  age: "",
  gender: "Male",
  dob: "",
  phone: "",
  email: "",
  notes: "",
};

export function Patients() {
  const { data: patients = [], isLoading } = usePatients();
  const addPatient = useAddPatient();
  const deletePatient = useDeletePatient();

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<PatientForm>(emptyForm);
  const [search, setSearch] = useState("");
  const [viewPatient, setViewPatient] = useState<(typeof patients)[0] | null>(
    null,
  );

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  function setField(field: keyof PatientForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    if (!form.name.trim()) {
      toast.error("Full name is required");
      return;
    }
    try {
      await addPatient.mutateAsync({
        name: form.name.trim(),
        age: BigInt(form.age || "0"),
        gender: form.gender,
        dob: form.dob,
        phone: form.phone,
        email: form.email,
        notes: form.notes,
      });
      toast.success("Patient added successfully");
      setForm(emptyForm);
      setOpen(false);
    } catch {
      toast.error("Failed to add patient");
    }
  }

  async function handleDelete(id: bigint, name: string) {
    if (!confirm(`Delete patient "${name}"?`)) return;
    try {
      await deletePatient.mutateAsync(id);
      toast.success("Patient deleted");
    } catch {
      toast.error("Failed to delete patient");
    }
  }

  return (
    <div className="p-6 space-y-6" data-ocid="patients.page">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-golden">
            Patients
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {patients.length} patient{patients.length !== 1 ? "s" : ""}{" "}
            registered
          </p>
        </div>
        <Button
          data-ocid="patients.add.open_modal_button"
          onClick={() => setOpen(true)}
          className="bg-golden text-primary-foreground hover:opacity-90"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Patient
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          data-ocid="patients.search_input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search patients..."
          className="pl-9 bg-input border-border"
        />
      </div>

      {/* Patient List */}
      {isLoading ? (
        <div
          className="flex items-center justify-center py-16"
          data-ocid="patients.loading_state"
        >
          <Loader2 className="w-6 h-6 animate-spin text-golden" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16" data-ocid="patients.empty_state">
          <p className="text-muted-foreground">No patients found.</p>
          <Button
            onClick={() => setOpen(true)}
            className="mt-4 bg-golden text-primary-foreground hover:opacity-90"
          >
            <Plus className="w-4 h-4 mr-2" /> Add First Patient
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <AnimatePresence>
            {filtered.map((p, i) => (
              <motion.div
                key={String(p.id)}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.04 }}
                data-ocid={`patients.item.${i + 1}`}
              >
                <Card className="bg-card border-border hover:border-golden/40 transition-colors">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-foreground">
                          {p.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {p.gender} · {String(p.age)} yrs
                        </p>
                      </div>
                    </div>
                    {p.phone && (
                      <p className="text-xs text-muted-foreground mb-1">
                        📞 {p.phone}
                      </p>
                    )}
                    {p.email && (
                      <p className="text-xs text-muted-foreground mb-1">
                        ✉ {p.email}
                      </p>
                    )}
                    {p.notes && (
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-2 italic">
                        {p.notes}
                      </p>
                    )}
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        data-ocid={`patients.view.button.${i + 1}`}
                        onClick={() => setViewPatient(p)}
                        className="flex-1 border-border text-xs hover:bg-muted"
                      >
                        <Eye className="w-3 h-3 mr-1" /> View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        data-ocid={`patients.delete_button.${i + 1}`}
                        onClick={() => handleDelete(p.id, p.name)}
                        disabled={deletePatient.isPending}
                        className="border-destructive/50 text-destructive hover:bg-destructive/10 text-xs"
                      >
                        <Trash2 className="w-3 h-3 mr-1" /> Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Add Patient Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="bg-card border-border max-w-lg"
          data-ocid="patients.add.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-heading text-golden">
              Add New Patient
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="col-span-2 space-y-1.5">
              <Label htmlFor="pat-name">Full Name *</Label>
              <Input
                id="pat-name"
                data-ocid="patients.name.input"
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                placeholder="e.g. John Smith"
                className="bg-input border-border"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pat-age">Age</Label>
              <Input
                id="pat-age"
                data-ocid="patients.age.input"
                type="number"
                value={form.age}
                onChange={(e) => setField("age", e.target.value)}
                placeholder="35"
                className="bg-input border-border"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Gender</Label>
              <Select
                value={form.gender}
                onValueChange={(v) => setField("gender", v)}
              >
                <SelectTrigger
                  data-ocid="patients.gender.select"
                  className="bg-input border-border"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pat-dob">Date of Birth</Label>
              <Input
                id="pat-dob"
                data-ocid="patients.dob.input"
                type="date"
                value={form.dob}
                onChange={(e) => setField("dob", e.target.value)}
                className="bg-input border-border"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pat-phone">Phone</Label>
              <Input
                id="pat-phone"
                data-ocid="patients.phone.input"
                value={form.phone}
                onChange={(e) => setField("phone", e.target.value)}
                placeholder="+1 555 0000"
                className="bg-input border-border"
              />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label htmlFor="pat-email">Email</Label>
              <Input
                id="pat-email"
                data-ocid="patients.email.input"
                type="email"
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                placeholder="patient@example.com"
                className="bg-input border-border"
              />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label htmlFor="pat-notes">Notes / Medical History</Label>
              <Textarea
                id="pat-notes"
                data-ocid="patients.notes.textarea"
                value={form.notes}
                onChange={(e) => setField("notes", e.target.value)}
                placeholder="Relevant medical history..."
                rows={3}
                className="bg-input border-border resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              data-ocid="patients.add.cancel_button"
              onClick={() => {
                setOpen(false);
                setForm(emptyForm);
              }}
              className="border-border"
            >
              Cancel
            </Button>
            <Button
              data-ocid="patients.add.submit_button"
              onClick={handleSave}
              disabled={addPatient.isPending}
              className="bg-golden text-primary-foreground hover:opacity-90"
            >
              {addPatient.isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : null}
              {addPatient.isPending ? "Saving..." : "Save Patient"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Patient Dialog */}
      <Dialog open={!!viewPatient} onOpenChange={() => setViewPatient(null)}>
        <DialogContent
          className="bg-card border-border max-w-md"
          data-ocid="patients.view.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-heading text-golden">
              {viewPatient?.name}
            </DialogTitle>
          </DialogHeader>
          {viewPatient && (
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-muted-foreground">Gender:</span>{" "}
                {viewPatient.gender}
              </p>
              <p>
                <span className="text-muted-foreground">Age:</span>{" "}
                {String(viewPatient.age)}
              </p>
              {viewPatient.dob && (
                <p>
                  <span className="text-muted-foreground">DOB:</span>{" "}
                  {viewPatient.dob}
                </p>
              )}
              {viewPatient.phone && (
                <p>
                  <span className="text-muted-foreground">Phone:</span>{" "}
                  {viewPatient.phone}
                </p>
              )}
              {viewPatient.email && (
                <p>
                  <span className="text-muted-foreground">Email:</span>{" "}
                  {viewPatient.email}
                </p>
              )}
              {viewPatient.notes && (
                <p>
                  <span className="text-muted-foreground">Notes:</span>{" "}
                  {viewPatient.notes}
                </p>
              )}
            </div>
          )}
          <DialogFooter>
            <Button
              data-ocid="patients.view.close_button"
              onClick={() => setViewPatient(null)}
              variant="outline"
              className="border-border"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
