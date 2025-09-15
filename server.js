require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const authRoutes = require("./src/routes/auth");
const authMiddleware = require("./src/middlewares/authMiddleware");
const logger = require("./src/middlewares/logger");
const cors = require("cors");
// MIddleware to parse JSON:

app.use(express.json());
// CORS for frontend
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// Request logger
app.use(logger);

// Import routes:

const routes = require("./src/routes/index");
app.use("/api", routes);

// Public routes
app.use("/api/auth", authRoutes);

// Health check routes for quick testing from browser/phone
app.get("/", (req, res) => {
  res.send("PRMS Backend OK");
});
app.get("/api/health", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Example protected route
app.get("/api/secret", authMiddleware, (req, res) => {
  res.json({
    message: `Welcome, user ${req.user.email}! This is a protected route.`,
  });
});

// Connect database and then start server
const connectDB = require("./src/config/db");

async function start() {
  await connectDB();

  // Error Handler (keep last)
  const errorHandler = require("./src/middlewares/errorHandler");
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
}

start();
