import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    default: '', // Optional field for full name
  },
  bio: {
    type: String,
    default: '', // Optional field for user biography
  },
  profilePicture: {
    type: String,
    default: '', // Optional field for profile picture URL
  },
  website: {
    type: String,
    default: '', // Optional field for personal website
  },
  location: {
    type: String,
    default: '', // Optional field for user location
  },
  language: {
    type: String,
    default: 'English', // Default language
  },
  theme: {
    type: String,
    enum: ['light', 'dark'], // Allowed themes
    default: 'light', // Default theme
  },
  socialLinks: {
    twitter: { type: String, default: '' }, // Optional link to Twitter
    instagram: { type: String, default: '' }, // Optional link to Instagram
    linkedin: { type: String, default: '' }, // Optional link to LinkedIn
  },
  accountCreated: {
    type: Date,
    default: Date.now, // Automatically set creation date
  },
  lastLogin: {
    type: Date,
    default: Date.now, // Set last login date
  },
  notificationsEnabled: {
    type: Boolean,
    default: true, // Default to receiving notifications
  },
});

// Hash password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);
export default User;
