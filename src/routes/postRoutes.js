import express from 'express';
import { createPost, getAllPosts, getPostById, updatePost, deletePost } from '../controllers/postController.js';
import auth from '../middleware/authMiddleware.js'; // Make sure the user is authenticated

const router = express.Router();

// Create a new post
router.post('/', auth, createPost);

// Get all posts
router.get('/', getAllPosts);

// Get a post by ID
router.get('/:id', getPostById);

// Update a post
router.put('/:id', auth, updatePost);

// Delete a post
router.delete('/:id', auth, deletePost);

export default router;
