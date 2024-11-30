// controllers/reactionController.js

import Post from '../models/postModel.js';

// Add or update a reaction to a post
export const reactToPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { reactionType } = req.body; // e.g., 'like', 'love', etc.
    const userId = req.user.id; // Assuming user ID is attached to the request by the auth middleware

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Get the current reactions for this type
    const currentReactions = post.reactions.get(reactionType) || [];

    // Check if user already reacted
    if (!currentReactions.includes(userId)) {
      currentReactions.push(userId); // Add user to the reaction type
      post.reactions.set(reactionType, currentReactions);
    }

    await post.save();
    res.status(200).json({ message: 'Reaction added/updated', reactions: post.reactions });
  } catch (error) {
    res.status(500).json({ message: 'Error reacting to post', error });
  }
};

// Remove a reaction from a post
export const removeReactionFromPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { reactionType } = req.body;
    const userId = req.user.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Get the current reactions for this type
    const currentReactions = post.reactions.get(reactionType) || [];

    // Remove user from the reaction list if they reacted
    const updatedReactions = currentReactions.filter(id => id.toString() !== userId);

    if (updatedReactions.length > 0) {
      post.reactions.set(reactionType, updatedReactions);
    } else {
      post.reactions.delete(reactionType); // Remove the reaction type if no users reacted
    }

    await post.save();
    res.status(200).json({ message: 'Reaction removed', reactions: post.reactions });
  } catch (error) {
    res.status(500).json({ message: 'Error removing reaction', error });
  }
};
