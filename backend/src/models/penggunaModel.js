const pool = require("../config/database");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const penggunaModel = {
  register: async (name, email, password, profileImageURL) => {
    try {
      const userExists = await pool.query("SELECT * FROM Pengguna WHERE email = $1", [email]);
      if (userExists.rows.length > 0) throw new Error("Email already exists");

      const idPengguna = uuidv4();
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await pool.query(
        `INSERT INTO Pengguna (ID_pengguna, name, email, password, profile_image) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING ID_pengguna, name, email, profile_image`,
        [idPengguna, name, email, hashedPassword, profileImageURL]
      );

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const result = await pool.query("SELECT * FROM Pengguna WHERE email = $1", [email]);
      if (result.rows.length === 0) throw new Error("User not found");

      const user = result.rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) throw new Error("Invalid credentials");

      return {
        ID_pengguna: user.id_pengguna, // <-- perbaikan di sini
        name: user.name,
        email: user.email,
        profile_image: user.profile_image,
      };
    } catch (error) {
      throw error;
    }
  },

  getUserById: async (id_pengguna) => {
    try {
      const result = await pool.query(
        "SELECT ID_pengguna, name, email, profile_image FROM Pengguna WHERE ID_pengguna = $1",
        [id_pengguna]
      );
      if (result.rows.length === 0) return null;
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },
};

module.exports = penggunaModel;
