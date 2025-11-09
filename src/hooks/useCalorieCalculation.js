import { useMemo } from 'react';
import { 
  calculateActivityCalories, 
  calculateWeightTrainingCalories,
  calculateStepsCalories 
} from '../utils/calorieCalculator';
import { useUserProfile } from '../contexts/UserProfileContext';

/**
 * useCalorieCalculation Hook
 * Calculate calories for different activities using user's weight
 */

export const useCalorieCalculation = () => {
  const { profile } = useUserProfile();
  const userWeight = profile.currentWeight || 75; // Default 75kg

  /**
   * Calculate calories for cardio activity
   */
  const calculateCardioCalories = useMemo(() => {
    return (activityType, duration, intensity = 'moderate') => {
      try {
        return calculateActivityCalories(
          activityType,
          userWeight,
          duration,
          intensity
        );
      } catch (error) {
        console.error('Error calculating cardio calories:', error);
        return 0;
      }
    };
  }, [userWeight]);

  /**
   * Calculate calories for weight training
   */
  const calculateWeightCalories = useMemo(() => {
    return (exercises, duration) => {
      try {
        return calculateWeightTrainingCalories(
          exercises,
          duration,
          userWeight
        );
      } catch (error) {
        console.error('Error calculating weight training calories:', error);
        return {
          calories: 0,
          intensity: 'moderate',
          totalSets: 0,
          totalVolume: 0,
        };
      }
    };
  }, [userWeight]);

  /**
   * Calculate calories from steps
   */
  const calculateStepCalories = useMemo(() => {
    return (steps, strideLength = null) => {
      try {
        return calculateStepsCalories(steps, userWeight, strideLength);
      } catch (error) {
        console.error('Error calculating step calories:', error);
        return {
          calories: 0,
          distance: 0,
          duration: 0,
        };
      }
    };
  }, [userWeight]);

  /**
   * Get user's maintenance calories
   */
  const getMaintenanceCalories = useMemo(() => {
    return {
      bmr: profile.calories?.bmr || 0,
      tdee: profile.calories?.tdee || 0,
      target: profile.calories?.target || 0,
      macros: profile.calories?.macros || { protein: 0, carbs: 0, fats: 0 },
    };
  }, [profile.calories]);

  /**
   * Calculate net calories (consumed - burned)
   */
  const calculateNetCalories = (consumed, burned) => {
    return consumed - burned;
  };

  /**
   * Calculate remaining calories for the day
   */
  const calculateRemainingCalories = (consumed, burned) => {
    const target = profile.calories?.target || 2000;
    const net = consumed - burned;
    return target - net;
  };

  /**
   * Check if calorie goal is met
   */
  const isCalorieGoalMet = (consumed, burned) => {
    const target = profile.calories?.target || 2000;
    const net = consumed - burned;
    const tolerance = target * 0.05; // 5% tolerance
    
    return Math.abs(net - target) <= tolerance;
  };

  return {
    calculateCardioCalories,
    calculateWeightCalories,
    calculateStepCalories,
    getMaintenanceCalories,
    calculateNetCalories,
    calculateRemainingCalories,
    isCalorieGoalMet,
    userWeight,
    hasUserWeight: !!profile.currentWeight,
  };
};