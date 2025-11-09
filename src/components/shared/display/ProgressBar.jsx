import React from 'react';

/**
 * ProgressBar Component
 * Linear progress indicator
 */

const ProgressBar = ({
  percentage = 0,
  color = 'accent',
  height = 'h-2',
  showLabel = false,
  label,
  animated = true,
  className = '',
}) => {
  // Color variants
  const colorClasses = {
    accent: 'bg-accent',
    red: 'bg-red-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
  };

  const bgColorClasses = {
    accent: 'bg-accent/20',
    red: 'bg-red-500/20',
    green: 'bg-green-500/20',
    blue: 'bg-blue-500/20',
    purple: 'bg-purple-500/20',
    orange: 'bg-orange-500/20',
  };

  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <div className={className}>
      {/* Label */}
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1">
          {label && (
            <span className="text-sm font-medium text-text-primary">
              {label}
            </span>
          )}
          {showLabel && (
            <span className="text-sm font-medium text-text-secondary">
              {Math.round(clampedPercentage)}%
            </span>
          )}
        </div>
      )}

      {/* Progress Bar */}
      <div className={`w-full ${height} rounded-full overflow-hidden ${bgColorClasses[color]}`}>
        <div
          className={`
            ${height} rounded-full transition-all duration-500
            ${colorClasses[color]}
            ${animated ? 'ease-out' : ''}
          `}
          style={{ width: `${clampedPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;