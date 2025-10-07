import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AssignPatientDialogProps {
  bed: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function AssignPatientDialog({ bed, open, onOpenChange, onSuccess }: AssignPatientDialogProps) {
  const { toast } = useToast();
  const [selectedPatientId, setSelectedPatientId] = useState("");

  const { data: unassignedPatients } = useQuery({
    queryKey: ["unassigned-patients"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("patients")
        .select("*")
        .eq("status", "active")
        .is("bed_id", null)
        .order("admission_date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const assignPatient = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("patients")
        .update({ bed_id: bed.id })
        .eq("id", selectedPatientId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Patient assigned successfully" });
      onSuccess();
      onOpenChange(false);
      setSelectedPatientId("");
    },
    onError: (error: any) => {
      toast({ title: "Error assigning patient", description: error.message, variant: "destructive" });
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Patient to {bed.bed_number}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Select Patient</Label>
            <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a patient" />
              </SelectTrigger>
              <SelectContent>
                {unassignedPatients?.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.name} ({patient.patient_id})
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
          <Button onClick={() => assignPatient.mutate()} disabled={!selectedPatientId}>
            Assign
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
