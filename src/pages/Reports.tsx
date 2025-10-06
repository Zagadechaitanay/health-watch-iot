import { FileText, Download, Calendar, User, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Reports = () => {
  const reports = [
    {
      id: "RPT-2024-001",
      patientName: "John Doe",
      patientId: "P001",
      reportType: "Discharge Summary",
      dateGenerated: "2024-01-15",
      status: "Available",
    },
    {
      id: "RPT-2024-002",
      patientName: "Jane Smith",
      patientId: "P002",
      reportType: "Weekly Vitals Report",
      dateGenerated: "2024-01-14",
      status: "Available",
    },
    {
      id: "RPT-2024-003",
      patientName: "Robert Johnson",
      patientId: "P003",
      reportType: "Discharge Summary",
      dateGenerated: "2024-01-13",
      status: "Available",
    },
    {
      id: "RPT-2024-004",
      patientName: "Emily Davis",
      patientId: "P004",
      reportType: "Environmental Report",
      dateGenerated: "2024-01-12",
      status: "Available",
    },
    {
      id: "RPT-2024-005",
      patientName: "Michael Wilson",
      patientId: "P005",
      reportType: "Monthly Summary",
      dateGenerated: "2024-01-10",
      status: "Available",
    },
  ];

  const recentPatientData = [
    {
      date: "2024-01-15",
      heartRate: 72,
      spo2: 98,
      temperature: 36.8,
      notes: "Normal readings",
    },
    {
      date: "2024-01-14",
      heartRate: 75,
      spo2: 97,
      temperature: 36.9,
      notes: "Slight elevation in HR",
    },
    {
      date: "2024-01-13",
      heartRate: 70,
      spo2: 98,
      temperature: 36.7,
      notes: "All parameters normal",
    },
    {
      date: "2024-01-12",
      heartRate: 73,
      spo2: 97,
      temperature: 36.8,
      notes: "Stable condition",
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Reports & Patient History</h1>
          <p className="text-muted-foreground">Generate and download comprehensive patient reports</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Reports</p>
                  <p className="text-3xl font-bold text-primary">47</p>
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
                  <p className="text-3xl font-bold text-secondary">12</p>
                </div>
                <Calendar className="h-10 w-10 text-secondary/30" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Patients</p>
                  <p className="text-3xl font-bold text-warning">28</p>
                </div>
                <User className="h-10 w-10 text-warning/30" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all">
            <CardContent className="pt-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Quick Generate</p>
                <Button className="w-full" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  New Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input placeholder="Patient Name or ID" />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Report Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="discharge">Discharge Summary</SelectItem>
                  <SelectItem value="weekly">Weekly Vitals</SelectItem>
                  <SelectItem value="environmental">Environmental</SelectItem>
                  <SelectItem value="monthly">Monthly Summary</SelectItem>
                </SelectContent>
              </Select>
              <Input type="date" placeholder="From Date" />
              <Input type="date" placeholder="To Date" />
            </div>
            <div className="mt-4 flex gap-2">
              <Button>Apply Filters</Button>
              <Button variant="outline">Reset</Button>
            </div>
          </CardContent>
        </Card>

        {/* Reports Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Available Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Patient ID</TableHead>
                    <TableHead>Report Type</TableHead>
                    <TableHead>Date Generated</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id} className="hover:bg-muted/50">
                      <TableCell className="font-mono text-sm">{report.id}</TableCell>
                      <TableCell className="font-medium">{report.patientName}</TableCell>
                      <TableCell>{report.patientId}</TableCell>
                      <TableCell>{report.reportType}</TableCell>
                      <TableCell>{report.dateGenerated}</TableCell>
                      <TableCell>
                        <Badge variant="default">{report.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Patient Historical Data */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Patient Vital History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Heart Rate</TableHead>
                    <TableHead>SpO₂</TableHead>
                    <TableHead>Temperature</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentPatientData.map((data, index) => (
                    <TableRow key={index} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{data.date}</TableCell>
                      <TableCell>
                        <span className={data.heartRate >= 60 && data.heartRate <= 100 ? "text-secondary" : "text-warning"}>
                          {data.heartRate} BPM
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={data.spo2 >= 95 ? "text-secondary" : "text-destructive"}>
                          {data.spo2}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={data.temperature >= 36.5 && data.temperature <= 37.5 ? "text-secondary" : "text-warning"}>
                          {data.temperature}°C
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{data.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Data Source Info */}
        <Card className="mt-6 bg-muted/50">
          <CardContent className="py-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="font-semibold">Report Generation System</p>
                <p className="text-sm text-muted-foreground">
                  Data sourced from MySQL database | Auto-generated PDFs on discharge
                </p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline">MySQL Connected</Badge>
                <Badge variant="default">PDF Engine Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
