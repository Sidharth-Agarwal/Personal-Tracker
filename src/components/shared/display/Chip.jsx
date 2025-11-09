import React from 'react';
import { X } from 'lucide-react';

/**
 * Chip Component
 * Removable tag/chip component
 */

const Chip = ({
  children,
  onRemove,
  variant = 'default',
  size = 'md',
  icon,
  className = '',
}) => {
  // Variant styles
  const variantClasses = {
    default: 'bg-bg-tertiary text-text-primary hover:bg-border',
    primary: 'bg-accent/10 text-accent hover:bg-accent/20',
    success: 'bg-green-500/10 text-green-500 hover:bg-green-500/20',
    warning: 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20',
    danger: 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
    info: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20',
  };

  // Size styles
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs gap-1',
    md: 'px-3 py-1.5 text-sm gap-1.5',
    lg: 'px-4 py-2 text-base gap-2',
  };

  const baseClasses = `
    inline-flex items-center
    rounded-full font-medium
    transition-colors duration-200
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `;

  return (
    <span className={baseClasses}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="flex-shrink-0 ml-1 hover:opacity-70 transition-opacity"
          aria-label="Remove"
        >
          <X size={size === 'sm' ? 12 : size === 'lg' ? 18 : 14} />
        </button>
      )}
    </span>
  );
};

export default Chip;