"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, User, CalendarIcon } from "lucide-react"
import { Button } from "./button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./Card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"
import { Input } from "./Input"
import { Label } from "./Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import { Textarea } from "./textarea"
import { Badge } from "./badge"

// Static events data
const staticEvents = [
  {
    id: 1,
    title: "Sarah & Mike Wedding",
    date: "2025-01-15",
    time: "14:00",
    endTime: "23:00",
    type: "wedding",
    status: "confirmed",
    location: "Grand Ballroom, The Plaza Hotel",
    client: "Sarah Johnson",
    description: "Beautiful wedding ceremony and reception photography",
  },
  {
    id: 2,
    title: "Corporate Headshots",
    date: "2025-01-18",
    time: "10:00",
    endTime: "16:00",
    type: "corporate",
    status: "confirmed",
    location: "TechCorp Office, Manhattan",
    client: "TechCorp Inc.",
    description: "Professional headshots for company executives",
  },
  {
    id: 3,
    title: "Birthday Party",
    date: "2025-01-20",
    time: "16:00",
    endTime: "20:00",
    type: "event",
    status: "pending",
    location: "Central Park",
    client: "Johnson Family",
    description: "Children's birthday party celebration",
  },
  {
    id: 4,
    title: "Engagement Shoot",
    date: "2025-01-22",
    time: "11:00",
    endTime: "13:00",
    type: "engagement",
    status: "confirmed",
    location: "Brooklyn Bridge",
    client: "Emma & James",
    description: "Romantic engagement photography session",
  },
  {
    id: 5,
    title: "Fashion Portfolio",
    date: "2025-01-25",
    time: "09:00",
    endTime: "17:00",
    type: "fashion",
    status: "confirmed",
    location: "Studio, SoHo",
    client: "Urban Style Co.",
    description: "Fashion brand portfolio shoot",
  },
  {
    id: 6,
    title: "Product Photography",
    date: "2025-01-15",
    time: "13:00",
    endTime: "17:00",
    type: "product",
    status: "cancelled",
    location: "Studio, Queens",
    client: "Artisan Jewelry",
    description: "High-end jewelry product photography",
  },
  {
    id: 7,
    title: "Family Portrait",
    date: "2025-01-28",
    time: "15:00",
    endTime: "17:00",
    type: "portrait",
    status: "confirmed",
    location: "Central Park",
    client: "The Johnson Family",
    description: "Annual family portrait session",
  },
]




export default function Calendar() {
  const [currentView, setCurrentView] = useState("month")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState(staticEvents)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    endTime: "",
    type: "",
    status: "pending",
    location: "",
    client: "",
    description: "",
  })

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
  const dayNamesShort = ["S", "M", "T", "W", "T", "F", "S"]

  // Navigation functions
  const goToPrevious = () => {
    const newDate = new Date(currentDate)
    if (currentView === "month") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else if (currentView === "week") {
      newDate.setDate(newDate.getDate() - 7)
    } else if (currentView === "day") {
      newDate.setDate(newDate.getDate() - 1)
    }
    setCurrentDate(newDate)
  }

  const goToNext = () => {
    const newDate = new Date(currentDate)
    if (currentView === "month") {
      newDate.setMonth(newDate.getMonth() + 1)
    } else if (currentView === "week") {
      newDate.setDate(newDate.getDate() + 7)
    } else if (currentView === "day") {
      newDate.setDate(newDate.getDate() + 1)
    }
    setCurrentDate(newDate)
  }

  // Get events for a specific date
  const getEventsForDate = (date) => {
    return events.filter((event) => event.date === date)
  }

  // Get events for current week
  const getEventsForWeek = () => {
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())

    const weekEvents = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      const dateStr = date.toISOString().split("T")[0]
      weekEvents.push({
        date: dateStr,
        events: getEventsForDate(dateStr),
      })
    }
    return weekEvents
  }

  // Get events for current day
  const getEventsForDay = () => {
    const dateStr = currentDate.toISOString().split("T")[0]
    return getEventsForDate(dateStr)
  }

  // Check if date is today
  const isToday = (dateStr) => {
    const today = new Date().toISOString().split("T")[0]
    return dateStr === today
  }

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-600"
      case "pending":
        return "bg-orange-600"
      case "cancelled":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  // Handle event click
  const handleEventClick = (event) => {
    setSelectedEvent(event)
    setIsEventDetailsOpen(true)
  }

  // Handle add event
  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      const event = {
        ...newEvent,
        id: events.length + 1,
      }
      setEvents([...events, event])
      setNewEvent({
        title: "",
        date: "",
        time: "",
        endTime: "",
        type: "",
        status: "pending",
        location: "",
        client: "",
        description: "",
      })
      setIsAddEventOpen(false)
    }
  }

  // Format time for display
    const formatTime = (time) => {
    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  // Generate time slots for day view
  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 0; hour < 24; hour++) {
      const time = `${hour.toString().padStart(2, "0")}:00`
      const displayTime = formatTime(time)
      slots.push({ time, displayTime })
    }
    return slots
  }

  // Render Month View
  const renderMonthView = () => {
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

    return (
      <div className="space-y-1 sm:space-y-2">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {dayNames.map((day, index) => (
            <div key={day} className="text-center text-xs sm:text-sm font-medium text-gray-400 p-1 sm:p-3">
              <span className="sm:hidden">{dayNamesShort[index]}</span>
              <span className="hidden sm:inline">{day}</span>
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {/* Empty cells for days before month starts */}
          {Array.from({ length: firstDayOfMonth }, (_, i) => (
            <div key={`empty-${i}`} className="h-16 sm:h-20 md:h-24"></div>
          ))}

          {/* Days of the month */}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
            const dayEvents = getEventsForDate(dateStr)
            const hasEvents = dayEvents.length > 0
            const todayClass = isToday(dateStr)

            return (
              <div
                key={day}
                className={`h-16 sm:h-20 md:h-24 p-1 sm:p-2 border border-gray-700 rounded-lg transition-colors hover:border-purple-500 cursor-pointer ${
                  todayClass ? "bg-purple-600/20 border-purple-500" : hasEvents ? "bg-gray-800/50" : "bg-gray-800/20"
                }`}
              >
                <div
                  className={`text-xs sm:text-sm font-medium mb-1 ${
                    todayClass ? "text-purple-300" : hasEvents ? "text-white" : "text-gray-400"
                  }`}
                >
                  {day}
                </div>
                <div className="space-y-0.5 sm:space-y-1">
                  {dayEvents.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs px-1 py-0.5 rounded truncate cursor-pointer hover:opacity-80 ${getStatusColor(event.status)} text-white`}
                      title={`${event.title} - ${formatTime(event.time)}`}
                      onClick={() => handleEventClick(event)}
                    >
                      <span className="sm:hidden">{event.title.slice(0, 8)}...</span>
                      <span className="hidden sm:inline">{event.title}</span>
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-purple-400 font-medium">+{dayEvents.length - 2}</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Render Week View
  const renderWeekView = () => {
    const weekEvents = getEventsForWeek()
    const timeSlots = generateTimeSlots()

    return (
      <div className="space-y-2">
        {/* Week Header */}
        <div className="grid grid-cols-8 gap-1 sm:gap-2">
          <div className="text-xs sm:text-sm font-medium text-gray-400 p-2">Time</div>
          {weekEvents.map((dayData, index) => {
            const date = new Date(dayData.date)
            const dayName = dayNames[date.getDay()]
            const dayNumber = date.getDate()
            const todayClass = isToday(dayData.date)

            return (
              <div key={dayData.date} className={`text-center p-2 rounded ${todayClass ? "bg-purple-600/20" : ""}`}>
                <div className="text-xs text-gray-400">{dayName}</div>
                <div className={`text-sm font-medium ${todayClass ? "text-purple-300" : "text-white"}`}>
                  {dayNumber}
                </div>
              </div>
            )
          })}
        </div>

        {/* Week Grid */}
        <div className="max-h-96 overflow-y-auto">
          <div className="grid grid-cols-8 gap-1 sm:gap-2">
            {timeSlots.map((slot) => (
              <div key={slot.time} className="contents">
                <div className="text-xs text-gray-400 p-2 border-r border-gray-700">{slot.displayTime}</div>
                {weekEvents.map((dayData) => {
                  const dayEvents = dayData.events.filter((event) => event.time.startsWith(slot.time.split(":")[0]))

                  return (
                    <div key={`${dayData.date}-${slot.time}`} className="min-h-12 p-1 border border-gray-700/50">
                      {dayEvents.map((event) => (
                        <div
                          key={event.id}
                          className={`text-xs p-1 rounded mb-1 cursor-pointer hover:opacity-80 ${getStatusColor(event.status)} text-white`}
                          onClick={() => handleEventClick(event)}
                        >
                          {event.title}
                        </div>
                      ))}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Render Day View
  const renderDayView = () => {
    const dayEvents = getEventsForDay()
    const timeSlots = generateTimeSlots()
    const dateStr = currentDate.toISOString().split("T")[0]
    const todayClass = isToday(dateStr)

    return (
      <div className="space-y-4">
        {/* Day Header */}
        <div className={`text-center p-4 rounded-lg ${todayClass ? "bg-purple-600/20" : "bg-gray-800/50"}`}>
          <div className="text-sm text-gray-400">{dayNames[currentDate.getDay()]}</div>
          <div className={`text-2xl font-bold ${todayClass ? "text-purple-300" : "text-white"}`}>
            {currentDate.getDate()}
          </div>
          <div className="text-sm text-gray-400">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </div>
        </div>

        {/* Day Events */}
        <div className="max-h-96 overflow-y-auto space-y-2">
          {timeSlots.map((slot) => {
            const slotEvents = dayEvents.filter((event) => event.time.startsWith(slot.time.split(":")[0]))

            return (
              <div key={slot.time} className="flex gap-4 min-h-12">
                <div className="w-20 text-xs text-gray-400 pt-2">{slot.displayTime}</div>
                <div className="flex-1 border-l border-gray-700 pl-4">
                  {slotEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`p-3 rounded-lg mb-2 cursor-pointer hover:opacity-80 ${getStatusColor(event.status)} text-white`}
                      onClick={() => handleEventClick(event)}
                    >
                      <div className="font-medium">{event.title}</div>
                      <div className="text-xs opacity-80">
                        {formatTime(event.time)} - {formatTime(event.endTime)}
                      </div>
                      <div className="text-xs opacity-80">{event.client}</div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          <div>
            <CardTitle className="text-sm sm:text-base md:text-lg text-purple-400">Event Calendar</CardTitle>
            <CardDescription className="text-xs sm:text-sm text-gray-400">
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
                  className={`px-2 sm:px-3 py-1 text-xs ${
                    currentView === view
                      ? "bg-purple-600 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-700"
                  }`}
                  onClick={() => setCurrentView(view)}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </Button>
              ))}
            </div>

            {/* Add Event Dialog */}
            <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 text-xs px-2 sm:px-3"
                >
                  <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Add Event</span>
                  <span className="sm:hidden">Add</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-gray-700 text-white">
                <DialogHeader>
                  <DialogTitle className="text-purple-400">Add New Event</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Create a new photography event or booking.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-gray-300">
                      Event Title
                    </Label>
                    <Input
                      id="title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="e.g., Wedding Photography"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date" className="text-gray-300">
                        Date
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="time" className="text-gray-300">
                        Start Time
                      </Label>
                      <Input
                        id="time"
                        type="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="endTime" className="text-gray-300">
                        End Time
                      </Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={newEvent.endTime}
                        onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="status" className="text-gray-300">
                        Status
                      </Label>
                      <Select
                        value={newEvent.status}
                          onValueChange={(value) => setNewEvent({ ...newEvent, status: value })}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="client" className="text-gray-300">
                      Client Name
                    </Label>
                    <Input
                      id="client"
                      value={newEvent.client}
                      onChange={(e) => setNewEvent({ ...newEvent, client: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="Client or company name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="location" className="text-gray-300">
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="Event location"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-gray-300">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="Event details and notes"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={handleAddEvent} className="flex-1 bg-purple-600 hover:bg-purple-700">
                      Add Event
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddEventOpen(false)}
                      className="border-gray-600 text-gray-300"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-2 sm:px-6 pb-3 sm:pb-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6 px-1 sm:px-0">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white">
            {currentView === "month" && `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
            {currentView === "week" &&
              `Week of ${monthNames[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`}
            {currentView === "day" &&
              `${monthNames[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`}
          </h3>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-gray-800 h-8 w-8 p-0"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-gray-800 h-8 w-8 p-0"
              onClick={goToNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Calendar Content */}
        {currentView === "month" && renderMonthView()}
        {currentView === "week" && renderWeekView()}
        {currentView === "day" && renderDayView()}

        {/* Calendar Legend */}
        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-700">
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs">
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded bg-purple-600"></div>
              <span className="text-gray-300">Today</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded bg-blue-600"></div>
              <span className="text-gray-300">Confirmed</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded bg-orange-600"></div>
              <span className="text-gray-300">Pending</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded bg-red-600"></div>
              <span className="text-gray-300">Cancelled</span>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Event Details Dialog */}
      <Dialog open={isEventDetailsOpen} onOpenChange={setIsEventDetailsOpen}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
          {selectedEvent && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="text-purple-400">{selectedEvent.title}</DialogTitle>
                    <DialogDescription className="text-gray-400">Event Details</DialogDescription>
                  </div>
                  <Badge className={`${getStatusColor(selectedEvent.status)} text-white`}>
                    {selectedEvent.status.charAt(0).toUpperCase() + selectedEvent.status.slice(1)}
                  </Badge>
                </div>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarIcon className="h-4 w-4 text-purple-400" />
                    <span className="text-gray-300">{new Date(selectedEvent.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-purple-400" />
                    <span className="text-gray-300">
                      {formatTime(selectedEvent.time)} - {formatTime(selectedEvent.endTime)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-purple-400" />
                  <span className="text-gray-300">{selectedEvent.client}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-purple-400" />
                  <span className="text-gray-300">{selectedEvent.location}</span>
                </div>

                {selectedEvent.description && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Description</h4>
                    <p className="text-sm text-gray-400">{selectedEvent.description}</p>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button className="flex-1 bg-purple-600 hover:bg-purple-700">Edit Event</Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
                    Delete
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}
