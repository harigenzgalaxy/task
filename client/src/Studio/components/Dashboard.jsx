
import { useState } from "react"
import {
  Eye,
  TrendingUp,
  Clock,
  DollarSign,
  Camera,
  ChevronLeft,
  ChevronRight,
  Plus,
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
import { Checkbox } from "../../components/ui/checkbox"
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

// Calendar events data
const calendarEvents = [
  {
    id: 1,
    title: "Sarah & Mike Wedding",
    date: "2025-01-15",
    time: "14:00",
    type: "wedding",
    status: "confirmed",
  },
  {
    id: 2,
    title: "Corporate Headshots",
    date: "2025-01-18",
    time: "10:00",
    type: "corporate",
    status: "confirmed",
  },
  {
    id: 3,
    title: "Birthday Party",
    date: "2025-01-20",
    time: "16:00",
    type: "event",
    status: "pending",
  },
  {
    id: 4,
    title: "Engagement Shoot",
    date: "2025-01-22",
    time: "11:00",
    type: "engagement",
    status: "confirmed",
  },
  {
    id: 5,
    title: "Fashion Portfolio",
    date: "2025-01-25",
    time: "09:00",
    type: "fashion",
    status: "confirmed",
  },
  {
    id: 6,
    title: "Product Photography",
    date: "2025-01-15",
    time: "13:00",
    type: "product",
    status: "cancelled",
  },
  {
    id: 7,
    title: "Family Portrait",
    date: "2025-01-28",
    time: "15:00",
    type: "portrait",
    status: "confirmed",
  },
]

export default function Dashboard() {
  const [activeStatTab, setActiveStatTab] = useState("profile")
  const [calendarView, setCalendarView] = useState("month")
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date())
  const [checkedItems, setCheckedItems] = useState({
    "canon-r5": true,
    battery: false,
    "memory-cards": true,
    tripod: true,
    flash: false,
    "lens-70-200": true,
  })
  // Notification and profile dropdown state
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

  // Calendar functions
  const goToPreviousMonth = () => {
    setCurrentCalendarDate(new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentCalendarDate(new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() + 1, 1))
  }

  const currentMonth = currentCalendarDate.getMonth()
  const currentYear = currentCalendarDate.getFullYear()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  // Get events for a specific date
  const getEventsForDate = (day) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return calendarEvents.filter((event) => event.date === dateStr)
  }

  // Check if date is today
    const isToday = (day) => {
    const today = new Date()
    return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()
  }

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
      <div className="p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between relative">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold text-purple-400 animate-fade-in-up" style={{
              animation: 'fadeInUp 0.8s ease-out forwards',
              opacity: 0,
              transform: 'translateY(20px)'
            }}>
              Welcome back, Alex
            </h1>
            <p className="text-gray-400 animate-fade-in-up" style={{
              animation: 'fadeInUp 0.8s ease-out 0.2s forwards',
              opacity: 0,
              transform: 'translateY(20px)'
            }}>
              Photographer • {formatDate(currentDate)}
            </p>
          </div>
          <div className="flex items-center gap-4 relative">
            {/* Notification Bell */}
            <div className="relative">
              <Button
                variant="outline"
                size="icon"
                className="relative bg-transparent border-gray-600 text-gray-300 hover:text-purple-400 focus:text-purple-400"
                style={{ outline: 'none' }}
                onClick={() => {
                  setShowNotifications((prev) => !prev)
                  setShowProfileMenu(false)
                }}
              >
                <Bell className="h-4 w-4 transition-colors duration-200" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </Button>
              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50 animate-fade-in">
                  <div className="p-4 border-b border-gray-700 font-semibold text-purple-400">Notifications</div>
                  <ul className="divide-y divide-gray-700">
                    <li className="p-3 text-gray-200 hover:bg-gray-800 cursor-pointer">New booking: Sarah & Mike Wedding</li>
                    <li className="p-3 text-gray-200 hover:bg-gray-800 cursor-pointer">Payment received from Johnson Family</li>
                    <li className="p-3 text-gray-200 hover:bg-gray-800 cursor-pointer">Event reminder: Corporate Headshots</li>
                  </ul>
                  <div className="p-2 text-xs text-gray-400 text-center">No more notifications</div>
                </div>
              )}
            </div>
            {/* Profile Avatar */}
            <div className="relative">
              <Avatar className="h-10 w-10 cursor-pointer" onClick={() => {
                setShowProfileMenu((prev) => !prev)
                setShowNotifications(false)
              }}>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback className="bg-purple-600 text-white">AK</AvatarFallback>
              </Avatar>
              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50 animate-fade-in">
                  <ul className="divide-y divide-gray-700">
                    <li className="p-3 text-gray-200 hover:bg-gray-800 cursor-pointer">Profile</li>
                    <li className="p-3 text-gray-200 hover:bg-gray-800 cursor-pointer">Settings</li>
                    <li className="p-3 text-red-400 hover:bg-gray-800 cursor-pointer">Logout</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Stats Panel */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Views Tab */}
            <Card
              className={`cursor-pointer transition-all duration-300 border-2 ${
                activeStatTab === "profile"
                  ? "bg-purple-900/20 border-purple-500 shadow-lg shadow-purple-500/20"
                  : "bg-gray-900 border-gray-700 hover:border-purple-400"
              }`}
              onClick={() => setActiveStatTab("profile")}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Profile Views</CardTitle>
                <Eye className={`h-5 w-5 ${activeStatTab === "profile" ? "text-purple-400" : "text-gray-400"}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${activeStatTab === "profile" ? "text-purple-300" : "text-white"}`}>
                  2,847
                </div>
                <div className="flex items-center text-xs text-green-400 mt-2">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12.5% from last month
                </div>
                <div className="mt-3 h-2 bg-gray-700 rounded-full overflow-hidden">
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
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Ongoing Events</CardTitle>
                <Clock className={`h-5 w-5 ${activeStatTab === "events" ? "text-purple-400" : "text-gray-400"}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${activeStatTab === "events" ? "text-purple-300" : "text-white"}`}>
                  3
                </div>
                <p className="text-xs text-gray-400 mt-1">2 this week</p>
                <div className="mt-3">
                  <Progress value={65} className={`h-2 ${activeStatTab === "events" ? "[&>div]:bg-purple-500" : ""}`} />
                  <p className="text-xs text-gray-400 mt-1">65% completed</p>
                </div>
              </CardContent>
            </Card>

            {/* Total Earnings Tab */}
            <Card
              className={`cursor-pointer transition-all duration-300 border-2 ${
                activeStatTab === "earnings"
                  ? "bg-purple-900/20 border-purple-500 shadow-lg shadow-purple-500/20"
                  : "bg-gray-900 border-gray-700 hover:border-purple-400"
              }`}
              onClick={() => setActiveStatTab("earnings")}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Total Earnings</CardTitle>
                <DollarSign
                  className={`h-5 w-5 ${activeStatTab === "earnings" ? "text-purple-400" : "text-gray-400"}`}
                />
              </CardHeader>
              <CardContent>
                <div
                  className={`text-3xl font-bold ${activeStatTab === "earnings" ? "text-purple-300" : "text-white"}`}
                >
                  $12,450
                </div>
                <div className="flex items-center text-xs text-green-400 mt-2">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8.2% from last month
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chart Section */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-purple-400">
                {activeStatTab === "profile"
                  ? "Profile Views Analytics"
                  : activeStatTab === "earnings"
                    ? "Earnings Overview"
                    : "Events Timeline"}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {activeStatTab === "profile"
                  ? "Monthly profile view trends and engagement metrics"
                  : activeStatTab === "earnings"
                    ? "Revenue breakdown and financial performance"
                    : "Weekly event distribution and booking patterns"}
              </CardDescription>
            </CardHeader>
            <CardContent>{renderChart()}</CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Calendar Section */}
          <div className="xl:col-span-2">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-purple-400">Event Calendar</CardTitle>
                    <CardDescription className="text-gray-400">
                      Manage your photography sessions and bookings
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* View Toggle */}
                    <div className="flex bg-gray-800 rounded-lg p-1">
                      {["day", "week", "month"].map((view) => (
                        <Button
                          key={view}
                          variant="ghost"
                          size="sm"
                          className={`px-3 py-1 text-xs ${
                            calendarView === view
                              ? "bg-purple-600 text-white"
                              : "text-gray-400 hover:text-white hover:bg-gray-700"
                          }`}
                          onClick={() => setCalendarView(view)}
                        >
                          {view.charAt(0).toUpperCase() + view.slice(1)}
                        </Button>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Event
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">
                    {monthNames[currentMonth]} {currentYear}
                  </h3>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white hover:bg-gray-800"
                      onClick={goToPreviousMonth}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white hover:bg-gray-800"
                      onClick={goToNextMonth}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="space-y-2">
                  {/* Day Headers */}
                  <div className="grid grid-cols-7 gap-2">
                    {dayNames.map((day) => (
                      <div key={day} className="text-center text-sm font-medium text-gray-400 p-3">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-2">
                    {/* Empty cells for days before month starts */}
                    {Array.from({ length: firstDayOfMonth }, (_, i) => (
                      <div key={`empty-${i}`} className="h-24"></div>
                    ))}

                    {/* Days of the month */}
                    {Array.from({ length: daysInMonth }, (_, i) => {
                      const day = i + 1
                      const dayEvents = getEventsForDate(day)
                      const hasEvents = dayEvents.length > 0
                      const todayClass = isToday(day)

                      return (
                        <div
                          key={day}
                          className={`h-24 p-2 border border-gray-700 rounded-lg transition-colors hover:border-purple-500 cursor-pointer ${
                            todayClass
                              ? "bg-purple-600/20 border-purple-500"
                              : hasEvents
                                ? "bg-gray-800/50"
                                : "bg-gray-800/20"
                          }`}
                        >
                          <div
                            className={`text-sm font-medium mb-1 ${
                              todayClass ? "text-purple-300" : hasEvents ? "text-white" : "text-gray-400"
                            }`}
                          >
                            {day}
                          </div>
                          <div className="space-y-1">
                            {dayEvents.slice(0, 2).map((event) => (
                              <div
                                key={event.id}
                                className={`text-xs px-1 py-0.5 rounded truncate ${
                                  event.status === "confirmed"
                                    ? "bg-purple-600 text-white"
                                    : event.status === "pending"
                                      ? "bg-orange-600 text-white"
                                      : "bg-red-600 text-white"
                                }`}
                                title={`${event.title} - ${event.time}`}
                              >
                                {event.title}
                              </div>
                            ))}
                            {dayEvents.length > 2 && (
                              <div className="text-xs text-purple-400 font-medium">+{dayEvents.length - 2} more</div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Calendar Legend */}
                <div className="mt-6 pt-4 border-t border-gray-700">
                  <div className="flex items-center gap-6 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-purple-600"></div>
                      <span className="text-gray-300">Today</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-purple-600"></div>
                      <span className="text-gray-300">Confirmed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-orange-600"></div>
                      <span className="text-gray-300">Pending</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-red-600"></div>
                      <span className="text-gray-300">Cancelled</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Lead Summary */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2 text-purple-400">
                  <Users className="h-4 w-4" />
                  Lead Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Total Leads</span>
                  <span className="font-semibold text-white">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Won Leads</span>
                  <span className="font-semibold text-green-400">18</span>
                </div>
                <Separator className="bg-gray-700" />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-300">Conversion Rate</span>
                  <span className="font-bold text-lg text-green-400">75%</span>
                </div>
              </CardContent>
            </Card>

            {/* Ratings Widget */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2 text-purple-400">
                  <Star className="h-4 w-4" />
                  Client Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-white">4.9</div>
                  <div className="flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="text-sm text-gray-400">Based on 47 reviews</div>
                  <div className="text-xs text-green-400">+0.2 from last month</div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-purple-400">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="p-2 bg-gray-800 rounded-full">
                        <activity.icon className="h-4 w-4 text-purple-400" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm text-gray-300">{activity.message}</p>
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
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
