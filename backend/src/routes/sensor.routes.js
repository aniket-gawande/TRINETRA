import express from "express";
import SensorData from "../models/sensor.model.js";

const router = express.Router();

// 📥 ESP32 SENDS DATA (Saves to MongoDB)
router.post("/", async (req, res) => {
  try {
    const { aqi, temperature, humidity, waterLevel, fire } = req.body;

    // Create and Save to MongoDB
    const newData = new SensorData({ aqi, temperature, humidity, waterLevel, fire });
    await newData.save();

    console.log("💾 Sensor Data Saved:", req.body);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Save Failed:", err);
    res.status(500).json({ error: "DB Error" });
  }
});

// 📤 DASHBOARD FETCHES DATA (Gets Latest from MongoDB)
router.get("/latest", async (req, res) => {
  try {
    // Find the newest entry (sort by timestamp descending)
    const latest = await SensorData.findOne().sort({ timestamp: -1 });
    
    // Return default 0s if DB is empty
    res.json(latest || { aqi: 0, temperature: 0, humidity: 0, waterLevel: 0, fire: false });
  } catch (err) {
    res.status(500).json({ error: "Fetch Failed" });
  }
});

export default router;