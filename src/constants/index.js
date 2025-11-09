/**
 * Constants Barrel Export
 * Central import point for all constants
 */

// MET Values and Activity Data
export * from './metValues';
export * from './exercises';
export * from './muscleGroups';
export * from './activityTypes';
export * from './nutritionData';
export * from './colors';

// App-wide constants
export const APP_NAME = 'Personal Tracker';
export const APP_VERSION = '1.0.0';

// Date format constants
export const DATE_FORMATS = {
  display: 'MMM DD, YYYY',
  storage: 'YYYY-MM-DD',
  time: 'HH:mm',
  datetime: 'YYYY-MM-DD HH:mm:ss',
  monthYear: 'MMM YYYY',
};

// Pagination
export const ITEMS_PER_PAGE = {
  mobile: 10,
  tablet: 15,
  desktop: 20,
};

// Local storage keys
export const STORAGE_KEYS = {
  theme: 'tracker_theme',
  user: 'tracker_user',
  settings: 'tracker_settings',
  lastSync: 'tracker_last_sync',
};

// Firebase collection names
export const COLLECTIONS = {
  users: 'users',
  workouts: 'workouts',
  walking: 'walking',
  eating: 'eating',
  sleep: 'sleep',
  phoneUsage: 'phoneUsage',
  tasks: 'tasks',
  userProfiles: 'userProfiles',
};

// Error messages
export const ERROR_MESSAGES = {
  networkError: 'Network error. Please check your connection.',
  authError: 'Authentication error. Please sign in again.',
  dataError: 'Failed to load data. Please try again.',
  saveError: 'Failed to save. Please try again.',
  deleteError: 'Failed to delete. Please try again.',
  validationError: 'Please check your input and try again.',
};

// Success messages
export const SUCCESS_MESSAGES = {
  saved: 'Successfully saved!',
  updated: 'Successfully updated!',
  deleted: 'Successfully deleted!',
  synced: 'Data synced successfully!',
};

// Validation rules
export const VALIDATION = {
  minWeight: 30,
  maxWeight: 300,
  minHeight: 100,
  maxHeight: 250,
  minAge: 10,
  maxAge: 100,
  minCalories: 500,
  maxCalories: 10000,
  minDuration: 1,
  maxDuration: 600,
};