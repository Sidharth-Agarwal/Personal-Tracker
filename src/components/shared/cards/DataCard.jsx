import React from 'react';
import { MoreVertical, Edit2, Trash2 } from 'lucide-react';
import IconButton from '../buttons/IconButton';

/**
 * DataCard Component
 * Generic card for displaying data entries with actions
 */

const DataCard = ({
  title,
  subtitle,
  date,
  type,
  icon,
  badges = [],
  stats = [],
  onEdit,
  onDelete,
  onClick,
  className = '',
  children,
}) => {
  const baseClasses = `
    bg-card-bg border border-border rounded-xl p-4
    transition-all duration-200
    hover:shadow-md
    ${onClick ? 'cursor-pointer hover:-translate-y-1' : ''}
    ${className}
  `;

  return (
    <div className={baseClasses} onClick={onClick}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          {/* Icon */}
          {icon && (
            <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
              {icon}
            </div>
          )}

          {/* Title & Subtitle */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-text-primary mb-1 truncate">
              {title}
            </h3>
            {subtitle && (
              <p className="text-sm text-text-tertiary truncate">
                {subtitle}
              </p>
            )}
            {date && (
              <p className="text-xs text-text-quaternary mt-1">
                {date}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        {(onEdit || onDelete) && (
          <div className="flex items-center gap-1">
            {onEdit && (
              <IconButton
                icon={<Edit2 size={16} />}
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                variant="ghost"
                size="sm"
                ariaLabel="Edit"
              />
            )}
            {onDelete && (
              <IconButton
                icon={<Trash2 size={16} />}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                variant="ghost"
                size="sm"
                ariaLabel="Delete"
              />
            )}
          </div>
        )}
      </div>

      {/* Badges */}
      {badges.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {badges.map((badge, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium rounded-md bg-bg-tertiary text-text-secondary"
            >
              {badge}
            </span>
          ))}
        </div>
      )}

      {/* Stats */}
      {stats.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-t border-border">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-xs text-text-tertiary mb-1">{stat.label}</p>
              <p className="text-sm font-semibold text-text-primary">
                {stat.value} {stat.unit}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Custom Content */}
      {children && (
        <div className="mt-3 pt-3 border-t border-border">
          {children}
        </div>
      )}
    </div>
  );
};

export default DataCard;