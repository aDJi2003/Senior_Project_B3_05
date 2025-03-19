const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./src/config/database");



const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

//Routes
const penggunaRoutes = require("./src/routes/authRoutes");
const sampahRoutes = require("./src/routes/sampahRoutes"); // Keep only this line

console.log(typeof sampahRoutes);
app.use("/api/pengguna", penggunaRoutes);
app.use("/api/sampah", sampahRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("🚀 Server is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
