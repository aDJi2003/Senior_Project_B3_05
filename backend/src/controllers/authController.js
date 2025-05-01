const jwt = require("jsonwebtoken");
const penggunaModel = require("../models/penggunaModel");

const authController = {
  register: async (req, res) => {
    try {
      const { name, email, password, profileImageURL } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ error: "Name, email, and password are required" });
      }

      const newUser = await penggunaModel.register(name, email, password, profileImageURL || null);

      res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }

      const user = await penggunaModel.login(email, password);
      console.log("User found during login:", user);

      // Token hanya simpan ID_pengguna, name, dan profile_image
      const token = jwt.sign(
        {
          ID_pengguna: user.ID_pengguna,
          name: user.name,
          profile_image: user.profile_image,
        },
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
      const userId = req.user.ID_pengguna; // Ambil ID dari token

      const result = await penggunaModel.getUserById(userId); // Ambil user pakai ID

      if (!result) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({
        ID_pengguna: result.ID_pengguna,
        name: result.name,
        email: result.email,
        profile_image: result.profile_image,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = authController;
