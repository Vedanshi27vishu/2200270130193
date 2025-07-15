const { logInfo } = require('../../Problem 1/Middleware/log');

module.exports = (req, res, next) => {
  logInfo("handler", `${req.method} ${req.originalUrl}`);
  next();
};
