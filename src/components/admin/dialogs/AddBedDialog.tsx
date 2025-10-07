import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AddBedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function AddBedDialog({ open, onOpenChange, onSuccess }: AddBedDialogProps) {
  const { toast } = useToast();
  const [bedNumber, setBedNumber] = useState("");
  const [wardId, setWardId] = useState("");
  const [status, setStatus] = useState("active");

  const { data: wards } = useQuery({
    queryKey: ["wards"],
    queryFn: async () => {
      const { data, error } = await supabase.from("wards").select("*").order("name");
      if (error) throw error;
      return data;
    },
  });

  const addBed = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("beds").insert({
        bed_number: bedNumber,
        ward_id: wardId,
        status,
        is_occupied: false,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Bed added successfully" });
      onSuccess();
      onOpenChange(false);
      setBedNumber("");
      setWardId("");
      setStatus("active");
    },
    onError: (error: any) => {
      toast({ title: "Error adding bed", description: error.message, variant: "destructive" });
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Bed</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="bed-number">Bed Number</Label>
            <Input
              id="bed-number"
              placeholder="e.g., Bed 1"
              value={bedNumber}
              onChange={(e) => setBedNumber(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ward">Ward</Label>
            <Select value={wardId} onValueChange={setWardId}>
              <SelectTrigger>
                <SelectValue placeholder="Select ward" />
              </SelectTrigger>
              <SelectContent>
                {wards?.map((ward) => (
                  <SelectItem key={ward.id} value={ward.id}>
                    {ward.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => addBed.mutate()} disabled={!bedNumber || !wardId}>
            Add Bed
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
