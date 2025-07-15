const express = require('express');
const router = express.Router();
const { home } = require('../Controllers/homeController');

router.get("/", (req, res) => {
    res.send("Welcome to the server!");
});

router.post("/log", home); 

module.exports = router;
