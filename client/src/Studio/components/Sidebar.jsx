import {
  LayoutDashboard,
  Calendar,
  Compass,
  Users,
  Settings,
  Camera,
  X,
  LogOut,
} from "lucide-react";
import { useState, useRef } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navItems = [
  { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
  { id: "leads", name: "Leads", icon: Users },
  { id: "myevents", name: "My Events", icon: Calendar },
  { id: "discover", name: "Discover", icon: Compass },
  { id: "clients", name: "Clients", icon: Users },
  { id: "settings", name: "Settings", icon: Settings },
  { id: "profile", name: "Profile", icon: Camera, isProfile: true },
];

export default function Sidebar({ activeTab, onTabChange, mobileOpen, onClose }) {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Fixed sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 h-screen w-14 z-50 flex flex-col items-center justify-center",
          "lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "lg:static"
        )}
      >
        {/* Vertical Pipe/Capsule Container */}
        <div className="bg-gray-900/80  backdrop-blur-sm border border-gray-700 rounded-full px-2 py-4 shadow-lg">
          {/* Navigation Items - Centered */}
          <nav className="flex flex-col items-center space-y-5">
            {navItems.map(({ id, name, icon: Icon, isProfile }) => (
              <div key={id} className="relative group">
                <button
                  onClick={() => {
                    onTabChange(id);
                    onClose();
                  }}
                  onMouseEnter={() => setHoveredItem(id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200",
                    isProfile && "rounded-full overflow-hidden border-2 border-zinc-600 hover:border-purple-400",
                    activeTab === id && !isProfile
                      ? "bg-purple-600/90 text-white shadow-sm"
                      : !isProfile
                      ? "text-zinc-300 hover:bg-zinc-800/70 hover:text-white"
                      : ""
                  )}
                >
                  {isProfile ? (
                    <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      className="w-full h-full object-cover"
                      alt="Profile"
                    />
                  ) : (
                    <Icon className="w-6 h-6" />
                  )}
                </button>

                {/* Tooltip */}
                {hoveredItem === id && (
                  <div className="absolute left-16 top-1/2 transform -translate-y-1/2 z-50">
                    <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
                      {name}
                      {/* Tooltip arrow */}
                      <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-0 border-r-4 border-y-2 border-transparent border-r-gray-900"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
