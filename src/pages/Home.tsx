import { Heart, Activity, Droplet, AlertCircle, FileText, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-medical-iot.jpg";

const Home = () => {
  const features = [
    {
      icon: Heart,
      title: "Real-time Vital Monitoring",
      description: "Continuous tracking of heart rate, SpO₂, body temperature, and ECG waveforms with instant updates.",
      color: "text-destructive",
    },
    {
      icon: AlertCircle,
      title: "Emergency SOS Alerts",
      description: "Immediate notification system for critical situations with automated emergency response protocols.",
      color: "text-warning",
    },
    {
      icon: Droplet,
      title: "Hydration Reminders",
      description: "Smart alerts to ensure proper patient hydration with customizable scheduling.",
      color: "text-primary",
    },
    {
      icon: Activity,
      title: "Cloud Data Storage",
      description: "Secure MySQL database integration via MQTT and Node-RED for reliable data persistence.",
      color: "text-secondary",
    },
    {
      icon: FileText,
      title: "Auto PDF Reports",
      description: "Automated generation of comprehensive discharge reports with complete patient history.",
      color: "text-primary",
    },
    {
      icon: ShieldCheck,
      title: "Doctor Dashboard Access",
      description: "Dedicated admin panel for healthcare providers to monitor and manage all patients.",
      color: "text-secondary",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                IoT-Based Bed-Wise Patient Health Monitoring & Alert System
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90">
                Revolutionary smart hospital system with bed-wise monitoring powered by ESP32 microcontrollers per bed, 
                advanced biomedical sensors, and cloud technologies for real-time patient monitoring and care across multiple beds.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/patient-dashboard">
                  <Button size="lg" variant="secondary" className="shadow-lg">
                    View Patient Dashboard
                  </Button>
                </Link>
                <Link to="/admin">
                  <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    Admin Panel
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block animate-fade-in">
              <img 
                src={heroImage} 
                alt="Medical IoT Monitoring System" 
                className="rounded-2xl shadow-2xl border-4 border-white/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">About the System</h2>
            <p className="text-lg text-muted-foreground">
              Our IoT-based bed-wise patient health monitoring system represents the future of healthcare technology. 
              By deploying individual ESP32 microcontrollers per bed with advanced biomedical sensors, we provide continuous, 
              real-time monitoring of vital signs for each patient, enabling scalable deployment across multi-bed wards or entire hospitals.
            </p>
            <p className="text-lg text-muted-foreground">
              The system utilizes MQTT protocols and Node-RED for efficient data transmission from multiple ESP32 nodes (one per bed) 
              to a centralized MySQL database, enabling healthcare providers to access critical patient information per bed instantly. 
              With bed-specific automated alerts, comprehensive reporting, and intuitive bed-wise dashboards, we're making healthcare smarter, 
              safer, and more responsive at scale.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
            <p className="text-muted-foreground text-lg">
              Comprehensive monitoring and management capabilities for modern healthcare
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 animate-fade-in border-border/50">
                <CardHeader>
                  <div className={`${feature.color} mb-4`}>
                    <feature.icon className="h-12 w-12" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* System Flow Section */}
      <section className="py-20 bg-primary-light/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">System Architecture</h2>
            
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <Activity className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="font-semibold text-sm">ESP32 per Bed</p>
                  <p className="text-xs text-muted-foreground">Per-Bed Sensor Data</p>
                </div>
                
                <div className="hidden md:flex justify-center">
                  <div className="text-primary text-2xl">→</div>
                </div>
                
                <div className="text-center p-4 bg-secondary/10 rounded-lg">
                  <div className="h-8 w-8 mx-auto mb-2 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground text-xs font-bold">
                    MQTT
                  </div>
                  <p className="font-semibold text-sm">Node-RED</p>
                  <p className="text-xs text-muted-foreground">Data Pipeline</p>
                </div>
                
                <div className="hidden md:flex justify-center">
                  <div className="text-primary text-2xl">→</div>
                </div>
                
                <div className="text-center p-4 bg-warning/10 rounded-lg">
                  <div className="h-8 w-8 mx-auto mb-2 bg-warning rounded flex items-center justify-center text-warning-foreground text-xs font-bold">
                    DB
                  </div>
                  <p className="font-semibold text-sm">MySQL</p>
                  <p className="text-xs text-muted-foreground">Storage</p>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <div className="text-primary text-2xl mb-4">↓</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="font-semibold">Web Dashboard</p>
                    <p className="text-xs text-muted-foreground">Real-time Visualization</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="font-semibold">Alert System</p>
                    <p className="text-xs text-muted-foreground">WhatsApp & Email</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="font-semibold">PDF Reports</p>
                    <p className="text-xs text-muted-foreground">Automated Generation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-hero rounded-2xl p-12 text-center text-primary-foreground shadow-glow">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Experience the Future of Healthcare Monitoring
            </h2>
            <p className="text-lg mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
              Explore our comprehensive dashboards and see how IoT technology is transforming patient care.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/patient-dashboard">
                <Button size="lg" variant="secondary">
                  Patient Dashboard
                </Button>
              </Link>
              <Link to="/ward-dashboard">
                <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Ward Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
