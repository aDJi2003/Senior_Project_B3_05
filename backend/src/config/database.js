// src/config/database.js
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
  keepAlive: true,
  keepAliveInitialDelayMillis: 60000,
});

pool.on("connect", client => {
  console.log(`database client ${client.processID} connected`);
});

pool.on("error", err => {
  console.error("database idle client error:", err.code);
});

async function query(text, params) {
  try {
    return await pool.query(text, params);
  } catch (err) {
    if (['ECONNRESET', 'EPIPE', 'ECONNREFUSED'].includes(err.code) || err.message.includes('terminated unexpectedly')) {
      console.warn("database query error, retrying once:", err.code);
      try {
        await pool.connect();
        return await pool.query(text, params);
      } catch (retryErr) {
        console.error("database retry failed:", retryErr.code);
        throw retryErr;
      }
    }
    throw err;
  }
}

module.exports = { query };
