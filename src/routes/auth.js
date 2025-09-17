const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middlewares/authMiddleware");

// Register new user
router.post("/register", authController.register);
// Login user
router.post("/login", authController.login);
// Get current user profile (protected)
router.get("/me", auth, authController.me);
// Update current user profile (protected)
router.patch("/me", auth, authController.updateMe);

// Simple ping for browser testing (GET)
router.get("/ping", (req, res) => {
  res.json({ ok: true, route: "/api/auth/ping" });
});

module.exports = router;
