import {
  LayoutDashboard,
  Calendar,
  Compass,
  Users,
  Settings,
  Camera,
  X,
} from "lucide-react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navItems = [
  { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
  { id: "events", name: "My Events", icon: Calendar },
  { id: "discover", name: "Discover", icon: Compass },
  { id: "clients", name: "Clients", icon: Users },
  { id: "profile", name: "Profile", icon: Camera },
  { id: "settings", name: "Settings", icon: Settings },
];

export default function Sidebar({ activeTab, onTabChange, mobileOpen, onClose }) {
  return (
    <div
      className={cn(
        "fixed top-0 h-screen w-80 bg-[#1f1f2b] text-white shadow-xl flex flex-col z-40 transition-transform duration-300",
        "lg:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full",
        "lg:static"
      )}
    >
      <div className="text-2xl font-bold tracking-wide px-6 py-6 bg-gradient-to-r from-purple-700 via-purple-500 to-indigo-600 text-white shadow-md relative">
        StudioPanel
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 lg:hidden text-zinc-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map(({ id, name, icon: Icon }) => (
          <button
            key={id}
            onClick={() => {
              onTabChange(id);
              onClose(); // close sidebar on mobile
            }}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all",
              activeTab === id
                ? "bg-purple-600/90 text-white"
                : "text-zinc-300 hover:bg-zinc-800/70 hover:text-white"
            )}
          >
            <Icon className="w-5 h-5" />
            {name}
          </button>
        ))}
      </nav>

      <div className="p-4 text-xs text-zinc-400 text-center border-t border-zinc-700">
        © 2025 Studio App
      </div>
    </div>
  );
}
