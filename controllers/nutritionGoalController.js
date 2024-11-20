// controllers/nutritionGoalController.js
const NutritionGoal = require('../models/NutritionGoal');

// POST request to set or update nutrition goals
const setNutritionGoal = async (req, res) => {
  const { calorieGoal, proteinGoal, carbGoal, fatGoal } = req.body;

  try {
    // Check if nutrition goals already exist
    let existingGoal = await NutritionGoal.findOne();

    if (existingGoal) {
      // If goal exists, update it
      existingGoal.calorieGoal = calorieGoal;
      existingGoal.proteinGoal = proteinGoal;
      existingGoal.carbGoal = carbGoal;
      existingGoal.fatGoal = fatGoal;

      await existingGoal.save();
      return res.status(200).json({ message: 'Nutrition goals updated successfully!' });
    } else {
      // If no goal exists, create new
      const newGoal = new NutritionGoal({
        calorieGoal,
        proteinGoal,
        carbGoal,
        fatGoal,
      });

      await newGoal.save();
      return res.status(201).json({ message: 'Nutrition goals set successfully!' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred. Please try again.' });
  }
};

module.exports = {
  setNutritionGoal,
};
