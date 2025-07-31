import * as React from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { FadeInUp } from "@/components/ui/FadeInUp"
import { EventCard } from "../components/MyEvents/EventCard"
import { AddEvent } from "../components/MyEvents/AddEvent"

const eventsData = [
  {
    id: 1,
    title: "Wedding Photography",
    client: "Sarah & Michael",
    startDate: "2024-02-15",
    endDate: "2024-02-15",
    status: "Planned",
    photographer: "John Smith",
  },
  {
    id: 2,
    title: "Corporate Headshots",
    client: "Tech Solutions Inc",
    startDate: "2024-02-10",
    endDate: "2024-02-12",
    status: "Ongoing",
    photographer: "Emma Davis",
  },
  {
    id: 3,
    title: "Birthday Party",
    client: "Johnson Family",
    startDate: "2024-01-28",
    endDate: "2024-01-28",
    status: "Completed",
    photographer: "Mike Wilson",
  },
  {
    id: 4,
    title: "Product Photography",
    client: "Fashion Brand Co",
    startDate: "2024-02-20",
    endDate: "2024-02-22",
    status: "Planned",
    photographer: "Lisa Chen",
  },
  {
    id: 5,
    title: "Engagement Session",
    client: "Alex & Jamie",
    startDate: "2024-02-08",
    endDate: "2024-02-08",
    status: "Ongoing",
    photographer: "John Smith",
  },
  {
    id: 6,
    title: "Real Estate Photos",
    client: "Prime Properties",
    startDate: "2024-01-25",
    endDate: "2024-01-26",
    status: "Completed",
    photographer: "Emma Davis",
  },
]

export function MyEventsPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [isAddEventOpen, setIsAddEventOpen] = React.useState(false)
  const navigate = useNavigate()

  const filteredEvents = eventsData.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || event.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleFormSubmit = (data) => {
    console.log("New event added:", data)
    // Here you would typically add the event to your data source
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <FadeInUp>
        <div className="flex items-center justify-between relative">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold text-purple-400">
              My Events
            </h1>
            <p className="text-gray-400">
              Manage and track all your photography events
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button
              onClick={() => setIsAddEventOpen(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white border-purple-600 hover:border-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Event
            </Button>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-gray-800 border-gray-700 text-white hover:text-white">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all" className="text-white hover:bg-gray-700">
                  All Status
                </SelectItem>
                <SelectItem value="planned" className="text-white hover:bg-gray-700">
                  Planned
                </SelectItem>
                <SelectItem value="ongoing" className="text-white hover:bg-gray-700">
                  Ongoing
                </SelectItem>
                <SelectItem value="completed" className="text-white hover:bg-gray-700">
                  Completed
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </FadeInUp>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
          >
            <div
              role="button"
              tabIndex={0}
              onClick={() => navigate("/studio/events/view")}
              onKeyPress={e => { if (e.key === "Enter") navigate("/studio/events/view") }}
              className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
            >
              <EventCard event={event} />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredEvents.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <p className="text-gray-400 text-lg">No events found matching your criteria.</p>
        </motion.div>
      )}

      {/* Add Event Dialog */}
      <AddEvent 
        open={isAddEventOpen} 
        onOpenChange={setIsAddEventOpen}
        onSubmit={handleFormSubmit}
      />
    </div>
  )
} 