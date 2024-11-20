// routes/nutritionGoalRoutes.js
const express = require('express');
const router = express.Router();
const { setNutritionGoal } = require('../controllers/nutritionGoalController');

// POST route to set nutrition goals
router.post('/nutrition-goals', setNutritionGoal);

module.exports = router;
