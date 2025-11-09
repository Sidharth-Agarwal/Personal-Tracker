import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';

/**
 * useWorkouts Hook
 * Manage workout CRUD operations
 * TODO: Replace with actual Firebase operations
 */

export const useWorkouts = () => {
  const { user } = useAuth();
  const { success, error: showError } = useNotification();
  
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Load workouts from storage
   */
  const loadWorkouts = useCallback(async () => {
    if (!user) {
      setWorkouts([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // TODO: Replace with Firebase query
      // const q = query(
      //   collection(db, 'workouts'),
      //   where('userId', '==', user.uid),
      //   orderBy('date', 'desc')
      // );
      // const snapshot = await getDocs(q);
      // const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // For now, use localStorage
      const stored = localStorage.getItem(`workouts_${user.uid}`);
      const data = stored ? JSON.parse(stored) : [];

      setWorkouts(data);
      setLoading(false);
    } catch (err) {
      console.error('Error loading workouts:', err);
      setError(err.message);
      setLoading(false);
      showError('Failed to load workouts');
    }
  }, [user, showError]);

  /**
   * Add new workout
   */
  const addWorkout = useCallback(async (workoutData) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      setLoading(true);

      const newWorkout = {
        id: Date.now().toString(),
        userId: user.uid,
        ...workoutData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // TODO: Replace with Firebase
      // const docRef = await addDoc(collection(db, 'workouts'), newWorkout);
      // newWorkout.id = docRef.id;

      const updatedWorkouts = [newWorkout, ...workouts];
      setWorkouts(updatedWorkouts);
      
      // Save to localStorage
      localStorage.setItem(`workouts_${user.uid}`, JSON.stringify(updatedWorkouts));

      setLoading(false);
      success('Workout added successfully!');
      return newWorkout;
    } catch (err) {
      console.error('Error adding workout:', err);
      setError(err.message);
      setLoading(false);
      showError('Failed to add workout');
      throw err;
    }
  }, [user, workouts, success, showError]);

  /**
   * Update workout
   */
  const updateWorkout = useCallback(async (workoutId, updates) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      setLoading(true);

      // TODO: Replace with Firebase
      // await updateDoc(doc(db, 'workouts', workoutId), {
      //   ...updates,
      //   updatedAt: new Date().toISOString(),
      // });

      const updatedWorkouts = workouts.map(workout =>
        workout.id === workoutId
          ? { ...workout, ...updates, updatedAt: new Date().toISOString() }
          : workout
      );

      setWorkouts(updatedWorkouts);
      
      // Save to localStorage
      localStorage.setItem(`workouts_${user.uid}`, JSON.stringify(updatedWorkouts));

      setLoading(false);
      success('Workout updated successfully!');
      return updatedWorkouts.find(w => w.id === workoutId);
    } catch (err) {
      console.error('Error updating workout:', err);
      setError(err.message);
      setLoading(false);
      showError('Failed to update workout');
      throw err;
    }
  }, [user, workouts, success, showError]);

  /**
   * Delete workout
   */
  const deleteWorkout = useCallback(async (workoutId) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      setLoading(true);

      // TODO: Replace with Firebase
      // await deleteDoc(doc(db, 'workouts', workoutId));

      const updatedWorkouts = workouts.filter(workout => workout.id !== workoutId);
      setWorkouts(updatedWorkouts);
      
      // Save to localStorage
      localStorage.setItem(`workouts_${user.uid}`, JSON.stringify(updatedWorkouts));

      setLoading(false);
      success('Workout deleted successfully!');
    } catch (err) {
      console.error('Error deleting workout:', err);
      setError(err.message);
      setLoading(false);
      showError('Failed to delete workout');
      throw err;
    }
  }, [user, workouts, success, showError]);

  /**
   * Get workout by ID
   */
  const getWorkoutById = useCallback((workoutId) => {
    return workouts.find(workout => workout.id === workoutId) || null;
  }, [workouts]);

  /**
   * Get workouts by date range
   */
  const getWorkoutsByDateRange = useCallback((startDate, endDate) => {
    return workouts.filter(workout => {
      const workoutDate = new Date(workout.date);
      return workoutDate >= new Date(startDate) && workoutDate <= new Date(endDate);
    });
  }, [workouts]);

  /**
   * Get workouts by type
   */
  const getWorkoutsByType = useCallback((type) => {
    return workouts.filter(workout => workout.type === type);
  }, [workouts]);

  // Load workouts on mount and when user changes
  useEffect(() => {
    loadWorkouts();
  }, [loadWorkouts]);

  return {
    workouts,
    loading,
    error,
    addWorkout,
    updateWorkout,
    deleteWorkout,
    getWorkoutById,
    getWorkoutsByDateRange,
    getWorkoutsByType,
    refreshWorkouts: loadWorkouts,
  };
};