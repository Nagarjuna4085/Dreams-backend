import express from 'express';
import { registerUser, loginUser,sendHi } from '../controllers/authController.js';

const router = express.Router();

//test
router.get('/hi',sendHi)

// POST /api/auth/register
router.post('/register', registerUser);

// POST /api/auth/login
router.post('/login', loginUser);

export default router;
