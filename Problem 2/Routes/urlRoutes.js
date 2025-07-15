const express = require('express');
const router = express.Router();
const {
  createShortUrl,
  getUrlStats,
  redirectToOriginal
} = require('../Controllers/urlController');

// Create Short URL
router.post('/', createShortUrl);

// Get stats
router.get('/:shortcode', getUrlStats);

// Redirect (you may optionally separate this if needed)
router.get('/:shortcode/redirect', redirectToOriginal);

module.exports = router;
