import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  eventTitle: {
    type: String,
    required: true,
  },
  client: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Planned', 'Ongoing', 'Completed'],
    default: 'Planned',
  },
  date: {
    type: Date, 
  },
  dateRange: {
    start: Date,
    end: Date,
  },
  coordinator: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudioOwner',
    required: true,
  }
}, {
  timestamps: true,
});

const Event = mongoose.model('Event', EventSchema);

export default Event;
