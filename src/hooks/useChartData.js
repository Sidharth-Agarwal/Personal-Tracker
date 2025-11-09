import { useMemo } from 'react';
import {
  prepareLineChartData,
  prepareBarChartData,
  preparePieChartData,
  prepareMacroChartData,
  aggregateByDate,
  fillMissingDates,
  calculateMovingAverage,
  getWeeklySummary,
  getMonthlySummary,
  calculateStats,
  prepareHeatmapData,
} from '../utils/chartHelpers';

/**
 * useChartData Hook
 * Format and prepare data for charts
 */

export const useChartData = (data, options = {}) => {
  const {
    dateKey = 'date',
    valueKey = 'value',
    labelKey = 'label',
    aggregationType = 'sum',
    fillMissing = false,
    days = 7,
    movingAverage = false,
    movingAverageWindow = 7,
  } = options;

  /**
   * Prepare line chart data
   */
  const lineChartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    let processedData = [...data];

    // Aggregate by date if needed
    if (aggregationType) {
      processedData = aggregateByDate(
        processedData,
        dateKey,
        valueKey,
        aggregationType
      );
    }

    // Fill missing dates
    if (fillMissing) {
      processedData = fillMissingDates(processedData, dateKey, days);
    }

    // Calculate moving average
    if (movingAverage) {
      processedData = calculateMovingAverage(
        processedData,
        valueKey,
        movingAverageWindow
      );
    }

    return prepareLineChartData(processedData, dateKey, valueKey);
  }, [data, dateKey, valueKey, aggregationType, fillMissing, days, movingAverage, movingAverageWindow]);

  /**
   * Prepare bar chart data
   */
  const barChartData = useMemo(() => {
    if (!data || data.length === 0) return [];
    return prepareBarChartData(data, labelKey, valueKey);
  }, [data, labelKey, valueKey]);

  /**
   * Prepare pie chart data
   */
  const pieChartData = useMemo(() => {
    if (!data || data.length === 0) return [];
    return preparePieChartData(data, labelKey, valueKey);
  }, [data, labelKey, valueKey]);

  /**
   * Prepare macro breakdown chart data
   */
  const macroChartData = useMemo(() => {
    if (!data || !data.protein) return [];
    return prepareMacroChartData(data);
  }, [data]);

  /**
   * Get weekly summary
   */
  const weeklySummary = useMemo(() => {
    if (!data || data.length === 0) return [];
    return getWeeklySummary(data, dateKey, valueKey);
  }, [data, dateKey, valueKey]);

  /**
   * Get monthly summary
   */
  const monthlySummary = useMemo(() => {
    if (!data || data.length === 0) return [];
    return getMonthlySummary(data, dateKey, valueKey);
  }, [data, dateKey, valueKey]);

  /**
   * Calculate statistics
   */
  const statistics = useMemo(() => {
    if (!data || data.length === 0) return null;
    
    const values = data.map(item => 
      typeof item === 'number' ? item : item[valueKey]
    ).filter(val => val !== null && val !== undefined);
    
    return calculateStats(values);
  }, [data, valueKey]);

  /**
   * Prepare heatmap data
   */
  const heatmapData = useMemo(() => {
    if (!data || data.length === 0) return [];
    return prepareHeatmapData(data, dateKey, valueKey, days);
  }, [data, dateKey, valueKey, days]);

  /**
   * Get trend direction
   */
  const trendDirection = useMemo(() => {
    if (!data || data.length < 2) return 'neutral';
    
    const values = data.map(item => item[valueKey]);
    const firstHalf = values.slice(0, Math.floor(values.length / 2));
    const secondHalf = values.slice(Math.floor(values.length / 2));
    
    const firstAvg = firstHalf.reduce((sum, val) => sum + val, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, val) => sum + val, 0) / secondHalf.length;
    
    const changePercent = ((secondAvg - firstAvg) / firstAvg) * 100;
    
    if (changePercent > 5) return 'up';
    if (changePercent < -5) return 'down';
    return 'neutral';
  }, [data, valueKey]);

  /**
   * Get trend percentage
   */
  const trendPercentage = useMemo(() => {
    if (!data || data.length < 2) return 0;
    
    const values = data.map(item => item[valueKey]);
    const firstHalf = values.slice(0, Math.floor(values.length / 2));
    const secondHalf = values.slice(Math.floor(values.length / 2));
    
    const firstAvg = firstHalf.reduce((sum, val) => sum + val, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, val) => sum + val, 0) / secondHalf.length;
    
    return Math.round(((secondAvg - firstAvg) / firstAvg) * 100);
  }, [data, valueKey]);

  return {
    lineChartData,
    barChartData,
    pieChartData,
    macroChartData,
    weeklySummary,
    monthlySummary,
    statistics,
    heatmapData,
    trendDirection,
    trendPercentage,
    isEmpty: !data || data.length === 0,
  };
};