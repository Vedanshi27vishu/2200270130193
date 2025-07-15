const express = require('express');
const app = express();
const Log = require('./Middleware/log');
const homeRoute = require('./Routes/homeRoutes');

app.use(express.json());

app.use(async (req, res, next) => {
    try {
        await Log("backend", "info", "middleware", `Incoming ${req.method} request to ${req.url}`);
    } catch (err) {
        console.error("Logging Error (non-blocking):", err.message);
    }
    next();
});

app.use("/", homeRoute);

app.use(async (err, req, res, next) => {
    try {
        await Log("backend", "error", "handler", err.message);
    } catch (logErr) {
        console.error("Failed to log error:", logErr.message);
    }
    res.status(500).send("Internal Server Error");
});

module.exports = app;
