import express from "express";
import cors from "cors";

import roverRoutes from "./routes/rover.routes.js";
import waypointRoutes from "./routes/waypoint.routes.js";
import sensorRoutes from "./routes/sensor.routes.js";
import authRoutes from "./routes/auth.routes.js";

// Import models for Bluetooth rover system
import Rover from "./models/rover.model.js";
import RoverImage from "./models/roverImage.model.js";
import OfflineData from "./models/offlineData.model.js";
import bluetoothHandler from "./services/bluetoothHandler.js";

const app = express();

/* 🔧 CORS CONFIGURATION 
   Allowed origins updated to support both localhost and 127.0.0.1 
   to prevent connection blocks during testing.
*/
app.use(cors({
  origin: [
    "http://localhost:5173", 
    "http://127.0.0.1:5173"
  ],
  credentials: true, // Important for headers/auth
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// Add routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("🚀 TRINETRA Backend Running");
});

/* 🔗 ROUTES */
app.use("/api/rover", roverRoutes);
app.use("/api/waypoints", waypointRoutes);
app.use("/api/sensors", sensorRoutes);

export default app;