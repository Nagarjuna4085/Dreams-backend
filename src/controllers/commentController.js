// src/controllers/commentController.js
import Comment from '../models/commentModel.js';
import Post from '../models/postModel.js';

// Add a comment to a post
export const addComment = async (req, res) => {
  const { postId } = req.params;
  const { comment } = req.body;

  try {
    // Find the post to make sure it exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Create and save the comment
    const newComment = new Comment({
      postId,
      userId: req.user._id,  // User ID from the authenticated user
      comment,
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add comment', error });
  }
};

// Get all comments for a post
// export const getComments = async (req, res) => {
//   const { postId } = req.params;

//   try {
//     // Find all comments for the given post
//     const comments = await Comment.find({ postId }).populate('userId', 'username');
//     res.status(200).json(comments);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to get comments', error });
//   }
// };



// Fetch comments for a post with pagination
export const getComments = async (req, res) => {
    try {
      const { postId } = req.params;
      const { page = 1, limit = 10 } = req.query;
  
      // Fetch comments for a specific post
      const comments = await Comment.find({ postId })
        .sort({ createdAt: -1 }) // Sort by latest
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .populate('userId', 'username') // Populate user data
        .exec();
  
      // Count total comments for the post
      const totalComments = await Comment.countDocuments({ postId });
  
      res.status(200).json({
        comments,
        totalPages: Math.ceil(totalComments / limit),
        currentPage: page,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching comments', error });
    }
  };
  
