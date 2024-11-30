import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js'; // Import post routes
import commentRoutes from './routes/commentRoutes.js';  // Import comment routes
import reactionRoutes from './routes/reactionRoutes.js';
import userRoutes from './routes/userRoutes.js'; // Import user routes








// Load environment variables
dotenv.config();

// Initialize app
const app = express();


// Database connection
connectDB();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Enable CORS
app.use(cors());

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes); // Use post routes
app.use('/api/comments', commentRoutes);  // Use comment routes
app.use('/api/posts', reactionRoutes); // reactions
app.use('/api/users', userRoutes); // Add this line for user-related routes
// Use routes
app.use('/api/auth', authRoutes);







// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('Shutting down gracefully...');
    process.exit(0);
});
