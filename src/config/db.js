import mongoose from 'mongoose';
const MONGO_URI='mongodb+srv://dream:dream123@cluster0.oynhj.mongodb.net/Dreams'
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process if connection fails
  }
};

export default connectDB;
