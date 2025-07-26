import { StatCard } from '../../components/ui/StatCard';
import { useState,useEffect } from 'react';
import { Eye, Calendar as CalendarIcon, IndianRupee,Camera,DollarSign,Clock } from 'lucide-react';

import CalendarApp from '../../components/dashboard/Calendar';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Progress } from '../../components/ui/Progress';

export const Dashboard = () => {
const stats = [
  {
    title: "Profile Views",
    value: "2,847",
    icon: Eye,
    note: "▲ +12% from last month",
    className: "bg-gradient-to-br from-[#4c1d95] to-[#5b21b6]",
  },
  {
    title: "Ongoing Events",
    value: "4",
    icon: Camera,
    note: "📅 4 total events",
    className: "bg-gradient-to-br from-[#1e3a8a] to-[#1e40af]",
  },
  {
    title: "Total Earnings",
    value: "$7,500",
    icon: DollarSign,
    note: "▲ +8% from last month",
    className: "bg-gradient-to-br from-[#064e3b] to-[#065f46]",
  },
];
  return (
    <div className="space-y-8 ml-3 animate-fade-in">
      <div className="mt-6">
<h1 className="text-primary text-3xl font-bold">
  Dashboard
</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your photography business.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       
       
      {stats.map((s, i) => (
        <div key={i} className="transition-shadow duration-300 hover:shadow-lg hover:shadow-purple-500/40 rounded-xl">
          <StatCard
            title={s.title}
            value={s.value}
            icon={s.icon}
            note={s.note}
            className={s.className}
          />
        </div>
      ))}

      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Event Calendar</h2>
       
         
         <CalendarApp/>

      </div>


      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'New booking received', client: 'Wedding - Sharma Family', time: '2 hours ago' },
            { action: 'Portfolio updated', client: 'Added 15 new photos', time: '5 hours ago' },
            { action: 'Payment received', client: '₹25,000 from Kumar Wedding', time: '1 day ago' },
            { action: 'Event completed', client: 'Birthday Party - Gupta Family', time: '2 days ago' },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="space-y-1">
                <p className="font-medium text-foreground">{activity.action}</p>
                <p className="text-sm text-muted-foreground">{activity.client}</p>
              </div>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
