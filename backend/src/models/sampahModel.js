const pool = require("../config/database");

const sampahModel = {
  // Mengambil semua data sampah
  getAll: async () => {
    try {
      const result = await pool.query("SELECT * FROM Sampah");
      return result.rows;
    } catch (error) {
      console.error("Error fetching all sampah:", error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const result = await pool.query("SELECT * FROM Sampah WHERE ID_sampah = $1", [id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error("Error fetching sampah by ID:", error);
      throw error;
    }
  },

  getByEmail: async (email) => {
    try {
        const result = await pool.query(
            `SELECT s.* 
            FROM Sampah s
            JOIN Pengguna p ON s.ID_pengguna = p.ID_pengguna
            WHERE p.email = $1`,
            [email]
        );
        return result.rows;
    } catch (error) {
        console.error("Error fetching sampah by email:", error);
        throw error;
    }
  },

  createSampah: async (ID_pengguna, Mass_of_Weight, Type_of_waste, status, location) => {
    try {
      // Validasi Type_of_waste
      const validWasteTypes = ["organic", "inorganic", "B3"];
      if (!validWasteTypes.includes(Type_of_waste)) {
        throw new Error("Invalid Type_of_waste. Allowed values: 'organic', 'inorganic', 'B3'");
      }

      // Validasi status
      const validStatuses = ["uncompletted", "on progress", "completed"];
      if (!validStatuses.includes(status)) {
        throw new Error("Invalid status. Allowed values: 'uncompletted', 'on progress', 'completed'");
      }

      const result = await pool.query(
        `INSERT INTO Sampah (ID_pengguna, Mass_of_Weight, Type_of_waste, status, location) 
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [ID_pengguna, Mass_of_Weight, Type_of_waste, status, location]
      );

      return result.rows[0];
    } catch (error) {
      console.error("Error creating sampah:", error);
      throw error;
    }
  },

  // Memperbarui data sampah berdasarkan ID
  updateSampah: async (id, Mass_of_Weight, Type_of_waste, status, location) => {
    try {
      // Cek apakah data sampah dengan ID tersebut ada
      const existingSampah = await pool.query("SELECT * FROM Sampah WHERE ID_sampah = $1", [id]);
      if (existingSampah.rows.length === 0) {
        throw new Error("Sampah not found");
      }

      // Validasi Type_of_waste
      const validWasteTypes = ["organic", "inorganic", "B3"];
      if (!validWasteTypes.includes(Type_of_waste)) {
        throw new Error("Invalid Type_of_waste. Allowed values: 'organic', 'inorganic', 'B3'");
      }

      // Validasi status
      const validStatuses = ["uncompletted", "on progress", "completed"];
      if (!validStatuses.includes(status)) {
        throw new Error("Invalid status. Allowed values: 'uncompletted', 'on progress', 'completed'");
      }

      const result = await pool.query(
        `UPDATE Sampah 
         SET Mass_of_Weight = $2, Type_of_waste = $3, status = $4, location = $5 
         WHERE ID_sampah = $1 RETURNING *`,
        [id, Mass_of_Weight, Type_of_waste, status, location]
      );

      return result.rows[0];
    } catch (error) {
      console.error("Error updating sampah:", error);
      throw error;
    }
  },

  // Menghapus data sampah berdasarkan ID
  deleteSampah: async (id) => {
    try {
      // Cek apakah data sampah dengan ID tersebut ada
      const existingSampah = await pool.query("SELECT * FROM Sampah WHERE ID_sampah = $1", [id]);
      if (existingSampah.rows.length === 0) {
        throw new Error("Sampah not found");
      }

      await pool.query("DELETE FROM Sampah WHERE ID_sampah = $1", [id]);

      return { message: "Sampah deleted successfully" };
    } catch (error) {
      console.error("Error deleting sampah:", error);
      throw error;
    }
  }
};

module.exports = sampahModel;
