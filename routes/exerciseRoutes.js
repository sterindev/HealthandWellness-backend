const express = require('express');
const { logExercise, getExerciseLogs } = require('../controllers/exerciseController');
const router = express.Router();

// Route to log exercise
router.post('/', logExercise);

// Route to get all exercise logs
router.get('/', getExerciseLogs);

module.exports = router;
