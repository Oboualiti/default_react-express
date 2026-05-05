const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME || 'expressjstest',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'ccnn123',
});

module.exports = pool;
