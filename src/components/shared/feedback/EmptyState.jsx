import React from 'react';
import { Inbox } from 'lucide-react';
import Button from '../buttons/Button';

/**
 * EmptyState Component
 * Display when no data is available
 */

const EmptyState = ({
  icon = <Inbox size={48} />,
  title = 'No data yet',
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      {/* Icon */}
      <div className="w-20 h-20 rounded-full bg-bg-tertiary text-text-quaternary flex items-center justify-center mb-4">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-text-primary mb-2">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-text-tertiary max-w-md mb-6">
          {description}
        </p>
      )}

      {/* Action Button */}
      {actionLabel && onAction && (
        <Button
          variant="primary"
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;