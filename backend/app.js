const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Import Routes
const authRoutes = require('../frontend/src/components/Auth');
const todoRoutes = require('./routes/todo');
const profileRoutes = require('./routes/profile'); // Add this line

// Initialize dotenv
dotenv.config();

// Initialize Express App
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS for cross-origin requests

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err.message));

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/todo', todoRoutes); // ToDo list routes
app.use('/api', profileRoutes); // Profile routes

// Define Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});