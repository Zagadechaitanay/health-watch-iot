import { Wind, Droplet, CloudRain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function EnvironmentTab() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: wards } = useQuery({
    queryKey: ["wards-with-env"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("wards")
        .select(`
          *,
          environmental_data(temperature, humidity, co2, vocs, pm25, recorded_at),
          actuator_controls(device_type, status)
        `)
        .order("name");
      
      if (error) throw error;
      return data;
    },
  });

  const toggleActuator = useMutation({
    mutationFn: async ({ wardId, deviceType, currentStatus }: any) => {
      const { error } = await supabase
        .from("actuator_controls")
        .update({ status: !currentStatus, last_updated: new Date().toISOString() })
        .eq("ward_id", wardId)
        .eq("device_type", deviceType);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wards-with-env"] });
      toast({ title: "Actuator updated successfully" });
    },
  });

  const getActuatorStatus = (controls: any[], deviceType: string) => {
    return controls?.find(c => c.device_type === deviceType)?.status || false;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Ward Environmental Monitoring</h2>
        <p className="text-muted-foreground">Monitor and control environmental conditions</p>
      </div>

      {wards?.map((ward) => {
        const latestEnvData = ward.environmental_data?.[0];
        
        return (
          <Card key={ward.id}>
            <CardHeader>
              <CardTitle>{ward.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Temperature</p>
                  <p className="text-2xl font-bold text-warning">
                    {latestEnvData?.temperature || "--"}°C
                  </p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Humidity</p>
                  <p className="text-2xl font-bold text-primary">
                    {latestEnvData?.humidity || "--"}%
                  </p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">CO₂</p>
                  <p className="text-2xl font-bold">
                    {latestEnvData?.co2 || "--"} ppm
                  </p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">VOCs</p>
                  <p className="text-2xl font-bold">
                    {latestEnvData?.vocs || "--"} ppb
                  </p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">PM2.5</p>
                  <p className="text-2xl font-bold text-secondary">
                    {latestEnvData?.pm25 || "--"} μg/m³
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Actuator Controls</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Wind className="h-8 w-8 text-primary" />
                          <div>
                            <Label>Fan</Label>
                            <p className="text-xs text-muted-foreground">
                              {getActuatorStatus(ward.actuator_controls, "fan") ? "ON" : "OFF"}
                            </p>
                          </div>
                        </div>
                        <Switch 
                          checked={getActuatorStatus(ward.actuator_controls, "fan")}
                          onCheckedChange={() => toggleActuator.mutate({
                            wardId: ward.id,
                            deviceType: "fan",
                            currentStatus: getActuatorStatus(ward.actuator_controls, "fan")
                          })}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Droplet className="h-8 w-8 text-secondary" />
                          <div>
                            <Label>AC</Label>
                            <p className="text-xs text-muted-foreground">
                              {getActuatorStatus(ward.actuator_controls, "ac") ? "ON" : "OFF"}
                            </p>
                          </div>
                        </div>
                        <Switch 
                          checked={getActuatorStatus(ward.actuator_controls, "ac")}
                          onCheckedChange={() => toggleActuator.mutate({
                            wardId: ward.id,
                            deviceType: "ac",
                            currentStatus: getActuatorStatus(ward.actuator_controls, "ac")
                          })}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CloudRain className="h-8 w-8 text-warning" />
                          <div>
                            <Label>Air Purifier</Label>
                            <p className="text-xs text-muted-foreground">
                              {getActuatorStatus(ward.actuator_controls, "air_purifier") ? "ON" : "OFF"}
                            </p>
                          </div>
                        </div>
                        <Switch 
                          checked={getActuatorStatus(ward.actuator_controls, "air_purifier")}
                          onCheckedChange={() => toggleActuator.mutate({
                            wardId: ward.id,
                            deviceType: "air_purifier",
                            currentStatus: getActuatorStatus(ward.actuator_controls, "air_purifier")
                          })}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
