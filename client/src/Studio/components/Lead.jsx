"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Separator } from "@/components/ui/Separator"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
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
  Plus,
  ChevronDown,
  ChevronUp,
  Archive,
  Tag,
} from "lucide-react"

// Sample data with updated structure
const leadsData = [
  {
    id: 1,
    title: "Sarah Johnson Wedding",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    eventDate: "2024-03-15",
    eventType: "Wedding",
    specialty: "Wedding",
    location: "Central Park, NYC",
    budget: "$5,000 - $10,000",
    status: "Active",
    source: "Instagram",
    assignedTo: "John Smith",
    priority: "High",
    created: "2024-01-15T10:30:00Z",
    notes: "Interested in full-day wedding coverage with engagement session",
    tags: ["B&W", "Church", "Couple"],
    archived: false,
  },
  {
    id: 2,
    title: "Michael Chen Corporate Event",
    name: "Michael Chen",
    email: "m.chen@techcorp.com",
    phone: "+1 (555) 987-6543",
    eventDate: "2024-02-28",
    eventType: "Corporate Event",
    specialty: "Corporate",
    location: "Downtown Conference Center",
    budget: "$2,500 - $5,000",
    status: "Won",
    source: "Website",
    assignedTo: "Emma Davis",
    priority: "Medium",
    created: "2024-01-12T14:20:00Z",
    notes: "Annual company meeting, needs headshots and event coverage",
    tags: ["Business", "Professional"],
    archived: false,
  },
  {
    id: 3,
    title: "Lisa Rodriguez Sweet 16",
    name: "Lisa Rodriguez",
    email: "lisa.r@gmail.com",
    phone: "+1 (555) 456-7890",
    eventDate: "2024-04-10",
    eventType: "Birthday Party",
    specialty: "Event",
    location: "Private Residence",
    budget: "$1,000 - $2,500",
    status: "Paused",
    source: "Facebook",
    assignedTo: "Mike Wilson",
    priority: "Low",
    created: "2024-01-10T09:15:00Z",
    notes: "Sweet 16 party, wants fun and candid shots",
    tags: ["Party", "Candid"],
    archived: false,
  },
  {
    id: 4,
    title: "David Thompson Product Photography",
    name: "David Thompson",
    email: "david.thompson@startup.io",
    phone: "+1 (555) 321-0987",
    eventDate: "2024-03-05",
    eventType: "Product Photography",
    specialty: "Commercial",
    location: "Studio",
    budget: "$1,500 - $3,000",
    status: "Active",
    source: "Google",
    assignedTo: "Lisa Chen",
    priority: "High",
    created: "2024-01-14T16:45:00Z",
    notes: "Tech startup needs product shots for website and marketing",
    tags: ["Product", "Studio"],
    archived: false,
  },
  {
    id: 5,
    title: "Amanda Foster Graduation",
    name: "Amanda Foster",
    email: "amanda.foster@email.com",
    phone: "+1 (555) 654-3210",
    eventDate: "2024-05-20",
    eventType: "Graduation",
    specialty: "Portrait",
    location: "University Campus",
    budget: "$500 - $1,000",
    status: "Lost",
    source: "Referral",
    assignedTo: "John Smith",
    priority: "Medium",
    created: "2024-01-08T11:30:00Z",
    notes: "Family graduation photos, budget constraints",
    tags: ["Family", "Graduation"],
    archived: false,
  },
  {
    id: 6,
    title: "Robert Kim Real Estate",
    name: "Robert Kim",
    email: "robert.kim@realestate.com",
    phone: "+1 (555) 789-0123",
    eventDate: "2024-02-25",
    eventType: "Real Estate",
    specialty: "Real Estate",
    location: "Multiple Properties",
    budget: "$2,000 - $4,000",
    status: "Disqualified",
    source: "Website",
    assignedTo: "Emma Davis",
    priority: "Low",
    created: "2024-01-11T13:20:00Z",
    notes: "Real estate agent, needs property photos but unrealistic timeline",
    tags: ["Property", "Architecture"],
    archived: true,
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

const sourceIcons = {
  Instagram: Instagram,
  Website: Globe,
  Facebook: Facebook,
  Referral: MessageSquare,
  Google: Search,
}

const specialtyOptions = ["Wedding", "Corporate", "Event", "Commercial", "Portrait", "Real Estate", "Fashion", "Test", "Other"]

const tagOptions = ["B&W", "Church", "Couple", "Business", "Professional", "Party", "Candid", "Product", "Studio", "Family", "Graduation", "Property", "Architecture"]

// Main Component
export function LeadSpacePage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [specialtyFilter, setSpecialtyFilter] = React.useState("all")
  const [sourceFilter, setSourceFilter] = React.useState("all")
  const [showArchived, setShowArchived] = React.useState(false)
  const [selectedTags, setSelectedTags] = React.useState([])
  const [sortField, setSortField] = React.useState("created")
  const [sortDirection, setSortDirection] = React.useState("desc")
  const [leads, setLeads] = React.useState(leadsData)

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredAndSortedLeads = React.useMemo(() => {
    let filtered = leads.filter((lead) => {
      const matchesSearch =
        lead.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.specialty.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || lead.status === statusFilter
      const matchesSpecialty = specialtyFilter === "all" || lead.specialty === specialtyFilter
      const matchesSource = sourceFilter === "all" || lead.source === sourceFilter
      const matchesArchived = showArchived ? true : !lead.archived
      const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => lead.tags.includes(tag))

      return matchesSearch && matchesStatus && matchesSpecialty && matchesSource && matchesArchived && matchesTags
    })

    // Sort leads
    filtered.sort((a, b) => {
      let aValue = a[sortField]
      let bValue = b[sortField]

      if (sortField === "created") {
        aValue = new Date(aValue)
        bValue = new Date(bValue)
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }, [leads, searchTerm, statusFilter, specialtyFilter, sourceFilter, showArchived, selectedTags, sortField, sortDirection])

  const handleStatusChange = (leadId, newStatus) => {
    setLeads((prevLeads) => prevLeads.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead)))
  }

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getStatusCounts = () => {
    return {
      total: leads.filter(l => !l.archived).length,
      active: leads.filter((l) => l.status === "Active" && !l.archived).length,
      won: leads.filter((l) => l.status === "Won" && !l.archived).length,
      paused: leads.filter((l) => l.status === "Paused" && !l.archived).length,
      lost: leads.filter((l) => l.status === "Lost" && !l.archived).length,
    }
  }

  const statusCounts = getStatusCounts()

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between relative">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold text-purple-400">
            Leads
          </h1>
          <p className="text-gray-400">
            Manage and track your client inquiries
          </p>
        </div>
        
        <div className="flex items-center gap-3">

        </div>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200 hover:shadow-lg hover:shadow-purple-500/25">
            <Plus className="h-4 w-4 mr-2" />
            New Lead
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-purple-500 hover:text-white transition-colors duration-200">
                <Filter className="h-4 w-4 mr-2" />
                Filters
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-4 bg-gray-800 border border-gray-700 shadow-lg">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Specialty</label>
                  <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                    <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="All Specialties" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="all" className="text-white hover:bg-gray-700">All Specialties</SelectItem>
                      {specialtyOptions.map((specialty) => (
                        <SelectItem key={specialty} value={specialty} className="text-white hover:bg-gray-700">
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Status</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="all" className="text-white hover:bg-gray-700">All Statuses</SelectItem>
                      {Object.keys(statusConfig).map((status) => (
                        <SelectItem key={status} value={status} className="text-white hover:bg-gray-700">
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Source</label>
                  <Select value={sourceFilter} onValueChange={setSourceFilter}>
                    <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="All Sources" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="all" className="text-white hover:bg-gray-700">All Sources</SelectItem>
                      {Object.keys(sourceIcons).map((source) => (
                        <SelectItem key={source} value={source} className="text-white hover:bg-gray-700">
                          {source}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-300">Show Archived</label>
                  <Switch checked={showArchived} onCheckedChange={setShowArchived} />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Quick Filters</label>
                  <div className="flex flex-wrap gap-2">
                    {tagOptions.map((tag) => (
                      <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className={`cursor-pointer ${
                          selectedTags.includes(tag) 
                            ? "bg-purple-600 text-white" 
                            : "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600"
                        }`}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <Card className="bg-gray-900 border border-gray-700 shadow-sm">
        <CardContent className="p-0 ">
          <div className="overflow-x-auto">
            <table className="w-full bg-gray-900">
              <thead className=" border-b border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Lead
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Specialty
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-700"
                    onClick={() => handleSort("created")}
                  >
                    <div className="flex items-center gap-1">
                      Created
                      {sortField === "created" && (
                        sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-700">
                {filteredAndSortedLeads.map((lead) => {
                  const StatusIcon = statusConfig[lead.status].icon
                  const SourceIcon = sourceIcons[lead.source]
                  
                  return (
                    <tr key={lead.id} className="hover:bg-gray-800 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${lead.name.charAt(0)}`} />
                            <AvatarFallback className="bg-purple-600 text-white">
                              {lead.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium text-white">{lead.title}</div>
                            <div className="text-sm text-gray-400">{lead.name}</div>
                            {lead.tags.length > 0 && (
                              <div className="flex gap-1 mt-1">
                                {lead.tags.slice(0, 2).map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs px-1 py-0 bg-gray-800 text-gray-300 border-gray-600">
                                    {tag}
                                  </Badge>
                                ))}
                                {lead.tags.length > 2 && (
                                  <Badge variant="outline" className="text-xs px-1 py-0 bg-gray-800 text-gray-300 border-gray-600">
                                    +{lead.tags.length - 2}
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-white">
                          <SourceIcon className="h-4 w-4 mr-2 text-gray-400" />
                          {lead.source}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {lead.specialty}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {formatDate(lead.created)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Select value={lead.status} onValueChange={(value) => handleStatusChange(lead.id, value)}>
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
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
                            <DropdownMenuSeparator className="bg-gray-700" />
                            <DropdownMenuItem className="text-white hover:bg-gray-700">
                              <Archive className="h-4 w-4 mr-2" />
                              Archive
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {filteredAndSortedLeads.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No leads found matching your criteria.</p>
              <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filter settings.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
