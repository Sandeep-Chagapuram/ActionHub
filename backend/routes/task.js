import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js';


const router = express.Router();

// GET /tasks - Fetch paginated and searchable tasks
router.get('/', getTasks);

// POST /tasks - Create a new task
router.post('/', createTask);

// PUT /tasks/:id - Update an existing task by ID
router.put('/:id', updateTask);

// DELETE /tasks/:id - Delete a task by ID
router.delete('/:id', deleteTask);

export default router;
