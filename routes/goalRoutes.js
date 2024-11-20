// routes/goalRoutes.js
const express = require('express');
const router = express.Router();
const { setGoals, updateProgress } = require('../controllers/goalController');

// Set Goals Route
router.post('/goals', setGoals);

// Update Progress Route
router.post('/progress', updateProgress);

module.exports = router;
