import express from "express";
import mongoose from "mongoose";
import StudioRoute from "./Routes/StudioRoute.js";
import cors from "cors";


const DB_NAME = "GenzGalaxy"; 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(`mongodb+srv://haricharanbonam:hari%402006@cluster0.pqjid.mongodb.net/${DB_NAME}`);
    console.log(`✅ MongoDB connected successfully`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

// Start server
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(() => {
    console.log("❌ Initial MongoDB connection failed");
  });


app.use("/api",StudioRoute);
export default app;
