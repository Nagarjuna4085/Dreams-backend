import Post from '../models/postModel.js';

// Create a new post
export const createPost = async (req, res) => {
  const { content, media, dreamType } = req.body;
  const userId = req.user.id; // Assuming the user ID is in the request object

  try {
    const newPost = new Post({ userId, content, media, dreamType });
    await newPost.save();
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating post', error });
  }
};

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('userId', 'username email'); // Populating user info
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching posts', error });
  }
};

// Get a post by ID
export const getPostById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const post = await Post.findById(id).populate('userId', 'username email');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching post', error });
  }
};

// Update a post
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating post', error });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) return res.status(404).json({ message: 'Post not found' });
    return res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting post', error });
  }
};


// Fetch posts with pagination (infinity scrolling)
export const getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    // Fetch posts with pagination
    const posts = await Post.find()
      .sort({ createdAt: -1 }) // Sort by latest
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('userId', 'username') // Populate user data
      .exec();

    // Count total posts
    const totalPosts = await Post.countDocuments();

    res.status(200).json({
      posts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
};
