# Admin Panel Setup & Troubleshooting Guide

## ⚠️ SECURITY NOTICE - PRODUCTION DEPLOYMENT

**CRITICAL**: Before deploying to production:
1. **Generate a strong JWT_SECRET** - Use `openssl rand -base64 32` or similar
2. **Change all default credentials** - Never use hardcoded default passwords
3. **Set NODE_ENV=production** in backend
4. **Configure CORS_ORIGIN** to your actual frontend domain
5. **Ensure VITE_API_BASE_URL** points to your production API
6. **Delete or disable the `setupAdmin.js` utility** after initial admin creation
7. **Rotate JWT_SECRET and ADMIN_SETUP_TOKEN** regularly
8. **Use environment-specific configuration** - Never hardcode sensitive values

See backend/.env.example and frontend/.env.example for all required configuration.

## ✅ Development Environment Setup
- Database: Configure with DB_HOST, DB_USER, DB_PASS, DB_NAME
- Admin User: Create via `npm run create-admin` in backend/
- API Server: Runs on PORT specified in .env (default 3000)
- Authentication: JWT-based, configured in .env

## 🚀 Quick Start (Development Only)


### 1. **Start Backend Server**
```bash
cd backend
npm start
```
The server will run on `http://localhost:3000`

### 2. **Start Frontend Server** (in a new terminal)
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:5173`

### 3. **Create Admin User** (Backend)
If this is your first time setting up, create an admin user:
```bash
cd backend
npm run create-admin
```
Follow the prompts to create your admin account with a strong password (minimum 8 characters).

### 4. **Access Admin Panel**
- Go to: `http://localhost:5173/admin/login`
- Use the email and password you created in step 3

## 📋 API Status

### Public Endpoints (No Auth Required)
- ✅ `GET /api/health` - Health check
- ✅ `GET /api/index` - Homepage data
- ✅ `GET /api/services` - All services
- ✅ `GET /api/projects` - All projects
- ✅ `GET /api/team` - Team members
- ✅ `GET /api/who-we-are` - Company info
- ✅ `GET /api/clients` - Clients list

### Admin Endpoints (Auth Required)
- ✅ `POST /api/admin/auth/login` - Login
- ✅ `POST /api/admin/auth/register` - Register
- ✅ `GET /api/admin/about-cards` - Get about cards
- ✅ `POST/PUT/DELETE /api/admin/about-cards` - Manage about cards
- ✅ `GET/POST/PUT/DELETE /api/admin/services` - Manage services
- ✅ `GET/POST/PUT/DELETE /api/admin/projects` - Manage projects
- ✅ `GET/POST/PUT/DELETE /api/admin/team` - Manage team
- ✅ `GET/POST/PUT/DELETE /api/admin/clients` - Manage clients

## 🔧 Troubleshooting

### Issue: "Cannot find module" errors
**Solution:** Reinstall dependencies
```bash
cd backend
npm install

cd ../frontend
npm install
```

### Issue: Database connection errors
**Solution:** Check `.env` file in backend directory has:
```
DB_HOST=localhost
DB_USER=root
DB_PASS=aziza
DB_NAME=sns_db
```

### Issue: Admin login fails
**Solution:** Reset admin user
```bash
cd backend
node setupAdmin.js
```

### Issue: Blank admin dashboard
**Cause:** Token not stored or API not responding
**Solution:**
1. Open browser DevTools (F12)
2. Go to Application > Local Storage
3. Check if `adminToken` exists
4. Check Network tab to see if `/api/admin/*` requests are working

## 📁 File Structure

```
backend/
├── .env (Database config)
├── setupAdmin.js (Setup script)
├── server.js (Entry point)
├── src/
│   ├── app.js (Express app)
│   ├── config/
│   │   ├── database.js
│   │   └── index.js
│   ├── controllers/
│   │   ├── adminAuthController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── authMiddleware.js (JWT verification)
│   │   └── errorHandler.js
│   └── routes/
│       ├── pagesRoutes.js (Public)
│       └── adminRoutes.js (Admin)

frontend/
├── .env.local (API URL)
├── src/
│   ├── App.tsx (Routes setup)
│   ├── lib/
│   │   ├── api.ts (HTTP helpers)
│   │   └── adminApi.ts (Admin API functions)
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── AdminLogin.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── AboutPage.tsx
│   │   │   ├── ServicesPage.tsx
│   │   │   ├── ProjectsPage.tsx
│   │   │   ├── TeamPage.tsx
│   │   │   └── ClientsPage.tsx
│   └── components/
│       ├── admin/AdminLayout.tsx
│       └── auth/ProtectedRoute.tsx
```

## 🔐 Admin Features

### Dashboard
- View total projects, services, team members, clients
- See recent projects list
- Summary statistics

### About Cards
- Create, edit, delete about cards
- Real-time database sync

### Services Management
- View all services
- Delete services (edit coming soon)

### Projects Management  
- View all projects by category
- Delete projects (edit coming soon)

### Team Management
- View all team members
- View departments
- Delete members (edit coming soon)

### Clients Management
- View all clients
- Manage client information
- Delete clients (edit coming soon)

## 🎯 Next Steps (Optional Features)

1. **Add Edit Modals** for Services, Projects, Team
2. **Add Image Upload** functionality
3. **Add Create Buttons** to quickly add items
4. **Add Dashboard Charts** for better analytics
5. **Add Bulk Operations** for managing multiple items

---

**Last Update:** March 16, 2026  
**Status:** ✅ All systems operational
