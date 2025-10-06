import { Heart, Droplets, Thermometer, Activity, AlertCircle, Bed } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const PatientDashboard = () => {
  const [selectedBed, setSelectedBed] = useState("bed1");

  // Dummy real-time data per bed
  const bedsData = {
    bed1: {
      patientName: "John Doe",
      patientId: "P001",
      age: 45,
      admissionDate: "2024-01-10",
      vitals: {
        heartRate: 72,
        spo2: 98,
        temperature: 36.8,
        ecg: "Normal Sinus Rhythm",
        hydrationLevel: 85,
        sosActive: false,
      }
    },
    bed2: {
      patientName: "Jane Smith",
      patientId: "P002",
      age: 62,
      admissionDate: "2024-01-12",
      vitals: {
        heartRate: 85,
        spo2: 94,
        temperature: 37.2,
        ecg: "Sinus Tachycardia",
        hydrationLevel: 68,
        sosActive: false,
      }
    },
    bed3: {
      patientName: "Robert Johnson",
      patientId: "P003",
      age: 38,
      admissionDate: "2024-01-08",
      vitals: {
        heartRate: 68,
        spo2: 99,
        temperature: 36.5,
        ecg: "Normal Sinus Rhythm",
        hydrationLevel: 92,
        sosActive: false,
      }
    },
    bed4: {
      patientName: "Emily Davis",
      patientId: "P004",
      age: 55,
      admissionDate: "2024-01-14",
      vitals: {
        heartRate: 78,
        spo2: 96,
        temperature: 36.9,
        ecg: "Normal Sinus Rhythm",
        hydrationLevel: 78,
        sosActive: false,
      }
    },
  };

  const currentBed = bedsData[selectedBed as keyof typeof bedsData];
  const vitals = currentBed.vitals;

  const vitalRanges = {
    heartRate: { min: 60, max: 100, current: vitals.heartRate },
    spo2: { min: 95, max: 100, current: vitals.spo2 },
    temperature: { min: 36.5, max: 37.5, current: vitals.temperature },
  };

  const getStatusColor = (value: number, min: number, max: number) => {
    if (value < min || value > max) return "text-destructive";
    if (value <= min + (max - min) * 0.1 || value >= max - (max - min) * 0.1) return "text-warning";
    return "text-secondary";
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Bed-Wise Patient Monitoring</h1>
          <p className="text-muted-foreground">Real-time vital signs monitoring per bed</p>
        </div>

        {/* Bed Selector Tabs */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <Tabs value={selectedBed} onValueChange={setSelectedBed} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="bed1" className="flex items-center gap-2">
                  <Bed className="h-4 w-4" />
                  Bed 1
                </TabsTrigger>
                <TabsTrigger value="bed2" className="flex items-center gap-2">
                  <Bed className="h-4 w-4" />
                  Bed 2
                </TabsTrigger>
                <TabsTrigger value="bed3" className="flex items-center gap-2">
                  <Bed className="h-4 w-4" />
                  Bed 3
                </TabsTrigger>
                <TabsTrigger value="bed4" className="flex items-center gap-2">
                  <Bed className="h-4 w-4" />
                  Bed 4
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Patient Name</p>
                  <p className="font-semibold">{currentBed.patientName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Patient ID</p>
                  <p className="font-semibold">{currentBed.patientId}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Age</p>
                  <p className="font-semibold">{currentBed.age} years</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Admission Date</p>
                  <p className="font-semibold">{currentBed.admissionDate}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency SOS Status */}
        <Card className={`mb-6 ${vitals.sosActive ? 'border-destructive bg-destructive-light animate-pulse-glow' : 'border-secondary bg-secondary-light'}`}>
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className={vitals.sosActive ? "h-6 w-6 text-destructive" : "h-6 w-6 text-secondary"} />
                <div>
                  <p className="font-semibold">Emergency SOS Status</p>
                  <p className="text-sm text-muted-foreground">
                    {vitals.sosActive ? "EMERGENCY ACTIVATED" : "All systems normal"}
                  </p>
                </div>
              </div>
              <Button variant={vitals.sosActive ? "destructive" : "default"} size="lg">
                {vitals.sosActive ? "SOS ACTIVE" : "Trigger SOS"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Vital Signs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Heart Rate */}
          <Card className="hover:shadow-lg transition-all animate-fade-in">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart className="h-5 w-5 text-destructive" />
                Heart Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-end gap-2">
                  <span className={`text-4xl font-bold ${getStatusColor(vitals.heartRate, 60, 100)}`}>
                    {vitals.heartRate}
                  </span>
                  <span className="text-muted-foreground mb-1">BPM</span>
                </div>
                <Progress value={(vitals.heartRate / 120) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">Normal range: 60-100 BPM</p>
                <Badge variant={vitals.heartRate >= 60 && vitals.heartRate <= 100 ? "default" : "destructive"}>
                  {vitals.heartRate >= 60 && vitals.heartRate <= 100 ? "Normal" : "Alert"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* SpO2 */}
          <Card className="hover:shadow-lg transition-all animate-fade-in">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Droplets className="h-5 w-5 text-primary" />
                SpO₂ Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-end gap-2">
                  <span className={`text-4xl font-bold ${getStatusColor(vitals.spo2, 95, 100)}`}>
                    {vitals.spo2}
                  </span>
                  <span className="text-muted-foreground mb-1">%</span>
                </div>
                <Progress value={vitals.spo2} className="h-2" />
                <p className="text-xs text-muted-foreground">Normal range: 95-100%</p>
                <Badge variant={vitals.spo2 >= 95 ? "default" : "destructive"}>
                  {vitals.spo2 >= 95 ? "Normal" : "Low"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Temperature */}
          <Card className="hover:shadow-lg transition-all animate-fade-in">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-warning" />
                Temperature
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-end gap-2">
                  <span className={`text-4xl font-bold ${getStatusColor(vitals.temperature, 36.5, 37.5)}`}>
                    {vitals.temperature}
                  </span>
                  <span className="text-muted-foreground mb-1">°C</span>
                </div>
                <Progress value={((vitals.temperature - 35) / 5) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">Normal range: 36.5-37.5°C</p>
                <Badge variant={vitals.temperature >= 36.5 && vitals.temperature <= 37.5 ? "default" : "destructive"}>
                  {vitals.temperature >= 36.5 && vitals.temperature <= 37.5 ? "Normal" : "Alert"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* ECG Status */}
          <Card className="hover:shadow-lg transition-all animate-fade-in">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-secondary" />
                ECG Waveform
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-24 bg-muted rounded-lg flex items-center justify-center">
                  <svg className="w-full h-full p-2" viewBox="0 0 200 50">
                    <polyline
                      points="0,25 20,25 25,15 30,35 35,25 40,25 60,25 65,15 70,35 75,25 80,25 100,25 105,15 110,35 115,25 120,25 140,25 145,15 150,35 155,25 160,25 180,25 185,15 190,35 195,25 200,25"
                      fill="none"
                      stroke="hsl(var(--secondary))"
                      strokeWidth="2"
                      className="animate-pulse-glow"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium">{vitals.ecg}</p>
                <Badge variant="default">Active Monitoring</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hydration Reminder */}
        <Card className="bg-primary-light border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-primary" />
              Hydration Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Daily Hydration Goal</span>
                <span className="font-semibold">{vitals.hydrationLevel}%</span>
              </div>
              <Progress value={vitals.hydrationLevel} className="h-3" />
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${vitals.hydrationLevel >= 70 ? 'bg-secondary' : 'bg-warning'} animate-pulse-glow`}></div>
                <p className="text-sm">
                  {vitals.hydrationLevel >= 70 
                    ? "Hydration level is good" 
                    : "Reminder: Please drink water"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Trends */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Recent Vital Trends</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Last 24 Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg Heart Rate:</span>
                    <span className="font-semibold">74 BPM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg SpO₂:</span>
                    <span className="font-semibold">97%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg Temp:</span>
                    <span className="font-semibold">36.7°C</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Alerts Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <p className="text-4xl font-bold text-secondary">0</p>
                  <p className="text-sm text-muted-foreground mt-2">No abnormal readings</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Data Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Signal Strength</span>
                      <span className="text-sm font-semibold">Excellent</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    All sensors operating normally
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
