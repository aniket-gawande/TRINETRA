import app from "./src/app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bluetoothHandler from "./src/services/bluetoothHandler.js";

dotenv.config();

/* ---------- DB ---------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed", err.message));

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 5000;

console.log("");
console.log("🚀 Starting TRINETRA Backend Server...");
console.log("════════════════════════════════════════");

const server = app.listen(PORT, async () => {
  console.log(`✅ Backend running on port ${PORT}`);
  console.log(`📍 API available at http://localhost:${PORT}/api`);
  console.log("");
  
  // Initialize Bluetooth connection to rover
  console.log("📡 Initializing Bluetooth connection to rover...");
  try {
    // Attempt to list ports for debugging/logging
    await bluetoothHandler.listPorts();

    const portName = process.env.BLUETOOTH_PORT || "COM5";
    const baudRate = parseInt(process.env.BLUETOOTH_BAUD_RATE || "115200");
    
    await bluetoothHandler.initialize(portName, baudRate);
    console.log(`✅ Bluetooth initialized on port ${portName} @ ${baudRate} baud`);
  } catch (error) {
    console.warn(`⚠️  Bluetooth initialization failed (will retry on demand): ${error.message}`);
  }
  
  console.log("⚠️  Check logs above for Firebase status");
  console.log("════════════════════════════════════════");
  console.log("");
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\n🛑 Shutting down server...");
  bluetoothHandler.close();
  server.close(() => {
    console.log("✅ Server shut down gracefully");
    process.exit(0);
  });
});