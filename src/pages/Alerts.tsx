import { AlertCircle, Bell, Mail, MessageSquare, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Alerts = () => {
  const realtimeAlerts = [
    {
      id: 1,
      type: "critical",
      title: "High Heart Rate Detected - Bed 3",
      message: "Patient P003 heart rate: 125 BPM (Normal: 60-100)",
      patientName: "Robert Johnson",
      patientId: "P003",
      bedNumber: "Bed 3",
      timestamp: "2024-01-15 14:32:15",
      status: "active",
    },
    {
      id: 2,
      type: "warning",
      title: "Low SpO₂ Level - Bed 2",
      message: "Patient P002 SpO₂ dropped to 93% (Normal: >95%)",
      patientName: "Jane Smith",
      patientId: "P002",
      bedNumber: "Bed 2",
      timestamp: "2024-01-15 13:15:42",
      status: "acknowledged",
    },
    {
      id: 3,
      type: "sos",
      title: "SOS Emergency Triggered - Bed 2",
      message: "Patient P002 activated emergency SOS button",
      patientName: "Jane Smith",
      patientId: "P002",
      bedNumber: "Bed 2",
      timestamp: "2024-01-15 12:08:33",
      status: "resolved",
    },
  ];

  const environmentalAlerts = [
    {
      id: 4,
      type: "warning",
      title: "High CO₂ Level",
      message: "Ward 3 CO₂ level: 850 ppm (Normal: <800)",
      ward: "Ward 3",
      timestamp: "2024-01-15 11:45:20",
      status: "active",
    },
    {
      id: 5,
      type: "info",
      title: "Temperature Adjustment",
      message: "Ward 2 temperature adjusted to 22°C",
      ward: "Ward 2",
      timestamp: "2024-01-15 10:30:15",
      status: "resolved",
    },
  ];

  const notifications = [
    {
      id: 1,
      type: "whatsapp",
      recipient: "+1234567890",
      message: "Alert: High HR for P003 - Bed 3",
      status: "sent",
      timestamp: "2024-01-15 14:32:20",
    },
    {
      id: 2,
      type: "email",
      recipient: "doctor@hospital.com",
      message: "Daily Summary Report - All Beds",
      status: "sent",
      timestamp: "2024-01-15 09:00:00",
    },
    {
      id: 3,
      type: "whatsapp",
      recipient: "+1234567891",
      message: "SOS Alert: P002 Emergency - Bed 2",
      status: "sent",
      timestamp: "2024-01-15 12:08:35",
    },
    {
      id: 4,
      type: "email",
      recipient: "admin@hospital.com",
      message: "Ward 3 Environmental Alert",
      status: "sent",
      timestamp: "2024-01-15 11:45:25",
    },
  ];

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical":
      case "sos":
        return "border-destructive bg-destructive-light";
      case "warning":
        return "border-warning bg-warning-light";
      case "info":
        return "border-primary bg-primary-light";
      default:
        return "";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
      case "sos":
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-warning" />;
      case "info":
        return <Bell className="h-5 w-5 text-primary" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="destructive" className="animate-pulse-glow">Active</Badge>;
      case "acknowledged":
        return <Badge variant="secondary">Acknowledged</Badge>;
      case "resolved":
        return <Badge variant="default">Resolved</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Alerts & Notifications</h1>
          <p className="text-muted-foreground">Real-time monitoring and alert management system</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all border-destructive/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Alerts</p>
                  <p className="text-3xl font-bold text-destructive">2</p>
                </div>
                <AlertCircle className="h-10 w-10 text-destructive/30 animate-pulse-glow" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today's Alerts</p>
                  <p className="text-3xl font-bold text-primary">8</p>
                </div>
                <Bell className="h-10 w-10 text-primary/30" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Resolved</p>
                  <p className="text-3xl font-bold text-secondary">15</p>
                </div>
                <CheckCircle className="h-10 w-10 text-secondary/30" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Response</p>
                  <p className="text-3xl font-bold text-warning">3.2m</p>
                </div>
                <Clock className="h-10 w-10 text-warning/30" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different alert types */}
        <Tabs defaultValue="realtime" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="realtime">Patient Alerts</TabsTrigger>
            <TabsTrigger value="environmental">Environmental</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          {/* Real-time Patient Alerts */}
          <TabsContent value="realtime" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  Patient Vital Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {realtimeAlerts.map((alert) => (
                  <Card key={alert.id} className={`${getAlertColor(alert.type)} transition-all hover:shadow-md`}>
                    <CardContent className="py-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-3 flex-1">
                          {getAlertIcon(alert.type)}
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-semibold">{alert.title}</h3>
                              {getStatusBadge(alert.status)}
                            </div>
                            <p className="text-sm text-muted-foreground">{alert.message}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                              <span>Patient: {alert.patientName} ({alert.patientId})</span>
                              <span>•</span>
                              <span className="font-semibold text-primary">{alert.bedNumber}</span>
                              <span>•</span>
                              <span>{alert.timestamp}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {alert.status === "active" && (
                            <>
                              <Button size="sm" variant="outline">Acknowledge</Button>
                              <Button size="sm" variant="default">Resolve</Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Environmental Alerts */}
          <TabsContent value="environmental" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-warning" />
                  Environmental Monitoring Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {environmentalAlerts.map((alert) => (
                  <Card key={alert.id} className={`${getAlertColor(alert.type)} transition-all hover:shadow-md`}>
                    <CardContent className="py-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-3 flex-1">
                          {getAlertIcon(alert.type)}
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-semibold">{alert.title}</h3>
                              {getStatusBadge(alert.status)}
                            </div>
                            <p className="text-sm text-muted-foreground">{alert.message}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>Location: {alert.ward}</span>
                              <span>•</span>
                              <span>{alert.timestamp}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {alert.status === "active" && (
                            <Button size="sm" variant="default">Resolve</Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Logs */}
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Notification Dispatch Logs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-all">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`p-2 rounded-full ${notification.type === 'whatsapp' ? 'bg-secondary/20' : 'bg-primary/20'}`}>
                          {notification.type === "whatsapp" ? (
                            <MessageSquare className="h-5 w-5 text-secondary" />
                          ) : (
                            <Mail className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{notification.message}</p>
                          <p className="text-sm text-muted-foreground">To: {notification.recipient}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="default" className="mb-1">
                            {notification.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* System Info */}
        <Card className="mt-6 bg-muted/50">
          <CardContent className="py-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="font-semibold">Alert Delivery System</p>
                <p className="text-sm text-muted-foreground">
                  Real-time alerts via WhatsApp API & Email SMTP | Powered by Node-RED
                </p>
              </div>
              <div className="flex gap-2">
                <Badge variant="default" className="animate-pulse-glow">
                  <span className="h-2 w-2 bg-secondary rounded-full mr-2 inline-block"></span>
                  Live Monitoring
                </Badge>
                <Badge variant="outline">All Systems Operational</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Alerts;
