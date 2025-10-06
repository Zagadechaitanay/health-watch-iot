import { Thermometer, Droplets, Wind, Leaf, Fan, Snowflake, AirVent } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

const WardDashboard = () => {
  const [actuators, setActuators] = useState({
    fan: false,
    ac: false,
    airPurifier: true,
  });

  // Dummy environmental data
  const environmentalData = {
    temperature: 24.5,
    humidity: 55,
    co2: 420,
    vocs: 150,
    pm25: 12,
  };

  const toggleActuator = (device: keyof typeof actuators) => {
    setActuators(prev => ({
      ...prev,
      [device]: !prev[device]
    }));
  };

  const getAirQualityStatus = (pm25: number) => {
    if (pm25 <= 12) return { label: "Good", variant: "default" as const, color: "text-secondary" };
    if (pm25 <= 35) return { label: "Moderate", variant: "secondary" as const, color: "text-warning" };
    return { label: "Poor", variant: "destructive" as const, color: "text-destructive" };
  };

  const airQuality = getAirQualityStatus(environmentalData.pm25);

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Ward Environmental Dashboard</h1>
          <p className="text-muted-foreground">Real-time monitoring and control of ward environment</p>
        </div>

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
                  <span className="text-3xl font-bold text-warning">
                    {environmentalData.temperature}
                  </span>
                  <span className="text-muted-foreground text-sm mb-1">°C</span>
                </div>
                <Progress value={(environmentalData.temperature / 40) * 100} className="h-1.5" />
                <p className="text-xs text-muted-foreground">Optimal: 20-24°C</p>
                <Badge variant={environmentalData.temperature >= 20 && environmentalData.temperature <= 24 ? "default" : "secondary"}>
                  {environmentalData.temperature >= 20 && environmentalData.temperature <= 24 ? "Optimal" : "Adjusted"}
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
                  <span className="text-3xl font-bold text-primary">
                    {environmentalData.humidity}
                  </span>
                  <span className="text-muted-foreground text-sm mb-1">%</span>
                </div>
                <Progress value={environmentalData.humidity} className="h-1.5" />
                <p className="text-xs text-muted-foreground">Optimal: 40-60%</p>
                <Badge variant={environmentalData.humidity >= 40 && environmentalData.humidity <= 60 ? "default" : "secondary"}>
                  {environmentalData.humidity >= 40 && environmentalData.humidity <= 60 ? "Optimal" : "Adjusted"}
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
                  <span className="text-3xl font-bold">
                    {environmentalData.co2}
                  </span>
                  <span className="text-muted-foreground text-sm mb-1">ppm</span>
                </div>
                <Progress value={(environmentalData.co2 / 1000) * 100} className="h-1.5" />
                <p className="text-xs text-muted-foreground">Safe: &lt;800 ppm</p>
                <Badge variant={environmentalData.co2 < 800 ? "default" : "destructive"}>
                  {environmentalData.co2 < 800 ? "Good" : "High"}
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
                  <span className="text-3xl font-bold text-secondary">
                    {environmentalData.vocs}
                  </span>
                  <span className="text-muted-foreground text-sm mb-1">ppb</span>
                </div>
                <Progress value={(environmentalData.vocs / 500) * 100} className="h-1.5" />
                <p className="text-xs text-muted-foreground">Safe: &lt;300 ppb</p>
                <Badge variant={environmentalData.vocs < 300 ? "default" : "secondary"}>
                  {environmentalData.vocs < 300 ? "Good" : "Moderate"}
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
                    {environmentalData.pm25}
                  </span>
                  <span className="text-muted-foreground text-sm mb-1">μg/m³</span>
                </div>
                <Progress value={(environmentalData.pm25 / 50) * 100} className="h-1.5" />
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
            <Card className={`hover:shadow-lg transition-all ${actuators.fan ? 'border-primary bg-primary-light' : ''}`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Fan className={`h-5 w-5 ${actuators.fan ? 'text-primary animate-spin' : 'text-muted-foreground'}`} />
                    <span>Exhaust Fan</span>
                  </div>
                  <Switch
                    checked={actuators.fan}
                    onCheckedChange={() => toggleActuator('fan')}
                  />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge variant={actuators.fan ? "default" : "secondary"}>
                      {actuators.fan ? "Running" : "Off"}
                    </Badge>
                  </div>
                  {actuators.fan && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Speed</span>
                        <span className="font-semibold">Medium</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                  )}
                  <Button 
                    variant={actuators.fan ? "destructive" : "default"}
                    className="w-full"
                    onClick={() => toggleActuator('fan')}
                  >
                    {actuators.fan ? "Turn Off" : "Turn On"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* AC Control */}
            <Card className={`hover:shadow-lg transition-all ${actuators.ac ? 'border-primary bg-primary-light' : ''}`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Snowflake className={`h-5 w-5 ${actuators.ac ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span>Air Conditioner</span>
                  </div>
                  <Switch
                    checked={actuators.ac}
                    onCheckedChange={() => toggleActuator('ac')}
                  />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge variant={actuators.ac ? "default" : "secondary"}>
                      {actuators.ac ? "Cooling" : "Off"}
                    </Badge>
                  </div>
                  {actuators.ac && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Target Temp</span>
                        <span className="font-semibold">22°C</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                  )}
                  <Button 
                    variant={actuators.ac ? "destructive" : "default"}
                    className="w-full"
                    onClick={() => toggleActuator('ac')}
                  >
                    {actuators.ac ? "Turn Off" : "Turn On"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Air Purifier Control */}
            <Card className={`hover:shadow-lg transition-all ${actuators.airPurifier ? 'border-secondary bg-secondary-light' : ''}`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AirVent className={`h-5 w-5 ${actuators.airPurifier ? 'text-secondary' : 'text-muted-foreground'}`} />
                    <span>Air Purifier</span>
                  </div>
                  <Switch
                    checked={actuators.airPurifier}
                    onCheckedChange={() => toggleActuator('airPurifier')}
                  />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge variant={actuators.airPurifier ? "default" : "secondary"}>
                      {actuators.airPurifier ? "Active" : "Off"}
                    </Badge>
                  </div>
                  {actuators.airPurifier && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Filter Life</span>
                        <span className="font-semibold">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                  )}
                  <Button 
                    variant={actuators.airPurifier ? "destructive" : "default"}
                    className="w-full"
                    onClick={() => toggleActuator('airPurifier')}
                  >
                    {actuators.airPurifier ? "Turn Off" : "Turn On"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Environmental Trends */}
        <div>
          <h2 className="text-2xl font-bold mb-4">24-Hour Environmental Trends</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Avg Temperature</p>
                  <p className="text-2xl font-bold text-warning">23.8°C</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Avg Humidity</p>
                  <p className="text-2xl font-bold text-primary">52%</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Peak CO₂</p>
                  <p className="text-2xl font-bold">485 ppm</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Air Quality</p>
                  <p className="text-2xl font-bold text-secondary">Good</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Source Info */}
        <Card className="mt-6 bg-muted/50">
          <CardContent className="py-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="font-semibold">Live Data Stream</p>
                <p className="text-sm text-muted-foreground">
                  MQTT → Node-RED → MySQL | Last updated: Just now
                </p>
              </div>
              <Badge variant="default" className="animate-pulse-glow">
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
