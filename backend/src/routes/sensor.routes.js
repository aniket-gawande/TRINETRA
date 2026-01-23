import express from "express";
const router = express.Router();

// 🟢 Initialize with default data so Dashboard doesn't get stuck loading
let latestSensorData = {
  aqi: 0,
  temperature: 0,
  humidity: 0,
  waterLevel: 0,
  fire: false
};

// ESP → Backend (Hardware updates this)
router.post("/", (req, res) => {
  latestSensorData = req.body;
  console.log("📡 Sensor Update:", latestSensorData);
  res.json({ success: true });
});

// Website → Backend (Dashboard reads this)
router.get("/latest", (req, res) => {
  res.json(latestSensorData);
});

export default router;