import mongoose from "mongoose";

// Rover Data Schema
const roverSchema = new mongoose.Schema(
  {
    // Rover Identity
    roverId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      description: "Unique identifier for the rover"
    },
    roverName: {
      type: String,
      default: "Rover-1",
      description: "Display name for the rover"
    },

    // Connection Status
    connectionStatus: {
      type: String,
      enum: ["connected", "disconnected", "offline"],
      default: "disconnected",
      description: "Current connection status"
    },
    lastSeen: {
      type: Date,
      description: "Last time rover communicated with server"
    },

    // GPS Location
    latitude: {
      type: Number,
      description: "Current latitude of rover"
    },
    longitude: {
      type: Number,
      description: "Current longitude of rover"
    },
    altitude: {
      type: Number,
      description: "Altitude in meters"
    },
    accuracy: {
      type: Number,
      description: "GPS accuracy in meters"
    },

    // Satellite Info
    satellites: {
      type: Number,
      default: 0,
      description: "Number of satellites locked"
    },
    hdop: {
      type: Number,
      description: "Horizontal Dilution of Precision"
    },

    // Sensor Data (from rover sensors)
    temperature: {
      type: Number,
      description: "Temperature reading from rover"
    },
    humidity: {
      type: Number,
      description: "Humidity reading"
    },
    pressure: {
      type: Number,
      description: "Atmospheric pressure"
    },
    soilMoisture: {
      type: Number,
      description: "Soil moisture percentage"
    },
    light: {
      type: Number,
      description: "Light intensity"
    },

    // Camera Data
    cameraStatus: {
      type: String,
      enum: ["active", "inactive", "error"],
      default: "inactive",
      description: "Camera operational status"
    },
    lastImageTime: {
      type: Date,
      description: "Timestamp of last captured image"
    },
    imageCount: {
      type: Number,
      default: 0,
      description: "Total images captured on this trip"
    },

    // Offline Data Storage Status
    sdCardStatus: {
      type: String,
      enum: ["available", "full", "error"],
      default: "available",
      description: "Status of SD card"
    },
    offlineRecordsCount: {
      type: Number,
      default: 0,
      description: "Number of records stored offline on SD card"
    },
    pendingSyncCount: {
      type: Number,
      default: 0,
      description: "Number of records waiting to be synced"
    },

    // Battery Status
    batteryLevel: {
      type: Number,
      min: 0,
      max: 100,
      description: "Battery percentage"
    },
    batteryVoltage: {
      type: Number,
      description: "Battery voltage in volts"
    },

    // Trip Information
    tripStartTime: {
      type: Date,
      description: "When current trip started"
    },
    tripEndTime: {
      type: Date,
      description: "When trip ended"
    },
    tripDistance: {
      type: Number,
      description: "Distance traveled in current trip (km)"
    },
    tripStatus: {
      type: String,
      enum: ["idle", "active", "paused", "completed"],
      default: "idle",
      description: "Current trip status"
    },

    // Rover Configuration
    gpsUpdateInterval: {
      type: Number,
      default: 10,
      description: "GPS update interval in seconds"
    },
    sensorUpdateInterval: {
      type: Number,
      default: 30,
      description: "Sensor update interval in seconds"
    },
    cameraInterval: {
      type: Number,
      default: 60,
      description: "Camera capture interval in seconds"
    },

    // Path/Route
    path: [
      {
        timestamp: Date,
        latitude: Number,
        longitude: Number,
        altitude: Number
      }
    ],

    // Metadata
    firmware: {
      type: String,
      description: "Rover firmware version"
    },
    signalStrength: {
      type: Number,
      description: "Bluetooth signal strength (RSSI)"
    },
    errorLog: [
      {
        timestamp: Date,
        error: String
      }
    ],

    // Owner
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      description: "Owner of the rover"
    }
  },
  {
    timestamps: true,
    collection: "rovers"
  }
);

// Indexes for performance
roverSchema.index({ roverId: 1 });
roverSchema.index({ userId: 1 });
roverSchema.index({ connectionStatus: 1 });
roverSchema.index({ lastSeen: -1 });
roverSchema.index({ latitude: 1, longitude: 1 });
roverSchema.index({ createdAt: -1 });

const Rover = mongoose.model("Rover", roverSchema);
export default Rover;
