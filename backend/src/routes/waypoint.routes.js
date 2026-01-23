import express from "express";
import {
  getWaypoints,
  addWaypoint,
  clearWaypoints,
} from "../controllers/waypoint.controller.js";

const router = express.Router();

/* 📍 Waypoints API */
router.get("/", getWaypoints);      // ESP + frontend fetch
router.post("/", addWaypoint);      // frontend add waypoint
router.delete("/", clearWaypoints); // clear route

export default router;
