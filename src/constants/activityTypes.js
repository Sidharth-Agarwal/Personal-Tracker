/**
 * Activity Types and Categories
 * Used across multiple modules (Workouts, Walking)
 */

// Primary workout types
export const WORKOUT_TYPES = {
  cardio: {
    id: 'cardio',
    name: 'Cardio',
    icon: '🏃',
    color: '#ef4444',
    description: 'Cardiovascular exercises',
  },
  weights: {
    id: 'weights',
    name: 'Weight Training',
    icon: '🏋️',
    color: '#3b82f6',
    description: 'Resistance and strength training',
  },
  mixed: {
    id: 'mixed',
    name: 'Mixed/Hybrid',
    icon: '⚡',
    color: '#8b5cf6',
    description: 'Combination of cardio and weights',
  },
};

// Cardio categories
export const CARDIO_CATEGORIES = {
  running: {
    name: 'Running',
    icon: '🏃',
    activities: ['running_slow', 'running_moderate', 'running_fast', 'running_sprint'],
  },
  walking: {
    name: 'Walking',
    icon: '🚶',
    activities: ['walking_slow', 'walking_moderate', 'walking_brisk', 'walking_uphill'],
  },
  cycling: {
    name: 'Cycling',
    icon: '🚴',
    activities: ['cycling_leisure', 'cycling_moderate', 'cycling_vigorous', 'cycling_mountain'],
  },
  boxing: {
    name: 'Boxing',
    icon: '🥊',
    activities: ['boxing_general', 'boxing_bag', 'boxing_sparring'],
  },
  swimming: {
    name: 'Swimming',
    icon: '🏊',
    activities: ['swimming_leisure', 'swimming_moderate', 'swimming_vigorous', 'swimming_backstroke', 'swimming_breaststroke'],
  },
  other: {
    name: 'Other',
    icon: '⚡',
    activities: ['rowing', 'jump_rope', 'elliptical', 'stairs', 'hiit', 'dance', 'yoga', 'yoga_power'],
  },
};

// Intensity levels
export const INTENSITY_LEVELS = {
  low: {
    name: 'Low',
    description: 'Light effort, can hold conversation easily',
    color: '#10b981',
    multiplier: 0.8,
    heartRatePercent: '50-60%',
  },
  moderate: {
    name: 'Moderate',
    description: 'Moderate effort, can talk but breathing harder',
    color: '#f59e0b',
    multiplier: 1.0,
    heartRatePercent: '60-70%',
  },
  high: {
    name: 'High',
    description: 'Hard effort, difficult to hold conversation',
    color: '#ef4444',
    multiplier: 1.2,
    heartRatePercent: '70-85%',
  },
  extreme: {
    name: 'Extreme',
    description: 'Maximum effort, cannot talk',
    color: '#dc2626',
    multiplier: 1.4,
    heartRatePercent: '85-100%',
  },
};

// Distance units
export const DISTANCE_UNITS = {
  km: {
    name: 'Kilometers',
    short: 'km',
    toMeters: 1000,
  },
  miles: {
    name: 'Miles',
    short: 'mi',
    toMeters: 1609.34,
  },
  meters: {
    name: 'Meters',
    short: 'm',
    toMeters: 1,
  },
};

// Weight units
export const WEIGHT_UNITS = {
  kg: {
    name: 'Kilograms',
    short: 'kg',
    toKg: 1,
  },
  lbs: {
    name: 'Pounds',
    short: 'lbs',
    toKg: 0.453592,
  },
};

// Duration presets (in minutes)
export const DURATION_PRESETS = [
  { value: 15, label: '15 min' },
  { value: 30, label: '30 min' },
  { value: 45, label: '45 min' },
  { value: 60, label: '1 hour' },
  { value: 90, label: '1.5 hours' },
  { value: 120, label: '2 hours' },
];

// Rest time presets (in seconds)
export const REST_TIME_PRESETS = [
  { value: 30, label: '30 sec' },
  { value: 60, label: '1 min' },
  { value: 90, label: '1.5 min' },
  { value: 120, label: '2 min' },
  { value: 180, label: '3 min' },
  { value: 300, label: '5 min' },
];

// Rep range presets
export const REP_RANGE_PRESETS = {
  strength: { min: 1, max: 6, label: 'Strength (1-6 reps)' },
  hypertrophy: { min: 8, max: 12, label: 'Hypertrophy (8-12 reps)' },
  endurance: { min: 15, max: 20, label: 'Endurance (15-20 reps)' },
  custom: { min: null, max: null, label: 'Custom' },
};

// Activity status/tags
export const ACTIVITY_TAGS = {
  personal_record: {
    name: 'Personal Record',
    icon: '🏆',
    color: '#fbbf24',
  },
  good_form: {
    name: 'Good Form',
    icon: '✅',
    color: '#10b981',
  },
  felt_great: {
    name: 'Felt Great',
    icon: '😊',
    color: '#3b82f6',
  },
  struggled: {
    name: 'Struggled',
    icon: '😓',
    color: '#ef4444',
  },
  injury_prevention: {
    name: 'Recovery/Light',
    icon: '🩹',
    color: '#f59e0b',
  },
};

// Goal types
export const GOAL_TYPES = {
  weight_loss: {
    name: 'Weight Loss',
    icon: '📉',
    description: 'Lose body fat',
    calorieAdjustment: 'deficit',
  },
  muscle_gain: {
    name: 'Muscle Gain',
    icon: '💪',
    description: 'Build muscle mass',
    calorieAdjustment: 'surplus',
  },
  maintenance: {
    name: 'Maintain Weight',
    icon: '⚖️',
    description: 'Maintain current weight',
    calorieAdjustment: 'maintenance',
  },
  strength: {
    name: 'Increase Strength',
    icon: '🏋️',
    description: 'Get stronger',
    calorieAdjustment: 'slight_surplus',
  },
  endurance: {
    name: 'Improve Endurance',
    icon: '🏃',
    description: 'Better cardiovascular fitness',
    calorieAdjustment: 'maintenance',
  },
};

/**
 * Get workout type details
 * @param {string} typeKey - Workout type key
 * @returns {object|null} Workout type object
 */
export const getWorkoutType = (typeKey) => {
  return WORKOUT_TYPES[typeKey] || null;
};

/**
 * Get intensity level details
 * @param {string} intensityKey - Intensity key
 * @returns {object|null} Intensity object
 */
export const getIntensityLevel = (intensityKey) => {
  return INTENSITY_LEVELS[intensityKey] || null;
};

/**
 * Get all workout type options for dropdown
 * @returns {array} Array of { value, label, icon } objects
 */
export const getWorkoutTypeOptions = () => {
  return Object.entries(WORKOUT_TYPES).map(([key, type]) => ({
    value: key,
    label: type.name,
    icon: type.icon,
    color: type.color,
  }));
};

/**
 * Get all intensity options for dropdown
 * @returns {array} Array of { value, label, color } objects
 */
export const getIntensityOptions = () => {
  return Object.entries(INTENSITY_LEVELS).map(([key, level]) => ({
    value: key,
    label: level.name,
    description: level.description,
    color: level.color,
  }));
};

/**
 * Convert distance between units
 * @param {number} value - Distance value
 * @param {string} fromUnit - Current unit
 * @param {string} toUnit - Target unit
 * @returns {number} Converted value
 */
export const convertDistance = (value, fromUnit, toUnit) => {
  const meters = value * DISTANCE_UNITS[fromUnit].toMeters;
  return meters / DISTANCE_UNITS[toUnit].toMeters;
};

/**
 * Convert weight between units
 * @param {number} value - Weight value
 * @param {string} fromUnit - Current unit
 * @param {string} toUnit - Target unit
 * @returns {number} Converted value
 */
export const convertWeight = (value, fromUnit, toUnit) => {
  const kg = value * WEIGHT_UNITS[fromUnit].toKg;
  return kg / WEIGHT_UNITS[toUnit].toKg;
};