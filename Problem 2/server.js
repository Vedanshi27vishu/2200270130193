require('dotenv').config();
const express = require('express');
const logger = require('./middlewares/logger');
const urlRoutes = require('./Routes/urlroutes');
const { registerApp } = require('./services/register');

const app = express();
app.use(express.json());
app.use(logger);
app.use('/', urlRoutes);

app.listen(process.env.PORT, async () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
  await registerApp();
});
