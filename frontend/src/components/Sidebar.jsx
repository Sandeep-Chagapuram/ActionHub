import React from 'react';

const Sidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  // Function to close sidebar on mobile when a tab is clicked
  const closeSidebar = () => {
    if (window.innerWidth < 768) { // Only close sidebar for small screens
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile overlay to darken background and close sidebar when clicked */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/70  z-40 md:hidden"
          onClick={() => setIsOpen(false)} // Close sidebar when overlay is clicked
        />
      )}
      
      {/* Sidebar container */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 bg-gray-900 text-white h-screen
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} // Slide-in/out animation
      `}>
        <div className="p-6">
          {/* Sidebar header with logo and close button */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              {/* App logo icon */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h1 className="text-xl font-bold">Task Manager</h1>
            </div>
            
            {/* Close button for mobile sidebar */}
            <button 
              onClick={() => setIsOpen(false)} // Close sidebar on click
              className="md:hidden text-gray-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Sidebar navigation buttons */}
          <div className="space-y-2">
            <p className="text-sm text-gray-400 mb-2">Main</p>

            {/* Tasks Tab */}
            <button
              onClick={() => {
                setActiveTab('tasks'); // Set active tab to tasks
                closeSidebar(); // Close sidebar on mobile
              }}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'tasks'
                  ? 'bg-blue-600 text-white' // Active tab styling
                  : 'text-gray-300 hover:bg-gray-800' // Inactive tab styling
              }`}
            >
              {/* Tasks icon */}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>Tasks</span>
            </button>

            {/* Audit Logs Tab */}
            <button
              onClick={() => {
                setActiveTab('logs'); // Set active tab to logs
                closeSidebar(); // Close sidebar on mobile
              }}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'logs'
                  ? 'bg-blue-600 text-white' // Active tab styling
                  : 'text-gray-300 hover:bg-gray-800' // Inactive tab styling
              }`}
            >
              {/* Audit logs icon */}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Audit Logs</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar; // Export Sidebar component for use in Layout
