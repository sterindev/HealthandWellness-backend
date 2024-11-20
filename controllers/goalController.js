// controllers/goalController.js
const Goal = require('../models/Goal'); // Define Goal schema in the models

// Handle goal submission (set goals)
exports.setGoals = async (req, res) => {
  const { dailyStepsGoal, weeklyWorkoutsGoal, calorieIntakeGoal } = req.body;

  try {
    const newGoal = new Goal({
      dailyStepsGoal,
      weeklyWorkoutsGoal,
      calorieIntakeGoal,
    });

    await newGoal.save();
    res.status(200).json({ message: 'Goals set successfully!', goal: newGoal });
  } catch (error) {
    console.error('Error setting goals:', error);
    res.status(500).json({ message: 'Error setting goals' });
  }
};

// Handle progress submission (update progress)
exports.updateProgress = async (req, res) => {
  const { dailySteps, weeklyWorkouts, calorieIntake } = req.body;

  try {
    // Here you would likely find the user and update their progress
    const progress = {
      dailySteps,
      weeklyWorkouts,
      calorieIntake,
    };

    // Send a response back confirming the update
    res.status(200).json({ message: 'Progress updated successfully!', progress });
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ message: 'Error updating progress' });
  }
};

