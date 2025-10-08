import { Thermometer, Droplets, Wind, Leaf, Fan, Snowflake, AirVent } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const WardDashboard = () => {
  const [selectedWardId, setSelectedWardId] = useState<string>("");
  const queryClient = useQueryClient();

  // Fetch all wards
  const { data: wards } = useQuery({
    queryKey: ["wards"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("wards")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  // Set default selected ward when wards are loaded
  if (wards && wards.length > 0 && !selectedWardId) {
    setSelectedWardId(wards[0].id);
  }

  // Fetch latest environmental data for selected ward with auto-refresh every 10 seconds
  const { data: environmentalData } = useQuery({
    queryKey: ["environmental-data", selectedWardId],
    queryFn: async () => {
      if (!selectedWardId) return null;
      const { data, error } = await supabase
        .from("environmental_data")
        .select("*")
        .eq("ward_id", selectedWardId)
        .order("recorded_at", { ascending: false })
        .limit(1)
        .single();
      if (error && error.code !== "PGRST116") throw error;
      return data;
    },
    enabled: !!selectedWardId,
    refetchInterval: 10000, // Auto-refresh every 10 seconds
  });

  // Fetch actuator controls for selected ward with auto-refresh
  const { data: actuatorControls } = useQuery({
    queryKey: ["actuator-controls", selectedWardId],
    queryFn: async () => {
      if (!selectedWardId) return [];
      const { data, error } = await supabase
        .from("actuator_controls")
        .select("*")
        .eq("ward_id", selectedWardId);
      if (error) throw error;
      return data;
    },
    enabled: !!selectedWardId,
    refetchInterval: 10000, // Auto-refresh every 10 seconds
  });

  // Mutation to toggle actuator
  const toggleActuator = useMutation({
    mutationFn: async ({ id, newStatus }: { id: string; newStatus: boolean }) => {
      const { error } = await supabase
        .from("actuator_controls")
        .update({ status: newStatus, last_updated: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["actuator-controls", selectedWardId] });
      toast.success("Actuator status updated");
    },
    onError: () => {
      toast.error("Failed to update actuator status");
    },
  });

  // Helper to get actuator status
  const getActuatorStatus = (deviceType: string): boolean => {
    const control = actuatorControls?.find(c => c.device_type === deviceType);
    return control?.status || false;
  };

  // Helper to get actuator control id
  const getActuatorId = (deviceType: string): string | undefined => {
    return actuatorControls?.find(c => c.device_type === deviceType)?.id;
  };

  const getAirQualityStatus = (pm25: number) => {
    if (pm25 <= 12) return { label: "Good", variant: "default" as const, color: "text-secondary" };
    if (pm25 <= 35) return { label: "Moderate", variant: "secondary" as const, color: "text-warning" };
    return { label: "Poor", variant: "destructive" as const, color: "text-destructive" };
  };

  const getTemperatureStatus = (temp: number) => {
    if (temp >= 20 && temp <= 24) return { variant: "default" as const, label: "Optimal", color: "text-secondary" };
    if (temp < 18 || temp > 28) return { variant: "destructive" as const, label: "Alert", color: "text-destructive" };
    return { variant: "secondary" as const, label: "Adjusted", color: "text-warning" };
  };

  const getHumidityStatus = (humidity: number) => {
    if (humidity >= 40 && humidity <= 60) return { variant: "default" as const, label: "Optimal", color: "text-secondary" };
    if (humidity < 30 || humidity > 70) return { variant: "destructive" as const, label: "Alert", color: "text-destructive" };
    return { variant: "secondary" as const, label: "Adjusted", color: "text-warning" };
  };

  const getCO2Status = (co2: number) => {
    if (co2 < 800) return { variant: "default" as const, label: "Good", color: "text-secondary" };
    if (co2 > 1200) return { variant: "destructive" as const, label: "High", color: "text-destructive" };
    return { variant: "secondary" as const, label: "Moderate", color: "text-warning" };
  };

  const getVOCStatus = (vocs: number) => {
    if (vocs < 300) return { variant: "default" as const, label: "Good", color: "text-secondary" };
    if (vocs > 500) return { variant: "destructive" as const, label: "Poor", color: "text-destructive" };
    return { variant: "secondary" as const, label: "Moderate", color: "text-warning" };
  };

  const pm25 = environmentalData?.pm25 || 0;
  const temperature = environmentalData?.temperature || 0;
  const humidity = environmentalData?.humidity || 0;
  const co2 = environmentalData?.co2 || 0;
  const vocs = environmentalData?.vocs || 0;

  const airQuality = getAirQualityStatus(pm25);
  const tempStatus = getTemperatureStatus(temperature);
  const humidityStatus = getHumidityStatus(humidity);
  const co2Status = getCO2Status(co2);
  const vocStatus = getVOCStatus(vocs);

  const selectedWard = wards?.find(w => w.id === selectedWardId);
  const fanStatus = getActuatorStatus("fan");
  const acStatus = getActuatorStatus("ac");
  const purifierStatus = getActuatorStatus("air_purifier");

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Ward Environmental Dashboard</h1>
          <p className="text-muted-foreground">Real-time monitoring and control of ward environment</p>
        </div>

        {/* Ward Selector */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <label className="text-sm font-semibold whitespace-nowrap">Select Ward:</label>
              <Select value={selectedWardId} onValueChange={setSelectedWardId}>
                <SelectTrigger className="w-full max-w-xs">
                  <SelectValue placeholder="Select a ward" />
                </SelectTrigger>
                <SelectContent>
                  {wards?.map((ward) => (
                    <SelectItem key={ward.id} value={ward.id}>
                      {ward.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {environmentalData?.recorded_at && (
                <Badge variant="outline" className="ml-auto">
                  Last updated: {new Date(environmentalData.recorded_at).toLocaleTimeString()}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Environmental Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {/* Temperature */}
          <Card className="hover:shadow-lg transition-all animate-fade-in">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-warning" />
                Temperature
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-end gap-1">
                  <span className={`text-3xl font-bold ${tempStatus.color}`}>
                    {temperature.toFixed(1)}
                  </span>
                  <span className="text-muted-foreground text-sm mb-1">°C</span>
                </div>
                <Progress value={(temperature / 40) * 100} className="h-1.5" />
                <p className="text-xs text-muted-foreground">Optimal: 20-24°C</p>
                <Badge variant={tempStatus.variant}>
                  {tempStatus.label}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Humidity */}
          <Card className="hover:shadow-lg transition-all animate-fade-in">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Droplets className="h-4 w-4 text-primary" />
                Humidity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-end gap-1">
                  <span className={`text-3xl font-bold ${humidityStatus.color}`}>
                    {humidity.toFixed(0)}
                  </span>
                  <span className="text-muted-foreground text-sm mb-1">%</span>
                </div>
                <Progress value={humidity} className="h-1.5" />
                <p className="text-xs text-muted-foreground">Optimal: 40-60%</p>
                <Badge variant={humidityStatus.variant}>
                  {humidityStatus.label}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* CO2 */}
          <Card className="hover:shadow-lg transition-all animate-fade-in">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Wind className="h-4 w-4 text-muted-foreground" />
                CO₂ Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-end gap-1">
                  <span className={`text-3xl font-bold ${co2Status.color}`}>
                    {co2}
                  </span>
                  <span className="text-muted-foreground text-sm mb-1">ppm</span>
                </div>
                <Progress value={(co2 / 1000) * 100} className="h-1.5" />
                <p className="text-xs text-muted-foreground">Safe: &lt;800 ppm</p>
                <Badge variant={co2Status.variant}>
                  {co2Status.label}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* VOCs */}
          <Card className="hover:shadow-lg transition-all animate-fade-in">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Leaf className="h-4 w-4 text-secondary" />
                VOCs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-end gap-1">
                  <span className={`text-3xl font-bold ${vocStatus.color}`}>
                    {vocs}
                  </span>
                  <span className="text-muted-foreground text-sm mb-1">ppb</span>
                </div>
                <Progress value={(vocs / 500) * 100} className="h-1.5" />
                <p className="text-xs text-muted-foreground">Safe: &lt;300 ppb</p>
                <Badge variant={vocStatus.variant}>
                  {vocStatus.label}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Air Quality (PM2.5) */}
          <Card className="hover:shadow-lg transition-all animate-fade-in">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <AirVent className="h-4 w-4 text-primary" />
                Air Quality
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-end gap-1">
                  <span className={`text-3xl font-bold ${airQuality.color}`}>
                    {pm25}
                  </span>
                  <span className="text-muted-foreground text-sm mb-1">μg/m³</span>
                </div>
                <Progress value={(pm25 / 50) * 100} className="h-1.5" />
                <p className="text-xs text-muted-foreground">PM2.5 Level</p>
                <Badge variant={airQuality.variant}>
                  {airQuality.label}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actuator Controls */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Actuator Control Panel</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Fan Control */}
            <Card className={`hover:shadow-lg transition-all ${fanStatus ? 'border-primary bg-primary/5' : ''}`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Fan className={`h-5 w-5 ${fanStatus ? 'text-primary animate-spin' : 'text-muted-foreground'}`} />
                    <span>Exhaust Fan</span>
                  </div>
                  <Switch
                    checked={fanStatus}
                    onCheckedChange={(checked) => {
                      const id = getActuatorId("fan");
                      if (id) toggleActuator.mutate({ id, newStatus: checked });
                    }}
                    disabled={!getActuatorId("fan")}
                  />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge variant={fanStatus ? "default" : "secondary"}>
                      {fanStatus ? "Running" : "Off"}
                    </Badge>
                  </div>
                  {fanStatus && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Speed</span>
                        <span className="font-semibold">Medium</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                  )}
                  <Button 
                    variant={fanStatus ? "destructive" : "default"}
                    className="w-full"
                    onClick={() => {
                      const id = getActuatorId("fan");
                      if (id) toggleActuator.mutate({ id, newStatus: !fanStatus });
                    }}
                    disabled={!getActuatorId("fan")}
                  >
                    {fanStatus ? "Turn Off" : "Turn On"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* AC Control */}
            <Card className={`hover:shadow-lg transition-all ${acStatus ? 'border-primary bg-primary/5' : ''}`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Snowflake className={`h-5 w-5 ${acStatus ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span>Air Conditioner</span>
                  </div>
                  <Switch
                    checked={acStatus}
                    onCheckedChange={(checked) => {
                      const id = getActuatorId("ac");
                      if (id) toggleActuator.mutate({ id, newStatus: checked });
                    }}
                    disabled={!getActuatorId("ac")}
                  />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge variant={acStatus ? "default" : "secondary"}>
                      {acStatus ? "Cooling" : "Off"}
                    </Badge>
                  </div>
                  {acStatus && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Target Temp</span>
                        <span className="font-semibold">22°C</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                  )}
                  <Button 
                    variant={acStatus ? "destructive" : "default"}
                    className="w-full"
                    onClick={() => {
                      const id = getActuatorId("ac");
                      if (id) toggleActuator.mutate({ id, newStatus: !acStatus });
                    }}
                    disabled={!getActuatorId("ac")}
                  >
                    {acStatus ? "Turn Off" : "Turn On"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Air Purifier Control */}
            <Card className={`hover:shadow-lg transition-all ${purifierStatus ? 'border-secondary bg-secondary/5' : ''}`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AirVent className={`h-5 w-5 ${purifierStatus ? 'text-secondary' : 'text-muted-foreground'}`} />
                    <span>Air Purifier</span>
                  </div>
                  <Switch
                    checked={purifierStatus}
                    onCheckedChange={(checked) => {
                      const id = getActuatorId("air_purifier");
                      if (id) toggleActuator.mutate({ id, newStatus: checked });
                    }}
                    disabled={!getActuatorId("air_purifier")}
                  />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge variant={purifierStatus ? "default" : "secondary"}>
                      {purifierStatus ? "Active" : "Off"}
                    </Badge>
                  </div>
                  {purifierStatus && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Filter Life</span>
                        <span className="font-semibold">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                  )}
                  <Button 
                    variant={purifierStatus ? "destructive" : "default"}
                    className="w-full"
                    onClick={() => {
                      const id = getActuatorId("air_purifier");
                      if (id) toggleActuator.mutate({ id, newStatus: !purifierStatus });
                    }}
                    disabled={!getActuatorId("air_purifier")}
                  >
                    {purifierStatus ? "Turn Off" : "Turn On"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Data Source Info */}
        <Card className="mt-6 bg-muted/50">
          <CardContent className="py-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="font-semibold">Live Data Stream</p>
                <p className="text-sm text-muted-foreground">
                  {selectedWard?.name} • Auto-refresh every 10 seconds
                </p>
              </div>
              <Badge variant="default" className="animate-pulse">
                <span className="h-2 w-2 bg-secondary rounded-full mr-2 inline-block"></span>
                Connected
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WardDashboard;
