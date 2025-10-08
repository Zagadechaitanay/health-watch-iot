import { FileText, Download, Filter, Bed, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Reports = () => {
  const [filters, setFilters] = useState({
    bedId: "",
    patientName: "",
    dateFrom: "",
    dateTo: "",
    reportType: "",
  });

  // Fetch beds for filter dropdown
  const { data: beds } = useQuery({
    queryKey: ["beds-for-filter"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("beds")
        .select("id, bed_number, ward:wards(name)")
        .order("bed_number");
      if (error) throw error;
      return data;
    },
  });

  // Fetch patients for filter
  const { data: patients } = useQuery({
    queryKey: ["patients-for-filter"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("patients")
        .select("id, name, patient_id")
        .eq("status", "active")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  // Fetch vitals history based on filters
  const { data: vitalsHistory } = useQuery({
    queryKey: ["vitals-history", filters],
    queryFn: async () => {
      let query = supabase
        .from("vitals")
        .select(`
          *,
          bed:beds(bed_number, ward:wards(name)),
          patient:patients(name, patient_id)
        `)
        .order("recorded_at", { ascending: false })
        .limit(50);

      if (filters.bedId) {
        query = query.eq("bed_id", filters.bedId);
      }

      if (filters.dateFrom) {
        query = query.gte("recorded_at", filters.dateFrom);
      }

      if (filters.dateTo) {
        query = query.lte("recorded_at", filters.dateTo);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const getVitalStatus = (value: number | null, min: number, max: number) => {
    if (!value) return { label: "N/A", variant: "secondary" as const };
    if (value < min || value > max) return { label: "Abnormal", variant: "destructive" as const };
    return { label: "Normal", variant: "default" as const };
  };

  const handleGenerateReport = () => {
    // Placeholder for PDF generation
    alert("Report generation feature - Connect to PDF service");
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Reports & Historical Data</h1>
          <p className="text-muted-foreground">Bed-wise patient reports and vital sign trends</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Reports</p>
                  <p className="text-3xl font-bold text-primary">247</p>
                </div>
                <FileText className="h-10 w-10 text-primary/30" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-3xl font-bold text-secondary">38</p>
                </div>
                <FileText className="h-10 w-10 text-secondary/30" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Patients</p>
                  <p className="text-3xl font-bold text-warning">12</p>
                </div>
                <User className="h-10 w-10 text-warning/30" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Search & Filter Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label>Bed Number</Label>
                <Select value={filters.bedId} onValueChange={(value) => setFilters({...filters, bedId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Beds" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Beds</SelectItem>
                    {beds?.map((bed) => (
                      <SelectItem key={bed.id} value={bed.id}>
                        {bed.bed_number} - {bed.ward?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Patient Name</Label>
                <Input
                  placeholder="Search patient..."
                  value={filters.patientName}
                  onChange={(e) => setFilters({...filters, patientName: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label>Report Type</Label>
                <Select value={filters.reportType} onValueChange={(value) => setFilters({...filters, reportType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    <SelectItem value="daily">Daily Summary</SelectItem>
                    <SelectItem value="discharge">Discharge Report</SelectItem>
                    <SelectItem value="vitals">Vitals History</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Date From</Label>
                <Input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label>Date To</Label>
                <Input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                />
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Button onClick={handleGenerateReport}>
                <Download className="h-4 w-4 mr-2" />
                Generate PDF Report
              </Button>
              <Button variant="outline" onClick={() => setFilters({ bedId: "", patientName: "", dateFrom: "", dateTo: "", reportType: "" })}>
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Historical Vitals Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Patient Vital History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Bed</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Heart Rate</TableHead>
                    <TableHead>SpO₂</TableHead>
                    <TableHead>Temperature</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vitalsHistory?.map((vital) => {
                    const hrStatus = getVitalStatus(vital.heart_rate, 60, 100);
                    const spo2Status = getVitalStatus(vital.spo2, 95, 100);
                    const tempValue = vital.temperature ? Number(vital.temperature) : null;
                    const tempStatus = getVitalStatus(tempValue, 36.5, 37.5);
                    const bedData = Array.isArray(vital.bed) ? vital.bed[0] : vital.bed;
                    const patientData = Array.isArray(vital.patient) ? vital.patient[0] : vital.patient;

                    return (
                      <TableRow key={vital.id} className="hover:bg-muted/50">
                        <TableCell className="font-mono text-sm">
                          {new Date(vital.recorded_at).toLocaleString()}
                        </TableCell>
                        <TableCell className="font-semibold">
                          {bedData?.bed_number || "N/A"}
                        </TableCell>
                        <TableCell>
                          {patientData?.name || "N/A"}
                          {patientData && <span className="text-xs text-muted-foreground ml-2">({patientData.patient_id})</span>}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{vital.heart_rate || "N/A"}</span>
                            <Badge variant={hrStatus.variant} className="text-xs">
                              {hrStatus.label}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{vital.spo2 || "N/A"}%</span>
                            <Badge variant={spo2Status.variant} className="text-xs">
                              {spo2Status.label}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{tempValue?.toFixed(1) || "N/A"}°C</span>
                            <Badge variant={tempStatus.variant} className="text-xs">
                              {tempStatus.label}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            <Download className="h-3 w-3 mr-1" />
                            Export
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <Card className="mt-6 bg-muted/50">
          <CardContent className="py-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="font-semibold">Data Source</p>
                <p className="text-sm text-muted-foreground">
                  Real-time vitals from ESP32 nodes → MQTT → Node-RED → Database
                </p>
              </div>
              <Badge variant="default">
                <span className="h-2 w-2 bg-secondary rounded-full mr-2 inline-block"></span>
                System Operational
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
