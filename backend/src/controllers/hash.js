// DEVELOPMENT ONLY: Utility to hash admin passwords
// This file should only be used during development setup
// SECURITY WARNING: Never hardcode passwords in production code
// Use environment variables or secure password management instead

const bcrypt = require("bcrypt");

async function hash() {
  // WARNING: This uses a hardcoded password for development only
  // In production, passwords should be provided via environment variables
  const password = process.env.ADMIN_PASSWORD_SETUP || "admin123";
  
  if (process.env.NODE_ENV === 'production') {
    throw new Error("This development utility cannot be used in production. Use proper password management instead.");
  }
  
  const hashed = await bcrypt.hash(password, 10);
  console.log(hashed);
}

hash();