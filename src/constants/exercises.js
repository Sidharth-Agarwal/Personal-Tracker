/**
 * Exercise Library for Weight Training
 * Organized by muscle groups
 */

// Comprehensive exercise database
export const EXERCISES_BY_MUSCLE = {
  chest: [
    { id: 'bench_press', name: 'Bench Press', equipment: 'barbell', difficulty: 'intermediate' },
    { id: 'incline_bench', name: 'Incline Bench Press', equipment: 'barbell', difficulty: 'intermediate' },
    { id: 'decline_bench', name: 'Decline Bench Press', equipment: 'barbell', difficulty: 'intermediate' },
    { id: 'dumbbell_press', name: 'Dumbbell Press', equipment: 'dumbbell', difficulty: 'beginner' },
    { id: 'incline_dumbbell', name: 'Incline Dumbbell Press', equipment: 'dumbbell', difficulty: 'beginner' },
    { id: 'dumbbell_fly', name: 'Dumbbell Fly', equipment: 'dumbbell', difficulty: 'beginner' },
    { id: 'cable_crossover', name: 'Cable Crossover', equipment: 'cable', difficulty: 'intermediate' },
    { id: 'pushups', name: 'Push-ups', equipment: 'bodyweight', difficulty: 'beginner' },
    { id: 'dips_chest', name: 'Chest Dips', equipment: 'bodyweight', difficulty: 'intermediate' },
    { id: 'pec_deck', name: 'Pec Deck Machine', equipment: 'machine', difficulty: 'beginner' },
  ],
  
  back: [
    { id: 'deadlift', name: 'Deadlift', equipment: 'barbell', difficulty: 'advanced' },
    { id: 'pullups', name: 'Pull-ups', equipment: 'bodyweight', difficulty: 'intermediate' },
    { id: 'chinups', name: 'Chin-ups', equipment: 'bodyweight', difficulty: 'intermediate' },
    { id: 'barbell_row', name: 'Barbell Row', equipment: 'barbell', difficulty: 'intermediate' },
    { id: 'dumbbell_row', name: 'Dumbbell Row', equipment: 'dumbbell', difficulty: 'beginner' },
    { id: 'lat_pulldown', name: 'Lat Pulldown', equipment: 'cable', difficulty: 'beginner' },
    { id: 'seated_cable_row', name: 'Seated Cable Row', equipment: 'cable', difficulty: 'beginner' },
    { id: 't_bar_row', name: 'T-Bar Row', equipment: 'barbell', difficulty: 'intermediate' },
    { id: 'face_pulls', name: 'Face Pulls', equipment: 'cable', difficulty: 'beginner' },
    { id: 'hyperextensions', name: 'Back Extensions', equipment: 'bodyweight', difficulty: 'beginner' },
  ],
  
  legs: [
    { id: 'squat', name: 'Barbell Squat', equipment: 'barbell', difficulty: 'intermediate' },
    { id: 'front_squat', name: 'Front Squat', equipment: 'barbell', difficulty: 'advanced' },
    { id: 'leg_press', name: 'Leg Press', equipment: 'machine', difficulty: 'beginner' },
    { id: 'lunges', name: 'Lunges', equipment: 'bodyweight', difficulty: 'beginner' },
    { id: 'bulgarian_split', name: 'Bulgarian Split Squat', equipment: 'dumbbell', difficulty: 'intermediate' },
    { id: 'leg_curl', name: 'Leg Curl', equipment: 'machine', difficulty: 'beginner' },
    { id: 'leg_extension', name: 'Leg Extension', equipment: 'machine', difficulty: 'beginner' },
    { id: 'romanian_deadlift', name: 'Romanian Deadlift', equipment: 'barbell', difficulty: 'intermediate' },
    { id: 'calf_raises', name: 'Calf Raises', equipment: 'machine', difficulty: 'beginner' },
    { id: 'goblet_squat', name: 'Goblet Squat', equipment: 'dumbbell', difficulty: 'beginner' },
  ],
  
  shoulders: [
    { id: 'overhead_press', name: 'Overhead Press', equipment: 'barbell', difficulty: 'intermediate' },
    { id: 'military_press', name: 'Military Press', equipment: 'barbell', difficulty: 'intermediate' },
    { id: 'dumbbell_shoulder_press', name: 'Dumbbell Shoulder Press', equipment: 'dumbbell', difficulty: 'beginner' },
    { id: 'lateral_raises', name: 'Lateral Raises', equipment: 'dumbbell', difficulty: 'beginner' },
    { id: 'front_raises', name: 'Front Raises', equipment: 'dumbbell', difficulty: 'beginner' },
    { id: 'rear_delt_fly', name: 'Rear Delt Fly', equipment: 'dumbbell', difficulty: 'beginner' },
    { id: 'arnold_press', name: 'Arnold Press', equipment: 'dumbbell', difficulty: 'intermediate' },
    { id: 'shrugs', name: 'Barbell Shrugs', equipment: 'barbell', difficulty: 'beginner' },
    { id: 'upright_row', name: 'Upright Row', equipment: 'barbell', difficulty: 'intermediate' },
  ],
  
  arms: [
    // Biceps
    { id: 'barbell_curl', name: 'Barbell Curl', equipment: 'barbell', difficulty: 'beginner' },
    { id: 'dumbbell_curl', name: 'Dumbbell Curl', equipment: 'dumbbell', difficulty: 'beginner' },
    { id: 'hammer_curl', name: 'Hammer Curl', equipment: 'dumbbell', difficulty: 'beginner' },
    { id: 'preacher_curl', name: 'Preacher Curl', equipment: 'machine', difficulty: 'beginner' },
    { id: 'cable_curl', name: 'Cable Curl', equipment: 'cable', difficulty: 'beginner' },
    { id: 'concentration_curl', name: 'Concentration Curl', equipment: 'dumbbell', difficulty: 'beginner' },
    
    // Triceps
    { id: 'close_grip_bench', name: 'Close Grip Bench Press', equipment: 'barbell', difficulty: 'intermediate' },
    { id: 'tricep_dips', name: 'Tricep Dips', equipment: 'bodyweight', difficulty: 'intermediate' },
    { id: 'skull_crushers', name: 'Skull Crushers', equipment: 'barbell', difficulty: 'intermediate' },
    { id: 'tricep_pushdown', name: 'Tricep Pushdown', equipment: 'cable', difficulty: 'beginner' },
    { id: 'overhead_tricep', name: 'Overhead Tricep Extension', equipment: 'dumbbell', difficulty: 'beginner' },
    { id: 'diamond_pushups', name: 'Diamond Push-ups', equipment: 'bodyweight', difficulty: 'intermediate' },
  ],
  
  core: [
    { id: 'planks', name: 'Plank', equipment: 'bodyweight', difficulty: 'beginner' },
    { id: 'side_plank', name: 'Side Plank', equipment: 'bodyweight', difficulty: 'beginner' },
    { id: 'crunches', name: 'Crunches', equipment: 'bodyweight', difficulty: 'beginner' },
    { id: 'bicycle_crunches', name: 'Bicycle Crunches', equipment: 'bodyweight', difficulty: 'beginner' },
    { id: 'russian_twists', name: 'Russian Twists', equipment: 'bodyweight', difficulty: 'beginner' },
    { id: 'leg_raises', name: 'Leg Raises', equipment: 'bodyweight', difficulty: 'intermediate' },
    { id: 'hanging_knee_raise', name: 'Hanging Knee Raises', equipment: 'bodyweight', difficulty: 'intermediate' },
    { id: 'mountain_climbers', name: 'Mountain Climbers', equipment: 'bodyweight', difficulty: 'beginner' },
    { id: 'ab_wheel', name: 'Ab Wheel Rollout', equipment: 'equipment', difficulty: 'advanced' },
    { id: 'cable_crunches', name: 'Cable Crunches', equipment: 'cable', difficulty: 'beginner' },
  ],
};

// Flatten all exercises into a single array
export const ALL_EXERCISES = Object.entries(EXERCISES_BY_MUSCLE).flatMap(([muscle, exercises]) =>
  exercises.map(exercise => ({ ...exercise, muscleGroup: muscle }))
);

// Equipment types
export const EQUIPMENT_TYPES = {
  barbell: { name: 'Barbell', icon: '🏋️' },
  dumbbell: { name: 'Dumbbell', icon: '💪' },
  cable: { name: 'Cable Machine', icon: '⚙️' },
  machine: { name: 'Machine', icon: '🎰' },
  bodyweight: { name: 'Bodyweight', icon: '🧘' },
  equipment: { name: 'Equipment', icon: '🛠️' },
};

// Difficulty levels
export const DIFFICULTY_LEVELS = {
  beginner: { name: 'Beginner', color: 'green' },
  intermediate: { name: 'Intermediate', color: 'yellow' },
  advanced: { name: 'Advanced', color: 'red' },
};

/**
 * Get exercises by muscle group
 * @param {string} muscleGroup - Muscle group key
 * @returns {array} Array of exercises
 */
export const getExercisesByMuscle = (muscleGroup) => {
  return EXERCISES_BY_MUSCLE[muscleGroup] || [];
};

/**
 * Get exercise by ID
 * @param {string} exerciseId - Exercise ID
 * @returns {object|null} Exercise object or null
 */
export const getExerciseById = (exerciseId) => {
  return ALL_EXERCISES.find(ex => ex.id === exerciseId) || null;
};

/**
 * Get exercises by equipment type
 * @param {string} equipment - Equipment type
 * @returns {array} Array of exercises
 */
export const getExercisesByEquipment = (equipment) => {
  return ALL_EXERCISES.filter(ex => ex.equipment === equipment);
};

/**
 * Get exercises by difficulty
 * @param {string} difficulty - Difficulty level
 * @returns {array} Array of exercises
 */
export const getExercisesByDifficulty = (difficulty) => {
  return ALL_EXERCISES.filter(ex => ex.difficulty === difficulty);
};

/**
 * Search exercises by name
 * @param {string} query - Search query
 * @returns {array} Array of matching exercises
 */
export const searchExercises = (query) => {
  const lowerQuery = query.toLowerCase();
  return ALL_EXERCISES.filter(ex => 
    ex.name.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Get exercise options for dropdown (grouped by muscle)
 * @returns {array} Array of grouped options
 */
export const getExerciseOptionsGrouped = () => {
  return Object.entries(EXERCISES_BY_MUSCLE).map(([muscle, exercises]) => ({
    label: muscle.charAt(0).toUpperCase() + muscle.slice(1),
    options: exercises.map(ex => ({
      value: ex.id,
      label: ex.name,
      equipment: ex.equipment,
      difficulty: ex.difficulty,
    })),
  }));
};