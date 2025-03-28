const express = require("express");
const router = express.Router();
const sampahController = require("../controllers/sampahController");
const authMiddleware = require("../middleware/authMiddleware");

// Perbaiki rute
router.get("/", sampahController.getAllSampah);
router.get("/by-email", authMiddleware, sampahController.getSampahByEmail);
router.get("/:id", sampahController.getSampahById);
router.post("/create", sampahController.createSampah);
router.put("/:id", sampahController.updateSampah);
router.delete("/:id", sampahController.deleteSampah);

module.exports = router; 

