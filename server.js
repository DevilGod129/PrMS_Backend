const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

// MIddleware to parse JSON:

app.use(express.json());

// Import routes:

const routes = require("./src/routes/index");
app.use("/api", routes);

//Middlewares:
const logger = require("./src/middlewares/logger");
app.use(logger);

//Start server

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
