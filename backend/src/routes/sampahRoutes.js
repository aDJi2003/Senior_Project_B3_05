const express = require("express");
const router = express.Router();
const sampahController = require("../controllers/sampahController");
const authMiddleware = require("../middleware/authMiddleware");
const { getTotalWaste } = require("../controllers/sampahController");

// Perbaiki rute
router.get("/", sampahController.getAllSampah);
router.get('/weekly-weight', sampahController.getWeeklyWeight);
router.get("/total-waste", getTotalWaste);
router.get("/:id", authMiddleware, sampahController.getSampahByUserId);
router.post("/create", authMiddleware, sampahController.createSampah);
router.put("/:id", sampahController.updateSampah);
router.delete("/:id", sampahController.deleteSampah);

module.exports = router;

