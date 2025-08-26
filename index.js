// index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import School from "./models/School.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "school_management", // database name inside cluster
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("🎉 School Management API is running!");
});

// Add School
app.post("/addSchool", async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || latitude == null || longitude == null) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const school = new School({ name, address, latitude, longitude });
    await school.save();

    res.status(201).json({ message: "School added successfully", school });
  } catch (error) {
    console.error("Error adding school:", error);
    res.status(500).json({ error: "Server error, please try again later" });
  }
});

// List Schools sorted by distance
app.get("/listSchools", async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({ error: "Latitude and Longitude are required" });
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    const schools = await School.find();

    if (schools.length === 0) {
      return res.json({ message: "No schools found in the database" });
    }

    // Calculate distance (simple Euclidean for demo)
    const schoolsWithDistance = schools.map((school) => {
      const distance = Math.sqrt(
        Math.pow(lat - school.latitude, 2) +
        Math.pow(lng - school.longitude, 2)
      );
      return { ...school.toObject(), distance };
    });

    // Sort by distance
    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.json(schoolsWithDistance);
  } catch (error) {
    console.error("Error fetching schools:", error);
    res.status(500).json({ error: "Server error, please try again later" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
