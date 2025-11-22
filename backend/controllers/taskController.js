import Task from '../models/Task.js';
import AuditLog from '../models/AuditLog.js';
import { sanitizeInput, validateTask } from '../utils/validation.js';

// Fetch tasks with optional search and pagination
export const getTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || '';

    // Build search query if search keyword is provided
    const query = search
      ? {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
          ]
        }
      : {};

    const total = await Task.countDocuments(query);

    // Retrieve tasks with pagination and sort by creation date
    const tasks = await Task.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      tasks,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

// Create a new task and log the creation action
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validate input fields before creating task
    const validation = validateTask(title, description);
    if (!validation.isValid) {
      return res.status(400).json({ errors: validation.errors });
    }

    // Sanitize input to prevent XSS or invalid characters
    const sanitizedTitle = sanitizeInput(title);
    const sanitizedDescription = sanitizeInput(description);

    const task = new Task({
      title: sanitizedTitle,
      description: sanitizedDescription
    });

    await task.save();

    // Record creation in audit logs
    await AuditLog.create({
      action: 'Create Task',
      taskId: task._id,
      updatedContent: {
        title: sanitizedTitle,
        description: sanitizedDescription
      }
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

// Update an existing task and log only the changes
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Validate input fields before updating
    const validation = validateTask(title, description);
    if (!validation.isValid) {
      return res.status(400).json({ errors: validation.errors });
    }

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const updatedContent = {};
    const sanitizedTitle = sanitizeInput(title);
    const sanitizedDescription = sanitizeInput(description);

    // Track changes and update only if different
    if (task.title !== sanitizedTitle) {
      updatedContent.title = sanitizedTitle;
      task.title = sanitizedTitle;
    }

    if (task.description !== sanitizedDescription) {
      updatedContent.description = sanitizedDescription;
      task.description = sanitizedDescription;
    }

    await task.save();

    // Log update only if there were actual changes
    if (Object.keys(updatedContent).length > 0) {
      await AuditLog.create({
        action: 'Update Task',
        taskId: task._id,
        updatedContent
      });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

// Delete a task and log the deletion
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await Task.findByIdAndDelete(id);

    // Record deletion in audit logs
    await AuditLog.create({
      action: 'Delete Task',
      taskId: task._id,
      updatedContent: null
    });

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};
