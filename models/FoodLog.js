const mongoose = require('mongoose');

const FoodLogSchema = new mongoose.Schema({
  foodName: { type: String, required: true },
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fat: { type: Number, required: true },
  mealType: { 
    type: String, 
    required: true, 
    enum: ['breakfast', 'lunch', 'dinner', 'snack'], 
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('FoodLog', FoodLogSchema);
