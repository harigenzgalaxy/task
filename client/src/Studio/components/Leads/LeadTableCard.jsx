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
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/textarea"
import { FadeInUp } from "@/components/ui/FadeInUp"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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

export function LeadTableCard({ lead, onStatusChange, formatDate }) {
  const StatusIcon = statusConfig[lead.status].icon
  const SourceIcon = sourceIcons[lead.source]
  
  return (
    <Card className="bg-gray-900 border border-gray-700  shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4 mt-2">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${lead.name.charAt(0)}`} />
                <AvatarFallback className="bg-purple-600 text-white text-sm">
                  {lead.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold text-white truncate">{lead.title}</h3>
                <p className="text-xs text-gray-400">{lead.name}</p>
              </div>
            </div>
          </div>
          
          {/* Status Badge */}
          <div className="flex-shrink-0 ml-3">
            <Badge 
              className={`${statusConfig[lead.status].color} text-xs px-2 py-1`}
            >
              <StatusIcon className="h-3 w-3 mr-1" />
              {lead.status}
            </Badge>
          </div>
        </div>

        {/* Tags */}
        {lead.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {lead.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs px-2 py-0.5 bg-gray-800 text-gray-300 border-gray-600">
                {tag}
              </Badge>
            ))}
            {lead.tags.length > 3 && (
              <Badge variant="outline" className="text-xs px-2 py-0.5 bg-gray-800 text-gray-300 border-gray-600">
                +{lead.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Lead Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SourceIcon className="h-4 w-4 text-gray-400" />
              <span className="text-xs text-gray-400">Source</span>
            </div>
            <span className="text-xs text-white">{lead.source}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Specialty</span>
            <span className="text-xs text-white">{lead.specialty}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Created</span>
            <span className="text-xs text-white">{formatDate(lead.created)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Budget</span>
            <span className="text-xs text-white">{lead.budget}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Event Date</span>
            <span className="text-xs text-white">{formatDate(lead.eventDate)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-700">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1 h-8 text-xs border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white hover:border-gray-500"
          >
            <Mail className="h-3 w-3 mr-1" />
            Email
          </Button>
          
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1 h-8 text-xs border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white hover:border-gray-500"
          >
            <Phone className="h-3 w-3 mr-1" />
            Call
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                size="sm" 
                variant="outline" 
                className="h-8 w-8 p-0 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white hover:border-gray-500"
              >
                <MoreVertical className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
              <DropdownMenuItem className="text-white hover:bg-gray-700">
                <User className="h-4 w-4 mr-2" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-gray-700">
                <Archive className="h-4 w-4 mr-2" />
                Archive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
} 