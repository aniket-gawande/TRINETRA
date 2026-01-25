import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema({
  aqi: { type: Number, default: 0 },
  temperature: { type: Number, default: 0 },
  humidity: { type: Number, default: 0 },
  waterLevel: { type: Number, default: 0 },
  fire: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now } // Auto-record time
});

export default mongoose.model("SensorData", sensorSchema);