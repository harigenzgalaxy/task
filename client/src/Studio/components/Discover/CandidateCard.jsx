import React from "react"
import { Star, MapPin, Camera, Printer, Eye } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { useNavigate } from "react-router-dom"

export function CandidateCard({ user }) {
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