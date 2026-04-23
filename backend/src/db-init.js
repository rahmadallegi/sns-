const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function initializeDatabase() {
  try {
    // First connect without database to create it if needed
    const tempConnection = await mysql.createConnection({
      host: process.env.MYSQLHOST ,
      port: process.env.MYSQLPORT ,
      user: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD,
      multipleStatements: true
    });

    const dbName = process.env.MYSQLDATABASE || 'sns_db';
    await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    await tempConnection.end();

    // Now connect to the database
    const connection = await mysql.createConnection({
      host: process.env.MYSQLHOST ,
      port: process.env.MYSQLPORT,
      user: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD ,
      database: dbName,
      multipleStatements: true
    });

    

    const sql = fs.readFileSync(path.join(__dirname, '../migrations/sns_db.sql'), 'utf8');
    await connection.query(sql);
    await connection.end();
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

module.exports = initializeDatabase;