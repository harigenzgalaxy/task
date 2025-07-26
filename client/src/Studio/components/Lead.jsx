"use client"

import * as React from "react"
import { motion } from "framer-motion"
// import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/Separator"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Filter,
  MoreVertical,
  Phone,
  Mail,
  Calendar,
  MapPin,
  DollarSign,
  User,
  Instagram,
  Globe,
  Facebook,
  MessageSquare,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Pause,
  Users,
} from "lucide-react"




// Sample data
const leadsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    eventDate: "2024-03-15",
    eventType: "Wedding",
    location: "Central Park, NYC",
    budget: "$5,000 - $10,000",
    status: "Active",
    source: "Instagram",
    assignedTo: "John Smith",
    priority: "High",
    submittedAt: "2024-01-15T10:30:00Z",
    notes: "Interested in full-day wedding coverage with engagement session",
    formType: "Wedding Photography Inquiry",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@techcorp.com",
    phone: "+1 (555) 987-6543",
    eventDate: "2024-02-28",
    eventType: "Corporate Event",
    location: "Downtown Conference Center",
    budget: "$2,500 - $5,000",
    status: "Won",
    source: "Website",
    assignedTo: "Emma Davis",
    priority: "Medium",
    submittedAt: "2024-01-12T14:20:00Z",
    notes: "Annual company meeting, needs headshots and event coverage",
    formType: "Corporate Photography Request",
  },
  {
    id: 3,
    name: "Lisa Rodriguez",
    email: "lisa.r@gmail.com",
    phone: "+1 (555) 456-7890",
    eventDate: "2024-04-10",
    eventType: "Birthday Party",
    location: "Private Residence",
    budget: "$1,000 - $2,500",
    status: "Paused",
    source: "Facebook",
    assignedTo: "Mike Wilson",
    priority: "Low",
    submittedAt: "2024-01-10T09:15:00Z",
    notes: "Sweet 16 party, wants fun and candid shots",
    formType: "Event Photography Form",
  },
  {
    id: 4,
    name: "David Thompson",
    email: "david.thompson@startup.io",
    phone: "+1 (555) 321-0987",
    eventDate: "2024-03-05",
    eventType: "Product Photography",
    location: "Studio",
    budget: "$1,500 - $3,000",
    status: "Active",
    source: "Google",
    assignedTo: "Lisa Chen",
    priority: "High",
    submittedAt: "2024-01-14T16:45:00Z",
    notes: "Tech startup needs product shots for website and marketing",
    formType: "Product Photography Inquiry",
  },
  {
    id: 5,
    name: "Amanda Foster",
    email: "amanda.foster@email.com",
    phone: "+1 (555) 654-3210",
    eventDate: "2024-05-20",
    eventType: "Graduation",
    location: "University Campus",
    budget: "$500 - $1,000",
    status: "Lost",
    source: "Referral",
    assignedTo: "John Smith",
    priority: "Medium",
    submittedAt: "2024-01-08T11:30:00Z",
    notes: "Family graduation photos, budget constraints",
    formType: "Family Photography Request",
  },
  {
    id: 6,
    name: "Robert Kim",
    email: "robert.kim@realestate.com",
    phone: "+1 (555) 789-0123",
    eventDate: "2024-02-25",
    eventType: "Real Estate",
    location: "Multiple Properties",
    budget: "$2,000 - $4,000",
    status: "Disqualified",
    source: "Website",
    assignedTo: "Emma Davis",
    priority: "Low",
    submittedAt: "2024-01-11T13:20:00Z",
    notes: "Real estate agent, needs property photos but unrealistic timeline",
    formType: "Real Estate Photography Form",
  },
]

// Status configurations
const statusConfig = {
  Active: { color: "bg-blue-600/20 text-blue-400 border-blue-600/30", icon: Clock },
  Paused: { color: "bg-yellow-600/20 text-yellow-400 border-yellow-600/30", icon: Pause },
  Won: { color: "bg-green-600/20 text-green-400 border-green-600/30", icon: CheckCircle },
  Lost: { color: "bg-red-600/20 text-red-400 border-red-600/30", icon: XCircle },
  Disqualified: { color: "bg-gray-600/20 text-gray-400 border-gray-600/30", icon: AlertCircle },
}

const priorityConfig = {
  High: { color: "bg-red-600/20 text-red-400 border-red-600/30" },
  Medium: { color: "bg-yellow-600/20 text-yellow-400 border-yellow-600/30" },
  Low: { color: "bg-green-600/20 text-green-400 border-green-600/30" },
}

const sourceIcons = {
  Instagram: Instagram,
  Website: Globe,
  Facebook: Facebook,
  Referral: MessageSquare,
  Google: Search,
}

// Lead Card Component

function LeadCard({ lead, onStatusChange }) {
  const StatusIcon = statusConfig[lead.status].icon
  const SourceIcon = sourceIcons[lead.source]

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatSubmittedDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className="border-gray-800 bg-gray-950/50 hover:bg-gray-950/70 transition-all hover:border-purple-600/30">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${lead.name.charAt(0)}`} />
              <AvatarFallback className="bg-purple-600 text-white">
                {lead.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="font-semibold text-white">{lead.name}</h3>
              <p className="text-sm text-gray-400">{lead.formType}</p>
              <div className="flex items-center gap-2">
                <Badge className={`${priorityConfig[lead.priority].color} border text-xs`}>
                  <Star className="h-3 w-3 mr-1" />
                  {lead.priority}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <SourceIcon className="h-3 w-3" />
                  {lead.source}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Select value={lead.status} onValueChange={(value) => onStatusChange(lead.id, value)}>
              <SelectTrigger className={`w-32 h-8 ${statusConfig[lead.status].color} border`}>
                <div className="flex items-center gap-1">
                  <StatusIcon className="h-3 w-3" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {Object.entries(statusConfig).map(([status, config]) => {
                  const Icon = config.icon
                  return (
                    <SelectItem key={status} value={status} className="text-white hover:bg-gray-700">
                      <div className="flex items-center gap-2">
                        <Icon className="h-3 w-3" />
                        {status}
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                <DropdownMenuItem className="text-white hover:bg-gray-700">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-gray-700">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Lead
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-gray-700">
                  <User className="h-4 w-4 mr-2" />
                  View Profile
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center text-gray-400">
              <Mail className="h-4 w-4 mr-2" />
              <span className="truncate">{lead.email}</span>
            </div>
            <div className="flex items-center text-gray-400">
              <Phone className="h-4 w-4 mr-2" />
              <span>{lead.phone}</span>
            </div>
            <div className="flex items-center text-gray-400">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{formatDate(lead.eventDate)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-gray-400">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="truncate">{lead.location}</span>
            </div>
            <div className="flex items-center text-gray-400">
              <DollarSign className="h-4 w-4 mr-2" />
              <span>{lead.budget}</span>
            </div>
            <div className="flex items-center text-gray-400">
              <User className="h-4 w-4 mr-2" />
              <span>Assigned to {lead.assignedTo}</span>
            </div>
          </div>
        </div>

        {lead.notes && (
          <div className="pt-2 border-t border-gray-800">
            <p className="text-sm text-gray-300 line-clamp-2">{lead.notes}</p>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 text-xs text-gray-500">
          <span>Submitted {formatSubmittedDate(lead.submittedAt)}</span>
          <span className="capitalize">{lead.eventType}</span>
        </div>
      </CardContent>
    </Card>
  )
}

// Main Component
export function LeadSpacePage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [sourceFilter, setSourceFilter] = React.useState("all")
  const [leads, setLeads] = React.useState(leadsData)

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.formType.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || lead.status === statusFilter
    const matchesSource = sourceFilter === "all" || lead.source === sourceFilter

    return matchesSearch && matchesStatus && matchesSource
  })

    const handleStatusChange = (leadId, newStatus) => {
    setLeads((prevLeads) => prevLeads.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead)))
  }

  const getStatusCounts = () => {
    return {
      total: leads.length,
      active: leads.filter((l) => l.status === "Active").length,
      won: leads.filter((l) => l.status === "Won").length,
      paused: leads.filter((l) => l.status === "Paused").length,
      lost: leads.filter((l) => l.status === "Lost").length,
    }
  }

  const statusCounts = getStatusCounts()

  return (
    <div className="flex-1 bg-gray-900">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-800 bg-gray-950/50 px-6">
        {/* <SidebarTrigger className="text-gray-400 hover:text-white" /> */}
        <Separator orientation="vertical" className="mr-2 h-4 bg-gray-700" />
        <h1 className="text-lg font-semibold text-white">Lead Space</h1>
      </header>

      <main className="flex-1 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Lead Management</h2>
              <p className="text-gray-400">Track and manage incoming client inquiries</p>
            </div>

            {/* Stats Overview */}
            <div className="flex gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{statusCounts.total}</div>
                <div className="text-gray-400">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{statusCounts.active}</div>
                <div className="text-gray-400">Active</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{statusCounts.won}</div>
                <div className="text-gray-400">Won</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{statusCounts.paused}</div>
                <div className="text-gray-400">Paused</div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search leads by name, email, or event type..."
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
                {Object.keys(statusConfig).map((status) => (
                  <SelectItem key={status} value={status} className="text-white hover:bg-gray-700">
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-gray-800 border-gray-700 text-white">
                <Globe className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by source" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all" className="text-white hover:bg-gray-700">
                  All Sources
                </SelectItem>
                {Object.keys(sourceIcons).map((source) => (
                  <SelectItem key={source} value={source} className="text-white hover:bg-gray-700">
                    {source}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Leads Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-1"
        >
          {filteredLeads.map((lead, index) => (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
            >
              <LeadCard lead={lead} onStatusChange={handleStatusChange} />
            </motion.div>
          ))}
        </motion.div>

        {filteredLeads.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <Users className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No leads found matching your criteria.</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filter settings.</p>
          </motion.div>
        )}
      </main>
    </div>
  )
}
