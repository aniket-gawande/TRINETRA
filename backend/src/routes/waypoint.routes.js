import express from "express";
import {
  getWaypoints,
  addWaypoint,
  clearWaypoints,
  countWaypoints,
} from "../controllers/waypoint.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

/* 🤖 ESP32 ROVER ACCESS (Public) */
// Rover calls: GET http://<IP>:5000/api/waypoints
router.get("/", getWaypoints);

/* 🔐 USER ACCESS (Protected) */
// User calls: POST /api/waypoints
router.post("/", authMiddleware, addWaypoint);
router.delete("/", authMiddleware, clearWaypoints);

/* 🔍 DEBUG ENDPOINT (Public) */
router.get("/debug/count", countWaypoints);

export default router;