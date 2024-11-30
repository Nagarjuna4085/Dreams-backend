import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

//test

// POST /api/auth/register
router.post('/register', registerUser);

// POST /api/auth/login
router.post('/login', loginUser);


// POST /api/auth/forgot-password
router.post('/forgot-password', forgotPassword); // To request a password reset link

// POST /api/auth/reset-password
router.post('/reset-password', resetPassword); // To reset the password using the token

export default router;
