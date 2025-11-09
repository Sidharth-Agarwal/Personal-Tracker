/**
 * Workout-specific Helper Utilities
 * Functions for workout calculations and formatting
 */

import { getExerciseById, getMuscleGroup } from '../constants';
import { calculateActivityCalories, calculateWeightTrainingCalories } from './calorieCalculator';
import { formatDuration } from './dateHelpers';

/**
 * Calculate total volume for a workout
 * @param {array} exercises - Array of exercises with sets
 * @returns {number} Total volume (sets × reps × weight)
 */
export const calculateTotalVolume = (exercises) => {
  return exercises.reduce((total, exercise) => {
    const exerciseVolume = exercise.sets.reduce((sum, set) => {
      return sum + (set.reps * set.weight);
    }, 0);
    return total + exerciseVolume;
  }, 0);
};

/**
 * Calculate total sets for a workout
 * @param {array} exercises - Array of exercises with sets
 * @returns {number} Total number of sets
 */
export const calculateTotalSets = (exercises) => {
  return exercises.reduce((total, exercise) => {
    return total + (exercise.sets?.length || 0);
  }, 0);
};

/**
 * Calculate total reps for a workout
 * @param {array} exercises - Array of exercises with sets
 * @returns {number} Total number of reps
 */
export const calculateTotalReps = (exercises) => {
  return exercises.reduce((total, exercise) => {
    const exerciseReps = exercise.sets.reduce((sum, set) => sum + set.reps, 0);
    return total + exerciseReps;
  }, 0);
};

/**
 * Get muscle groups worked in a workout
 * @param {array} exercises - Array of exercises
 * @returns {array} Array of unique muscle groups
 */
export const getMuscleGroupsWorked = (exercises) => {
  const muscleGroups = new Set();
  
  exercises.forEach(exercise => {
    if (exercise.muscleGroup) {
      muscleGroups.add(exercise.muscleGroup);
    } else if (exercise.exerciseId) {
      const exerciseDetails = getExerciseById(exercise.exerciseId);
      if (exerciseDetails?.muscleGroup) {
        muscleGroups.add(exerciseDetails.muscleGroup);
      }
    }
  });
  
  return Array.from(muscleGroups);
};

/**
 * Calculate personal record (PR) for an exercise
 * @param {array} workoutHistory - Array of past workouts
 * @param {string} exerciseId - Exercise ID
 * @param {string} type - Type of PR ('weight', 'volume', 'reps')
 * @returns {object} PR details
 */
export const calculatePersonalRecord = (workoutHistory, exerciseId, type = 'weight') => {
  let bestValue = 0;
  let bestWorkout = null;
  
  workoutHistory.forEach(workout => {
    if (workout.type !== 'weights') return;
    
    const exercise = workout.exercises?.find(ex => ex.exerciseId === exerciseId);
    if (!exercise) return;
    
    let value = 0;
    
    if (type === 'weight') {
      // Find max weight in any set
      value = Math.max(...exercise.sets.map(set => set.weight));
    } else if (type === 'volume') {
      // Calculate total volume for this exercise
      value = exercise.sets.reduce((sum, set) => sum + (set.reps * set.weight), 0);
    } else if (type === 'reps') {
      // Find max reps in any set
      value = Math.max(...exercise.sets.map(set => set.reps));
    }
    
    if (value > bestValue) {
      bestValue = value;
      bestWorkout = workout;
    }
  });
  
  return {
    value: bestValue,
    workout: bestWorkout,
    exerciseId,
    type,
  };
};

/**
 * Check if current workout beats a PR
 * @param {object} currentExercise - Current exercise data
 * @param {object} pr - Personal record object
 * @param {string} type - Type of PR
 * @returns {boolean} True if PR is beaten
 */
export const isPRBeaten = (currentExercise, pr, type = 'weight') => {
  if (!pr || pr.value === 0) return false;
  
  let currentValue = 0;
  
  if (type === 'weight') {
    currentValue = Math.max(...currentExercise.sets.map(set => set.weight));
  } else if (type === 'volume') {
    currentValue = currentExercise.sets.reduce((sum, set) => sum + (set.reps * set.weight), 0);
  } else if (type === 'reps') {
    currentValue = Math.max(...currentExercise.sets.map(set => set.reps));
  }
  
  return currentValue > pr.value;
};

/**
 * Calculate workout intensity score
 * @param {object} workout - Workout object
 * @returns {number} Intensity score (1-10)
 */
export const calculateWorkoutIntensity = (workout) => {
  if (workout.type === 'cardio') {
    const intensityMap = {
      low: 3,
      moderate: 6,
      high: 8,
      extreme: 10,
    };
    return intensityMap[workout.intensity] || 5;
  } else if (workout.type === 'weights') {
    const totalSets = calculateTotalSets(workout.exercises);
    const totalVolume = calculateTotalVolume(workout.exercises);
    
    // Simple intensity calculation based on sets and volume
    let intensity = 5;
    
    if (totalSets > 30 || totalVolume > 15000) {
      intensity = 9;
    } else if (totalSets > 20 || totalVolume > 10000) {
      intensity = 7;
    } else if (totalSets < 10 || totalVolume < 3000) {
      intensity = 4;
    }
    
    return intensity;
  }
  
  return 5;
};

/**
 * Format workout summary
 * @param {object} workout - Workout object
 * @returns {string} Formatted summary
 */
export const formatWorkoutSummary = (workout) => {
  if (workout.type === 'cardio') {
    const parts = [workout.cardioType];
    
    if (workout.duration) {
      parts.push(formatDuration(workout.duration));
    }
    
    if (workout.distance) {
      parts.push(`${workout.distance} km`);
    }
    
    if (workout.calories?.value) {
      parts.push(`${workout.calories.value} cal`);
    }
    
    return parts.join(' • ');
  } else if (workout.type === 'weights') {
    const totalSets = calculateTotalSets(workout.exercises);
    const totalVolume = calculateTotalVolume(workout.exercises);
    const muscleGroups = getMuscleGroupsWorked(workout.exercises);
    
    const parts = [
      `${workout.exercises.length} exercises`,
      `${totalSets} sets`,
      `${Math.round(totalVolume)} kg volume`,
    ];
    
    if (workout.calories?.value) {
      parts.push(`${workout.calories.value} cal`);
    }
    
    return parts.join(' • ');
  }
  
  return 'Workout';
};

/**
 * Get workout streak
 * @param {array} workouts - Array of workouts sorted by date
 * @returns {number} Current streak in days
 */
export const getWorkoutStreak = (workouts) => {
  if (!workouts || workouts.length === 0) return 0;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let streak = 0;
  let currentDate = new Date(today);
  
  // Sort workouts by date (most recent first)
  const sortedWorkouts = [...workouts].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );
  
  // Group workouts by date
  const workoutDates = new Set(
    sortedWorkouts.map(w => new Date(w.date).toDateString())
  );
  
  // Count consecutive days with workouts
  while (workoutDates.has(currentDate.toDateString())) {
    streak++;
    currentDate.setDate(currentDate.getDate() - 1);
  }
  
  return streak;
};

/**
 * Calculate rest time between sets
 * @param {Date} setEndTime - End time of previous set
 * @param {Date} setStartTime - Start time of current set
 * @returns {number} Rest time in seconds
 */
export const calculateRestTime = (setEndTime, setStartTime) => {
  const diff = new Date(setStartTime) - new Date(setEndTime);
  return Math.round(diff / 1000);
};

/**
 * Get recommended rest time based on workout type
 * @param {string} workoutType - Type of workout
 * @param {string} intensity - Intensity level
 * @returns {number} Recommended rest time in seconds
 */
export const getRecommendedRestTime = (workoutType, intensity = 'moderate') => {
  if (workoutType === 'strength') {
    return 180; // 3 minutes for strength
  } else if (workoutType === 'hypertrophy') {
    return 90; // 1.5 minutes for hypertrophy
  } else if (workoutType === 'endurance') {
    return 45; // 45 seconds for endurance
  } else if (workoutType === 'circuit') {
    return 30; // 30 seconds for circuit
  }
  
  return 60; // Default 1 minute
};

/**
 * Calculate estimated workout duration
 * @param {array} exercises - Array of exercises with sets
 * @param {number} restTime - Rest time between sets in seconds
 * @returns {number} Estimated duration in minutes
 */
export const estimateWorkoutDuration = (exercises, restTime = 60) => {
  const totalSets = calculateTotalSets(exercises);
  
  // Assume 30 seconds per set + rest time
  const setTime = 30; // seconds
  const totalTime = (totalSets * setTime) + ((totalSets - 1) * restTime);
  
  // Add 5 minutes for warmup
  return Math.round((totalTime / 60) + 5);
};

/**
 * Compare workout to previous similar workout
 * @param {object} currentWorkout - Current workout
 * @param {object} previousWorkout - Previous workout
 * @returns {object} Comparison results
 */
export const compareWorkouts = (currentWorkout, previousWorkout) => {
  if (!previousWorkout) {
    return {
      volumeChange: 0,
      calorieChange: 0,
      durationChange: 0,
      isImprovement: false,
    };
  }
  
  const currentVolume = calculateTotalVolume(currentWorkout.exercises || []);
  const previousVolume = calculateTotalVolume(previousWorkout.exercises || []);
  
  const currentCalories = currentWorkout.calories?.value || 0;
  const previousCalories = previousWorkout.calories?.value || 0;
  
  const currentDuration = currentWorkout.duration || 0;
  const previousDuration = previousWorkout.duration || 0;
  
  const volumeChange = previousVolume > 0 
    ? ((currentVolume - previousVolume) / previousVolume) * 100 
    : 0;
  
  const calorieChange = previousCalories > 0 
    ? ((currentCalories - previousCalories) / previousCalories) * 100 
    : 0;
  
  const durationChange = previousDuration > 0 
    ? ((currentDuration - previousDuration) / previousDuration) * 100 
    : 0;
  
  return {
    volumeChange: Math.round(volumeChange),
    calorieChange: Math.round(calorieChange),
    durationChange: Math.round(durationChange),
    isImprovement: volumeChange > 0 || calorieChange > 5,
  };
};

/**
 * Get workout difficulty level
 * @param {object} workout - Workout object
 * @returns {string} Difficulty level
 */
export const getWorkoutDifficulty = (workout) => {
  const intensity = calculateWorkoutIntensity(workout);
  
  if (intensity >= 8) return 'hard';
  if (intensity >= 6) return 'moderate';
  return 'easy';
};

/**
 * Format exercise sets summary
 * @param {array} sets - Array of sets
 * @returns {string} Formatted sets summary
 */
export const formatSetsSummary = (sets) => {
  if (!sets || sets.length === 0) return 'No sets';
  
  return sets.map(set => `${set.reps} × ${set.weight}kg`).join(', ');
};