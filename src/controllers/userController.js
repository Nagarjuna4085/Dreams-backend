import User from '../models/userModel.js';

// Update user profile
export const updateUserProfile = async (req, res) => {
  const userId = req.user.id; // Get the user ID from the JWT token
  const {
    fullName,
    bio,
    profilePicture,
    website,
    location,
    language,
    theme,
    socialLinks,
  } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fullName,
        bio,
        profilePicture,
        website,
        location,
        language,
        theme,
        socialLinks,
      },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};




export const getProfile = async (req, res) => {
    const { userId } = req.user; // Get userId from the authenticated user info
  
    try {
      // Fetch the user profile from the database
      const user = await User.findById(userId).select('-password'); // Exclude password from the response
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching profile', error });
    }
  };
  
