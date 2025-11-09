/**
 * Form Validation Utilities
 * Validation functions for user inputs
 */

import { VALIDATION } from '../constants';

/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {object} { isValid, error }
 */
export const validateEmail = (email) => {
  if (!email || email.trim() === '') {
    return { isValid: false, error: 'Email is required' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Invalid email format' };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validate password strength
 * @param {string} password - Password
 * @param {number} minLength - Minimum length (default 6)
 * @returns {object} { isValid, error, strength }
 */
export const validatePassword = (password, minLength = 6) => {
  if (!password || password.trim() === '') {
    return { isValid: false, error: 'Password is required', strength: 'none' };
  }
  
  if (password.length < minLength) {
    return { 
      isValid: false, 
      error: `Password must be at least ${minLength} characters`, 
      strength: 'weak' 
    };
  }
  
  // Check password strength
  let strength = 'weak';
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  const strengthCount = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
  
  if (strengthCount >= 3 && password.length >= 8) {
    strength = 'strong';
  } else if (strengthCount >= 2) {
    strength = 'medium';
  }
  
  return { isValid: true, error: null, strength };
};

/**
 * Validate weight
 * @param {number} weight - Weight in kg
 * @returns {object} { isValid, error }
 */
export const validateWeight = (weight) => {
  if (!weight || isNaN(weight)) {
    return { isValid: false, error: 'Weight is required' };
  }
  
  const w = parseFloat(weight);
  
  if (w < VALIDATION.minWeight) {
    return { isValid: false, error: `Weight must be at least ${VALIDATION.minWeight} kg` };
  }
  
  if (w > VALIDATION.maxWeight) {
    return { isValid: false, error: `Weight must be less than ${VALIDATION.maxWeight} kg` };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validate height
 * @param {number} height - Height in cm
 * @returns {object} { isValid, error }
 */
export const validateHeight = (height) => {
  if (!height || isNaN(height)) {
    return { isValid: false, error: 'Height is required' };
  }
  
  const h = parseFloat(height);
  
  if (h < VALIDATION.minHeight) {
    return { isValid: false, error: `Height must be at least ${VALIDATION.minHeight} cm` };
  }
  
  if (h > VALIDATION.maxHeight) {
    return { isValid: false, error: `Height must be less than ${VALIDATION.maxHeight} cm` };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validate age
 * @param {number} age - Age in years
 * @returns {object} { isValid, error }
 */
export const validateAge = (age) => {
  if (!age || isNaN(age)) {
    return { isValid: false, error: 'Age is required' };
  }
  
  const a = parseInt(age);
  
  if (a < VALIDATION.minAge) {
    return { isValid: false, error: `Age must be at least ${VALIDATION.minAge}` };
  }
  
  if (a > VALIDATION.maxAge) {
    return { isValid: false, error: `Age must be less than ${VALIDATION.maxAge}` };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validate calories
 * @param {number} calories - Calorie value
 * @returns {object} { isValid, error }
 */
export const validateCalories = (calories) => {
  if (calories === null || calories === undefined || isNaN(calories)) {
    return { isValid: false, error: 'Calories value is required' };
  }
  
  const c = parseFloat(calories);
  
  if (c < 0) {
    return { isValid: false, error: 'Calories cannot be negative' };
  }
  
  if (c > VALIDATION.maxCalories) {
    return { isValid: false, error: `Calories must be less than ${VALIDATION.maxCalories}` };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validate duration
 * @param {number} duration - Duration in minutes
 * @returns {object} { isValid, error }
 */
export const validateDuration = (duration) => {
  if (!duration || isNaN(duration)) {
    return { isValid: false, error: 'Duration is required' };
  }
  
  const d = parseFloat(duration);
  
  if (d < VALIDATION.minDuration) {
    return { isValid: false, error: `Duration must be at least ${VALIDATION.minDuration} minute` };
  }
  
  if (d > VALIDATION.maxDuration) {
    return { isValid: false, error: `Duration must be less than ${VALIDATION.maxDuration} minutes` };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validate distance
 * @param {number} distance - Distance in km
 * @returns {object} { isValid, error }
 */
export const validateDistance = (distance) => {
  if (distance === null || distance === undefined || isNaN(distance)) {
    return { isValid: false, error: 'Distance is required' };
  }
  
  const d = parseFloat(distance);
  
  if (d < 0) {
    return { isValid: false, error: 'Distance cannot be negative' };
  }
  
  if (d > 500) {
    return { isValid: false, error: 'Distance seems too large' };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validate reps
 * @param {number} reps - Number of reps
 * @returns {object} { isValid, error }
 */
export const validateReps = (reps) => {
  if (!reps || isNaN(reps)) {
    return { isValid: false, error: 'Reps are required' };
  }
  
  const r = parseInt(reps);
  
  if (r < 1) {
    return { isValid: false, error: 'Reps must be at least 1' };
  }
  
  if (r > 100) {
    return { isValid: false, error: 'Reps must be less than 100' };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validate sets
 * @param {number} sets - Number of sets
 * @returns {object} { isValid, error }
 */
export const validateSets = (sets) => {
  if (!sets || isNaN(sets)) {
    return { isValid: false, error: 'Sets are required' };
  }
  
  const s = parseInt(sets);
  
  if (s < 1) {
    return { isValid: false, error: 'Sets must be at least 1' };
  }
  
  if (s > 50) {
    return { isValid: false, error: 'Sets must be less than 50' };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validate exercise weight
 * @param {number} weight - Weight in kg
 * @returns {object} { isValid, error }
 */
export const validateExerciseWeight = (weight) => {
  if (weight === null || weight === undefined || isNaN(weight)) {
    return { isValid: false, error: 'Weight is required' };
  }
  
  const w = parseFloat(weight);
  
  if (w < 0) {
    return { isValid: false, error: 'Weight cannot be negative' };
  }
  
  if (w > 500) {
    return { isValid: false, error: 'Weight seems too large' };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validate required field
 * @param {any} value - Field value
 * @param {string} fieldName - Field name for error message
 * @returns {object} { isValid, error }
 */
export const validateRequired = (value, fieldName = 'Field') => {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: `${fieldName} is required` };
  }
  
  if (typeof value === 'string' && value.trim() === '') {
    return { isValid: false, error: `${fieldName} is required` };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validate number range
 * @param {number} value - Value to validate
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @param {string} fieldName - Field name for error message
 * @returns {object} { isValid, error }
 */
export const validateRange = (value, min, max, fieldName = 'Value') => {
  if (value === null || value === undefined || isNaN(value)) {
    return { isValid: false, error: `${fieldName} is required` };
  }
  
  const v = parseFloat(value);
  
  if (v < min) {
    return { isValid: false, error: `${fieldName} must be at least ${min}` };
  }
  
  if (v > max) {
    return { isValid: false, error: `${fieldName} must be less than ${max}` };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validate form object with multiple fields
 * @param {object} formData - Form data object
 * @param {object} rules - Validation rules object
 * @returns {object} { isValid, errors }
 */
export const validateForm = (formData, rules) => {
  const errors = {};
  let isValid = true;
  
  Object.keys(rules).forEach((field) => {
    const rule = rules[field];
    const value = formData[field];
    
    // Check required
    if (rule.required) {
      const result = validateRequired(value, rule.label || field);
      if (!result.isValid) {
        errors[field] = result.error;
        isValid = false;
        return;
      }
    }
    
    // Skip other validations if empty and not required
    if (!value && !rule.required) {
      return;
    }
    
    // Custom validator
    if (rule.validator) {
      const result = rule.validator(value);
      if (!result.isValid) {
        errors[field] = result.error;
        isValid = false;
        return;
      }
    }
    
    // Type-based validation
    if (rule.type === 'email') {
      const result = validateEmail(value);
      if (!result.isValid) {
        errors[field] = result.error;
        isValid = false;
      }
    } else if (rule.type === 'password') {
      const result = validatePassword(value, rule.minLength);
      if (!result.isValid) {
        errors[field] = result.error;
        isValid = false;
      }
    } else if (rule.type === 'number' && rule.min !== undefined && rule.max !== undefined) {
      const result = validateRange(value, rule.min, rule.max, rule.label || field);
      if (!result.isValid) {
        errors[field] = result.error;
        isValid = false;
      }
    }
  });
  
  return { isValid, errors };
};

/**
 * Sanitize string input
 * @param {string} input - Input string
 * @returns {string} Sanitized string
 */
export const sanitizeString = (input) => {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and > to prevent XSS
    .replace(/\s+/g, ' '); // Replace multiple spaces with single space
};

/**
 * Validate phone number (basic)
 * @param {string} phone - Phone number
 * @returns {object} { isValid, error }
 */
export const validatePhone = (phone) => {
  if (!phone || phone.trim() === '') {
    return { isValid: false, error: 'Phone number is required' };
  }
  
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length < 10) {
    return { isValid: false, error: 'Phone number must be at least 10 digits' };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validate URL format
 * @param {string} url - URL string
 * @returns {object} { isValid, error }
 */
export const validateURL = (url) => {
  if (!url || url.trim() === '') {
    return { isValid: false, error: 'URL is required' };
  }
  
  try {
    new URL(url);
    return { isValid: true, error: null };
  } catch (e) {
    return { isValid: false, error: 'Invalid URL format' };
  }
};