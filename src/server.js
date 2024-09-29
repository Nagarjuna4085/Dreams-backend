import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Database connection
connectDB();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Use routes
app.use('/api/auth', authRoutes);

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
