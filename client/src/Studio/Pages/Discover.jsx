import React, { useState } from "react"
import { FadeInUp } from "../../components/ui/FadeInUp"
import { CandidateCard } from "../components/Discover/CandidateCard"
import { Filters } from "../components/Discover/Filters"

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

export function DiscoverPage() {
  const [filters, setFilters] = useState({
    category: "",
    secondFilter: "",
    expertise: "",
    location: ""
  })
  const [filteredUsers, setFilteredUsers] = useState(users)

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
      <FadeInUp>
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
      </FadeInUp>
      
      {/* Filter Section */}
      <FadeInUp delay={0.1}>
        <Filters 
          filters={filters}
          setFilters={setFilters}
          onSearch={handleSearch}
          onReset={handleReset}
        />
      </FadeInUp>

      {/* Results Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredUsers.map((user, index) => (
          <FadeInUp key={user.id} delay={0.2 + index * 0.1}>
            <CandidateCard user={user} />
          </FadeInUp>
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