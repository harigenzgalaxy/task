import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { Menu } from "lucide-react";
// import  Dashboard  from "./components/Dashboard";
import Dashboard from "./components/Dashboard";
import ClientsOverview from "./components/Client";
import { MyEventsPage } from "./components/MyEvents";
import { LeadSpacePage } from "./components/Lead";
import StudioProfile from "./components/StudioProfile";
import StudioSettings from "./components/StudioSettings";
import Discover from "./components/Discover";

const Studio = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard onTabChange={setActiveTab} />;
      case "clients":
        return <ClientsOverview />;
      case "myevents":
        return <MyEventsPage />;
      case "leads":
        return <LeadSpacePage />;
      case "profile":
        return <StudioProfile />
      case "settings":
        return <StudioSettings />
      case "discover":
        return <Discover/>
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
