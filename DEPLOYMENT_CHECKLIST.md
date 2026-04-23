# Production Deployment Checklist

This checklist ensures your SNS application is properly configured for production deployment with no hardcoded local variables.

## ✅ Pre-Deployment Requirements

### Backend Configuration (.env)

- [ ] `NODE_ENV=production` - Set to production mode
- [ ] `PORT` - Configure appropriate port (default 3000)
- [ ] `DB_HOST` - Set to production database host (NOT localhost)
- [ ] `DB_USER` - Configure production database user
- [ ] `DB_PASS` - Use strong database password (NOT dev password)
- [ ] `DB_NAME` - Production database name
- [ ] `CORS_ORIGIN` - Set to **exact** frontend domain (e.g., `https://yourdomain.com`)
  - Must NOT include trailing slash
  - Must match frontend deployment URL
- [ ] `JWT_SECRET` - **CRITICAL**: Generate strong random secret
  ```bash
  # Generate on Unix/Linux/Mac:
  openssl rand -base64 32
  
  # Or use this Node.js command:
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- [ ] `UPLOADS_URL_PREFIX` - (Optional) Set to match your CDN or storage service
- [ ] `UPLOAD_DIR` - (Optional) Set to production upload directory path

### Frontend Configuration (.env)

- [ ] `VITE_API_BASE_URL` - Set to **production API URL**
  - Must be `https://` in production
  - Must NOT include trailing slash
  - Examples: `https://api.yourdomain.com`, `https://yourdomain.com/api`
  - Must NOT use `localhost` or `127.0.0.1`

### Sensitive Variables

- [ ] Generate and store JWT_SECRET securely (use secrets manager)
- [ ] Use environment-specific values for all credentials
- [ ] Never hardcode passwords or API keys
- [ ] Rotate JWT_SECRET and ADMIN_SETUP_TOKEN after initial setup
- [ ] Use `.env` files that are gitignored (never commit `.env` to git)

## ✅ Code Verification

### Backend Files Checked
- [x] `backend/src/controllers/adminAuthController.js` - JWT_SECRET from env only
- [x] `backend/src/middleware/authMiddleware.js` - JWT_SECRET from env only
- [x] `backend/src/config/index.js` - CORS_ORIGIN from env
- [x] `backend/src/middleware/upload.js` - Upload directory from env
- [x] `backend/src/controllers/adminController.js` - URL prefix from env
- [x] `backend/src/controllers/hash.js` - Development-only with warnings
- [x] `backend/.env.example` - Updated with production guidance

### Frontend Files Checked
- [x] `frontend/src/lib/api.ts` - Requires VITE_API_BASE_URL in env
- [x] `frontend/src/lib/adminApi.ts` - Uses centralized API_BASE_URL
- [x] `frontend/src/pages/Index.tsx` - Uses API_BASE_URL from lib
- [x] `frontend/src/pages/WhoWeAre.tsx` - Uses API_BASE_URL from lib
- [x] `frontend/vite.config.ts` - Proxy uses env variable
- [x] `frontend/.env.example` - Updated with production guidance

## ✅ Pre-Deployment Tasks

### 1. Build Frontend
```bash
cd frontend
npm run build
```
Verify no build errors occur. The build should succeed even with empty .env values for VITE_API_BASE_URL (will fail at runtime if not set).

### 2. Database Migration
```bash
# Run migrations on production database
mysql -u prod_user -p prod_database < backend/migrations/sns_db.sql
```

### 3. Create Admin User
```bash
cd backend
# Interactive mode (recommended)
npm run create-admin

# Or non-interactive (use with caution - password may appear in shell history)
node setupAdmin.js --email "admin@yourdomain.com" --password "STRONG_PASSWORD_HERE" --name "Admin Name"
```

### 4. Test Environment Variables
Before starting server, verify all environment variables are loaded:
```bash
# Backend - check all vars are set
node -e "console.log(process.env)"

# Frontend - verify build uses correct API URL
grep -r "localhost" dist/ && echo "ERROR: Found localhost in build!" || echo "OK: No localhost in build"
```

### 5. Security Hardening
- [ ] Disable `backend/src/controllers/hash.js` in production
- [ ] Rotate JWT_SECRET periodically
- [ ] Remove or rotate ADMIN_SETUP_TOKEN after initial admin creation
- [ ] Enable HTTPS/TLS on all endpoints
- [ ] Configure firewall rules for database access
- [ ] Set up regular database backups
- [ ] Configure request rate limiting
- [ ] Enable security headers (HSTS, CSP, etc.)

### 6. Environment-Specific Settings
- [ ] Development `.env` uses localhost URLs
- [ ] Staging `.env` uses staging domain
- [ ] Production `.env` uses production domain
- [ ] All `.env` files are gitignored
- [ ] Use secrets manager for production credentials

## ✅ Post-Deployment Verification

### Health Checks
```bash
# Test API connectivity
curl https://yourdomain.com/api/health

# Test frontend loads without errors
curl https://yourdomain.com/admin/login
```

### Logging & Monitoring
- [ ] Verify backend logs show no hardcoded values
- [ ] Monitor API response times
- [ ] Set up error tracking (Sentry, DataDog, etc.)
- [ ] Configure log aggregation
- [ ] Set up uptime monitoring

### Performance
- [ ] Frontend loads with correct API base URL
- [ ] API requests complete successfully
- [ ] Image uploads work with correct URL paths
- [ ] Database queries execute without errors

## ✅ Documentation

- [x] `ADMIN_SETUP.md` - Updated with production warnings
- [x] `backend/.env.example` - Updated with descriptions and guidance
- [x] `frontend/.env.example` - Updated with descriptions and guidance
- [x] `README.md` - Contains deployment instructions

## ✅ Environment Variables Reference

### Required for Production
| Variable | Value | Example |
|----------|-------|---------|
| `NODE_ENV` | `production` | `production` |
| `DB_HOST` | Production database host | `db.production.com` |
| `DB_USER` | Database user | `prod_user` |
| `DB_PASS` | Strong database password | `$(openssl rand -base64 16)` |
| `DB_NAME` | Database name | `sns_prod` |
| `CORS_ORIGIN` | Frontend domain | `https://yourdomain.com` |
| `JWT_SECRET` | 32-byte random string | `$(openssl rand -base64 32)` |
| `VITE_API_BASE_URL` | API domain | `https://api.yourdomain.com` |

### Optional for Production
| Variable | Default | When to Use |
|----------|---------|-------------|
| `PORT` | `3000` | If not using 3000 |
| `UPLOAD_DIR` | `./uploads/clients` | If using cloud storage |
| `UPLOADS_URL_PREFIX` | `/uploads` | If using CDN |
| `ADMIN_SETUP_TOKEN` | (none) | For additional admin registration |

## ✅ Troubleshooting

### Issue: API requests fail with 403/CORS errors
**Solution**: Verify `CORS_ORIGIN` matches exactly your frontend URL (no trailing slash)

### Issue: Images show as broken links
**Solution**: Check `UPLOADS_URL_PREFIX` and ensure upload directory is accessible

### Issue: Authentication fails
**Solution**: Verify `JWT_SECRET` matches between backend and frontend auth calls

### Issue: API URL points to localhost
**Solution**: Set `VITE_API_BASE_URL` in frontend `.env` before building

## ✅ Additional Resources

- See `backend/.env.example` for backend configuration details
- See `frontend/.env.example` for frontend configuration details
- See `ADMIN_SETUP.md` for admin user creation and troubleshooting
- See `README.md` for complete setup and architecture documentation

---

**Last Updated**: April 2026  
**Status**: All hardcoded local variables have been removed and replaced with environment variables.
