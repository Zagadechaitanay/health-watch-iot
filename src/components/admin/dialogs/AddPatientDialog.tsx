import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AddPatientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function AddPatientDialog({ open, onOpenChange, onSuccess }: AddPatientDialogProps) {
  const { toast } = useToast();
  const [patientId, setPatientId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [bedId, setBedId] = useState<string | null>(null);

  const { data: availableBeds } = useQuery({
    queryKey: ["available-beds"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("beds")
        .select("*, ward:wards(name)")
        .eq("is_occupied", false)
        .eq("status", "active")
        .order("bed_number");
      if (error) throw error;
      return data;
    },
  });

  const addPatient = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("patients").insert({
        patient_id: patientId,
        name,
        age: parseInt(age),
        gender,
        diagnosis,
        bed_id: bedId,
        status: "active",
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Patient added successfully" });
      onSuccess();
      onOpenChange(false);
      // Reset form
      setPatientId("");
      setName("");
      setAge("");
      setGender("");
      setDiagnosis("");
      setBedId(null);
    },
    onError: (error: any) => {
      toast({ title: "Error adding patient", description: error.message, variant: "destructive" });
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Patient</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="patient-id">Patient ID</Label>
            <Input
              id="patient-id"
              placeholder="e.g., P001"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter patient name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="diagnosis">Diagnosis</Label>
            <Input
              id="diagnosis"
              placeholder="Patient diagnosis"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bed">Assign to Bed (Optional)</Label>
            <Select value={bedId || "none"} onValueChange={(v) => setBedId(v === "none" ? null : v)}>
              <SelectTrigger>
                <SelectValue placeholder="No bed assigned" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No bed assigned</SelectItem>
                {availableBeds?.map((bed) => (
                  <SelectItem key={bed.id} value={bed.id}>
                    {bed.bed_number} ({bed.ward?.name})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => addPatient.mutate()} disabled={!patientId || !name}>
            Add Patient
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
