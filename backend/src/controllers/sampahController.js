const Sampah = require("../models/sampahModel");

const getAllSampah = async (req, res) => {
  try {
    const data = await Sampah.getAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

const getSampahById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    console.log("Mengambil data dengan ID:", id);

    const data = await Sampah.getById(id);

    if (!data) {
      return res.status(404).json({ error: "Sampah not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error di backend:", error); // Lihat error di terminal
    res.status(500).json({ error: error.message || "Failed to fetch data" });
  }
};



const createSampah = async (req, res) => {
  try {
    const { ID_pengguna, Mass_of_Weight, Type_of_waste, status, location } = req.body;

    // Validasi input
    if (!ID_pengguna || !Mass_of_Weight || !Type_of_waste || !status || !location) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Memanggil fungsi dari model yang benar
    const data = await Sampah.createSampah(ID_pengguna, Mass_of_Weight, Type_of_waste, status, location);

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

    // Validasi input
    if (!Mass_of_Weight || !Type_of_waste || !status || !location) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Memanggil fungsi yang benar dari model
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
    await Sampah.deleteSampah(req.params.id);
    res.status(200).json({ message: "Sampah deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete sampah" });
  }
};

module.exports = { getAllSampah, getSampahById, createSampah, updateSampah, deleteSampah };
