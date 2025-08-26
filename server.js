require('dotenv').config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const authRoutes = require("./src/routes/auth");
const authMiddleware = require("./src/middlewares/authMiddleware");
// MIddleware to parse JSON:

app.use(express.json());

// Import routes:

const routes = require("./src/routes/index");
app.use("/api", routes);

// Public routes
app.use("/api/auth", authRoutes);

// Example protected route
app.get("/api/secret", authMiddleware, (req, res) => {
  res.json({ message: `Welcome, user ${req.user.email}! This is a protected route.` });
});

// Connect database: 

const connectDB = require('./src/config/db');
connectDB();

//Error Handlers: 

const errorHandler = require('./src/middlewares/errorHandler');
app.use(errorHandler);

//Middlewares:
const logger = require("./src/middlewares/logger");
app.use(logger);

//Start server

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
