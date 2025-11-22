import React, { useState } from 'react';
import Sidebar from './Sidebar'; // Sidebar component for navigation
import Header from './Header'; // Header component showing app title and menu
import TaskTable from './TaskTable'; // Component to display task list
import AuditLogs from './AuditLogs'; // Component to display audit logs

const Layout = () => {
  // State to track which tab is currently active ('tasks' or 'logs')
  const [activeTab, setActiveTab] = useState('tasks');
  // State to track whether the sidebar is open (for mobile screens)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    // Main container with flex layout and full-screen height
    <div className="flex h-screen bg-gray-900 overflow-hidden">
      
      {/* Sidebar component */}
      <Sidebar 
        activeTab={activeTab} // Highlight current active tab in sidebar
        setActiveTab={setActiveTab} // Function to change active tab
        isOpen={isSidebarOpen} // Sidebar visibility state
        setIsOpen={setIsSidebarOpen} // Function to toggle sidebar
      />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col w-full md:ml-0">
        {/* Header component with title and menu toggle */}
        <Header 
          activeTab={activeTab} // Pass current active tab to header
          onMenuClick={() => setIsSidebarOpen(true)} // Open sidebar on menu click
        />
        
        {/* Main content scrollable area */}
        <main className="flex-1 overflow-auto p-4 md:p-8">
          {/* Tab buttons */}
          <div className="mb-6">
            <div className="flex gap-4 border-b border-gray-700 overflow-x-auto">
              {/* Tasks Tab */}
              <button
                onClick={() => setActiveTab('tasks')} // Switch to tasks tab
                className={`px-4 py-2 font-medium whitespace-nowrap ${
                  activeTab === 'tasks'
                    ? 'text-blue-500 border-b-2 border-blue-500' // Active tab styling
                    : 'text-gray-400 hover:text-white' // Inactive tab styling
                }`}
              >
                Tasks
              </button>

              {/* Audit Logs Tab */}
              <button
                onClick={() => setActiveTab('logs')} // Switch to audit logs tab
                className={`px-4 py-2 font-medium whitespace-nowrap ${
                  activeTab === 'logs'
                    ? 'text-blue-500 border-b-2 border-blue-500' // Active tab styling
                    : 'text-gray-400 hover:text-white' // Inactive tab styling
                }`}
              >
                Audit Logs
              </button>
            </div>
          </div>

          {/* Conditionally render content based on active tab */}
          {activeTab === 'tasks' ? <TaskTable /> : <AuditLogs />}
        </main>
      </div>
    </div>
  );
};

export default Layout; // Export Layout component for app usage
