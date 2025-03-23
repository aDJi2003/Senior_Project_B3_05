const jwt = require("jsonwebtoken");
const penggunaModel = require("../models/penggunaModel");

const authController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const newUser = await penggunaModel.register(name, email, password);
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
      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },

  getUserName: async (req, res) => {
    try {
      const userEmail = req.user.email; 

      const result = await penggunaModel.getUserNameByEmail(userEmail);

      if (!result) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({ name: result.name });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

};

module.exports = authController;
