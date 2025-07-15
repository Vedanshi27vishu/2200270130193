const { nanoid } = require('nanoid');
const { readData, writeData } = require('../utils/fileStorage');
const { logInfo, logError } = require('../middlewares/logger');

const createShortUrl = (req, res) => {
  const { url, validity = 30, shortcode } = req.body;
  const shortCode = shortcode || nanoid(6);
  const expiry = new Date(Date.now() + validity * 60000).toISOString();

  const urls = readData();
  if (urls.find(u => u.shortCode === shortCode)) {
    logError("handler", `Shortcode '${shortCode}' already exists`);
    return res.status(400).json({ error: 'Shortcode already exists' });
  }

  const newUrl = {
    originalUrl: url,
    shortCode,
    createdAt: new Date().toISOString(),
    expiry,
    clicks: 0,
    clickData: []
  };

  urls.push(newUrl);
  writeData(urls);

  logInfo("handler", `Short URL '${shortCode}' created`);


  const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
  res.status(201).json({
    shortLink: `${baseUrl}/${shortCode}`,
    expiry
  });
};

const getUrlStats = (req, res) => {
  const { shortcode } = req.params;
  const urls = readData();
  const record = urls.find(u => u.shortCode === shortcode);

  if (!record) {
    logError("handler", `Shortcode '${shortcode}' not found`);
    return res.status(404).json({ error: 'Short URL not found' });
  }

  logInfo("handler", `Fetched stats for '${shortcode}'`);
  res.json({
    clicks: record.clicks,
    originalUrl: record.originalUrl,
    createdAt: record.createdAt,
    expiry: record.expiry,
    clickData: record.clickData
  });
};

const redirectToOriginalUrl = (req, res) => {
  const { shortcode } = req.params;
  const urls = readData();
  const record = urls.find(u => u.shortCode === shortcode);

  if (!record || new Date() > new Date(record.expiry)) {
    logError("handler", `Shortcode '${shortcode}' expired or invalid`);
    return res.status(404).json({ error: 'Link expired or not found' });
  }

  record.clicks++;
  record.clickData.push({
    timestamp: new Date().toISOString(),
    referrer: req.get('Referrer') || 'unknown',
    location: `IP: ${req.ip}`
  });

  writeData(urls);
  logInfo("handler", `Redirected for '${shortcode}'`);
  res.redirect(record.originalUrl);
};

module.exports = { createShortUrl, getUrlStats, redirectToOriginalUrl };
