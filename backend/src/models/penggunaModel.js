const pool = require("../config/database");
const bcrypt = require("bcrypt");

const penggunaModel = {
  register: async (name, email, password) => {
    try {
      const userExists = await pool.query("SELECT * FROM Pengguna WHERE email = $1", [email]);
      if (userExists.rows.length > 0) {
        throw new Error("Email already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await pool.query(
        `INSERT INTO Pengguna (name, email, password) VALUES ($1, $2, $3) RETURNING ID_pengguna, name, email`,
        [name, email, hashedPassword]
      );

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const result = await pool.query("SELECT * FROM Pengguna WHERE email = $1", [email]);

      if (result.rows.length === 0) {
        throw new Error("User not found");
      }

      const user = result.rows[0];

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error("Invalid credentials");
      }

      return { ID_pengguna: user.ID_pengguna, name: user.name, email: user.email };
    } catch (error) {
      throw error;
    }
  },

  getUserNameByEmail: async (email) => {
    try {
      const result = await pool.query("SELECT name FROM Pengguna WHERE email = $1", [email]);

      if (result.rows.length === 0) {
        return null;
      }

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
};

module.exports = penggunaModel;
