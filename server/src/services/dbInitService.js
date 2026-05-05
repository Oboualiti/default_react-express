const bcrypt = require('bcryptjs');
const pool = require('../models/db');

async function initializeDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash TEXT NOT NULL
    );
  `);

  const demoEmail = 'admin@example.com';
  const demoPassword = 'admin123';

  const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [demoEmail]);

  if (existingUser.rowCount === 0) {
    const hashedPassword = await bcrypt.hash(demoPassword, 10);

    await pool.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2)',
      [demoEmail, hashedPassword]
    );

    console.log('Demo user created: admin@example.com / admin123');
  }
}

module.exports = { initializeDatabase };
