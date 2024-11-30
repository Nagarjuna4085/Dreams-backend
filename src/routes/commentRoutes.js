// src/routes/commentRoutes.js
import express from 'express';
import { addComment, getComments } from '../controllers/commentController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/comments/:postId - Add a comment to a post
router.post('/:postId', auth, addComment);

// GET /api/comments/:postId - Get all comments for a post
router.get('/:postId', auth, getComments);

export default router;
