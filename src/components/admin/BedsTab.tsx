import { useState } from "react";
import { Bed, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AddBedDialog } from "./dialogs/AddBedDialog";
import { AssignPatientDialog } from "./dialogs/AssignPatientDialog";

export function BedsTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddBedDialog, setShowAddBedDialog] = useState(false);
  const [selectedBed, setSelectedBed] = useState<any>(null);

  const { data: beds, refetch } = useQuery({
    queryKey: ["beds-list"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("beds")
        .select(`
          *,
          ward:wards(name),
          patient:patients(id, name, patient_id)
        `)
        .order("bed_number");
      
      if (error) throw error;
      return data;
    },
  });

  const filteredBeds = beds?.filter(bed => 
    bed.bed_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bed.ward?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      case "maintenance":
        return <Badge variant="destructive">Maintenance</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Bed Management</CardTitle>
            <div className="flex gap-2">
              <Input 
                placeholder="Search beds..." 
                className="w-64" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button onClick={() => setShowAddBedDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Bed
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bed Number</TableHead>
                  <TableHead>Ward</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Occupancy</TableHead>
                  <TableHead>Assigned Patient</TableHead>
                  <TableHead>Last Update</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBeds?.map((bed) => (
                  <TableRow key={bed.id} className="hover:bg-muted/50">
                    <TableCell className="font-semibold">{bed.bed_number}</TableCell>
                    <TableCell>{bed.ward?.name}</TableCell>
                    <TableCell>{getStatusBadge(bed.status)}</TableCell>
                    <TableCell>
                      <Badge variant={bed.is_occupied ? "default" : "secondary"}>
                        {bed.is_occupied ? "Occupied" : "Vacant"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {bed.patient && Array.isArray(bed.patient) && bed.patient[0]
                        ? `${bed.patient[0].name} (${bed.patient[0].patient_id})` 
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {bed.last_vital_update 
                        ? new Date(bed.last_vital_update).toLocaleString() 
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {bed.is_occupied ? (
                          <Button size="sm" variant="outline">View Patient</Button>
                        ) : (
                          <Button 
                            size="sm" 
                            variant="default"
                            onClick={() => setSelectedBed(bed)}
                          >
                            Assign Patient
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AddBedDialog 
        open={showAddBedDialog} 
        onOpenChange={setShowAddBedDialog}
        onSuccess={refetch}
      />

      {selectedBed && (
        <AssignPatientDialog 
          bed={selectedBed}
          open={!!selectedBed}
          onOpenChange={(open) => !open && setSelectedBed(null)}
          onSuccess={refetch}
        />
      )}
    </div>
  );
}
