import app from "./src/app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

/* ---------- DB ---------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection failed", err));

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 5000;

console.log("TYPE OF app:", typeof app); // 🔍 DEBUG LINE

app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
