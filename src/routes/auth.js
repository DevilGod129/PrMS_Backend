const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middlewares/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", auth, authController.me);

// Simple ping for browser testing (GET)
router.get("/ping", (req, res) => {
  res.json({ ok: true, route: "/api/auth/ping" });
});

module.exports = router;
