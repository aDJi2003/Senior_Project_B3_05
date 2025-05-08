const { query } = require("../config/database");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const penggunaModel = {
  register: async (name, email, password, profileImageURL) => {
    try {
      const userExists = await query(
        "SELECT * FROM Pengguna WHERE email = $1",
        [email]
      );
      if (userExists.rows.length > 0) throw new Error("Email already exists");

      const idPengguna = uuidv4();
      const hashedPassword = await bcrypt.hash(password, 10);

      const { rows } = await query(
        `INSERT INTO Pengguna (ID_pengguna, name, email, password, profile_image) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING ID_pengguna, name, email, profile_image`,
        [idPengguna, name, email, hashedPassword, profileImageURL]
      );

      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const { rows } = await query("SELECT * FROM Pengguna WHERE email = $1", [
        email,
      ]);
      if (rows.length === 0) throw new Error("User not found");

      const user = rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) throw new Error("Invalid credentials");

      return {
        ID_pengguna: user.id_pengguna,
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
      const { rows } = await query(
        "SELECT ID_pengguna, name, email, profile_image FROM Pengguna WHERE ID_pengguna = $1",
        [id_pengguna]
      );
      if (rows.length === 0) return null;
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  updateProfile: async (userId, { name, email, profileImageURL }) => {
    try {
      const fields = [];
      const values = [];
      let idx = 1;

      if (name) {
        fields.push(`name = $${idx++}`);
        values.push(name);
      }
      if (email) {
        fields.push(`email = $${idx++}`);
        values.push(email);
      }
      if (profileImageURL) {
        fields.push(`profile_image = $${idx++}`);
        values.push(profileImageURL);
      }

      if (fields.length === 0) return null;

      values.push(userId);
      const sqlQuery = `
        UPDATE Pengguna
        SET ${fields.join(", ")}
        WHERE ID_pengguna = $${idx}
        RETURNING ID_pengguna, name, email, profile_image
      `;
      console.log("Executing query:", sqlQuery, "with values:", values); // Debug log
      const { rows } = await query(sqlQuery, values);
      console.log("Query result:", rows); // Debug log
      return rows[0] || null;
    } catch (err) {
      console.error("Error in updateProfile:", err.message); // Debug log
      throw new Error("Error updating profile: " + err.message);
    }
  },
};

module.exports = penggunaModel;
