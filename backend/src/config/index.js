// central application configuration

// no required environment variables at startup; defaults are provided below

// optional database configuration; log if missing
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME) {
  console.warn('Database environment variables are not fully configured; database queries will likely fail.');
}
if (!process.env.JWT_SECRET && process.env.NODE_ENV === 'production') {
  console.warn('JWT_SECRET is not set; authentication may be insecure.');
}

module.exports = {
  port: process.env.PORT || 3000,
  corsOrigin: process.env.CORS_ORIGIN || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5173'),
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    name: process.env.DB_NAME,
  },
};