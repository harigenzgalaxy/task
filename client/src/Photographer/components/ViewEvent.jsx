
import { useState } from "react"
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Camera,
  User,
  Upload,
  Share2,
  CreditCard,
  MessageSquare,
  Video,
  CheckCircle2,
  Circle,
  Pause,
  Eye,
  Download,
  ExternalLink,
  MessageCircle,
  FileText,
  Tag,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNavigate } from 'react-router-dom';


export default function EventDetails({ eventId, onBack }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showMeetingModal, setShowMeetingModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [actionHistory, setActionHistory] = useState([])
  const [formData, setFormData] = useState({
    payment: { amount: '', description: '', dueDate: '' },
    meeting: { type: '', date: '', time: '', agenda: '' },
    upload: { albumName: '' },
    share: { accessCode: '', expiryDate: '', message: '' }
  })

const navigate = useNavigate();
  const event = {
    id: eventId,
    name: "Sarah & Mike Wedding",
    date: "2025-01-15",
    time: "14:00",
    location: "Central Park, NYC",
    status: "On-site",
    type: "Wedding",
    tags: ["Outdoor", "Wedding", "Portrait"],
    description:
      "Beautiful outdoor wedding ceremony in Central Park followed by reception at The Plaza. The couple requested natural lighting and candid shots throughout the ceremony. Special focus on family portraits during golden hour.",
    photographer: {
      name: "Alex Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "alex@photostudio.com",
      phone: "+1 (555) 123-4567",
    },
    client: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 987-6543",
    },
    timeline: [
      { id: 1, action: "Event Scheduled", status: "completed", date: "2024-12-01", time: "10:00" },
      { id: 2, action: "Contract Signed", status: "completed", date: "2024-12-05", time: "14:30" },
      { id: 3, action: "Deposit Received", status: "completed", date: "2024-12-10", time: "09:15" },
      { id: 4, action: "Pre-shoot Meeting", status: "completed", date: "2025-01-10", time: "16:00" },
      { id: 5, action: "Event Shoot", status: "pending", date: "2025-01-15", time: "14:00" },
      { id: 6, action: "Photo Processing", status: "scheduled", date: "2025-01-16", time: "09:00" },
      { id: 7, action: "Gallery Delivery", status: "scheduled", date: "2025-01-20", time: "12:00" },
      { id: 8, action: "Final Payment", status: "scheduled", date: "2025-01-25", time: "10:00" },
    ],
    photos: [
      "/placeholder.svg?height=300&width=400&text=Wedding+Photo+1",
      "/placeholder.svg?height=300&width=400&text=Wedding+Photo+2",
      "/placeholder.svg?height=300&width=400&text=Wedding+Photo+3",
      "/placeholder.svg?height=300&width=400&text=Wedding+Photo+4",
      "/placeholder.svg?height=300&width=400&text=Wedding+Photo+5",
      "/placeholder.svg?height=300&width=400&text=Wedding+Photo+6",
      "/placeholder.svg?height=300&width=400&text=Wedding+Photo+7",
      "/placeholder.svg?height=300&width=400&text=Wedding+Photo+8",
    ],
    communications: [
      {
        id: 1,
        type: "email",
        from: "Sarah Johnson",
        message: "Hi Alex, just wanted to confirm the timing for tomorrow. Looking forward to working with you!",
        date: "2025-01-14",
        time: "18:30",
      },
      {
        id: 2,
        type: "call",
        from: "Alex Rodriguez",
        message: "Called to discuss shot list and timeline - 15 min call",
        date: "2025-01-12",
        time: "14:00",
      },
      {
        id: 3,
        type: "meeting",
        from: "Sarah Johnson",
        message: "Pre-wedding consultation meeting at coffee shop",
        date: "2025-01-10",
        time: "16:00",
      },
    ],
  }

  const getTimelineStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-400 bg-green-900/20 border-green-600"
      case "pending":
        return "text-orange-400 bg-orange-900/20 border-orange-600"
      case "scheduled":
        return "text-purple-400 bg-purple-900/20 border-purple-600"
      default:
        return "text-gray-400 bg-gray-900/20 border-gray-600"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4" />
      case "pending":
        return <Pause className="h-4 w-4" />
      case "scheduled":
        return <Circle className="h-4 w-4" />
      default:
        return <Circle className="h-4 w-4" />
    }
  }

  const getEventStatusBadge = (status) => {
    const config = {
      "On-site": { color: "bg-orange-500", textColor: "text-orange-400" },
      Delivered: { color: "bg-green-5z00", textColor: "text-green-400" },
      Cancelled: { color: "bg-red-500", textColor: "text-red-400" },
      Upcoming: { color: "bg-purple-500", textColor: "text-purple-400" },
      "Post-processing": { color: "bg-purple-600", textColor: "text-purple-400" },
    }

    const statusConfig = config?.[status] ?? {
        color: "bg-gray-500",
        textColor: "text-gray-400",
      };
      

    return (
      <div
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-white ${statusConfig.color}`}
      >
        <Camera className="h-3 w-3" />
        {status}
      </div>
    )
  }

  // Action logging helpers
  const logAction = (action, details = {}) => {
    setActionHistory((prev) => [
      { 
        action, 
        details,
        time: new Date().toLocaleString() 
      },
      ...prev
    ])
  }

  const handlePaymentSubmit = () => {
    const { amount, description, dueDate } = formData.payment
    logAction('Payment Request Issued', {
      amount: `$${amount}`,
      description,
      dueDate,
      icon: '💳',
      status: 'pending'
    })
    setShowPaymentModal(false)
    setFormData(prev => ({ ...prev, payment: { amount: '', description: '', dueDate: '' } }))
  }

  const handleMeetingSubmit = () => {
    const { type, date, time, agenda } = formData.meeting
    logAction('Meeting Scheduled', {
      type: type === 'video' ? 'Video Call' : type === 'phone' ? 'Phone Call' : 'In-Person Meeting',
      date,
      time,
      agenda,
      icon: '📅',
      status: 'pending'
    })
    setShowMeetingModal(false)
    setFormData(prev => ({ ...prev, meeting: { type: '', date: '', time: '', agenda: '' } }))
  }

  const handleUploadSubmit = () => {
    const { albumName } = formData.upload
    logAction('Photos Uploaded', {
      albumName: albumName || 'Untitled Album',
      icon: '📸',
      status: 'pending'
    })
    setShowUploadModal(false)
    setFormData(prev => ({ ...prev, upload: { albumName: '' } }))
  }

  const handleShareSubmit = () => {
    const { accessCode, expiryDate, message } = formData.share
    logAction('Gallery Shared', {
      accessCode: accessCode || 'None',
      expiryDate,
      message: message || 'Gallery link sent to client',
      icon: '🔗',
      status: 'pending'
    })
    setShowShareModal(false)
    setFormData(prev => ({ ...prev, share: { accessCode: '', expiryDate: '', message: '' } }))
  }

  const updateActionStatus = (actionIndex, newStatus) => {
    setActionHistory(prev => 
      prev.map((action, index) => 
        index === actionIndex 
          ? { ...action, details: { ...action.details, status: newStatus } }
          : action
      )
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 bg-green-900/20 border-green-600'
      case 'pending':
        return 'text-orange-400 bg-orange-900/20 border-orange-600'
      case 'cancelled':
        return 'text-red-400 bg-red-900/20 border-red-600'
      case 'in-progress':
        return 'text-blue-400 bg-blue-900/20 border-blue-600'
      default:
        return 'text-gray-400 bg-gray-900/20 border-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={()=>navigate(-1)}
            className="mb-4 text-gray-300 hover:text-white hover:bg-gray-800 border border-gray-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Button>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-purple-400">{event.name}</h1>
                {getEventStatusBadge(event.status)}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {event.date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {event.time}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {event.location}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white border-0">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Issue Payment
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-gray-700 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-purple-400">Issue Payment</DialogTitle>
                    <DialogDescription className="text-gray-400">Send payment request to the client</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="amount" className="text-gray-300">
                        Amount
                      </Label>
                      <Input 
                        id="amount" 
                        placeholder="$0.00" 
                        className="bg-gray-800 border-gray-600 text-white"
                        value={formData.payment.amount}
                        onChange={(e) => setFormData(prev => ({ ...prev, payment: { ...prev.payment, amount: e.target.value } }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="description" className="text-gray-300">
                        Description
                      </Label>
                      <Input
                        id="description"
                        placeholder="Final payment for wedding photography"
                        className="bg-gray-800 border-gray-600 text-white"
                        value={formData.payment.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, payment: { ...prev.payment, description: e.target.value } }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dueDate" className="text-gray-300">
                        Due Date
                      </Label>
                      <Input 
                        id="dueDate" 
                        type="date" 
                        className="bg-gray-800 border-gray-600 text-white"
                        value={formData.payment.dueDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, payment: { ...prev.payment, dueDate: e.target.value } }))}
                      />
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button className="flex-1 bg-purple-600 hover:bg-purple-700" onClick={handlePaymentSubmit}>Send Payment Request</Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowPaymentModal(false)}
                        className="border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={showMeetingModal} onOpenChange={setShowMeetingModal}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-gray-600 text-gray-300 bg-transparent hover:bg-gray-700 hover:text-white">
                    <Video className="h-4 w-4 mr-2" />
                    Schedule Meeting
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-gray-700 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-purple-400">Schedule Meeting</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Schedule a meeting or call with the client
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="meetingType" className="text-gray-300">
                        Meeting Type
                      </Label>
                      <Select onValueChange={(value) => setFormData(prev => ({ ...prev, meeting: { ...prev.meeting, type: value } }))}>
                        <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                          <SelectValue placeholder="Select meeting type" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="video" className="text-white hover:bg-gray-700">
                            Video Call
                          </SelectItem>
                          <SelectItem value="phone" className="text-white hover:bg-gray-700">
                            Phone Call
                          </SelectItem>
                          <SelectItem value="inPerson" className="text-white hover:bg-gray-700">
                            In-Person Meeting
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="meetingDate" className="text-gray-300">
                        Date
                      </Label>
                      <Input 
                        id="meetingDate" 
                        type="date" 
                        className="bg-gray-800 border-gray-600 text-white"
                        value={formData.meeting.date}
                        onChange={(e) => setFormData(prev => ({ ...prev, meeting: { ...prev.meeting, date: e.target.value } }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="meetingTime" className="text-gray-300">
                        Time
                      </Label>
                      <Input 
                        id="meetingTime" 
                        type="time" 
                        className="bg-gray-800 border-gray-600 text-white"
                        value={formData.meeting.time}
                        onChange={(e) => setFormData(prev => ({ ...prev, meeting: { ...prev.meeting, time: e.target.value } }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="agenda" className="text-gray-300">
                        Agenda
                      </Label>
                      <Textarea
                        id="agenda"
                        placeholder="Meeting agenda or notes..."
                        className="bg-gray-800 border-gray-600 text-white"
                        value={formData.meeting.agenda}
                        onChange={(e) => setFormData(prev => ({ ...prev, meeting: { ...prev.meeting, agenda: e.target.value } }))}
                      />
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button className="flex-1 bg-purple-600 hover:bg-purple-700" onClick={handleMeetingSubmit}>Schedule Meeting</Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowMeetingModal(false)}
                        className="border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-gray-600 text-gray-300 bg-transparent hover:bg-gray-700 hover:text-white">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photos
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-gray-700 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-purple-400">Upload Photos</DialogTitle>
                    <DialogDescription className="text-gray-400">Upload event photos to the gallery</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center bg-gray-800/50">
                      <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <div className="text-lg font-medium mb-2 text-gray-300">Drop files here or click to browse</div>
                      <div className="text-sm text-gray-400">Supports JPG, PNG, RAW files up to 50MB each</div>
                      <Button className="mt-4 bg-purple-600 hover:bg-purple-700">Choose Files</Button>
                    </div>
                    <div>
                      <Label htmlFor="albumName" className="text-gray-300">
                        Album Name
                      </Label>
                      <Input
                        id="albumName"
                        placeholder="Wedding Ceremony"
                        className="bg-gray-800 border-gray-600 text-white"
                        value={formData.upload.albumName}
                        onChange={(e) => setFormData(prev => ({ ...prev, upload: { ...prev.upload, albumName: e.target.value } }))}
                      />
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button className="flex-1 bg-purple-600 hover:bg-purple-700" onClick={handleUploadSubmit}>Upload Photos</Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowUploadModal(false)}
                        className="border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={showShareModal} onOpenChange={setShowShareModal}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-gray-600 text-gray-300 bg-transparent hover:bg-gray-700 hover:text-white">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Gallery
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-gray-700 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-purple-400">Share Gallery</DialogTitle>
                    <DialogDescription className="text-gray-400">Share gallery link with the client</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="galleryLink" className="text-gray-300">
                        Gallery Link
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="galleryLink"
                          value="https://gallery.photostudio.com/sarah-mike-wedding"
                          readOnly
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="accessCode" className="text-gray-300">
                        Access Code (Optional)
                      </Label>
                      <Input
                        id="accessCode"
                        placeholder="Enter access code"
                        className="bg-gray-800 border-gray-600 text-white"
                        value={formData.share.accessCode}
                        onChange={(e) => setFormData(prev => ({ ...prev, share: { ...prev.share, accessCode: e.target.value } }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="expiryDate" className="text-gray-300">
                        Link Expires
                      </Label>
                      <Input 
                        id="expiryDate" 
                        type="date" 
                        className="bg-gray-800 border-gray-600 text-white"
                        value={formData.share.expiryDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, share: { ...prev.share, expiryDate: e.target.value } }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="shareMessage" className="text-gray-300">
                        Message to Client
                      </Label>
                      <Textarea
                        id="shareMessage"
                        placeholder="Hi Sarah, your wedding photos are ready! Please use the link above to view and download your gallery."
                        className="bg-gray-800 border-gray-600 text-white"
                        value={formData.share.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, share: { ...prev.share, message: e.target.value } }))}
                      />
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button className="flex-1 bg-purple-600 hover:bg-purple-700" onClick={handleShareSubmit}>Send Gallery Link</Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowShareModal(false)}
                        className="border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4 bg-gray-800 border border-gray-700">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-purple-400 text-gray-300 hover:bg-purple-700 hover:text-white border-b-2 border-transparent"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="gallery"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-purple-400 text-gray-300 hover:bg-purple-700 hover:text-white border-b-2 border-transparent"
            >
              Gallery
            </TabsTrigger>
            <TabsTrigger
              value="client"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-purple-400 text-gray-300 hover:bg-purple-700 hover:text-white border-b-2 border-transparent"
            >
              Client Details
            </TabsTrigger>
            <TabsTrigger
              value="communication"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-purple-400 text-gray-300 hover:bg-purple-700 hover:text-white border-b-2 border-transparent"
            >
              Communication
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Action History */}
                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-purple-400">Action History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {actionHistory.length === 0 ? (
                      <div className="text-gray-400 text-sm">No actions yet.</div>
                    ) : (
                      <ul className="space-y-3">
                        {actionHistory.map((log, idx) => (
                          <li key={idx} className="p-3 border border-gray-700 rounded-lg bg-gray-800/50">
                            <div className="flex items-start gap-3">
                              <span className="text-2xl">{log.details.icon}</span>
                              <div className="flex-1">
                                <div className="text-purple-400 font-semibold mb-1">{log.action}</div>
                                {Object.entries(log.details).filter(([key]) => key !== 'icon' && key !== 'status').map(([key, value]) => (
                                  <div key={key} className="text-gray-300 text-sm mb-1">
                                    <span className="text-gray-400 capitalize">{key}: </span>
                                    <span>{value}</span>
                                  </div>
                                ))}
                                <div className="text-gray-500 text-xs mt-2">{log.time}</div>
                              </div>
                              <div className="flex-shrink-0">
                                <Select 
                                  value={log.details.status || 'pending'} 
                                  onValueChange={(value) => updateActionStatus(idx, value)}
                                >
                                  <SelectTrigger className={`w-32 h-8 text-xs ${getStatusColor(log.details.status || 'pending')}`}>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="bg-gray-800 border-gray-600">
                                    <SelectItem value="pending" className="text-orange-400 hover:bg-gray-700">
                                      Pending
                                    </SelectItem>
                                    <SelectItem value="in-progress" className="text-blue-400 hover:bg-gray-700">
                                      In Progress
                                    </SelectItem>
                                    <SelectItem value="completed" className="text-green-400 hover:bg-gray-700">
                                      Completed
                                    </SelectItem>
                                    <SelectItem value="cancelled" className="text-red-400 hover:bg-gray-700">
                                      Cancelled
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
                {/* Event Details */}
                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-400">
                      <Camera className="h-5 w-5" />
                      Event Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-400">Description</Label>
                      <p className="mt-1 text-sm text-gray-300">{event.description}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-400">Event Type & Tags</Label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge className="bg-purple-600 text-white hover:bg-purple-700">
                          <Tag className="h-3 w-3 mr-1" />
                          {event.type}
                        </Badge>
                        {event.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="border-gray-600 text-gray-300 hover:bg-gray-800"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline */}
                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-purple-400">Event Timeline</CardTitle>
                    <CardDescription className="text-gray-400">
                      Track the progress of your event from start to finish
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {event.timeline.map((item, index) => (
                        <div key={item.id} className="flex items-start gap-4">
                          <div
                            className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${getTimelineStatusColor(item.status)}`}
                          >
                            {getStatusIcon(item.status)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-300">{item.action}</p>
                              <div className="text-xs text-gray-400">
                                {item.date} at {item.time}
                              </div>
                            </div>
                            <Badge
                              variant="outline"
                              className={`mt-1 text-xs ${getTimelineStatusColor(item.status)} border-current`}
                            >
                              {item.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Photographer Info */}
                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-400">Photographer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={event.photographer.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-purple-600 text-white">AR</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-300">{event.photographer.name}</div>
                        <div className="text-sm text-gray-400">Lead Photographer</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <a
                          href={`mailto:${event.photographer.email}`}
                          className="hover:underline text-gray-300 hover:text-purple-400"
                        >
                          {event.photographer.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <a
                          href={`tel:${event.photographer.phone}`}
                          className="hover:underline text-gray-300 hover:text-purple-400"
                        >
                          {event.photographer.phone}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Client Info */}
                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-400">Client</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={event.client.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-purple-600 text-white">SJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-300">{event.client.name}</div>
                        <div className="text-sm text-gray-400">Primary Contact</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <a
                          href={`mailto:${event.client.email}`}
                          className="hover:underline text-gray-300 hover:text-purple-400"
                        >
                          {event.client.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <a
                          href={`tel:${event.client.phone}`}
                          className="hover:underline text-gray-300 hover:text-purple-400"
                        >
                          {event.client.phone}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-400">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Invoice
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Contract
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="gallery" className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-purple-400">Event Gallery</CardTitle>
                    <CardDescription className="text-gray-400">Preview and manage event photos</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload More
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Gallery
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {event.photos.map((photo, index) => (
                    <div key={index} className="relative group aspect-square">
                      <img
                        src={photo || "/placeholder.svg"}
                        alt={`Event photo ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg border border-gray-700"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="client" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-purple-400">Client Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={event.client.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-purple-600 text-white">SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-300">{event.client.name}</h3>
                      <p className="text-gray-400">Primary Contact</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-gray-400">Email</Label>
                      <p className="text-sm text-gray-300">{event.client.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-400">Phone</Label>
                      <p className="text-sm text-gray-300">{event.client.phone}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-400">Event Type</Label>
                      <p className="text-sm text-gray-300">{event.type}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-purple-400">Event Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-400">Photography Style</Label>
                    <p className="text-sm text-gray-300">Natural, Candid, Documentary</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-400">Special Requests</Label>
                    <p className="text-sm text-gray-300">
                      Focus on family portraits during golden hour, capture candid moments during ceremony
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-400">Delivery Format</Label>
                    <p className="text-sm text-gray-300">High-resolution digital gallery + USB drive</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="communication" className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-purple-400">Communication Log</CardTitle>
                    <CardDescription className="text-gray-400">All interactions with the client</CardDescription>
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    New Message
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {event.communications.map((comm) => (
                    <div key={comm.id} className="flex gap-4 p-4 border border-gray-700 rounded-lg bg-gray-800/50">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            comm.type === "email"
                              ? "bg-purple-600 text-white"
                              : comm.type === "call"
                                ? "bg-green-600 text-white"
                                : "bg-blue-600 text-white"
                          }`}
                        >
                          {comm.type === "email" ? (
                            <Mail className="h-4 w-4" />
                          ) : comm.type === "call" ? (
                            <Phone className="h-4 w-4" />
                          ) : (
                            <User className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-sm text-gray-300">{comm.from}</p>
                          <p className="text-xs text-gray-400">
                            {comm.date} at {comm.time}
                          </p>
                        </div>
                        <p className="text-sm text-gray-400">{comm.message}</p>
                        <Badge variant="outline" className="mt-2 text-xs border-gray-600 text-gray-400">
                          {comm.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
