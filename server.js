const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Load environment variables
dotenv.config();

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};
connectDB();

// Initialize express app
const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON requests

// CORS Configuration
const corsOptions = {
  origin: 'https://healthandwellness453.netlify.app', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions)); // Enable CORS with options

// Import routes
const authRouter = require('./routes/auth');
const exerciseRoutes = require('./routes/exerciseRoutes');
const foodLogRoutes = require('./routes/foodLogRoutes'); // Nutrition tracking routes
const nutritionGoalRoutes = require('./routes/nutritionGoalRoutes')// New route for nutrition goals
const goalRoutes = require('./routes/goalRoutes');
const userRoutes = require('./routes/userRoutes');
const { authenticate } = require('./middleware/authMiddleware');

// Routes setup
app.use('/api/auth', authRouter); // Authentication routes
app.use('/api/exercises', exerciseRoutes); // Exercise routes
app.use('/api/foodlogs', foodLogRoutes); // Food logs routes
app.use('/api/nutrition-goals', nutritionGoalRoutes);
app.use('/api/goals', goalRoutes);

app.use('/api/user/tracking', authenticate, userRoutes);

// Health Check Route
app.get('/', (req, res) => {
  res.status(200).send('API is running smoothly!');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: err.message,
  });
});

// Handle 404 - Not Found
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong!',
  });
});



app.get('/api/status', async (req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;
  res.status(200).json({
    status: 'API is running smoothly!',
    database: isDbConnected ? 'Connected' : 'Disconnected',
  });
});


// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});








