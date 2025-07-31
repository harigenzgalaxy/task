import {
  LayoutDashboard,
  Calendar,
  Compass,
  Users,
  Settings,
  Camera,
  X,
  LogOut,
  Menu,
} from "lucide-react";
import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";

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

// Get initials from name
const getInitials = (name) => {
  if (!name) return "U";
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name[0].toUpperCase();
};

export default function Sidebar({ activeTab, onTabChange, mobileOpen, onClose, onOpen, userData }) {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <>
      {/* Mobile Hamburger Menu Button - Only visible on mobile */}
      <div className="lg:hidden fixed top-6 left-6 z-40">
        <button
          onClick={onOpen}
          className="w-10 h-10 bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg flex items-center justify-center text-zinc-300 hover:bg-zinc-800/70 hover:text-white transition-all duration-200 shadow-lg"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Desktop Fixed Sidebar - Hidden on mobile */}
      <div className="hidden lg:flex fixed top-0 left-0 h-screen w-14 z-50 flex-col items-center justify-center">
        {/* Vertical Pipe/Capsule Container */}
        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-full px-2 py-4 shadow-lg">
          {/* Navigation Items - Centered */}
          <nav className="flex flex-col items-center space-y-5">
            {navItems.map(({ id, name, icon: Icon, isProfile }) => (
              <div key={id} className="relative group">
                <button
                  onClick={() => {
                    onTabChange(id);
                  }}
                  onMouseEnter={() => setHoveredItem(id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={cn(
                    "w-12 h-12 flex items-center justify-center transition-all duration-200",
                    isProfile 
                      ? "rounded-full overflow-hidden border-2 border-zinc-600 hover:border-purple-400"
                      : "rounded-xl",
                    activeTab === id && !isProfile
                      ? "bg-purple-600/90 text-white shadow-sm"
                      : !isProfile
                      ? "text-zinc-300 hover:bg-zinc-800/70 hover:text-white"
                      : ""
                  )}
                >
                  {isProfile ? (
                    <Avatar className="w-full h-full">
                      <AvatarImage src={userData?.profileImage || "/placeholder.svg"} />
                      <AvatarFallback className="bg-purple-600 text-white text-sm font-medium">
                        {getInitials(userData?.name)}
                      </AvatarFallback>
                    </Avatar>
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

      {/* Mobile Sidebar - Slides in from left */}
      <div
        className={cn(
          "lg:hidden fixed top-0 left-0 h-screen w-80 z-50 bg-gray-900/95 backdrop-blur-sm border-r border-gray-700 shadow-2xl transition-transform duration-300 ease-in-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Mobile Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={userData?.profileImage || "/placeholder.svg"} />
              <AvatarFallback className="bg-purple-600 text-white">
                {getInitials(userData?.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-white">{userData?.name || "Studio Owner"}</div>
              <div className="text-sm text-gray-400">Studio Profile</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Navigation Items */}
        <nav className="p-6 space-y-2">
          {navItems.map(({ id, name, icon: Icon, isProfile }) => (
            <button
              key={id}
              onClick={() => {
                onTabChange(id);
                onClose();
              }}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200",
                activeTab === id
                  ? "bg-purple-600/90 text-white shadow-sm"
                  : "text-gray-300 hover:bg-gray-800/70 hover:text-white"
              )}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                {isProfile ? (
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={userData?.profileImage || "/placeholder.svg"} />
                    <AvatarFallback className="bg-purple-600 text-white text-xs">
                      {getInitials(userData?.name)}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>
              <span className="font-medium">{name}</span>
            </button>
          ))}
        </nav>

        {/* Mobile Sidebar Footer */}
        <div className="absolute bottom-6 left-6 right-6">
          <button className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800/70 hover:text-white transition-all duration-200">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
