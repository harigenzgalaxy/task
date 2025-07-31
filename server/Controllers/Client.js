import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    trim: true,
  },
  eventName: {
    type: String,
    trim: true,
  },
  eventDate: {
    type: Date, 
  },
  eventType: {
    type: String,
    enum: ['Wedding', 'Birthday', 'Corporate', 'Other'], // Update with your types
  },
  numberOfPhotographers: {
    type: Number,
    default: 1,
    min: 1,
  },
  budget: {
    type: Number,
    default: 0,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudioOwner',
    required: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt
});

export default mongoose.model('Client', clientSchema);
