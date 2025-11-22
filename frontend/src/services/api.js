import axios from 'axios';

// Base URL for the backend API
const API_BASE_URL = 'http://localhost:5001/api';

// Authorization header using Basic Auth
// Replace 'admin:password123' with secure credentials in production
const authHeader = {
  Authorization: 'Basic ' + btoa('admin:password123')
};

/**
 * Task API: Handles all task-related HTTP requests
 */
export const taskAPI = {
  // Fetch tasks with pagination and optional search query
  getTasks: (page = 1, search = '') =>
    axios.get(`${API_BASE_URL}/tasks`, {
      params: { page, limit: 5, search }, // limit 5 tasks per page
      headers: authHeader
    }),

  // Create a new task
  createTask: (task) =>
    axios.post(`${API_BASE_URL}/tasks`, task, { headers: authHeader }),

  // Update an existing task
  updateTask: (id, task) =>
    axios.put(`${API_BASE_URL}/tasks/${id}`, task, { headers: authHeader }),

  // Delete a task
  deleteTask: (id) =>
    axios.delete(`${API_BASE_URL}/tasks/${id}`, { headers: authHeader })
};

/**
 * Log API: Handles fetching system logs or activity logs
 */
export const logAPI = {
  // Fetch logs with pagination
  getLogs: (page = 1) =>
    axios.get(`${API_BASE_URL}/logs`, {
      params: { page, limit: 5 }, // limit 5 logs per page
      headers: authHeader
    })
};
