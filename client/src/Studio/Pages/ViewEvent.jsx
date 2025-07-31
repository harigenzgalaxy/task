import React, { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/Separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Calendar, 
  MapPin, 
  User, 
  Camera, 
  DollarSign, 
  MessageSquare, 
  Upload, 
  Download, 
  Edit3,
  ArrowLeft,
  Phone,
  Mail,
  Clock,
  FileText,
  Image as ImageIcon,
  Video,
  Music
} from "lucide-react"
import { useNavigate } from "react-router-dom"

// Mock data for the event
const mockEvent = {
  id: 1,
  title: "Sarah & Michael Wedding",
  eventType: "Wedding",
  startDate: "2024-02-15",
  endDate: "2024-02-15",
  status: "Ongoing",
  location: "Grand Plaza Hotel, Downtown",
  client: {
    name: "Sarah & Michael Johnson",
    email: "sarah.michael@email.com",
    phone: "+1 (555) 123-4567"
  },
  photographers: [
    {
      id: 1,
      name: "John Smith",
      role: "Lead Photographer",
      avatar: "/avatars/john.jpg",
      email: "john.smith@studio.com"
    },
    {
      id: 2,
      name: "Emma Davis",
      role: "Assistant Photographer",
      avatar: "/avatars/emma.jpg",
      email: "emma.davis@studio.com"
    }
  ],
  budget: {
    total: 5000,
    paid: 3000,
    pending: 2000
  },
  notes: "Special request for sunset photos at the beach location. Client prefers natural, candid shots. Please ensure backup equipment is available.",
  photos: [
    { id: 1, url: "/photos/wedding-1.jpg", type: "image", name: "Ceremony Setup" },
    { id: 2, url: "/photos/wedding-2.jpg", type: "image", name: "First Dance" },
    { id: 3, url: "/photos/wedding-3.jpg", type: "image", name: "Family Photos" },
    { id: 4, url: "/photos/wedding-4.jpg", type: "image", name: "Reception" },
    { id: 5, url: "/photos/wedding-5.jpg", type: "image", name: "Cake Cutting" },
    { id: 6, url: "/photos/wedding-6.jpg", type: "image", name: "Bouquet Toss" }
  ],
  messages: [
    {
      id: 1,
      sender: "Sarah Johnson",
      message: "Hi! Just wanted to confirm the timing for tomorrow's session.",
      timestamp: "2024-02-14T10:30:00Z",
      isClient: true
    },
    {
      id: 2,
      sender: "John Smith",
      message: "Absolutely! We'll be there at 2 PM as scheduled. Everything is ready.",
      timestamp: "2024-02-14T10:35:00Z",
      isClient: false
    }
  ]
}

const statusOptions = ["Planned", "Ongoing", "Completed"]

export function ViewEvent() {
  const navigate = useNavigate()
  const [event, setEvent] = useState(mockEvent)
  const [editEvent, setEditEvent] = useState(mockEvent)
  const [isEditing, setIsEditing] = useState(false)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const handleStatusChange = (newStatus) => {
    if (isEditing) {
      setEditEvent(prev => ({ ...prev, status: newStatus }))
    } else {
      setEvent(prev => ({ ...prev, status: newStatus }))
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      Planned: "bg-blue-600/20 text-blue-400 border-blue-600/30",
      Ongoing: "bg-yellow-600/20 text-yellow-400 border-yellow-600/30",
      Completed: "bg-green-600/20 text-green-400 border-green-600/30",
    }
    return colors[status] || colors.Planned
  }

  const handleEdit = () => {
    setEditEvent(event)
    setIsEditing(true)
  }

  const handleCancel = () => {
    setEditEvent(event)
    setIsEditing(false)
  }

  const handleSave = () => {
    setEvent(editEvent)
    setIsEditing(false)
  }

  return (
    <div className="flex-1 bg-gray-900 min-h-screen">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-800 bg-gray-950/50 px-6">
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Events
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4 bg-gray-700" />
        <h1 className="text-lg font-semibold text-white">Event Details</h1>
      </header>

      <main className="flex-1 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          {/* Event Header */}
          <Card className="border-gray-800 bg-gray-950/50 mb-6">
            <CardHeader className="pb-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    {isEditing ? (
                      <Input
                        value={editEvent.title}
                        onChange={e => setEditEvent({ ...editEvent, title: e.target.value })}
                        className="text-2xl font-bold text-white bg-gray-800 border-gray-700"
                      />
                    ) : (
                      <h2 className="text-2xl font-bold text-white">{event.title}</h2>
                    )}
                    <Badge className={`${getStatusColor(isEditing ? editEvent.status : event.status)} border`}>
                      {isEditing ? editEvent.status : event.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-6 text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {isEditing ? (
                        <Input
                          type="date"
                          value={editEvent.startDate}
                          onChange={e => setEditEvent({ ...editEvent, startDate: e.target.value })}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      ) : (
                        <span>{formatDate(event.startDate)}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {isEditing ? (
                        <Input
                          value={editEvent.location}
                          onChange={e => setEditEvent({ ...editEvent, location: e.target.value })}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      ) : (
                        <span>{event.location}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      {isEditing ? (
                        <Input
                          value={editEvent.eventType}
                          onChange={e => setEditEvent({ ...editEvent, eventType: e.target.value })}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      ) : (
                        <span>{event.eventType}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Select value={isEditing ? editEvent.status : event.status} onValueChange={handleStatusChange} disabled={!isEditing}>
                    <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status} className="text-white hover:bg-gray-700">
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {isEditing ? (
                    <>
                      <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700 text-white">
                        Save
                      </Button>
                      <Button variant="outline" onClick={handleCancel} className="border-gray-700 text-gray-300 hover:bg-gray-800">
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button onClick={handleEdit} className="bg-purple-600 hover:bg-purple-700 text-white">
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger value="overview" className="text-white data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                Overview
              </TabsTrigger>
              <TabsTrigger value="photos" className="text-white data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                Photos
              </TabsTrigger>
              <TabsTrigger value="chat" className="text-white data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                Chat
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Client Information */}
                <Card className="border-gray-800 bg-gray-950/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <User className="h-5 w-5 text-purple-400" />
                      Client Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <Label className="text-gray-300 text-sm">Name</Label>
                        {isEditing ? (
                          <Input
                            value={editEvent.client.name}
                            onChange={e => setEditEvent({ ...editEvent, client: { ...editEvent.client, name: e.target.value } })}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        ) : (
                          <p className="text-white font-medium">{event.client.name}</p>
                        )}
                      </div>
                      <div>
                        <Label className="text-gray-300 text-sm">Email</Label>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          {isEditing ? (
                            <Input
                              value={editEvent.client.email}
                              onChange={e => setEditEvent({ ...editEvent, client: { ...editEvent.client, email: e.target.value } })}
                              className="bg-gray-800 border-gray-700 text-white"
                            />
                          ) : (
                            <p className="text-white">{event.client.email}</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <Label className="text-gray-300 text-sm">Phone</Label>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          {isEditing ? (
                            <Input
                              value={editEvent.client.phone}
                              onChange={e => setEditEvent({ ...editEvent, client: { ...editEvent.client, phone: e.target.value } })}
                              className="bg-gray-800 border-gray-700 text-white"
                            />
                          ) : (
                            <p className="text-white">{event.client.phone}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Budget Information */}
                <Card className="border-gray-800 bg-gray-950/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-purple-400" />
                      Budget & Payments
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Total Budget:</span>
                        {isEditing ? (
                          <Input
                            type="number"
                            value={editEvent.budget.total}
                            onChange={e => setEditEvent({ ...editEvent, budget: { ...editEvent.budget, total: e.target.value } })}
                            className="bg-gray-800 border-gray-700 text-white w-32"
                          />
                        ) : (
                          <span className="text-white font-semibold">{formatCurrency(event.budget.total)}</span>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Amount Paid:</span>
                        {isEditing ? (
                          <Input
                            type="number"
                            value={editEvent.budget.paid}
                            onChange={e => setEditEvent({ ...editEvent, budget: { ...editEvent.budget, paid: e.target.value } })}
                            className="bg-gray-800 border-gray-700 text-white w-32"
                          />
                        ) : (
                          <span className="text-green-400 font-semibold">{formatCurrency(event.budget.paid)}</span>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Pending:</span>
                        {isEditing ? (
                          <Input
                            type="number"
                            value={editEvent.budget.pending}
                            onChange={e => setEditEvent({ ...editEvent, budget: { ...editEvent.budget, pending: e.target.value } })}
                            className="bg-gray-800 border-gray-700 text-white w-32"
                          />
                        ) : (
                          <span className="text-yellow-400 font-semibold">{formatCurrency(event.budget.pending)}</span>
                        )}
                      </div>
                      <Separator className="bg-gray-700" />
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${((isEditing ? editEvent.budget.paid : event.budget.paid) / (isEditing ? editEvent.budget.total : event.budget.total)) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 text-center">
                        {Math.round(((isEditing ? editEvent.budget.paid : event.budget.paid) / (isEditing ? editEvent.budget.total : event.budget.total)) * 100)}% Complete
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Assigned Photographers */}
              <Card className="border-gray-800 bg-gray-950/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Camera className="h-5 w-5 text-purple-400" />
                    Assigned Photographers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {event.photographers.map((photographer) => (
                      <div key={photographer.id} className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={photographer.avatar} alt={photographer.name} />
                          <AvatarFallback className="bg-purple-600 text-white">
                            {photographer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="text-white font-medium">{photographer.name}</h4>
                          <p className="text-purple-400 text-sm">{photographer.role}</p>
                          <p className="text-gray-400 text-sm">{photographer.email}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Notes & Instructions */}
              <Card className="border-gray-800 bg-gray-950/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <FileText className="h-5 w-5 text-purple-400" />
                    Notes & Instructions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Textarea
                      value={isEditing ? editEvent.notes : event.notes}
                      readOnly={!isEditing}
                      onChange={isEditing ? e => setEditEvent({ ...editEvent, notes: e.target.value }) : undefined}
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 min-h-[120px]"
                      placeholder="Add notes or instructions for this event..."
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Photos Tab */}
            <TabsContent value="photos" className="space-y-6">
              <Card className="border-gray-800 bg-gray-950/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center gap-2">
                      <ImageIcon className="h-5 w-5 text-purple-400" />
                      Event Photos ({event.photos.length})
                    </CardTitle>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photos
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {event.photos.map((photo) => (
                      <div key={photo.id} className="group relative aspect-square bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500 transition-all">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ImageIcon className="h-12 w-12 text-white opacity-50" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-white text-sm font-medium truncate">{photo.name}</p>
                        </div>
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-black/50 text-white hover:bg-black/70">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Chat Tab */}
            <TabsContent value="chat" className="space-y-6">
              <Card className="border-gray-800 bg-gray-950/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-purple-400" />
                    Chat with Client
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Messages */}
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {event.messages.map((message) => (
                        <div key={message.id} className={`flex ${message.isClient ? 'justify-start' : 'justify-end'}`}>
                          <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                            message.isClient 
                              ? 'bg-gray-800 text-white' 
                              : 'bg-purple-600 text-white'
                          }`}>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium">{message.sender}</span>
                              <span className="text-xs opacity-70">
                                {new Date(message.timestamp).toLocaleTimeString()}
                              </span>
                            </div>
                            <p className="text-sm">{message.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Message Input */}
                    <div className="flex gap-2 pt-4 border-t border-gray-700">
                      <Input
                        placeholder="Type your message..."
                        className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                        disabled={!isEditing}
                      />
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white" disabled={!isEditing}>
                        Send
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  )
} 