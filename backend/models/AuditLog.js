import mongoose from 'mongoose';

// Schema for Audit Logs to track task-related actions
const auditLogSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now // Automatically set log creation time
  },
  action: {
    type: String,
    required: true,
    enum: ['Create Task', 'Update Task', 'Delete Task'] // Only allow these actions
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the associated Task
    required: true
  },
  updatedContent: {
    type: mongoose.Schema.Types.Mixed, // Stores changes made to the task
    default: null
  },
  notes: {
    type: String, // Optional notes for the audit entry
    default: null
  }
});

// Export the AuditLog model for use in controllers
export default mongoose.model('AuditLog', auditLogSchema);
