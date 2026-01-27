import mongoose from "mongoose";

// Offline Data Record Schema (for SD card storage)
const offlineDataSchema = new mongoose.Schema(
  {
    // Data Identity
    recordId: {
      type: String,
      required: true,
      unique: true,
      description: "Unique identifier on SD card"
    },

    // Rover Reference
    roverId: {
      type: String,
      required: true,
      index: true,
      description: "Which rover recorded this"
    },

    // Timestamp
    recordTime: {
      type: Date,
      required: true,
      index: true,
      description: "When data was recorded"
    },

    // GPS Location
    latitude: {
      type: Number,
      description: "Latitude"
    },
    longitude: {
      type: Number,
      description: "Longitude"
    },
    altitude: {
      type: Number,
      description: "Altitude"
    },

    // Sensor Readings
    sensorData: {
      temperature: Number,
      humidity: Number,
      pressure: Number,
      soilMoisture: Number,
      light: Number,
      gasLevel: Number,
      airQuality: Number
    },

    // Camera/Image Data
    imageData: {
      imageName: String,
      imageSize: Number,
      captureTime: Date,
      thumbnail: String // Base64 encoded small thumbnail
    },

    // Trip Info
    tripId: String,
    tripProgress: {
      distanceTraveled: Number,
      duration: Number
    },

    // Device Status
    deviceStatus: {
      batteryLevel: Number,
      signalStrength: Number,
      temperature: Number,
      memoryUsed: Number
    },

    // Sync Status
    syncStatus: {
      type: String,
      enum: ["pending", "synced", "failed"],
      default: "pending",
      index: true
    },
    syncAttempts: {
      type: Number,
      default: 0
    },
    lastSyncAttempt: Date,
    syncedTo: {
      type: Date,
      description: "When successfully synced to server"
    },

    // Data Integrity
    checksum: String,
    dataIntegrity: {
      type: Boolean,
      default: true
    },

    // Owner
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true,
    collection: "offline_data"
  }
);

// Indexes
offlineDataSchema.index({ roverId: 1 });
offlineDataSchema.index({ recordTime: -1 });
offlineDataSchema.index({ syncStatus: 1 });
offlineDataSchema.index({ userId: 1 });
offlineDataSchema.index({ tripId: 1 });

const OfflineData = mongoose.model("OfflineData", offlineDataSchema);
export default OfflineData;
