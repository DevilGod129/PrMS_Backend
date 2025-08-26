const express = require("express");
const router = express.Router();
const sampleController = require("../controllers/samplecontroller");

//GET request:

router.get("/", (req, res) => {
  res.send("🚀 Welcome to Express Boilerplate");
});

// Sample route from controller:

router.get("/hello", sampleController.sayHello);

module.exports = router;
