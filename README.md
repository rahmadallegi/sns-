# SNS Project

Full-stack company website: public marketing pages (Who We Are, Services, Projects, Clients, Contact) and a JWT-protected **admin panel** for content, team, services, projects, clients, and contact messages.

## Contents

- [Tech stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Run locally](#run-locally)
- [Production](#production)
- [Project structure](#project-structure)
- [API overview](#api-overview)
- [Troubleshooting](#troubleshooting)
- [Security checklist](#security-checklist)
- [License](#license)

## Tech stack

| Layer    | Stack |
| -------- | ----- |
| Frontend | React 19, Vite, TypeScript, Tailwind CSS, Radix UI |
| Backend  | Node.js, Express, MySQL (`mysql2`) |
| Auth     | JWT for admin routes |

## Prerequisites

- **Node.js** 18 or newer  
- **MySQL** 8+ (or compatible MariaDB)  
- **npm**  
- MySQL client (for importing SQL), e.g. `mysql` CLI or MySQL Workbench  

## Setup

### 1. Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2. Database

Create an empty database (name should match `DB_NAME` in `backend/.env`, e.g. `sns_db`):

```sql
CREATE DATABASE sns_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Import the schema and seed data:

**macOS / Linux (bash)**

```bash
mysql -u your_user -p sns_db < backend/migrations/sns_db.sql
```

**Windows (PowerShell, from the project root)**

```powershell
Get-Content backend\migrations\sns_db.sql | mysql -u your_user -p sns_db
```

Adjust host/port if needed (e.g. `-h 127.0.0.1`).

### 3. Environment variables

Do **not** commit `.env` files. Copy the examples and edit values locally.

**Backend** — from `backend/`:

```bash
# macOS / Linux
cp .env.example .env
```

```powershell
# Windows PowerShell
Copy-Item .env.example .env
```

| Variable | Description |
| -------- | ----------- |
| `PORT` | API port (default `3000` if omitted) |
| `NODE_ENV` | Use `production` in production |
| `DB_HOST` | MySQL host |
| `DB_USER` | MySQL user |
| `DB_PASS` | MySQL password |
| `DB_NAME` | Database name |
| `CORS_ORIGIN` | Exact browser origin of the frontend (no trailing path), e.g. `http://localhost:5173` or `https://www.example.com` |
| `JWT_SECRET` | Long random string for signing admin JWTs |
| `ADMIN_SETUP_TOKEN` | (Optional) Shared secret to allow `POST /api/admin/auth/register` when an admin already exists; send header `X-Admin-Setup-Token` with the same value. Remove or rotate after use. |

**Frontend** — from `frontend/`:

```bash
cp .env.example .env
```

```powershell
Copy-Item .env.example .env
```

| Variable | Description |
| -------- | ----------- |
| `VITE_API_BASE_URL` | Public API base URL, **no trailing slash**, e.g. `http://localhost:3000` or `https://api.example.com` |

Rebuild the frontend after changing `VITE_*` variables (`npm run build` for production).

### 4. Admin users

**Option A — CLI (recommended)**  

From `backend/` (interactive prompts for email, name, password; password is shown as you type):

```bash
npm run create-admin
```

Non-interactive (use only on a trusted machine; password may appear in shell history):

```bash
node setupAdmin.js --email you@company.com --password 'YourSecurePass' --name 'Site Admin'
```

Passwords must be at least **8 characters**. The script creates `admin_users` if needed and refuses duplicate emails.

**Option B — HTTP API**  

`POST /api/admin/auth/register` with JSON body `{ "email", "password", "name" }`.

- If **no** admins exist yet, the first registration is allowed (bootstrap).  
- If admins already exist, set `ADMIN_SETUP_TOKEN` in `backend/.env` and send header `X-Admin-Setup-Token: <same value>`. Unset or change the token after onboarding.  

**Seed / demo database**  

If you imported `backend/migrations/sns_db.sql`, a default admin may already be in the dump. Change that password before production.

- Email: `admin@example.com`  
- Password: `admin123`  

**Admin UI:** `/admin/login` (e.g. `http://localhost:5173/admin/login`).

## Run locally

**Backend** (watch mode, restarts on file changes):

```bash
cd backend
npm run dev
```

**Backend** (no file watcher — closer to production):

```bash
cd backend
npm start
```

**Frontend**:

```bash
cd frontend
npm run dev
```

**URLs**

- Frontend: `http://localhost:5173`  
- Backend: `http://localhost:3000` (try `GET /api/health` to verify)  

## Production

### Frontend

```bash
cd frontend
npm run build
```

Static assets are in `frontend/dist`. Serve that folder with any static host (nginx, Apache, S3 + CloudFront, Netlify, Vercel, etc.). Ensure `VITE_API_BASE_URL` points to your **public** API URL before building.

### Backend

- Set `NODE_ENV=production`.  
- Set a strong, unique `JWT_SECRET`.  
- Set `CORS_ORIGIN` to the **exact** origin where the SPA is served (scheme + host + port if non-default).  
- On the server, install dependencies without dev tools if you prefer:

  ```bash
  cd backend
  npm install --omit=dev
  npm start
  ```

Use a process manager (systemd, PM2, Docker, or your platform’s equivalent) so the API restarts on failure and on reboot. Terminate TLS (HTTPS) at a reverse proxy or load balancer in front of Node.

### Repository hygiene

- `.env` and `node_modules` are ignored by Git; only commit `.env.example` and lockfiles.  
- If secrets were ever committed in the past, rotate them and avoid relying on Git history alone for confidentiality.

## Project structure

```
sns_project - V1/
├── backend/
│   ├── migrations/       # SQL schema (e.g. sns_db.sql)
│   ├── src/
│   │   ├── config/       # DB and app config
│   │   ├── controllers/
│   │   ├── middleware/   # auth, validation, errors
│   │   ├── routes/
│   │   └── utils/
│   ├── server.js
│   ├── setupAdmin.js
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/          # API clients
│   │   └── pages/
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── .env.example
└── README.md
```

## API overview

**Public**

- `GET /api/health`  
- `GET /api/index`  
- `GET /api/services`  
- `GET /api/projects`  
- `GET /api/team`  
- `GET /api/who-we-are`  
- `GET /api/clients`  
- `POST /api/contact`  

**Admin auth**

- `POST /api/admin/auth/register` — create admin (first user only, or with `X-Admin-Setup-Token` when `ADMIN_SETUP_TOKEN` is set; see [Admin users](#4-admin-users))  
- `POST /api/admin/auth/login`  
- `GET /api/admin/auth/verify`  

**Admin** (JWT required on other routes)

- CRUD under `/api/admin/` for about cards, services, projects, team, departments, clients, and contact messages  

## Troubleshooting

| Issue | What to check |
| ----- | --------------- |
| Missing packages | Run `npm install` in both `backend` and `frontend`. |
| DB connection errors | `backend/.env` (`DB_*`), MySQL running, database created, user grants. |
| CORS errors in the browser | `CORS_ORIGIN` must match the frontend URL exactly (including `http` vs `https` and port). |
| API calls fail in production build | Rebuild frontend after setting `VITE_API_BASE_URL`; value is baked in at build time. |
| Contact message status updates | Ensure the `messages` table includes a `status` column (see migration / schema). |

## Security checklist

Before go-live:

- [ ] Change default admin password (and email if desired).  
- [ ] Use a long, random `JWT_SECRET` (not a dictionary word).  
- [ ] Serve the app over **HTTPS** in production.  
- [ ] Restrict MySQL to trusted hosts; use least-privilege DB user.  
- [ ] Keep Node dependencies updated (`npm audit` in both apps).  
- [ ] Do not leave `ADMIN_SETUP_TOKEN` set in production after you finish creating extra admins.  

## License

ISC
"# sns-" 
