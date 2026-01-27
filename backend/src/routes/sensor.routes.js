import express from "express";
import SensorData from "../models/sensor.model.js";

const router = express.Router();

// 📥 ESP32 SENDS DATA (Saves to MongoDB)
router.post("/", async (req, res) => {
  try {
    const { aqi, temperature, humidity, waterLevel, fire, pm1, pm25, pm10, pressure, altitude, gasRaw, soilRaw, waterRaw } = req.body;

    // Create and Save to MongoDB
    const newData = new SensorData({ 
      aqi: aqi || pm25, // Use PM2.5 as AQI if not provided
      temperature, 
      humidity, 
      waterLevel,
      pm1,
      pm25,
      pm10,
      pressure,
      altitude,
      gasRaw,
      soilRaw,
      waterRaw,
      fire,
      source: 'esp32'
    });
    await newData.save();

    console.log("💾 Sensor Data Saved:", req.body);
    res.json({ success: true, id: newData._id });
  } catch (err) {
    console.error("❌ Save Failed:", err);
    res.status(500).json({ error: "DB Error", details: err.message });
  }
});

// 📤 DASHBOARD FETCHES DATA (Gets Latest from MongoDB)
router.get("/latest", async (req, res) => {
  try {
    // Find the newest entry (sort by timestamp descending)
    const latest = await SensorData.findOne().sort({ timestamp: -1 });
    
    // Return default 0s if DB is empty
    res.json(latest || { 
      aqi: 0, temperature: 0, humidity: 0, waterLevel: 0, fire: false,
      pm1: -1, pm25: -1, pm10: -1, pressure: 0, altitude: 0
    });
  } catch (err) {
    res.status(500).json({ error: "Fetch Failed", details: err.message });
  }
});

// 📊 GET HISTORICAL DATA (For Charts - Last 7 days)
router.get("/history", async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const data = await SensorData.find({ timestamp: { $gte: startDate } })
      .sort({ timestamp: 1 })
      .limit(1000);

    res.json({
      success: true,
      data: data.map(d => ({
        timestamp: d.timestamp,
        temperature: d.temperature,
        pressure: d.pressure,
        altitude: d.altitude,
        aqi: d.aqi,
        pm1: d.pm1,
        pm25: d.pm25,
        pm10: d.pm10,
        humidity: d.humidity,
        waterLevel: d.waterLevel,
        gasRaw: d.gasRaw,
        soilRaw: d.soilRaw,
        waterRaw: d.waterRaw,
        fire: d.fire
      })),
      count: data.length
    });
  } catch (err) {
    console.error("❌ History fetch failed:", err);
    res.status(500).json({ error: "Failed to fetch historical data", details: err.message });
  }
});

// 📈 GET DAILY STATISTICS (Average values per day)
router.get("/daily-stats", async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const stats = await SensorData.aggregate([
      {
        $match: { timestamp: { $gte: startDate } }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$timestamp" }
          },
          avgTemp: { $avg: "$temperature" },
          avgPressure: { $avg: "$pressure" },
          avgAltitude: { $avg: "$altitude" },
          avgAqi: { $avg: "$aqi" },
          avgPM1: { $avg: "$pm1" },
          avgPM25: { $avg: "$pm25" },
          avgPM10: { $avg: "$pm10" },
          avgHumidity: { $avg: "$humidity" },
          avgWaterLevel: { $avg: "$waterLevel" },
          maxTemp: { $max: "$temperature" },
          minTemp: { $min: "$temperature" },
          maxAqi: { $max: "$aqi" },
          fireCount: {
            $sum: { $cond: ["$fire", 1, 0] }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      success: true,
      stats: stats,
      count: stats.length
    });
  } catch (err) {
    console.error("❌ Daily stats failed:", err);
    res.status(500).json({ error: "Failed to fetch daily statistics" });
  }
});

// 📋 IMPORT CSV DATA
router.post("/import-csv", async (req, res) => {
  try {
    const { data } = req.body; // Expecting array of parsed CSV rows

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ error: "No valid data provided" });
    }

    const records = [];
    let successCount = 0;
    let errorCount = 0;
    const errors = [];

    // Helper function to find column value by multiple possible names
    const getColumnValue = (row, ...possibleNames) => {
      for (const name of possibleNames) {
        if (row[name] !== undefined && row[name] !== null && row[name] !== "") {
          return row[name];
        }
      }
      return null;
    };

    for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
      try {
        const row = data[rowIndex];
        
        // Parse CSV row to sensor data - handle multiple possible column name formats
        const dateTimeStr = getColumnValue(row, "Date & Time", "DateTime", "Timestamp", "Time");
        const timestamp = parseDateTime(dateTimeStr);
        
        // Get temperature (multiple formats supported)
        const tempStr = getColumnValue(row, "Temp", "Temp (°C)", "Temperature", "Temp°C", "Temperature°C");
        const tempValue = parseFloat(tempStr);
        
        // Get pressure
        const pressureStr = getColumnValue(row, "Pressure", "Pressure (hPa)", "Press");
        const pressureValue = parseFloat(pressureStr);
        
        // Get altitude
        const altitudeStr = getColumnValue(row, "Altitude", "Altitude (m)", "Alt");
        const altitudeValue = parseFloat(altitudeStr);
        
        // Get PM values
        const pm1Str = getColumnValue(row, "PM1");
        const pm25Str = getColumnValue(row, "PM 2.5", "PM2.5", "PM25");
        const pm10Str = getColumnValue(row, "PM10", "PM 10");
        
        const pm1Value = parseFloat(pm1Str);
        const pm25Value = parseFloat(pm25Str);
        const pm10Value = parseFloat(pm10Str);
        
        // Get raw sensor values
        const gasRawStr = getColumnValue(row, "GasRaw", "Gas");
        const soilRawStr = getColumnValue(row, "SoilRaw", "Soil");
        const waterRawStr = getColumnValue(row, "WaterRaw", "Water");
        
        // Get coordinates
        const latStr = getColumnValue(row, "Lat", "Latitude", "Lat°");
        const lngStr = getColumnValue(row, "Lng", "Longitude", "Lon");
        const satsStr = getColumnValue(row, "Sats", "Satellites");

        const sensorRecord = new SensorData({
          timestamp: timestamp || new Date(),
          temperature: isNaN(tempValue) ? 0 : tempValue,
          pressure: isNaN(pressureValue) ? 0 : pressureValue,
          altitude: isNaN(altitudeValue) ? 0 : altitudeValue,
          gasRaw: isNaN(parseFloat(gasRawStr)) ? 0 : parseFloat(gasRawStr),
          soilRaw: isNaN(parseFloat(soilRawStr)) ? 0 : parseFloat(soilRawStr),
          waterRaw: isNaN(parseFloat(waterRawStr)) ? 0 : parseFloat(waterRawStr),
          pm1: isNaN(pm1Value) || pm1Value < 0 ? -1 : pm1Value,
          pm25: isNaN(pm25Value) || pm25Value < 0 ? -1 : pm25Value,
          pm10: isNaN(pm10Value) || pm10Value < 0 ? -1 : pm10Value,
          aqi: (isNaN(pm25Value) || pm25Value < 0) ? 0 : pm25Value, // Use PM2.5 as AQI
          latitude: latStr && latStr !== "NA" && !isNaN(parseFloat(latStr)) ? parseFloat(latStr) : null,
          longitude: lngStr && lngStr !== "NA" && !isNaN(parseFloat(lngStr)) ? parseFloat(lngStr) : null,
          satellites: isNaN(parseInt(satsStr)) ? 0 : parseInt(satsStr),
          humidity: 0, // Can be calculated from waterRaw if needed
          waterLevel: isNaN(parseFloat(waterRawStr)) ? 0 : parseFloat(waterRawStr),
          fire: false,
          source: 'csv_import',
          recordId: `csv_${timestamp?.getTime()}_${Math.random().toString(36).substr(2, 9)}`
        });

        records.push(sensorRecord);
        successCount++;
      } catch (rowErr) {
        console.warn(`⚠️ Error parsing row ${rowIndex + 1}:`, rowErr.message);
        errors.push(`Row ${rowIndex + 1}: ${rowErr.message}`);
        errorCount++;
      }
    }

    // Bulk insert
    if (records.length > 0) {
      await SensorData.insertMany(records);
      console.log(`✅ Imported ${successCount} records, ${errorCount} errors`);
    }

    res.json({
      success: records.length > 0,
      message: `Imported ${successCount} records${errorCount > 0 ? ` (${errorCount} errors)` : ''}`,
      imported: successCount,
      errors: errorCount,
      errorDetails: errorCount > 0 ? errors.slice(0, 5) : [] // Return first 5 errors
    });

  } catch (err) {
    console.error("❌ CSV import failed:", err);
    res.status(500).json({ error: "Failed to import CSV data", details: err.message });
  }
});

// Helper function to parse date/time
function parseDateTime(dateStr) {
  if (!dateStr) return null;
  try {
    // Format: "9/25/2025 23:29:01"
    return new Date(dateStr);
  } catch (e) {
    console.warn("⚠️ Failed to parse date:", dateStr);
    return null;
  }
}

// 🗑️ CLEAR ALL DATA (For testing)
router.delete("/clear-all", async (req, res) => {
  try {
    const result = await SensorData.deleteMany({});
    res.json({
      success: true,
      message: `Cleared ${result.deletedCount} records`
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to clear data" });
  }
});

export default router;