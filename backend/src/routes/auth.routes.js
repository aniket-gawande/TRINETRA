import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  syncUser,
  getCurrentUser,
  updateUserProfile,
  checkUserRole,
} from "../controllers/auth.controller.js";

const router = express.Router();

// ============================================
// AUTHENTICATION ROUTES
// ============================================

// 🔄 SYNC USER (The Handshake - Most Important Route)
// Called immediately after Firebase login
router.post("/sync", authMiddleware, syncUser);

// 👤 GET CURRENT USER
router.get("/me", authMiddleware, getCurrentUser);

// 📝 UPDATE PROFILE
router.put("/profile", authMiddleware, updateUserProfile);

// 🔍 CHECK USER ROLE
router.get("/role", authMiddleware, checkUserRole);

export default router;