"use client"

import { useState } from "react"
import {
  Eye,
  TrendingUp,
  Clock,
  DollarSign,
  Camera,
  Bell,
  Users,
  Star,
  Cloud,
  MapPin,
  CheckCircle2,
  X,
  Upload,
  UserCheck,
  CreditCard,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "../../components/ui/Progress"
import { Separator } from "../../components/ui/Separator"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
  import Calendar from "../../components/ui/Calendar"

// Mock data for charts
const profileViewsData = [
  { name: "Jan", views: 2400 },
  { name: "Feb", views: 1398 },
  { name: "Mar", views: 9800 },
  { name: "Apr", views: 3908 },
  { name: "May", views: 4800 },
  { name: "Jun", views: 3800 },
  { name: "Jul", views: 4300 },
]

const earningsData = [
  { name: "Jan", earnings: 4000 },
  { name: "Feb", earnings: 3000 },
  { name: "Mar", earnings: 5000 },
  { name: "Apr", earnings: 4500 },
  { name: "May", earnings: 6000 },
  { name: "Jun", earnings: 5500 },
  { name: "Jul", earnings: 7000 },
]

const eventsData = [
  { name: "Week 1", events: 4 },
  { name: "Week 2", events: 6 },
  { name: "Week 3", events: 8 },
  { name: "Week 4", events: 5 },
  { name: "Week 5", events: 7 },
]

export default function Dashboard() {
  const [activeStatTab, setActiveStatTab] = useState("profile")
  const [checkedItems, setCheckedItems] = useState({
    "canon-r5": true,
    battery: false,
    "memory-cards": true,
    tripod: true,
    flash: false,
    "lens-70-200": true,
  })
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const currentDate = new Date()

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const toggleCheck = (id) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const recentActivities = [
    {
      id: 1,
      type: "upload",
      message: "Uploaded 45 photos from Sarah & Mike Wedding",
      time: "2 hours ago",
      icon: Upload,
    },
    {
      id: 2,
      type: "invite",
      message: "Accepted invitation for Corporate Headshots",
      time: "4 hours ago",
      icon: UserCheck,
    },
    {
      id: 3,
      type: "payment",
      message: "Received payment of $2,500 from Johnson Family",
      time: "1 day ago",
      icon: CreditCard,
    },
    { id: 4, type: "upload", message: "Uploaded 28 photos from Birthday Party", time: "2 days ago", icon: Upload },
  ]

  const gearChecklist = [
    { id: "canon-r5", name: "Canon R5", packed: checkedItems["canon-r5"] },
    { id: "battery", name: "Extra Batteries", packed: checkedItems["battery"] },
    { id: "memory-cards", name: "Memory Cards", packed: checkedItems["memory-cards"] },
    { id: "tripod", name: "Tripod", packed: checkedItems["tripod"] },
    { id: "flash", name: "External Flash", packed: checkedItems["flash"] },
    { id: "lens-70-200", name: "Lens 70-200mm", packed: checkedItems["lens-70-200"] },
  ]

  const renderChart = () => {
    switch (activeStatTab) {
      case "profile":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={profileViewsData}>
              <defs>
                <linearGradient id="profileGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c47cff" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#c47cff" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#F3F4F6",
                }}
              />
              <Area
                type="monotone"
                dataKey="views"
                stroke="#c47cff"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#profileGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )
      case "earnings":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#F3F4F6",
                }}
              />
              <Bar dataKey="earnings" fill="#c47cff" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )
      case "events":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={eventsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#F3F4F6",
                }}
              />
              <Line
                type="monotone"
                dataKey="events"
                stroke="#c47cff"
                strokeWidth={3}
                dot={{ fill: "#c47cff", strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, fill: "#c47cff" }}
              />
            </LineChart>
          </ResponsiveContainer>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
        {/* Header - Mobile Optimized */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-400">Welcome back, Alex</h1>
            <p className="text-sm sm:text-base text-gray-400">Photographer • {formatDate(currentDate)}</p>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 self-end sm:self-auto">
            {/* Notification Button */}
            <div className="relative overflow-visible">
              <Button
                variant="outline"
                size="icon"
                className="relative bg-transparent border-gray-600 text-gray-300 hover:text-purple-400 focus:text-purple-400 h-8 w-8 sm:h-10 sm:w-10"
                style={{ outline: 'none' }}
                onClick={() => {
                  setShowNotifications((prev) => !prev)
                  setShowProfileMenu(false)
                }}
              >
                <Bell className="h-3 w-3 sm:h-4 sm:w-4 transition-colors duration-200" />
                <span className="absolute -top-1 -right-1 h-2 w-2 sm:h-3 sm:w-3 bg-red-500 rounded-full"></span>
              </Button>
              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-[60] overflow-hidden transition-all duration-200 ease-in-out opacity-100 scale-100">
                  <div className="p-4 border-b border-gray-700 font-semibold text-purple-400">Notifications</div>
                  <ul className="divide-y divide-gray-700 max-h-64 overflow-y-auto">
                    <li className="p-3 text-gray-200 hover:bg-gray-800 cursor-pointer">New booking: Sarah & Mike Wedding</li>
                    <li className="p-3 text-gray-200 hover:bg-gray-800 cursor-pointer">Payment received from Johnson Family</li>
                    <li className="p-3 text-gray-200 hover:bg-gray-800 cursor-pointer">Event reminder: Corporate Headshots</li>
                  </ul>
                  <div className="p-2 text-xs text-gray-400 text-center">No more notifications</div>
                </div>
              )}
            </div>
            {/* Profile Avatar */}
            <div className="relative overflow-visible">
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10 cursor-pointer" onClick={() => {
                setShowProfileMenu((prev) => !prev)
                setShowNotifications(false)
              }}>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback className="bg-purple-600 text-white text-xs sm:text-sm">AK</AvatarFallback>
              </Avatar>
              {showProfileMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-[60] overflow-hidden transition-all duration-200 ease-in-out opacity-100 scale-100">
                  <ul className="divide-y divide-gray-700">
                    <li 
                      onClick={() => {
                        // Navigate to profile page
                        setShowProfileMenu(false)
                      }}
                      className="p-3 text-gray-200 hover:bg-gray-800 cursor-pointer">Profile</li>
                    <li 
                      onClick={() => {
                        // Navigate to settings page
                        setShowProfileMenu(false)
                      }}
                      className="p-3 text-gray-200 hover:bg-gray-800 cursor-pointer">Settings</li>
                    <li className="p-3 text-red-400 hover:bg-gray-800 cursor-pointer">Logout</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Stats Panel - Mobile Optimized */}
        <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {/* Profile Views Tab */}
            <Card
              className={`cursor-pointer transition-all duration-300 border-2 ${
                activeStatTab === "profile"
                  ? "bg-purple-900/20 border-purple-500 shadow-lg shadow-purple-500/20"
                  : "bg-gray-900 border-gray-700 hover:border-purple-400"
              }`}
              onClick={() => setActiveStatTab("profile")}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
                <CardTitle className="text-xs sm:text-sm font-medium text-gray-300">Profile Views</CardTitle>
                <Eye
                  className={`h-4 w-4 sm:h-5 sm:w-5 ${activeStatTab === "profile" ? "text-purple-400" : "text-gray-400"}`}
                />
              </CardHeader>
              <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                <div
                  className={`text-xl sm:text-2xl md:text-3xl font-bold ${activeStatTab === "profile" ? "text-purple-300" : "text-white"}`}
                >
                  2,847
                </div>
                <div className="flex items-center text-xs text-green-400 mt-1 sm:mt-2">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12.5% from last month
                </div>
                <div className="mt-2 sm:mt-3 h-1.5 sm:h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full w-3/4 rounded-full ${
                      activeStatTab === "profile" ? "bg-purple-500" : "bg-gray-600"
                    }`}
                  ></div>
                </div>
              </CardContent>
            </Card>

            {/* Ongoing Events Tab */}
            <Card
              className={`cursor-pointer transition-all duration-300 border-2 ${
                activeStatTab === "events"
                  ? "bg-purple-900/20 border-purple-500 shadow-lg shadow-purple-500/20"
                  : "bg-gray-900 border-gray-700 hover:border-purple-400"
              }`}
              onClick={() => setActiveStatTab("events")}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
                <CardTitle className="text-xs sm:text-sm font-medium text-gray-300">Ongoing Events</CardTitle>
                <Clock
                  className={`h-4 w-4 sm:h-5 sm:w-5 ${activeStatTab === "events" ? "text-purple-400" : "text-gray-400"}`}
                />
              </CardHeader>
              <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                <div
                  className={`text-xl sm:text-2xl md:text-3xl font-bold ${activeStatTab === "events" ? "text-purple-300" : "text-white"}`}
                >
                  3
                </div>
                <p className="text-xs text-gray-400 mt-1">2 this week</p>
                <div className="mt-2 sm:mt-3">
                  <Progress
                    value={65}
                    className={`h-1.5 sm:h-2 ${activeStatTab === "events" ? "[&>div]:bg-purple-500" : ""}`}
                  />
                  <p className="text-xs text-gray-400 mt-1">65% completed</p>
                </div>
              </CardContent>
            </Card>

            {/* Total Earnings Tab */}
            <Card
              className={`cursor-pointer transition-all duration-300 border-2 sm:col-span-2 lg:col-span-1 ${
                activeStatTab === "earnings"
                  ? "bg-purple-900/20 border-purple-500 shadow-lg shadow-purple-500/20"
                  : "bg-gray-900 border-gray-700 hover:border-purple-400"
              }`}
              onClick={() => setActiveStatTab("earnings")}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
                <CardTitle className="text-xs sm:text-sm font-medium text-gray-300">Total Earnings</CardTitle>
                <DollarSign
                  className={`h-4 w-4 sm:h-5 sm:w-5 ${activeStatTab === "earnings" ? "text-purple-400" : "text-gray-400"}`}
                />
              </CardHeader>
              <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                <div
                  className={`text-xl sm:text-2xl md:text-3xl font-bold ${activeStatTab === "earnings" ? "text-purple-300" : "text-white"}`}
                >
                  $12,450
                </div>
                <div className="flex items-center text-xs text-green-400 mt-1 sm:mt-2">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8.2% from last month
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chart Section - Mobile Optimized */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
              <CardTitle className="text-sm sm:text-base md:text-lg text-purple-400">
                {activeStatTab === "profile"
                  ? "Profile Views Analytics"
                  : activeStatTab === "earnings"
                    ? "Earnings Overview"
                    : "Events Timeline"}
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-gray-400">
                {activeStatTab === "profile"
                  ? "Monthly profile view trends and engagement metrics"
                  : activeStatTab === "earnings"
                    ? "Revenue breakdown and financial performance"
                    : "Weekly event distribution and booking patterns"}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2 sm:px-6 pb-3 sm:pb-6">
              <div className="w-full overflow-x-auto">
                <div className="min-w-[300px] h-[250px] sm:h-[300px]">{renderChart()}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Calendar Section - Mobile Optimized */}
          <div className="xl:col-span-2">
            <Calendar />
          </div>

          {/* Right Sidebar - Mobile Optimized */}
          <div className="space-y-4 sm:space-y-6">
            {/* Weather Widget */}


            {/* Lead Summary */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
                <CardTitle className="text-xs sm:text-sm flex items-center gap-2 text-purple-400">
                  <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                  Lead Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3 px-3 sm:px-6 pb-3 sm:pb-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-gray-400">Total Leads</span>
                  <span className="font-semibold text-white">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-gray-400">Won Leads</span>
                  <span className="font-semibold text-green-400">18</span>
                </div>
                <Separator className="bg-gray-700" />
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm font-medium text-gray-300">Conversion Rate</span>
                  <span className="font-bold text-base sm:text-lg text-green-400">75%</span>
                </div>
              </CardContent>
            </Card>

            {/* Gear Checklist */}


            {/* Ratings Widget */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
                <CardTitle className="text-xs sm:text-sm flex items-center gap-2 text-purple-400">
                  <Star className="h-3 w-3 sm:h-4 sm:w-4" />
                  Client Feedback
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                <div className="text-center space-y-1 sm:space-y-2">
                  <div className="text-2xl sm:text-3xl font-bold text-white">4.9</div>
                  <div className="flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400">Based on 47 reviews</div>
                  <div className="text-xs text-green-400">+0.2 from last month</div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
                <CardTitle className="text-xs sm:text-sm md:text-base text-purple-400">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                <div className="space-y-3 sm:space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 bg-gray-800 rounded-full">
                        <activity.icon className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-xs sm:text-sm text-gray-300">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
