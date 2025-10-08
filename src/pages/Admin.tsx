import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { DashboardTab } from "@/components/admin/DashboardTab";
import { BedsTab } from "@/components/admin/BedsTab";
import { PatientsTab } from "@/components/admin/PatientsTab";
import { EnvironmentTab } from "@/components/admin/EnvironmentTab";
import { SettingsTab } from "@/components/admin/SettingsTab";

const Admin = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "dashboard");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab />;
      case "beds":
        return <BedsTab />;
      case "patients":
        return <PatientsTab />;
      case "environment":
        return <EnvironmentTab />;
      case "alerts":
        return <div className="text-center py-12 text-muted-foreground">Alerts Tab (Coming Soon)</div>;
      case "reports":
        return <div className="text-center py-12 text-muted-foreground">Reports Tab (Coming Soon)</div>;
      case "settings":
        return <SettingsTab />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/30">
        <AdminSidebar activeTab={activeTab} />
        
        <div className="flex-1">
          <header className="h-16 border-b bg-background flex items-center px-6">
            <SidebarTrigger className="mr-4" />
            <div>
              <h1 className="text-2xl font-bold">Doctor / Admin Panel</h1>
              <p className="text-sm text-muted-foreground">Comprehensive patient and hospital management</p>
            </div>
          </header>

          <main className="p-6">{renderTabContent()}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Admin;
