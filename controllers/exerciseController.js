const Exercise = require('../models/Exercise');
const asyncHandler = require('express-async-handler');

// Log Exercise Data
const logExercise = asyncHandler(async (req, res) => {
  const { exerciseType, duration, distance, caloriesBurned } = req.body;

  // Create a new exercise log entry
  const exercise = new Exercise({
    exerciseType,
    duration,
    distance,
    caloriesBurned,
  });

  // Save to the database
  const savedExercise = await exercise.save();

  // Respond with the saved exercise log
  res.status(201).json(savedExercise);
});

// Get All Exercise Logs
const getExerciseLogs = asyncHandler(async (req, res) => {
  const exercises = await Exercise.find().sort({ date: -1 }); // Sort by latest
  res.json(exercises);
});

module.exports = { logExercise, getExerciseLogs };
