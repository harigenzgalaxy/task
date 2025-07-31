import { StudioOwner } from '../Models/StudioOwner.js';
import Event from '../Models/Event.js';
import mongoose from 'mongoose';



// export const createStudioOwner = async (req, res) => {
//     try {

//       const {
//         name,
//         role,
//         studioName,
//         studioAddress,
//         studioContactNumber,
//         studioOperatingHours,
//         studioEmail,
//         alternateEmail,
//         profileViews,
//         earnings,
//         ongoingEvents,
//         eventsData,
//         calendarEvents,
//       } = req.body;
//       const newOwner = new StudioOwner({
//         name,
//         role,
//         studioName,
//         studioAddress,
//         studioContactNumber,
//         studioOperatingHours,
//         studioEmail,
//         alternateEmail,
//         profileViews,
//         earnings,
//         ongoingEvents,
//         eventsData,
//         calendarEvents,
//       });
  
//       const savedOwner = await newOwner.save();
//       res.status(201).json(savedOwner);
//     } catch (error) {
//       console.error('Error creating studio owner:', error);
//       res.status(500).json({ message: 'Server error while creating studio owner' });
//     }
//   };



// Controllers/StudioController.js



export const createStudioOwner = async (req, res) => {
  try {
    const staticData = {
      id: 2,
      name: "Alex Morgan",
      role: "Studio",
      studioName: "LensCraft Studios",
      studioAddress: "Jubilee Hills, Hyderabad",
      studioContactNumber: "9123456780",
      studioOperatingHours: "10AM - 8PM",
      studioEmail: "info@lenscraft.com",
      alternateEmail: "support@lenscraft.com",
      profileViews: {
        count: 28420,
        monthlyData: [
          { month: "Jan", count: 3000 },
          { month: "Feb", count: 3700 },
          { month: "Mar", count: 4400 },
          { month: "Apr", count: 4600 },
          { month: "May", count: 5000 },
          { month: "Jun", count: 5400 },
          { month: "Jul", count: 5320 }
        ]
      },
      earnings: {
        total: 29500,
        monthlyData: [
          { month: "Jan", amount: 4000 },
          { month: "Feb", amount: 4700 },
          { month: "Mar", amount: 5200 },
          { month: "Apr", amount: 5100 },
          { month: "May", amount: 5600 },
          { month: "Jun", amount: 6200 },
          { month: "Jul", amount: 5700 }
        ]
      },
      ongoingEvents: {
        count: 9,
        thisWeek: 2,
        completionRate: 72
      },
      eventsData: [
        { name: "Week 1", events: 3 },
        { name: "Week 2", events: 5 },
        { name: "Week 3", events: 4 },
        { name: "Week 4", events: 6 },
        { name: "Week 5", events: 2 }
      ],
    };
    

    const newStudio = new StudioOwner(staticData);
    const savedStudio = await newStudio.save();

    res.status(201).json(savedStudio);
  } catch (error) {
    console.error("Error creating studio owner:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllStudioOwners = async (req, res) => {
  try {
    const owners = await StudioOwner.find();
    res.status(200).json(owners);
  } catch (error) {
    console.error('Error fetching studio owners:', error);
    res.status(500).json({ message: 'Server error while fetching studio owners' });
  }
};




export const getStudioOwnerById = async (req, res) => {
  try {
    const { id } = req.params;

    const owner = await StudioOwner.findOne({ id :id }).lean(); // `lean()` gives plain JS object

    if (!owner) {
      return res.status(404).json({ message: 'Studio owner not found' });
    }

    // ✅ Fetch events organized by this studio owner
    const events = await Event.find({ author: owner._id }).lean();

    // ✅ Clean up any nested _id fields (if any slipped in)
    const cleanNestedIds = (obj) => {
      if (Array.isArray(obj)) {
        return obj.map(cleanNestedIds);
      } else if (typeof obj === 'object' && obj !== null) {
        const cleaned = {};
        for (let key in obj) {
          if (key !== '_id') {
            cleaned[key] = cleanNestedIds(obj[key]);
          }
        }
        return cleaned;
      }
      return obj;
    };

    const cleanedOwner = cleanNestedIds(owner);

    // ✅ Add organizingEvents field to the response
    cleanedOwner.organizingEvents = cleanNestedIds(events);

    res.status(200).json(cleanedOwner);
  } catch (error) {
    console.error('Error fetching studio owner:', error);
    res.status(500).json({ message: 'Server error while fetching studio owner' });
  }
};



export const updateStudioOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const updatedOwner = await StudioOwner.findOneAndUpdate(
      { id: String(id) },  // Match using your custom id field
      updates,
      {
        new: true,
        runValidators: true,
      }
    );
    
    if (!updatedOwner) {
      return res.status(404).json({ message: 'Studio owner not found' });
    }

    res.status(200).json(updatedOwner);
  } catch (error) {
    console.error('Error updating studio owner:', error);
    res.status(500).json({ message: 'Server error while updating studio owner' });
  }
};

// Delete studio owner
export const deleteStudioOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await StudioOwner.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Studio owner not found' });
    }
    res.status(200).json({ message: 'Studio owner deleted successfully' });
  } catch (error) {
    console.error('Error deleting studio owner:', error);
    res.status(500).json({ message: 'Server error while deleting studio owner' });
  }
};






export const createEvents = async (req, res) => {
  try {
    const authorId = new mongoose.Types.ObjectId("6888e677da2e33f4aa61a557");

    const events = [
      {
        eventTitle: "Wedding Photography",
        client: "Sarah & Michael",
        status: "Planned",
        date: new Date("2024-02-15"),
        coordinator: "John Smith",
        author: authorId,
      },
      {
        eventTitle: "Corporate Headshots",
        client: "Tech Solutions Inc",
        status: "Ongoing",
        dateRange: {
          start: new Date("2024-02-10"),
          end: new Date("2024-02-12"),
        },
        coordinator: "Emma Davis",
        author: authorId,
      },
      {
        eventTitle: "Birthday Party",
        client: "Johnson Family",
        status: "Completed",
        date: new Date("2024-01-28"),
        coordinator: "Mike Wilson",
        author: authorId,
      },
      {
        eventTitle: "Product Photography",
        client: "Fashion Brand Co",
        status: "Planned",
        dateRange: {
          start: new Date("2024-02-20"),
          end: new Date("2024-02-22"),
        },
        coordinator: "Lisa Chen",
        author: authorId,
      },
      {
        eventTitle: "Engagement Session",
        client: "Alex & Jamie",
        status: "Ongoing",
        date: new Date("2024-02-08"),
        coordinator: "John Smith",
        author: authorId,
      },
      {
        eventTitle: "Real Estate Photos",
        client: "Prime Properties",
        status: "Completed",
        dateRange: {
          start: new Date("2024-01-25"),
          end: new Date("2024-01-26"),
        },
        coordinator: "Emma Davis",
        author: authorId,
      },
    ];

    await Event.insertMany(events);

    res.status(201).json({ message: 'Events inserted successfully' });
  } catch (error) {
    console.error('Error creating events:', error);
    res.status(500).json({ message: 'Server error while creating events' });
  }
};



export const test=async(req,res)=>{
  res.send("Hello World")
};
