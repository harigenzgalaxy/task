import { useState, useEffect, Fragment } from "react"
import {
  Edit3,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  BadgeIcon,
  FileText,
  Plus,
  Trash2,
  Upload,
  User,
  Star,
  Eye,
  Building,
  Users,
  Phone as PhoneIcon,
  Mail as MailIcon,
  Clock,
  Check,
  X as XIcon,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card"
import { Input } from "../../components/ui/Input"
import { Label } from "../../components/ui/Label"
import { Textarea } from "../../components/ui/textarea"
import { Switch } from "../../components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"

function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-[#181c23] rounded-xl shadow-lg p-6 w-full max-w-sm border border-gray-800 relative">
        <button className="absolute top-3 right-3 text-gray-400 hover:text-white" onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
}

export default function StudioProfile({ onUnsavedChanges }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    studioName: "Purple Lens Studio",
    studioType: "brand",
    address: "123 Main Street, Downtown, City, State, 123456",
    contactNumber: "+1 (555) 987-6543",
    alternateEmail: "studio.alt@email.com",
    email: "contact@purplelens.com",
    instagram: "@purplelensstudio",
    facebook: "",
    linkedin: "",
    youtube: "",
    bookingStatus: true,
    bookingStatusMessage: "Now open for 2024 bookings!",
    operatingHours: "10:00 AM – 7:00 PM",
    services: ["Wedding", "Editing", "Drone", "Printing", "Studio Rental"],
  })
  const [originalData, setOriginalData] = useState({ ...formData })

  useEffect(() => {
    const hasChanges = JSON.stringify(formData) !== JSON.stringify(originalData)
    onUnsavedChanges?.(hasChanges && isEditing)
  }, [formData, originalData, isEditing, onUnsavedChanges])

  // Studio Team Members (placeholder data)
  const [teamMembers, setTeamMembers] = useState([
    { name: "Alex Johnson", role: "Lead Photographer", avatar: "", email: "alex@purplelens.com" },
    { name: "Priya Singh", role: "Editor", avatar: "", email: "priya@purplelens.com" },
    { name: "Rahul Mehra", role: "Drone Operator", avatar: "", email: "rahul@purplelens.com" },
  ])
  const [teamModalOpen, setTeamModalOpen] = useState(false)
  const [teamEditIndex, setTeamEditIndex] = useState(null)
  const [teamForm, setTeamForm] = useState({ name: '', role: '', email: '' })

  const openAddTeam = () => {
    setTeamEditIndex(null);
    setTeamForm({ name: '', role: '', email: '' });
    setTeamModalOpen(true);
  };
  const openEditTeam = (member, idx) => {
    setTeamEditIndex(idx);
    setTeamForm({ ...member });
    setTeamModalOpen(true);
  };
  const handleTeamFormChange = (field, value) => {
    setTeamForm((prev) => ({ ...prev, [field]: value }));
  };
  const handleSaveTeam = () => {
    if (!teamForm.name.trim()) return;
    if (teamEditIndex !== null) {
      // Edit
      const updated = [...teamMembers];
      updated[teamEditIndex] = { ...teamForm };
      setTeamMembers(updated);
    } else {
      // Add
      setTeamMembers((prev) => [...prev, { ...teamForm }]);
    }
    setTeamModalOpen(false);
  };
  const handleDeleteTeam = (idx) => {
    setTeamMembers((prev) => prev.filter((_, i) => i !== idx));
  };

  // Portfolio/Work Samples
  const [portfolioModalOpen, setPortfolioModalOpen] = useState(false);
  const [portfolioFile, setPortfolioFile] = useState(null);
  const [portfolioImages, setPortfolioImages] = useState([
    "/placeholder.svg?height=200&width=200&text=Studio+1",
    "/placeholder.svg?height=200&width=200&text=Studio+2",
    "/placeholder.svg?height=200&width=200&text=Studio+3",
    "/placeholder.svg?height=200&width=200&text=Studio+4",
  ])
  const handleUploadPhoto = (e) => {
    setPortfolioFile(e.target.files[0]);
  };
  const handleSavePortfolio = () => {
    setPortfolioModalOpen(false);
    setPortfolioFile(null);
  };

  // Services
  const allServices = ["Wedding", "Editing", "Drone", "Printing", "Studio Rental"]
  const toggleService = (service) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }))
  }

  // Edit/Save/Discard
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }
  const handleEditClick = () => {
    setIsEditing(true)
    setOriginalData({ ...formData })
  }
  const handleSaveChanges = () => {
    setOriginalData({ ...formData })
    setIsEditing(false)
    onUnsavedChanges?.(false)
  }
  const handleDiscardChanges = () => {
    setFormData({ ...originalData })
    setIsEditing(false)
    onUnsavedChanges?.(false)
  }

  // Booking Status
  const handleBookingStatusToggle = (checked) => {
    setFormData((prev) => ({ ...prev, bookingStatus: checked }))
  }

  // Testimonials (keep as placeholder)
  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "Purple Lens Studio made our wedding unforgettable! The team was professional and creative.",
      date: "2 weeks ago",
    },
    {
      name: "Mike Chen",
      rating: 5,
      comment: "Great experience for our corporate event. Highly recommend!",
      date: "1 month ago",
    },
    {
      name: "Emily Davis",
      rating: 4,
      comment: "Studio rental was smooth and the facilities are top-notch.",
      date: "2 months ago",
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      <div className="p-4 md:p-6">
        {/* <h1 className="text-2xl md:text-3xl font-bold text-purple-400 mb-8">Studio Profile</h1> */}
      </div>
      <div className="p-4 md:p-6 space-y-6 pb-20 pt-0">
        {/* Sticky Edit/Save/Discard Buttons */}
        <div className="fixed bottom-6 right-6 z-50 flex gap-2">
          {!isEditing ? (
            <Button onClick={handleEditClick} className="bg-purple-600 hover:bg-purple-700 shadow-lg text-white">
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <>
              <Button onClick={handleSaveChanges} className="bg-green-600 hover:bg-green-700 shadow-lg text-white font-semibold px-6 py-2 rounded-lg text-base">
                Save Changes
              </Button>
              <Button
                onClick={handleDiscardChanges}
                className="bg-red-600 hover:bg-red-500 border-none shadow-lg text-white font-semibold px-6 py-2 rounded-lg text-base transition-colors"
                style={{ border: 'none' }}
              >
                Discard Changes
              </Button>
            </>
          )}
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-purple-400">Studio Profile</h1>
            <p className="text-gray-400 mt-2">Manage your studio's professional profile</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Studio Information */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Building className="h-5 w-5" />
                  Studio Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="studioName" className="text-gray-300">
                      Studio Name
                    </Label>
                    <Input
                      id="studioName"
                      value={formData.studioName}
                      onChange={(e) => handleInputChange("studioName", e.target.value)}
                      disabled={!isEditing}
                      className={`bg-gray-800 border-gray-600 text-white placeholder-gray-400 ${!isEditing ? "cursor-not-allowed opacity-60" : ""}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studioType" className="text-gray-300">
                      Studio Type
                    </Label>
                    <Select
                      value={formData.studioType}
                      onValueChange={(value) => handleInputChange("studioType", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className={`bg-gray-800 border-gray-600 text-white ${!isEditing ? "cursor-not-allowed opacity-60" : ""}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="individual" className="text-white hover:bg-gray-700">Individual</SelectItem>
                        <SelectItem value="brand" className="text-white hover:bg-gray-700">Brand</SelectItem>
                        <SelectItem value="franchise" className="text-white hover:bg-gray-700">Franchise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address" className="text-gray-300">
                      Studio Address
                    </Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      disabled={!isEditing}
                      rows={2}
                      className={`bg-gray-800 border-gray-600 text-white placeholder-gray-400 ${!isEditing ? "cursor-not-allowed opacity-60" : ""}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactNumber" className="text-gray-300">
                      Contact Number
                    </Label>
                    <Input
                      id="contactNumber"
                      value={formData.contactNumber}
                      onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                      disabled={!isEditing}
                      className={`bg-gray-800 border-gray-600 text-white placeholder-gray-400 ${!isEditing ? "cursor-not-allowed opacity-60" : ""}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="alternateEmail" className="text-gray-300">
                      Alternate Email (optional)
                    </Label>
                    <Input
                      id="alternateEmail"
                      value={formData.alternateEmail}
                      onChange={(e) => handleInputChange("alternateEmail", e.target.value)}
                      disabled={!isEditing}
                      className={`bg-gray-800 border-gray-600 text-white placeholder-gray-400 ${!isEditing ? "cursor-not-allowed opacity-60" : ""}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="operatingHours" className="text-gray-300">
                      Operating Hours
                    </Label>
                    <Input
                      id="operatingHours"
                      value={formData.operatingHours}
                      onChange={(e) => handleInputChange("operatingHours", e.target.value)}
                      disabled={!isEditing}
                      className={`bg-gray-800 border-gray-600 text-white placeholder-gray-400 ${!isEditing ? "cursor-not-allowed opacity-60" : ""}`}
                      placeholder="e.g. 10:00 AM – 7:00 PM"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">
                      Studio Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      disabled={!isEditing}
                      className={`bg-gray-800 border-gray-600 text-white placeholder-gray-400 ${!isEditing ? "cursor-not-allowed opacity-60" : ""}`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-purple-400">Social Links</CardTitle>
                <CardDescription className="text-gray-400">Connect your studio's social media profiles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="instagram" className="flex items-center gap-2 text-gray-300">
                      <Instagram className="h-4 w-4 text-pink-600" />
                      Instagram
                    </Label>
                    <Input
                      id="instagram"
                      placeholder=""
                      value={formData.instagram}
                      onChange={(e) => handleInputChange("instagram", e.target.value)}
                      disabled={!isEditing}
                      className={`bg-gray-800 border-gray-600 text-white placeholder-gray-400 ${!isEditing ? "cursor-not-allowed opacity-60" : ""}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facebook" className="flex items-center gap-2 text-gray-300">
                      <Facebook className="h-4 w-4 text-blue-600" />
                      Facebook
                    </Label>
                    <Input
                      id="facebook"
                      placeholder=""
                      value={formData.facebook}
                      onChange={(e) => handleInputChange("facebook", e.target.value)}
                      disabled={!isEditing}
                      className={`bg-gray-800 border-gray-600 text-white placeholder-gray-400 ${!isEditing ? "cursor-not-allowed opacity-60" : ""}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin" className="flex items-center gap-2 text-gray-300">
                      <Linkedin className="h-4 w-4 text-blue-700" />
                      LinkedIn
                    </Label>
                    <Input
                      id="linkedin"
                      placeholder=""
                      value={formData.linkedin}
                      onChange={(e) => handleInputChange("linkedin", e.target.value)}
                      disabled={!isEditing}
                      className={`bg-gray-800 border-gray-600 text-white placeholder-gray-400 ${!isEditing ? "cursor-not-allowed opacity-60" : ""}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="youtube" className="flex items-center gap-2 text-gray-300">
                      <Youtube className="h-4 w-4 text-red-600" />
                      YouTube
                    </Label>
                    <Input
                      id="youtube"
                      placeholder=""
                      value={formData.youtube}
                      onChange={(e) => handleInputChange("youtube", e.target.value)}
                      disabled={!isEditing}
                      className={`bg-gray-800 border-gray-600 text-white placeholder-gray-400 ${!isEditing ? "cursor-not-allowed opacity-60" : ""}`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Available Services */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <BadgeIcon className="h-5 w-5" />
                  Available Services
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Select the services your studio offers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {allServices.map((service) => (
                    <Badge
                      key={service}
                      variant={formData.services.includes(service) ? "default" : "outline"}
                      className={`transition-colors ${
                        formData.services.includes(service)
                          ? "bg-purple-600 hover:bg-purple-700 text-white"
                          : "border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600"
                      } ${!isEditing ? "opacity-60 pointer-events-none" : "cursor-pointer"}`}
                      onClick={isEditing ? () => toggleService(service) : undefined}
                    >
                      {service}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Studio Team Members */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-purple-400">
                    <Users className="h-5 w-5" />
                    Studio Team Members
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`border-gray-600 text-gray-300 bg-transparent transition-colors ${!isEditing ? 'opacity-60 pointer-events-none' : 'hover:bg-gray-700 hover:text-white'}`}
                    onClick={isEditing ? openAddTeam : undefined}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Member
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {teamMembers.map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border border-gray-700 rounded-lg bg-gray-800/50"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.avatar || "/placeholder.svg?height=40&width=40&text=Avatar"} alt={member.name} />
                          <AvatarFallback className="bg-purple-600 text-white">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-white">{member.name}</div>
                          <div className="text-sm text-gray-400">{member.role}</div>
                          <div className="text-xs text-gray-400">{member.email}</div>
                        </div>
                      </div>
                      {isEditing && (
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-400" onClick={() => openEditTeam(member, index)}>
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400" onClick={() => handleDeleteTeam(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* Team Modal */}
            <Modal open={teamModalOpen} onClose={() => setTeamModalOpen(false)}>
              <h2 className="text-lg font-bold text-purple-400 mb-2">{teamEditIndex !== null ? 'Edit Team Member' : 'Add Team Member'}</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-1">Name</label>
                  <input type="text" className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white" value={teamForm.name} onChange={e => handleTeamFormChange('name', e.target.value)} />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">Role</label>
                  <input type="text" className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white" value={teamForm.role} onChange={e => handleTeamFormChange('role', e.target.value)} />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">Email</label>
                  <input type="email" className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white" value={teamForm.email} onChange={e => handleTeamFormChange('email', e.target.value)} />
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded" onClick={handleSaveTeam}>Save</button>
                  <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded" onClick={() => setTeamModalOpen(false)}>Cancel</button>
                </div>
              </div>
            </Modal>

            {/* Studio Work Samples */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-purple-400">Studio Work Samples</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`border-gray-600 text-gray-300 bg-transparent transition-colors ${!isEditing ? 'opacity-60 pointer-events-none' : 'hover:bg-gray-700 hover:text-white'}`}
                    onClick={isEditing ? () => setPortfolioModalOpen(true) : undefined}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photos
                  </Button>
                </div>
                <CardDescription className="text-gray-400">Showcase your studio's best work</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {portfolioImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Work Sample ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-700"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <Button variant="secondary" size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* Portfolio Modal */}
            <Modal open={portfolioModalOpen} onClose={() => setPortfolioModalOpen(false)}>
              <h2 className="text-lg font-bold text-purple-400 mb-2">Upload Photo</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <label className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded cursor-pointer transition-colors">
                    Choose File
                    <input type="file" accept="image/*" onChange={handleUploadPhoto} className="hidden" />
                  </label>
                  <span className="text-gray-400 text-sm">
                    {portfolioFile ? portfolioFile.name : 'No file chosen'}
                  </span>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded" onClick={handleSavePortfolio} disabled={!portfolioFile}>Save</button>
                  <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded" onClick={() => setPortfolioModalOpen(false)}>Cancel</button>
                </div>
              </div>
            </Modal>

            {/* Documents */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <FileText className="h-5 w-5" />
                  Documents
                </CardTitle>
                <CardDescription className="text-gray-400">Upload your studio's professional documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center bg-gray-800/30">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <div className="text-sm font-medium text-gray-300">ID Proof</div>
                    <div className="text-xs text-gray-400">Upload ID document</div>
                  </div>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center bg-gray-800/30">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <div className="text-sm font-medium text-gray-300">GST Certificate</div>
                    <div className="text-xs text-gray-400">Upload GST document</div>
                  </div>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center bg-gray-800/30">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <div className="text-sm font-medium text-gray-300">Agreements</div>
                    <div className="text-xs text-gray-400">Upload contracts</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Studio Logo */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-purple-400">Studio Logo</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <Avatar className="h-32 w-32 mx-auto">
                  <AvatarImage src="/placeholder.svg?height=128&width=128&text=Logo" />
                  <AvatarFallback className="text-2xl bg-purple-600 text-white">SL</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-purple-400 hover:border-purple-500 transition-colors"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Change Logo
                  </Button>
                  <Button variant="ghost" className="w-full text-red-400 hover:text-red-300 hover:bg-gray-800">
                    Remove Logo
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Booking Status */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-purple-400">Booking Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium text-white">Currently Accepting Bookings</div>
                    <div className="text-sm text-gray-400">
                      {formData.bookingStatus ? "Open for new bookings" : "Not accepting bookings"}
                    </div>
                  </div>
                  <Switch checked={formData.bookingStatus} onCheckedChange={isEditing ? handleBookingStatusToggle : undefined} disabled={!isEditing} className={!isEditing ? "opacity-60 pointer-events-none" : ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bookingStatusMessage" className="text-gray-300">
                    Booking Status Message
                  </Label>
                  <Textarea
                    id="bookingStatusMessage"
                    placeholder="Add a custom booking status message..."
                    value={formData.bookingStatusMessage}
                    onChange={(e) => handleInputChange("bookingStatusMessage", e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                    className={`bg-gray-800 border-gray-600 text-white placeholder-gray-400 ${!isEditing ? "cursor-not-allowed opacity-60" : ""}`}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Review Summary */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Star className="h-5 w-5" />
                  Review Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div>
                    <div className="text-4xl font-bold text-white">4.9</div>
                    <div className="flex justify-center gap-1 my-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="text-sm text-gray-400">Based on 47 reviews</div>
                  </div>
                  <div className="border-t border-gray-700 pt-4">
                    <div className="space-y-4">
                      <h4 className="font-medium text-left text-white">Recent Testimonials</h4>
                      {testimonials.map((testimonial, index) => (
                        <div
                          key={index}
                          className="text-left space-y-2 p-3 bg-gray-800/50 rounded-lg border border-gray-700"
                        >
                          <div className="flex items-center justify-between">
                            <div className="font-medium text-sm text-white">{testimonial.name}</div>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-3 w-3 ${
                                    star <= testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-gray-400">{testimonial.comment}</p>
                          <div className="text-xs text-gray-500">{testimonial.date}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 