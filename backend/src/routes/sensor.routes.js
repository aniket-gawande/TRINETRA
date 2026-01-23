import express from "express";
const router = express.Router();

let latestSensorData = null;

// ESP → Backend
router.post("/", (req, res) => {
  latestSensorData = req.body;
  res.json({ success: true });
});

// Website → Backend
router.get("/latest", (req, res) => {
  res.json(latestSensorData);
});

export default router;
