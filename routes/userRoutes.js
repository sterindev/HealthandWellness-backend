const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const HealthData = require('../models/HealthData'); // Assuming health data model is already defined
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Get the user's profile
router.get('/profile', authenticate, async (req, res) => {
  try {
    // Get the user based on the user ID from the JWT token
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user); // Send back the user data
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user data' });
  }
});

// Update the user's profile
router.put('/profile', authenticate, async (req, res) => {
  const { name, email, password, preferences } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Only update fields that are provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    user.name = name || user.name;
    user.email = email || user.email;
    user.preferences = preferences || user.preferences;

    await user.save(); // Save the updated user data
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

// Get the user's health tracking data
router.get('/tracking', authenticate, async (req, res) => {
  try {
    const healthData = await HealthData.find({ userId: req.user._id });
    res.json(healthData); // Return the health data for the authenticated user
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch health data' });
  }
});

// Example route for adding health data (optional)
router.post('/tracking', authenticate, async (req, res) => {
  const { date, exercise, calories, nutrition } = req.body;

  try {
    const healthData = new HealthData({
      userId: req.user._id,
      date,
      exercise,
      calories,
      nutrition,
    });

    await healthData.save();
    res.json({ message: 'Health data added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save health data' });
  }
});

module.exports = router;
