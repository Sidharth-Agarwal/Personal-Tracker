/**
 * Chart Helper Utilities
 * Functions for formatting and preparing chart data
 */

import { getChartColor, getMacroColor } from '../constants/colors';
import { formatDate, getLastNDays, toDateString } from './dateHelpers';

/**
 * Prepare data for line chart
 * @param {array} data - Array of data objects with date and value
 * @param {string} dateKey - Key for date field
 * @param {string} valueKey - Key for value field
 * @returns {array} Formatted chart data
 */
export const prepareLineChartData = (data, dateKey = 'date', valueKey = 'value') => {
  return data.map(item => ({
    date: formatDate(item[dateKey], 'short'),
    value: item[valueKey] || 0,
    fullDate: item[dateKey],
  }));
};

/**
 * Prepare data for bar chart
 * @param {array} data - Array of data objects
 * @param {string} labelKey - Key for label field
 * @param {string} valueKey - Key for value field
 * @returns {array} Formatted chart data
 */
export const prepareBarChartData = (data, labelKey = 'label', valueKey = 'value') => {
  return data.map((item, index) => ({
    label: item[labelKey],
    value: item[valueKey] || 0,
    color: getChartColor(index),
  }));
};

/**
 * Prepare data for pie/donut chart
 * @param {array} data - Array of data objects
 * @param {string} labelKey - Key for label field
 * @param {string} valueKey - Key for value field
 * @returns {array} Formatted chart data with percentages
 */
export const preparePieChartData = (data, labelKey = 'label', valueKey = 'value') => {
  const total = data.reduce((sum, item) => sum + (item[valueKey] || 0), 0);
  
  return data.map((item, index) => {
    const value = item[valueKey] || 0;
    const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
    
    return {
      label: item[labelKey],
      value,
      percentage: parseFloat(percentage),
      color: getChartColor(index),
    };
  });
};

/**
 * Prepare macro breakdown chart data
 * @param {object} macros - Macros object { protein, carbs, fats }
 * @returns {array} Formatted chart data
 */
export const prepareMacroChartData = (macros) => {
  const { protein = 0, carbs = 0, fats = 0 } = macros;
  
  const total = protein + carbs + fats;
  
  return [
    {
      label: 'Protein',
      value: protein,
      percentage: total > 0 ? ((protein / total) * 100).toFixed(1) : 0,
      color: getMacroColor('protein'),
      calories: protein * 4, // 4 cal/g
    },
    {
      label: 'Carbs',
      value: carbs,
      percentage: total > 0 ? ((carbs / total) * 100).toFixed(1) : 0,
      color: getMacroColor('carbs'),
      calories: carbs * 4, // 4 cal/g
    },
    {
      label: 'Fats',
      value: fats,
      percentage: total > 0 ? ((fats / total) * 100).toFixed(1) : 0,
      color: getMacroColor('fats'),
      calories: fats * 9, // 9 cal/g
    },
  ];
};

/**
 * Aggregate data by date
 * @param {array} data - Array of data objects with dates
 * @param {string} dateKey - Key for date field
 * @param {string} valueKey - Key for value field
 * @param {string} aggregationType - Type of aggregation ('sum', 'avg', 'count')
 * @returns {array} Aggregated data
 */
export const aggregateByDate = (data, dateKey = 'date', valueKey = 'value', aggregationType = 'sum') => {
  const grouped = {};
  
  data.forEach(item => {
    const date = toDateString(item[dateKey]);
    
    if (!grouped[date]) {
      grouped[date] = {
        date,
        values: [],
      };
    }
    
    grouped[date].values.push(item[valueKey] || 0);
  });
  
  return Object.values(grouped).map(group => {
    let value = 0;
    
    if (aggregationType === 'sum') {
      value = group.values.reduce((sum, v) => sum + v, 0);
    } else if (aggregationType === 'avg') {
      value = group.values.reduce((sum, v) => sum + v, 0) / group.values.length;
    } else if (aggregationType === 'count') {
      value = group.values.length;
    }
    
    return {
      date: group.date,
      value: Math.round(value * 100) / 100, // Round to 2 decimals
      count: group.values.length,
    };
  }).sort((a, b) => new Date(a.date) - new Date(b.date));
};

/**
 * Fill missing dates in data with zero values
 * @param {array} data - Array of data objects
 * @param {string} dateKey - Key for date field
 * @param {number} days - Number of days to include
 * @returns {array} Data with all dates filled
 */
export const fillMissingDates = (data, dateKey = 'date', days = 7) => {
  const dates = getLastNDays(days);
  const dataMap = {};
  
  // Create map of existing data
  data.forEach(item => {
    const date = toDateString(item[dateKey]);
    dataMap[date] = item;
  });
  
  // Fill in missing dates
  return dates.map(date => {
    if (dataMap[date]) {
      return { ...dataMap[date], date };
    }
    return {
      date,
      value: 0,
      [dateKey]: date,
    };
  });
};

/**
 * Calculate moving average
 * @param {array} data - Array of data objects
 * @param {string} valueKey - Key for value field
 * @param {number} window - Window size for moving average
 * @returns {array} Data with moving average
 */
export const calculateMovingAverage = (data, valueKey = 'value', window = 7) => {
  return data.map((item, index) => {
    const start = Math.max(0, index - window + 1);
    const windowData = data.slice(start, index + 1);
    const avg = windowData.reduce((sum, d) => sum + (d[valueKey] || 0), 0) / windowData.length;
    
    return {
      ...item,
      movingAverage: Math.round(avg * 100) / 100,
    };
  });
};

/**
 * Get weekly summary from daily data
 * @param {array} data - Array of daily data
 * @param {string} dateKey - Key for date field
 * @param {string} valueKey - Key for value field
 * @returns {array} Weekly summary
 */
export const getWeeklySummary = (data, dateKey = 'date', valueKey = 'value') => {
  const weeks = {};
  
  data.forEach(item => {
    const date = new Date(item[dateKey]);
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay()); // Get Sunday
    const weekKey = toDateString(weekStart);
    
    if (!weeks[weekKey]) {
      weeks[weekKey] = {
        weekStart: weekKey,
        values: [],
        total: 0,
        count: 0,
      };
    }
    
    weeks[weekKey].values.push(item[valueKey] || 0);
    weeks[weekKey].total += item[valueKey] || 0;
    weeks[weekKey].count += 1;
  });
  
  return Object.values(weeks).map(week => ({
    weekStart: week.weekStart,
    total: Math.round(week.total * 100) / 100,
    average: Math.round((week.total / week.count) * 100) / 100,
    count: week.count,
  })).sort((a, b) => new Date(a.weekStart) - new Date(b.weekStart));
};

/**
 * Get monthly summary from daily data
 * @param {array} data - Array of daily data
 * @param {string} dateKey - Key for date field
 * @param {string} valueKey - Key for value field
 * @returns {array} Monthly summary
 */
export const getMonthlySummary = (data, dateKey = 'date', valueKey = 'value') => {
  const months = {};
  
  data.forEach(item => {
    const date = new Date(item[dateKey]);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!months[monthKey]) {
      months[monthKey] = {
        month: monthKey,
        values: [],
        total: 0,
        count: 0,
      };
    }
    
    months[monthKey].values.push(item[valueKey] || 0);
    months[monthKey].total += item[valueKey] || 0;
    months[monthKey].count += 1;
  });
  
  return Object.values(months).map(month => ({
    month: month.month,
    total: Math.round(month.total * 100) / 100,
    average: Math.round((month.total / month.count) * 100) / 100,
    count: month.count,
  })).sort((a, b) => a.month.localeCompare(b.month));
};

/**
 * Calculate statistics from data
 * @param {array} data - Array of values
 * @returns {object} Statistics object
 */
export const calculateStats = (data) => {
  if (!data || data.length === 0) {
    return {
      min: 0,
      max: 0,
      average: 0,
      total: 0,
      count: 0,
      median: 0,
    };
  }
  
  const sorted = [...data].sort((a, b) => a - b);
  const total = data.reduce((sum, val) => sum + val, 0);
  const average = total / data.length;
  
  const middle = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 === 0
    ? (sorted[middle - 1] + sorted[middle]) / 2
    : sorted[middle];
  
  return {
    min: Math.round(sorted[0] * 100) / 100,
    max: Math.round(sorted[sorted.length - 1] * 100) / 100,
    average: Math.round(average * 100) / 100,
    total: Math.round(total * 100) / 100,
    count: data.length,
    median: Math.round(median * 100) / 100,
  };
};

/**
 * Format number for display in charts
 * @param {number} value - Value to format
 * @param {string} type - Type of value (number, percentage, currency)
 * @returns {string} Formatted value
 */
export const formatChartValue = (value, type = 'number') => {
  if (value === null || value === undefined || isNaN(value)) {
    return '0';
  }
  
  switch (type) {
    case 'percentage':
      return `${value.toFixed(1)}%`;
    case 'currency':
      return `$${value.toFixed(2)}`;
    case 'decimal':
      return value.toFixed(2);
    case 'integer':
      return Math.round(value).toString();
    case 'number':
    default:
      return value >= 1000 ? value.toFixed(0) : value.toFixed(1);
  }
};

/**
 * Prepare heatmap data (for calendar view)
 * @param {array} data - Array of data objects with dates and values
 * @param {string} dateKey - Key for date field
 * @param {string} valueKey - Key for value field
 * @param {number} days - Number of days to include
 * @returns {array} Heatmap data
 */
export const prepareHeatmapData = (data, dateKey = 'date', valueKey = 'value', days = 30) => {
  const dates = getLastNDays(days);
  const dataMap = {};
  
  data.forEach(item => {
    const date = toDateString(item[dateKey]);
    dataMap[date] = item[valueKey] || 0;
  });
  
  // Find max value for intensity calculation
  const maxValue = Math.max(...Object.values(dataMap), 1);
  
  return dates.map(date => {
    const value = dataMap[date] || 0;
    const intensity = value > 0 ? (value / maxValue) * 100 : 0;
    
    return {
      date,
      value,
      intensity: Math.round(intensity),
      hasData: value > 0,
    };
  });
};