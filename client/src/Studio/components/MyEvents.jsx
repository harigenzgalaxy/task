
import { Button } from "@/components/ui/button"

import * as React from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { EventCard } from "@/components/studio/event-card"
// import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/Separator"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Search, Filter, Plus, Check, ChevronDown, X, Calendar, Upload } from "lucide-react"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  eventTitle: z.string().min(1, "Event title is required"),
  client: z.string().min(1, "Client is required"),
  photographer: z.string().min(1, "Photographer is required"),
  printerVendor: z.string().optional(),
  eventType: z.string().min(1, "Event type is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  location: z.string().min(1, "Location is required"),
  budgetRange: z.string().min(1, "Budget range is required"),
  status: z.string().min(1, "Status is required"),
  notes: z.string().optional(),
  contract: z.any().optional(),
})


const clientOptions = [
  { value: "sarah-michael", label: "Sarah & Michael Johnson" },
  { value: "tech-solutions", label: "Tech Solutions Inc" },
  { value: "johnson-family", label: "Johnson Family" },
  { value: "fashion-brand", label: "Fashion Brand Co" },
  { value: "alex-jamie", label: "Alex & Jamie Smith" },
  { value: "prime-properties", label: "Prime Properties LLC" },
  { value: "creative-agency", label: "Creative Agency Studio" },
  { value: "wellness-center", label: "Wellness Center Group" },
]

const photographerOptions = [
  { value: "john-smith", label: "John Smith" },
  { value: "emma-davis", label: "Emma Davis" },
  { value: "mike-wilson", label: "Mike Wilson" },
  { value: "lisa-chen", label: "Lisa Chen" },
  { value: "david-brown", label: "David Brown" },
  { value: "sarah-taylor", label: "Sarah Taylor" },
  { value: "alex-johnson", label: "Alex Johnson" },
  { value: "maria-garcia", label: "Maria Garcia" },
]

const printerVendorOptions = [
  { value: "premium-prints", label: "Premium Prints Studio" },
  { value: "quick-photo", label: "Quick Photo Services" },
  { value: "professional-lab", label: "Professional Photo Lab" },
  { value: "digital-masters", label: "Digital Masters Printing" },
  { value: "artisan-prints", label: "Artisan Print House" },
  { value: "express-photo", label: "Express Photo Solutions" },
]

const eventTypes = [
  "Wedding",
  "Birthday Party",
  "Corporate Event",
  "Engagement Session",
  "Family Portrait",
  "Product Photography",
  "Real Estate",
  "Graduation",
  "Anniversary",
  "Baby Shower",
  "Headshots",
  "Fashion Shoot",
]

const budgetRanges = [
  "$500 - $1,000",
  "$1,000 - $2,500",
  "$2,500 - $5,000",
  "$5,000 - $10,000",
  "$10,000 - $20,000",
  "$20,000 - $50,000",
  "$50,000+",
]

const statusOptions = ["Planned", "Ongoing", "Completed"]

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

// Searchable Select Component




function SearchableSelect({
  options,
  placeholder = "Select option...",
  value,
  onValueChange,
  allowClear = false,
}) {
  const [open, setOpen] = React.useState(false)
  const selectedOption = options.find((option) => option.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-gray-800 border-gray-700 text-white hover:bg-gray-700 focus:border-purple-500"
        >
          <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
          <div className="flex items-center gap-1">
            {allowClear && value && (
              <X
                className="h-4 w-4 text-gray-400 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation()
                  onValueChange?.("")
                }}
              />
            )}
            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-gray-800 border-gray-700">
        <Command className="bg-gray-800">
          <CommandInput
            placeholder={`Search ${placeholder.toLowerCase()}...`}
            className="text-white placeholder-gray-400"
          />
          <CommandList>
            <CommandEmpty className="text-gray-400 py-6 text-center text-sm">No option found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onValueChange?.(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                  className="text-white hover:bg-gray-700 cursor-pointer"
                >
                  <Check className={cn("mr-2 h-4 w-4", value === option.value ? "opacity-100" : "opacity-0")} />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export function MyEventsPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [isAddEventOpen, setIsAddEventOpen] = React.useState(false)

  // Form Hook
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventTitle: "",
      client: "",
      photographer: "",
      printerVendor: "",
      eventType: "",
      startDate: "",
      endDate: "",
      location: "",
      budgetRange: "",
      status: "Planned",
      notes: "",
    },
  })

  const filteredEvents = eventsData.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || event.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

    const handleFormSubmit = (data) => {
    console.log("New event added:", data)
    reset()
    setIsAddEventOpen(false)
  }

  const handleCancel = () => {
    reset()
    setIsAddEventOpen(false)
  }

  return (
    <div className="flex-1 bg-gray-900">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-800 bg-gray-950/50 px-6">
        {/* <SidebarTrigger className="text-gray-400 hover:text-white" /> */}   
        <Separator orientation="vertical" className="mr-2 h-4 bg-gray-700" />
        <h1 className="text-lg font-semibold text-white">My Events</h1>
      </header>

      <main className="flex-1 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Events Management</h2>
              <p className="text-gray-400">Manage and track all your photography events</p>
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
                <SelectTrigger className="w-full sm:w-[180px] bg-gray-800 border-gray-700 text-white">
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
        </motion.div>

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
              <EventCard event={event} />
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

        {/* Add New Event Dialog */}
        <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
          <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">Add New Event</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
              {/* First Row - Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Event Title */}
                <div className="space-y-2">
                  <Label htmlFor="eventTitle" className="text-gray-300">
                    Event Title *
                  </Label>
                  <Input
                    id="eventTitle"
                    placeholder="Enter event title"
                    {...register("eventTitle")}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20"
                  />
                  {errors.eventTitle && <p className="text-sm text-red-400">{errors.eventTitle.message}</p>}
                </div>

                {/* Client */}
                <div className="space-y-2">
                  <Label className="text-gray-300">Client *</Label>
                  <SearchableSelect
                    options={clientOptions}
                    placeholder="Search or select client"
                    value={watch("client")}
                    onValueChange={(value) => setValue("client", value)}
                  />
                  {errors.client && <p className="text-sm text-red-400">{errors.client.message}</p>}
                </div>

                {/* Photographer */}
                <div className="space-y-2">
                  <Label className="text-gray-300">Photographer *</Label>
                  <SearchableSelect
                    options={photographerOptions}
                    placeholder="Search or select photographer"
                    value={watch("photographer")}
                    onValueChange={(value) => setValue("photographer", value)}
                  />
                  {errors.photographer && <p className="text-sm text-red-400">{errors.photographer.message}</p>}
                </div>

                {/* Printer/Vendor */}
                <div className="space-y-2">
                  <Label className="text-gray-300">Printer/Vendor (Optional)</Label>
                  <SearchableSelect
                    options={printerVendorOptions}
                    placeholder="Search or select printer/vendor"
                    value={watch("printerVendor")}
                    onValueChange={(value) => setValue("printerVendor", value)}
                    allowClear
                  />
                  {errors.printerVendor && <p className="text-sm text-red-400">{errors.printerVendor.message}</p>}
                </div>

                {/* Event Type */}
                <div className="space-y-2">
                  <Label className="text-gray-300">Event Type *</Label>
                  <Select onValueChange={(value) => setValue("eventType", value)} value={watch("eventType")}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-purple-500">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {eventTypes.map((type) => (
                        <SelectItem key={type} value={type} className="text-white hover:bg-gray-700 focus:bg-gray-700">
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.eventType && <p className="text-sm text-red-400">{errors.eventType.message}</p>}
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <Label className="text-gray-300">Status *</Label>
                  <Select onValueChange={(value) => setValue("status", value)} value={watch("status")}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-purple-500">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {statusOptions.map((status) => (
                        <SelectItem
                          key={status}
                          value={status}
                          className="text-white hover:bg-gray-700 focus:bg-gray-700"
                        >
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.status && <p className="text-sm text-red-400">{errors.status.message}</p>}
                </div>
              </div>

              {/* Date Range Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="h-5 w-5 text-purple-400" />
                  <h3 className="text-lg font-semibold text-white">Event Dates</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Start Date */}
                  <div className="space-y-2">
                    <Label htmlFor="startDate" className="text-gray-300">
                      Start Date *
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      {...register("startDate")}
                      className="bg-gray-800 border-gray-700 text-white focus:border-purple-500 focus:ring-purple-500/20"
                    />
                    {errors.startDate && <p className="text-sm text-red-400">{errors.startDate.message}</p>}
                  </div>

                  {/* End Date */}
                  <div className="space-y-2">
                    <Label htmlFor="endDate" className="text-gray-300">
                      End Date *
                    </Label>
                    <Input
                      id="endDate"
                      type="date"
                      {...register("endDate")}
                      className="bg-gray-800 border-gray-700 text-white focus:border-purple-500 focus:ring-purple-500/20"
                    />
                    {errors.endDate && <p className="text-sm text-red-400">{errors.endDate.message}</p>}
                  </div>
                </div>
              </div>

              {/* Location and Budget */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-gray-300">
                    Location *
                  </Label>
                  <Input
                    id="location"
                    placeholder="Enter event location"
                    {...register("location")}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20"
                  />
                  {errors.location && <p className="text-sm text-red-400">{errors.location.message}</p>}
                </div>

                {/* Budget Range */}
                <div className="space-y-2">
                  <Label className="text-gray-300">Budget Range *</Label>
                  <Select onValueChange={(value) => setValue("budgetRange", value)} value={watch("budgetRange")}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-purple-500">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {budgetRanges.map((range) => (
                        <SelectItem
                          key={range}
                          value={range}
                          className="text-white hover:bg-gray-700 focus:bg-gray-700"
                        >
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.budgetRange && <p className="text-sm text-red-400">{errors.budgetRange.message}</p>}
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-gray-300">
                  Notes or Instructions (Optional)
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Add any special notes or instructions for this event..."
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20 min-h-[100px]"
                  {...register("notes")}
                />
                {errors.notes && <p className="text-sm text-red-400">{errors.notes.message}</p>}
              </div>

              {/* Contract Upload */}
              <div className="space-y-2">
                <Label htmlFor="contract" className="text-gray-300">
                  Upload Contract (Optional)
                </Label>
                <div className="relative">
                  <Input
                    id="contract"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="bg-gray-800 border-gray-700 text-white file:bg-purple-600 file:text-white file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4 hover:file:bg-purple-700 focus:border-purple-500"
                    {...register("contract")}
                  />
                  <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
                {errors.contract && <p className="text-sm text-red-400">{errors.contract.message}</p>}
                <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, DOC, DOCX (Max 10MB)</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-gray-800">
                <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
                  Create Event
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
