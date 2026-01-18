const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/waypoints", require("./routes/waypoint.routes"));

// Health check
app.get("/", (req, res) => {
  res.send("Trinetra Backend is Running 🚀");
});

module.exports = app;
