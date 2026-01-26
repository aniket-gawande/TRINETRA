import admin from "firebase-admin";
import { createRequire } from "module";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

let isFirebaseInitialized = false;

// ✅ Try to initialize Firebase
try {
  // 1. Construct path to service account file
  const serviceAccountPath = path.join(__dirname, "../../firebase-service-account.json");

  // 2. Check if file exists
  if (!fs.existsSync(serviceAccountPath)) {
    console.warn("⚠️  firebase-service-account.json not found");
    console.warn("📋 Required: Download from Firebase Console → Project Settings → Service Accounts");
    console.warn("📂 Location: backend/firebase-service-account.json");
    throw new Error("Service account file not found. See instructions above.");
  }

  // 3. Load the key
  const serviceAccount = require(serviceAccountPath);

  // 4. Validate service account has required fields
  if (!serviceAccount.project_id || !serviceAccount.private_key || !serviceAccount.client_email) {
    throw new Error("Service account JSON is missing required fields: project_id, private_key, or client_email");
  }

  // 5. Only initialize if NO app exists yet (Prevents "App already exists" Crash)
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("✅ Firebase Admin Initialized Successfully");
    isFirebaseInitialized = true;
  } else {
    console.log("✅ Firebase Admin Already Initialized");
    isFirebaseInitialized = true;
  }
} catch (error) {
  console.error("❌ Firebase Initialization Failed:", error.message);
  console.error("");
  console.error("🔧 SOLUTION:");
  console.error("1. Go to: https://console.firebase.google.com/project/trinetra-ebdd7/settings/serviceaccounts");
  console.error("2. Click 'Generate New Private Key'");
  console.error("3. Save as: backend/firebase-service-account.json");
  console.error("4. Restart the server: npm run dev");
  console.error("");
  console.error("For development without Firebase:");
  console.error("- Create a dummy firebase-service-account.json file");
  console.error("- Use the firebase-service-account.example.json as template");
  console.error("");
  
  // Set flag to false - Firebase not available
  isFirebaseInitialized = false;
}

export default admin;
export { isFirebaseInitialized };