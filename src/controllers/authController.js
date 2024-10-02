import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { secret, expiresIn } from '../config/jwtConfig.js';


//testing
export const sendHi = ()=>{
  try {
    res.status(201).json({ greeting :"Helllo", user: { name: "test", username, "test@gmail.com" } });

  } catch (error) {
    res.status(500).json({ messagesssssss: error.message });
  }
}

// User Sign Up
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    // Create token
    const token = jwt.sign({ id: newUser._id }, secret, { expiresIn });

    res.status(201).json({ token, user: { id: newUser._id, username, email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User Sign In
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign({ id: user._id }, secret, { expiresIn });

    res.json({ token, usererrrrrrrrr: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
