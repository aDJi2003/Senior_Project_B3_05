const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

const http = require("http");
const server = http.createServer(app);

server.on("error", (err) => {
  console.error("HTTP Server Error:", err);
});

server.on("connection", (socket) => {
  socket.on("error", (sockErr) => {
    console.warn("Socket error (ignored):", sockErr.code);
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled Rejection:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});
