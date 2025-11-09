/**
 * Calorie Calculation Utilities
 * Shared across all modules (Workouts, Walking, Eating)
 */

import { getMETValue, INTENSITY_MULTIPLIERS } from '../constants/metValues';

// ==========================================
// 1. BMR (Basal Metabolic Rate) Calculations
// ==========================================

/**
 * Calculate BMR using Mifflin-St Jeor Equation (Most accurate for modern populations)
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @param {number} age - Age in years
 * @param {string} gender - 'male' or 'female'
 * @returns {number} BMR in calories/day
 */
export const calculateBMR = (weight, height, age, gender) => {
  if (!weight || !height || !age || !gender) {
    throw new Error('Missing required parameters for BMR calculation');
  }
  
  // Mifflin-St Jeor Equation
  // Men: BMR = 10W + 6.25H - 5A + 5
  // Women: BMR = 10W + 6.25H - 5A - 161
  const baseBMR = 10 * weight + 6.25 * height - 5 * age;
  
  if (gender === 'male') {
    return Math.round(baseBMR + 5);
  } else {
    return Math.round(baseBMR - 161);
  }
};

/**
 * Calculate BMR using Harris-Benedict Equation (Alternative method)
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @param {number} age - Age in years
 * @param {string} gender - 'male' or 'female'
 * @returns {number} BMR in calories/day
 */
export const calculateBMRHarrisBenedict = (weight, height, age, gender) => {
  if (!weight || !height || !age || !gender) {
    throw new Error('Missing required parameters for BMR calculation');
  }
  
  // Harris-Benedict Equation
  // Men: BMR = 88.362 + (13.397 × W) + (4.799 × H) - (5.677 × A)
  // Women: BMR = 447.593 + (9.247 × W) + (3.098 × H) - (4.330 × A)
  
  if (gender === 'male') {
    return Math.round(88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age));
  } else {
    return Math.round(447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age));
  }
};

// ==========================================
// 2. TDEE (Total Daily Energy Expenditure)
// ==========================================

/**
 * Activity level multipliers for TDEE calculation
 */
export const ACTIVITY_MULTIPLIERS = {
  sedentary: {
    value: 1.2,
    label: 'Sedentary',
    description: 'Little to no exercise, desk job'
  },
  light: {
    value: 1.375,
    label: 'Lightly Active',
    description: 'Light exercise 1-3 days/week'
  },
  moderate: {
    value: 1.55,
    label: 'Moderately Active',
    description: 'Moderate exercise 3-5 days/week'
  },
  active: {
    value: 1.725,
    label: 'Very Active',
    description: 'Hard exercise 6-7 days/week'
  },
  very_active: {
    value: 1.9,
    label: 'Extremely Active',
    description: 'Very hard exercise, physical job, training 2x/day'
  },
};

/**
 * Calculate TDEE (Maintenance Calories)
 * @param {number} bmr - Basal Metabolic Rate
 * @param {string} activityLevel - Activity level key from ACTIVITY_MULTIPLIERS
 * @returns {number} TDEE in calories/day
 */
export const calculateTDEE = (bmr, activityLevel) => {
  if (!bmr || !activityLevel) {
    throw new Error('Missing required parameters for TDEE calculation');
  }
  
  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel]?.value || 1.2;
  return Math.round(bmr * multiplier);
};

// ==========================================
// 3. Target Calories (Based on Goals)
// ==========================================

/**
 * Calculate target calories based on weight goal
 * @param {number} tdee - Total Daily Energy Expenditure
 * @param {string} goal - 'lose', 'maintain', or 'gain'
 * @param {number} weeklyChange - Target weight change in kg per week (default 0.5)
 * @returns {number} Target calories/day
 */
export const calculateTargetCalories = (tdee, goal, weeklyChange = 0.5) => {
  if (!tdee || !goal) {
    throw new Error('Missing required parameters for target calorie calculation');
  }
  
  // 1 kg of fat ≈ 7700 calories
  // Daily calorie deficit/surplus = (7700 × weeklyChange) / 7
  const dailyChange = Math.round((7700 * weeklyChange) / 7);
  
  switch (goal) {
    case 'lose':
      return Math.round(tdee - dailyChange);
    case 'gain':
      return Math.round(tdee + dailyChange);
    case 'maintain':
    default:
      return tdee;
  }
};

/**
 * Calculate daily calorie deficit/surplus
 * @param {number} tdee - Maintenance calories
 * @param {number} target - Target calories
 * @returns {number} Daily deficit (negative) or surplus (positive)
 */
export const calculateDailyDeficitSurplus = (tdee, target) => {
  return target - tdee;
};

// ==========================================
// 4. Activity Calories (MET-based)
// ==========================================

/**
 * Calculate calories burned from activity using MET values
 * @param {string|number} metValue - MET value or activity key
 * @param {number} weight - Weight in kg
 * @param {number} durationMinutes - Duration in minutes
 * @param {string} intensity - Intensity multiplier key (optional)
 * @returns {number} Calories burned
 */
export const calculateActivityCalories = (metValue, weight, durationMinutes, intensity = 'moderate') => {
  if (!weight || !durationMinutes) {
    throw new Error('Missing required parameters for activity calorie calculation');
  }
  
  // Get MET value (if string key provided, look it up)
  const met = typeof metValue === 'string' ? getMETValue(metValue) : metValue;
  
  // Convert minutes to hours
  const durationHours = durationMinutes / 60;
  
  // Get intensity multiplier
  const multiplier = INTENSITY_MULTIPLIERS[intensity] || 1.0;
  
  // Formula: Calories = MET × Weight(kg) × Duration(hours) × Intensity
  const calories = met * weight * durationHours * multiplier;
  
  return Math.round(calories);
};

/**
 * Calculate weight training calories based on workout details
 * @param {array} exercises - Array of exercise objects with sets
 * @param {number} duration - Total workout duration in minutes
 * @param {number} weight - User's weight in kg
 * @returns {object} { calories, intensity, totalSets, totalVolume }
 */
export const calculateWeightTrainingCalories = (exercises, duration, weight) => {
  if (!exercises || !duration || !weight) {
    throw new Error('Missing required parameters for weight training calculation');
  }
  
  // Calculate total sets
  const totalSets = exercises.reduce((sum, exercise) => {
    return sum + (exercise.sets?.length || 0);
  }, 0);
  
  // Calculate total volume (sets × reps × weight)
  const totalVolume = exercises.reduce((sum, exercise) => {
    const exerciseVolume = exercise.sets?.reduce((setSum, set) => {
      return setSum + (set.reps * set.weight);
    }, 0) || 0;
    return sum + exerciseVolume;
  }, 0);
  
  // Determine intensity based on sets and volume
  let intensity = 'moderate';
  if (totalVolume > 10000 || totalSets > 20) {
    intensity = 'vigorous';
  } else if (totalVolume < 3000 || totalSets < 8) {
    intensity = 'light';
  }
  
  // Calculate calories using appropriate MET value
  const metKey = `weights_${intensity}`;
  const calories = calculateActivityCalories(metKey, weight, duration);
  
  return {
    calories,
    intensity,
    totalSets,
    totalVolume: Math.round(totalVolume),
  };
};

// ==========================================
// 5. Macronutrient Breakdown
// ==========================================

/**
 * Calculate macronutrient breakdown based on calories and goal
 * @param {number} calories - Target calories
 * @param {string} goal - 'lose', 'maintain', or 'gain'
 * @returns {object} { protein, carbs, fats } in grams
 */
export const calculateMacros = (calories, goal = 'maintain') => {
  if (!calories) {
    throw new Error('Calories required for macro calculation');
  }
  
  let proteinPercent, carbsPercent, fatsPercent;
  
  // Adjust macro ratios based on goal
  switch (goal) {
    case 'lose':
      // Higher protein to preserve muscle during deficit
      proteinPercent = 0.35;
      fatsPercent = 0.30;
      carbsPercent = 0.35;
      break;
    case 'gain':
      // Higher carbs for energy during surplus
      proteinPercent = 0.30;
      fatsPercent = 0.25;
      carbsPercent = 0.45;
      break;
    case 'maintain':
    default:
      // Balanced macro split
      proteinPercent = 0.30;
      fatsPercent = 0.30;
      carbsPercent = 0.40;
      break;
  }
  
  // Calculate grams (protein: 4 cal/g, carbs: 4 cal/g, fats: 9 cal/g)
  return {
    protein: Math.round((calories * proteinPercent) / 4),
    carbs: Math.round((calories * carbsPercent) / 4),
    fats: Math.round((calories * fatsPercent) / 9),
  };
};

// ==========================================
// 6. Net Calories & Weight Change
// ==========================================

/**
 * Calculate net calories (consumed - burned)
 * @param {number} consumed - Calories consumed
 * @param {number} burned - Calories burned from activity
 * @returns {number} Net calories
 */
export const calculateNetCalories = (consumed, burned) => {
  return consumed - burned;
};

/**
 * Estimate weight change based on net calorie surplus/deficit
 * @param {number} netCalories - Net calories per day
 * @param {number} days - Number of days (default 7)
 * @returns {number} Estimated weight change in kg
 */
export const estimateWeightChange = (netCalories, days = 7) => {
  // 7700 calories ≈ 1 kg of fat
  const totalCalories = netCalories * days;
  return Number((totalCalories / 7700).toFixed(2));
};

// ==========================================
// 7. Walking/Steps Calories
// ==========================================

/**
 * Calculate calories from steps
 * @param {number} steps - Number of steps
 * @param {number} weight - Weight in kg
 * @param {number} strideLength - Stride length in meters (optional)
 * @returns {object} { calories, distance, duration }
 */
export const calculateStepsCalories = (steps, weight, strideLength = null) => {
  if (!steps || !weight) {
    throw new Error('Steps and weight required for calculation');
  }
  
  // Estimate stride length if not provided
  // Average stride length ≈ 0.415 × height (but we don't have height, so use average)
  const avgStrideLength = strideLength || 0.75; // meters (average for adults)
  
  // Calculate distance in km
  const distance = (steps * avgStrideLength) / 1000;
  
  // Estimate duration (average walking pace: 5 km/h)
  const averagePace = 5; // km/h
  const duration = (distance / averagePace) * 60; // minutes
  
  // Calculate calories (using moderate walking MET)
  const calories = calculateActivityCalories('walking_moderate', weight, duration);
  
  return {
    calories: Math.round(calories),
    distance: Number(distance.toFixed(2)),
    duration: Math.round(duration),
  };
};

/**
 * Calculate steps from distance
 * @param {number} distance - Distance in km
 * @param {number} strideLength - Stride length in meters (optional)
 * @returns {number} Estimated steps
 */
export const calculateStepsFromDistance = (distance, strideLength = 0.75) => {
  const distanceMeters = distance * 1000;
  return Math.round(distanceMeters / strideLength);
};

// ==========================================
// 8. Calorie Burn by Activity Duration
// ==========================================

/**
 * Get estimated calories for common activities
 * @param {string} activityType - Activity type key
 * @param {number} weight - Weight in kg
 * @param {number} duration - Duration in minutes
 * @returns {object} { calories, met, activityName }
 */
export const getActivityCalorieEstimate = (activityType, weight, duration) => {
  const met = getMETValue(activityType);
  const calories = calculateActivityCalories(met, weight, duration);
  
  return {
    calories,
    met,
    activityType,
  };
};

// ==========================================
// 9. Complete User Calorie Profile
// ==========================================

/**
 * Calculate complete calorie profile for user
 * @param {object} userData - User data object
 * @returns {object} Complete calorie breakdown
 */
export const calculateUserCalorieProfile = (userData) => {
  const { weight, height, age, gender, activityLevel, goal, weeklyChange } = userData;
  
  if (!weight || !height || !age || !gender || !activityLevel || !goal) {
    throw new Error('Missing required user data for calorie profile calculation');
  }
  
  // Calculate BMR
  const bmr = calculateBMR(weight, height, age, gender);
  
  // Calculate TDEE
  const tdee = calculateTDEE(bmr, activityLevel);
  
  // Calculate target calories
  const target = calculateTargetCalories(tdee, goal, weeklyChange || 0.5);
  
  // Calculate macros
  const macros = calculateMacros(target, goal);
  
  // Calculate deficit/surplus
  const dailyDeficit = calculateDailyDeficitSurplus(tdee, target);
  
  return {
    bmr,
    tdee,
    maintenance: tdee,
    target,
    macros,
    dailyDeficit,
    weeklyWeightChange: estimateWeightChange(dailyDeficit, 7),
    calculatedAt: new Date().toISOString(),
  };
};