import React from 'react';

const Header = ({ activeTab, onMenuClick }) => {
  return (
    // Main header container with background, padding, flex layout
    <div className="bg-gray-800 text-white px-4 md:px-8 py-4 flex items-center justify-between">
      
      <div className="flex items-center gap-3">
        {/* Hamburger menu button for mobile screens */}
        <button
          onClick={onMenuClick} // Trigger menu toggle callback
          className="md:hidden text-gray-300 hover:text-white focus:outline-none"
        >
          {/* Hamburger icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo or icon representing the app */}
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>

        {/* Display current active tab name */}
        <h2 className="text-lg md:text-xl font-semibold">
          {activeTab === 'tasks' ? 'Tasks' : 'Audit Logs'} {/* Conditional rendering of tab title */}
        </h2>
      </div>

      {/* Version info on the right side */}
      <span className="text-xs md:text-sm text-gray-400">v1.0</span>
    </div>
  );
};

export default Header; // Export header component for use in other parts of the app
