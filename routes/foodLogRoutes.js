const express = require('express');
const router = express.Router();
const FoodLog = require('../models/FoodLog');

// @route POST /api/foodlogs
// @desc Add a new food log
// @access Public
router.post('/', async (req, res) => {
  try {
    const { foodName, calories, protein, carbs, fat, mealType } = req.body;

    // Validate input
    if (!foodName || !calories || !protein || !carbs || !fat || !mealType) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create and save the food log
    const foodLog = new FoodLog({
      foodName,
      calories,
      protein,
      carbs,
      fat,
      mealType,
    });

    await foodLog.save();
    res.status(201).json({ message: 'Food log added successfully', foodLog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route GET /api/foodlogs
// @desc Get all food logs
// @access Public
router.get('/', async (req, res) => {
  try {
    const foodLogs = await FoodLog.find().sort({ createdAt: -1 });
    res.status(200).json(foodLogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

module.exports = router;
