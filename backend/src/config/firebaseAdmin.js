import admin from "firebase-admin";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

try {
  // 1. Load the key
  const serviceAccount = require("../../firebase-service-account.json");

  // 2. Only initialize if NO app exists yet (Prevents "App already exists" Crash)
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("✅ Firebase Admin Initialized");
  }
} catch (error) {
  console.error("❌ Firebase Initialization Error:", error.message);
  console.log("👉 Ensure 'firebase-service-account.json' is in the 'backend' folder.");
}

export default admin;