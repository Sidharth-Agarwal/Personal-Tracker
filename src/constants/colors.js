/**
 * Color Constants for Consistent Theming
 * Used across all components and charts
 */

// Module colors
export const MODULE_COLORS = {
  workouts: {
    primary: '#ef4444',
    light: '#fca5a5',
    dark: '#b91c1c',
    gradient: 'from-red-500 to-red-600',
  },
  walking: {
    primary: '#10b981',
    light: '#6ee7b7',
    dark: '#047857',
    gradient: 'from-green-500 to-green-600',
  },
  eating: {
    primary: '#f59e0b',
    light: '#fcd34d',
    dark: '#d97706',
    gradient: 'from-amber-500 to-amber-600',
  },
  sleep: {
    primary: '#8b5cf6',
    light: '#c4b5fd',
    dark: '#6d28d9',
    gradient: 'from-purple-500 to-purple-600',
  },
  phoneUsage: {
    primary: '#3b82f6',
    light: '#93c5fd',
    dark: '#1e40af',
    gradient: 'from-blue-500 to-blue-600',
  },
  tasks: {
    primary: '#ec4899',
    light: '#f9a8d4',
    dark: '#be185d',
    gradient: 'from-pink-500 to-pink-600',
  },
};

// Status colors
export const STATUS_COLORS = {
  success: {
    bg: '#dcfce7',
    text: '#166534',
    border: '#86efac',
    icon: '#22c55e',
  },
  warning: {
    bg: '#fef3c7',
    text: '#92400e',
    border: '#fcd34d',
    icon: '#f59e0b',
  },
  error: {
    bg: '#fee2e2',
    text: '#991b1b',
    border: '#fca5a5',
    icon: '#ef4444',
  },
  info: {
    bg: '#dbeafe',
    text: '#1e40af',
    border: '#93c5fd',
    icon: '#3b82f6',
  },
  neutral: {
    bg: '#f3f4f6',
    text: '#4b5563',
    border: '#d1d5db',
    icon: '#6b7280',
  },
};

// Chart colors (for data visualization)
export const CHART_COLORS = {
  primary: [
    '#ef4444', // red
    '#3b82f6', // blue
    '#10b981', // green
    '#f59e0b', // amber
    '#8b5cf6', // purple
    '#ec4899', // pink
    '#06b6d4', // cyan
    '#f97316', // orange
  ],
  pastel: [
    '#fca5a5', // light red
    '#93c5fd', // light blue
    '#6ee7b7', // light green
    '#fcd34d', // light amber
    '#c4b5fd', // light purple
    '#f9a8d4', // light pink
    '#67e8f9', // light cyan
    '#fdba74', // light orange
  ],
  gradient: [
    'from-red-400 to-red-600',
    'from-blue-400 to-blue-600',
    'from-green-400 to-green-600',
    'from-amber-400 to-amber-600',
    'from-purple-400 to-purple-600',
    'from-pink-400 to-pink-600',
  ],
};

// Calorie visualization colors
export const CALORIE_COLORS = {
  consumed: {
    color: '#10b981',
    label: 'Consumed',
  },
  burned: {
    color: '#ef4444',
    label: 'Burned',
  },
  net: {
    color: '#3b82f6',
    label: 'Net',
  },
  target: {
    color: '#f59e0b',
    label: 'Target',
  },
  deficit: {
    color: '#ef4444',
    label: 'Deficit',
  },
  surplus: {
    color: '#10b981',
    label: 'Surplus',
  },
};

// Macro colors
export const MACRO_COLORS = {
  protein: {
    color: '#ef4444',
    label: 'Protein',
    gradient: 'from-red-400 to-red-600',
  },
  carbs: {
    color: '#f59e0b',
    label: 'Carbs',
    gradient: 'from-amber-400 to-amber-600',
  },
  fats: {
    color: '#8b5cf6',
    label: 'Fats',
    gradient: 'from-purple-400 to-purple-600',
  },
};

// Progress colors (based on percentage)
export const getProgressColor = (percentage) => {
  if (percentage >= 100) return STATUS_COLORS.success.icon;
  if (percentage >= 75) return '#10b981'; // green
  if (percentage >= 50) return '#f59e0b'; // amber
  if (percentage >= 25) return '#f97316'; // orange
  return '#ef4444'; // red
};

// Intensity colors
export const INTENSITY_COLORS = {
  low: '#10b981',      // green
  moderate: '#f59e0b', // amber
  high: '#ef4444',     // red
  extreme: '#dc2626',  // dark red
};

// Difficulty colors
export const DIFFICULTY_COLORS = {
  beginner: '#10b981',     // green
  intermediate: '#f59e0b', // amber
  advanced: '#ef4444',     // red
};

// Priority colors (for tasks)
export const PRIORITY_COLORS = {
  low: {
    bg: '#dcfce7',
    text: '#166534',
    border: '#86efac',
  },
  medium: {
    bg: '#fef3c7',
    text: '#92400e',
    border: '#fcd34d',
  },
  high: {
    bg: '#fee2e2',
    text: '#991b1b',
    border: '#fca5a5',
  },
  urgent: {
    bg: '#fce7f3',
    text: '#831843',
    border: '#f9a8d4',
  },
};

// Sleep quality colors
export const SLEEP_QUALITY_COLORS = {
  excellent: '#10b981', // green
  good: '#3b82f6',      // blue
  fair: '#f59e0b',      // amber
  poor: '#ef4444',      // red
};

// Day of week colors (for calendar heatmap)
export const DAY_COLORS = {
  sunday: '#ef4444',
  monday: '#f97316',
  tuesday: '#f59e0b',
  wednesday: '#10b981',
  thursday: '#3b82f6',
  friday: '#8b5cf6',
  saturday: '#ec4899',
};

/**
 * Get color by module
 * @param {string} module - Module name
 * @returns {object} Color object
 */
export const getModuleColor = (module) => {
  return MODULE_COLORS[module] || MODULE_COLORS.workouts;
};

/**
 * Get chart color by index
 * @param {number} index - Color index
 * @param {string} type - Color type (primary, pastel)
 * @returns {string} Color hex
 */
export const getChartColor = (index, type = 'primary') => {
  const colors = CHART_COLORS[type] || CHART_COLORS.primary;
  return colors[index % colors.length];
};

/**
 * Get macro color
 * @param {string} macro - Macro type (protein, carbs, fats)
 * @returns {string} Color hex
 */
export const getMacroColor = (macro) => {
  return MACRO_COLORS[macro]?.color || '#6b7280';
};

/**
 * Convert hex to rgba
 * @param {string} hex - Hex color
 * @param {number} alpha - Alpha value (0-1)
 * @returns {string} RGBA string
 */
export const hexToRgba = (hex, alpha = 1) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};