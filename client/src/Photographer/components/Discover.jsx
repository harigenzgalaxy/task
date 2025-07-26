"use client"

import { useState } from "react"
import {
  Search,
  MapPin,
  Star,
  Clock,
  Camera,
  Phone,
  MessageSquare,
  Eye,
  Filter,
  CheckCircle2,
  Briefcase,
  DollarSign,
  Calendar,
  Zap,
  Building2,
  User,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Input } from "../../components/ui/Input"
import { Label } from "../../components/ui/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Checkbox } from "../../components/ui/checkbox"
import { Slider } from "@/components/ui/slider"


export default function Discover() {
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [budgetRange, setBudgetRange] = useState([500, 5000])
  const [selectedProjectTypes, setSelectedProjectTypes] = useState([]);
  const [selectedWorkTypes, setSelectedWorkTypes] = useState([]);
  const [experienceFilter, setExperienceFilter] = useState("any")
  const [clientTypeFilter, setClientTypeFilter] = useState("any")
  const [urgencyFilter, setUrgencyFilter] = useState("any")

  // Mock data for job opportunities
  const jobOpportunities= [
    {
      id: 1,
      title: "Wedding Photography - Central Park Ceremony",
      clientName: "Sarah & Mike Johnson",
      clientType: "Direct Client",
      location: "New York, NY",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4.9,
      reviewCount: 127,
      projectType: "Wedding",
      workType: "Full Day",
      budgetRange: "$2,500 - $4,000",
      timeline: "March 15, 2025",
      experienceRequired: "5+ years",
      description:
        "Looking for an experienced wedding photographer for our outdoor ceremony in Central Park. We want natural, candid shots with some formal portraits during golden hour.",
      verified: true,
      urgency: "High",
      status: "Open",
      postedDate: "2 days ago",
      applicants: 12,
    },
    {
      id: 2,
      title: "Fashion Model Portfolio Shoot",
      clientName: "Elite Studios NYC",
      clientType: "Studio Owner",
      location: "Manhattan, NY",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4.8,
      reviewCount: 89,
      projectType: "Fashion",
      workType: "Half Day",
      budgetRange: "$800 - $1,200",
      timeline: "February 20-25, 2025",
      experienceRequired: "3+ years",
      description:
        "High-end fashion studio seeking photographer for model portfolio sessions. Must have experience with studio lighting and fashion photography.",
      verified: true,
      urgency: "Medium",
      status: "Interview Stage",
      postedDate: "5 days ago",
      applicants: 8,
    },
    {
      id: 3,
      title: "Product Photography for E-commerce",
      clientName: "TechGear Solutions",
      clientType: "Direct Client",
      location: "Chicago, IL",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4.7,
      reviewCount: 156,
      projectType: "Product",
      workType: "Project Based",
      budgetRange: "$1,500 - $2,500",
      timeline: "Ongoing - Monthly",
      experienceRequired: "2+ years",
      description:
        "E-commerce company needs photographer for monthly product shoots. Clean, professional product photography with white backgrounds required.",
      verified: false,
      urgency: "Low",
      status: "Open",
      postedDate: "1 week ago",
      applicants: 15,
    },
    {
      id: 4,
      title: "Corporate Event Coverage",
      clientName: "Innovation Conference",
      clientType: "Direct Client",
      location: "San Francisco, CA",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4.9,
      reviewCount: 203,
      projectType: "Corporate",
      workType: "Full Day",
      budgetRange: "$1,800 - $2,800",
      timeline: "April 10-12, 2025",
      experienceRequired: "4+ years",
      description:
        "3-day tech conference needs professional photographer for keynote speeches, networking events, and candid moments. Experience with low-light photography preferred.",
      verified: true,
      urgency: "Medium",
      status: "Closing Soon",
      postedDate: "3 days ago",
      applicants: 22,
    },
    {
      id: 5,
      title: "Pre-Wedding Couple Shoot",
      clientName: "Emma & David Chen",
      clientType: "Direct Client",
      location: "Denver, CO",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4.6,
      reviewCount: 74,
      projectType: "Pre-Wedding",
      workType: "Half Day",
      budgetRange: "$600 - $1,000",
      timeline: "February 14, 2025",
      experienceRequired: "2+ years",
      description:
        "Romantic pre-wedding shoot for Valentine's Day. Looking for photographer who specializes in couple photography with natural outdoor settings.",
      verified: true,
      urgency: "High",
      status: "Open",
      postedDate: "1 day ago",
      applicants: 6,
    },
    {
      id: 6,
      title: "Real Estate Photography Portfolio",
      clientName: "Luxury Homes Realty",
      clientType: "Direct Client",
      location: "Miami, FL",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4.8,
      reviewCount: 91,
      projectType: "Real Estate",
      workType: "Freelance",
      budgetRange: "$300 - $500 per property",
      timeline: "Ongoing",
      experienceRequired: "1+ years",
      description:
        "Real estate agency seeking photographer for luxury property listings. Must have wide-angle lens and experience with architectural photography.",
      verified: true,
      urgency: "Low",
      status: "Open",
      postedDate: "4 days ago",
      applicants: 18,
    },
  ]

  const projectTypes = [
    "Wedding",
    "Pre-Wedding",
    "Fashion",
    "Product",
    "Corporate",
    "Real Estate",
    "Portrait",
    "Event",
    "Maternity",
    "Family",
    "Commercial",
    "Food",
  ]

  const workTypes = ["Full Day", "Half Day", "Project Based", "Freelance", "Part Time", "Contract"]

  const handleProjectTypeChange = (projectType, checked) => {
    if (checked) {
      setSelectedProjectTypes([...selectedProjectTypes, projectType])
    } else {
      setSelectedProjectTypes(selectedProjectTypes.filter((type) => type !== projectType))
    }
  }

  const handleWorkTypeChange = (workType, checked) => {
    if (checked) {
      setSelectedWorkTypes([...selectedWorkTypes, workType])
    } else {
      setSelectedWorkTypes(selectedWorkTypes.filter((type) => type !== workType))
    }
  }

  const filteredOpportunities = jobOpportunities.filter((opportunity) => {
    const matchesSearch =
      opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opportunity.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opportunity.projectType.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesLocation = !locationFilter || opportunity.location.toLowerCase().includes(locationFilter.toLowerCase())

    const budgetMin = Number.parseInt(opportunity.budgetRange.match(/\$(\d+)/)?.[1] || "0")
    const matchesBudget = budgetMin >= budgetRange[0] && budgetMin <= budgetRange[1]

    const matchesProjectType =
      selectedProjectTypes.length === 0 || selectedProjectTypes.includes(opportunity.projectType)

    const matchesWorkType = selectedWorkTypes.length === 0 || selectedWorkTypes.includes(opportunity.workType)

    const matchesExperience =
      experienceFilter === "any" || !experienceFilter || opportunity.experienceRequired.includes(experienceFilter)

    const matchesClientType =
      clientTypeFilter === "any" || !clientTypeFilter || opportunity.clientType === clientTypeFilter

    const matchesUrgency = urgencyFilter === "any" || !urgencyFilter || opportunity.urgency === urgencyFilter

    return (
      matchesSearch &&
      matchesLocation &&
      matchesBudget &&
      matchesProjectType &&
      matchesWorkType &&
      matchesExperience &&
      matchesClientType &&
      matchesUrgency
    )
  })

  const getUrgencyBadge = (urgency) => {
    const config = {
      High: { color: "bg-red-500", textColor: "text-red-400", icon: Zap },
      Medium: { color: "bg-orange-500", textColor: "text-orange-400", icon: Clock },
      Low: { color: "bg-green-500", textColor: "text-green-400", icon: CheckCircle2 },
    }

    const urgencyConfig = config[urgency] || {
      color: "bg-gray-500",
      textColor: "text-gray-400",
      icon: Clock,
    }

    const IconComponent = urgencyConfig.icon

    return (
      <div
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white ${urgencyConfig.color}`}
      >
        <IconComponent className="h-3 w-3" />
        {urgency} Priority
      </div>
    )
  }

  const getStatusBadge = (status) => {
    const config = {
      Open: { color: "bg-green-600", textColor: "text-green-400" },
      "Closing Soon": { color: "bg-red-600", textColor: "text-red-400" },
      "Interview Stage": { color: "bg-purple-600", textColor: "text-purple-400" },
    }

    const statusConfig = config[status] || {
      color: "bg-gray-600",
      textColor: "text-gray-400",
    }

    return (
      <div
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white ${statusConfig.color}`}
      >
        {status}
      </div>
    )
  }

  const clearFilters = () => {
    setSearchQuery("")
    setLocationFilter("")
    setBudgetRange([500, 5000])
    setSelectedProjectTypes([])
    setSelectedWorkTypes([])
    setExperienceFilter("any")
    setClientTypeFilter("any")
    setUrgencyFilter("any")
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-purple-400 mb-2">Discover Opportunities</h1>
          <p className="text-gray-400">Find photography jobs and projects from studios and direct clients</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search for photography jobs, projects, or clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 text-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filter Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900 border-gray-700 sticky top-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-purple-400">
                    <Filter className="h-5 w-5" />
                    Filters
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-gray-400 hover:text-white hover:bg-gray-800"
                  >
                    Clear All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Location Filter */}
                <div>
                  <Label className="text-sm font-medium text-gray-300 mb-2 block">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="City, State"
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Budget Range */}
                <div>
                  <Label className="text-sm font-medium text-gray-300 mb-2 block">
                    Budget Range: ${budgetRange[0]} - ${budgetRange[1]}+
                  </Label>
                  <Slider
                    value={budgetRange}
                    onValueChange={setBudgetRange}
                    max={5000}
                    min={500}
                    step={100}
                    className="w-full"
                  />
                </div>

                {/* Project Type */}
                <div>
                  <Label className="text-sm font-medium text-gray-300 mb-3 block">Project Type</Label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {projectTypes.map((projectType) => (
                      <div key={projectType} className="flex items-center space-x-2">
                        <Checkbox
                          id={projectType}
                          checked={selectedProjectTypes.includes(projectType)}
                          onCheckedChange={(checked) => handleProjectTypeChange(projectType, checked)}
                          className="border-gray-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                        />
                        <label htmlFor={projectType} className="text-sm text-gray-300 cursor-pointer">
                          {projectType}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Work Type */}
                <div>
                  <Label className="text-sm font-medium text-gray-300 mb-3 block">Work Type</Label>
                  <div className="space-y-2">
                    {workTypes.map((workType) => (
                      <div key={workType} className="flex items-center space-x-2">
                        <Checkbox
                          id={workType}
                          checked={selectedWorkTypes.includes(workType)}
                          onCheckedChange={(checked) => handleWorkTypeChange(workType, checked)}
                          className="border-gray-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                        />
                        <label htmlFor={workType} className="text-sm text-gray-300 cursor-pointer">
                          {workType}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience Required */}
                <div>
                  <Label className="text-sm font-medium text-gray-300 mb-2 block">Experience Required</Label>
                  <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="Any experience" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="any" className="text-white hover:bg-gray-700">
                        Any experience
                      </SelectItem>
                      <SelectItem value="1+" className="text-white hover:bg-gray-700">
                        1+ years
                      </SelectItem>
                      <SelectItem value="2+" className="text-white hover:bg-gray-700">
                        2+ years
                      </SelectItem>
                      <SelectItem value="3+" className="text-white hover:bg-gray-700">
                        3+ years
                      </SelectItem>
                      <SelectItem value="5+" className="text-white hover:bg-gray-700">
                        5+ years
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Client Type */}
                <div>
                  <Label className="text-sm font-medium text-gray-300 mb-2 block">Client Type</Label>
                  <Select value={clientTypeFilter} onValueChange={setClientTypeFilter}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="Any client type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="any" className="text-white hover:bg-gray-700">
                        Any client type
                      </SelectItem>
                      <SelectItem value="Studio Owner" className="text-white hover:bg-gray-700">
                        Studio Owner
                      </SelectItem>
                      <SelectItem value="Direct Client" className="text-white hover:bg-gray-700">
                        Direct Client
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Urgency Filter */}
                <div>
                  <Label className="text-sm font-medium text-gray-300 mb-2 block">Priority Level</Label>
                  <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="Any priority" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="any" className="text-white hover:bg-gray-700">
                        Any priority
                      </SelectItem>
                      <SelectItem value="High" className="text-white hover:bg-gray-700">
                        High Priority
                      </SelectItem>
                      <SelectItem value="Medium" className="text-white hover:bg-gray-700">
                        Medium Priority
                      </SelectItem>
                      <SelectItem value="Low" className="text-white hover:bg-gray-700">
                        Low Priority
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-400">
                {filteredOpportunities.length} opportunit{filteredOpportunities.length !== 1 ? "ies" : "y"} found
              </p>
            </div>

            {filteredOpportunities.length === 0 ? (
              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="text-center py-12">
                  <Camera className="h-12 w-12 mx-auto mb-4 text-gray-600" />
                  <h3 className="text-lg font-medium text-gray-300 mb-2">No opportunities found</h3>
                  <p className="text-gray-400">Try adjusting your search criteria or filters</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredOpportunities.map((opportunity) => (
                  <Card
                    key={opportunity.id}
                    className="bg-gray-900 border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 group flex flex-col h-full"
                  >
                    <CardContent className="p-4 sm:p-6 flex flex-col h-full justify-between">
                      {/* Header */}
                      <div className="flex flex-col xs:flex-row xs:items-start gap-4 mb-4 pt-2">
                        <div className="relative flex-shrink-0">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={opportunity.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-purple-600 text-white text-lg">
                              {opportunity.clientName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          {opportunity.verified && (
                            <div className="absolute -bottom-1 -right-1 bg-purple-600 rounded-full p-1">
                              <CheckCircle2 className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col gap-1 sm:gap-2">
                            <h3 className="text-base sm:text-lg font-semibold text-white truncate mt-1 xs:mt-0">{opportunity.title}</h3>
                            <div className="flex flex-wrap items-center gap-2">
                              <div className="flex items-center gap-1">
                                {opportunity.clientType === "Studio Owner" ? (
                                  <Building2 className="h-3 w-3 text-purple-400" />
                                ) : (
                                  <User className="h-3 w-3 text-blue-400" />
                                )}
                                <span className="text-purple-400 text-sm font-medium">{opportunity.clientName}</span>
                              </div>
                              <Badge
                                variant="outline"
                                className={`text-xs ${
                                  opportunity.clientType === "Studio Owner"
                                    ? "border-purple-600 text-purple-300"
                                    : "border-blue-600 text-blue-300"
                                }`}
                              >
                                {opportunity.clientType}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1 text-gray-400 text-xs sm:text-sm">
                              <MapPin className="h-3 w-3" />
                              {opportunity.location}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Status and Priority */}
                      <div className="flex items-center gap-2 mb-4">
                        {getStatusBadge(opportunity.status)}
                        {getUrgencyBadge(opportunity.urgency)}
                      </div>

                      {/* Project Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 p-3 bg-gray-800/50 rounded-lg">
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            <DollarSign className="h-4 w-4 text-green-400" />
                            <span className="text-white font-semibold text-sm">{opportunity.budgetRange}</span>
                          </div>
                          <p className="text-xs text-gray-400">Budget</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            <Calendar className="h-4 w-4 text-blue-400" />
                            <span className="text-white font-semibold text-sm">{opportunity.timeline}</span>
                          </div>
                          <p className="text-xs text-gray-400">Timeline</p>
                        </div>
                      </div>

                      {/* Project Type & Work Type */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2 sm:gap-0">
                        <div className="flex items-center gap-2">
                          <Camera className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-300">{opportunity.projectType}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-300">{opportunity.workType}</span>
                        </div>
                      </div>

                      {/* Experience & Stats */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400" />
                            <span className="text-gray-300">Experience: {opportunity.experienceRequired}</span>
                          </div>
                          <div className="text-gray-400">
                            {opportunity.applicants} applicant{opportunity.applicants !== 1 ? "s" : ""}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-400 mb-4 line-clamp-2">{opportunity.description}</p>

                      {/* Posted Date */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs text-gray-500">Posted {opportunity.postedDate}</span>
                        {opportunity.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-400">
                              {opportunity.rating} ({opportunity.reviewCount} reviews)
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-2 mt-2">
                        {/* Make buttons full width on mobile for better tap targets */}
                        <Button
                          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto"
                          disabled={opportunity.status === "Interview Stage"}
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          {opportunity.status === "Interview Stage" ? "In Review" : "Send Proposal"}
                        </Button>
                        <Button
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent transition-colors w-full sm:w-auto"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent transition-colors w-full sm:w-auto"
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
