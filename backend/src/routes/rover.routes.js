import express from "express";
import Rover from "../models/rover.model.js";
import RoverImage from "../models/roverImage.model.js";
import OfflineData from "../models/offlineData.model.js";
import bluetoothHandler from "../services/bluetoothHandler.js";

const router = express.Router();

// ============================================
// ROVER MANAGEMENT ENDPOINTS
// ============================================

/**
 * GET /api/rovers
 * Get all rovers for current user
 */
router.get("/", async (req, res) => {
  try {
    const rovers = await Rover.find({ userId: req.user?.id })
      .select("-path") // Exclude large path array
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      rovers,
      count: rovers.length
    });
  } catch (error) {
    console.error("❌ Failed to fetch rovers:", error);
    res.status(500).json({ error: "Failed to fetch rovers" });
  }
});

/**
 * GET /api/rovers/:roverId
 * Get specific rover details
 */
router.get("/:roverId", async (req, res) => {
  try {
    const rover = await Rover.findOne({ roverId: req.params.roverId });

    if (!rover) {
      return res.status(404).json({ error: "Rover not found" });
    }

    res.json({
      success: true,
      rover
    });
  } catch (error) {
    console.error("❌ Failed to fetch rover:", error);
    res.status(500).json({ error: "Failed to fetch rover" });
  }
});

/**
 * GET /api/rovers/:roverId/live
 * Get live rover data (real-time)
 */
router.get("/:roverId/live", async (req, res) => {
  try {
    const rover = await Rover.findOne({ roverId: req.params.roverId });

    if (!rover) {
      return res.status(404).json({ error: "Rover not found" });
    }

    // Return minimal live data
    res.json({
      success: true,
      data: {
        roverId: rover.roverId,
        connectionStatus: rover.connectionStatus,
        latitude: rover.latitude,
        longitude: rover.longitude,
        altitude: rover.altitude,
        temperature: rover.temperature,
        humidity: rover.humidity,
        batteryLevel: rover.batteryLevel,
        tripStatus: rover.tripStatus,
        lastSeen: rover.lastSeen,
        signalStrength: rover.signalStrength
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch live data" });
  }
});

/**
 * GET /api/rovers/:roverId/path
 * Get rover's complete path/route
 */
router.get("/:roverId/path", async (req, res) => {
  try {
    const rover = await Rover.findOne({ roverId: req.params.roverId });

    if (!rover) {
      return res.status(404).json({ error: "Rover not found" });
    }

    res.json({
      success: true,
      path: rover.path,
      distance: rover.tripDistance || 0,
      startTime: rover.tripStartTime,
      endTime: rover.tripEndTime
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch path" });
  }
});

/**
 * POST /api/rovers/trips/start
 * Start a new trip
 */
router.post("/trips/start", async (req, res) => {
  try {
    const { roverId, tripName } = req.body;

    const trip = await Rover.findOneAndUpdate(
      { roverId },
      {
        tripStatus: "active",
        tripStartTime: new Date(),
        tripName,
        path: []
      },
      { new: true }
    );

    // Send command to rover
    bluetoothHandler.startTrip(trip._id);

    res.json({
      success: true,
      message: "Trip started",
      trip
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to start trip" });
  }
});

/**
 * POST /api/rovers/trips/stop
 * Stop current trip
 */
router.post("/trips/stop", async (req, res) => {
  try {
    const { roverId } = req.body;

    const rover = await Rover.findOneAndUpdate(
      { roverId },
      {
        tripStatus: "completed",
        tripEndTime: new Date()
      },
      { new: true }
    );

    // Send command to rover
    bluetoothHandler.stopTrip();

    res.json({
      success: true,
      message: "Trip stopped",
      rover
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to stop trip" });
  }
});

// ============================================
// IMAGE/CAMERA ENDPOINTS
// ============================================

/**
 * GET /api/rovers/:roverId/images
 * Get all images from a rover
 */
router.get("/:roverId/images", async (req, res) => {
  try {
    const { limit = 50, skip = 0, syncStatus } = req.query;

    const query = { roverId: req.params.roverId };
    if (syncStatus) query.syncStatus = syncStatus;

    const images = await RoverImage.find(query)
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort({ captureTime: -1 });

    const total = await RoverImage.countDocuments(query);

    res.json({
      success: true,
      images,
      total,
      limit: parseInt(limit),
      skip: parseInt(skip)
    });
  } catch (error) {
    console.error("❌ Failed to fetch images:", error);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

/**
 * GET /api/rovers/:roverId/images/:imageId
 * Get specific image details
 */
router.get("/:roverId/images/:imageId", async (req, res) => {
  try {
    const image = await RoverImage.findOne({
      roverId: req.params.roverId,
      imageId: req.params.imageId
    });

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    res.json({
      success: true,
      image
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch image" });
  }
});

/**
 * GET /api/rovers/:roverId/images/:imageId/download
 * Download actual image file
 */
router.get("/:roverId/images/:imageId/download", async (req, res) => {
  try {
    const image = await RoverImage.findOne({
      roverId: req.params.roverId,
      imageId: req.params.imageId
    });

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    // In production, serve from cloud storage or CDN
    // For now, return image URL
    res.json({
      success: true,
      imageUrl: image.imageUrl,
      fileName: image.fileName
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to download image" });
  }
});

/**
 * POST /api/rovers/images/sync
 * Request image sync from rover's SD card
 */
router.post("/images/sync", async (req, res) => {
  try {
    const { roverId } = req.body;

    // Send sync request to rover
    bluetoothHandler.requestDataSync();

    res.json({
      success: true,
      message: "Sync request sent to rover"
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to request sync" });
  }
});

// ============================================
// OFFLINE DATA ENDPOINTS
// ============================================

/**
 * GET /api/rovers/:roverId/offline-data
 * Get all offline data from rover
 */
router.get("/:roverId/offline-data", async (req, res) => {
  try {
    const { syncStatus, limit = 100 } = req.query;

    const query = { roverId: req.params.roverId };
    if (syncStatus) query.syncStatus = syncStatus;

    const data = await OfflineData.find(query)
      .limit(parseInt(limit))
      .sort({ recordTime: -1 });

    res.json({
      success: true,
      data,
      count: data.length
    });
  } catch (error) {
    console.error("❌ Failed to fetch offline data:", error);
    res.status(500).json({ error: "Failed to fetch offline data" });
  }
});

/**
 * POST /api/rovers/:roverId/offline-data/sync
 * Trigger offline data sync from SD card
 */
router.post("/:roverId/offline-data/sync", async (req, res) => {
  try {
    const { roverId } = req.params;

    // Send sync request to rover
    bluetoothHandler.sendCommand("REQUEST_SYNC", { roverId });

    res.json({
      success: true,
      message: "Offline data sync initiated"
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to initiate sync" });
  }
});

/**
 * GET /api/rovers/:roverId/offline-data/stats
 * Get offline data statistics
 */
router.get("/:roverId/offline-data/stats", async (req, res) => {
  try {
    const stats = await OfflineData.aggregate([
      { $match: { roverId: req.params.roverId } },
      {
        $group: {
          _id: "$syncStatus",
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      stats: {
        pending: stats.find((s) => s._id === "pending")?.count || 0,
        synced: stats.find((s) => s._id === "synced")?.count || 0,
        failed: stats.find((s) => s._id === "failed")?.count || 0
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

// ============================================
// ROVER CONTROL ENDPOINTS
// ============================================

/**
 * POST /api/rovers/commands/start-recording
 * Start camera recording
 */
router.post("/commands/start-recording", async (req, res) => {
  try {
    const { roverId } = req.body;

    bluetoothHandler.sendCommand("START_RECORDING", { roverId });

    res.json({
      success: true,
      message: "Recording started"
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to start recording" });
  }
});

/**
 * POST /api/rovers/commands/stop-recording
 * Stop camera recording
 */
router.post("/commands/stop-recording", async (req, res) => {
  try {
    const { roverId } = req.body;

    bluetoothHandler.sendCommand("STOP_RECORDING", { roverId });

    res.json({
      success: true,
      message: "Recording stopped"
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to stop recording" });
  }
});

/**
 * POST /api/rovers/commands/configure
 * Configure rover settings
 */
router.post("/commands/configure", async (req, res) => {
  try {
    const { roverId, gpsInterval, sensorInterval, cameraInterval } = req.body;

    // Update rover configuration in DB
    await Rover.findOneAndUpdate(
      { roverId },
      {
        gpsUpdateInterval: gpsInterval,
        sensorUpdateInterval: sensorInterval,
        cameraInterval: cameraInterval
      }
    );

    // Send config to rover
    bluetoothHandler.sendCommand("CONFIG", {
      gpsInterval,
      sensorInterval,
      cameraInterval
    });

    res.json({
      success: true,
      message: "Configuration updated"
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to configure rover" });
  }
});

/**
 * GET /api/rover/latest-image
 * Get the latest rover image captured
 */
router.get("/latest-image", async (req, res) => {
  try {
    // Get the latest image from any rover
    const image = await RoverImage.findOne()
      .sort({ captureTime: -1 })
      .limit(1);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "No images found"
      });
    }

    res.json({
      success: true,
      image: {
        imageId: image.imageId,
        imageUrl: image.imageUrl,
        fileName: image.fileName,
        captureTime: image.captureTime,
        roverId: image.roverId,
        gpsCoordinates: image.gpsCoordinates
      }
    });
  } catch (error) {
    console.error("❌ Failed to fetch latest image:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to fetch latest image" 
    });
  }
});

/**
 * GET /api/rover/crop-analysis
 * Get AI-based crop analysis and recommendations
 */
router.get("/crop-analysis", async (req, res) => {
  try {
    // Fetch latest sensor data for crop analysis
    const Sensor = require("../models/sensor.model.js").default;
    const latestSensor = await Sensor.findOne().sort({ createdAt: -1 });

    // Generate AI-based analysis based on sensor data
    const analysis = {
      healthScore: calculateHealthScore(latestSensor),
      diseaseRisk: assessDiseaseRisk(latestSensor),
      waterNeed: assessWaterNeed(latestSensor),
      growthStage: estimateGrowthStage(latestSensor),
      soilMoisture: latestSensor?.humidity || 0,
      pm25: latestSensor?.aqi || 0,
      recommendations: generateRecommendations(latestSensor)
    };

    res.json({
      success: true,
      analysis
    });
  } catch (error) {
    console.error("❌ Failed to generate crop analysis:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to generate crop analysis" 
    });
  }
});

// Helper functions for crop analysis
function calculateHealthScore(sensorData) {
  if (!sensorData) return 75;
  
  let score = 100;
  
  // Temperature penalty (optimal: 20-30°C)
  if (sensorData.temperature < 15 || sensorData.temperature > 35) {
    score -= 15;
  }
  
  // Humidity penalty (optimal: 40-70%)
  if (sensorData.humidity < 30 || sensorData.humidity > 80) {
    score -= 10;
  }
  
  // AQI penalty (lower is better)
  if (sensorData.aqi > 100) {
    score -= 20;
  } else if (sensorData.aqi > 50) {
    score -= 10;
  }
  
  return Math.max(0, Math.min(100, score));
}

function assessDiseaseRisk(sensorData) {
  if (!sensorData) return "Moderate";
  
  // High humidity + warm temps = higher disease risk
  if (sensorData.humidity > 75 && sensorData.temperature > 25) {
    return "High";
  }
  if (sensorData.humidity > 65 && sensorData.temperature > 20) {
    return "Moderate";
  }
  return "Low";
}

function assessWaterNeed(sensorData) {
  if (!sensorData) return "Moderate";
  
  // Low humidity = high water need
  if (sensorData.humidity < 40) {
    return "High";
  }
  if (sensorData.humidity < 55) {
    return "Moderate";
  }
  return "Low";
}

function estimateGrowthStage(sensorData) {
  if (!sensorData) return "Vegetative";
  
  // Simple heuristic based on temperature and humidity
  if (sensorData.temperature > 28 && sensorData.humidity > 60) {
    return "Flowering";
  }
  if (sensorData.temperature > 25) {
    return "Vegetative";
  }
  return "Germination";
}

function generateRecommendations(sensorData) {
  const recommendations = [];
  
  if (!sensorData) {
    return ["Increase Irrigation", "Apply NPK Fertilizer", "Use Neem Spray"];
  }
  
  // Water management
  if (sensorData.humidity < 40) {
    recommendations.push("Increase Irrigation");
  }
  if (sensorData.humidity > 75) {
    recommendations.push("Improve Drainage");
  }
  
  // Disease management
  if (sensorData.humidity > 75 && sensorData.temperature > 25) {
    recommendations.push("Use Fungicide");
    recommendations.push("Improve Air Circulation");
  } else if (sensorData.humidity > 65) {
    recommendations.push("Use Neem Spray");
  }
  
  // Nutrient management
  if (sensorData.temperature > 28) {
    recommendations.push("Apply NPK Fertilizer");
  }
  
  // Air quality
  if (sensorData.aqi > 100) {
    recommendations.push("Monitor Air Quality");
  }
  
  // Default recommendations if list is empty
  if (recommendations.length === 0) {
    recommendations.push("Maintain Current Conditions");
    recommendations.push("Monitor Crop Growth");
  }
  
  return recommendations.slice(0, 4); // Return top 4 recommendations
}

/**
 * GET /api/rover/bluetooth/status
 */
router.get("/bluetooth/status", (req, res) => {
  const status = bluetoothHandler.getStatus();

  res.json({
    success: true,
    bluetoothStatus: status
  });
});

export default router;
