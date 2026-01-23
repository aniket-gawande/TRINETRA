import express from "express";
import cors from "cors";

import roverRoutes from "./routes/rover.routes.js";
import waypointRoutes from "./routes/waypoint.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/rover", roverRoutes);
app.use("/api/waypoints", waypointRoutes);

app.get("/", (req, res) => {
  res.send("🚀 TRINETRA Backend Running");
});

export default app;
