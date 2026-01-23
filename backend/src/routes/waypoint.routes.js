import express from "express";
import {
  getWaypoints,
  addWaypoint,
  clearWaypoints,
} from "../controllers/waypoint.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

/* 📍 Waypoints API */

// Public: Anyone (including the Rover) can READ waypoints
router.get("/", getWaypoints);

// Protected: Only logged-in users can ADD or CLEAR waypoints
router.post("/", authMiddleware, addWaypoint);
router.delete("/", authMiddleware, clearWaypoints);

export default router;