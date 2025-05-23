const Sampah = require("../models/sampahModel");
const Waste = require('../models/sampahModel');

const getAllSampah = async (req, res) => {
  try {
    const data = await Sampah.getAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

const getSampahByUserId = async (req, res) => {
  try {
    if (!req.user || !req.user.ID_pengguna) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = req.user.ID_pengguna;
    console.log("Mengambil data sampah untuk pengguna ID:", userId);

    const data = await Sampah.getByUserId(userId);

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Sampah not found for this user" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error di backend:", error);
    res.status(500).json({ error: error.message || "Failed to fetch data" });
  }

};
const createSampah = async (req, res) => {
  try {
    const { Mass_of_Weight, Type_of_waste, status, location } = req.body;
    const ID_pengguna = req.user?.ID_pengguna;

    // Validasi field wajib (tanpa status)
    if (!ID_pengguna || !Mass_of_Weight || !Type_of_waste || !location) {
      return res.status(400).json({ error: "ID_pengguna, Mass_of_Weight, Type_of_waste, and location are required" });
    }

    // Kirim status jika ada, kalau tidak biarkan undefined (akan default ke "completed" di model)
    const data = await Sampah.createSampah(
      ID_pengguna,
      Mass_of_Weight,
      Type_of_waste,
      status, 
      location
    );

    res.status(201).json(data);
  } catch (error) {
    console.error("Error creating sampah:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};


const updateSampah = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { Mass_of_Weight, Type_of_waste, status, location } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    if (!Mass_of_Weight || !Type_of_waste || !status || !location) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const data = await Sampah.updateSampah(id, Mass_of_Weight, Type_of_waste, status, location);

    if (!data) {
      return res.status(404).json({ error: "Sampah not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error updating sampah:", error);
    res.status(500).json({ error: "Failed to update sampah", details: error.message });
  }
};

const deleteSampah = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    await Sampah.deleteSampah(id);
    res.status(200).json({ message: "Sampah deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete sampah" });
  }
};


const getWeeklyWeight = async (req, res) => {
  try {
    const { userId } = req.query;


    if (!userId) {
      return res.status(400).json({ error: "userId is required in the query parameters" });
    }

    const totalWeight = await Waste.getWeeklyWeight(userId);

    if (totalWeight === null || totalWeight === undefined) {
      return res.status(404).json({ error: "No data found for the given userId" });
    }

    res.status(200).json({ totalWeight });
  } catch (error) {
    console.error("Error fetching weekly weight:", error);
    res.status(500).json({ error: "Failed to fetch weekly weight", details: error.message });
  }
};

const getTotalWaste = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "userId is required in the query parameters" });
    }

    const totalWaste = await Sampah.getTotalWaste(userId);

    if (!totalWaste) {
      return res.status(404).json({ error: "No waste data found for the given userId" });
    }

    res.status(200).json(totalWaste);
  } catch (error) {
    console.error("Error fetching total waste data:", error);
    res.status(500).json({ error: "Failed to fetch total waste data", details: error.message });
  }
};

module.exports = {
  getAllSampah,
  getSampahByUserId,
  createSampah,
  updateSampah,
  deleteSampah,
  getWeeklyWeight,
  getTotalWaste,
};
