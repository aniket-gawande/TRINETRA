import mongoose from "mongoose";

// Rover Image/Camera Data Schema
const roverImageSchema = new mongoose.Schema(
  {
    // Image Identity
    imageId: {
      type: String,
      required: true,
      unique: true,
      description: "Unique identifier for image"
    },

    // Rover Reference
    roverId: {
      type: String,
      required: true,
      index: true,
      description: "ID of rover that captured this image"
    },

    // Image Metadata
    imageUrl: {
      type: String,
      required: true,
      description: "Path/URL to the image file"
    },
    fileName: {
      type: String,
      description: "Original filename on rover"
    },
    fileSize: {
      type: Number,
      description: "Image file size in bytes"
    },
    imageFormat: {
      type: String,
      enum: ["JPEG", "PNG", "JPG", "BMP"],
      default: "JPEG",
      description: "Image file format"
    },

    // Image Properties
    width: {
      type: Number,
      description: "Image width in pixels"
    },
    height: {
      type: Number,
      description: "Image height in pixels"
    },
    quality: {
      type: Number,
      description: "Image quality (1-100)"
    },

    // Location Data
    latitude: {
      type: Number,
      description: "Latitude where image was captured"
    },
    longitude: {
      type: Number,
      description: "Longitude where image was captured"
    },
    altitude: {
      type: Number,
      description: "Altitude where image was captured"
    },

    // Capture Info
    captureTime: {
      type: Date,
      required: true,
      index: true,
      description: "When the image was captured"
    },
    uploadTime: {
      type: Date,
      description: "When image was uploaded to server"
    },
    syncTime: {
      type: Date,
      description: "When image was synced from offline storage"
    },

    // Storage Location
    storageLocation: {
      type: String,
      enum: ["offline-sd", "server", "synced"],
      default: "offline-sd",
      description: "Where image is stored"
    },

    // Image Analysis (optional)
    analysisData: {
      cropType: String,
      health: String, // healthy, diseased, stressed
      confidence: Number,
      detectedObjects: [String]
    },

    // Associated Sensor Data
    sensorDataAtCapture: {
      temperature: Number,
      humidity: Number,
      light: Number,
      soilMoisture: Number,
      pressure: Number
    },

    // Tags & Annotations
    tags: [String],
    notes: String,
    cropType: String,

    // Trip Information
    tripId: {
      type: String,
      description: "Associated trip ID"
    },

    // Owner
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      description: "Owner of the rover"
    },

    // Status
    syncStatus: {
      type: String,
      enum: ["pending", "syncing", "synced", "failed"],
      default: "pending",
      description: "Sync status from offline to server"
    },
    processingStatus: {
      type: String,
      enum: ["raw", "processing", "processed"],
      default: "raw",
      description: "Processing status of image"
    }
  },
  {
    timestamps: true,
    collection: "rover_images"
  }
);

// Indexes
roverImageSchema.index({ roverId: 1 });
roverImageSchema.index({ userId: 1 });
roverImageSchema.index({ captureTime: -1 });
roverImageSchema.index({ syncStatus: 1 });
roverImageSchema.index({ latitude: 1, longitude: 1 });
roverImageSchema.index({ tripId: 1 });

const RoverImage = mongoose.model("RoverImage", roverImageSchema);
export default RoverImage;
