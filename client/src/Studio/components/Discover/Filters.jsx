import React, { useState } from "react"
import { Button } from "../../../components/ui/button"
import { 
  Command, 
  CommandInput, 
  CommandList, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem 
} from "../../../components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover"

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

export function Filters({ filters, setFilters, onSearch, onReset }) {
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

  return (
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
            onClick={onSearch}
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
          onClick={onReset}
          variant="outline"
          className="text-gray-400 border-gray-600 hover:text-white"
          size="sm"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  )
} 