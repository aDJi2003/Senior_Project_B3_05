const jwt = require("jsonwebtoken");
const penggunaModel = require("../models/penggunaModel");

const authController = {
  register: async (req, res) => {
    try {
      const { name, email, password, profileImageURL } = req.body;

      // Validasi input
      if (!name || !email || !password) {
        return res.status(400).json({ error: "Name, email, and password are required" });
      }

      // Panggil model untuk register
      const newUser = await penggunaModel.register(name, email, password, profileImageURL || null);

      res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validasi input
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }

      // Cek login dari model
      const user = await penggunaModel.login(email, password);
      console.log("User found during login:", user);

      // Generate token dengan ID_pengguna, name, email, dan profile_image
      const token = jwt.sign(
        { ID_pengguna: user.ID_pengguna, name: user.name, email: user.email, profile_image: user.profile_image }, 
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({ message: "Login successful", token, user });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },

  getUserName: async (req, res) => {
    try {
      const userEmail = req.user.email; // Ambil email dari token JWT

      // Ambil data user berdasarkan email
      const result = await penggunaModel.getUserNameByEmail(userEmail);

      if (!result) {
        return res.status(404).json({ error: "User not found" });
      }

      // Return name, email, dan profile_image
      res.status(200).json({ name: result.name, email: result.email, profile_image: result.profile_image });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = authController;
