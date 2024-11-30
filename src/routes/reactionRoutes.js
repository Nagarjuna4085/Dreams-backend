// routes/reactionRoutes.js

import express from 'express';
import { reactToPost, removeReactionFromPost } from '../controllers/reactionController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

// Add or update reaction
router.patch('/:postId/reactions', auth, reactToPost);

// Remove reaction
router.delete('/:postId/reactions', auth, removeReactionFromPost);

export default router;
