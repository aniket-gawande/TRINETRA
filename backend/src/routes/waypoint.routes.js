const express = require("express");
const router = express.Router();
const controller = require("../controllers/waypoint.controller");

// CREATE waypoint
router.post("/", controller.createWaypoint);

// GET all waypoints
router.get("/", controller.getWaypoints);

// CLEAR all waypoints
router.delete("/", controller.clearWaypoints);

module.exports = router;
