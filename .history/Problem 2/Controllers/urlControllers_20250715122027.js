const shortid = require('shortid');
const Log = require('../Pro');
const logs = require("../../")

let urlDatabase = {}; // In-memory for now

exports.createShortUrl = async (req, res) => {
  try {
    const { url, validity = 30, shortcode } = req.body;

    if (!url) {
      await Log("backend", "error", "controller", "Missing URL");
      return res.status(400).json({ error: "URL is required" });
    }

    let code = shortcode || shortid.generate();

    if (urlDatabase[code]) {
      return res.status(409).json({ error: "Shortcode already exists" });
    }

    const createdAt = new Date();
    const expiresAt = new Date(createdAt.getTime() + validity * 60000);

    urlDatabase[code] = {
      url,
      createdAt,
      expiresAt,
      clicks: [],
    };

    await Log("backend", "info", "controller", `Short URL created: ${code}`);

    res.status(201).json({
      shortLink: `http://localhost:9001/shorturls/${code}`,
      expiry: expiresAt.toISOString()
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getUrlStats = (req, res) => {
  const code = req.params.shortcode;
  const entry = urlDatabase[code];

  if (!entry) return res.status(404).json({ error: "Shortcode not found" });

  res.json({
    clicks: entry.clicks.length,
    originalUrl: entry.url,
    createdAt: entry.createdAt,
    expiresAt: entry.expiresAt,
    clickDetails: entry.clicks,
  });
};

exports.redirectToOriginal = (req, res) => {
  const code = req.params.shortcode;
  const entry = urlDatabase[code];

  if (!entry) return res.status(404).json({ error: "Shortcode not found" });

  const now = new Date();
  if (now > entry.expiresAt) {
    return res.status(410).json({ error: "Link expired" });
  }

  // Track click
  entry.clicks.push({
    timestamp: now,
    referrer: req.get("Referrer") || "direct",
    location: "IN" // Replace with IP-based lookup later
  });

  res.redirect(entry.url);
};
