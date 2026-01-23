import express from "express";
let latestGPS = null;

const router = express.Router();

// ESP sends GPS
router.post("/gps", (req, res) => {
  latestGPS = req.body;
  res.json({ status: "ok" });
});

// Website fetches GPS
router.get("/gps", (req, res) => {
  res.json(latestGPS);
});

export default router;
