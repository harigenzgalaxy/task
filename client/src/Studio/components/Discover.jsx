import React, { useState } from "react"
import { Star, MapPin, Camera, Printer, Eye } from "lucide-react"
import { Button } from "../../components/ui/button"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../../components/ui/select"
import { 
  Command, 
  CommandInput, 
  CommandList, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem 
} from "../../components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover"
import { useNavigate } from "react-router-dom"

// Updated data for photographers and printing vendors only
const users = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Wedding Photographer",
    category: "photographer",
    profileImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150",
    rating: 4.9,
    location: "San Francisco, CA",
    skills: ["Canon 5D", "Wedding Photography", "Portrait"],
    description: "Specialized in capturing timeless wedding moments with artistic flair.",
    experience: "5+ years",
    secondaryType: "camera-gear",
    expertise: "wedding",
    optionalFilter: "budget-high",
    price: "$2,500/day"
  },
  {
    id: "2",
    name: "Marcus Rodriguez",
    role: "Product Photographer",
    category: "photographer",
    profileImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150",
    rating: 4.8,
    location: "New York, NY",
    skills: ["Sony A7R", "Product Photography", "E-commerce"],
    description: "Expert in high-end product photography for luxury brands and e-commerce.",
    experience: "8+ years",
    secondaryType: "camera-gear",
    expertise: "product",
    optionalFilter: "budget-mid",
    price: "$1,200/day"
  },
  {
    id: "3",
    name: "Emily Watson",
    role: "Fashion Photographer",
    category: "photographer",
    profileImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=150",
    rating: 4.7,
    location: "Los Angeles, CA",
    skills: ["Nikon D850", "Fashion", "Editorial"],
    description: "Creative fashion photographer with editorial and commercial experience.",
    experience: "6+ years",
    secondaryType: "lighting",
    expertise: "fashion",
    optionalFilter: "budget-high",
    price: "$3,000/day"
  },
  {
    id: "4",
    name: "Premium Print Co.",
    role: "High-End Printing",
    category: "printing-vendor",
    profileImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=150",
    rating: 4.9,
    location: "Chicago, IL",
    skills: ["Canvas Prints", "Metal Prints", "Custom Framing"],
    description: "Professional printing services for photographers and artists.",
    experience: "12+ years",
    secondaryType: "canvas",
    expertise: "premium",
    optionalFilter: "budget-mid",
    price: "From $25/print"
  },
  {
    id: "5",
    name: "Quick Photo Lab",
    role: "Photo Printing Service",
    category: "printing-vendor",
    profileImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=150",
    rating: 4.6,
    location: "Austin, TX",
    skills: ["Photo Prints", "Same-day Service", "Bulk Orders"],
    description: "Fast and reliable photo printing with same-day turnaround options.",
    experience: "8+ years",
    secondaryType: "photo",
    expertise: "bulk",
    optionalFilter: "timeline-urgent",
    price: "From $0.50/print"
  },
  {
    id: "6",
    name: "David Kim",
    role: "Portrait Photographer",
    category: "photographer",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    rating: 4.8,
    location: "Miami, FL",
    skills: ["Portrait", "Studio Lighting", "Family"],
    description: "Specialized in professional portraits and family photography sessions.",
    experience: "7+ years",
    secondaryType: "lighting",
    expertise: "portrait",
    optionalFilter: "budget-mid",
    price: "$800/session"
  }
]

// Filter options data
const filterOptions = {
  categories: ["Photographer", "Printing Vendor"],
  cameraGear: ["DSLR", "Mirrorless", "Medium Format", "Film", "Drone"],
  printType: ["Photo Prints", "Albums", "Canvas", "Calendars", "Frames", "Metal Prints", "Digital"],
  expertise: {
    Photographer: [
      "Wedding",
      "Portrait",
      "Fashion",
      "Product",
      "Event",
      "Candid",
      "Cinematic",
      "Street",
      "Architecture",
      "Editorial",
      "E-commerce",
      "Family",
      "Studio Lighting"
    ],
    "Printing Vendor": [
      "Albums",
      "Calendars",
      "Canvas",
      "Frames",
      "Digital",
      "Large Format",
      "Fine Art",
      "Photo Prints",
      "Metal Prints",
      "Custom Framing",
      "Same-day Service",
      "Bulk Orders"
    ]
  },
  locations: [
    "San Francisco",
    "New York",
    "Los Angeles",
    "Chicago",
    "Austin",
    "Miami",
    "Seattle",
    "Boston"
  ]
}

// Searchable Select Component
function SearchableSelect({ 
  value, 
  onValueChange, 
  placeholder, 
  options, 
  disabled = false,
  className = ""
}) {
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchValue.toLowerCase())
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full justify-between hover:text-white bg-gray-800 border-gray-700 text-white hover:bg-gray-600 hover:border-gray-500 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
          disabled={disabled}
        >
          {value || placeholder}
          <svg className="ml-2 h-4 w-4 shrink-0 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-gray-800 border-gray-700">
        <Command>
          <CommandInput 
            placeholder={`Search ${placeholder.toLowerCase()}...`}
            value={searchValue}
            onValueChange={setSearchValue}
            className="text-white hover:text-white"
          />
          <CommandList>
            <CommandEmpty>No {placeholder.toLowerCase()} found.</CommandEmpty>
            <CommandGroup>
              {filteredOptions.map((option) => (
                <CommandItem
  key={option}
  value={option}
  onSelect={(currentValue) => {
    onValueChange(currentValue === value ? "" : currentValue)
    setOpen(false)
    setSearchValue("")
  }}
  className="
    text-white cursor-pointer
    data-[hovered=true]:text-white
    data-[selected=true]:bg-purple-700
    data-[selected=true]:text-white
  "
>
  {option}
</CommandItem>


              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

function ProfileCard({ user }) {
  const navigate = useNavigate()

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200 flex flex-col gap-4 min-h-[380px]">
      {/* Top Section - Profile, Name, Role, Category Icon */}
      <div className="flex items-start gap-3">
        <img
          src={user.profileImage}
          alt={user.name}
          className="h-12 w-12 rounded-full object-cover border-2 border-purple-600"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-white leading-tight">{user.name}</span>
            {user.category === "photographer" ? (
              <Camera className="h-4 w-4 text-purple-400" />
            ) : (
              <Printer className="h-4 w-4 text-purple-400" />
            )}
          </div>
          <p className="text-sm text-gray-400 mt-1">{user.role}</p>
        </div>
      </div>

      {/* Rating and Location */}
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1 text-yellow-400">
          <Star className="h-4 w-4 fill-current" />
          <span className="font-semibold text-white">{user.rating}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <MapPin className="h-4 w-4" />
          <span>{user.location}</span>
        </div>
      </div>

      {/* Skill Tags */}
      <div className="flex flex-wrap gap-2">
        {user.skills.map((skill) => (
          <span key={skill} className="bg-purple-900/30 text-purple-300 text-xs px-3 py-1 rounded-full font-medium border border-purple-700/30">
            {skill}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm leading-relaxed flex-1">
        {user.description}
      </p>

      {/* Bottom Section - Pricing, Experience, View Profile Button */}
      <div className="flex items-end justify-between mt-auto pt-4 border-t border-gray-700">
        <div>
          <div className="text-lg font-bold text-white">{user.price}</div>
          <div className="text-sm text-gray-400">{user.experience}</div>
        </div>
        <Button
          onClick={() => navigate(`/studio/discover/${user.category}/${user.id}`)}
          className="bg-purple-600 hover:bg-purple-700 text-white border-purple-600 hover:border-purple-700 transition-colors duration-200"
          size="sm"
        >
          <Eye className="h-4 w-4 mr-2" />
          View Profile
        </Button>
      </div>
    </div>
  )
}

export default function Discover() {
  const [filters, setFilters] = useState({
    category: "",
    secondFilter: "",
    expertise: "",
    location: ""
  })
  const [filteredUsers, setFilteredUsers] = useState(users)

  // Get second filter options based on category
  const getSecondFilterOptions = () => {
    switch (filters.category) {
      case "Photographer":
        return filterOptions.cameraGear
      case "Printing Vendor":
        return filterOptions.printType
      default:
        return []
    }
  }

  // Get expertise options based on category
  const getExpertiseOptions = () => {
    return filterOptions.expertise[filters.category] || []
  }

  // Check if search button should be enabled
  const isSearchEnabled = filters.category && filters.secondFilter && filters.expertise && filters.location

  // Handle search
  const handleSearch = () => {
    if (!isSearchEnabled) return

    const filtered = users.filter(user => {
      // Category filter
      const categoryMatch =
        !filters.category || filters.category === "All" || user.category === filters.category.toLowerCase().replace(" ", "-")
      // Location filter
      const locationMatch =
        !filters.location || filters.location === "All" || user.location.includes(filters.location)
      // Second filter
      let secondFilterMatch = false
      if (!filters.secondFilter || filters.secondFilter === "All") {
        secondFilterMatch = true
      } else if (filters.category === "Photographer") {
        secondFilterMatch = user.secondaryType === "camera-gear"
      } else if (filters.category === "Printing Vendor") {
        secondFilterMatch = user.secondaryType === "canvas" || user.secondaryType === "photo"
      }
      // Expertise filter
      let expertiseMatch = false
      if (!filters.expertise || filters.expertise === "All") {
        expertiseMatch = true
      } else {
        expertiseMatch = user.expertise === filters.expertise.toLowerCase()
      }
      return categoryMatch && locationMatch && secondFilterMatch && expertiseMatch
    })

    setFilteredUsers(filtered)
  }

  // Reset filters
  const handleReset = () => {
    setFilters({
      category: "",
      secondFilter: "",
      expertise: "",
      location: ""
    })
    setFilteredUsers(users)
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between relative">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold text-purple-400">
            Discover
          </h1>
          <p className="text-gray-400">
            Find talented photographers and printing vendors for your projects
          </p>
        </div>
      </div>
      
      {/* Filter Section */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
            <SearchableSelect
              value={filters.category}
              onValueChange={(value) => {
                setFilters(prev => ({
                  ...prev,
                  category: value,
                  secondFilter: "",
                  expertise: ""
                }))
              }}
              placeholder="Select Category"
              options={["All", ...filterOptions.categories]}
            />
          </div>

          {/* Second Filter Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {filters.category === "Photographer" ? "Camera Gear" : 
               filters.category === "Printing Vendor" ? "Print Type" : "Select Type"}
            </label>
            <SearchableSelect
              value={filters.secondFilter}
              onValueChange={(value) => {
                setFilters(prev => ({
                  ...prev,
                  secondFilter: value,
                  expertise: ""
                }))
              }}
              placeholder={`Select ${filters.category === "Photographer" ? "Camera Gear" : 
                filters.category === "Printing Vendor" ? "Print Type" : "Type"}`}
              options={["All", ...getSecondFilterOptions()]}
              disabled={!filters.category}
            />
          </div>

          {/* Expertise/Service Focus Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Expertise/Service</label>
            <SearchableSelect
              value={filters.expertise}
              onValueChange={(value) => setFilters(prev => ({ ...prev, expertise: value }))}
              placeholder="Select Expertise"
              options={["All", ...getExpertiseOptions()]}
              disabled={!filters.category || !filters.secondFilter}
            />
          </div>

          {/* Location Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
            <SearchableSelect
              value={filters.location}
              onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}
              placeholder="Select Location"
              options={["All", ...filterOptions.locations]}
            />
          </div>

          {/* Search Button */}
          <div className="flex flex-col justify-end">
            <Button
              onClick={handleSearch}
              disabled={!isSearchEnabled}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Search
            </Button>
          </div>
        </div>

        {/* Reset Button */}
        <div className="mt-4 flex justify-end">
          <Button
            onClick={handleReset}
            variant="outline"
            className="text-gray-400 border-gray-600 hover:text-white"
            size="sm"
          >
            Reset Filters
          </Button>
        </div>
      </div>

      {/* Results Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredUsers.map((user) => (
          <ProfileCard key={user.id} user={user} />
        ))}
      </div>
      
      {filteredUsers.length === 0 && (
        <div className="text-center text-gray-400 py-20 text-lg">
          {isSearchEnabled ? "No profiles found matching your criteria." : "Select filters to search for photographers and printing vendors."}
        </div>
      )}
    </div>
  )
} 