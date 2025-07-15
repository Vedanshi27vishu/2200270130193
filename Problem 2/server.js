require('dotenv').config();
const express = require('express');
const { logger, logError } = require('./middlewares/logger'); // <-- Fix: import both if needed
const urlRoutes = require('./Routes/urlroutes');
const { registerApp } = require('./services/register'); // ✅ after fixing register.js

const app = express();
app.use(express.json());
app.use(logger);
app.use('/', urlRoutes);

app.listen(process.env.PORT, async () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
  await registerApp(); // ✅ no error now
});
