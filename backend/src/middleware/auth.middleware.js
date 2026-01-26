import admin from "../config/firebaseAdmin.js";
import { isFirebaseInitialized } from "../config/firebaseAdmin.js";

export default async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // ✅ Check if Firebase Admin is properly initialized
    if (!isFirebaseInitialized || !admin.apps || admin.apps.length === 0) {
      console.error("❌ Firebase Admin SDK not initialized");
      return res.status(503).json({ 
        message: "Service temporarily unavailable",
        details: "Firebase authentication service is not configured. Please contact administrator.",
        action: "Follow setup instructions: https://console.firebase.google.com → Service Accounts → Generate Private Key"
      });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Attach user info to request
    console.log("✅ Token verified for user:", decodedToken.email);
    next();
  } catch (err) {
    console.error("❌ Auth Error:", err.message);
    
    // Provide specific error messages
    let errorMessage = "Unauthorized: Invalid token";
    let statusCode = 401;
    
    if (err.code === "auth/invalid-id-token") {
      errorMessage = "Token is invalid or expired. Please login again.";
    } else if (err.code === "auth/id-token-expired") {
      errorMessage = "Token has expired. Please login again.";
    } else if (err.message.includes("Cannot find module") || err.message.includes("service-account")) {
      errorMessage = "Server configuration error: Firebase service account not found.";
      statusCode = 503;
    } else if (!isFirebaseInitialized) {
      errorMessage = "Firebase authentication is not initialized. Please check server logs.";
      statusCode = 503;
    }
    
    return res.status(statusCode).json({ 
      message: errorMessage,
      error: err.code || err.message
    });
  }
}
