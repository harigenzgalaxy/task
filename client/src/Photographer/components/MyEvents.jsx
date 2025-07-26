import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/Input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../components/ui/select";
import { Search } from "lucide-react";
import { CalendarIcon, Clock, MapPin, Eye, Edit3, CheckCircle2, X, ChevronLeft, ChevronRight,Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";


function MyEvents() {
  const [selectedDate, setSelectedDate] = useState(null);
  const nav = useNavigate();

  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date())
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Sarah & Mike Wedding",
      client: "Sarah Johnson",
      date: "2025-01-15",
      time: "14:00",
      location: "Central Park, NYC",
      status: "On-site",
    },
    {
      id: 2,
      name: "Corporate Headshots",
      client: "Tech Solutions Inc",
      date: "2025-01-18",
      time: "10:00",
      location: "Manhattan Office",
      status: "Upcoming",
    },
    {
      id: 3,
      name: "Birthday Party",
      client: "Martinez Family",
      date: "2025-01-20",
      time: "16:00",
      location: "Brooklyn Heights",
      status: "Delivered",
    },
    {
      id: 4,
      name: "Engagement Shoot",
      client: "Emma & David",
      date: "2025-01-22",
      time: "11:00",
      location: "Brooklyn Bridge",
      status: "Post-processing",
    },
    {
      id: 5,
      name: "Fashion Portfolio",
      client: "Model Agency NYC",
      date: "2025-01-25",
      time: "09:00",
      location: "Studio Downtown",
      status: "Upcoming",
    },
    {
      id: 6,
      name: "Product Photography",
      client: "E-commerce Brand",
      date: "2025-01-15",
      time: "13:00",
      location: "Studio A",
      status: "Cancelled",
    },
  ])

  const statusConfig = {
    Upcoming: { color: "bg-yellow-500", icon: Clock, textColor: "text-yellow-400" },
    "On-site": { color: "bg-orange-500", icon: Camera, textColor: "text-orange-400" },
    "Post-processing": { color: "bg-purple-500", icon: Edit3, textColor: "text-purple-400" },
    Delivered: { color: "bg-green-500", icon: CheckCircle2, textColor: "text-green-400" },
    Cancelled: { color: "bg-red-500", icon: X, textColor: "text-red-400" },
  }

  const getStatusBadge = (status) => {
    const config = statusConfig[status];
    if (!config) return null;
  
    const IconComponent = config.icon;
    return (
      <div
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white ${config.color}`}
      >
        <IconComponent className="h-3 w-3" />
        {status}
      </div>
    );
  };
  
  // Filter events based on search, status, and selected date
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.client.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || event.status === statusFilter

    // Fix the date matching logic
    let matchesDate = true
    if (selectedDate) {
      const selectedDateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
      matchesDate = event.date === selectedDateStr
    }

    return matchesSearch && matchesStatus && matchesDate
  })

  // Calendar navigation functions
  const goToPreviousMonth = () => {
    setCurrentCalendarDate(new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentCalendarDate(new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() + 1, 1))
  }

  const [showYearPicker, setShowYearPicker] = useState(false)

  const currentMonth = currentCalendarDate.getMonth()
  const currentYear = currentCalendarDate.getFullYear()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()



  const currentYearRange = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i)

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
  const goToYear = (year) => {
    setCurrentCalendarDate(new Date(year, currentCalendarDate.getMonth(), 1));
    setShowYearPicker(false);
  };
  
  const getEventsForDate = (day) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter((event) => event.date === dateStr);
  };
  
  const handleDateClick = (day) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(
      selectedDate?.getTime() === clickedDate.getTime() ? null : clickedDate
    );
  };
  

  const clearFilters = () => {
    setSearchQuery("")
    setStatusFilter("all")
    setSelectedDate(null)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Don't close if clicking on the year picker itself
      if (event.target.closest('.year-picker-container')) {
        return
      }
      setShowYearPicker(false)
    }

    if (showYearPicker) {
      document.addEventListener("click", handleClickOutside)
      return () => document.removeEventListener("click", handleClickOutside)
    }
  }, [showYearPicker])

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0c0c0c" }}>
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: "#c47cff" }}>
            My Events
          </h1>
          <p className="text-gray-400 mt-2">Manage your photography sessions and bookings</p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search events by name or client..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-transparent border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 bg-transparent border-gray-600 text-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="all" className="text-white hover:bg-gray-700">
                  All Status
                </SelectItem>
                <SelectItem value="Upcoming" className="text-white hover:bg-gray-700">
                  Upcoming
                </SelectItem>
                <SelectItem value="On-site" className="text-white hover:bg-gray-700">
                  On-site
                </SelectItem>
                <SelectItem value="Post-processing" className="text-white hover:bg-gray-700">
                  Post-processing
                </SelectItem>
                <SelectItem value="Delivered" className="text-white hover:bg-gray-700">
                  Delivered
                </SelectItem>
                <SelectItem value="Cancelled" className="text-white hover:bg-gray-700">
                  Cancelled
                </SelectItem>
              </SelectContent>
            </Select>

            {(searchQuery || statusFilter !== "all" || selectedDate) && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Events List */}
          <div className="xl:col-span-2">
            {selectedDate && (
              <div className="mb-4 p-3 rounded-lg border border-gray-600" style={{ backgroundColor: "#1b102b" }}>
                <div className="flex items-center justify-between">
                  <span className="text-white">
                    Showing events for{" "}
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedDate(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-4 max-h-screen overflow-y-auto pr-2">
              {filteredEvents.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-2">No events found</div>
                  <div className="text-sm text-gray-500">
                    {searchQuery || statusFilter !== "all" || selectedDate
                      ? "Try adjusting your filters"
                      : "You don't have any events scheduled"}
                  </div>
                </div>
              ) : (
                filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="rounded-lg p-4 md:p-6 border border-gray-700 hover:border-gray-600 transition-colors"
                    style={{ backgroundColor: "#1b102b" }}
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <h3 className="text-lg md:text-xl font-semibold text-white">{event.name}</h3>
                          {getStatusBadge(event.status)}
                        </div>
                        <p className="text-gray-300 mb-3">Client: {event.client}</p>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="h-4 w-4" />
                            {event.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {event.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {event.location}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                          // onClick={() => alert("View event details (placeholder)")}
                           onClick={() => nav(`/events/${event.id}`)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Calendar */}
          <div className="xl:col-span-1">
            <div
              className="rounded-lg p-4 md:p-6 border border-gray-700 sticky top-6"
              style={{ backgroundColor: "#1b102b" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 relative">
                  <h3
                    className="text-lg font-semibold text-white cursor-pointer hover:text-purple-400 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowYearPicker(!showYearPicker)
                    }}
                  >
                    {monthNames[currentMonth]} {currentYear}
                  </h3>
                  {showYearPicker && (
                    <div className="year-picker-container absolute top-8 left-0 bg-gray-800 border border-gray-600 rounded-lg p-2 z-20 grid grid-cols-2 gap-1 min-w-[120px]">
                      {currentYearRange.map((year) => (
                        <button
                          key={year}
                          onClick={(e) => {
                            e.stopPropagation()
                            goToYear(year)
                          }}
                          className={`px-3 py-1 text-sm rounded hover:bg-gray-700 transition-colors ${
                            year === currentYear ? "bg-purple-600 text-white" : "text-gray-300"
                          }`}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white p-1"
                    onClick={goToPreviousMonth}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white p-1"
                    onClick={goToNextMonth}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map((day) => (
                  <div key={day} className="text-center text-xs text-gray-400 p-2 font-medium">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for days before month starts */}
                {Array.from({ length: firstDayOfMonth }, (_, i) => (
                  <div key={`empty-${i}`} className="p-2"></div>
                ))}

                {/* Days of the month */}
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const day = i + 1
                  const dayEvents = getEventsForDate(day)
                  const hasEvents = dayEvents.length > 0
                  const isSelected =
                    selectedDate?.getDate() === day &&
                    selectedDate?.getMonth() === currentMonth &&
                    selectedDate?.getFullYear() === currentYear

                  return (
                    <div
                      key={day}
                      className={`relative p-2 text-center text-sm cursor-pointer rounded transition-colors ${
                        isSelected
                          ? "text-white font-bold"
                          : hasEvents
                            ? "text-white font-semibold hover:bg-gray-700"
                            : "text-gray-400 hover:text-white hover:bg-gray-700"
                      }`}
                      style={
                        isSelected
                          ? { backgroundColor: "#c47cff" }
                          : hasEvents
                            ? { backgroundColor: "rgba(196, 124, 255, 0.2)" }
                            : {}
                      }
                      onClick={() => handleDateClick(day)}
                    >
                      {day}
                      {hasEvents && !isSelected && (
                        <div
                          className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: "#c47cff" }}
                        ></div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-600">
                <div className="text-xs text-gray-400 mb-2">Legend:</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: "#c47cff" }}></div>
                    <span className="text-gray-300">Selected date</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: "rgba(196, 124, 255, 0.2)" }}></div>
                    <span className="text-gray-300">Has events</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#c47cff" }}></div>
                    <span className="text-gray-300">Event indicator</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



export default MyEvents;