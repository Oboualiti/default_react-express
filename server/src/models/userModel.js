const pool = require('../models/db');

async function findUserByEmail(email) {
  const query = 'SELECT id, email, password_hash FROM users WHERE email = $1 LIMIT 1';
  const { rows } = await pool.query(query, [email]);
  return rows[0] || null;
}

module.exports = { findUserByEmail };
