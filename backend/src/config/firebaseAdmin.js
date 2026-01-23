import admin from "firebase-admin";
import { createRequire } from "module";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// CALCULATE PATHS
const targetPath = path.resolve(__dirname, "../../firebase-service-account.json");

console.log("\n--- 🔍 DEBUGGING PATHS ---");
console.log("Current File is in:", __dirname);
console.log("Looking for key at:", targetPath);

// CHECK IF FILE EXISTS
if (fs.existsSync(targetPath)) {
  console.log("✅ SUCCESS: File found!");
  const serviceAccount = require(targetPath);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  console.log("❌ ERROR: File NOT found at that path.");
  console.log("📂 Files actually in the 'backend' folder:");
  // List files in the backend folder (2 levels up)
  const backendFolder = path.resolve(__dirname, "../../");
  try {
      console.log(fs.readdirSync(backendFolder));
  } catch (e) {
      console.log("Could not read directory:", backendFolder);
  }
}
console.log("--------------------------\n");

export default admin;