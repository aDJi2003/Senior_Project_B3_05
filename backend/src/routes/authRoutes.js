const express = require("express");
const authController = require("../controllers/authController");
const verifyToken = require("../middleware/authMiddleware");
const fs = require('fs');
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const Pengguna = require("../models/penggunaModel");
const path = require('path');

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", verifyToken, authController.getUserName);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadDir = 'uploads/';
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Not an image! Please upload an image.'), false);
      }
    }
  });
  
  router.put("/update/:id", verifyToken, upload.single("profileImage"), async (req, res) => {
    try {
      const userId = req.params.id;
      let updateData = {
        name: req.body.name,
        email: req.body.email,
      };
  
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        updateData.profileImageURL = result.secure_url;
        fs.unlinkSync(req.file.path);
      } else if (req.body.profileImageURL) {
        updateData.profileImageURL = req.body.profileImageURL;
      }

      const updatedUser = await Pengguna.updateProfile(userId, updateData); // Ensure this is called
      if (!updatedUser) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      res.status(200).json({
        success: true,
        message: "User updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Error updating user:", error); // Debug log
      res.status(500).json({
        success: false,
        message: "Failed to update user",
        error: error.message,
      });
    }
  });

module.exports = router;
