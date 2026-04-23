const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../config/database");
const logger = require("../utils/logger");

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("CRITICAL: JWT_SECRET environment variable is not set. Cannot start application.");
}
const JWT_EXPIRY = "7d";

const MIN_PASSWORD_LENGTH = 8;

const ENSURE_ADMIN_USERS_TABLE = `
  CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );
`;

async function getAdminCount() {
  const [rows] = await db.query("SELECT COUNT(*) AS total FROM admin_users");
  return Number(rows[0]?.total ?? 0);
}

function isSetupTokenValid(req) {
  const token = process.env.ADMIN_SETUP_TOKEN;
  if (!token || String(token).trim() === "") {
    return false;
  }
  const header = req.headers["x-admin-setup-token"];
  return typeof header === "string" && header === token;
}

// Register admin user (bootstrap: first admin only, or with ADMIN_SETUP_TOKEN header)
const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: "Email, password, and name are required" });
    }

    if (String(password).length < MIN_PASSWORD_LENGTH) {
      return res.status(400).json({ message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` });
    }

    await db.query(ENSURE_ADMIN_USERS_TABLE);

    const adminCount = await getAdminCount();
    if (adminCount > 0 && !isSetupTokenValid(req)) {
      return res.status(403).json({
        message:
          "Admin registration is closed. Use npm run create-admin on the server, or set ADMIN_SETUP_TOKEN in .env and send header X-Admin-Setup-Token on this request.",
      });
    }

    // Check if admin already exists
    const [existing] = await db.query("SELECT id FROM admin_users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(409).json({ message: "Admin user already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert admin user
    await db.query("INSERT INTO admin_users (email, password, name) VALUES (?, ?, ?)", [
      email,
      hashedPassword,
      name,
    ]);

    logger.info(`New admin registered: ${email}`);
    return res.status(201).json({ message: "Admin user registered successfully" });
  } catch (err) {
    logger.error("Registration error: %o", err);
    next(err);
  }
};

// Login admin user
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Get admin user
    const [users] = await db.query("SELECT id, email, password, name FROM admin_users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const admin = users[0];

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin.id, email: admin.email, name: admin.name },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRY }
    );

    logger.info(`Admin logged in: ${email}`);
    return res.json({ message: "Login successful", token, admin: { id: admin.id, email: admin.email, name: admin.name } });
  } catch (err) {
    logger.error("Login error: %o", err);
    next(err);
  }
};

// Verify token
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    return res.json({ message: "Token is valid", admin: decoded });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { register, login, verifyToken };
