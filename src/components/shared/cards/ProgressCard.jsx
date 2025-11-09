import React from 'react';
import ProgressBar from '../display/ProgressBar';

/**
 * ProgressCard Component
 * Card displaying progress towards a goal
 */

const ProgressCard = ({
  label,
  current,
  target,
  unit = '',
  icon,
  color = 'accent',
  showPercentage = true,
  showValues = true,
  className = '',
}) => {
  const percentage = target > 0 ? Math.min((current / target) * 100, 100) : 0;
  const isComplete = current >= target;

  const colorClasses = {
    accent: 'bg-accent/10 text-accent',
    red: 'bg-red-500/10 text-red-500',
    green: 'bg-green-500/10 text-green-500',
    blue: 'bg-blue-500/10 text-blue-500',
    purple: 'bg-purple-500/10 text-purple-500',
    orange: 'bg-orange-500/10 text-orange-500',
  };

  const baseClasses = `
    bg-card-bg border border-border rounded-xl p-4
    ${className}
  `;

  return (
    <div className={baseClasses}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Icon */}
          {icon && (
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
              {icon}
            </div>
          )}

          {/* Label */}
          <div>
            <p className="text-sm font-medium text-text-primary">
              {label}
            </p>
            {showValues && (
              <p className="text-xs text-text-tertiary mt-0.5">
                {current} / {target} {unit}
              </p>
            )}
          </div>
        </div>

        {/* Percentage */}
        {showPercentage && (
          <div className={`text-lg font-bold ${isComplete ? 'text-green-500' : 'text-text-primary'}`}>
            {Math.round(percentage)}%
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <ProgressBar
        percentage={percentage}
        color={color}
        height="h-2"
      />

      {/* Status */}
      {isComplete && (
        <p className="text-xs text-green-500 font-medium mt-2 flex items-center gap-1">
          <span>✓</span>
          <span>Goal achieved!</span>
        </p>
      )}
    </div>
  );
};

export default ProgressCard;