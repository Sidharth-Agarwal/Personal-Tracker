import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

/**
 * StatsCard Component
 * Display statistics with icon, value, and trend
 */

const StatsCard = ({
  title,
  value,
  unit = '',
  icon,
  trend,
  trendDirection = 'neutral',
  color = 'accent',
  onClick,
  className = '',
}) => {
  // Color variants
  const colorClasses = {
    accent: 'bg-accent/10 text-accent',
    red: 'bg-red-500/10 text-red-500',
    green: 'bg-green-500/10 text-green-500',
    blue: 'bg-blue-500/10 text-blue-500',
    purple: 'bg-purple-500/10 text-purple-500',
    orange: 'bg-orange-500/10 text-orange-500',
  };

  const getTrendIcon = () => {
    if (trendDirection === 'up') return <TrendingUp size={16} />;
    if (trendDirection === 'down') return <TrendingDown size={16} />;
    return <Minus size={16} />;
  };

  const getTrendColor = () => {
    if (trendDirection === 'up') return 'text-green-500';
    if (trendDirection === 'down') return 'text-red-500';
    return 'text-text-tertiary';
  };

  const baseClasses = `
    bg-card-bg border border-border rounded-xl p-6
    transition-all duration-200
    ${onClick ? 'cursor-pointer hover:shadow-lg hover:-translate-y-1' : ''}
    ${className}
  `;

  return (
    <div className={baseClasses} onClick={onClick}>
      <div className="flex items-start justify-between">
        {/* Left Side */}
        <div className="flex-1">
          {/* Title */}
          <p className="text-sm font-medium text-text-tertiary mb-2">
            {title}
          </p>

          {/* Value */}
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-text-primary">
              {value}
            </h3>
            {unit && (
              <span className="text-lg text-text-tertiary">
                {unit}
              </span>
            )}
          </div>

          {/* Trend */}
          {trend !== undefined && trend !== null && (
            <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${getTrendColor()}`}>
              {getTrendIcon()}
              <span>{Math.abs(trend)}%</span>
            </div>
          )}
        </div>

        {/* Icon */}
        {icon && (
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;