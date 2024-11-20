// models/NutritionGoal.js
const mongoose = require('mongoose');

const nutritionGoalSchema = new mongoose.Schema({
  calorieGoal: {
    type: Number,
    required: true,
  },
  proteinGoal: {
    type: Number,
    required: true,
  },
  carbGoal: {
    type: Number,
    required: true,
  },
  fatGoal: {
    type: Number,
    required: true,
  },
});

const NutritionGoal = mongoose.model('NutritionGoal', nutritionGoalSchema);

module.exports = NutritionGoal;
