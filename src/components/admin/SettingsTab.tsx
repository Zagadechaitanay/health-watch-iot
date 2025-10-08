import { Settings, Bell, Activity, Droplets, Wind } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function SettingsTab() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    // Vital Thresholds
    heartRateMin: 60,
    heartRateMax: 100,
    spo2Min: 95,
    temperatureMin: 36.5,
    temperatureMax: 37.5,
    
    // Environmental Thresholds
    co2Max: 800,
    tempMin: 20,
    tempMax: 24,
    humidityMin: 40,
    humidityMax: 60,
    
    // Notification Settings
    whatsappEnabled: true,
    emailEnabled: true,
    whatsappNumber: "+1234567890",
    emailAddress: "doctor@hospital.com",
    
    // Hydration Settings
    hydrationInterval: 2,
    
    // Auto Control
    autoFanOnCO2: true,
    autoACOnTemp: false,
  });

  const handleSave = () => {
    toast({
      title: "Settings saved successfully",
      description: "System configuration has been updated.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Vital Sign Thresholds */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-destructive" />
            <div>
              <CardTitle>Vital Sign Alert Thresholds</CardTitle>
              <CardDescription>Set limits for automatic alert generation</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Heart Rate Range (BPM)</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={settings.heartRateMin}
                  onChange={(e) => setSettings({...settings, heartRateMin: Number(e.target.value)})}
                  placeholder="Min"
                />
                <Input
                  type="number"
                  value={settings.heartRateMax}
                  onChange={(e) => setSettings({...settings, heartRateMax: Number(e.target.value)})}
                  placeholder="Max"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>SpO₂ Minimum (%)</Label>
              <Input
                type="number"
                value={settings.spo2Min}
                onChange={(e) => setSettings({...settings, spo2Min: Number(e.target.value)})}
              />
            </div>

            <div className="space-y-2">
              <Label>Temperature Range (°C)</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  step="0.1"
                  value={settings.temperatureMin}
                  onChange={(e) => setSettings({...settings, temperatureMin: Number(e.target.value)})}
                  placeholder="Min"
                />
                <Input
                  type="number"
                  step="0.1"
                  value={settings.temperatureMax}
                  onChange={(e) => setSettings({...settings, temperatureMax: Number(e.target.value)})}
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Environmental Thresholds */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wind className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Environmental Control Thresholds</CardTitle>
              <CardDescription>Set optimal ranges for ward environment</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>CO₂ Maximum (ppm)</Label>
              <Input
                type="number"
                value={settings.co2Max}
                onChange={(e) => setSettings({...settings, co2Max: Number(e.target.value)})}
              />
              <div className="flex items-center gap-2 mt-2">
                <Switch
                  checked={settings.autoFanOnCO2}
                  onCheckedChange={(checked) => setSettings({...settings, autoFanOnCO2: checked})}
                />
                <Label className="text-sm">Auto-start fan when exceeded</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Temperature Range (°C)</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={settings.tempMin}
                  onChange={(e) => setSettings({...settings, tempMin: Number(e.target.value)})}
                  placeholder="Min"
                />
                <Input
                  type="number"
                  value={settings.tempMax}
                  onChange={(e) => setSettings({...settings, tempMax: Number(e.target.value)})}
                  placeholder="Max"
                />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Switch
                  checked={settings.autoACOnTemp}
                  onCheckedChange={(checked) => setSettings({...settings, autoACOnTemp: checked})}
                />
                <Label className="text-sm">Auto-start AC when exceeded</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Humidity Range (%)</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={settings.humidityMin}
                  onChange={(e) => setSettings({...settings, humidityMin: Number(e.target.value)})}
                  placeholder="Min"
                />
                <Input
                  type="number"
                  value={settings.humidityMax}
                  onChange={(e) => setSettings({...settings, humidityMax: Number(e.target.value)})}
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-warning" />
            <div>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure alert delivery channels</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>WhatsApp Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive alerts via WhatsApp</p>
              </div>
              <Switch
                checked={settings.whatsappEnabled}
                onCheckedChange={(checked) => setSettings({...settings, whatsappEnabled: checked})}
              />
            </div>
            
            {settings.whatsappEnabled && (
              <div className="space-y-2 ml-4">
                <Label>WhatsApp Number</Label>
                <Input
                  type="tel"
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings({...settings, whatsappNumber: e.target.value})}
                  placeholder="+1234567890"
                />
              </div>
            )}

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive alerts via email</p>
              </div>
              <Switch
                checked={settings.emailEnabled}
                onCheckedChange={(checked) => setSettings({...settings, emailEnabled: checked})}
              />
            </div>
            
            {settings.emailEnabled && (
              <div className="space-y-2 ml-4">
                <Label>Email Address</Label>
                <Input
                  type="email"
                  value={settings.emailAddress}
                  onChange={(e) => setSettings({...settings, emailAddress: e.target.value})}
                  placeholder="doctor@hospital.com"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Hydration Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Hydration Reminder Settings</CardTitle>
              <CardDescription>Configure patient hydration alerts</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label>Reminder Interval (hours)</Label>
            <Input
              type="number"
              value={settings.hydrationInterval}
              onChange={(e) => setSettings({...settings, hydrationInterval: Number(e.target.value)})}
              min="1"
              max="6"
            />
            <p className="text-sm text-muted-foreground">
              Patients will receive hydration reminders every {settings.hydrationInterval} hours
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          <Settings className="h-4 w-4 mr-2" />
          Save All Settings
        </Button>
      </div>
    </div>
  );
}
