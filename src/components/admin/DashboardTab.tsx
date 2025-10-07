import { Users, Bed, AlertTriangle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function DashboardTab() {
  const { data: stats } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const [bedsResult, patientsResult, alertsResult] = await Promise.all([
        supabase.from("beds").select("*", { count: "exact" }),
        supabase.from("patients").select("*", { count: "exact" }).eq("status", "active"),
        supabase.from("alerts").select("*", { count: "exact" }).eq("status", "pending").eq("severity", "critical"),
      ]);

      const totalBeds = bedsResult.count || 0;
      const occupiedBeds = bedsResult.data?.filter(b => b.is_occupied).length || 0;
      const activePatientsCount = patientsResult.count || 0;
      const criticalAlerts = alertsResult.count || 0;

      return {
        totalBeds,
        occupiedBeds,
        availableBeds: totalBeds - occupiedBeds,
        activePatientsCount,
        criticalAlerts,
        occupancyRate: totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0,
      };
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Hospital Overview</h2>
        <p className="text-muted-foreground">Real-time system status and key metrics</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-all">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Patients</p>
                <p className="text-3xl font-bold text-primary">{stats?.activePatientsCount || 0}</p>
              </div>
              <Users className="h-8 w-8 text-primary/30" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all border-destructive/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical Alerts</p>
                <p className="text-3xl font-bold text-destructive">{stats?.criticalAlerts || 0}</p>
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
                <p className="text-3xl font-bold text-secondary">{stats?.availableBeds || 0}</p>
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
                <p className="text-3xl font-bold text-warning">{stats?.occupancyRate || 0}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-warning/30" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
