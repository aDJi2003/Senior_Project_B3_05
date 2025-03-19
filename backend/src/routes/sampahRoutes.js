const express = require("express");
const router = express.Router();
const sampahController = require("../controllers/sampahController");

// Perbaiki rute
router.get("/", sampahController.getAllSampah);
router.get("/:id", sampahController.getSampahById);
router.post("/create", sampahController.createSampah);
router.put("/:id", sampahController.updateSampah);
router.delete("/:id", sampahController.deleteSampah);

module.exports = router; // Pastikan ini ada!

  