import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
// dotenv.config({ path: '../.env' });
dotenv.config({ path: path.resolve(new URL(import.meta.url).pathname, '../.env') });

const MONGO_URI= process.env.MONGO_URI || "mongodb+srv://dream:dream123@cluster0.oynhj.mongodb.net/Dreams"
console.log("MONGO_URI",MONGO_URI)
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
