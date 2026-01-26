import Waypoint from "../models/waypoint.model.js";

// ➕ USER ADDS WAYPOINT
export async function addWaypoint(req, res) {
  try {
    const { lat, lng, order } = req.body;
    const userId = req.user?.uid || "anonymous";

    console.log("📥 New Waypoint Received:", { lat, lng, order, userId });

    // Validate coordinates
    if (lat === undefined || lng === undefined) {
      console.error("❌ Missing coordinates in request:", req.body);
      return res.status(400).json({ error: "lat and lng are required" });
    }

    // Validate coordinate types
    if (typeof lat !== 'number' || typeof lng !== 'number') {
      console.error("❌ Invalid coordinate types:", { lat: typeof lat, lng: typeof lng });
      return res.status(400).json({ error: "lat and lng must be numbers" });
    }

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      console.error("❌ Coordinates out of range:", { lat, lng });
      return res.status(400).json({ error: "Invalid latitude or longitude range" });
    }

    const waypoint = new Waypoint({
      lat: Number(lat),
      lng: Number(lng),
      order: order || 1,
    });

    const savedWaypoint = await waypoint.save();
    
    console.log("✅ Waypoint saved successfully:", {
      id: savedWaypoint._id,
      lat: savedWaypoint.lat,
      lng: savedWaypoint.lng,
      order: savedWaypoint.order,
    });

    res.status(201).json(savedWaypoint);
  } catch (err) {
    console.error("❌ Save failed:", err.message);
    res.status(500).json({ 
      error: "Failed to create waypoint",
      details: err.message 
    });
  }
}

// 📤 ROVER GETS WAYPOINTS
export async function getWaypoints(req, res) {
  try {
    const waypoints = await Waypoint.find().sort({ order: 1 });
    console.log(`📤 Retrieving ${waypoints.length} waypoints from database`);
    
    if (waypoints.length > 0) {
      console.log("✅ Waypoints found:", waypoints.map(wp => ({ 
        id: wp._id, 
        lat: wp.lat, 
        lng: wp.lng, 
        order: wp.order 
      })));
    } else {
      console.log("⚠️  No waypoints in database");
    }
    
    res.json(waypoints);
  } catch (err) {
    console.error("❌ Failed to fetch waypoints:", err.message);
    res.status(500).json({ 
      error: "Failed to fetch waypoints",
      details: err.message 
    });
  }
}

// ❌ USER CLEARS WAYPOINTS
export async function clearWaypoints(req, res) {
  try {
    const result = await Waypoint.deleteMany({});
    console.log(`🗑️ Route Cleared - Deleted ${result.deletedCount} waypoints`);
    res.json({ 
      message: "Route cleared",
      deletedCount: result.deletedCount
    });
  } catch (err) {
    console.error("❌ Failed to clear waypoints:", err.message);
    res.status(500).json({ 
      error: "Failed to clear waypoints",
      details: err.message 
    });
  }
}

// 🔍 DEBUG: Count waypoints in database
export async function countWaypoints(req, res) {
  try {
    const count = await Waypoint.countDocuments();
    const waypoints = await Waypoint.find().sort({ order: 1 });
    
    console.log(`🔍 Database Debug - Total waypoints: ${count}`);
    
    res.json({
      totalCount: count,
      waypoints: waypoints,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error("❌ Debug query failed:", err.message);
    res.status(500).json({ error: "Failed to query database" });
  }
}