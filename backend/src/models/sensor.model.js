import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema({
  // Environmental Data
  timestamp: { type: Date, default: Date.now, index: true },
  temperature: { type: Number, default: 0 },
  pressure: { type: Number, default: 0 }, // hPa
  altitude: { type: Number, default: 0 }, // meters
  
  // Air Quality
  aqi: { type: Number, default: 0 }, // PM2.5
  pm1: { type: Number, default: -1 }, // PM1.0
  pm25: { type: Number, default: -1 }, // PM2.5
  pm10: { type: Number, default: -1 }, // PM10
  
  // Gas Sensor
  gasRaw: { type: Number, default: 0 },
  
  // Soil Sensors
  soilRaw: { type: Number, default: 0 },
  waterRaw: { type: Number, default: 0 },
  humidity: { type: Number, default: 0 }, // Derived from water/soil
  waterLevel: { type: Number, default: 0 }, // cm equivalent
  
  // GPS Data
  latitude: { type: Number, default: null },
  longitude: { type: Number, default: null },
  satellites: { type: Number, default: 0 },
  
  // Fire Detection
  fire: { type: Boolean, default: false },
  
  // Source tracking
  source: { type: String, enum: ['esp32', 'csv_import', 'manual'], default: 'esp32' },
  recordId: { type: String } // For tracking imported records
});

// Create index for efficient queries
sensorSchema.index({ timestamp: -1 });
sensorSchema.index({ source: 1 });

export default mongoose.model("SensorData", sensorSchema);