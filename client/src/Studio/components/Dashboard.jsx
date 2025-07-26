import React from "react";
import { StatCard } from "../../components/ui/StatCard";

import {
  Eye,
  Users,
  Calendar as CalendarIcon,
  IndianRupee,
  PlusCircle,
  FolderOpen,
  Settings,
} from "lucide-react";
import CalendarApp from "../../components/dashboard/Calendar";
import RecentSales from "./Recentsales";
import RevenueOverview from "./RevenueOverview";
export const StudioOwnerDashboard = () => {
    
  const stats = [
    { title: "Studio Owner Profile Views", value: "1,200", icon: Eye },
    { title: "Leads This Month", value: "48", icon: Users },
    { title: "Ongoing Events", value: "3", icon: CalendarIcon },
    { title: "Earnings", value: "₹75,000", icon: IndianRupee },
  ];
  const recentActivity = [
    { action: "New booking received", info: "Wedding - Sharma Family", time: "2 hours ago" },
    { action: "Portfolio updated", info: "Added 15 new photos", time: "5 hours ago" },
    { action: "Payment received", info: "₹25,000 from Kumar Wedding", time: "1 day ago" },
    { action: "Event completed", info: "Birthday Party - Gupta Family", time: "2 days ago" },
  ];

  const quickActions = [
    { label: "Create Event", icon: PlusCircle, onClick: () => {} },
    { label: "View Leads", icon: Users, onClick: () => {} },
    { label: "Open Projects", icon: FolderOpen, onClick: () => {} },
    { label: "Settings", icon: Settings, onClick: () => {} },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Heading + subtext (same spacing pattern as you wanted) */}
      <div className="space-y-2">
        <h1 className="text-primary text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your studio.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <StatCard key={i} title={s.title} value={s.value} icon={s.icon} />
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((qa, i) => (
            <button
              key={i}
              onClick={qa.onClick}
              className="flex items-center justify-center gap-2 rounded-lg border border-border bg-background py-2 px-3 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition"
            >
              <qa.icon className="w-4 h-4" />
              {qa.label}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Event Calendar</h2>
        <CalendarApp />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <RevenueOverview />
  <RecentSales />
</div>

    </div>
  );
};
