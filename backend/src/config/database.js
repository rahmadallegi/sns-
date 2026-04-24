const mysql = require("mysql2/promise");
const logger = require("../utils/logger");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: { rejectUnauthorized: false },
});

pool.on('connection', (connection) => {
  logger.info('New database connection established');
});

pool.on('error', (err) => {
  logger.error('Database pool error: %o', err);
});

module.exports = pool;
