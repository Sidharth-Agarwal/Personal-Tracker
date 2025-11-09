import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { calculateUserCalorieProfile } from '../utils/calorieCalculator';

/**
 * User Profile Context
 * Manages user profile data and maintenance calorie calculations
 */

const UserProfileContext = createContext();

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};

// Default profile structure
const defaultProfile = {
  // Basic Info
  name: '',
  email: '',
  
  // Physical Stats
  age: null,
  gender: 'male',
  height: null, // cm
  currentWeight: null, // kg
  targetWeight: null, // kg
  
  // Activity & Goals
  activityLevel: 'moderate',
  goal: 'maintain', // lose, maintain, gain
  weeklyWeightChange: 0.5, // kg per week
  
  // Calculated Calories (will be computed)
  calories: {
    bmr: 0,
    tdee: 0,
    maintenance: 0,
    target: 0,
    macros: {
      protein: 0,
      carbs: 0,
      fats: 0,
    },
    dailyDeficit: 0,
    weeklyWeightChange: 0,
    lastCalculated: null,
  },
  
  // Module Settings
  settings: {
    workouts: {
      defaultWeightUnit: 'kg',
      defaultDistanceUnit: 'km',
      restTimerEnabled: true,
      defaultRestTime: 90, // seconds
    },
    eating: {
      mealsPerDay: 3,
      trackWater: true,
      waterGoal: 3000, // ml
    },
    walking: {
      dailyStepGoal: 10000,
      distanceUnit: 'km',
    },
    sleep: {
      targetHours: 7.5,
      bedtimeReminder: true,
      reminderTime: '22:00',
    },
    phoneUsage: {
      dailyLimit: 180, // minutes
      trackApps: true,
    },
    tasks: {
      defaultPriority: 'medium',
      showCompleted: true,
    },
  },
  
  // Timestamps
  createdAt: null,
  updatedAt: null,
};

export const UserProfileProvider = ({ children }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(defaultProfile);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load profile when user changes
  useEffect(() => {
    if (user) {
      loadProfile();
    } else {
      setProfile(defaultProfile);
      setLoading(false);
    }
  }, [user]);

  /**
   * Load user profile from Firebase
   */
  const loadProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Replace with actual Firebase fetch
      // const docRef = doc(db, 'userProfiles', user.uid);
      // const docSnap = await getDoc(docRef);
      
      // For now, load from localStorage
      const storedProfile = localStorage.getItem(`tracker_profile_${user.uid}`);
      
      if (storedProfile) {
        const parsedProfile = JSON.parse(storedProfile);
        setProfile(parsedProfile);
      } else {
        // Initialize new profile with user data
        const newProfile = {
          ...defaultProfile,
          name: user.displayName || '',
          email: user.email || '',
          createdAt: new Date().toISOString(),
        };
        setProfile(newProfile);
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error loading profile:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  /**
   * Update user profile
   * @param {object} updates - Profile updates
   */
  const updateProfile = async (updates) => {
    try {
      setLoading(true);
      setError(null);
      
      const updatedProfile = {
        ...profile,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      
      // Recalculate calories if physical stats changed
      const physicalStatsChanged = 
        updates.age !== undefined ||
        updates.gender !== undefined ||
        updates.height !== undefined ||
        updates.currentWeight !== undefined ||
        updates.activityLevel !== undefined ||
        updates.goal !== undefined ||
        updates.weeklyWeightChange !== undefined;
      
      if (physicalStatsChanged && updatedProfile.age && updatedProfile.height && updatedProfile.currentWeight) {
        const calorieProfile = calculateUserCalorieProfile({
          weight: updatedProfile.currentWeight,
          height: updatedProfile.height,
          age: updatedProfile.age,
          gender: updatedProfile.gender,
          activityLevel: updatedProfile.activityLevel,
          goal: updatedProfile.goal,
          weeklyChange: updatedProfile.weeklyWeightChange,
        });
        
        updatedProfile.calories = calorieProfile;
      }
      
      // TODO: Replace with actual Firebase update
      // await setDoc(doc(db, 'userProfiles', user.uid), updatedProfile);
      
      // For now, save to localStorage
      localStorage.setItem(`tracker_profile_${user.uid}`, JSON.stringify(updatedProfile));
      
      setProfile(updatedProfile);
      setLoading(false);
      
      return updatedProfile;
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  /**
   * Update only settings
   * @param {object} settingsUpdates - Settings updates
   */
  const updateSettings = async (settingsUpdates) => {
    try {
      const updatedSettings = {
        ...profile.settings,
        ...settingsUpdates,
      };
      
      return await updateProfile({ settings: updatedSettings });
    } catch (err) {
      console.error('Error updating settings:', err);
      throw err;
    }
  };

  /**
   * Recalculate calories manually
   */
  const recalculateCalories = async () => {
    try {
      if (!profile.age || !profile.height || !profile.currentWeight) {
        throw new Error('Missing required profile data for calorie calculation');
      }
      
      const calorieProfile = calculateUserCalorieProfile({
        weight: profile.currentWeight,
        height: profile.height,
        age: profile.age,
        gender: profile.gender,
        activityLevel: profile.activityLevel,
        goal: profile.goal,
        weeklyChange: profile.weeklyWeightChange,
      });
      
      return await updateProfile({ calories: calorieProfile });
    } catch (err) {
      console.error('Error recalculating calories:', err);
      throw err;
    }
  };

  /**
   * Update current weight (for tracking progress)
   * @param {number} newWeight - New weight in kg
   */
  const updateCurrentWeight = async (newWeight) => {
    try {
      return await updateProfile({ 
        currentWeight: newWeight,
      });
    } catch (err) {
      console.error('Error updating weight:', err);
      throw err;
    }
  };

  /**
   * Update goal
   * @param {string} newGoal - New goal (lose, maintain, gain)
   * @param {number} weeklyChange - Target weight change per week
   */
  const updateGoal = async (newGoal, weeklyChange = 0.5) => {
    try {
      return await updateProfile({ 
        goal: newGoal,
        weeklyWeightChange: weeklyChange,
      });
    } catch (err) {
      console.error('Error updating goal:', err);
      throw err;
    }
  };

  /**
   * Check if profile is complete
   */
  const isProfileComplete = () => {
    return !!(
      profile.age &&
      profile.gender &&
      profile.height &&
      profile.currentWeight &&
      profile.activityLevel &&
      profile.goal
    );
  };

  /**
   * Get profile completion percentage
   */
  const getProfileCompletionPercentage = () => {
    const requiredFields = [
      'age',
      'gender',
      'height',
      'currentWeight',
      'targetWeight',
      'activityLevel',
      'goal',
    ];
    
    const completedFields = requiredFields.filter(field => 
      profile[field] !== null && profile[field] !== ''
    ).length;
    
    return Math.round((completedFields / requiredFields.length) * 100);
  };

  /**
   * Reset profile to defaults
   */
  const resetProfile = async () => {
    try {
      setLoading(true);
      
      const newProfile = {
        ...defaultProfile,
        name: user?.displayName || '',
        email: user?.email || '',
        createdAt: new Date().toISOString(),
      };
      
      // TODO: Replace with actual Firebase update
      // await setDoc(doc(db, 'userProfiles', user.uid), newProfile);
      
      localStorage.setItem(`tracker_profile_${user.uid}`, JSON.stringify(newProfile));
      
      setProfile(newProfile);
      setLoading(false);
      
      return newProfile;
    } catch (err) {
      console.error('Error resetting profile:', err);
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const value = {
    profile,
    loading,
    error,
    updateProfile,
    updateSettings,
    recalculateCalories,
    updateCurrentWeight,
    updateGoal,
    isProfileComplete: isProfileComplete(),
    profileCompletionPercentage: getProfileCompletionPercentage(),
    resetProfile,
    
    // Quick access to important data
    calories: profile.calories,
    settings: profile.settings,
    hasCalorieData: profile.calories.bmr > 0,
  };

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
};