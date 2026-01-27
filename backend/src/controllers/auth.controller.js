import admin from "../config/firebaseAdmin.js";
import User from "../models/user.model.js";

// 🔄 SYNC USER WITH BACKEND (The Handshake)
export async function syncUser(req, res) {
  try {
    const { role } = req.body;
    const firebaseUser = req.user; // From auth middleware (decoded Firebase token)

    console.log(`🔄 Sync Request - UID: ${firebaseUser.uid}, Email: ${firebaseUser.email}, Role: ${role}`);

    // Validate role
    if (!role || !['farmer', 'admin'].includes(role)) {
      return res.status(400).json({ 
        error: "Invalid role. Must be 'farmer' or 'admin'" 
      });
    }

    // Find or create user in MongoDB
    let user = await User.findOne({ firebaseUid: firebaseUser.uid });

    if (user) {
      // User exists - update role if changed
      if (user.role !== role) {
        console.log(`📝 Updating user role from ${user.role} to ${role}`);
        user.role = role;
        user.lastLogin = new Date();
        await user.save();
      } else {
        // Just update last login
        user.lastLogin = new Date();
        await user.save();
      }
      
      console.log(`✅ Existing user synced: ${user.email} (${user.role})`);
    } else {
      // Create new user
      user = new User({
        firebaseUid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.name || firebaseUser.email.split('@')[0],
        role: role,
        lastLogin: new Date(),
      });
      
      await user.save();
      console.log(`✅ New user created: ${user.email} (${user.role})`);
    }

    res.json({
      success: true,
      message: "User synced successfully",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      }
    });

  } catch (error) {
    console.error("❌ Sync failed:", error);
    res.status(500).json({ 
      error: "Failed to sync user",
      details: error.message 
    });
  }
}

// 👤 GET CURRENT USER PROFILE
export async function getCurrentUser(req, res) {
  try {
    const firebaseUser = req.user; // From auth middleware

    const user = await User.findOne({ firebaseUid: firebaseUser.uid });

    if (!user) {
      return res.status(404).json({ 
        error: "User not found in database. Please login again." 
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
      }
    });

  } catch (error) {
    console.error("❌ Get user failed:", error);
    res.status(500).json({ 
      error: "Failed to fetch user data",
      details: error.message 
    });
  }
}

// 📝 UPDATE USER PROFILE
export async function updateUserProfile(req, res) {
  try {
    const firebaseUser = req.user;
    const { name } = req.body;

    const user = await User.findOneAndUpdate(
      { firebaseUid: firebaseUser.uid },
      { 
        name,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log(`✅ Profile updated for ${user.email}`);

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      }
    });

  } catch (error) {
    console.error("❌ Update profile failed:", error);
    res.status(500).json({ 
      error: "Failed to update profile",
      details: error.message 
    });
  }
}

// 🔍 CHECK IF USER HAS ROLE (Utility endpoint)
export async function checkUserRole(req, res) {
  try {
    const firebaseUser = req.user;

    const user = await User.findOne({ firebaseUid: firebaseUser.uid });

    if (!user) {
      return res.status(404).json({ 
        hasRole: false,
        message: "User not found" 
      });
    }

    res.json({
      hasRole: true,
      role: user.role,
      email: user.email
    });

  } catch (error) {
    console.error("❌ Check role failed:", error);
    res.status(500).json({ 
      error: "Failed to check user role",
      details: error.message 
    });
  }
}   