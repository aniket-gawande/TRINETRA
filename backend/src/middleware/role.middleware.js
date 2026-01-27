import User from "../models/user.model.js";

// ============================================
// ROLE-BASED AUTHORIZATION MIDDLEWARE
// ============================================

// Check if user is Admin
export async function requireAdmin(req, res, next) {
  try {
    const firebaseUser = req.user; // Set by authMiddleware

    if (!firebaseUser) {
      return res.status(401).json({ 
        error: "Unauthorized",
        message: "No authentication token provided" 
      });
    }

    // Get user from database
    const user = await User.findOne({ firebaseUid: firebaseUser.uid });

    if (!user) {
      return res.status(404).json({ 
        error: "User not found",
        message: "Please complete registration" 
      });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ 
        error: "Forbidden",
        message: "Admin access required. You are logged in as: " + user.role 
      });
    }

    // Attach user to request for use in routes
    req.dbUser = user;
    next();

  } catch (error) {
    console.error("❌ Admin check failed:", error);
    res.status(500).json({ 
      error: "Authorization check failed",
      details: error.message 
    });
  }
}

// Check if user is Farmer
export async function requireFarmer(req, res, next) {
  try {
    const firebaseUser = req.user;

    if (!firebaseUser) {
      return res.status(401).json({ 
        error: "Unauthorized",
        message: "No authentication token provided" 
      });
    }

    const user = await User.findOne({ firebaseUid: firebaseUser.uid });

    if (!user) {
      return res.status(404).json({ 
        error: "User not found",
        message: "Please complete registration" 
      });
    }

    if (user.role !== 'farmer') {
      return res.status(403).json({ 
        error: "Forbidden",
        message: "Farmer access required. You are logged in as: " + user.role 
      });
    }

    req.dbUser = user;
    next();

  } catch (error) {
    console.error("❌ Farmer check failed:", error);
    res.status(500).json({ 
      error: "Authorization check failed",
      details: error.message 
    });
  }
}

// Check if user is either Admin OR Farmer (General authenticated user)
export async function requireAuthenticated(req, res, next) {
  try {
    const firebaseUser = req.user;

    if (!firebaseUser) {
      return res.status(401).json({ 
        error: "Unauthorized",
        message: "No authentication token provided" 
      });
    }

    const user = await User.findOne({ firebaseUid: firebaseUser.uid });

    if (!user) {
      return res.status(404).json({ 
        error: "User not found",
        message: "Please complete registration by logging in" 
      });
    }

    req.dbUser = user;
    next();

  } catch (error) {
    console.error("❌ Auth check failed:", error);
    res.status(500).json({ 
      error: "Authorization check failed",
      details: error.message 
    });
  }
}