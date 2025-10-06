import { Users, Activity, Bed, UserPlus, UserMinus, Settings, TrendingUp, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const Admin = () => {
  const patients = [
    {
      id: "P001",
      name: "John Doe",
      age: 45,
      ward: "Ward 1",
      bed: "B-12",
      admissionDate: "2024-01-10",
      condition: "Stable",
      status: "Active",
    },
    {
      id: "P002",
      name: "Jane Smith",
      age: 62,
      ward: "Ward 2",
      bed: "B-08",
      admissionDate: "2024-01-12",
      condition: "Critical",
      status: "Active",
    },
    {
      id: "P003",
      name: "Robert Johnson",
      age: 38,
      ward: "Ward 1",
      bed: "B-15",
      admissionDate: "2024-01-08",
      condition: "Stable",
      status: "Active",
    },
    {
      id: "P004",
      name: "Emily Davis",
      age: 55,
      ward: "Ward 3",
      bed: "B-03",
      admissionDate: "2024-01-14",
      condition: "Improving",
      status: "Active",
    },
    {
      id: "P005",
      name: "Michael Wilson",
      age: 71,
      ward: "Ward 2",
      bed: "B-20",
      admissionDate: "2024-01-11",
      condition: "Stable",
      status: "Active",
    },
  ];

  const hospitalOverview = {
    totalBeds: 50,
    occupiedBeds: 35,
    availableBeds: 15,
    criticalPatients: 3,
    stablePatients: 28,
    improvingPatients: 4,
    todayAdmissions: 2,
    todayDischarges: 1,
  };

  const wardStats = [
    { ward: "Ward 1", capacity: 20, occupied: 15, critical: 1, stable: 12, improving: 2 },
    { ward: "Ward 2", capacity: 15, occupied: 12, critical: 2, stable: 8, improving: 2 },
    { ward: "Ward 3", capacity: 15, occupied: 8, critical: 0, stable: 8, improving: 0 },
  ];

  const getConditionBadge = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      case "stable":
        return <Badge variant="default">Stable</Badge>;
      case "improving":
        return <Badge variant="secondary" className="bg-secondary">Improving</Badge>;
      default:
        return <Badge>{condition}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Doctor / Admin Panel</h1>
          <p className="text-muted-foreground">Comprehensive patient and hospital management system</p>
        </div>

        {/* Hospital Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="hover:shadow-lg transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Patients</p>
                  <p className="text-3xl font-bold text-primary">{hospitalOverview.occupiedBeds}</p>
                </div>
                <Users className="h-8 w-8 text-primary/30" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all border-destructive/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Critical</p>
                  <p className="text-3xl font-bold text-destructive">{hospitalOverview.criticalPatients}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-destructive/30" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Available Beds</p>
                  <p className="text-3xl font-bold text-secondary">{hospitalOverview.availableBeds}</p>
                </div>
                <Bed className="h-8 w-8 text-secondary/30" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Occupancy</p>
                  <p className="text-3xl font-bold text-warning">{Math.round((hospitalOverview.occupiedBeds / hospitalOverview.totalBeds) * 100)}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-warning/30" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-auto py-4 flex flex-col gap-2">
                <UserPlus className="h-6 w-6" />
                <span>Add New Patient</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <UserMinus className="h-6 w-6" />
                <span>Discharge Patient</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <Activity className="h-6 w-6" />
                <span>View All Vitals</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <Settings className="h-6 w-6" />
                <span>System Settings</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs defaultValue="patients" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="patients">Patient Management</TabsTrigger>
            <TabsTrigger value="wards">Ward Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends & Analytics</TabsTrigger>
          </TabsList>

          {/* Patient Management */}
          <TabsContent value="patients" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Active Patients</CardTitle>
                  <div className="flex gap-2">
                    <Input placeholder="Search patients..." className="w-64" />
                    <Button>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add Patient
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Ward</TableHead>
                        <TableHead>Bed</TableHead>
                        <TableHead>Admission Date</TableHead>
                        <TableHead>Condition</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {patients.map((patient) => (
                        <TableRow key={patient.id} className="hover:bg-muted/50">
                          <TableCell className="font-mono">{patient.id}</TableCell>
                          <TableCell className="font-medium">{patient.name}</TableCell>
                          <TableCell>{patient.age}</TableCell>
                          <TableCell>{patient.ward}</TableCell>
                          <TableCell>{patient.bed}</TableCell>
                          <TableCell>{patient.admissionDate}</TableCell>
                          <TableCell>{getConditionBadge(patient.condition)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">Edit</Button>
                              <Button size="sm" variant="outline">View</Button>
                              <Button size="sm" variant="destructive">Discharge</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ward Overview */}
          <TabsContent value="wards" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {wardStats.map((ward) => (
                <Card key={ward.ward} className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <CardTitle>{ward.ward}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Occupancy</span>
                        <span className="text-sm font-semibold">{ward.occupied}/{ward.capacity} beds</span>
                      </div>
                      <Progress value={(ward.occupied / ward.capacity) * 100} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Critical</span>
                        <Badge variant="destructive">{ward.critical}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Stable</span>
                        <Badge variant="default">{ward.stable}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Improving</span>
                        <Badge variant="secondary" className="bg-secondary">{ward.improving}</Badge>
                      </div>
                    </div>

                    <Button className="w-full" variant="outline">View Ward Details</Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Environmental Overview for all wards */}
            <Card>
              <CardHeader>
                <CardTitle>Environmental Status - All Wards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Avg Temperature</p>
                    <p className="text-2xl font-bold text-warning">23.5°C</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Avg Humidity</p>
                    <p className="text-2xl font-bold text-primary">54%</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Air Quality</p>
                    <p className="text-2xl font-bold text-secondary">Good</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">CO₂ Level</p>
                    <p className="text-2xl font-bold">425 ppm</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trends & Analytics */}
          <TabsContent value="trends" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Today's Admissions</span>
                      <span className="font-semibold text-primary">{hospitalOverview.todayAdmissions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Today's Discharges</span>
                      <span className="font-semibold text-secondary">{hospitalOverview.todayDischarges}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Avg Stay Duration</span>
                      <span className="font-semibold">4.2 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Critical → Stable Rate</span>
                      <span className="font-semibold text-secondary">85%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Data Accuracy</span>
                        <span className="text-sm font-semibold">99.2%</span>
                      </div>
                      <Progress value={99.2} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Sensor Uptime</span>
                        <span className="text-sm font-semibold">98.7%</span>
                      </div>
                      <Progress value={98.7} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Alert Response Time</span>
                        <span className="text-sm font-semibold">3.2 min</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Recent Activity Log</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <UserPlus className="h-5 w-5 text-primary" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">New patient admitted: Emily Davis (P004)</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Critical alert resolved: Patient P002</p>
                        <p className="text-xs text-muted-foreground">4 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <UserMinus className="h-5 w-5 text-secondary" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Patient discharged: Michael Wilson (P005)</p>
                        <p className="text-xs text-muted-foreground">6 hours ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* System Status */}
        <Card className="mt-6 bg-muted/50">
          <CardContent className="py-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="font-semibold">Hospital Management System</p>
                <p className="text-sm text-muted-foreground">
                  Connected to MySQL via Node-RED | Real-time data synchronization active
                </p>
              </div>
              <div className="flex gap-2">
                <Badge variant="default" className="animate-pulse-glow">
                  <span className="h-2 w-2 bg-secondary rounded-full mr-2 inline-block"></span>
                  All Systems Online
                </Badge>
                <Badge variant="outline">Last sync: Just now</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
