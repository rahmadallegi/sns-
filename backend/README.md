# Backend README

This folder contains the Express backend for the SNS project. The API serves content used by the React frontend.

## Setup

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment variables**
   Create a `.env` file at the project root (already present) and define:
   ```text
   PORT=3000
   DB_HOST=your_database_host
   DB_USER=your_db_user
   DB_PASS=your_db_password
   DB_NAME=your_db_name
   CORS_ORIGIN=http://localhost:5173
   NODE_ENV=development
   ```

3. **Run the server**
   ```bash
   npm start
   ```

## Structure

- `server.js` — entry point that loads `app`.
- `src/app.js` — configures middleware and routes.
- `src/routes` — Express routers.
- `src/controllers` — request handlers.
- `src/models` — database query helpers.
- `src/middleware` — custom middleware (validation, error handling, etc.).
- `src/config/database.js` — MySQL connection pool.

## Practices

- All async route handlers are wrapped with `asyncHandler` to forward errors to the centralized error handler.
- Request input is validated using `express-validator`.
- Logging provided by `morgan`; additional logging may be added via a logger utility.
- Static JSON data in controllers can be refactored to database calls as the project grows.
- The API returns consistent `{message: "successful", ...}` responses on success.

## New APIs Added

- `GET /api/who-we-are` - returns company overview, vision/mission/values/strategy, governance image references and certificate cards.
- `GET /api/clients` - returns clients list and compliance sections, with optional `?industry=` filtering.

## Future Enhancements

- Add authentication/authorization (JWT, sessions).
- Move static data to a CMS or database.
- Implement pagination for large lists.
- Add unit and integration tests.
- Add Swagger/OpenAPI documentation.
