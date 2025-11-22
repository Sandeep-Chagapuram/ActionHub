import React, { useState, useEffect } from 'react';
import { logAPI } from '../services/api'; // API service to fetch audit logs
import Pagination from './Pagination'; // Pagination component for navigating pages

const AuditLogs = () => {
  // State to store fetched logs
  const [logs, setLogs] = useState([]);
  // State to indicate loading status
  const [loading, setLoading] = useState(true);
  // State to track current page for pagination
  const [currentPage, setCurrentPage] = useState(1);
  // State to store total pages returned from the API
  const [totalPages, setTotalPages] = useState(1);
  // State to store total number of logs
  const [total, setTotal] = useState(0);

  // Function to fetch logs from backend API
  const fetchLogs = async () => {
    try {
      setLoading(true); // Set loading true before API call
      const response = await logAPI.getLogs(currentPage); // Fetch logs for current page
      setLogs(response.data.logs); // Store logs in state
      setTotalPages(response.data.totalPages); // Update total pages for pagination
      setTotal(response.data.total); // Update total logs count
    } catch (error) {
      console.error('Error fetching logs:', error); // Log error if API call fails
    } finally {
      setLoading(false); // Set loading false after API call completion
    }
  };

  // Fetch logs whenever currentPage changes
  useEffect(() => {
    fetchLogs();
  }, [currentPage]);

  // Function to return tailwind color class based on action type
  const getActionColor = (action) => {
    switch (action) {
      case 'Create Task':
        return 'bg-green-500'; // Green for creation
      case 'Update Task':
        return 'bg-yellow-500'; // Yellow for update
      case 'Delete Task':
        return 'bg-red-500'; // Red for deletion
      default:
        return 'bg-gray-500'; // Default gray for unknown actions
    }
  };

  // Function to format updated content for display
  const formatUpdatedContent = (content) => {
    if (!content || Object.keys(content).length === 0) {
      return '–'; // Return dash if content is empty
    }

    // Convert object to string in "key: value" format
    return Object.entries(content)
      .map(([key, value]) => `${key}: "${value}"`)
      .join('\n');
  };

  return (
    <div className="w-full">
      {loading ? (
        <div className="text-center py-8 text-gray-400">Loading...</div> // Show loading indicator
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block bg-gray-800 rounded-lg overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900">
                <tr>
                  {/* Table Headers */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Task ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Updated Content
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {logs.map((log) => (
                  <tr key={log._id} className="hover:bg-gray-750">
                    {/* Display timestamp */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    {/* Display action with color badge */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-3 py-1 rounded-full text-white text-xs ${getActionColor(log.action)}`}>
                        {log.action}
                      </span>
                    </td>
                    {/* Display task ID */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {log.taskId}
                    </td>
                    {/* Display formatted updated content */}
                    <td className="px-6 py-4 text-sm text-gray-300 whitespace-pre-line">
                      {formatUpdatedContent(log.updatedContent)}
                    </td>
                    {/* Display notes or dash if empty */}
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {log.notes || '–'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {logs.map((log) => (
              <div key={log._id} className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  {/* Action badge */}
                  <span className={`px-3 py-1 rounded-full text-white text-xs ${getActionColor(log.action)}`}>
                    {log.action}
                  </span>
                  {/* Task ID */}
                  <span className="text-xs text-gray-400">
                    ID: {log.taskId}
                  </span>
                </div>
                {/* Timestamp */}
                <div className="text-sm text-gray-400 mb-2">
                  {new Date(log.timestamp).toLocaleString()}
                </div>
                {/* Updated content for mobile */}
                {log.updatedContent && Object.keys(log.updatedContent).length > 0 && (
                  <div className="mt-2 p-2 bg-gray-900 rounded">
                    <div className="text-xs text-gray-400 mb-1">Updated Content:</div>
                    <div className="text-sm text-gray-300 whitespace-pre-line">
                      {formatUpdatedContent(log.updatedContent)}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination and logs count */}
          <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-sm text-gray-400">
              Showing {logs.length} of {total} logs
            </p>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage} // Update current page on pagination click
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AuditLogs; // Export component for use in other parts of the app
