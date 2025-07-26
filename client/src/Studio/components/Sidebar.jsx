import {
  LayoutDashboard,
  Calendar,
  Compass,
  Users,
  Settings,
  Camera,
  X,
  LogOut, // Add LogOut icon
} from "lucide-react";
import { useState, useRef } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navItems = [
  { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
  { id: "myevents", name: "My Events", icon: Calendar },
  { id: "discover", name: "Discover", icon: Compass },
  { id: "clients", name: "Clients", icon: Users },
  { id: "profile", name: "Profile", icon: Camera },
  { id: "leads", name: "Leads", icon: Users },
  { id: "settings", name: "Settings", icon: Settings },
];

export default function Sidebar({ activeTab, onTabChange, mobileOpen, onClose }) {
  // Add collapsed state for desktop sidebar
  const [collapsed, setCollapsed] = useState(true);
  const hoverTimeout = useRef();

  // Only apply hover/collapse on desktop (md and above) with debounce
  const handleMouseEnter = () => {
    if (window.innerWidth >= 768) {
      hoverTimeout.current = setTimeout(() => setCollapsed(false), 180); // 180ms delay
    }
  };
  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) {
      clearTimeout(hoverTimeout.current);
      setCollapsed(true);
    }
  };

  return (
    <div
      className={cn(
        "fixed top-0 h-screen bg-[#1f1f2b] text-white shadow-xl flex flex-col z-40 transition-all duration-300",
        collapsed ? "w-20" : "w-80",
        "lg:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full",
        "lg:static"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={cn(
        "flex items-center transition-all duration-300 text-2xl font-bold tracking-wide px-6 py-6 bg-gradient-to-r from-purple-700 via-purple-500 to-indigo-600 text-white shadow-md relative",
        collapsed && "px-2 justify-center"
      )}>
        <span className="text-3xl">📸</span>
        <span
          className={cn(
            "ml-2 transition-all duration-300 overflow-hidden",
            collapsed
              ? "opacity-0 max-w-0 scale-x-75 translate-x-[-10px]"
              : "opacity-100 max-w-[200px] scale-x-100 translate-x-0"
          )}
          style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
        >
          Studio Owner
        </span>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 lg:hidden text-zinc-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className={cn(
        "flex-1 py-6 space-y-1 transition-all duration-300",
        collapsed ? "px-2" : "px-4"
      )}>
        {navItems.map(({ id, name, icon: Icon }) => (
          <button
            key={id}
            onClick={() => {
              onTabChange(id);
              onClose(); // close sidebar on mobile
            }}
            className={cn(
              "w-full flex items-center gap-3 py-2 rounded-md text-sm font-medium transition-all",
              collapsed ? "justify-center px-0" : "px-3",
              activeTab === id
                ? "bg-purple-600/90 text-white"
                : "text-zinc-300 hover:bg-zinc-800/70 hover:text-white"
            )}
          >
            <Icon className="w-5 h-5" />
            <span
              className={cn(
                "transition-all duration-300 overflow-hidden",
                collapsed
                  ? "opacity-0 max-w-0 scale-x-75 translate-x-[-10px]"
                  : "opacity-100 max-w-[120px] scale-x-100 translate-x-0"
              )}
              style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
            >
              {name}
            </span>
          </button>
        ))}
      </nav>

      {/* Profile section replaces copyright */}
      <div
        className={cn(
          "flex items-center gap-4 p-4 border-t transition-all duration-300",
          collapsed && "justify-center"
        )}
      >
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          className="w-10 h-10 rounded-full"
          alt="Profile"
        />
        <span
          className={cn(
            "flex-1 transition-all duration-300 overflow-hidden",
            collapsed
              ? "opacity-0 max-w-0 scale-x-75 translate-x-[-10px]"
              : "opacity-100 max-w-[200px] scale-x-100 translate-x-0"
          )}
          style={{ display: 'inline-block' }}
        >
          <div>
            <p className="text-sm font-bold text-accent ">John Doe</p>
            <p className="text-xs text-muted-foreground">Sales Manager</p>
          </div>
        </span>
        <span
          className={cn(
            "flex gap-2 transition-all duration-300 overflow-hidden",
            collapsed
              ? "opacity-0 max-w-0 scale-x-75 translate-x-[-10px]"
              : "opacity-100 max-w-[60px] scale-x-100 translate-x-0"
          )}
        >
          <Settings className="w-4 h-4 text-muted-foreground cursor-pointer" />
          <LogOut className="w-4 h-4 text-muted-foreground cursor-pointer" />
        </span>
      </div>
    </div>
  );
}
