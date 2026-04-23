require("dotenv").config();
const readline = require("readline");
const db = require("./src/config/database");
const bcrypt = require("bcrypt");

const MIN_PASSWORD_LENGTH = 8;

const createTableSQL = `
  CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );
`;

function parseArgs(argv) {
  const out = {};
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--help" || a === "-h") {
      out.help = true;
      continue;
    }
    const m = /^--(email|password|name)=(.*)$/.exec(a);
    if (m) {
      out[m[1]] = m[2];
      continue;
    }
    if (a === "--email" && argv[i + 1]) {
      out.email = argv[++i];
      continue;
    }
    if (a === "--password" && argv[i + 1]) {
      out.password = argv[++i];
      continue;
    }
    if (a === "--name" && argv[i + 1]) {
      out.name = argv[++i];
      continue;
    }
  }
  return out;
}

function printHelp() {
  console.log(`
Create an admin user (requires database configured in .env).

  npm run create-admin

  node setupAdmin.js
  node setupAdmin.js --email you@company.com --password 'yourPassword' --name 'Your Name'

Options:
  --email      Admin email
  --password   Plain password (min ${MIN_PASSWORD_LENGTH} characters); avoid in shared shells — prefer interactive mode
  --name       Display name

First admin: works anytime. Additional admins: this script always works if you have server/DB access.

API alternative:
  POST /api/admin/auth/register  — allowed when no admins exist yet, or with header X-Admin-Setup-Token if ADMIN_SETUP_TOKEN is set in .env
`);
}

function ask(rl, prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function createAdmin({ email, password, name }) {
  const trimmedEmail = String(email).trim().toLowerCase();
  const trimmedName = String(name).trim();
  if (!trimmedEmail || !password || !trimmedName) {
    console.error("Email, password, and name are required.");
    process.exit(1);
  }
  if (String(password).length < MIN_PASSWORD_LENGTH) {
    console.error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
    process.exit(1);
  }

  await db.query(createTableSQL);

  const [existing] = await db.query("SELECT id FROM admin_users WHERE email = ?", [trimmedEmail]);
  if (existing.length > 0) {
    console.log(`An admin with email "${trimmedEmail}" already exists. Nothing to do.`);
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.query("INSERT INTO admin_users (email, password, name) VALUES (?, ?, ?)", [
    trimmedEmail,
    hashedPassword,
    trimmedName,
  ]);

  console.log("Admin user created successfully.");
  console.log(`  Email: ${trimmedEmail}`);
  console.log(`  Name:  ${trimmedName}`);
  console.log("\nSign in at your frontend: /admin/login");
  process.exit(0);
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    printHelp();
    process.exit(0);
  }

  const hasAllCli = args.email && args.password && args.name;
  if (hasAllCli) {
    try {
      await createAdmin(args);
    } catch (err) {
      console.error("Error:", err.message || err);
      process.exit(1);
    }
    return;
  }

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    console.log("Create admin user (Ctrl+C to cancel)\n");
    const email = (await ask(rl, "Email: ")).trim();
    const name = (await ask(rl, "Name: ")).trim();
    const password = await ask(rl, `Password (min ${MIN_PASSWORD_LENGTH} chars, visible as you type): `);

    rl.close();
    await createAdmin({ email, password, name });
  } catch (err) {
    rl.close();
    console.error("Error:", err.message || err);
    process.exit(1);
  }
}

main();
