import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface DischargePatientDialogProps {
  patient: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function DischargePatientDialog({ patient, open, onOpenChange, onSuccess }: DischargePatientDialogProps) {
  const { toast } = useToast();

  const dischargePatient = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("patients")
        .update({ 
          status: "discharged",
          discharge_date: new Date().toISOString(),
          bed_id: null
        })
        .eq("id", patient.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ 
        title: "Patient discharged successfully",
        description: "Discharge report can be generated from the Reports section."
      });
      onSuccess();
      onOpenChange(false);
    },
    onError: (error: any) => {
      toast({ title: "Error discharging patient", description: error.message, variant: "destructive" });
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Discharge Patient</DialogTitle>
          <DialogDescription>
            Are you sure you want to discharge {patient?.name} ({patient?.patient_id})?
            This will free up their assigned bed and mark them as discharged.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={() => dischargePatient.mutate()}>
            Discharge Patient
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
