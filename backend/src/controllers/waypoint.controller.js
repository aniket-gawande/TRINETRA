import Waypoint from "../models/waypoint.model.js";

// ➕ ADD WAYPOINT
export async function addWaypoint(req, res) {
  try {
    const { lat, lng, order } = req.body;

    console.log("📥 Incoming waypoint:", req.body);

    if (lat === undefined || lng === undefined) {
      return res.status(400).json({ error: "lat/lng missing" });
    }

    const waypoint = new Waypoint({
      lat,
      lng,
      order,
    });

    await waypoint.save();

    res.status(201).json(waypoint);
  } catch (err) {
    console.error("❌ Create failed:", err);
    res.status(500).json({ error: "Failed to create waypoint" });
  }
}

// 📤 GET ALL WAYPOINTS
export async function getWaypoints(req, res) {
  try {
    const waypoints = await Waypoint.find().sort({ order: 1 });
    res.json(waypoints);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch waypoints" });
  }
}

// ❌ CLEAR ALL WAYPOINTS
export async function clearWaypoints(req, res) {
  try {
    const result = await Waypoint.deleteMany({});
    res.json({ deleted: result.deletedCount });
  } catch (err) {
    res.status(500).json({ error: "Failed to clear waypoints" });
  }
}
