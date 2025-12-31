import React, { useState, useEffect } from 'react';
import { sanitizeInput, validateTask } from '../utils/validation';

const TaskModal = ({ isOpen, onClose, onSave, task }) => {
  // Local state for task title, description, and validation errors
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);

  // Update modal fields when editing a task or opening/closing modal
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    } else {
      setTitle('');
      setDescription('');
    }
    setErrors([]); // Reset errors on open
  }, [task, isOpen]);

  // Handle form submission
  const handleSubmit = async () => {
    // Sanitize input to prevent XSS or unwanted characters
    const sanitizedTitle = sanitizeInput(title);
    const sanitizedDescription = sanitizeInput(description);

    // Validate sanitized inputs
    const validation = validateTask(sanitizedTitle, sanitizedDescription);

    if (!validation.isValid) {
      setErrors(validation.errors); // Display validation errors
      return;
    }

    // Save task using parent callback
    await onSave({
      title: sanitizedTitle,
      description: sanitizedDescription
    });

    // Reset modal state after saving
    setTitle('');
    setDescription('');
    setErrors([]);
  };

  // Do not render modal if it's closed
  if (!isOpen) return null;

  return (
    // Modal overlay
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-4 md:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        
        {/* Modal header with title and close button */}
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h3 className="text-lg md:text-xl font-semibold text-white">
            {task ? 'Edit Action' : 'Create Action'} {/* Conditional title */}
          </h3>
          <button
            onClick={onClose} // Close modal
            className="text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Display validation errors */}
        {errors.length > 0 && (
          <div className="mb-4 p-3 bg-red-900 bg-opacity-50 border border-red-500 rounded">
            {errors.map((error, index) => (
              <p key={index} className="text-red-200 text-sm">{error}</p>
            ))}
          </div>
        )}

        {/* Input fields */}
        <div className="space-y-4">
          {/* Task Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Plan sprint backlog"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={100}
            />
            <p className="text-xs text-gray-400 mt-1">{title.length}/100</p> {/* Character count */}
          </div>

          {/* Task Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add scope, owners, and due dates"
              rows={4}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              maxLength={500}
            />
            <p className="text-xs text-gray-400 mt-1">{description.length}/500</p> {/* Character count */}
          </div>
        </div>

        {/* Modal actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
          <button
            onClick={onClose} // Close modal without saving
            className="w-full sm:w-auto px-4 py-2 text-gray-300 hover:text-white transition-colors border border-gray-600 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit} // Save task
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            {/* Save icon */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            Save Action
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal; // Export TaskModal component for use in Layout
