/**
 * Muscle Groups and Body Part Categories
 */

// Primary muscle groups
export const MUSCLE_GROUPS = {
  chest: {
    name: 'Chest',
    icon: '💪',
    color: '#ef4444',
    description: 'Pectorals - upper, middle, lower chest',
    priority: 1,
  },
  back: {
    name: 'Back',
    icon: '🦾',
    color: '#3b82f6',
    description: 'Lats, traps, rhomboids, erectors',
    priority: 2,
  },
  legs: {
    name: 'Legs',
    icon: '🦵',
    color: '#8b5cf6',
    description: 'Quads, hamstrings, glutes, calves',
    priority: 3,
  },
  shoulders: {
    name: 'Shoulders',
    icon: '💪',
    color: '#f59e0b',
    description: 'Deltoids - front, side, rear',
    priority: 4,
  },
  arms: {
    name: 'Arms',
    icon: '💪',
    color: '#10b981',
    description: 'Biceps, triceps, forearms',
    priority: 5,
  },
  core: {
    name: 'Core',
    icon: '🔥',
    color: '#ec4899',
    description: 'Abs, obliques, lower back',
    priority: 6,
  },
};

// Detailed muscle breakdown
export const DETAILED_MUSCLES = {
  // Chest
  upper_chest: { name: 'Upper Chest', group: 'chest', region: 'upper' },
  middle_chest: { name: 'Middle Chest', group: 'chest', region: 'middle' },
  lower_chest: { name: 'Lower Chest', group: 'chest', region: 'lower' },
  
  // Back
  lats: { name: 'Latissimus Dorsi', group: 'back', region: 'upper' },
  traps: { name: 'Trapezius', group: 'back', region: 'upper' },
  rhomboids: { name: 'Rhomboids', group: 'back', region: 'upper' },
  lower_back: { name: 'Lower Back/Erectors', group: 'back', region: 'lower' },
  
  // Legs
  quads: { name: 'Quadriceps', group: 'legs', region: 'upper' },
  hamstrings: { name: 'Hamstrings', group: 'legs', region: 'upper' },
  glutes: { name: 'Glutes', group: 'legs', region: 'upper' },
  calves: { name: 'Calves', group: 'legs', region: 'lower' },
  
  // Shoulders
  front_delts: { name: 'Front Deltoids', group: 'shoulders', region: 'front' },
  side_delts: { name: 'Side Deltoids', group: 'shoulders', region: 'side' },
  rear_delts: { name: 'Rear Deltoids', group: 'shoulders', region: 'rear' },
  
  // Arms
  biceps: { name: 'Biceps', group: 'arms', region: 'front' },
  triceps: { name: 'Triceps', group: 'arms', region: 'back' },
  forearms: { name: 'Forearms', group: 'arms', region: 'lower' },
  
  // Core
  abs: { name: 'Abdominals', group: 'core', region: 'front' },
  obliques: { name: 'Obliques', group: 'core', region: 'side' },
  lower_abs: { name: 'Lower Abs', group: 'core', region: 'lower' },
};

// Training split types
export const TRAINING_SPLITS = {
  full_body: {
    name: 'Full Body',
    description: 'Train all muscle groups in one session',
    frequency: '2-3x per week',
    groups: ['chest', 'back', 'legs', 'shoulders', 'arms', 'core'],
  },
  upper_lower: {
    name: 'Upper/Lower',
    description: 'Alternate between upper and lower body days',
    frequency: '4x per week',
    upper: ['chest', 'back', 'shoulders', 'arms', 'core'],
    lower: ['legs', 'core'],
  },
  push_pull_legs: {
    name: 'Push/Pull/Legs (PPL)',
    description: 'Split by movement patterns',
    frequency: '6x per week',
    push: ['chest', 'shoulders', 'triceps'],
    pull: ['back', 'biceps'],
    legs: ['legs', 'core'],
  },
  bro_split: {
    name: 'Bro Split',
    description: 'One muscle group per day',
    frequency: '5-6x per week',
    days: {
      monday: 'chest',
      tuesday: 'back',
      wednesday: 'shoulders',
      thursday: 'legs',
      friday: 'arms',
      saturday: 'core',
    },
  },
};

// Workout types by focus
export const WORKOUT_TYPES = {
  strength: {
    name: 'Strength Training',
    description: 'Low reps, high weight (1-6 reps)',
    restTime: '3-5 minutes',
    sets: '3-5',
  },
  hypertrophy: {
    name: 'Hypertrophy (Muscle Growth)',
    description: 'Moderate reps, moderate weight (8-12 reps)',
    restTime: '1-2 minutes',
    sets: '3-4',
  },
  endurance: {
    name: 'Muscular Endurance',
    description: 'High reps, lower weight (15+ reps)',
    restTime: '30-60 seconds',
    sets: '2-3',
  },
  power: {
    name: 'Power Training',
    description: 'Explosive movements (3-5 reps)',
    restTime: '3-5 minutes',
    sets: '3-5',
  },
};

/**
 * Get muscle group details
 * @param {string} muscleKey - Muscle group key
 * @returns {object|null} Muscle group object
 */
export const getMuscleGroup = (muscleKey) => {
  return MUSCLE_GROUPS[muscleKey] || null;
};

/**
 * Get all muscle group options for dropdown
 * @returns {array} Array of { value, label, color } objects
 */
export const getMuscleGroupOptions = () => {
  return Object.entries(MUSCLE_GROUPS)
    .sort((a, b) => a[1].priority - b[1].priority)
    .map(([key, group]) => ({
      value: key,
      label: group.name,
      icon: group.icon,
      color: group.color,
    }));
};

/**
 * Get muscles by group
 * @param {string} group - Muscle group key
 * @returns {array} Array of detailed muscles
 */
export const getMusclesByGroup = (group) => {
  return Object.entries(DETAILED_MUSCLES)
    .filter(([_, muscle]) => muscle.group === group)
    .map(([key, muscle]) => ({ key, ...muscle }));
};

/**
 * Get color by muscle group
 * @param {string} muscleKey - Muscle group key
 * @returns {string} Color hex code
 */
export const getMuscleColor = (muscleKey) => {
  return MUSCLE_GROUPS[muscleKey]?.color || '#6b7280';
};