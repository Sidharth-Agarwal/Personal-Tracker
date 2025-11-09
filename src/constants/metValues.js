/**
 * MET (Metabolic Equivalent of Task) Values for Different Activities
 * MET = The ratio of your working metabolic rate relative to your resting metabolic rate
 * 1 MET = Energy expended at rest
 * 
 * Formula: Calories Burned = MET × Weight (kg) × Duration (hours)
 */

// Cardio Activities with MET values
export const CARDIO_ACTIVITIES = {
  // Running (by speed)
  running_slow: { 
    name: "Running - Slow (5 km/h)", 
    met: 6.0, 
    category: "running",
    description: "Light jogging"
  },
  running_moderate: { 
    name: "Running - Moderate (8 km/h)", 
    met: 8.0, 
    category: "running",
    description: "Steady pace"
  },
  running_fast: { 
    name: "Running - Fast (10 km/h)", 
    met: 10.0, 
    category: "running",
    description: "Fast running"
  },
  running_sprint: { 
    name: "Running - Sprint (12+ km/h)", 
    met: 12.5, 
    category: "running",
    description: "High intensity sprinting"
  },
  
  // Walking (by speed)
  walking_slow: { 
    name: "Walking - Slow (3 km/h)", 
    met: 2.5, 
    category: "walking",
    description: "Leisurely walk"
  },
  walking_moderate: { 
    name: "Walking - Moderate (5 km/h)", 
    met: 3.5, 
    category: "walking",
    description: "Normal pace"
  },
  walking_brisk: { 
    name: "Walking - Brisk (6.5 km/h)", 
    met: 4.5, 
    category: "walking",
    description: "Power walking"
  },
  walking_uphill: { 
    name: "Walking - Uphill", 
    met: 6.0, 
    category: "walking",
    description: "Incline walking"
  },
  
  // Cycling (by speed)
  cycling_leisure: { 
    name: "Cycling - Leisure (10-15 km/h)", 
    met: 4.0, 
    category: "cycling",
    description: "Casual cycling"
  },
  cycling_moderate: { 
    name: "Cycling - Moderate (16-19 km/h)", 
    met: 8.0, 
    category: "cycling",
    description: "Steady cycling"
  },
  cycling_vigorous: { 
    name: "Cycling - Vigorous (20+ km/h)", 
    met: 12.0, 
    category: "cycling",
    description: "Fast cycling"
  },
  cycling_mountain: { 
    name: "Cycling - Mountain Biking", 
    met: 8.5, 
    category: "cycling",
    description: "Off-road cycling"
  },
  
  // Boxing
  boxing_general: { 
    name: "Boxing - General Training", 
    met: 6.0, 
    category: "boxing",
    description: "Shadow boxing, technique"
  },
  boxing_bag: { 
    name: "Boxing - Heavy Bag", 
    met: 7.8, 
    category: "boxing",
    description: "Punching bag workout"
  },
  boxing_sparring: { 
    name: "Boxing - Sparring", 
    met: 9.0, 
    category: "boxing",
    description: "Live sparring"
  },
  
  // Swimming (by intensity)
  swimming_leisure: { 
    name: "Swimming - Leisure", 
    met: 6.0, 
    category: "swimming",
    description: "Casual swimming"
  },
  swimming_moderate: { 
    name: "Swimming - Moderate", 
    met: 8.0, 
    category: "swimming",
    description: "Lap swimming"
  },
  swimming_vigorous: { 
    name: "Swimming - Vigorous", 
    met: 10.0, 
    category: "swimming",
    description: "Fast laps, competitive"
  },
  swimming_backstroke: { 
    name: "Swimming - Backstroke", 
    met: 7.0, 
    category: "swimming",
    description: "Backstroke technique"
  },
  swimming_breaststroke: { 
    name: "Swimming - Breaststroke", 
    met: 10.3, 
    category: "swimming",
    description: "Breaststroke technique"
  },
  
  // Other Cardio Activities
  rowing: { 
    name: "Rowing Machine", 
    met: 7.0, 
    category: "other",
    description: "Indoor rowing"
  },
  jump_rope: { 
    name: "Jump Rope", 
    met: 11.0, 
    category: "other",
    description: "Skipping rope"
  },
  elliptical: { 
    name: "Elliptical Trainer", 
    met: 5.0, 
    category: "other",
    description: "Elliptical machine"
  },
  stairs: { 
    name: "Stair Climbing", 
    met: 8.0, 
    category: "other",
    description: "Climbing stairs"
  },
  hiit: { 
    name: "HIIT Training", 
    met: 8.0, 
    category: "other",
    description: "High intensity interval training"
  },
  dance: { 
    name: "Dancing - Aerobic", 
    met: 6.5, 
    category: "other",
    description: "Aerobic dancing"
  },
  yoga: { 
    name: "Yoga - Hatha", 
    met: 2.5, 
    category: "other",
    description: "General yoga practice"
  },
  yoga_power: { 
    name: "Yoga - Power/Vinyasa", 
    met: 4.0, 
    category: "other",
    description: "Intense yoga flow"
  },
};

// Weight Training MET values by intensity
export const WEIGHT_TRAINING_MET = {
  light: { 
    name: "Light Intensity", 
    met: 3.0,
    description: "Easy sets, long rest periods, light weights",
    criteria: "< 8 sets total OR < 3000 total volume"
  },
  moderate: { 
    name: "Moderate Intensity", 
    met: 5.0,
    description: "Normal workout, moderate weights",
    criteria: "8-20 sets OR 3000-10000 total volume"
  },
  vigorous: { 
    name: "Vigorous Intensity", 
    met: 6.0,
    description: "Heavy lifting, short rest, high weights",
    criteria: "> 20 sets OR > 10000 total volume"
  },
  circuit: { 
    name: "Circuit Training", 
    met: 8.0,
    description: "Minimal rest, high intensity, continuous movement",
    criteria: "Circuit-style training"
  },
};

// Activity intensity multipliers (for user customization)
export const INTENSITY_MULTIPLIERS = {
  low: 0.8,
  moderate: 1.0,
  high: 1.2,
  extreme: 1.4,
};

// Activity categories for filtering
export const ACTIVITY_CATEGORIES = {
  running: "Running",
  walking: "Walking",
  cycling: "Cycling",
  boxing: "Boxing",
  swimming: "Swimming",
  other: "Other Cardio",
  weights: "Weight Training",
};

/**
 * Get MET value by activity key
 * @param {string} activityKey - Key from CARDIO_ACTIVITIES or WEIGHT_TRAINING_MET
 * @returns {number} MET value
 */
export const getMETValue = (activityKey) => {
  return CARDIO_ACTIVITIES[activityKey]?.met || 
         WEIGHT_TRAINING_MET[activityKey]?.met || 
         5.0; // Default fallback
};

/**
 * Get activity details by key
 * @param {string} activityKey - Key from CARDIO_ACTIVITIES
 * @returns {object} Activity object with name, met, category, description
 */
export const getActivityDetails = (activityKey) => {
  return CARDIO_ACTIVITIES[activityKey] || null;
};

/**
 * Get all activities by category
 * @param {string} category - Category name
 * @returns {array} Array of activity objects
 */
export const getActivitiesByCategory = (category) => {
  return Object.entries(CARDIO_ACTIVITIES)
    .filter(([_, activity]) => activity.category === category)
    .map(([key, activity]) => ({ key, ...activity }));
};

/**
 * Get all cardio activity keys for dropdown
 * @returns {array} Array of { value, label } objects
 */
export const getCardioActivityOptions = () => {
  return Object.entries(CARDIO_ACTIVITIES).map(([key, activity]) => ({
    value: key,
    label: activity.name,
    category: activity.category,
  }));
};

/**
 * Get weight training intensity options for dropdown
 * @returns {array} Array of { value, label } objects
 */
export const getWeightIntensityOptions = () => {
  return Object.entries(WEIGHT_TRAINING_MET).map(([key, intensity]) => ({
    value: key,
    label: intensity.name,
    description: intensity.description,
  }));
};