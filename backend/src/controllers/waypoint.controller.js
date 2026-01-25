import Waypoint from "../models/waypoint.model.js";

// ➕ USER ADDS WAYPOINT
export async function addWaypoint(req, res) {
  try {
    const { lat, lng, order } = req.body;

    console.log("📥 New Waypoint Received:", { lat, lng, order });

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
    console.error("❌ Save failed:", err);
    res.status(500).json({ error: "Failed to create waypoint" });
  }
}

// 📤 ROVER GETS WAYPOINTS
export async function getWaypoints(req, res) {
  try {
    const waypoints = await Waypoint.find().sort({ order: 1 });
    res.json(waypoints);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch waypoints" });
  }
}

// ❌ USER CLEARS WAYPOINTS
export async function clearWaypoints(req, res) {
  try {
    await Waypoint.deleteMany({});
    console.log("🗑️ Route Cleared");
    res.json({ message: "Route cleared" });
  } catch (err) {
    res.status(500).json({ error: "Failed to clear waypoints" });
  }
}