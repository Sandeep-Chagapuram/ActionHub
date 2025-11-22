import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    // Container for pagination buttons with flex layout and spacing
    <div className="flex items-center gap-2 md:gap-4">
      
      {/* Previous page button */}
      <button
        onClick={() => onPageChange(currentPage - 1)} // Move to previous page
        disabled={currentPage === 1} // Disable button on first page
        className="px-3 md:px-4 py-2 text-sm md:text-base text-gray-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Prev
      </button>

      {/* Current page display */}
      <span className="text-sm md:text-base text-gray-400">
        Page {currentPage} {/* Show current page number */}
      </span>

      {/* Next page button */}
      <button
        onClick={() => onPageChange(currentPage + 1)} // Move to next page
        disabled={currentPage >= totalPages} // Disable button on last page
        className="px-3 md:px-4 py-2 text-sm md:text-base text-gray-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination; // Export pagination component for use in tables or lists
