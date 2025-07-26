import { useState } from 'react';
import { Label } from '../../components/ui/Label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/badge';
import { Camera, Plus, X, Upload } from 'lucide-react';

export const ProfileSettings = () => {
  const [profileData, setProfileData] = useState({
    name: 'Rajesh Kumar',
    email: 'rajesh.photographer@gmail.com',
    phone: '+91 98765 43210',
    portfolioLink: 'https://rajeshphotography.com'
  });

  const [skills, setSkills] = useState([
    'Wedding Photography',
    'Portrait Photography',
    'Event Photography',
    'Commercial Photography',
    'Photo Editing'
  ]);

  const [newSkill, setNewSkill] = useState('');

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills(prev => [...prev, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(prev => prev.filter(skill => skill !== skillToRemove));
  };

  const handleSave = () => {
    console.log('Saving profile data:', { profileData, skills });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-primary text-3xl font-bold">
          Profile Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your profile information and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Profile Picture</CardTitle>
            <CardDescription>
              Upload a professional photo for your profile
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-32 h-32 bg-gradient-primary rounded-full flex items-center justify-center">
                <Camera className="w-12 h-12 text-primary-foreground" />
              </div>
              <button className="w-full inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground transition">
                <Upload className="w-4 h-4 mr-2 text-foreground" />
                Upload Photo
              </button>
              <p className="text-xs text-muted-foreground text-center">
                Recommended: 400x400px, max 2MB
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Personal Information</CardTitle>
            <CardDescription>
              Update your personal details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={profileData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  className="mt-1 w-full rounded-md border border-border bg-muted/20 px-3 py-2 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                  className="mt-1 w-full rounded-md border border-border bg-muted/20 px-3 py-2 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-foreground">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="text"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter your phone number"
                  className="mt-1 w-full rounded-md border border-border bg-muted/20 px-3 py-2 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="portfolio" className="text-sm font-medium text-foreground">
                  Portfolio Link
                </label>
                <input
                  id="portfolio"
                  type="text"
                  value={profileData.portfolioLink}
                  onChange={(e) => handleInputChange('portfolioLink', e.target.value)}
                  placeholder="Enter your portfolio URL"
                  className="mt-1 w-full rounded-md border border-border bg-muted/20 px-3 py-2 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg">Skills & Expertise</CardTitle>
            <CardDescription>
              Add your photography skills and areas of expertise
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-sm py-2 px-3 bg-gradient-primary text-primary-foreground hover:opacity-80 transition-opacity"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-2 hover:text-destructive transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a new skill..."
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                className="flex-1 rounded-md border border-border bg-muted/20 px-3 py-2 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                onClick={addSkill}
                className="inline-flex items-center justify-center rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardContent className="pt-6">
            <div className="flex justify-end space-x-4">
              <button
                className="inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground transition"
              >
                Reset Changes
              </button>
              <button
                onClick={handleSave}
                className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-sm hover:opacity-90 transition"
              >
                Save Changes
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
