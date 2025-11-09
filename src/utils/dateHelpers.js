/**
 * Date Helper Utilities
 * Functions for date formatting, manipulation, and calculations
 */

/**
 * Format date to readable string
 * @param {Date|string} date - Date object or string
 * @param {string} format - Format type
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'display') => {
  if (!date) return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(d.getTime())) return '';
  
  const options = {
    display: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric' },
    short: { month: 'short', day: 'numeric' },
    numeric: { year: 'numeric', month: '2-digit', day: '2-digit' },
  };
  
  return d.toLocaleDateString('en-US', options[format] || options.display);
};

/**
 * Format time to readable string
 * @param {Date|string} date - Date object or string
 * @param {boolean} includeSeconds - Include seconds in output
 * @returns {string} Formatted time string
 */
export const formatTime = (date, includeSeconds = false) => {
  if (!date) return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(d.getTime())) return '';
  
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    ...(includeSeconds && { second: '2-digit' }),
  };
  
  return d.toLocaleTimeString('en-US', options);
};

/**
 * Format date and time together
 * @param {Date|string} date - Date object or string
 * @returns {string} Formatted datetime string
 */
export const formatDateTime = (date) => {
  return `${formatDate(date, 'display')} at ${formatTime(date)}`;
};

/**
 * Get date string in YYYY-MM-DD format (for storage)
 * @param {Date} date - Date object
 * @returns {string} Date string
 */
export const toDateString = (date = new Date()) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Get time string in HH:MM format
 * @param {Date} date - Date object
 * @returns {string} Time string
 */
export const toTimeString = (date = new Date()) => {
  const d = new Date(date);
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

/**
 * Parse date string (YYYY-MM-DD) to Date object
 * @param {string} dateString - Date string
 * @returns {Date} Date object
 */
export const parseDate = (dateString) => {
  if (!dateString) return new Date();
  return new Date(dateString);
};

/**
 * Get relative time string (e.g., "2 hours ago")
 * @param {Date|string} date - Date object or string
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date) => {
  if (!date) return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now - d;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);
  
  if (diffSec < 60) return 'Just now';
  if (diffMin < 60) return `${diffMin} ${diffMin === 1 ? 'minute' : 'minutes'} ago`;
  if (diffHour < 24) return `${diffHour} ${diffHour === 1 ? 'hour' : 'hours'} ago`;
  if (diffDay < 7) return `${diffDay} ${diffDay === 1 ? 'day' : 'days'} ago`;
  if (diffWeek < 4) return `${diffWeek} ${diffWeek === 1 ? 'week' : 'weeks'} ago`;
  if (diffMonth < 12) return `${diffMonth} ${diffMonth === 1 ? 'month' : 'months'} ago`;
  return `${diffYear} ${diffYear === 1 ? 'year' : 'years'} ago`;
};

/**
 * Check if date is today
 * @param {Date|string} date - Date to check
 * @returns {boolean} True if date is today
 */
export const isToday = (date) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  return toDateString(d) === toDateString(today);
};

/**
 * Check if date is yesterday
 * @param {Date|string} date - Date to check
 * @returns {boolean} True if date is yesterday
 */
export const isYesterday = (date) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return toDateString(d) === toDateString(yesterday);
};

/**
 * Check if date is in current week
 * @param {Date|string} date - Date to check
 * @returns {boolean} True if date is in current week
 */
export const isThisWeek = (date) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  const weekStart = getWeekStart(today);
  const weekEnd = getWeekEnd(today);
  return d >= weekStart && d <= weekEnd;
};

/**
 * Get start of week (Monday)
 * @param {Date} date - Date object
 * @returns {Date} Start of week
 */
export const getWeekStart = (date = new Date()) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  return new Date(d.setDate(diff));
};

/**
 * Get end of week (Sunday)
 * @param {Date} date - Date object
 * @returns {Date} End of week
 */
export const getWeekEnd = (date = new Date()) => {
  const start = getWeekStart(date);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return end;
};

/**
 * Get start of month
 * @param {Date} date - Date object
 * @returns {Date} Start of month
 */
export const getMonthStart = (date = new Date()) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

/**
 * Get end of month
 * @param {Date} date - Date object
 * @returns {Date} End of month
 */
export const getMonthEnd = (date = new Date()) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

/**
 * Get array of dates between start and end
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {Array} Array of date strings
 */
export const getDateRange = (startDate, endDate) => {
  const dates = [];
  const current = new Date(startDate);
  const end = new Date(endDate);
  
  while (current <= end) {
    dates.push(toDateString(current));
    current.setDate(current.getDate() + 1);
  }
  
  return dates;
};

/**
 * Get last N days as array
 * @param {number} days - Number of days
 * @returns {Array} Array of date strings
 */
export const getLastNDays = (days = 7) => {
  const dates = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(toDateString(date));
  }
  
  return dates;
};

/**
 * Get day name from date
 * @param {Date|string} date - Date object or string
 * @param {string} format - 'long' or 'short'
 * @returns {string} Day name
 */
export const getDayName = (date, format = 'long') => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const options = { weekday: format };
  return d.toLocaleDateString('en-US', options);
};

/**
 * Get month name from date
 * @param {Date|string} date - Date object or string
 * @param {string} format - 'long' or 'short'
 * @returns {string} Month name
 */
export const getMonthName = (date, format = 'long') => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const options = { month: format };
  return d.toLocaleDateString('en-US', options);
};

/**
 * Get week number of year
 * @param {Date} date - Date object
 * @returns {number} Week number
 */
export const getWeekNumber = (date = new Date()) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
};

/**
 * Add days to date
 * @param {Date} date - Date object
 * @param {number} days - Number of days to add
 * @returns {Date} New date
 */
export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Add months to date
 * @param {Date} date - Date object
 * @param {number} months - Number of months to add
 * @returns {Date} New date
 */
export const addMonths = (date, months) => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

/**
 * Calculate difference in days between two dates
 * @param {Date|string} date1 - First date
 * @param {Date|string} date2 - Second date
 * @returns {number} Difference in days
 */
export const diffInDays = (date1, date2) => {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;
  const diffTime = Math.abs(d2 - d1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Get age from birthdate
 * @param {Date|string} birthdate - Birthdate
 * @returns {number} Age in years
 */
export const calculateAge = (birthdate) => {
  const birth = typeof birthdate === 'string' ? new Date(birthdate) : birthdate;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

/**
 * Format duration in minutes to readable string
 * @param {number} minutes - Duration in minutes
 * @returns {string} Formatted duration
 */
export const formatDuration = (minutes) => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (mins === 0) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  }
  
  return `${hours}h ${mins}m`;
};

/**
 * Convert duration string to minutes
 * @param {string} duration - Duration string (e.g., "1h 30m", "45m")
 * @returns {number} Duration in minutes
 */
export const parseDuration = (duration) => {
  const hourMatch = duration.match(/(\d+)h/);
  const minMatch = duration.match(/(\d+)m/);
  
  const hours = hourMatch ? parseInt(hourMatch[1]) : 0;
  const minutes = minMatch ? parseInt(minMatch[1]) : 0;
  
  return hours * 60 + minutes;
};