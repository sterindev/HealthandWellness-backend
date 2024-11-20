const mongoose = require('mongoose');

const healthDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  exercise: { type: String, required: true },
  calories: { type: Number, required: true },
  nutrition: { type: String, required: true },
});

module.exports = mongoose.model('HealthData', healthDataSchema);
