const express = require('express');
const router = express.Router();
const {
  createShortUrl,
  getUrlStats,
  redirectToOriginalUrl
} = require('../controllers/shortUrlcontroller');

router.post('/shorturls', createShortUrl);
router.get('/shorturls/:shortcode', getUrlStats);
router.get('/:shortcode', redirectToOriginalUrl);

module.exports = router;
