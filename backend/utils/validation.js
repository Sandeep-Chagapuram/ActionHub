import validator from 'validator';

/**
 * Sanitize input to prevent XSS and remove extra spaces
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return validator.escape(input.trim());
};

/**
 * Validate task data for required fields and length constraints
 */
export const validateTask = (title, description) => {
  const errors = [];

  if (!title || title.trim().length === 0) {
    errors.push('Title is required');
  } else if (title.length > 100) {
    errors.push('Title must not exceed 100 characters');
  }

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
