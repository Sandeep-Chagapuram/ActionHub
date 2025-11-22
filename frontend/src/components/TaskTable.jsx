import React, { useState, useEffect } from 'react';
import { taskAPI } from '../services/api';
import TaskModal from './TaskModal';
import Pagination from './Pagination';

const TaskTable = () => {
  // State for storing tasks fetched from API
  const [tasks, setTasks] = useState([]);
  // Loading indicator for API requests
  const [loading, setLoading] = useState(true);
  // Search query for filtering tasks
  const [searchQuery, setSearchQuery] = useState('');
  // Current page number for pagination
  const [currentPage, setCurrentPage] = useState(1);
  // Total number of pages from API
  const [totalPages, setTotalPages] = useState(1);
  // Total number of tasks from API
  const [total, setTotal] = useState(0);
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Task being edited; null if creating a new task
  const [editingTask, setEditingTask] = useState(null);

  /**
   * Fetch tasks from the backend API with pagination and search filter.
   */
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getTasks(currentPage, searchQuery);
      setTasks(response.data.tasks);
      setTotalPages(response.data.totalPages);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks whenever currentPage or searchQuery changes
  useEffect(() => {
    fetchTasks();
  }, [currentPage, searchQuery]);

  /**
   * Open the modal for creating a new task
   */
  const handleCreate = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  /**
   * Open the modal for editing an existing task
   * @param {object} task - Task object to edit
   */
  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  /**
   * Save task data to the backend
   * Handles both create and update operations
   * @param {object} taskData - Task title & description
   */
  const handleSave = async (taskData) => {
    try {
      if (editingTask) {
        // Update existing task
        await taskAPI.updateTask(editingTask._id, taskData);
      } else {
        // Create new task and reset to first page
        await taskAPI.createTask(taskData);
        setCurrentPage(1);
      }
      // Refresh task list after save
      await fetchTasks();
      // Close modal and reset editing task
      setIsModalOpen(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  /**
   * Delete a task after confirmation
   * @param {string} id - Task ID to delete
   */
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskAPI.deleteTask(id);
        await fetchTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  /**
   * Update search query and reset page to 1
   * @param {object} e - Event object from input
   */
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="w-full">
      {/* Search bar and Create button */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between sm:items-center mb-6">
        <div className="relative flex-1 max-w-full sm:max-w-md">
          {/* Search icon */}
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by title or description"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Create Task button */}
        <button
          onClick={handleCreate}
          className="sm:ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden sm:inline">Create Task</span>
          <span className="sm:hidden">Create</span>
        </button>
      </div>

      {/* Loading indicator */}
      {loading ? (
        <div className="text-center py-8 text-gray-400">Loading...</div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block bg-gray-800 rounded-lg overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Created At</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {tasks.map((task) => (
                  <tr key={task._id} className="hover:bg-gray-750">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">#{task._id.slice(-4)}</td>
                    <td className="px-6 py-4 text-sm text-white">{task.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{task.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(task.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {/* Edit & Delete buttons */}
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(task)} className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors">Edit</button>
                        <button onClick={() => handleDelete(task._id)} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {tasks.map((task) => (
              <div key={task._id} className="bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 mb-1">#{task._id.slice(-4)}</div>
                    <h3 className="text-white font-medium mb-1">{task.title}</h3>
                    <p className="text-sm text-gray-300 mb-2">{task.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(task.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(task)} className="flex-1 px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-sm">Edit</button>
                  <button onClick={() => handleDelete(task._id)} className="flex-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination & Task Count */}
          <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-sm text-gray-400">Showing {tasks.length} of {total} tasks</p>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </>
      )}

      {/* Task Modal for Create/Edit */}
      <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} task={editingTask} />
    </div>
  );
};

export default TaskTable;
