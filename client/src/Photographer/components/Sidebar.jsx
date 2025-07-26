import {
  LayoutDashboard,
  Calendar,
  Compass,
  Settings,
  Camera,
  X,
  LogOut,
  User,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'events', label: 'My Events', icon: Calendar },
  { id: 'discover', label: 'Discover', icon: Compass },
  // { id: 'settings', label: 'Profile Settings', icon: Settings },
  {id:'profile',label:'Profile',icon:User}
];

export const Sidebar = ({ activeTab, onTabChange, mobileOpen, onClose, collapsed, onToggleCollapse }) => {
  return (

    <div
      className={cn(
        "fixed top-0 h-screen bg-[#1b0f29] lg:bg-sidebar border-r border-sidebar-border z-40 transition-all duration-300 lg:translate-x-0 lg:static",
        mobileOpen ? "translate-x-0" : "-translate-x-full",
        collapsed ? "w-20" : "w-64"
      )}
    >

      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-sidebar-border relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Camera className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-lg font-semibold text-sidebar-foreground">PhotoStudio</h1>
                <p className="text-xs text-muted-foreground">Dashboard</p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleCollapse}
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="lg:hidden text-muted-foreground ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onTabChange(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200",
                      "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      isActive && "bg-sidebar-accent text-primary shadow-purple",
                      collapsed && "justify-center px-2"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-5 h-5 transition-colors",
                        isActive ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                    {!collapsed && (
                      <span
                        className={cn(
                          "font-medium transition-colors",
                          isActive ? "text-primary" : "text-sidebar-foreground"
                        )}
                      >
                        {item.label}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={cn("flex items-center gap-4 p-4 border-t transition-all duration-300", collapsed && "justify-center")}> 
          <img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-10 h-10 rounded-full" alt="Profile" />
          {!collapsed && (
            <>
              <div className="flex-1">
                <p className="text-sm font-bold font- text-accent ">John Doe</p>
                <p className="text-xs text-muted-foreground">Sales Manager</p>
              </div>
              <div className="flex gap-2">
                <Settings className="w-4 h-4 text-muted-foreground cursor-pointer" />
                <LogOut className="w-4 h-4 text-muted-foreground cursor-pointer" />
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
