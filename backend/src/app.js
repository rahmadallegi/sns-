// app.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
// load and validate configuration before anything else
const config = require("./config");

const homeRoutes = require("./routes/pagesRoutes");
const adminRoutes = require("./routes/adminRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// logging
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

// Middleware
app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(
  "/uploads",
  express.static(path.join(__dirname, "..", "uploads"))
);
app.use(
  "/images",
  express.static(path.join(__dirname, "images"))
);

// Routes
app.use("/api", homeRoutes);
app.use("/api/admin", adminRoutes);

// 404 handler for unknown endpoints
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// error handling (should be after routes)
app.use(errorHandler);

module.exports = app; // export the app for server.js