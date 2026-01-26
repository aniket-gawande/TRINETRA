import app from "./src/app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

/* ---------- DB ---------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed", err.message));

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 5000;

console.log("");
console.log("🚀 Starting TRINETRA Backend Server...");
console.log("════════════════════════════════════════");

app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
  console.log(`📍 API available at http://localhost:${PORT}/api`);
  console.log("");
  console.log("⚠️  Check logs above for Firebase status");
  console.log("════════════════════════════════════════");
  console.log("");
});
