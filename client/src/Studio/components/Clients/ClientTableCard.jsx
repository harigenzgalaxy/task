import React from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, Trash2, MoreHorizontal, Phone, Mail, Calendar, Building, DollarSign, Users } from "lucide-react"

export function ClientTableCard({ client, onEdit, onDelete, getInitials }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatCurrency = (amount) => {
    if (!amount) return "—"
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  return (
    <Card className="bg-gray-900 border border-gray-700 shadow-sm hover:shadow-md transition-shadow ">
      <CardContent className="p-4 mt-2">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-purple-600 text-white font-medium">
                {getInitials(client.firstName, client.lastName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-white text-lg">
                {client.firstName} {client.lastName}
              </div>
              <div className="text-sm text-gray-400">{client.email}</div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-800 hover:text-white">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
              <DropdownMenuItem
                onClick={() => onEdit(client)}
                className="text-white hover:bg-gray-700"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(client)}
                className="text-red-400 hover:bg-gray-700 hover:text-red-400"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Contact Information */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-gray-400" />
            <span className="text-gray-300">{client.phone}</span>
          </div>
          
          {client.company && (
            <div className="flex items-center gap-2 text-sm">
              <Building className="h-4 w-4 text-gray-400" />
              <span className="text-gray-300">{client.company}</span>
            </div>
          )}
        </div>

        {/* Event Information */}
        {client.eventName && (
          <div className="space-y-3 mb-4 p-3 bg-gray-800/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-400" />
              <span className="font-medium text-white">{client.eventName}</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {client.eventType && (
                <Badge variant="outline" className="bg-purple-900/30 text-purple-300 border-purple-700/30">
                  {client.eventType}
                </Badge>
              )}
              {client.eventDate && (
                <Badge variant="outline" className="bg-blue-900/30 text-blue-300 border-blue-700/30">
                  {formatDate(client.eventDate)}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Additional Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Photographers:</span>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-gray-400" />
              <span className="text-white">{client.photographers}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Budget:</span>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4 text-gray-400" />
              <span className="text-white">{formatCurrency(client.budget)}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Created:</span>
            <span className="text-white">{formatDate(client.dateCreated)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-700">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
            onClick={() => onEdit(client)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
            onClick={() => onDelete(client)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 