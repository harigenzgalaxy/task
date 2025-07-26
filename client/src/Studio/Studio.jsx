import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { Menu } from "lucide-react";
import { StudioOwnerDashboard } from "./components/Dashboard";
import ClientsOverview from "./components/Client";

const Studio = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <StudioOwnerDashboard />;
      case "clients":
        return <ClientsOverview />;
      default:
        return <h1 className="text-2xl font-bold capitalize">{activeTab}</h1>;
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-background dark">
      {!mobileOpen && (
        <button
          className="lg:hidden absolute top-4 left-4 z-50 text-foreground"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className="flex-1 overflow-y-auto">
        <main className="p-8 w-full">{renderContent()}</main>
      </div>
    </div>
  );
};

export default Studio;
