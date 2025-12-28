import { isToday, isYesterday, startOfDay, differenceInDays } from 'date-fns';

/**
 * Calculate the current streak of consecutive days with completed tasks
 * @param {Array} tasks - Array of all tasks
 * @returns {number} Current streak count
 */
export const calculateStreak = (tasks) => {
  // Get all completed tasks with updatedAt timestamps
  const completedTasks = tasks
    .filter(task => task.completed && task.updatedAt)
    .map(task => {
      const date = task.updatedAt.toDate ? task.updatedAt.toDate() : new Date(task.updatedAt);
      return startOfDay(date);
    })
    .sort((a, b) => b - a); // Sort descending (newest first)

  if (completedTasks.length === 0) return 0;

  // Get unique dates (remove duplicates)
  const uniqueDates = [...new Set(completedTasks.map(date => date.getTime()))].map(time => new Date(time));

  // Check if there's a task completed today or yesterday to start the streak
  const latestDate = uniqueDates[0];
  if (!isToday(latestDate) && !isYesterday(latestDate)) {
    return 0; // Streak is broken
  }

  // Count consecutive days
  let streak = 1;
  let expectedDate = isToday(latestDate) ? latestDate : new Date();

  for (let i = 1; i < uniqueDates.length; i++) {
    const currentDate = uniqueDates[i];
    const daysDiff = differenceInDays(startOfDay(expectedDate), startOfDay(currentDate));

    if (daysDiff === 1) {
      streak++;
      expectedDate = currentDate;
    } else {
      break; // Streak is broken
    }
  }

  return streak;
};

/**
 * Get the longest streak ever achieved
 * @param {Array} tasks - Array of all tasks
 * @returns {number} Longest streak count
 */
export const calculateLongestStreak = (tasks) => {
  const completedTasks = tasks
    .filter(task => task.completed && task.updatedAt)
    .map(task => {
      const date = task.updatedAt.toDate ? task.updatedAt.toDate() : new Date(task.updatedAt);
      return startOfDay(date);
    })
    .sort((a, b) => a - b); // Sort ascending (oldest first)

  if (completedTasks.length === 0) return 0;

  const uniqueDates = [...new Set(completedTasks.map(date => date.getTime()))].map(time => new Date(time));

  let maxStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < uniqueDates.length; i++) {
    const daysDiff = differenceInDays(uniqueDates[i], uniqueDates[i - 1]);

    if (daysDiff === 1) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 1;
    }
  }

  return maxStreak;
};
