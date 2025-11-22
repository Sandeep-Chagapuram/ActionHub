// Sanitize user input to prevent XSS and remove unwanted characters
export const sanitizeInput = (input) => {
  return input
    .replace(/]*>/g, '')       // Remove stray closing brackets or tags
    .replace(/[<>'"]/g, '')    // Remove HTML special characters
    .trim();                    // Remove leading/trailing whitespace
};

// Validate task fields: title and description
export const validateTask = (title, description) => {
  const errors = [];

  // Title validation
  if (!title || title.trim().length === 0) {
    errors.push('Title is required');
  } else if (title.length > 100) {
    errors.push('Title must not exceed 100 characters');
  }

  // Description validation
  if (!description || description.trim().length === 0) {
    errors.push('Description is required');
  } else if (description.length > 500) {
    errors.push('Description must not exceed 500 characters');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
