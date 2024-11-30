// models/postModel.js

import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  media: {
    type: [String],
  },
  dreamType: {
    type: String,
    enum: ['Lucid Dream', 'Nightmare', 'Recurring Dream', 'Prophetic Dream'],
  },
  reactions: {
    type: Map,
    of: [mongoose.Schema.Types.ObjectId], // Map where keys are reaction types (e.g., 'like') and values are arrays of user IDs
    default: {},
  },
}, {
  timestamps: true,
});

const Post = mongoose.model('Post', postSchema);
export default Post;
