// models/Goal.js
const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  dailyStepsGoal: { type: Number, required: true },
  weeklyWorkoutsGoal: { type: Number, required: true },
  calorieIntakeGoal: { type: Number, required: true },
});

module.exports = mongoose.model('Goal', goalSchema);
