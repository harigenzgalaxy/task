import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card"
import { Badge } from "../../../components/ui/badge" 
import { Button } from "../../../components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu"
import { Calendar, User, MoreVertical, Eye, Edit, Upload } from "lucide-react"

const statusColors = {
  Planned: "bg-blue-600/20 text-blue-400 border-blue-600/30",
  Ongoing: "bg-yellow-600/20 text-yellow-400 border-yellow-600/30",
  Completed: "bg-green-600/20 text-green-400 border-green-600/30",
}

export function EventCard({ event }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <Card className="border-gray-800 bg-gray-900 hover:bg-gray-930 transition-all hover:border-purple-600/30">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold text-white line-clamp-1">{event.title}</CardTitle>
            <p className="text-sm text-gray-400">{event.client}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
              <DropdownMenuItem className="text-white hover:bg-gray-700">
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-gray-700">
                <Edit className="h-4 w-4 mr-2" />
                Edit Event
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-gray-700">
                <Upload className="h-4 w-4 mr-2" />
                Upload Photos
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge className={`${statusColors[event.status]} border`}>{event.status}</Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-400">
            <Calendar className="h-4 w-4 mr-2" />
            <span>
              {formatDate(event.startDate)}
              {event.startDate !== event.endDate && ` - ${formatDate(event.endDate)}`}
            </span>
          </div>

          <div className="flex items-center text-sm text-gray-400">
            <User className="h-4 w-4 mr-2" />
            <span>{event.photographer}</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
          >
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 