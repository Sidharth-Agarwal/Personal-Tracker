import React from 'react';
import { Plus } from 'lucide-react';

/**
 * FloatingActionButton (FAB) Component
 * Floating button typically used for primary actions
 */

const FloatingActionButton = ({
  icon = <Plus size={24} />,
  onClick,
  position = 'bottom-right',
  size = 'md',
  disabled = false,
  ariaLabel = 'Add',
  tooltip,
  className = '',
  ...props
}) => {
  // Position styles
  const positionClasses = {
    'bottom-right': 'fixed bottom-6 right-6',
    'bottom-left': 'fixed bottom-6 left-6',
    'bottom-center': 'fixed bottom-6 left-1/2 -translate-x-1/2',
    'top-right': 'fixed top-6 right-6',
    'top-left': 'fixed top-6 left-6',
  };

  // Size styles
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-14 h-14',
    lg: 'w-16 h-16',
  };

  const baseClasses = `
    inline-flex items-center justify-center
    bg-accent text-white
    rounded-full shadow-lg
    hover:bg-accent-hover hover:shadow-xl
    active:scale-95
    transition-all duration-200
    focus:outline-none focus:ring-4 focus:ring-accent focus:ring-opacity-50
    disabled:opacity-50 disabled:cursor-not-allowed
    z-50
    ${positionClasses[position] || positionClasses['bottom-right']}
    ${sizeClasses[size] || sizeClasses.md}
    ${className}
  `;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      title={tooltip}
      className={baseClasses}
      {...props}
    >
      {icon}
    </button>
  );
};

export default FloatingActionButton;