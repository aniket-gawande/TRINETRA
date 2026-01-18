require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./src/app");

const PORT = 5000;

// ✅ CONNECT MONGODB FIRST
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    // ✅ START SERVER ONLY AFTER DB CONNECTS
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed", err);
  });
