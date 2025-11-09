import React from 'react';

/**
 * CircularProgress Component
 * Circular progress indicator
 */

const CircularProgress = ({
  percentage = 0,
  size = 120,
  strokeWidth = 8,
  color = 'accent',
  showLabel = true,
  label,
  className = '',
}) => {
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (clampedPercentage / 100) * circumference;

  // Color variants
  const colorClasses = {
    accent: '#6366f1',
    red: '#ef4444',
    green: '#10b981',
    blue: '#3b82f6',
    purple: '#8b5cf6',
    orange: '#f59e0b',
  };

  const strokeColor = colorClasses[color] || colorClasses.accent;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-bg-tertiary"
        />
        
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500 ease-out"
        />
      </svg>

      {/* Center Label */}
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-text-primary">
            {Math.round(clampedPercentage)}%
          </span>
          {label && (
            <span className="text-xs text-text-tertiary mt-1">
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default CircularProgress;