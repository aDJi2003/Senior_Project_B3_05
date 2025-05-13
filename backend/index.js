const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./src/config/database");

const app = express();
const PORT = process.env.PORT || 5000;

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const penggunaRoutes = require("./src/routes/authRoutes");
const sampahRoutes   = require("./src/routes/sampahRoutes");

app.use("/api/pengguna", penggunaRoutes);
app.use("/api/sampah", sampahRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Server is running...");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🔗 Accepting requests from: ${FRONTEND_URL}`);
});
