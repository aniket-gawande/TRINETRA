import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";

let latestGPS = { lat: 0, lng: 0 }; // Initialize with default to prevent null errors

const router = express.Router();

// 📡 ESP32/Rover sends GPS (Public endpoint for hardware)
router.post("/gps", (req, res) => {
  latestGPS = req.body;
  console.log("📍 GPS Update:", latestGPS);
  res.json({ status: "ok" });
});

// 💻 Frontend fetches GPS (Protected - only users can see location)
router.get("/gps", authMiddleware, (req, res) => {
  res.json(latestGPS);
});

export default router;