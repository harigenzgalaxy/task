import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import { Menu } from "lucide-react";
// import  Dashboard  from "./components/Dashboard";
import Dashboard from "./Pages/Dashboard";
import ClientsOverview from "./Pages/Client";
import { MyEventsPage } from "./Pages/MyEvents";
import { LeadSpacePage } from "./Pages/Leads";
import StudioProfile from "./Pages/StudioProfile";
import StudioSettings from "./Pages/StudioSettings";
import { DiscoverPage } from "./Pages/Discover";
import axios from "axios";
import { useParams } from "react-router-dom";
const Studio = () => {
const [data,setData]=useState([]);
const {id}=useParams();
  useEffect(()=>
  {
    const fetchData=async()=>
    {
      const response=await axios.get(`http://localhost:8000/api/owner/${id}`);
      setData(response.data);
      console.log(data);
    }
    fetchData();
  },[]);
  console.log(data);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard data={data} />;
      case "clients":
        return <ClientsOverview />;
      case "myevents":
        return <MyEventsPage />;
      case "leads":
        return <LeadSpacePage />;
      case "profile":
        return <StudioProfile data={data} />
      case "settings":
        return <StudioSettings />
      case "discover":
        return <DiscoverPage/>
      default:
        return <h1 className="text-2xl font-bold capitalize">{activeTab}</h1>;
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-background dark">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onOpen={() => setMobileOpen(true)}
        userData={data}
      />

      <div className="flex-1 overflow-y-auto lg:ml-14">
        <main className="p-8 w-full pt-20 lg:pt-8">{renderContent()}</main>
      </div>
    </div>
  );
};

export default Studio;
