"use client"

import { useState, useEffect } from "react"
import { Fragment } from "react"
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
  Camera,
  Star,
  Eye,
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

export default function Profile({ onUnsavedChanges }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "Alex Rodriguez",
    email: "alex@photostudio.com",
    phone: "+1 (555) 123-4567",
    gender: "male",
    dob: "1990-05-15",
    location: "New York, NY",
    instagram: "@alexphoto",
    facebook: "",
    linkedin: "",
    youtube: "",
    experience: "5-7",
    workType: "freelance",
    statusMessage: "Available for wedding and portrait sessions. Book now for 2024!",
  })
  const [originalData, setOriginalData] = useState({ ...formData })

  useEffect(() => {
    const hasChanges = JSON.stringify(formData) !== JSON.stringify(originalData)
    onUnsavedChanges?.(hasChanges && isEditing)
  }, [formData, originalData, isEditing, onUnsavedChanges])

  const [isAvailable, setIsAvailable] = useState(true)
  const [selectedGenres, setSelectedGenres] = useState(["Wedding", "Portrait", "Event"])
  const [selectedSkills, setSelectedSkills] = useState(["Candid", "Cinematic", "Editing"])

  const photographyGenres = ["Wedding", "Portrait", "Event", "Corporate", "Fashion", "Nature", "Street", "Product"]
  const skillTags = [
    "Candid",
    "Cinematic",
    "Editing",
    "Drone Shots",
    "Studio Lighting",
    "Post-Processing",
    "Color Grading",
    "Retouching",
  ]

  const [cameraGear, setCameraGear] = useState([
    { name: "Canon R5", model: "Body", quantity: 1 },
    { name: "Canon RF 24-70mm", model: "f/2.8L IS USM", quantity: 1 },
    { name: "Canon RF 70-200mm", model: "f/2.8L IS USM", quantity: 1 },
    { name: "DJI Mavic 3", model: "Drone", quantity: 1 },
    { name: "Godox AD600Pro", model: "Flash", quantity: 2 },
    { name: "LP-E6NH", model: "Battery", quantity: 4 },
  ])

  const portfolioImages = [
    "/placeholder.svg?height=200&width=200&text=Wedding+1",
    "/placeholder.svg?height=200&width=200&text=Portrait+1",
    "/placeholder.svg?height=200&width=200&text=Event+1",
    "/placeholder.svg?height=200&width=200&text=Wedding+2",
    "/placeholder.svg?height=200&width=200&text=Portrait+2",
    "/placeholder.svg?height=200&width=200&text=Event+2",
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "Alex captured our wedding perfectly! The photos are absolutely stunning and we couldn't be happier.",
      date: "2 weeks ago",
    },
    {
      name: "Mike Chen",
      rating: 5,
      comment: "Professional, creative, and delivered exactly what we wanted. Highly recommend!",
      date: "1 month ago",
    },
    {
      name: "Emily Davis",
      rating: 4,
      comment: "Great experience working with Alex. The corporate headshots turned out amazing.",
      date: "2 months ago",
    },
  ]

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleEditClick = () => {
    setIsEditing(true)
    setOriginalData({ ...formData })
  }

  const handleSaveChanges = () => {
    // Here you would typically save to your backend/database
    console.log("Saving changes:", formData)
    setOriginalData({ ...formData }) // Update original data to match current
    setIsEditing(false)
    onUnsavedChanges?.(false) // Clear unsaved changes flag
  }

  const handleDiscardChanges = () => {
    setFormData({ ...originalData })
    setIsEditing(false)
    onUnsavedChanges?.(false) // Clear unsaved changes flag
  }

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) => (prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]))
  }

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  const [gearModalOpen, setGearModalOpen] = useState(false);
  const [gearEditIndex, setGearEditIndex] = useState(null);
  const [gearForm, setGearForm] = useState({ name: '', model: '', quantity: 1 });
  const [portfolioModalOpen, setPortfolioModalOpen] = useState(false);
  const [portfolioFile, setPortfolioFile] = useState(null);

  const openAddGear = () => {
    setGearEditIndex(null);
    setGearForm({ name: '', model: '', quantity: 1 });
    setGearModalOpen(true);
  };
  const openEditGear = (gear, idx) => {
    setGearEditIndex(idx);
    setGearForm({ ...gear });
    setGearModalOpen(true);
  };
  const handleGearFormChange = (field, value) => {
    setGearForm((prev) => ({ ...prev, [field]: value }));
  };
  const handleSaveGear = () => {
    if (!gearForm.name.trim()) return;
    if (gearEditIndex !== null) {
      // Edit
      const updated = [...cameraGear];
      updated[gearEditIndex] = { ...gearForm };
      setCameraGear(updated);
    } else {
      // Add
      setCameraGear((prev) => [...prev, { ...gearForm }]);
    }
    setGearModalOpen(false);
  };
  const handleDeleteGear = (idx) => {
    setCameraGear((prev) => prev.filter((_, i) => i !== idx));
  };
  const handleUploadPhoto = (e) => {
    setPortfolioFile(e.target.files[0]);
  };
  const handleSavePortfolio = () => {
    // For demo, just close modal. In real app, upload and update portfolioImages.
    setPortfolioModalOpen(false);
    setPortfolioFile(null);
  };

  return (
      <div className="p-4 md:p-6 space-y-6 pb-20">
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
            <h1 className="text-2xl md:text-3xl font-bold text-purple-400">Profile Settings</h1>
            <p className="text-gray-400 mt-2">Manage your professional photography profile</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-gray-300">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      disabled={!isEditing}
                      className={`bg-gray-800 border-gray-600 text-white placeholder-gray-400 ${!isEditing ? "cursor-not-allowed opacity-60" : ""}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">
                      Email
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
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-300">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      disabled={!isEditing}
                      className={`bg-gray-800 border-gray-600 text-white placeholder-gray-400 ${!isEditing ? "cursor-not-allowed opacity-60" : ""}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-gray-300">
                      Gender
                    </Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => handleInputChange("gender", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger
                        className={`bg-gray-800 border-gray-600 text-white ${!isEditing ? "cursor-not-allowed opacity-60" : ""}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="male" className="text-white hover:bg-gray-700">
                          Male
                        </SelectItem>
                        <SelectItem value="female" className="text-white hover:bg-gray-700">
                          Female
                        </SelectItem>
                        <SelectItem value="other" className="text-white hover:bg-gray-700">
                          Other
                        </SelectItem>
                        <SelectItem value="prefer-not-to-say" className="text-white hover:bg-gray-700">
                          Prefer not to say
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob" className="text-gray-300">
                      Date of Birth
                    </Label>
                    <Input
                      id="dob"
                      type="date"
                      value={formData.dob}
                      onChange={(e) => handleInputChange("dob", e.target.value)}
                      disabled={!isEditing}
                      className={`bg-gray-800 border-gray-600 text-white placeholder-gray-400 ${!isEditing ? "cursor-not-allowed opacity-60" : ""}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-gray-300">
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
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
                <CardDescription className="text-gray-400">Connect your social media profiles</CardDescription>
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
                      className={`bg-gray-800 border-gray-600 ${isEditing && formData.facebook === "facebook.com/alexphoto" ? "text-gray-900" : "text-white"} placeholder-gray-400 ${!isEditing ? "cursor-not-allowed opacity-60" : ""}`}
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
                      className={`bg-gray-800 border-gray-600 ${isEditing && formData.linkedin === "linkedin.com/in/alexphoto" ? "text-gray-300" : "text-white"} placeholder-gray-400 ${!isEditing ? "cursor-not-allowed opacity-60" : ""}`}
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
                      className={`bg-gray-800 border-gray-600 ${isEditing && formData.youtube === "youtube.com/@alexphoto" ? "text-gray-300" : "text-white"} placeholder-gray-400 ${!isEditing ? "cursor-not-allowed opacity-60" : ""}`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Camera Experience */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Camera className="h-5 w-5" />
                  Camera Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="experience" className="text-gray-300">
                      Years of Experience
                    </Label>
                    <Select
                      value={formData.experience}
                      onValueChange={(value) => handleInputChange("experience", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger
                        className={`bg-gray-800 border-gray-600 text-white ${!isEditing ? "cursor-not-allowed opacity-60" : ""}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="1-2" className="text-white hover:bg-gray-700">
                          1-2 years
                        </SelectItem>
                        <SelectItem value="3-4" className="text-white hover:bg-gray-700">
                          3-4 years
                        </SelectItem>
                        <SelectItem value="5-7" className="text-white hover:bg-gray-700">
                          5-7 years
                        </SelectItem>
                        <SelectItem value="8-10" className="text-white hover:bg-gray-700">
                          8-10 years
                        </SelectItem>
                        <SelectItem value="10+" className="text-white hover:bg-gray-700">
                          10+ years
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="workType" className="text-gray-300">
                      Work Type
                    </Label>
                    <Select
                      value={formData.workType}
                      onValueChange={(value) => handleInputChange("workType", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger
                        className={`bg-gray-800 border-gray-600 text-white ${!isEditing ? "cursor-not-allowed opacity-60" : ""}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="freelance" className="text-white hover:bg-gray-700">
                          Freelance
                        </SelectItem>
                        <SelectItem value="full-time" className="text-white hover:bg-gray-700">
                          Full-time
                        </SelectItem>
                        <SelectItem value="part-time" className="text-white hover:bg-gray-700">
                          Part-time
                        </SelectItem>
                        <SelectItem value="studio-owner" className="text-white hover:bg-gray-700">
                          Studio Owner
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Photography Genres</Label>
                  <div className="flex flex-wrap gap-2">
                    {photographyGenres.map((genre) => (
                      <Badge
                        key={genre}
                        variant={selectedGenres.includes(genre) ? "default" : "outline"}
                        className={`transition-colors ${
                          selectedGenres.includes(genre)
                            ? "bg-purple-600 hover:bg-purple-700 text-white"
                            : "border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600"
                        } ${!isEditing ? "opacity-60 pointer-events-none" : "cursor-pointer"}`}
                        onClick={isEditing ? () => toggleGenre(genre) : undefined}
                      >
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Camera Gear */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-purple-400">
                    <Camera className="h-5 w-5" />
                    Camera Gear
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`border-gray-600 text-gray-300 bg-transparent transition-colors ${!isEditing ? 'opacity-60 pointer-events-none' : 'hover:bg-gray-700 hover:text-white'}`}
                    onClick={isEditing ? openAddGear : undefined}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Gear
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {cameraGear.map((gear, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border border-gray-700 rounded-lg bg-gray-800/50"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-white">{gear.name}</div>
                        <div className="text-sm text-gray-400">{gear.model}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-gray-600 text-gray-300">
                          Qty: {gear.quantity}
                        </Badge>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-400" onClick={() => openEditGear(gear, index)}>
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400" onClick={() => handleDeleteGear(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* Gear Modal */}
            <Modal open={gearModalOpen} onClose={() => setGearModalOpen(false)}>
              <h2 className="text-lg font-bold text-purple-400 mb-2">{gearEditIndex !== null ? 'Edit Gear' : 'Add Gear'}</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-1">Name</label>
                  <input type="text" className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white" value={gearForm.name} onChange={e => handleGearFormChange('name', e.target.value)} />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">Type/Model</label>
                  <input type="text" className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white" value={gearForm.model} onChange={e => handleGearFormChange('model', e.target.value)} />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">Quantity</label>
                  <input type="number" min="1" className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white" value={gearForm.quantity} onChange={e => handleGearFormChange('quantity', e.target.value)} />
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded" onClick={handleSaveGear}>Save</button>
                  <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded" onClick={() => setGearModalOpen(false)}>Cancel</button>
                </div>
              </div>
            </Modal>

            {/* Expertise Tags */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <BadgeIcon className="h-5 w-5" />
                  Expertise Tags
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Select your photography skills and specialties
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillTags.map((skill) => (
                    <Badge
                      key={skill}
                      variant={selectedSkills.includes(skill) ? "default" : "outline"}
                      className={`transition-colors ${
                        selectedSkills.includes(skill)
                          ? "bg-purple-600 hover:bg-purple-700 text-white"
                          : "border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600"
                      } ${!isEditing ? "opacity-60 pointer-events-none" : "cursor-pointer"}`}
                      onClick={isEditing ? () => toggleSkill(skill) : undefined}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Portfolio */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-purple-400">Portfolio</CardTitle>
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
                <CardDescription className="text-gray-400">Showcase your best work</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {portfolioImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Portfolio ${index + 1}`}
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
                <CardDescription className="text-gray-400">Upload your professional documents</CardDescription>
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
            {/* Profile Picture */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-purple-400">Profile Picture</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <Avatar className="h-32 w-32 mx-auto">
                  <AvatarImage src="/placeholder.svg?height=128&width=128" />
                  <AvatarFallback className="text-2xl bg-purple-600 text-white">AR</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Change Photo
                  </Button>
                  <Button variant="ghost" className="w-full text-red-400 hover:text-red-300 hover:bg-gray-800">
                    Remove Photo
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Availability Status */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-purple-400">Availability Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium text-white">Currently Available</div>
                    <div className="text-sm text-gray-400">
                      {isAvailable ? "Ready for new bookings" : "Not accepting bookings"}
                    </div>
                  </div>
                  <Switch checked={isAvailable} onCheckedChange={setIsEditing ? setIsAvailable : undefined} disabled={!isEditing} className={!isEditing ? "opacity-60 pointer-events-none" : ""} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status" className="text-gray-300">
                    Status Message
                  </Label>
                  <Textarea
                    id="status"
                    placeholder="Add a custom status message..."
                    value={formData.statusMessage}
                    onChange={(e) => handleInputChange("statusMessage", e.target.value)}
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
  )
}
