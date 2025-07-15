const express = require('express');
const urlRoutes = require('./Routes/urlRoutes');
const Log = require('./Middleware/log'); // Import your logging middleware
const app = express();

app.use(express.json());

// Log each incoming request using your logger
app.use(async (req, res, next) => {
  try {
    await Log("backend", "info", "middleware", `${req.method} ${req.url} called`);
  } catch (err) {
    console.error("Logging failed:", err.message);
  }
  next();
});

// Use URL routes
app.use('/shorturls', urlRoutes);

module.exports = app;
