import express from "express";
import cors from "cors";

import roverRoutes from "./routes/rover.routes.js";
import waypointRoutes from "./routes/waypoint.routes.js";
import sensorRoutes from "./routes/sensor.routes.js"; // 👈 IMPORT THIS

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

/* 🔗 CONNECT ROUTES */
app.use("/api/rover", roverRoutes);
app.use("/api/waypoints", waypointRoutes);
app.use("/api/sensors", sensorRoutes); // 👈 CONNECT THIS

app.get("/", (req, res) => {
  res.send("🚀 TRINETRA Backend Running");
});

export default app;