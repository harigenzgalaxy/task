import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
    name: String,
    role: String,
    studioName: String,
    studioAddress: String,
    studioContactNumber: String,
    studioOperatingHours: String,
    studioEmail: String,
    alternateEmail: String,
    socialLinks: {
      webinar: [String],
    
    },
    profileViews: {
      count: Number,
      monthlyData: [
        {
          month: String,
          count: Number,
          _id: false 
        }
      ]
    },
    earnings: {
      total: Number,
      monthlyData: [
        {
          month: String,
          amount: Number,
          _id: false // 👈 Prevent _id in earnings
        }
      ]
    },
    ongoingEvents: {
      count: Number,
      thisWeek: Number,
      completionRate: Number,
    },
    eventsData: [
      {
        name: String,
        events: Number,
        _id: false 
      }
    ],
    studioTeam: [Object],
    id: String,
  }, { timestamps: true });
  

export const StudioOwner = mongoose.models.StudioOwner || mongoose.model('StudioOwner', UserSchema);

