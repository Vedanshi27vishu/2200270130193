function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

function logError(error) {
  console.error(error);
}

function logInfo(source, message) {
  console.log(`[INFO] [${source}] ${message}`);
}

module.exports = {
  logger,
  logError,
  logInfo
};
