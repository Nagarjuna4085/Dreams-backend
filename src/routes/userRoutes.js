import express from 'express';
import { updateUserProfile,getProfile } from '../controllers/userController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

// Update user profile
router.put('/profile', auth, updateUserProfile);
// Get user profile
router.get('/profile', auth, getProfile);


export default router;
