import mongoose from 'mongoose';

// Establish connection to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/taskmanager', {
      useNewUrlParser: true,       // Use new URL parser to avoid deprecation warning
      useUnifiedTopology: true,    // Use new server discovery and monitoring engine
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);              // Exit process on connection failure
  }
};

export default connectDB;
