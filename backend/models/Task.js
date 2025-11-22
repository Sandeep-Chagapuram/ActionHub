import mongoose from 'mongoose';

// Schema representing a task entity
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Title is mandatory
    trim: true,     // Removes leading/trailing whitespace
    maxlength: 100  // Maximum length restriction
  },
  description: {
    type: String,
    required: true, // Description is mandatory
    trim: true,     // Removes leading/trailing whitespace
    maxlength: 500  // Maximum length restriction
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically set task creation timestamp
  }
});


export default mongoose.model('Task', taskSchema);
