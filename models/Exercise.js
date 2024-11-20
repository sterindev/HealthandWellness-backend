const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
  exerciseType: { type: String, required: true },
  duration: { type: Number, required: true }, // In minutes
  distance: { type: Number }, // For exercises like running, cycling (in miles/km)
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
